<template>
	<view class="wrap">
		<scroll-view scroll-y class="scroll">
			<free-title title="个人档案详细信息"></free-title>
			<view class="container">
				<view class="content-s">
					<view class="content">
						<text class="title">个人信息</text>
						<view class="main" :style="handleMainStyle(item)" v-for="(item,index) in grxx" :key="index">
							<text class="name">{{item.name}}</text>
							<input class="input" :style="handleInputStyle(item)" :type="item.type"
								:placeholder="item.placeholder" :disabled="item.disabled" :adjust-position="false"
								v-model="item.model"
								@click="item.type == 'select' ?  handleUserInfoInput(item.name) : ''">
							<view class="iconfont select_icon" :style="handleSelectIcon(item)" v-if="item.select_icon">
								{{item.select_icon}}
							</view>
							<view class="iconfont required_icon" v-if="item.required_icon">{{item.required_icon}}</view>
							<view class="action" v-if="item.action" @click="handleTapAction(item)">{{item.action}}
							</view>
						</view>
					</view>
					<!-- 支付方式 -->
					<view class="check">
						<text class="txt">支付方式</text>
						<view class="check-wrap" style="margin-top: -.1rem;">
							<block v-for="(item,index) in zffs" :key="index">
								<view class="check-container" :style="item.state !== 0 ? 'width:100%;' : ''">
									<u-radio-group v-model="zffsValue" @change="radioGroupChange">
										<u-radio :name="item.name" :disabled="item.disabled">
											<text style="font-size: .12rem;">{{item.name}}</text>
										</u-radio>
									</u-radio-group>
									<view class="check-input-box" v-if="item.state  !== 0">
										<view class="check-input1-content" style="margin-top: .1rem;">
											<text style="font-size: .12rem;margin-right: .1rem;">{{item.value}}</text>
											<input :type="item.type" class="input" :style="handleCheckInput(item)"
												v-model="item.model" :adjust-position="false"
												:disabled="zffsValue == item.name ? item.isInput = false : true">
										</view>
									</view>
								</view>
							</block>
						</view>
					</view>
					<!-- 药物过敏历史 -->
					<view class="ywgms">
						<text class="txt">药物过敏史</text>
						<view v-for="(item,index) in ywgms" :key="index" class="check-wrap"
							:style="item.name == '其他' ? 'width:100%;margin-left:1.1rem;' : ''">
							<u-checkbox-group>
								<u-checkbox v-model="item.checked" :name="item.name"
									@change="checkboxChange($event,'ywgms')">
									<text style="font-size: .12rem;">{{item.name}}</text>
								</u-checkbox>
							</u-checkbox-group>
							<input :type="item.type" v-if="item.name == '其他'" class="input"
								:style="item.name == '其他' ? 'width:3.25rem;' : ''" :disabled="!item.checked"
								v-model="item.model" :adjust-position="false">
						</view>
					</view>
					<!-- 暴露史 -->
					<view class="ywgms">
						<text class="txt">暴露史</text>
						<view v-for="(item,index) in bls" :key="index" class="check-wrap">
							<u-checkbox-group>
								<u-checkbox v-model="item.checked" :name="item.name"
									@change="checkboxChange($event,'bls')">
									<text style="font-size: .12rem;">{{item.name}}</text>
								</u-checkbox>
							</u-checkbox-group>
						</view>
					</view>
					<!-- 特殊人群分类 -->
					<view class="tsrqfl">
						<text class="name">特殊人群分类</text>
						<input class="input" :type="tsrqfl.type" :placeholder="tsrqfl.placeholder"
							:disabled="tsrqfl.disabled" v-model="tsrqfl.model" :adjust-position="false"
							@click="handleUserInfoInput(tsrqfl.key)">
						<view class="iconfont select_icon">
							{{tsrqfl.select_icon}}
						</view>
					</view>
					<!-- 人群分类 -->
					<view class="check">
						<text class="txt">人群分类</text>
						<view class="check-wrap">
							<block v-for="(item,index) in rqfl" :key="index">
								<view class="check-container">
									<u-checkbox-group>
										<u-checkbox v-model="item.checked" :name="item.name"
											@change="checkboxChange($event,'rqfl')">
											<text style="font-size: .12rem;">{{item.name}}</text>
										</u-checkbox>
									</u-checkbox-group>
								</view>
							</block>
						</view>
					</view>
				</view>
				<!-- 健康信息 -->
				<view class="content-s">
					<view class="content">
						<text class="title">健康信息</text>
						<view class="jb">
							<text class="txt">疾病</text>
							<view class="check-wrap">
								<block v-for="(item,index) in jb[0].list" :key="index">
									<view class="check-container">
										<u-checkbox-group style="width: 2rem;">
											<u-checkbox v-model="item.checked" :name="item.name"
												@change="checkboxChange($event,'jb')">
												<text style="font-size: .12rem;">{{item.name}}</text>
											</u-checkbox>
										</u-checkbox-group>
										<view class="check-input1-content" v-if="item.name !=='无'">
											<text style="margin-right: .1rem;">{{item.time}}</text>
											<input :type="item.type" class="input" :disabled="item.disabled"
												v-model="item.model_time" :adjust-position="false"
												@click="handleTapSelectTime($event,item)">
											<text style="margin: 0 .1rem;">{{item.desc}}</text>
											<input :type="item.type" class="input" :disabled="!item.checked"
												v-model="item.model_desc" :adjust-position="false">
										</view>
									</view>
								</block>
							</view>
						</view>
						<!-- 手术 -->
						<view class="radio-wrap">
							<text class="txt">手术</text>
							<view class="left-radio-group">
								<u-radio-group v-for="(item,index) in ss[0].list" :key="index" v-model="ss[0].value"
									size="26">
									<u-radio :name="item.name" :disabled="item.disabled">
										{{item.name}}
									</u-radio>
								</u-radio-group>
							</view>
							<view class="right-input-wrap">
								<view class="input-content" v-for="(rtem,rndex) in ss[0].input" :key="rndex">
									<view class="name">
										<text>{{rtem.name}}</text>
										<input class="input" type="text" v-model="rtem.model_name"
											:adjust-position="false" :disabled="ss[0].value !== '有' ? true : false">
									</view>
									<view class="time" v-if="rtem.time">
										<text>{{rtem.time}}</text>
										<input class="input" type="text" v-model="rtem.model_time"
											:adjust-position="false" :disabled="rtem.disabled"
											@click="handleTapSelectTime(ss[0].title,rtem)">
									</view>
								</view>
							</view>
						</view>
						<!-- 外伤 -->
						<view class="radio-wrap">
							<text class="txt">外伤</text>
							<view class="left-radio-group">
								<u-radio-group v-for="(item,index) in ws[0].list" :key="index" v-model="ws[0].value"
									size="26">
									<u-radio :name="item.name" :disabled="item.disabled">
										{{item.name}}
									</u-radio>
								</u-radio-group>
							</view>
							<view class="right-input-wrap">
								<view class="input-content" v-for="(rtem,rndex) in ws[0].input" :key="rndex">
									<view class="name">
										<text>{{rtem.name}}</text>
										<input class="input" type="text" v-model="rtem.model_name"
											:adjust-position="false" :disabled="ws[0].value !== '有' ? true : false">
									</view>
									<view class="time" v-if="rtem.time">
										<text>{{rtem.time}}</text>
										<input class="input" type="text" v-model="rtem.model_time"
											:adjust-position="false" :disabled="rtem.disabled"
											@click="handleTapSelectTime(ws[0].title,rtem)">
									</view>
								</view>
							</view>
						</view>
						<!-- 输血 -->
						<view class="radio-wrap">
							<text class="txt">输血</text>
							<view class="left-radio-group">
								<u-radio-group v-for="(item,index) in sx[0].list" :key="index" v-model="sx[0].value"
									size="26">
									<u-radio :name="item.name" :disabled="item.disabled">
										{{item.name}}
									</u-radio>
								</u-radio-group>
							</view>
							<view class="right-input-wrap">
								<view class="input-content" v-for="(rtem,rndex) in sx[0].input" :key="rndex">
									<view class="name">
										<text>{{rtem.name}}</text>
										<input class="input" type="text" v-model="rtem.model_name"
											:adjust-position="false" :disabled="sx[0].value !== '有' ? true : false">
									</view>
									<view class="time" v-if="rtem.time">
										<text>{{rtem.time}}</text>
										<input class="input" type="text" v-model="rtem.model_time"
											:adjust-position="false" :disabled="rtem.disabled"
											@click="handleTapSelectTime(sx[0].title,rtem)">
									</view>
								</view>
							</view>
						</view>
						<!-- 遗传病史 -->
						<view class="radio-wrap">
							<text class="txt">{{ycbs[0].title}}</text>
							<view class="left-radio-group">
								<u-radio-group v-for="(item,index) in ycbs[0].list" :key="index" v-model="ycbs[0].value"
									size="26">
									<u-radio :name="item.name" :disabled="item.disabled">
										{{item.name}}
									</u-radio>
								</u-radio-group>
							</view>
							<view class="right-input-wrap">
								<view class="input-content" v-for="(rtem,rndex) in ycbs[0].input" :key="rndex">
									<view class="name">
										<text>{{rtem.name}}</text>
										<input class="input" type="text" v-model="rtem.model_name"
											:adjust-position="false" :disabled="ycbs[0].value !== '有' ? true : false">
									</view>
								</view>
							</view>
						</view>
						<!-- 残疾情况 -->
						<view class="ywgms">
							<text class="txt">残疾情况</text>
							<view v-for="(item,index) in cjqk" :key="index" class="check-wrap"
								:style="item.name == '其他' ? 'width:100%;margin-left:1.1rem;' : ''">
								<u-checkbox-group>
									<u-checkbox v-model="item.checked" :name="item.name"
										@change="checkboxChange($event,'cjqk')">
										<text style="font-size: .12rem;">{{item.name}}</text>
									</u-checkbox>
								</u-checkbox-group>
								<input :type="item.type" v-if="item.name == '其他'" class="input"
									:style="item.name == '其他' ? 'width:3.25rem;' : ''" :disabled="!item.checked"
									v-model="item.model" :adjust-position="false">
							</view>
						</view>
						<!-- 父亲 -->
						<view class="fq">
							<text class="txt">父亲</text>
							<view class="check-wrap">
								<block v-for="(item,index) in fq" :key="index">
									<view class="check-container" :style="item.name == '其他' ? 'width:100%;' : ''">
										<u-checkbox-group>
											<u-checkbox v-model="item.checked" :name="item.name"
												@change="checkboxChange($event,'fq')">
												<text style="font-size: .12rem;">{{item.name}}</text>
											</u-checkbox>
										</u-checkbox-group>
										<input v-if="item.name == '其他'" class="input"
											:style="item.name == '其他' ? 'width:3.25rem;' : ''" :disabled="!item.checked"
											v-model="item.model" :adjust-position="false">
									</view>
								</block>
							</view>
						</view>
						<view class="fq">
							<text class="txt">母亲</text>
							<view class="check-wrap">
								<block v-for="(item,index) in mq" :key="index">
									<view class="check-container" :style="item.name == '其他' ? 'width:100%;' : ''">
										<u-checkbox-group>
											<u-checkbox v-model="item.checked" :name="item.name"
												@change="checkboxChange($event,'mq')">
												<text style="font-size: .12rem;">{{item.name}}</text>
											</u-checkbox>
										</u-checkbox-group>
										<input v-if="item.name == '其他'" class="input"
											:style="item.name == '其他' ? 'width:3.25rem;' : ''" :disabled="!item.checked"
											v-model="item.model" :adjust-position="false">
									</view>
								</block>
							</view>
						</view>
						<view class="fq">
							<text class="txt">兄弟姐妹</text>
							<view class="check-wrap">
								<block v-for="(item,index) in xdjm" :key="index">
									<view class="check-container" :style="item.name == '其他' ? 'width:100%;' : ''">
										<u-checkbox-group>
											<u-checkbox v-model="item.checked" :name="item.name"
												@change="checkboxChange($event,'xdjm')">
												<text style="font-size: .12rem;">{{item.name}}</text>
											</u-checkbox>
										</u-checkbox-group>
										<input v-if="item.name == '其他'" class="input"
											:style="item.name == '其他' ? 'width:3.25rem;' : ''" :disabled="!item.checked"
											v-model="item.model" :adjust-position="false">
									</view>
								</block>
							</view>
						</view>
						<view class="fq">
							<text class="txt">子女</text>
							<view class="check-wrap">
								<block v-for="(item,index) in zn" :key="index">
									<view class="check-container" :style="item.name == '其他' ? 'width:100%;' : ''">
										<u-checkbox-group>
											<u-checkbox v-model="item.checked" :name="item.name"
												@change="checkboxChange($event,'zn')">
												<text style="font-size: .12rem;">{{item.name}}</text>
											</u-checkbox>
										</u-checkbox-group>
										<input v-if="item.name == '其他'" class="input"
											:style="item.name == '其他' ? 'width:3.25rem;' : ''" :disabled="!item.checked"
											v-model="item.model" :adjust-position="false">
									</view>
								</block>
							</view>
						</view>
						<view class="zh" v-for="(item,index) in zh" :key="index">
							<view class="content">
								<text class="name">{{item.name}}</text>
								<input class="input" :type="item.type" :placeholder="item.placeholder"
									:disabled="item.disabled" :adjust-position="false" v-model="item.model"
									@click="item.type == 'select' ?  handleUserInfoInput(item.name) : ''">
								<view class="iconfont select_icon" v-if="item.select_icon">
									{{item.select_icon}}
								</view>
								<view class="iconfont required_icon" v-if="item.required_icon">{{item.required_icon}}
								</view>
								<view class="iconfont mb" v-if="item.icon" @click="handleisCanvas(item)">{{item.icon}}
								</view>
								<image v-if="item.name == '本人签字' && person_sign!==''" :src="person_sign"
									style="width: 1rem;height: .3rem;">
								</image>
								<image v-if="item.name == '家属签字' && family_sign!==''" :src="family_sign"
									style="width: 1rem;height: .3rem;">
								</image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="btn-container">
				<u-button class="btn" @click="handleSubmitBtn" type="primary">保存</u-button>
			</view>
			<canva v-if="isCanvas" @close="isCanvas = false" @finish="finish"></canva>
		</scroll-view>
		<u-picker v-model="isTime" mode="time" @confirm="handlePicker"></u-picker>
		<u-select v-model="selectorIsShow" :list="list" @confirm="handleSelect"></u-select>
	</view>
</template>
<script>
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import data from '../../../js/personalFiles.js';
	import canva from "@/components/free-ui/free-canvas/canvas.vue";
	import utils from "@/common/utils.js";
	export default {
		props: {
			file: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		components: {
			freeTitle,
			canva
		},
		data() {
			return {
				isExist: false,
				age: 0,
				zffsValue: '',
				// is_data: false,
				isTime: false,
				selectorIsShow: false,
				dateofBirth: '',
				time: '',
				item: '',
				data: '',
				list: [],
				person_id: '',
				idcard: '',
				isCanvas: false,
				person_sign: '',
				family_sign: '',
				grxx: JSON.parse(JSON.stringify(data.grxx)),
				zffs: JSON.parse(JSON.stringify(data.zffs)),
				ywgms: JSON.parse(JSON.stringify(data.ywgms)),
				bls: JSON.parse(JSON.stringify(data.bls)),
				tsrqfl: JSON.parse(JSON.stringify(data.tsrqfl)),
				rqfl: JSON.parse(JSON.stringify(data.rqfl)),
				jb: JSON.parse(JSON.stringify(data.jb)),
				ss: JSON.parse(JSON.stringify(data.ss)),
				ws: JSON.parse(JSON.stringify(data.ws)),
				sx: JSON.parse(JSON.stringify(data.sx)),
				ycbs: JSON.parse(JSON.stringify(data.ycbs)),
				cjqk: JSON.parse(JSON.stringify(data.cjqk)),
				fq: JSON.parse(JSON.stringify(data.fq)),
				mq: JSON.parse(JSON.stringify(data.mq)),
				xdjm: JSON.parse(JSON.stringify(data.xdjm)),
				zn: JSON.parse(JSON.stringify(data.zn)),
				zh: JSON.parse(JSON.stringify(data.zh)),
				health_id: '',
				name: '',
				picture_status: '0',
				docname: '',
				file_table_cell: {},
				itemTitle: ''
			}
		},
		mounted() {
			uni.$on('switchUser', () => {
				console.info(data)
				this.grxx = JSON.parse(JSON.stringify(data.grxx));
				this.zffs = JSON.parse(JSON.stringify(data.zffs));
				this.ywgms = JSON.parse(JSON.stringify(data.ywgms));
				this.bls = JSON.parse(JSON.stringify(data.bls));
				this.tsrqfl = JSON.parse(JSON.stringify(data.tsrqfl));
				this.rqfl = JSON.parse(JSON.stringify(data.rqfl));
				this.jb = JSON.parse(JSON.stringify(data.jb));
				this.ss = JSON.parse(JSON.stringify(data.ss));
				this.ws = JSON.parse(JSON.stringify(data.ws));
				this.sx = JSON.parse(JSON.stringify(data.sx));
				this.ycbs = JSON.parse(JSON.stringify(data.ycbs));
				this.cjqk = JSON.parse(JSON.stringify(data.cjqk));
				this.fq = JSON.parse(JSON.stringify(data.fq));
				this.mq = JSON.parse(JSON.stringify(data.mq));
				this.xdjm = JSON.parse(JSON.stringify(data.xdjm));
				this.zn = JSON.parse(JSON.stringify(data.zn));
				this.zh = JSON.parse(JSON.stringify(data.zh));
			});

			this.file_table_cell = this.file;
			// console.log(this.file_table_cell);
			let loginInfo = uni.getStorageSync('login_info');
			if (JSON.stringify(this.file_table_cell) !== '{}') {
				this.name = this.file_table_cell.name;
				this.idcard = this.file_table_cell.idcard;
				this.docname = this.file_table_cell.docname;
			} else {
				if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false && loginInfo !==
					'') {
					this.person_id = loginInfo[0].id;
					this.idcard = loginInfo[0].idcard;
					this.name = loginInfo[0].name;
					console.log('联网');
				}

				let docname = uni.getStorageSync('user_info');
				this.docname = docname[0].doctor_name;
			}
			// console.log(this.person_id);
			this.hadleSearchPersonInfo();
		},
		destroyed() {
			uni.$off('switchUser');
		},
		computed: {
			handleMainStyle() {
				return function(item) {
					if (item.style == 1) {
						return 'width:100%;'
					}
					if (item.style == 2) {
						return 'width:42%;'
					}
				}
			},
			handleInputStyle() {
				return function(item) {
					return item.style == 3 ? 'width:4.02rem;' : ''
				}
			},
			handleSelectIcon() {
				return function(item) {
					if (item.style == 1) {
						return `position: absolute;left: 2.42rem;`
					}
					if (item.style == 2) {
						return `position: absolute;left: 2.42rem;`
					}
				}
			},
			handleCheckboxGroup() {
				return function(item) {
					if (item.state !== 0 && item.name !== '其他') {
						return `margin-top:-.1rem;width: 2rem;`
					}
				}
			},
			handleCheckInput() {
				return function(item) {
					if (item.name == '其他') {
						return `margin-top:.1rem;width:3.25rem;`
					}
				}
			}
		},
		methods: {
			radioGroupChange(e) {},
			checkbox(arr, e) {
				let data = ['无', '无残疾', '一般人群'];
				console.log(e);
				for (let item of arr) {
					if (data.indexOf(e.name) !== -1 && e.value && data.indexOf(item.name) === -1) {
						item.checked = false;
					}
					if (data.indexOf(e.name) === -1 && data.indexOf(item.name) !== -1) {
						item.checked = false;
					}
				}
			},
			checkboxChange(e, title) {
				if (title == 'ywgms') {
					this.checkbox(this.ywgms, e);
				}
				if (title == 'bls') {
					this.checkbox(this.bls, e);
				}
				if (title == 'jb') {
					this.checkbox(this.jb[0].list, e)
				}
				if (title == 'cjqk') {
					this.checkbox(this.cjqk, e);
				}
				if (title == 'fq') {
					this.checkbox(this.fq, e);
				}
				if (title == 'mq') {
					this.checkbox(this.mq, e);
				}
				if (title == 'xdjm') {
					this.checkbox(this.xdjm, e);
				}
				if (title == 'zn') {
					this.checkbox(this.zn, e);
				}
				if (title == 'rqfl') {
					this.checkbox(this.rqfl, e);
				}
			},
			// 同现住址 同户籍地址
			handleTapAction(item) {
				for (let jtem of this.grxx) {
					if (item.action == '同现住址' && jtem.name == '现住址') {
						item.model = jtem.model;
					}
					if (item.action == '同户籍地址' && jtem.name == '户籍地址') {
						item.model = jtem.model;
					}
				}
			},
			handleTapSelectTime(title, item) {
				this.itemTitle = title;
				if (item.checked) {
					this.isTime = true;
				}
				if ((this.ss[0].value == '有' && this.itemTitle == '手术') || (this.ws[0].value == '有' && this.itemTitle ==
						'外伤') || (this.sx[0].value == '有' && this.itemTitle == '输血')) {
					this.isTime = true;
				}
				this.data = item.name;
			},
			// 输入框点击事件 赋值
			handleUserInfoInput(item) {
				this.data = item;
				this.selectorIsShow = true;
				switch (item) {
					case "出生日期":
					case "确认时间":
						this.isTime = true;
						this.selectorIsShow = false;
						break;
					case "性别":
						this.list = utils.gender;
						break;
					case "是否死亡":
						this.list = data.vitalSigns;
						break;
					case "常驻类型":
						this.list = data.residentType;
						break;
					case "民族":
						this.list = utils.nation;
						break;
					case "文化程度":
						this.list = data.degreeOfEducation;
						break;
					case "血型":
						this.list = data.bloodType;
						break;
					case "RH阴性":
						this.list = data.rhNegative;
						break;
					case "职业":
						this.list = data.occupation;
						break;
					case "婚姻状况":
						this.list = data.maritalStatus;
						break;
					case "special_type":
						this.list = data.tsrqflSelect
						break;
					case "厨房排风设施":
						this.list = data.cfpfss;
						break;
					case "燃料类型":
						this.list = data.rllx;
						break;
					case "饮水":
						this.list = data.ys;
						break;
					case "厕所":
						this.list = data.cs;
						break;
					case "禽畜栏":
						this.list = data.qcl;
						break;
				}
			},
			// 时间选择器赋值
			handlePicker(e) {
				this.dateofBirth = e.year + '-' + e.month + '-' + e.day;
				for (let item of this.grxx) {
					if (item.name == this.data) {
						item.model = this.dateofBirth;
					}
				}
				for (let item of this.zh) {
					if (item.name == this.data) {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
				for (let item of this.jb[0].list) {
					if (item.name == this.data) {
						item.model_time = this.dateofBirth;
					}
				}
				for (let item of this.ss[0].input) {
					if (item.name == this.data && this.itemTitle == '手术') {
						item.model_time = this.dateofBirth;
					}
				}
				for (let item of this.ws[0].input) {
					if (item.name == this.data && this.itemTitle == '外伤') {
						item.model_time = this.dateofBirth;
					}
				}
				for (let item of this.sx[0].input) {
					if (item.name == this.data) {
						item.model_time = this.dateofBirth;
					}
				}
			},
			// select 选择器赋值
			handleSelect(e) {
				console.log(e);
				let _item = this.data;
				console.log(_item);
				for (let item of this.grxx) {
					if (_item == item.name) {
						console.log(1);
						item.model = e[0].label
					}
				}
				for (let item of this.zh) {
					if (_item == item.name) {
						item.model = e[0].label
					}
				}
				this.tsrqfl.model = e[0].label;
			},
			// 发起网络请求 保存信息
			handleSubmitBtn() {
				let param = {
					data: {}
				}
				if (this.$store.state.lxUserInfo !== '' && this.$store.state.lxUserInfo.lxStatus) {
					param.data.statelx = 0;
				}
				let grxx = {
					id: this.person_id,
					create_time: '',
					picture_status: this.picture_status,
					upload_status: '0',
					docname: this.docname
				};
				for (let a of this.grxx) {
					grxx[a.key] = a.model;
				}
				param.data.grxx = grxx;
				let zffs = [];
				for (let a of this.zffs) {
					if (this.zffsValue == a.name) {
						let p = { //支付方式
							person_id: this.person_id, //人员主键
							paymethodname: a.name, //支付名称
							paycardno: a.model //医保卡号
						}
						zffs.push(p);
					} else {
						a.model = '';
					}
				}
				param.data.zffs = zffs;
				let ywgms = [];
				for (let a of this.ywgms) {
					if (a.checked) {
						let p = {
							allergy_history: a.model || a.name
						}
						ywgms.push(p);
					}
				}
				param.data.ywgms = ywgms;
				let bls = [];
				for (let a of this.bls) {
					if (a.checked) {
						let p = {
							expose_history: a.model || a.name
						}
						bls.push(p);
					}
				}
				param.data.bls = bls;
				let tsrqfl = [{
					special_type: this.tsrqfl.model
				}];
				param.data.tsrqfl = tsrqfl;
				// console.log(tsrqfl);
				let rqfl = [];
				for (let a of this.rqfl) {
					if (a.checked) {
						let p = {
							person_type: a.model || a.name
						}
						rqfl.push(p);
					}
				}
				param.data.rqfl = rqfl;
				let jb = [{
					healthDetail: []
				}];
				for (let a of this.jb[0].list) {
					if (a.checked) {
						let p = { //疾病
							person_id: this.person_id, //人员主键
							operation_name: a.name, //疾病名称
							operation_time: a.model_time, //时间
							description: a.model_desc, //描述
							type: "疾病"
						}
						jb[0].healthDetail.push(p);
					}
				}
				param.data.jb = jb;
				let ss = [{
					healthDetail: []
				}];
				ss[0].is_operation = this.ss[0].value;
				if (ss[0].is_operation == '有') {
					for (let a of this.ss[0].input) {
						if (a.model_name) {
							let p = { //疾病
								person_id: this.person_id, //人员主键
								operation_name: a.model_name, //疾病名称
								operation_time: a.model_time, //时间
								description: '', //描述
								type: "手术"
							}
							ss[0].healthDetail.push(p);
						}
					}
				}
				param.data.ss = ss;
				let ws = [{
					healthDetail: []
				}];
				ws[0].is_truama = this.ws[0].value;
				if (ws[0].is_truama == '有') {
					for (let a of this.ws[0].input) {
						if (a.model_name) {
							let p = {
								person_id: this.person_id,
								operation_name: a.model_name,
								operation_time: a.model_time,
								description: '',
								type: "外伤"
							}
							ws[0].healthDetail.push(p);
						}
					}
				}
				param.data.ws = ws;

				let sx = [{
					healthDetail: []
				}];
				sx[0].is_blood_transfusion = this.sx[0].value;
				if (sx[0].is_blood_transfusion == '有') {
					for (let a of this.sx[0].input) {
						if (a.model_name) {
							let p = {
								person_id: this.person_id,
								operation_name: a.model_name,
								operation_time: a.model_time,
								description: '',
								type: "输血"
							}
							sx[0].healthDetail.push(p);
						}
					}
				}
				param.data.sx = sx;
				let ycbs = [{}];
				ycbs[0].is_hereditary_name = this.ycbs[0].value;
				ycbs[0].hereditary_name = '';
				if (ycbs[0].is_hereditary_name == '有') {
					if (this.ycbs[0].input[0].model_name) {
						ycbs[0].hereditary_name = this.ycbs[0].input[0].model_name;

					}
				}
				param.data.ycbs = ycbs;
				let cjqk = [];
				for (let a of this.cjqk) {
					if (a.checked) {
						let p = {
							disability: a.name
						}
						cjqk.push(p);
					}
				}
				param.data.cjqk = cjqk;
				let fq = [];
				for (let a of this.fq) {
					if (a.checked) {
						let p = {
							father_chronic_disease: a.model || a.name
						}
						fq.push(p);
					}
				}
				param.data.fq = fq;
				let mq = [];
				for (let a of this.mq) {
					if (a.checked) {
						let p = {
							mother_chronic_disease: a.model || a.name
						}
						mq.push(p);
					}
				}
				param.data.mq = mq;
				let xdjm = [];
				for (let a of this.xdjm) {
					if (a.checked) {
						let p = {
							brother_chronic_disease: a.model || a.name
						}
						xdjm.push(p);
					}
				}
				param.data.xdjm = xdjm;
				let zn = [];
				for (let a of this.zn) {
					if (a.checked) {
						let p = {
							kid_chronic_disease: a.model || a.name
						}
						zn.push(p);
					}
				}
				param.data.zn = zn;
				let zh = {
					person_sign: this.person_sign,
					family_sign: this.family_sign,
					id: this.health_id
				};
				for (let a of this.zh) {
					zh[a.key] = a.model;
				}
				param.data.zh = zh;
				// console.info(param);
				if (this.$store.state.lxUserInfo.lxStatus == false) {
					this.$u.post('SavePersonInfo', param).then(res => {
						this.$lz.toast(res.info);
						console.log(res);
						if (res.code == 200 && res.info == '响应成功') {
							this.$lz.toast(res.info);
							this.name = res.data[0].name;
							this.idcard = res.data[0].idcard;
							this.person_id = res.data[0].person_id;
							this.picture_status = '0';
						}
					}).catch(err => {
						console.log(err);
						this.$lz.toast(err.errMsg)
					})
				}
			},
			// 发起网络请求 查询个人信息
			hadleSearchPersonInfo() {
				let loginInfoLx = uni.getStorageSync('login_info_lx');
				if (this.$store.state.lxUserInfo.lxStatus && loginInfoLx !== '') {
					this.person_id = loginInfoLx.id;
				}
				let obj = {
					person_id: this.person_id
				}
				console.log(obj);
				// 有网
				if (this.$store.state.lxUserInfo.lxStatus == false) {
					this.$u.post('SearchPersonInfo', obj).then(res => {
						console.log(res);
						this.searchPersonInfo(res);
					})
				}
				// 离线
				if (this.$store.state.lxUserInfo.lxStatus) {
					console.log('离线');
					
				}
			},
			// 查询个人信息
			searchPersonInfo(res) {
				console.log(res);
				if (res.data[0].health_id == '') {
					this.health_id = ''
				} else {
					this.health_id = res.data[0].health_id;
				}
				for (let item of this.grxx) {
					item.model = res.data[0][item.key];
					if (item.name == '身份证号') {
						let card = item.model;
						let myDate = new Date();
						let month = myDate.getMonth() + 1;
						let day = myDate.getDate();
						if (card.length === 18) {
							this.age = myDate.getFullYear() - card.substring(6, 10) - 1;
							if (card.substring(10, 12) < month || card.substring(10, 12) == month && card.substring(12,
									14) <= day) this.age++;
						}
					}
				}
				for (let item of this.zffs) {
					for (let jtem of res.data[0].pay) {
						if (item.name == jtem.paymethodname) {
							this.zffsValue = jtem.paymethodname;
							item.model = jtem.paycardno;
						}
					}
				}
				let str = res.data[0].person_type.split(',');
				for (let item of this.rqfl) {
					for (let jtem of str) {
						if (item.name == jtem) {
							item.checked = true;
						}
					}
				}
				if (res.data[0].allergy_history !== '') {
					let allergy_history = res.data[0].allergy_history.split(',');
					for (let item of this.ywgms) {
						for (let jtem of allergy_history) {
							if (item.name == jtem) {
								item.checked = true;
							}
							if (item.name == '其他') {
								if (jtem !== '无') {
									item.checked = true;
									item.model = jtem;
								}
							}
						}
					}
				}
				let expose_history = res.data[0].expose_history.split(',');
				for (let item of this.bls) {
					for (let jtem of expose_history) {
						if (item.name == jtem) {
							item.checked = true;
						}
					}
				}
				this.tsrqfl.model = res.data[0].special_type;

				for (let item of this.jb[0].list) {
					for (let jtem of res.data[0].is_table) {
						if (item.name == jtem.operation_name && jtem.type == '疾病') {
							item.checked = true;
							item.model_time = jtem.operation_time;
							item.model_desc = jtem.description;
						}
					}
				}
				this.ss[0].value = res.data[0].is_operation;
				let index = 0;
				for (let item of res.data[0].is_table) {
					if (item.type == '手术') {
						this.ss[0].input[index].model_name = item.operation_name
						this.ss[0].input[index].model_time = item.operation_time
						index++;
					}
				}
				this.ws[0].value = res.data[0].is_operation;
				let wsIndex = 0;
				for (let item of res.data[0].is_table) {
					if (item.type == '外伤') {
						this.ws[0].input[wsIndex].model_name = item.operation_name
						this.ws[0].input[wsIndex].model_time = item.operation_time
						wsIndex++;
					}
				}
				this.sx[0].value = res.data[0].is_operation;
				let sxIndex = 0;
				for (let item of res.data[0].is_table) {
					if (item.type == '输血') {
						this.sx[0].input[sxIndex].model_name = item.operation_name
						this.sx[0].input[sxIndex].model_time = item.operation_time
						sxIndex++;
					}
				}
				this.ycbs[0].value = res.data[0].is_hereditary_name;
				this.ycbs[0].input[0].model_name = res.data[0].hereditary_name;
				let disability = res.data[0].disability.split(',');
				for (let item of this.cjqk) {
					for (let jtem of disability) {
						if (item.name == jtem) {
							item.checked = true;
						}
					}
				}
				if (res.data[0].father_chronic_disease !== '') {
					let father_chronic_disease = res.data[0].father_chronic_disease.split(',');
					for (let item of this.fq) {
						for (let jtem of father_chronic_disease) {
							if (item.name == jtem) {
								item.checked = true;
							}
							if (item.name == '其他') {
								item.checked = true;
								item.model = jtem;
							}
						}
					}
				}
				if (res.data[0].mother_chronic_disease !== '') {
					let mother_chronic_disease = res.data[0].mother_chronic_disease.split(',');
					for (let item of this.mq) {
						for (let jtem of mother_chronic_disease) {
							if (item.name == jtem) {
								item.checked = true;
							}
							if (item.name == '其他') {
								item.checked = true;
								item.model = jtem;
							}
						}
					}
				}

				if (res.data[0].brother_chronic_disease !== '') {
					let brother_chronic_disease = res.data[0].brother_chronic_disease.split(',');
					for (let item of this.xdjm) {
						for (let jtem of brother_chronic_disease) {
							if (item.name == jtem) {
								item.checked = true;
							}
							if (item.name == '其他') {
								item.checked = true;
								item.model = jtem;
							}
						}
					}
				}
				if (res.data[0].kid_chronic_disease !== '') {
					let kid_chronic_disease = res.data[0].kid_chronic_disease.split(',');
					for (let item of this.zn) {
						for (let jtem of kid_chronic_disease) {
							if (item.name == jtem) {
								item.checked = true;
							}
							if (item.name == '其他') {
								item.checked = true;
								item.model = jtem;
							}
						}
					}
				}
				for (let item of this.zh) {
					item.model = res.data[0][item.key]
					this.person_sign = res.data[0].person_sign;
					this.family_sign = res.data[0].family_sign;
					if (item.name == '确认时间') {
						item.model = res.data[0].health_createtime;
					}
				}
			},
			// Canvas画板显示状态
			handleisCanvas(item) {
				if (item.name == '本人签字') {
					this.item = '本人签字'
				}
				if (item.name == '家属签字') {
					this.item = '家属签字'
				}
				this.isCanvas = true;
			},
			// 发起网络请求 上传图片
			finish() {
				setTimeout(() => {
					uni.canvasToTempFilePath({
						canvasId: 'mycanvas',
						destWidth: 750,
						destHeight: 325,
						quality: 1,
						fileType: 'jpg',
						success: (res) => {
							let path = res.tempFilePath;
							uni.uploadFile({
								url: 'http://mediasvr.cn.utools.club/batch/upload',
								filePath: path,
								name: 'file',
								formData: {
									'userid': 'ce-shi'
								},
								success: (uploadFileRes) => {
									let obj = JSON.parse(uploadFileRes.data);
									this.isCanvas = false;
									if (this.item == '本人签字') {
										this.person_sign = obj.result;
									}
									if (this.item == '家属签字') {
										this.family_sign = obj.result;
									}

								}
							});
						}
					})
				}, 500)
			},
		}
	}
</script>
<style lang="scss" scoped>
	.wrap {
		width: 100%;
		height: calc(100vh - .5rem);
		background-color: #f0f0f0;

		.scroll {
			width: 100%;
			height: calc(100vh - .5rem);

			.container {
				// width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: .1rem;
				flex-direction: column;

				.content-s {
					background-color: #fff;
					border-radius: 16rpx;
					width: 96%;
					padding: .2rem;
					margin-bottom: .1rem;

					.content {
						display: flex;
						align-items: center;
						flex-wrap: wrap;

						.title {
							width: 100%;
							margin-bottom: .1rem;
						}

						.main {
							display: flex;
							align-items: center;
							margin-bottom: .1rem;
							font-size: .12rem;
							position: relative;

							.name {
								width: 1rem;
								text-align: right;
							}

							.input {
								border: 1rpx solid #e3e3e3;
								border-radius: 8rpx;
								font-size: .12rem;
								padding: 10rpx 0 10rpx 20rpx;
								width: 1.4rem;
								margin-left: .1rem;
							}

							.select_icon {
								position: absolute;
								right: 10rpx;
								color: #ccc;
							}

							.required_icon {
								position: absolute;
								right: -.15rem;
								color: #f00;
							}

							.action {
								margin-left: .1rem;
								background-color: #32cafe;
								padding: 4rpx;
								border-radius: 8rpx;
							}
						}
					}

					// 支付方式
					.check {
						display: flex;

						.txt {
							width: 1.15rem;
							font-size: .12rem;
							text-align: right;
							line-height: .24rem;
						}

						.check-wrap {
							width: 2rem;
							display: flex;
							flex-wrap: wrap;
							width: 100%;
							margin-left: .1rem;

							.check-container {
								display: flex;

								.check-input-box {
									display: flex;
									align-items: center;
									margin-bottom: .1rem;

									.check-input1-content {
										display: flex;
										align-items: center;

										.input {
											border: 1rpx solid #e3e3e3;
											border-radius: 8rpx;
											font-size: .12rem;
											padding: 10rpx 0 10rpx 20rpx;
										}
									}
								}
							}
						}
					}

					// 药物过敏史
					.ywgms {
						display: flex;
						font-size: .12rem;
						align-items: center;
						flex-wrap: wrap;
						margin-bottom: .1rem;

						.txt {
							width: 1rem;
							text-align: right;
						}

						.check-wrap {
							display: flex;
							margin-left: .1rem;

							.input {
								border: 1rpx solid #e3e3e3;
								border-radius: 8rpx;
								font-size: .12rem;
								padding: 10rpx 0 10rpx 20rpx;
							}
						}
					}

					.tsrqfl {
						display: flex;
						align-items: center;
						font-size: .12rem;
						position: relative;
						margin-bottom: .1rem;

						.name {
							width: 1rem;
							text-align: right;
						}

						.input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 1.4rem;
							margin-left: .1rem;
						}

						.select_icon {
							color: #ccc;
							position: absolute;
							left: 2.4rem;
						}
					}

					.jb {
						display: flex;
						font-size: .12rem;

						.txt {
							width: 1rem;
							text-align: right;
							margin: 8rpx .1rem 0 0;
						}

						.check-wrap {

							// width: 100%;
							.check-container {
								display: flex;
								margin-bottom: .1rem;

								.input {
									border: 1rpx solid #e3e3e3;
									border-radius: 8rpx;
									font-size: .12rem;
									padding: 10rpx 0 10rpx 20rpx;
									width: 1.4rem;
								}

								.check-input1-content {
									display: flex;
									align-items: center;
								}
							}
						}
					}

					.radio-wrap {
						display: flex;
						width: 100%;
						font-size: .12rem;
						margin-top: .1rem;

						.txt {
							width: 1rem;
							text-align: right;
							margin: 8rpx .1rem 0 0;
						}

						.left-radio-group {
							// margin-left: .1rem;
						}

						.right-input-wrap {
							display: flex;
							flex: 1;
							flex-wrap: wrap;
							margin-bottom: .1rem;

							.input-content {
								display: flex;
								margin-bottom: .1rem;
								width: 100%;

								.name {
									display: flex;
									align-items: center;

									&>text {
										// margin-left: .4rem;
										width: .8rem;
										text-align: right;
									}

									.input {
										border: 1rpx solid #e3e3e3;
										border-radius: 8rpx;
										font-size: .12rem;
										padding: 10rpx 0 10rpx 20rpx;
										width: 1.4rem;
										margin-left: .1rem;
									}
								}

								.time {
									display: flex;
									align-items: center;

									&>text {
										width: .8rem;
										text-align: right;
									}

									.input {
										border: 1rpx solid #e3e3e3;
										border-radius: 8rpx;
										font-size: .12rem;
										padding: 10rpx 0 10rpx 20rpx;
										width: 1.6rem;
										margin-left: .1rem;
									}
								}
							}
						}
					}

					// 父亲
					.fq {
						display: flex;
						margin-bottom: .1rem;

						.txt {
							width: 1.15rem;
							font-size: .12rem;
							text-align: right;
							line-height: .24rem;
						}

						.check-wrap {
							width: 2rem;
							display: flex;
							flex-wrap: wrap;
							width: 100%;
							margin-left: .1rem;

							.check-container {
								display: flex;

								.input {
									border: 1rpx solid #e3e3e3;
									border-radius: 8rpx;
									font-size: .12rem;
									padding: 10rpx 0 10rpx 20rpx;
								}
							}
						}
					}

					// 最后
					.zh {
						display: flex;
						font-size: .12rem;
						margin-top: .1rem;

						.content {
							display: flex;
							margin-bottom: .1rem;
							position: relative;

							.name {
								width: 1rem;
								text-align: right;
							}

							.input {
								border: 1rpx solid #e3e3e3;
								border-radius: 8rpx;
								padding: 10rpx 0 10rpx 20rpx;
								width: 1.5rem;
								margin-left: .1rem;
								font-size: .12rem;
							}

							.select_icon {
								color: #ccc;
								position: absolute;
								right: .1rem;
							}

							.required_icon {
								color: #f00;
							}

							.mb {
								margin-left: .1rem;
							}
						}
					}
				}
			}
		}

		.btn-container {
			display: flex;
			align-items: center;
			justify-content: center;

			.btn {
				position: fixed;
				bottom: .2rem;
				width: 1.1rem;
				height: .3rem;
			}
		}
	}
</style>
