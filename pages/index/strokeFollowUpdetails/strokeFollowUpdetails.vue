<template>
	<view class="wrap">
		<scroll-view scroll-y class="scroll">
			<free-title title="脑卒中随访详细信息" isRight :camera="camera"></free-title>
			<view class="container">
				<view class="content">
					<view class="main" v-for="(item,index) in strokeFollowUpdetails" :key="index"
						:style="item.checkbox  || item.name == '其他新发卒中症状' ? 'width:100%;' : ''">
						<view class="input-box" v-if="!item.checkbox">
							<text class="name">{{item.name}}</text>
							<input :style="item.name == '其他新发卒中症状' ? 'width:86%;' : ''" :placeholder="item.placeholder"
								:disabled="item.disabled" :adjust-position="false" v-model="item.model"
								@click="item.select ? handleTapInput(item.name) : ''" />
							<text class="iconfont required">{{item.required}}</text>
							<text class="iconfont select">{{item.select}}</text>
						</view>
						<view v-if="item.checkbox" class="check">
							<text class="name">{{item.name}}</text>
							<u-checkbox-group class="u-checkbox-group">
								<u-checkbox v-model="ctem.checked" :name="ctem.name"
									@change="checkboxChange($event,item,index)" v-for="(ctem,cndex) in item.checkbox"
									:key="cndex">
									<view style="display: flex;align-items: center;">
										<text class="u-checkbox-name">{{ctem.name}}</text>
										<input v-if="(ctem.name == '其他症状' || ctem.name == '其他') && ctem.checked"
											v-model="ctem.model" @click.stop=""
											style="border: 1rpx solid #e3e3e3;border-radius: 8rpx;font-size: .12rem;padding: 10rpx 0 10rpx 20rpx;width: 1.4rem;margin-left: .1rem;" />
									</view>
								</u-checkbox>
							</u-checkbox-group>
						</view>
					</view>
				</view>
				<!-- 生活行为 -->
				<view class="shxw-content">
					<text class="title">生活行为</text>
					<view class="main" v-for="(item,index) in lifeBehavior" :key="index">
						<text class="name">{{item.name}}</text>
						<input v-model="item.one" :adjust-position="false" />
						<!-- <text class="txt"> / </text>
						<input v-model="item.two" :adjust-position="false" /> -->
						<text class="company">{{item.company}}</text>
					</view>
				</view>
				<!-- 体检结果 -->
				<view class="tj-content">
					<text class="title">体检结果</text>
					<view class="main" v-for="(item,index) in experienceResults" :key="index"
						:style="item.name == '其他' ? 'width:100%;' : ''">
						<text class="name">{{item.name}}</text>
						<input v-model="item.one" :adjust-position="false" :style="handleTjInput(item)"
							@input="item.name == '身高' || item.name == '体重' ? handleTzzs() : ''" />
						<text class="txt" v-if="item.state == 1">/</text>
						<input v-model="item.two" :adjust-position="false" v-if="item.state == 1" />
						<text class="company" v-if="item.company">{{item.company}}</text>
						<view class="icon" v-if="item.icon" @click="handleViewDetails(item.name)">{{item.icon}}</view>
						<text class="status" v-if="item.status">{{item.status}}</text>
					</view>
				</view>
				<!-- 服用何种药物防治 -->
				<view class="ywzl-content">
					<text class="title">服用何种药物防治</text>
					<view class="main">
						<text class="name">{{ywfz.name}}</text>
						<input v-model="ywfz.model" :adjust-position="false" />
					</view>
				</view>
				<!-- 生活方式指导 -->
				<view class="shfs-content">
					<text class="title">生活方式指导</text>
					<view class="main" v-for="(item,index) in lifestyleGuidance" :key="index"
						:style="item.name == '心理调整' || item.name == '遵医行为' ? 'width:50%;' : ''">
						<text class="name">{{item.name}}</text>
						<input v-model="item.model" :adjust-position="false" :placeholder="item.placeholder"
							:disabled="item.disabled" @click="item.select ? handleTapInput(item.name) : ''"
							:style="item.name == '心理调整' || item.name == '遵医行为' ? 'width:1.6rem;' : ''" />
						<text class="iconfont select">{{item.select}}</text>
					</view>
				</view>
				<!-- 辅助检查 -->
				<view class="ywzl-content">
					<text class="title">辅助检查</text>
					<view class="main">
						<text class="name">{{fzjc.name}}</text>
						<input v-model="fzjc.model" :adjust-position="false" />
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
						<input :adjust-position="false" v-model="item.drug_name"
							style="width: 2rem;margin-left: 0rem;" />
						<input :adjust-position="false" v-model="item.day_count" />
						<input :adjust-position="false" v-model="item.every_time_dosage" />
						<input :adjust-position="false" v-model="item.unit" />
						<view class="iconfont del" @click="handleTapDelDrugUsage(index,item)">&#xe718;</view>
					</view>
					<view class="select-input">
						<view v-for="(item,index) in medication[1].list" :key="index" class="main"
							:style="item.name == '此次随访建议' ? 'width:100%;' : ''">
							<text class="name">{{item.name}}</text>
							<input :placeholder="item.placeholder" :disabled="item.disabled" v-model="item.model"
								:adjust-position="false" :style="item.name == '此次随访建议' ? 'width: 86%;' : ''"
								@click="item.select ? handleTapInput(item.name) : ''" />
							<text class="iconfont select" v-if="item.select">{{item.select}}</text>
						</view>
					</view>
				</view>
				<!-- 转诊 -->
				<view class="zz-content">
					<text class="title">转诊</text>
					<view class="main" v-for="(item,index) in zz" :key="index">
						<text class="name">{{item.name}}</text>
						<input :placeholder="item.placeholder" :disabled="item.disabled" v-model="item.model"
							:adjust-position="false" @click="item.select ? handleTapInput(item.name) : ''" />
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
	import data from '../../../js/strokeFollowUpdetails.js'
	import canva from "@/components/free-ui/free-canvas/canvas.vue";
	import utils from '@/common/utils.js';
	import freeTablePopup from '@/components/free-ui/free-table-popup/free-table-popup.vue';
	import freeAddDrugs from '@/components/free-ui/free-add-drugs/free-add-drugs.vue';
	import util from '@/utils/util.js';
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
				pageModel: '',
				xydata: {},
				// 设备信息
				equipment: {
					e_name: "BP06D21801040414",
					notice_id: "0000FFF1-0000-1000-8000-00805F9B34FB",
					write_in_id: "0000FFF2-0000-1000-8000-00805F9B34FB",
					service_id: "0000FFF0-0000-1000-8000-00805F9B34FB",
					e_id: "f5aa736f-da98-4f3b-a1da-017336a2b5d2"
				},
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
				searchBar: false,
				isDrugUsage: false,
				isFreeAddDrug: false,
				strokeFollowUpdetails: JSON.parse(JSON.stringify(data.strokeFollowUpdetails)),
				lifeBehavior: JSON.parse(JSON.stringify(data.lifeBehavior)),
				experienceResults: JSON.parse(JSON.stringify(data.experienceResults)),
				ywfz: JSON.parse(JSON.stringify(data.ywfz)),
				lifestyleGuidance: JSON.parse(JSON.stringify(data.lifestyleGuidance)),
				fzjc: JSON.parse(JSON.stringify(data.fzjc)),
				medication: JSON.parse(JSON.stringify(data.medication)),
				zz: JSON.parse(JSON.stringify(data.zz)),
				isCanvas: false,
				canvasItem: '',
				follow_doctor: '',
				item: '',
				isTime: false,
				selectorIsShow: false,
				selectList: [],
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
				person_id: '',
				id: '',
				pagination: {
					rows: 10,
					page: 1,
					sidx: '',
					sord: '',
					records: 0,
					total: 0
				},
				drugName: '',
				medicId: '',
				F_UserId: '',
				// 收缩压
				systolicPressure: 0,
				// 舒张压
				diastolicPressure: 0
			}
		},
		mounted() {
			bldprs = new bldPressDevice.BldPressBTDevice();
			bldprs.close();
			bldprs.init();
			// 赋值
			uni.$on('switchUser', () => {
				this.strokeFollowUpdetails = JSON.parse(JSON.stringify(data.strokeFollowUpdetails));
				this.lifeBehavior = JSON.parse(JSON.stringify(data.lifeBehavior));
				this.experienceResults = JSON.parse(JSON.stringify(data.experienceResults));
				this.ywfz = JSON.parse(JSON.stringify(data.ywfz));
				this.lifestyleGuidance = JSON.parse(JSON.stringify(data.lifestyleGuidance));
				this.fzjc = JSON.parse(JSON.stringify(data.fzjc));
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
			// console.log(res);
			console.log(edit);
			if (edit) {
				this.person_id = edit.person_id;
				this.id = edit.follow_id;

			} else {
				if (res !== '') {
					this.person_id = res[0].id;
				}
			}
			this.handleInit();
			this.handleSearchCerebralFollow();
			this.camera = utils.camera(this.basicSettingsList, this.camera);
			this.start();
			this.handleGetDoctorName();
		},
		destroyed() {
			uni.$off('switchUser');
			bldprs.close();
		},
		computed: {
			// 设置体检结果输入框样式
			handleTjInput() {
				return function(item) {
					if (item.name == '其他') {
						return 'width: 86%;'
					}
					if (item.state !== 1) {
						return 'width:1rem;'
					}
				}
			},
			...mapState(['basicSettingsList', 'tjsfList']),
			sfInit() {
				return JSON.parse(JSON.stringify(this.strokeFollowUpdetails));
			}
		},
		watch: {
			sfInit: {
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
				console.log(res);
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
				let data = this.experienceResults;
				for (let item of this.experienceResults) {
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
				for (let item of this.strokeFollowUpdetails) {
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
								for (let item of that.experienceResults) {
									if (item.name == '血压') {
										console.log(item);
										item.one = that.systolicPressure;
										item.two = that.diastolicPressure;
										item.status = d.msg;
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
			checkbox(arr, e) {
				let data = ['无', '无症状']
				for (let item of arr) {
					if (data.indexOf(e.name) !== -1 && e.value && (data.indexOf(item.name) == -1)) {
						item.checked = false;
					}
					if (data.indexOf(e.name) == -1 && (data.indexOf(item.name) !== -1)) {
						item.checked = false;
					}
				}
			},
			checkboxChange(e, ctem, cndex) {
				let arr = ['症状', '个人病史', '脑卒中并发症情况', '新发卒中症状']
				if (arr.indexOf(ctem.name) !== -1) {
					this.checkbox(this.strokeFollowUpdetails[cndex].checkbox, e);
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
			// 添加用药情况
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
			// 删除用药情况
			handleTapDelDrugUsage(index, item) {
				console.log(item);
				if (item.status == 0) {
					this.medication[0].items.splice(index, 1);
				} else {
					this.$lz.showCancel('', '是否要删除?').then(res => {
						this.$u.post('DelDrug', {
							id: item.medicId,
							follow_id: this.id,
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
				}
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
			// 判断当前显示的弹出层
			handleViewDetails(item) {
				console.log(item);
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
			// 点击关闭用药情况弹出层
			handleCloseDrugPopup() {
				this.searchBar = false;
				this.isDrugUsage = false;
			},
			// 点击关闭添加用药情况
			handleTapCloseAddDrugs() {
				this.isDrugUsage = true;
				this.searchBar = true;
				this.isFreeAddDrug = false;
				this.handleSearchDrugUsageList();
			},
			// 输入框点击事件 赋值
			handleTapInput(item) {
				console.log(item);
				this.item = item;
				this.selectorIsShow = true;
				switch (item) {
					case '随访日期':
					case '下次随访日期':
						this.isTime = true;
						this.selectorIsShow = false;
						break;
					case '随访方式':
						this.selectList = utils.followUpMode;
						break;
					case '脑卒中类型':
						this.selectList = data.typeOfStroke;
						break;
					case '脑卒中部位':
						this.selectList = data.locationOfStroke;
						break;
					case '心理调整':
					case '遵医行为':
					case '肢体恢复情况':
						this.selectList = utils.behavior;
						break;
					case '服药依从性':
						this.selectList = data.medicationCompliance;
						break;
					case '药物不良反应':
						this.selectList = utils.separateRoom;
						break;
					case '生活能力是否自理':
						this.selectList = data.shnlzl;
						break;
					case '康复治疗方式':
						this.selectList = data.rehabilitationTreatmentMode;
						break;
					case '此次随访分类':
						this.selectList = utils.classificationThisFollowUp;
						break;
				}
			},
			// 时间选择器赋值
			handlePicker(e) {
				for (let item of this.strokeFollowUpdetails) {
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
			// select选择器赋值
			handleSelect(e) {
				let _item = this.item;
				for (let item of this.strokeFollowUpdetails) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
				for (let item of this.lifestyleGuidance) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
				for (let item of this.medication[1].list) {
					if (_item == item.name) {
						item.model = e[0].label;
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
			// Canvas 画板显示
			handleisCanvas(item) {
				this.canvasItem = item.name;
				this.isCanvas = true;
			},
			// 发起网络请求 上传图片信息
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
									if (this.canvasItem == '随访医生') {
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
			// 发起网络请求 保存脑卒中随访详细信息
			handleSubmitBtn() {
				for (let item of this.strokeFollowUpdetails) {
					for (let jtem of this.zz) {
						if (item.isRequired && item.model == '' || jtem.isRequired && jtem.model == '') {
							return this.$lz.toast('必填项不能为空');
						}
					}
				}
				// 发起网络请求
				let param = {
					data: {}
				}
				let info = {
					id: this.id,
					person_id: this.person_id,
					symptom: '',
					personal_history: '',
					nczbfz: '',
					xfczzz: ''
				}
				let symptom = [],
					personal_history = [],
					nczbfz = [],
					xfczzz = [];
				for (let item of this.strokeFollowUpdetails) {
					info[item.key] = item.model;
					if (item.name == '症状') {
						for (let jtem of item.checkbox) {
							if (jtem.checked) {
								symptom.push(jtem.name);
							}
						}
					}
					if (item.name == '个人病史') {
						for (let jtem of item.checkbox) {
							if (jtem.checked) {
								personal_history.push(jtem.name);
							}
						}
					}
					if (item.name == '脑卒中并发症情况') {
						for (let jtem of item.checkbox) {
							if (jtem.checked) {
								nczbfz.push(jtem.name);
							}
						}
					}
					if (item.name == '新发卒中症状') {
						for (let jtem of item.checkbox) {
							if (jtem.checked) {
								xfczzz.push(jtem.name);
							}
						}
					}
				}
				param.data.info = info;
				param.data.info.symptom = symptom.join(',');
				param.data.info.personal_history = personal_history.join(',');
				param.data.info.nczbfz = nczbfz.join(',');
				param.data.info.xfczzz = xfczzz.join(',');

				let shxw = {};
				for (let item of this.lifeBehavior) {
					shxw[item.onekey] = item.one;
					if (item.twokey) {
						shxw[item.twokey] = item.two;
					}
				}
				param.data.shxw = shxw;

				let tyjg = {};
				for (let item of this.experienceResults) {
					tyjg[item.onekey] = item.one;
					if (item.twokey) {
						tyjg[item.twokey] = item.two;
					}
				}
				param.data.tyjg = tyjg;

				param.data.drug = this.ywfz.model;

				let shfszd = {};
				for (let item of this.lifestyleGuidance) {
					shfszd[item.key] = item.model;
				}
				param.data.shfszd = shfszd;
				param.data.fuzhujiancha = this.fzjc.model;

				let yyqk = {
					druginfos: []
				};
				for (let item of this.medication[0].items) {
					yyqk.druginfos.push({
						drug_id: '',
						follow_id: '',
						follow_type: 'nczsf',
						drug_name: item.drug_name,
						day_count: item.day_count,
						every_time_dosage: item.every_time_dosage,
						unit: item.unit,
						medicId: '',
						create_time: util.getFtSystemTime()
					})
				}
				for (let item of this.medication[1].list) {
					yyqk[item.key] = item.model;
				}
				param.data.yyqk = yyqk;

				let zz = {
					follow_doctor_sign: this.follow_doctor,
					upload_status: 0
				};
				for (let item of this.zz) {
					zz[item.key] = item.model;
				}
				param.data.zz = zz;
				console.log(param);
				this.$u.post('SaveCerebralFollow', param).then(res => {
					console.log(res);
					if (res.code == 200 && res.info == '响应成功') {
						this.$lz.toast(res.info);
						this.id = res.data.id;
						this.medication[0].items = res.data.data[0].druginfos;
						console.log(this.medication[0].items);
					} else {
						this.$lz.toast(res.info);
					}
				}).catch(err => {
					console.log(err);
				})
			},
			// 发起网络请求 查询脑卒中随访详细信息
			handleSearchCerebralFollow() {
				console.log(this.id);
				this.$u.post('SearchCerebralFollow', {
					follow_id: this.id
				}).then(res => {
					this.$lz.toast(res.info);
					console.log(res);
					if (res.code == 200 && res.info == '响应成功' && JSON.stringify(res.data) !== '[]') {
						let data = res.data[0];
						for (let item of this.strokeFollowUpdetails) {
							item.model = data[item.key];
							if (item.name == '症状') {
								for (let ctem of item.checkbox) {
									for (let jtem of data.symptom.split(',')) {
										if (ctem.name == jtem) {
											ctem.checked = true;
										}
									}
								}
							}
							if (item.name == '个人病史') {
								for (let ctem of item.checkbox) {
									for (let jtem of data.personal_history.split(',')) {
										if (ctem.name == jtem) {
											ctem.checked = true;
										}
									}
								}
							}
							if (item.name == '脑卒中并发症情况') {
								for (let ctem of item.checkbox) {
									for (let jtem of data.nczbfz.split(',')) {
										if (ctem.name == jtem) {
											ctem.checked = true;
										}
									}
								}
							}
							if (item.name == '新发卒中症状') {
								for (let ctem of item.checkbox) {
									for (let jtem of data.xfczzz.split(',')) {
										if (ctem.name == jtem) {
											ctem.checked = true;
										}
									}
								}
							}
							for (let item of this.lifeBehavior) {
								item.one = data[item.onekey];
								if (item.twokey) {
									item.two = data[item.twokey];
								}
							}
							for (let item of this.experienceResults) {
								item.one = data[item.onekey];
								if (item.twokey) {
									item.two = data[item.twokey];
								}
							}
							this.ywfz.model = data.drug;
							for (let item of this.lifestyleGuidance) {
								item.model = data[item.key];
							}
							this.fzjc.model = data.fuzhujiancha;

							let medication = [];
							for (let item of data.druginfos) {
								medication.push({
									drug_name: item.drug_name,
									day_count: item.day_count,
									every_time_dosage: item.every_time_dosage,
									unit: item.unit,
									id: item.id
								})
								this.medication[0].items = medication;
							}

							for (let item of this.medication[1].list) {
								item.model = data[item.key];
							}

							this.follow_doctor = data.follow_doctor_sign;
							for (let item of this.zz) {
								item.model = data[item.key];
							}
						}
					}
				}).catch(err => {
					console.log(err);
					this.$lz.toast(err.errMsg);
				})
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
			// 查询用药列表
			handleTapSearchBtn(item) {
				this.drugName = item;
				this.table[1] = [];
				this.pagination.page = 1;
				this.handleSearchDrugUsageList();
			},
			// 查询用药列表
			handleSearchDrugUsageList() {
				let obj = {
					F_UserId: this.F_UserId,
					drug_name: this.drugName,
					pagination: JSON.stringify(this.pagination)
				}
				console.log(obj);
				this.table[1] = [];

				this.$refs.table.drugNames = '';
				this.$refs.table.pageModels = '';
				this.$u.post('SearchDrugUsageList', obj).then(res => {
					console.log(res);
					if (res.code == 200 && res.info == '响应成功' && res.data.pagedatas.length) {
						this.pagination.total = res.data.pagenumber;
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
						margin: .1rem 0;
						width: 50%;
						position: relative;

						.input-box {
							display: flex;
							align-items: center;

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

							.required {
								color: #f00;
							}

							.select {
								color: #ccc;
								position: absolute;
								right: 1.55rem;
							}
						}

						.check {
							display: flex;

							.name {
								width: .9rem;
								text-align: right;
								flex-shrink: 0;
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

				// 生活方式
				.shxw-content {
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
						font-size: .15rem;
					}

					.main {
						width: 50%;
						display: flex;
						align-items: center;
						margin: .1rem 0;

						.name {
							width: .9rem;
							text-align: right;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: .8rem;
							margin-left: .1rem;
						}

						.txt,
						.company {
							margin-left: .1rem;
						}

					}
				}

				// 体检结果
				.tj-content {
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
						font-size: .15rem;
					}

					.main {
						width: 50%;
						display: flex;
						margin: .1rem 0;
						align-items: center;

						.name {
							width: .9rem;
							text-align: right;
							flex-shrink: 0;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: .32rem;
							margin-left: .1rem;
							flex-shrink: 0;
						}

						.icon {
							padding: 0 10rpx;
							background-color: #32cbfe;
							border-radius: 8rpx;
						}

						.status {
							flex-shrink: 0;
							font-size: .1rem;
						}

						.txt,
						.company,
						.status,
						.icon {
							margin-left: .1rem;
						}
					}
				}

				// 服用何种药物防治
				.ywzl-content {
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
						font-size: .15rem;
					}

					.main {
						width: 100%;
						display: flex;
						align-items: center;
						margin: .1rem 0;

						.name {
							width: .9rem;
							text-align: right;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 86%;
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
						width: 100%;
						display: block;
						font-size: .15rem;
					}

					.main {
						width: 100%;
						display: flex;
						align-items: center;
						margin: .1rem 0;
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
							width: 86%;
							margin-left: .1rem;
						}

						.select {
							position: absolute;
							color: #ccc;
							right: 1.55rem;
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
							font-size: .15rem;
						}

						.icon {
							padding: 0 10rpx;
							background-color: #32cbfe;
							border-radius: 8rpx;
							margin-left: .1rem;
						}
					}

					.item-box {
						display: flex;
						margin-top: .1rem;

						.item1 {
							width: .9rem;
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
							// margin-left: .1rem;
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
							margin: .1rem 0;
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
						}
					}
				}

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
						display: block;
						width: 100%;
						font-size: .15rem;
					}

					.main {
						width: 50%;
						display: flex;
						align-items: center;
						margin: .1rem 0;

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

						.required {
							color: #f00;
						}

						.icon {}
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
