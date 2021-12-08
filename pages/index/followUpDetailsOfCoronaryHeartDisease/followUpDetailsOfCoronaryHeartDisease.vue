<template>
	<view class="wrap">
		<scroll-view scroll-y class="scroll">
			<free-title title="冠心病随访详细信息" isRight :camera="camera"></free-title>
			<view class="container">
				<view class="content">
					<view class="main" v-for="(item,index) in gxb" :key="index"
						:style="item.name == '症状' ? 'width:100%;' : ''">
						<view class="main-input" v-if="!item.checkbox">
							<text class="name">{{item.name}}</text>
							<input :type="item.type" :placeholder="item.placeholder" v-model="item.model"
								:disabled="item.disabled" :adjust-position="false"
								@click="item.select  ? handleTapInput(item.name) : ''" />
							<text class="iconfont select">{{item.select}}</text>
							<text class="iconfont required">{{item.required}}</text>
						</view>
						<view v-if="item.checkbox" class="checkbox-wrap">
							<text class="name">{{item.name}}</text>
							<u-checkbox-group class="u-checkbox-group">
								<u-checkbox v-model="ctem.checked" v-for="(ctem, cndex) in item.checkbox" :key="cndex"
									:name="ctem.name" @change="checkboxChange">
									<view class="left">
										<text class="u-checkbox-name">{{ctem.name}}</text>
										<input @click.stop="" v-if="ctem.name == '其他' && ctem.checked" type="text"
											v-model="ctem.model" class="input">
									</view>
								</u-checkbox>
							</u-checkbox-group>
						</view>
					</view>
				</view>
				<!-- 体征 -->
				<view class="tz-content">
					<text class="title">体征</text>
					<view class="main" v-for="(item,index) in sign" :key="index"
						:style="item.name == '其他' ? 'width:100%;' : ''">
						<text class="name">{{item.name}}</text>
						<input v-model="item.one" :style="item.name == '其他' ? 'width:85%;' : ''"
							:adjust-position="false"
							@input="item.name == '身高' || item.name == '体重' ? handleTzzs() : ''" />
						<text class="txt" v-if="item.state !== 0">/</text>
						<input v-if="item.state !== 0" v-model="item.two" :adjust-position="false" />
						<text class="unit" v-if="item.unit!==''">{{item.unit}}</text>
						<view class="icon" v-if="item.icon" @click="handleViewDetails(item.name)">{{item.icon}}</view>
						<text class="status" v-if="item.status">{{item.status}}</text>
					</view>
				</view>
				<!-- 生活方式指导 -->
				<view class="shfs-content">
					<text class="title">生活方式指导</text>
					<view class="main" v-for="(item,index) in lifestyleGuidance" :key="index"
						:style="item.name == '摄盐情况' || item.name == '辅助检查' || item.name == '生活方式改变监测' ? 'width:100%;' : ''">
						<view class="main-input" v-if="!item.checkbox">
							<text class="name">{{item.name}}</text>
							<text class="iconfont required">{{item.required}}</text>
							<input v-model="item.one" :style="handleShfsInput(item)"
								@click="item.select  ? handleTapInput(item.name) : ''" :placeholder="item.placeholder"
								:disabled="item.disabled" :adjust-position="false" />
							<text class="iconfont select" v-if="item.select">{{item.select}}</text>
							<text class="oneunit">{{item.oneunit}}</text>
							<text class="txt" v-if="item.state !==0">/</text>
							<input v-model="item.two" v-if="item.state !==0" :adjust-position="false" />
							<text class="twounit">{{item.twounit}}</text>
						</view>
						<view v-if="item.checkbox" class="shfs-checkbox-wrap">
							<text class="name">{{item.name}}</text>
							<u-checkbox-group class="u-checkbox-group">
								<u-checkbox v-model="ctem.checked" v-for="(ctem, cndex) in item.checkbox" :key="cndex"
									:name="ctem.name">
									<view class="left">
										<text class="u-checkbox-name">{{ctem.name}}</text>
										<input @click.stop="" v-if="ctem.name == '其他' && ctem.checked" type="text"
											v-model="ctem.model" class="input">
									</view>
								</u-checkbox>
							</u-checkbox-group>
						</view>
					</view>
				</view>
				<!-- 用药情况 -->
				<view class="yyqk-content">
					<view class="title-box">
						<text class="title">用药情况</text>
						<view class="icon" @click="handleViewDetails('用药情况')">...</view>
					</view>
					<view class="item-box">
						<view class="item1">用药情况</view>
						<view class="yw-item">药物名称</view>
						<view class="item">每日次数</view>
						<view class="item">每次用量</view>
						<view class="item">单位</view>
						<view class="add" @click="handleTapAddDrugUsage">+</view>
					</view>
					<view v-for="(item,index) in medication[0].items" :key="index" class="bottom">
						<input :adjust-position="false" v-model="item.drug_name" style="width: 2rem;" />
						<input :adjust-position="false" v-model="item.day_count" />
						<input :adjust-position="false" v-model="item.every_time_dosage" />
						<input :adjust-position="false" v-model="item.unit" />
						<view class="iconfont del" @click="handleTapDelDrugUsage(index,item)">&#xe718;</view>
					</view>
					<view class="select-input">
						<view v-for="(item,index) in medication[1].list" :key="index" class="main"
							:style="item.name == '药物不良反应' ? 'width:100%;' : ''">
							<text class="name">{{item.name}}</text>
							<input :placeholder="item.placeholder" :disabled="item.disabled" v-model="item.one"
								:adjust-position="false" @click="item.select  ? handleTapInput(item.name) : ''" />
							<input v-if="item.name == '用药方式'" v-model="item.two" :adjust-position="false" />
							<text class="iconfont select" v-if="item.select"
								:style="item.name == '药物不良反应' ? 'left:2.22rem;' : ''">{{item.select}}</text>
						</view>
					</view>
				</view>
				<!-- 转诊 -->
				<view class="zz-content">
					<text class="title">转诊</text>
					<view v-for="(item,index) in zz" :key="index" class="main">
						<text class="name">{{item.name}}</text>
						<input :disabled="item.disabled" v-model="item.model" :adjust-position="false"
							@click="item.select  ? handleTapInput(item.name) : ''" />
						<text class="iconfont select">{{item.select}}</text>
						<text class="iconfont required">{{item.required}}</text>
						<text class="iconfont icon" @click="handleisCanvas(item)">{{item.icon}}</text>
						<image v-if="item.name == '随访医生' && follow_doctor!==''" :src="follow_doctor"
							style="width: 1rem;height: .3rem;">
						</image>
					</view>
				</view>
			</view>
			<view class="btn-container">
				<u-button class="btn" type="primary" @click="handleSubmitBtn">保存</u-button>
			</view>
			<canva v-if="isCanvas" @close="isCanvas = false" @finish="finish"></canva>
			<free-table-popup title="血压检测列表" :isPopup="isBloodPressureCheckList"
				@close="isBloodPressureCheckList = false" :tableHead="bloodPressureCheckList[0]"
				:tableContent="bloodPressureCheckList[1]">
			</free-table-popup>
			<free-table-popup title="身高检测列表" :isPopup="isStatureCheckingList" @close="isStatureCheckingList = false"
				:tableHead="statureCheckingList[0]" :tableContent="statureCheckingList[1]">
			</free-table-popup>
			<free-table-popup title="体重检测列表" :isPopup="isWeightCheckingList" @close="isWeightCheckingList = false"
				:tableHead="weightCheckingList[0]" :tableContent="weightCheckingList[1]">
			</free-table-popup>
			<free-table-popup title="空腹血糖检测列表" :isPopup="isFastingBloodGlucoseTestList"
				@close="isFastingBloodGlucoseTestList = false" :tableHead="fastingBloodGlucoseTestList[0]"
				:tableContent="fastingBloodGlucoseTestList[1]">
			</free-table-popup>
			<free-table-popup ref="table" title="用药列表" :isPopup="isDrugUsage" :searchBar="searchBar"
				:tableHead="table[0]" :tableContent="table[1]" :pagination="pagination"
				@click="handleTapAddDrugs('用药情况')" @close="handleCloseDrugPopup" @search="handleTapSearchBtn"
				@delItem="handleDelDurgUsageList" @editItem="handleTabEditItem" @pageJump="handleTapPageJumpBtn"
				@previousPage="handlePreviousPage" @nextPage="handleNextPage" @selectItem="handleTapSelectItem">
			</free-table-popup>
			<free-add-drugs :isFreeAddDrug="isFreeAddDrug" :drugForm="medicationForm"
				@close="handleTapCloseAddDrugs('用药情况')" @click="handleSubmitAddDrug" @slectClick="handleSlectClick">
			</free-add-drugs>
		</scroll-view>
		<u-picker v-model="isTime" mode="time" @confirm="handlePicker"></u-picker>
		<u-select v-model="selectorIsShow" :list="selectList" @confirm="handleSelect"></u-select>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import data from '@/js/followUpDetailsOfCoronaryHeartDisease.js';
	import canva from "@/components/free-ui/free-canvas/canvas.vue";
	import utils from "@/common/utils.js";
	import util from '@/utils/util.js';
	import freeTablePopup from '@/components/free-ui/free-table-popup/free-table-popup.vue';
	import freeAddDrugs from '@/components/free-ui/free-add-drugs/free-add-drugs.vue';
	let bldprs = null;
	let bldPressDevice = require('@/utils/BTDevice/BldPressBTDevice.js');
	export default {
		components: {
			freeTitle,
			canva,
			freeTablePopup,
			freeAddDrugs
		},
		data() {
			return {
				camera: '',
				xydata: {},
				// 设备信息
				equipment: {
					e_name: "BP06D21801040414",
					notice_id: "0000FFF1-0000-1000-8000-00805F9B34FB",
					write_in_id: "0000FFF2-0000-1000-8000-00805F9B34FB",
					service_id: "0000FFF0-0000-1000-8000-00805F9B34FB",
					e_id: "f5aa736f-da98-4f3b-a1da-017336a2b5d2"
				},
				drugName: '',
				searchBar: false,
				isDrugUsage: false,
				isFreeAddDrug: false,
				pageModel: '',
				pagination: {
					rows: 10,
					page: 1,
					sidx: '',
					sord: '',
					records: 0,
					total: 0
				},
				table: [
					[{
							th: '药物名称',
							key: 'drug_name'
						},
						{
							th: '每日次数',
							key: 'day_count'
						},
						{
							th: '每次用量',
							key: 'every_time_dosage'
						},
						{
							th: '单位',
							key: 'unit'
						},
						{
							th: '操作',
							key: 'operation'
						}
					],
					[]
				],
				medicationForm: [{
						name: '药物名称：',
						value: '',
						key: 'drug_name'
					},
					{
						name: '每日次数：',
						value: '',
						key: 'day_count'
					},
					{
						name: '用量：',
						value: '',
						key: 'every_time_dosage',
						select: '\ue65a'
					},
					{
						name: '单位：',
						value: '',
						key: 'unit',
						select: '\ue65a'
					}
				],
				gxb: JSON.parse(JSON.stringify(data.gxb)),
				sign: JSON.parse(JSON.stringify(data.sign)),
				lifestyleGuidance: JSON.parse(JSON.stringify(data.lifestyleGuidance)),
				medication: JSON.parse(JSON.stringify(data.medication)),
				zz: JSON.parse(JSON.stringify(data.zz)),
				isCanvas: false,
				follow_doctor: '',
				camvasItem: '',
				isTime: false,
				selectorIsShow: false,
				selectList: [],
				item: '',
				bloodPressureCheckList: [
					[{
						th: '收缩压(mmHg)',
						key: 'systolicPressure'
					}, {
						th: '舒张压(mmHg)',
						key: 'diastolicPressure'
					}, {
						th: '脉率(次/分钟)',
						key: 'pulseRate'
					}, {
						th: '检测日期',
						key: 'testDate'
					}, {
						th: '操作',
						key: 'operation'
					}],
					[{
							systolicPressure: '70',
							diastolicPressure: '50',
							pulseRate: '92',
							testDate: '2021-06-10',
							operation: {
								edit: '编辑',
								del: '删除'
							}
						},
						{
							systolicPressure: '70',
							diastolicPressure: '50',
							pulseRate: '92',
							testDate: '2021-06-10',
							operation: {
								edit: '编辑',
								del: '删除'
							}
						}
					]
				],
				statureCheckingList: [
					[{
						th: '身高(cm)',
						key: 'stature'
					}, {
						th: '检测日期',
						key: 'testDate'
					}, {
						th: '操作',
						key: 'operation'
					}],
					[{
						stature: '1.75',
						testDate: '2021-06-10',
						operation: {
							edit: '编辑',
							del: '删除'
						}
					}]
				],
				weightCheckingList: [
					[{
						th: '体重(kg)',
						key: 'weight'
					}, {
						th: '检测日期',
						key: 'testDate'
					}, {
						th: '操作',
						key: 'operation'
					}],
					[{
						weight: '45',
						testDate: '2021-06-10',
						operation: {
							edit: '编辑',
							del: '删除'
						}
					}]
				],
				fastingBloodGlucoseTestList: [
					[{
						th: '空腹血糖(mmol/L)',
						key: 'fgb'
					}, {
						th: '检测日期',
						key: 'testDate'
					}, {
						th: '操作',
						key: 'operation'
					}],
					[{
						fgb: '45',
						testDate: '2021-06-10',
						operation: {
							edit: '编辑',
							del: '删除'
						}
					}]
				],
				isBloodPressureCheckList: false,
				isStatureCheckingList: false,
				isWeightCheckingList: false,
				isFastingBloodGlucoseTestList: false,
				follow_id: '',
				person_id: '',
				medicId: '',
				F_UserId: '',
				// 收缩压
				systolicPressure: 0,
				// 舒张压
				diastolicPressure: 0,
				// 心率
				pulse: 0
			}
		},
		mounted() {
			bldprs = new bldPressDevice.BldPressBTDevice();
			bldprs.close();
			bldprs.init();
			// 赋值
			uni.$on('switchUser', () => {
				this.gxb = JSON.parse(JSON.stringify(data.gxb));
				this.sign = JSON.parse(JSON.stringify(data.sign));
				this.lifestyleGuidance = JSON.parse(JSON.stringify(data.lifestyleGuidance));
				this.medication = JSON.parse(JSON.stringify(data.medication));
				this.zz = JSON.parse(JSON.stringify(data.zz));
			})
			let res = uni.getStorageSync('login_info');
			let edit = uni.getStorageSync('edit');
			let userInfo = uni.getStorageSync('user_info');
			console.log(userInfo);
			if (userInfo !== '') {
				this.F_UserId = userInfo[0].doctor_id;
			}
			// console.log(edit);
			// console.log(edit);
			if (edit) {
				this.person_id = edit.person_id;
				this.follow_id = edit.follow_id;
				// console.log(this.follow_id);
			} else {
				if (res !== '') {
					this.person_id = res[0].id;
				}
			}
			this.handleInit();
			this.handleSearchCoronaryHeartFollow();
			this.camera = utils.camera(this.basicSettingsList, this.camera);
			this.start();
			this.handleGetDoctorName();
		},
		destroyed() {
			bldprs.close();
		},
		computed: {
			...mapState(['basicSettingsList', 'tjsfList']),
			// 生活方式指导input样式
			handleShfsInput() {
				return function(item) {
					if (item.state == 0) {
						return 'width: 1.9rem;'
					}
					if (item.name == '辅助检查') {
						return 'width:85%;'
					}
				}
			},
			gxbInit() {
				return JSON.parse(JSON.stringify(this.gxb));
			}
		},
		watch: {
			gxbInit: {
				handler(newValue, oldValue) {
					for (let i in newValue) {
						if (oldValue[i] != newValue[i]) {
							console.log(newValue);
							this.handleInit();
						}
					}
				},
				deep: true
			}
		},
		methods: {
			// 自动获取医生
			handleGetDoctorName() {
				let res = uni.getStorageSync('user_info');
				if (res !== '') {
					for (let item of this.zz) {
						if (item.name == '随访医生') {
							item.model = res[0].doctor_name;
						}
					}
				}
			},
			handleTzzs() {
				let num = '';
				let result = '';
				let data = this.sign;
				for (let item of this.sign) {
					for (let jtem of data) {
						if ((item.name == '体重' && item.one !== '') && (jtem.name == '身高' && jtem.one !== '')) {
							num = jtem.one / 100;
							result = item.one / (num * num);
						}
						if (item.name == '体质指数' && !!result) {
							item.one = result.toFixed(2);
						}
						if (jtem.name == '体质指数') {
							if ((item.name == '体重' && item.one == '') || (item.name == '身高' && item.one == '')) {
								jtem.one = '';
							}
						}
					}
				}
			},
			handleInit() {
				for (let item of this.gxb) {
					if (item.name == '随访日期') {
						for (let jtem of this.basicSettingsList) {
							if (jtem.name == '默认下次随访日期天数') {
								for (let ctem of this.zz) {
									if (ctem.name == '下次随访日期') {
										let time = new Date().setDate(new Date(item.model).getDate() + Number(jtem.value))
										ctem.model = utils.formatTime(new Date(time))
									}
								}
							}
						}
					}
				}
			},
			start() {
				let that = this;
				try {
					// that.$emit('changeisOperationButton', that.isOperationButton);
					that.xydata = {};
					that.$lz.tipLoading('正在加载...');
					let param = {
						deviceName: that.equipment.e_name,
						notifyId: that.equipment.notice_id,
						writeId: that.equipment.write_in_id,
						serviceId: that.equipment.service_id
					}
					console.log(param);
					bldprs.start(
						param,
						function(d) {
							if (d.success == true) {
								// that.dType = JSON.stringify(d.type);
								if (d.type == "data-press" || d.type == "data-result") {
									that.xydata = d.data;
									that.$lz.hideLoading();
								}
								if (JSON.stringify(that.xydata) !== "{}") {
									that.systolicPressure = that.xydata.sysVal ? that.xydata.sysVal : that.xydata
										.replace("mmHg", '');
								}
								that.diastolicPressure = that.xydata.diaVal;
								that.pulse = that.xydata.pulVal;
								for (let item of that.sign) {
									if (item.name == '血压') {
										item.one = that.systolicPressure;
										item.two = that.diastolicPressure;
										item.status = d.msg;
									}
									if (item.name == '心率') {
										item.one = that.pulse;
									}
								}
							} else {
								if (d.type && d.type == 'initBlue') {
									that.$lz.hideCancel('注意', d.msg);
								}
								// if (d.type == '_getDevInfo') {
								// 	that.$lz.hideCancel('注意', "请把绑带按说明书要求绑扎到胳膊上,打开血压计电源开关后,再按'开始测量'按钮!")
								// }

								if (d.type && d.type !== '_getDevInfo') {
									that.$lz.hideCancel('注意', d.msg);
								}
								if (d.type && d.type == 'err') {
									that.$lz.hideCancel('发生错误', d.msg);
								}
								if (d.type && d.type == 'startReceive') {
									that.$lz.hideCancel('发生错误', d.msg);
								}
								that.$lz.hideLoading();
								// that.$emit('changeisOperationButton', that.isOperationButton);
							}
						}, 2000
					);
				} catch (e) {
					that.$lz.hideLoading();
				}
			},
			checkboxChange(e) {
				for (let item of this.gxb) {
					if (item.checkbox) {
						for (let ctem of item.checkbox) {
							if (e.name == '无症状' && e.value && ctem.name !== '无症状') {
								ctem.checked = false;
							}
							if (e.name !== '无症状' && ctem.name == '无症状') {
								ctem.checked = false;
							}
						}
					}
				}
			},
			handleSlectClick(item) {
				this.item = item;
				this.selectorIsShow = true;
				let arr = [];
				this.selectList = [];
				let index = 0;
				if (item == '单位：') {
					this.tjsfList.map(item => {
						if (item.name == '单位') {
							arr = item.value.split(',');
						}
					})
					for (let item of arr) {
						index++;
						this.selectList.push({
							value: index,
							label: item
						})
					}
				}
				if (item == '用量：') {
					this.tjsfList.map(item => {
						if (item.name == '用量') {
							arr = item.value.split(',');
						}
					})
					for (let item of arr) {
						index++;
						this.selectList.push({
							value: index,
							label: item
						})
					}
				}
			},
			// 添加用药列表
			handleTapAddDrugUsage() {
				this.medication[0].items.push({
					drug_name: '',
					day_count: '',
					every_time_dosage: '',
					unit: '',
					status: 0,
					medicId: ''
				})
			},
			// 点击添加按钮 添加用药
			handleTapAddDrugs(item) {
				console.log(item);
				this.medicId = '';
				if (item == '用药情况') {
					this.isFreeAddDrug = true;
					this.isDrugUsage = false;
					for (let item of this.medicationForm) {
						item.value = '';
					}
				}
			},
			// 发起网络请求 删除用药列表
			handleTapDelDrugUsage(index, item) {
				console.log(item);
				if (item.id) {
					this.$lz.showCancel('', '是否要删除?').then(res => {
						this.$u.post('DelDrug', {
							id: item.id,
							follow_id: this.follow_id,
						}).then(res => {
							console.log(res);
							if (res.code == 200 && res.info == '响应成功') {
								this.medication[0].items.splice(index, 1);
							}
							this.$lz.toast(res.info);
						}).catch(err => {
							// console.log(err);
							this.$lz.toast(err.errMsg);
						})
					})
				} else {
					this.medication[0].items.splice(index, 1);
				}
			},
			// 分发popup弹出
			handleViewDetails(item) {
				// console.log(item);
				if (item == '血压') {
					this.isBloodPressureCheckList = true;
				}
				if (item == '身高') {
					this.isStatureCheckingList = true;
				}
				if (item == '体重') {
					this.isWeightCheckingList = true;
				}
				if (item == '空腹血糖') {
					this.isFastingBloodGlucoseTestList = true;
				}
				if (item == '用药情况') {
					this.searchBar = true;
					this.isDrugUsage = true;
					this.handleSearchDrugUsageList();
				}
			},
			// 关闭用药列表弹出层
			handleCloseDrugPopup() {
				this.searchBar = false;
				this.isDrugUsage = false;
			},
			// 关闭添加用药 弹出层
			handleTapCloseAddDrugs() {
				this.isDrugUsage = true;
				this.searchBar = true;
				this.isFreeAddDrug = false;
				this.handleSearchDrugUsageList();
			},
			// 发起网络请求 添加用药 icon
			handleSubmitAddDrug() {
				for (let item of this.medicationForm) {
					if (item.value == '') {
						return this.$lz.toast(item.name + '不能为空');
					}
				}
				let param = {},
					data = {
						medicId: this.medicId,
						F_UserId: this.F_UserId,
						create_time: util.getFtSystemTime()
					};
				for (let item of this.medicationForm) {
					data[item.key] = item.value;
				}
				param.data = data;
				console.log(param);
				this.$u.post('SaveDrugUsage', param).then(res => {
					console.log(res);
					if (res.code == 200 && res.info == '响应成功') {
						this.$lz.toast(res.info);
						// this.medicId = res.data.pagedatas[0].medicId;
						this.medicId = res.data.medicId;
					} else {
						this.$lz.toast(res.info);
					}
					this.isFreeAddDrug = false;
				}).catch(err => {
					this.isFreeAddDrug = false;
					this.$lz.toast(err.errMsg);
					console.log(err);
				})
			},
			// 查询用药列表 药名
			handleTapSearchBtn(item) {
				this.drugName = item;
				this.table[1] = [];
				this.pagination.page = 1;
				this.handleSearchDrugUsageList();
			},
			// select输入框点击事件
			handleTapInput(item) {
				this.item = item;
				this.selectorIsShow = true;
				switch (item) {
					case '随访日期':
					case '下次随访日期':
						this.selectorIsShow = false;
						this.isTime = true;
						break;
					case '随访方式':
						this.selectList = utils.followUpMode;
						break;
					case '冠心病类型':
						this.selectList = data.gxbType;
						break;
					case '心理调整':
					case '遵医行为':
						this.selectList = utils.behavior;
						break;
					case '用药方式':
						this.selectList = data.medicationMode;
						break;
					case '服药依从性':
						this.selectList = data.medicationCompliance;
						break;
					case '药物不良反应':
						this.selectList = data.ddverseDrugReactions;
						break;
					case '特殊治疗':
						this.selectList = data.specialTreatment;
						break;
					case '此次随访分类':
						this.selectList = utils.classificationThisFollowUp;
						break;
				}
			},
			// picker @confirm 事件
			handlePicker(e) {
				for (let item of this.gxb) {
					if (item.name == this.item) {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
				for (let item of this.zz) {
					if (item.name == this.item) {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
			},
			// u-select @confirm 事件
			handleSelect(e) {
				let _item = this.item;
				for (let item of this.gxb) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
				for (let item of this.lifestyleGuidance) {
					if (_item == item.name) {
						item.one = e[0].label;
					}
				}
				for (let item of this.medication[1].list) {
					if (_item == item.name) {
						item.one = e[0].label;
					}
				}
				for (let item of this.medicationForm) {
					console.log(item.name);
					console.log(this.item);
					if (item.name == this.item) {
						item.value = e[0].label;
					}
				}
			},
			// Canvas画板显示
			handleisCanvas(item) {
				this.camvasItem = item.name;
				this.isCanvas = true;
			},
			// 发起请求 上传图片到服务器
			finish() {
				setTimeout(() => {
					uni.canvasToTempFilePath({
						canvasId: 'mycanvas',
						destWidth: 750,
						destHeight: 325,
						quality: 1,
						fileType: 'jpg',
						success: res => {
							let path = res.tempFilePath;
							uni.uploadFile({
								url: 'http://mediasvr.ajylive.cn:8080/batch/upload',
								filePath: path,
								name: 'file',
								formData: {
									'userid': 'ce-shi'
								},
								success: uploadFileRes => {
									let obj = JSON.parse(uploadFileRes.data);
									this.isCanvas = false;
									if (this.camvasItem == '随访医生') {
										this.follow_doctor = obj.result;
									}
								},
								fail: err => {
									this.$lz.toast('上传失败');
									this.isCanvas = false;
								}
							});
						}
					})
				}, 500)
			},
			// 发起请求 保存/修改信息
			handleSubmitBtn() {
				for (let item of this.gxb) {
					for (let jtem of this.zz) {
						for (let atem of this.lifestyleGuidance) {
							if (item.isRequired && item.model == '' || jtem.isRequired && jtem.model == '' || atem
								.isRequired && atem.one == '') {
								return this.$lz.toast('必填项不能为空');
							}
						}
					}
				}
				let param = {
					data: {}
				}
				let info = {
					follow_id: this.follow_id,
					person_id: this.person_id,
					symptom: ''
				}
				let arr = [];
				for (let item of this.gxb) {
					info[item.key] = item.model;
					if (item.checkbox) {
						for (let jtem of item.checkbox) {
							if (jtem.checked) {
								arr.push(jtem.name);
							}
						}
					}
				}
				param.data.info = info;
				param.data.info.symptom = arr.join(',');

				let sign = {};
				for (let item of this.sign) {
					sign[item.onekey] = item.one;
					if (item.twokey) {
						sign[item.twokey] = item.two;
					}
				}
				param.data.sign = sign;
				let Lifestyle_Guidance = {
					life_style_monitor: ''
				};
				let life_style_monitor = [];
				for (let item of this.lifestyleGuidance) {
					Lifestyle_Guidance[item.onekey] = item.one;
					if (item.twokey) {
						Lifestyle_Guidance[item.twokey] = item.two;
					}
					if (item.checkbox) {
						for (let jtem of item.checkbox) {
							if (jtem.checked) {
								life_style_monitor.push(jtem.name);
							}
						}
					}
				}
				param.data.Lifestyle_Guidance = Lifestyle_Guidance;
				param.data.Lifestyle_Guidance.life_style_monitor = life_style_monitor.join(',');
				let druginfo = {
					drug: []
				}
				for (let item of this.medication[0].items) {
					let obj = {
						person_id: this.person_id,
						follow_id: '',
						follow_type: 'gxbsf',
						drug_name: item.drug_name,
						day_count: item.day_count,
						every_time_dosage: item.every_time_dosage,
						unit: item.unit,
						create_time: util.getFtSystemTime(),
						usage: '',
						medicId: ''
					}
					druginfo.drug.push(obj);
				}
				for (let item of this.medication) {
					if (item.list) {
						for (let jtem of item.list) {
							druginfo[jtem.onekey] = jtem.one;
							if (jtem.twokey) {
								druginfo[jtem.twokey] = jtem.two;
							}
						}
					}
				}
				param.data.druginfo = druginfo;
				let transfer = {
					upload_status: '0',
					follow_doctor_sign: this.follow_doctor
				};
				for (let item of this.zz) {
					transfer[item.key] = item.model;
				}
				param.data.transfer = transfer;
				console.log(param);
				this.$u.post('SaveCoronaryHeartFollow', param).then(res => {
					console.log(res);
					if (res.code == 200 && JSON.stringify(res.data) !== '[]') {
						this.$lz.toast(res.info);
						this.follow_id = res.data[0].follow_id;
						this.medication[0].items = res.data[0].drug;
					} else {
						this.$lz.toast(res.info);
					}
				}).catch(err => {
					console.log(err);
				})
			},
			// 发起请求 查询冠心病随访详细信息
			handleSearchCoronaryHeartFollow() {
				this.$u.post('SearchCoronaryHeartFollow', {
					follow_id: this.follow_id
				}).then(res => {
					console.log(res);
					if (res.code == 200 && res.info == '响应成功' && JSON.stringify(res.data) !== '[]') {
						let data = res.data[0];
						for (let item of this.gxb) {
							item.model = data[item.key];
							if (item.checkbox) {
								for (let jtem of item.checkbox) {
									for (let stem of data.symptom.split(',')) {
										if (jtem.name == stem) {
											jtem.checked = true;
										}
									}
								}
							}
						}
						for (let item of this.sign) {
							item.one = data[item.onekey];
							if (item.twokey) {
								item.two = data[item.twokey];
							}
						}

						for (let item of this.lifestyleGuidance) {
							item.one = data[item.onekey];
							if (item.twokey) {
								item.two = data[item.twokey];
							}
							if (item.checkbox) {
								for (let ctem of item.checkbox) {
									for (let jtem of data.life_style_monitor.split(',')) {
										if (ctem.name == jtem) {
											ctem.checked = true;
										}
									}
								}
							}
						}
						let drug = [];
						for (let item of data.drug) {
							drug.push({
								drug_name: item.drug_name,
								day_count: item.day_count,
								every_time_dosage: item.every_time_dosage,
								unit: item.unit,
								id: item.id
							})
							this.medication[0].items = drug;
							// console.log(this.medication[0].items);
						}

						for (let item of this.medication[1].list) {
							item.one = data[item.onekey];
							if (item.twokey) {
								item.two = data[item.twokey];
							}
						}
						this.follow_doctor = data.follow_doctor_sign;
						for (let item of this.zz) {
							item.model = data[item.key];
						}
					}
				}).catch(err => {
					console.log(err);
				})
			},
			// 查询用药列表
			handleSearchDrugUsageList() {
				let obj = {
					F_UserId: this.F_UserId,
					drug_name: this.drugName,
					pagination: JSON.stringify(this.pagination)

				}
				this.table[1] = [];
				this.$refs.table.drugNames = '';
				this.$refs.table.pageModels = '';
				// console.log(obj);
				this.$u.post('SearchDrugUsageList', obj).then(res => {
					console.log(res);
					if (res.code == 200 && res.info == '响应成功' && res.data.pagedatas.length) {
						this.pagination.total = res.data.pagenumber;
						// console.log(this.pagination.total);
						let arr = [];
						res.data.pagedatas.forEach(item => {
							arr.push(item)
						})
						this.table[1] = arr;
						this.$refs.table.tableContents = this.table[1];
					} else {
						this.$lz.toast('暂无数据~');
						this.pagination.total = res.data.pagenumber;
						this.table[1] = [];
						this.$refs.table.tableContents = this.table[1];
					}
				}).catch(err => {
					console.log(err);
					this.$lz.toast(err.errMsg);
				})
			},
			// 删除用药列表
			handleDelDurgUsageList(item, index) {
				this.$lz.showCancel('', '是否要删除?').then(res => {
					this.$u.post('DelDurgUsageList', {
						medicId: item.medicId
					}).then(res => {
						console.log(res);
						if (res.code == 200 && res.info == '响应成功' && res.data) {
							this.$lz.toast(res.info);
							this.table[1] = [];
							this.pagination.page = 1;
							this.handleSearchDrugUsageList();
						} else {
							this.$lz.toast(res.info);
						}
					}).catch(err => {
						console.log(err);
						this.$lz.toast(err.errMsg);
					})
				})
			},
			// 查询用药情况信息
			handleTabEditItem(item) {
				console.log(item);
				this.medicId = item.medicId;
				this.$u.post('SearchDrugUsage', {
					medicId: this.medicId
				}).then(res => {
					if (res.code == 200 && res.info == '响应成功') {
						let data = res.data[0];
						this.isDrugUsage = false;
						this.isFreeAddDrug = true;
						for (let item of this.medicationForm) {
							item.value = data[item.key];
						}
					}
				}).catch(err => {
					console.log(err);
				})
			},
			// 输入要跳转的列表页 点击确定按钮跳转对应列表页
			handleTapPageJumpBtn(page) {
				if (page !== '') {
					this.pageModel = page;
					if (this.pageModel <= this.pagination.total) {
						this.pagination.page = this.pageModel;
						this.handleSearchDrugUsageList();
					} else {
						return this.$lz.toast('暂无数据');
					}
				} else {
					return this.$lz.hideCancel('', '请输入要跳转的页数');
				}
			},
			// 切换列表显示页数 上一页
			handlePreviousPage() {
				if (this.pagination.page == 1) {
					this.$lz.toast('已经是第一页了哦');
				} else {
					this.pagination.page--;
					this.handleSearchDrugUsageList();
				}
			},
			// 切换列表显示页数 下一页
			handleNextPage() {
				if (this.pagination.page < this.pagination.total) {
					this.pagination.page++;
					this.handleSearchDrugUsageList();
				} else {
					return this.$lz.toast('没有更多数据了!');
				}
			},
			// 点击选择按钮 添加某一列用药
			handleTapSelectItem(item) {
				console.log(item);
				this.medication[0].items.push(item);
				this.isDrugUsage = false;
				this.searchBar = false;
				this.isFreeAddDrug = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 100%;
		height: calc(100vh - .5rem);
		background-color: #f0f0f0;
		font-size: .12rem;

		.scroll {
			width: 100%;
			height: calc(100vh - .5rem);

			.container {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				margin-bottom: .1rem;

				.content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					margin-bottom: .1rem;

					.main {
						width: 50%;
						margin-bottom: .1rem;
						position: relative;

						.main-input {
							display: flex;
							align-items: center;

							.name {
								width: .9rem;
								text-align: right;
								font-size: .12rem;
							}

							&>input {
								border: 1rpx solid #e3e3e3;
								border-radius: 8rpx;
								font-size: .12rem;
								padding: 10rpx 0 10rpx 20rpx;
								width: 1.6rem;
								margin-left: .1rem;
							}

							.select {
								color: #ccc;
								position: absolute;
								right: 1.55rem;
							}

							.required {
								color: #f00;
							}
						}

						.checkbox-wrap {
							display: flex;

							.name {
								width: .9rem;
								text-align: right;
								font-size: .12rem;
								flex-shrink: 0;
							}

							.u-checkbox-group {
								margin-left: .1rem;

								.left {
									display: flex;
									align-items: center;

									.input {
										border: 1rpx solid #e3e3e3;
										border-radius: 8rpx;
										font-size: .12rem;
										padding: 10rpx 0 10rpx 20rpx;
										width: 1.6rem;
										margin: .1rem;
									}
								}

								.u-checkbox-name {
									font-size: .14rem;
								}
							}
						}
					}
				}

				// 体征
				.tz-content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					margin-bottom: .1rem;

					.title {
						display: block;
						width: 100%;
					}

					.main {
						display: flex;
						align-items: center;
						margin-bottom: .1rem;
						width: 50%;

						.name {
							width: .9rem;
							text-align: right;
						}

						.txt {
							margin-left: .1rem;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: .4rem;
							margin-left: .1rem;
						}

						.unit {
							width: .6rem;
							padding-left: .1rem;
						}

						.icon {
							border-radius: 8rpx;
							background-color: #32cbfe;
							padding: 0 10rpx;
						}

						.status {
							width: 1.4rem;
							margin-left: .1rem;
						}
					}
				}

				// 生活方式指导
				.shfs-content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					margin-bottom: .1rem;

					.title {
						display: block;
						width: 100%;
					}

					.main {
						width: 50%;
						margin-bottom: .1rem;
						position: relative;

						.main-input {
							display: flex;
							align-items: center;

							.name {
								width: .9rem;
								text-align: right;
							}

							.txt {
								margin-left: .1rem;
							}

							&>input {
								border: 1rpx solid #e3e3e3;
								border-radius: 8rpx;
								font-size: .12rem;
								padding: 10rpx 0 10rpx 20rpx;
								width: .57rem;
								margin-left: .1rem;
							}

							.oneunit {
								margin-left: .1rem;
							}

							.twounit {
								margin-left: .1rem;
							}

							.required {
								color: #f00;
							}

							.select {
								color: #ccc;
								position: absolute;
								right: 1.25rem;
							}
						}

						.shfs-checkbox-wrap {
							display: flex;
							.name {
								width: 1.2rem;
								text-align: right;
								font-size: .12rem;
								margin-top: 8rpx;
							}

							.u-checkbox-group {
								margin-left: .1rem;

								.u-checkbox-name {
									font-size: .14rem;
								}
							}
						}
					}
				}

				// 用药情况
				.yyqk-content {
					width: 96%;
					padding: .15rem 0rem;
					background-color: #fff;
					border-radius: 18rpx;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					padding: .15rem;
					margin-bottom: .1rem;

					.title-box {
						display: flex;
						width: 100%;

						.title {
							margin-left: .1rem;
						}

						.icon {
							background-color: #33ccff;
							padding: 0 5rpx;
							border-radius: 8rpx;
							margin-left: 10rpx;
						}
					}

					.item-box {
						display: flex;
						margin-top: .1rem;

						.item1 {
							width: 1rem;
							text-align: right;
						}

						.yw-item {
							width: 2rem;
							margin-left: .2rem;
						}

						.item {
							width: 1.2rem;
							margin-left: .2rem;
						}

						.add {
							width: .3rem;
							background-color: #58bdf8;
							margin-left: .1rem;
							display: flex;
							align-items: center;
							justify-content: center;
							border-radius: 8rpx;
							margin-left: .18rem;
						}
					}

					.bottom {
						display: flex;
						margin: .1rem 0 0 1rem;

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 1.2rem;
							margin-left: .1rem;
						}

						.del {
							width: .3rem;
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-left: .1rem;
						}
					}

					.select-input {
						width: 100%;
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						margin-top: .1rem;

						.main {
							display: flex;
							width: 50%;
							align-items: center;
							flex-shrink: 0;
							margin-bottom: .1rem;
							position: relative;

							.name {
								width: 1rem;
								text-align: right;
							}

							&>input {
								border: 1rpx solid #e3e3e3;
								border-radius: 8rpx;
								font-size: .12rem;
								padding: 10rpx 0 10rpx 20rpx;
								width: 1.2rem;
								margin-left: .1rem;
							}

							.select {
								color: #ccc;
								position: absolute;
								right: 1.85rem;
							}
						}
					}
				}

				// 转诊
				.zz-content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					margin-bottom: .1rem;

					.title {
						width: 100%;
						display: block;
					}

					.main {
						display: flex;
						align-items: center;
						width: 50%;
						margin-bottom: .1rem;
						position: relative;

						.name {
							width: .9rem;
							text-align: right;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 1.6rem;
							margin-left: .1rem;
						}

						.select {
							color: #ccc;
							position: absolute;
							right: 1.55rem;
						}

						.required {
							color: #f00;
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
