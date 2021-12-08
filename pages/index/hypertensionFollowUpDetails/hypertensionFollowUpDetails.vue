<template>
	<view class="wrap">
		<scroll-view scroll-y class="scroll">
			<free-title title="高血压随访详细信息" isRight :camera="camera"></free-title>
			<!-- 随访日期 & 症状 -->
			<view class="container">
				<view class="content">
					<view class="main" v-for="(item,index) in hypertensionFollowUpDetails" :key="index"
						v-if="!item.title">
						<text class="name">{{item.name}}</text>
						<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
							v-model="item.model" :adjust-position="false"
							@click="item.type == 'select' ? handleTapInput(item.name) : ''">
						<text class="iconfont icon-select">&#xe65a;</text>
						<text class="iconfont required">&#xe635;</text>
					</view>
					<view class="checkbox">
						<view class="checkbox-content" v-for="(item,index) in hypertensionFollowUpDetails" :key="index">
							<text class="title">{{item.title}}</text>
							<u-checkbox-group @change="checkboxGroupChange" class="u-checkbox-group">
								<u-checkbox v-model="jtem.checked" v-for="(jtem, jndex) in item.checkbox" :key="jndex"
									:name="jtem.name" @change="checkboxChange($event,index,item.title)">
									<view style="display: flex;align-items: center;">
										<text class="name">{{jtem.name}}</text>
										<input v-if="jtem.name == '其他' && jtem.checked" :type="jtem.type"
											:placeholder="jtem.placeholder" :disabled="jtem.disabled"
											v-model="jtem.model" :adjust-position="false" @click.stop=""
											style="border: 1rpx solid #e3e3e3;border-radius: 8rpx;font-size: .12rem;padding: 10rpx 0 10rpx 20rpx;width: 1.4rem;margin-left: .1rem;">
									</view>
								</u-checkbox>
							</u-checkbox-group>
						</view>
					</view>
				</view>
			</view>
			<!-- 体征 -->
			<view class="tz-container">
				<view class="tz-content">
					<text class="title">体征</text>
					<view v-for="(item,index) in sign" :key="index" class="main"
						:style="item.name == '其他' ? 'width:100%;' : ''">
						<text class="name">{{item.name}}</text>
						<input :style="item.name == '腰围' ? 'width:1.16rem;' : '' || 
							item.name == '其他' ? 'flex:1;' : ''" :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
							v-model="item.model" :adjust-position="false"
							@input="item.name == '身高' || item.name == '体重' ? handleTzzs() : ''">
						<view class="right" v-if="item.state == 0">
							<text class="txt">/</text>
							<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
								v-model="item.mode1" :adjust-position="false">
						</view>
						<text class="company">{{item.company}}</text>
						<view class="icon" @click="handleViewDetails(item.name)">{{item.icon}}</view>
						<text class="connectionStatus">{{item.connectionStatus}}</text>
					</view>
				</view>
			</view>
			<!-- 生活方式指导 -->
			<view class="shfs-container">
				<view class="shfs-content">
					<text class="title">生活方式指导</text>
					<view class="main" :style="item.name == '开始吸烟年龄' || item.name == '摄盐情况(咸淡)' ? 'width:100%;' : ''"
						v-for="(item,index) in lifestyleGuidance" :key="index">
						<text class="name">{{item.name}}</text>
						<input :style="item.style == 0 ? 'width:.62rem;' : ''" :type="item.type"
							:placeholder="item.placeholder" :disabled="item.disabled" v-model="item.model"
							:adjust-position="false" @click="item.type == 'select' ? handleTapInput(item.name) : ''">
						<text class="iconfont icon-select" v-if="item.type == 'select'">&#xe65a;</text>
						<view class="right" v-if="item.style == 0">
							<text class="txt">/</text>
							<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
								v-model="item.mode1" :adjust-position="false"
								@click="item.type == 'select' ? handleTapInput('mode1') : ''">
							<text class="iconfont icon-select" v-if="item.name == '摄盐情况(咸淡)'">&#xe65a;</text>
						</view>
						<text class="company" v-if="item.company">{{item.company}}</text>
					</view>
				</view>
			</view>
			<!-- 辅助检查 -->
			<view class="fzjc-container">
				<view class="fzjc-content">
					<text class="title">辅助检查</text>
					<view class="main">
						<view class="top-checkbox">
							<u-checkbox-group @change="checkboxGroupChange">
								<u-checkbox v-if="item.name !== '辅助检查'" v-model="item.checked"
									v-for="(item, index) in supplementaryExamination" :key="index" :name="item.name"
									@change="checkboxChange($event,index,'fzjc')">
									<text class="name">{{item.name}}</text>
								</u-checkbox>
							</u-checkbox-group>
						</view>
						<view v-for="(item, index) in supplementaryExamination" :key="index" v-if="item.name == '辅助检查'"
							class="bottom-input">
							<text class="name">{{item.name}}</text>
							<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
								v-model="item.model" :adjust-position="false">
						</view>
					</view>
				</view>
			</view>
			<!-- 目前用药情况 -->
			<view class="mqyy-container">
				<view class="mqyy-content">
					<view class="head">
						<text class="title">目前用药情况</text>
						<view class="icon" @click="handleViewDetails('目前用药情况')">...</view>
					</view>
					<view class="top">
						<view class="txt">目前用药情况</view>
						<view class="item">药物名称</view>
						<view class="item">每日次数</view>
						<view class="item">每次用量</view>
						<view class="item">单位</view>
						<view class="add" @click="handleMqyyAddItem">+</view>
					</view>
					<view v-for="(item,index) in mqyy[0].items" :key="index" class="bottom"
						style="margin-left: .9rem;width:100%;">
						<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
							v-model="item.drug_name" :adjust-position="false">
						<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
							v-model="item.day_count" :adjust-position="false">
						<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
							v-model="item.every_time_dosage" :adjust-position="false">
						<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
							v-model="item.unit" :adjust-position="false">
						<view class="icon iconfont" @click="handleMqyyDelItem(index,item)">&#xe718;</view>

					</view>
					<block v-for="(ctem,cndex) in mqyy" :key="cndex" v-if="ctem.status == 1">
						<view class="select">
							<text class="name">{{ctem.name}}</text>
							<input :type="ctem.type" :placeholder="ctem.placeholder" :disabled="ctem.disabled"
								v-model="ctem.model" :adjust-position="false"
								@click="ctem.type == 'select' ? handleTapInput(ctem.name) : ''">
							<text class="iconfont icon-select" v-if="ctem.type == 'select'">&#xe65a;</text>
						</view>
					</block>
				</view>
			</view>
			<!-- 用药调整意见 -->
			<view class="yytz-container">
				<view class="yytz-content">
					<view class="head">
						<text class="title">用药调整意见</text>
						<view class="icon" @click="handleViewDetails('调整用药情况')">...</view>
					</view>
					<view class="top">
						<view class="txt">用药调整意见</view>
						<view class="item">药物名称</view>
						<view class="item">每日次数</view>
						<view class="item">每次用量</view>
						<view class="item">单位</view>
						<view class="add" @click="handleAddItem">+</view>
					</view>
					<view v-for="(item,index) in yytz" :key="index" class="bottom">
						<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
							v-model="item.drug_name" :adjust-position="false">
						<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
							v-model="item.day_count" :adjust-position="false">
						<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
							v-model="item.every_time_dosage" :adjust-position="false">
						<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
							v-model="item.unit" :adjust-position="false">
						<view class="icon iconfont" @click="handleDelItem(index,item)">&#xe718;</view>
					</view>
				</view>
			</view>
			<!-- 转诊 -->
			<view class="zz-container">
				<view class="zz-content">
					<text class="title">转诊</text>
					<view class="main"
						:style="item.name == '下次随访日期' || item.name == '随访医生签名' ? 'width:50%;' : 'width:100%;'"
						v-for="(item,index) in referral" :key="index">
						<text class="name">{{item.name}}</text>
						<input :style="item.name !== '备注' ? 'width:1.6rem;' : 'flex:1;'" :type="item.type"
							:placeholder="item.placeholder" :disabled="item.disabled" v-model="item.model"
							:adjust-position="false" @click="item.type == 'select' ? handleTapInput(item.name) : ''">
						<text class="iconfont icon-select" v-if="item.type == 'select'">&#xe65a;</text>
						<view v-if="item.required" class="required">*</view>
						<view class="iconfont" style="margin-left: .1rem;" v-if="item.icon"
							@click="handleTapCanvasIcon(item.name)">{{item.icon}}</view>
						<image v-if="item.name == '随访医生签名' && followDoctorSign!==''" :src="followDoctorSign"
							style="width: 1rem;height: .3rem;">
						</image>
						<image v-if="item.name == '居民签名' && personSign!==''" :src="personSign"
							style="width: 1rem;height: .3rem;">
						</image>
					</view>
				</view>
			</view>
			<canva v-if="isCanvas" @close="isCanvas = false" @finish="finish"></canva>
			<view class="btn-container">
				<u-button class="btn" @click="handleSubmitBtn" type="primary">保存</u-button>
			</view>
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
			<free-table-popup ref="tables" title="用药列表" :isPopup="isListDiabetesMedications"
				:searchBar="diabetesSearchBar" :tableHead="listDiabetesMedications[0]"
				:tableContent="listDiabetesMedications[1]" :pagination="pagination" @click="handleTapAddDrugs('目前用药情况')"
				@close="handleCloseDrugPopup('目前用药情况')" @search="handleTapSearchBtnYy"
				@delItem="handleDelDurgUsageListYy" @editItem="handleTabEditItemYy" @pageJump="handleTapPageJumpBtnYy"
				@previousPage="handlePreviousPageYy" @nextPage="handleNextPageYy" @selectItem="handleTapSelectItemYy">
			</free-table-popup>
			<free-add-drugs :isFreeAddDrug="isAddListDiabetesMedications" :drugForm="diabetesMedicationsList"
				@close="handleTapCloseAddDrugs('目前用药情况')" @click="handleSubmitAddDrugYy" @slectClick="handleSlectClick">
			</free-add-drugs>
			<free-table-popup ref="lz" title="用药列表" :isPopup="isAdjustMedicationAdvice" :searchBar="tzyySearchBar"
				:tableHead="adjustMedicationAdviceList[0]" :tableContent="adjustMedicationAdviceList[1]"
				:pagination="paginationtzyy" @click="handleTapAddDrugs('调整用药情况')"
				@close="handleCloseDrugPopup('调整用药情况')" @search="handleTapSearchBtnTzyy"
				@delItem="handleDelDurgUsageListTzyy" @editItem="handleTabEditItemTzyy"
				@selectItem="handleTapSelectItemTzyy" @pageJump="handleTapPageJumpBtnTzyy"
				@previousPage="handlePreviousPageTzyy" @nextPage="handleNextPageTzyy">
			</free-table-popup>
			<free-add-drugs :isFreeAddDrug="isAddAdjustMedicationAdvice" :drugForm="adjustMedicationAdviceForm"
				@close="handleTapCloseAddDrugs('调整用药情况')" @click="handleSaveDrugAbjust" @slectClick="handleSlectClick">
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
	import canva from "@/components/free-ui/free-canvas/canvas.vue";
	import data from '@/js/hypertensionFollowUpDetails.js'
	import util from '@/common/utils.js';
	import utils from "@/utils/util.js"
	import freeTablePopup from '@/components/free-ui/free-table-popup/free-table-popup.vue';
	import freeAddDrugs from '@/components/free-ui/free-add-drugs/free-add-drugs.vue';
	let bldprs = null;
	let bldPressDevice = require('@/utils/BTDevice/BldPressBTDevice.js');
	export default {
		components: {
			freeTablePopup,
			freeTitle,
			canva,
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
				item: '',
				isTime: false,
				selectorIsShow: false,
				isCanvas: false,
				selectList: [],
				followDoctorSign: '',
				personSign: '',
				hypertensionFollowUpDetails: JSON.parse(JSON.stringify(data.hypertensionFollowUpDetails)),
				sign: JSON.parse(JSON.stringify(data.sign)),
				lifestyleGuidance: JSON.parse(JSON.stringify(data.lifestyleGuidance)),
				supplementaryExamination: JSON.parse(JSON.stringify(data.supplementaryExamination)),
				mqyy: JSON.parse(JSON.stringify(data.mqyy)),
				yytz: JSON.parse(JSON.stringify(data.yytz)),
				referral: JSON.parse(JSON.stringify(data.referral)),
				canvasItem: '',
				person_id: '',
				id: '',
				follow_id: '',
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
				isBloodPressureCheckList: false,
				isStatureCheckingList: false,
				isWeightCheckingList: false,
				// 收缩压
				systolicPressure: 0,
				// 舒张压
				diastolicPressure: 0,
				// 心率
				pulse: 0,
				isListDiabetesMedications: false,
				diabetesSearchBar: false,
				isAddListDiabetesMedications: false,
				isAdjustMedicationAdvice: false,
				tzyySearchBar: false,
				isAddAdjustMedicationAdvice: false,
				listDiabetesMedications: [
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
				diabetesMedicationsList: [{
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
						select: '\ue65a',
						key: 'every_time_dosage',
					},
					{
						name: '单位：',
						value: '',
						select: '\ue65a',
						key: 'unit'
					}
				],
				adjustMedicationAdviceList: [
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
				adjustMedicationAdviceForm: [{
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
						select: '\ue65a',
						key: 'every_time_dosage',
					},
					{
						name: '单位：',
						value: '',
						select: '\ue65a',
						key: 'unit'
					}
				],
				pagination: {
					rows: 10,
					page: 1,
					sidx: '',
					sord: '',
					records: 0,
					total: 0
				},
				paginationtzyy: {
					rows: 10,
					page: 1,
					sidx: '',
					sord: '',
					records: 0,
					total: 0
				},
				medicId: '',
				F_UserId: '',
				edit: ''
			}
		},
		mounted() {
			bldprs = new bldPressDevice.BldPressBTDevice();
			bldprs.close();
			bldprs.init();
			uni.$on('switchUser', () => {
				console.info(data)
				this.hypertensionFollowUpDetails = JSON.parse(JSON.stringify(data.hypertensionFollowUpDetails));
				this.sign = JSON.parse(JSON.stringify(data.sign));
				this.lifestyleGuidance = JSON.parse(JSON.stringify(data.lifestyleGuidance));
				this.supplementaryExamination = JSON.parse(JSON.stringify(data.supplementaryExamination));
				this.mqyy = JSON.parse(JSON.stringify(data.mqyy));
				this.yytz = JSON.parse(JSON.stringify(data.yytz));
				this.referral = JSON.parse(JSON.stringify(data.referral));
			});
			let res = uni.getStorageSync('login_info');
			this.edit = uni.getStorageSync('edit');
			console.log('edit', this.edit);
			let userInfo = uni.getStorageSync('user_info');
			if (userInfo !== '') {
				this.F_UserId = userInfo[0].doctor_id;
			}
			// console.log(edit);
			// 联网
			if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
				if (this.edit) {
					this.follow_id = this.edit.follow_id;
				} else {
					if (res !== '') {
						this.person_id = res[0].id;
					}
				}
			}
			// l离线
			
			this.handleInit();
			this.handleSearchHypertensionFollow();
			this.camera = util.camera(this.basicSettingsList, this.camera);
			this.start();
			this.handleGetDoctorName();
		},
		destroyed() {
			bldprs.close();
		},
		computed: {
			...mapState(['basicSettingsList', 'tjsfList']),
			sfInit() {
				return JSON.parse(JSON.stringify(this.hypertensionFollowUpDetails));
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
				if (res !== '' && this.edit == '') {
					for (let item of this.referral) {
						if (item.name == '随访医生签名') {
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
						if ((item.name == '体重' && item.model !== '') && (jtem.name == '身高' && jtem.model !== '')) {
							num = jtem.model / 100;
							result = item.model / (num * num);
						}
						if (item.name == '体质指数' && !!result) {
							item.model = result.toFixed(2);
						}
						if (jtem.name == '体质指数') {
							if ((item.name == '体重' && item.model == '') || (item.name == '身高' && item.model == '')) {
								jtem.model = '';
							}
						}
					}
				}
			},
			handleInit() {
				for (let item of this.hypertensionFollowUpDetails) {
					if (item.name == '随访日期') {
						for (let jtem of this.basicSettingsList) {
							if (jtem.name == '默认下次随访日期天数') {
								for (let ctem of this.referral) {
									if (ctem.name == '下次随访日期') {
										let time = new Date().setDate(new Date(item.model).getDate() + Number(jtem.value))
										ctem.model = util.formatTime(new Date(time))
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
										console.log(item);
										item.model = that.systolicPressure;
										item.mode1 = that.diastolicPressure;
										item.connectionStatus = d.msg;
									}
									if (item.name == '心率') {
										item.model = that.pulse;
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
				let data = ['无症状', '无'];
				for (let item of arr) {
					if (data.indexOf(e.name) !== -1 && e.value && (data.indexOf(item.name) == -1)) {
						item.checked = false;
					}
					if ((data.indexOf(e.name) == -1) && (data.indexOf(item.name) !== -1)) {
						item.checked = false;
					}
				}
			},
			checkboxChange(e, index, ctem) {
				if (ctem == '症状') {
					this.checkbox(this.hypertensionFollowUpDetails[index].checkbox, e)
				}
				if (ctem == 'fzjc') {
					this.checkbox(this.supplementaryExamination, e)
				}
			},
			checkboxGroupChange(e) {
				console.log(e);
			},
			handleTapCanvasIcon(item) {
				this.isCanvas = true;
				if (item == '随访医生签名') {
					this.canvasItem = '随访医生签名'
				}
				if (item == '居民签名') {
					this.canvasItem = '居民签名';
				}
			},
			handleAddItem() {
				this.yytz.push({
					drug_name: '',
					day_count: '',
					every_time_dosage: '',
					unit: '',
					status: 0,
					medicId: ''
				})
			},
			handleMqyyAddItem() {
				this.mqyy[0].items.unshift({
					drug_name: '',
					day_count: '',
					every_time_dosage: '',
					unit: '',
					status: 0,
					medicId: ''
				})
			},
			handleDelItem(index, item) {
				console.log(item);
				if (item.id) {
					this.$lz.showCancel('', '是否要删除').then(res => {
						this.$u.post('DelTzDrug', {
							id: item.id,
							follow_id: this.follow_id
						}).then(res => {
							if (res.code == 200 && res.info == '响应成功') {
								this.yytz.splice(index, 1);
							} else {
								console.log(res);
							}
							this.$lz.toast(res.info)
						}).catch(err => {
							// console.log(err);
							this.$lz.toast(err.errMsg)
						})
					})
				} else {
					this.yytz.splice(index, 1);
				}
			},
			handleMqyyDelItem(index, item) {
				console.log(item);
				if (item.id) {
					this.$lz.showCancel('', '是否要删除').then(res => {
						this.$u.post('DelDrug', {
							id: item.id,
							follow_id: this.follow_id
						}).then(res => {
							console.log(res);
							if (res.code == 200 && res.info == '响应成功') {
								this.mqyy[0].items.splice(index, 1);
							}
							this.$lz.toast(res.info)
						}).catch(err => {
							// console.log(err);
							this.$lz.toast(err.errMsg)
						})
					})
				} else {
					this.mqyy[0].items.splice(index, 1);
				}
			},
			handleTapInput(item) {
				this.item = item;
				this.selectorIsShow = true;
				switch (item) {
					case "随访日期":
					case "下次随访日期":
						this.isTime = true;
						this.selectorIsShow = false;
						break;
					case "随访方式":
						this.selectList = util.followUpMode;
						break;
					case "目前是否正在吸烟":
						this.selectList = util.smokeSelect;
						break;
					case "最近7天内是否吸烟了":
						this.selectList = util.yesOrNo;
						break;
					case "摄盐情况(咸淡)":
						this.selectList = util.grade;
						break;
					case "mode1":
						this.selectList = util.grade;
						break;
					case "心理调整":
						this.selectList = util.behavior;
						break;
					case "遵医行为":
						this.selectList = util.behavior;
						break;
					case "服药依从性":
						this.selectList = data.medicationCompliance;
						break;
					case "此次随访分类":
						this.selectList = data.ccsffl;
						break;
					case "下一步管理措施":
						this.selectList = data.nextStepManagementMeasures;
						break;
					case "药物不良反应":
						this.selectList = data.adverseDrugReactions;
						break;
					case "是否转诊":
						this.selectList = util.yesOrNo;
						break;
				}
			},
			handlePicker(e) {
				// this.dateofBirth = e.year + '-' + e.month + '-' + e.day;
				for (let item of this.hypertensionFollowUpDetails) {
					if (item.name == this.item) {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
				for (let item of this.referral) {
					if (item.name == this.item) {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
			},
			handleSelect(e) {
				let _item = this.item;
				console.log(_item);
				for (let item of this.hypertensionFollowUpDetails) {
					if (_item == item.name) {
						item.model = e[0].label
					}
				}
				for (let item of this.lifestyleGuidance) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
					if (!item.mode1 && item.type == 'select' && _item == 'mode1') {
						item.mode1 = e[0].label
					}
				}
				for (let item of this.mqyy) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
				for (let item of this.referral) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
				for (let item of this.diabetesMedicationsList) {
					console.log(item.name);
					console.log(this.item);
					if (item.name == this.item) {
						item.value = e[0].label;
					}
				}
				for (let item of this.adjustMedicationAdviceForm) {
					console.log(item.name);
					console.log(this.item);
					if (item.name == this.item) {
						item.value = e[0].label;
					}
				}
			},
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
									if (this.canvasItem == '随访医生签名') {
										this.followDoctorSign = obj.result;
									}
									if (this.canvasItem == '居民签名') {
										this.personSign = obj.result;
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
			// 保存高血压随访详细信息
			handleSubmitBtn() {
				let param = {
					data: {}
				}
				let info = {
					id: this.follow_id,
					person_id: this.person_id,
					follow_time: this.hypertensionFollowUpDetails[0].model,
					follow_method: this.hypertensionFollowUpDetails[1].model,
					zz: []
				}
				for (let item of this.hypertensionFollowUpDetails[2].checkbox) {
					if (item.checked == true) {
						let obj = {
							symptom: item.name
						}
						info.zz.push(obj)
					}
				}
				param.data.info = info

				let tz = {}
				for (let item of this.sign) {
					tz[item.key] = item.model;
					if (item.keys) {
						tz[item.keys] = item.mode1
					}
				}
				param.data.tz = tz;

				let shfszd = {}
				for (let item of this.lifestyleGuidance) {
					shfszd[item.key] = item.model;
					if (item.keys) {
						shfszd[item.keys] = item.mode1
					}
				}
				param.data.shfszd = shfszd;

				let fzjc = {
					list: []
				}
				for (let item of this.supplementaryExamination) {
					if (item.checked == true) {
						let obj = {
							fuzhujiancha: item.name
						}
						fzjc.list.push(obj)
					}
					if (item.name == '辅助检查') {
						fzjc.fuzhujiancha1 = item.model
					}
				}
				param.data.fzjc = fzjc;

				let mqyyqk = [{
					compliance_drug: '',
					drug_reactions: '',
					follow_type: '',
					next_mgr_measure: '',
					druglist: []
				}];
				for (let item of this.mqyy[0].items) {
					let obj = {
						person_id: this.person_id,
						follow_id: '',
						follow_type: 'gxysf',
						drug_name: item.drug_name,
						day_count: item.day_count,
						every_time_dosage: item.every_time_dosage,
						unit: item.unit,
						create_time: utils.getFtSystemTime(),
						usage: '',
						medicId: ''
					}
					console.log(obj);
					mqyyqk[0].druglist.push(obj)
				}
				for (let item of this.mqyy) {
					if (item.status == 1) {
						if (item.name == '服药依从性') {
							mqyyqk[0].compliance_drug = item.model;
						}
						if (item.name == '药物不良反应') {
							mqyyqk[0].drug_reactions = item.model;
						}
						if (item.name == '此次随访分类') {
							mqyyqk[0].follow_type = item.model;
						}
						if (item.name == '下一步管理措施') {
							mqyyqk[0].next_mgr_measure = item.model;
						}
					}
				}

				param.data.mqyyqk = mqyyqk;

				let yytzyj = []
				for (let item of this.yytz) {
					let obj = {
						person_id: this.person_id,
						follow_id: '',
						follow_type: 'gxysf',
						drug_name: item.drug_name,
						day_count: item.day_count,
						every_time_dosage: item.every_time_dosage,
						unit: item.unit,
						create_time: utils.getFtSystemTime(),
						usage: '',
						is_take_institution: '',
						medicId: ''
					}
					yytzyj.push(obj)
				}
				param.data.yytzyj = yytzyj;

				let zz = {
					follow_doctor_sign: this.followDoctorSign,
					person_sign: this.personSign,
					upload_status: '0'
				}
				for (let item of this.referral) {
					zz[item.key] = item.model;
				}
				param.data.zz = zz;
				console.log(param);
				// for (let item of this.hypertensionFollowUpDetails) {
				// 	for (let jtem of this.referral) {
				// 		if (item.required && item.model == '' || jtem.required && jtem.model == '') {
				// 			return this.$lz.toast('必填项不能为空');
				// 		}
				// 	}
				// }
				// 联网
				if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
					this.$u.post('SaveHypertensionFollow', param).then(res => {
						console.log(res);
						if (res.code == 200 && JSON.stringify(res.data) !== '[]') {
							let data = res.data[0];
							this.follow_id = data.follow_id
							this.mqyy[0].items = data.drug;
							this.yytz = data.tiaozheng;
						}
						this.$lz.toast(res.info);
					})
				}
				// 离线
				if (this.$store.state.lxUserInfo !== '' && this.$store.state.lxUserInfo.lxStatus) {
					console.log('离线');
					let res = uni.getStorageSync("SearchOffineFollowHypertension");
					let obj = {};
					let data = param.data;
					data.symptom = data.info.zz.reduce((e, {
						symptom
					}) => [...e, symptom], []).join(',');
					delete data.info.zz;
					for (let item in data) {
						if (!(data[item] instanceof Array) && !(typeof(data[item]) == 'string')) {
							Object.assign(obj, {
								...data[item]
							})
						} else {
							let temp = {};
							temp[item] = data[item];
							Object.assign(obj, temp);
						}
					}
					obj.compliance_drug = obj.mqyyqk[0].compliance_drug;
					obj.drug_reactions = obj.mqyyqk[0].drug_reactions;
					obj.follow_type = obj.mqyyqk[0].follow_type;
					obj.next_mgr_measure = obj.mqyyqk[0].next_mgr_measure;
					obj.yyqk = obj.mqyyqk[0].druglist;
					delete obj.mqyyqk;
					obj.yytz = obj.yytzyj;
					delete obj.yytzyj;
					obj.fuzhujiancha = obj.list.reduce((e, {
						fuzhujiancha
					}) => [...e, fuzhujiancha], []).join(',');
					delete obj.list;
					obj.follow_id = obj.id;
					delete obj.id;
					if (this.edit == '') {
						if (res.data.length == 0) {
							uni.setStorageSync('SearchOffineFollowHypertension', {
								data: [obj]
							});
						}
						if (res.data.length) {
							for (let i = res.data.length - 1; i >= 0; i--) {
								if (res.data[i].follow_id == obj.follow_id) {
									res.data.splice(i, 1, obj)
								}
							}
							let newArr = res.data.find(item => {
								return item.follow_id == obj.follow_id
							})
							if (newArr === undefined) {
								res.data.push(obj);
							}
							uni.setStorageSync('SearchOffineFollowHypertension', res);
						}
					}else{
						for (let i = res.data.length - 1; i >= 0; i--) {
							if (res.data[i].follow_id == this.edit.follow_id) {
								res.data.splice(i, 1, obj)
							}
						}
						uni.setStorageSync('SearchOffineFollowHypertension', res);
					}
					this.$lz.toast('保存成功');
				}
			},
			// 高血压随访查询 
			handleSearchHypertensionFollow() {
				// 联网
				if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
					let obj = {
						follow_id: this.follow_id,
						follow_type: 'gxysf'
					}
					console.log(obj);
					this.$u.post('SearchHypertensionFollow', obj).then(res => {
						console.log(res);
						this.searchHypertensionFollow(res);
					}).catch(err => {
						this.$lz.toast(err.errMsg);
					})
				}
				// 离线
				
			},
			// 高血压随访查询
			searchHypertensionFollow(res){
				console.log(res);
				if (res.code == 200 && JSON.stringify(res.data) !== '[]') {
					let data = res.data[0];
					let symptom = data.symptom.split(',');
					for (let a of this.hypertensionFollowUpDetails) {
						a.model = data[a.key]
						if (a.title == '症状') {
							for (let b of a.checkbox) {
								for (let c of symptom) {
									if (b.name == c) {
										b.checked = true;
									}
								}
							}
						}
					}
				
					for (let a of this.sign) {
						a.model = data[a.key]
						if (a.keys) {
							a.mode1 = data[a.keys]
						}
					}
				
					for (let a of this.lifestyleGuidance) {
						a.model = data[a.key]
						if (a.keys) {
							a.mode1 = data[a.keys]
						}
					}
					let fuzhujiancha = data.fuzhujiancha.split(',');
					for (let a of this.supplementaryExamination) {
						for (let b of fuzhujiancha) {
							if (a.name == b) {
								a.checked = true;
							}
						}
						if (a.name == '辅助检查') {
							a.model = data[a.key]
						}
					}
				
					for (let a of this.mqyy) {
						if (a.status == 1) {
							a.model = data[a.key];
						}
					}
				
					let drug = []
					for (let a of data.drug) {
						drug.push({
							drug_name: a.drug_name,
							day_count: a.day_count,
							every_time_dosage: a.every_time_dosage,
							unit: a.unit,
							status: 0,
							id: a.id
						});
						this.mqyy[0].items = drug
					}
				
					let yytz = []
					for (let a of data.tiaozheng) {
						yytz.push({
							drug_name: a.drug_name,
							day_count: a.day_count,
							every_time_dosage: a.every_time_dosage,
							unit: a.unit,
							id: a.id
						})
						this.yytz = yytz
					}
				
					for (let a of this.referral) {
						a.model = data[a.key]
					}
					this.personSign = data.person_sign;
					this.followDoctorSign = data.follow_doctor_sign;
				
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
			// 分发popup弹出
			handleViewDetails(item) {
				if (item == '血压') {
					this.isBloodPressureCheckList = true;
				}
				if (item == '身高') {
					this.isStatureCheckingList = true;
				}
				if (item == '体重') {
					this.isWeightCheckingList = true;
				}
				if (item == '目前用药情况') {
					this.isListDiabetesMedications = true;
					this.diabetesSearchBar = true;
					this.handleSearchDrugUsageListYy();
				}
				if (item == '调整用药情况') {
					this.isAdjustMedicationAdvice = true;
					this.tzyySearchBar = true;
					this.handleSearchDrugAbjustList();
					console.log(2222);
				}
			},
			// 发起网络请求 添加用药 用药情况 icon
			handleSubmitAddDrugYy() {
				for (let item of this.diabetesMedicationsList) {
					if (item.value == '') {
						return this.$lz.toast(item.name + '不能为空');
					}
				}
				let param = {},
					data = {
						medicId: this.medicId,
						F_UserId: this.F_UserId,
						create_time: utils.getFtSystemTime(),
					};
				for (let item of this.diabetesMedicationsList) {
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
					this.isAddListDiabetesMedications = false;
				}).catch(err => {
					this.isAddListDiabetesMedications = false;
					this.$lz.toast(err.errMsg);
					console.log(err);
				})
			},
			// 发起网络请求 添加用药 调整用药情况 icon
			handleSaveDrugAbjust() {
				for (let item of this.adjustMedicationAdviceForm) {
					if (item.value == '') {
						return this.$lz.toast(item.name + '不能为空');
					}
				}
				let param = {},
					data = {
						medicId: this.medicId,
						F_UserId: this.F_UserId,
						create_time: utils.getFtSystemTime()
					};
				for (let item of this.adjustMedicationAdviceForm) {
					data[item.key] = item.value;
				}
				param.data = data;
				console.log(param);
				this.$u.post('SaveDrugAbjust', param).then(res => {
					console.log(res);
					if (res.code == 200 && res.info == '响应成功') {
						this.$lz.toast(res.info);
						this.id = res.data.id;
					} else {
						this.$lz.toast(res.info);
					}
					this.isAddAdjustMedicationAdvice = false;
				}).catch(err => {
					this.isAddAdjustMedicationAdvice = false;
					this.$lz.toast(err.errMsg);
					console.log(err);
				})
			},
			// 发起网络请求 查询用药列表 (目前用药情况)
			handleSearchDrugUsageListYy() {
				let obj = {
					F_UserId: this.F_UserId,
					drug_name: this.drugName,
					pagination: JSON.stringify(this.pagination)
				}
				this.listDiabetesMedications[1] = [];
				this.$refs.tables.drugNames = '';
				this.$refs.tables.pageModels = '';
				this.drugName = '';
				this.pageModel = '';
				console.log(obj);
				this.$u.post('SearchDrugUsageList', obj).then(res => {
					console.log(res);
					if (res.code == 200 && res.info == '响应成功' && res.data.pagedatas.length) {
						this.pagination.total = res.data.pagenumber;
						// console.log(this.pagination.total);
						let arr = [];
						res.data.pagedatas.forEach(item => {
							arr.push(item)
						})
						this.listDiabetesMedications[1] = arr;
						this.$refs.tables.tableContents = this.listDiabetesMedications[1];
					} else {
						this.$lz.toast('暂无数据~');
						this.pagination.total = res.data.pagenumber;
						this.listDiabetesMedications[1] = [];
						this.$refs.tables.tableContents = this.listDiabetesMedications[1];
					}
				}).catch(err => {
					console.log(err);
					this.$lz.toast(err.errMsg);
				})
			},
			// 发起网络请求 查询用药列表 (调整用药情况)
			handleSearchDrugAbjustList() {
				let obj = {
					F_UserId: this.F_UserId,
					drug_name: this.drugName,
					pagination: JSON.stringify(this.paginationtzyy)
				}
				this.adjustMedicationAdviceList[1] = [];
				this.$refs.lz.drugName = '';
				this.$refs.lz.pageModels = '';
				this.drugName = '';
				this.pageModel = '';
				console.log(obj);
				this.$u.post('SearchDrugAbjustList', obj).then(res => {
					console.log(res);
					if (res.code == 200 && res.info == '响应成功' && res.data.pagedatas.length) {
						this.paginationtzyy.total = res.data.pagenumber;
						// console.log(this.pagination.total);
						let arr = [];
						res.data.pagedatas.forEach(item => {
							arr.push(item)
						})
						// console.log(arr);
						this.adjustMedicationAdviceList[1] = arr;
						// console.log(this.adjustMedicationAdviceList[1]);
						this.$refs.lz.tableContents = this.adjustMedicationAdviceList[1];
						// console.log(this.$refs.lz.tableContents);
					} else {
						this.$lz.toast('暂无数据~');
						this.paginationtzyy.total = res.data.pagenumber;
						this.adjustMedicationAdviceList[1] = [];
						this.$refs.lz.tableContents = this.adjustMedicationAdviceList[1];
					}
				}).catch(err => {
					console.log(err);
					this.$lz.toast(err.errMsg);
				})
			},
			// 目前用药情况 & 调整用药情况的用药列表弹出层关闭
			handleCloseDrugPopup(item) {
				if (item == '目前用药情况') {
					this.isListDiabetesMedications = false;
					this.diabetesSearchBar = false;
					this.pagination.page = '1';
				} else {
					this.isAdjustMedicationAdvice = false;
					this.tzyySearchBar = false;
					this.paginationtzyy.page = 1;
				}
			},
			// 目前用药情况 & 调整用药情况的添加用药弹出层关闭
			handleTapCloseAddDrugs(item) {
				if (item == '目前用药情况') {
					this.isAddListDiabetesMedications = false;
					this.isListDiabetesMedications = true;
					this.diabetesSearchBar = true;
					this.handleSearchDrugUsageListYy();
					for (let item of this.diabetesMedicationsList) {
						item.value = '';
					}
				} else {
					this.isAddAdjustMedicationAdvice = false;
					this.isAdjustMedicationAdvice = true;
					this.tzyySearchBar = true;
					this.handleSearchDrugAbjustList();
					for (let item of this.adjustMedicationAdviceForm) {
						item.value = '';
					}
				}
			},
			// 点击添加按钮 添加用药
			handleTapAddDrugs(item) {
				this.medicId = '';
				// console.log(item);
				if (item == '目前用药情况') {
					this.isListDiabetesMedications = false;
					this.diabetesSearchBar = false;
					setTimeout(() => {
						this.isAddListDiabetesMedications = true;
					}, 450)
					for (let item of this.diabetesMedicationsList) {
						item.value = '';
					}
				} else {
					this.isAdjustMedicationAdvice = false;
					this.tzyySearchBar = false;
					setTimeout(() => {
						this.isAddAdjustMedicationAdvice = true;
					}, 450)
					for (let item of this.adjustMedicationAdviceForm) {
						item.value = '';
					}
				}
			},
			// 发起网络请求 查询用药列表 药名搜索 (目前用药情况)
			handleTapSearchBtnYy(item) {
				this.drugName = item;
				this.listDiabetesMedications[1] = [];
				this.pagination.page = 1;
				this.handleSearchDrugUsageListYy();
			},
			// 发起网络请求 查询用药列表 药名搜索 (调整用药)
			handleTapSearchBtnTzyy(item) {
				console.log(item);
				this.drugName = item;
				this.adjustMedicationAdviceList[1] = [];
				this.paginationtzyy.page = 1;
				this.handleSearchDrugAbjustList();
			},
			// 发起网络请求 删除用药列表 (目前用药情况)
			handleDelDurgUsageListYy(item, index) {
				console.log(item);
				this.$lz.showCancel('', '是否要删除?').then(res => {
					this.$u.post('DelDurgUsageList', {
						medicId: item.medicId
					}).then(res => {
						console.log(res);
						if (res.code == 200 && res.info == '响应成功' && res.data) {
							this.$lz.toast(res.info);
							this.listDiabetesMedications[1] = [];
							this.pagination.page = 1;
							this.handleSearchDrugUsageListYy();
						} else {
							this.$lz.toast(res.info);
						}
					}).catch(err => {
						console.log(err);
						this.$lz.toast(err.errMsg);
					})
				})
			},
			// 发起网络请求 删除用药列表 (调整用药)
			handleDelDurgUsageListTzyy(item, index) {
				console.log(item);
				this.$lz.showCancel('', '是否要删除?').then(res => {
					this.$u.post('DelDrugAbjustList', {
						medicId: item.medicId
					}).then(res => {
						console.log(res);
						if (res.code == 200 && res.info == '响应成功' && res.data) {
							this.$lz.toast(res.info);
							this.adjustMedicationAdviceList[1] = [];
							this.paginationtzyy.page = 1;
							this.handleSearchDrugAbjustList();
						} else {
							this.$lz.toast(res.info);
						}
					}).catch(err => {
						console.log(err);
						this.$lz.toast(err.errMsg);
					})
				})
			},
			// 发起网络请求 查询用药情况信息
			handleTabEditItemYy(item) {
				this.medicId = item.medicId;
				this.$u.post('SearchDrugUsage', {
					medicId: this.medicId
				}).then(res => {
					if (res.code == 200 && res.info == '响应成功') {
						let data = res.data[0];
						this.isListDiabetesMedications = false;
						this.isAddListDiabetesMedications = true;
						for (let item of this.diabetesMedicationsList) {
							item.value = data[item.key];
						}
					}
				}).catch(err => {
					console.log(err);
				})
			},
			// 发起网络请求 查询用药调整信息
			handleTabEditItemTzyy(item) {
				this.medicId = item.medicId;
				this.$u.post('SearchDrugAbjust', {
					medicId: this.medicId
				}).then(res => {
					if (res.code == 200 && res.info == '响应成功') {
						let data = res.data[0];
						this.isAdjustMedicationAdvice = false;
						this.isAddAdjustMedicationAdvice = true;
						for (let item of this.adjustMedicationAdviceForm) {
							item.value = data[item.key];
						}
					}
				}).catch(err => {
					console.log(err);
				})
			},
			// 输入要跳转的列表页 点击确定按钮跳转对应列表页(目前用药)
			handleTapPageJumpBtnYy(page) {
				if (page !== '') {
					this.pageModel = page;
					if (this.pageModel <= this.pagination.total) {
						this.pagination.page = this.pageModel;
						this.handleSearchDrugUsageListYy();
					} else {
						return this.$lz.toast('暂无数据');
					}
				} else {
					return this.$lz.hideCancel('', '请输入要跳转的页数');
				}
			},
			// 输入要跳转的列表页 点击确定按钮跳转对应列表页(调整用药)
			handleTapPageJumpBtnTzyy(page) {
				if (page !== '') {
					this.pageModel = page;
					if (this.pageModel <= this.paginationtzyy.total) {
						this.paginationtzyy.page = this.pageModel;
						this.handleSearchDrugAbjustList();
					} else {
						return this.$lz.toast('暂无数据');
					}
				} else {
					return this.$lz.hideCancel('', '请输入要跳转的页数');
				}
			},
			// 切换列表显示页数 上一页 (目前用药)
			handlePreviousPageYy() {
				if (this.pagination.page == 1) {
					this.$lz.toast('已经是第一页了哦');
				} else {
					this.pagination.page--;
					this.handleSearchDrugUsageListYy();
				}
			},
			// 切换列表显示页数 下一页 (目前用药)
			handleNextPageYy() {
				if (this.pagination.page < this.pagination.total) {
					this.pagination.page++;
					this.handleSearchDrugUsageListYy();
				} else {
					return this.$lz.toast('没有更多数据了!');
				}
			},
			// 切换列表显示页数 上一页 (调整用药)
			handlePreviousPageTzyy() {
				if (this.paginationtzyy.page == 1) {
					this.$lz.toast('已经是第一页了哦');
				} else {
					this.paginationtzyy.page--;
					this.handleSearchDrugAbjustList();
				}
			},
			// 切换列表显示页数 下一页 (调整用药)
			handleNextPageTzyy() {
				if (this.paginationtzyy.page < this.paginationtzyy.total) {
					this.paginationtzyy.page++;
					this.handleSearchDrugAbjustList();
				} else {
					return this.$lz.toast('没有更多数据了!');
				}
			},
			// 点击选择按钮 添加某一列用药 (目前用药)
			handleTapSelectItemYy(item) {
				console.log(item);
				this.mqyy[0].items.push(item);
				this.isListDiabetesMedications = false;
				this.diabetesSearchBar = false;
				this.isAddListDiabetesMedications = false;
			},
			handleTapSelectItemTzyy(item) {
				console.log(item);
				console.log(222);
				this.yytz.push(item);
				this.isAdjustMedicationAdvice = false;
				this.tzyySearchBar = false;
				this.isAddAdjustMedicationAdvice = false;
			}
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

			// 随访日期 & 症状
			.container {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: .1rem;

				.content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					align-items: center;
					flex-wrap: wrap;

					.main {
						display: flex;
						align-items: center;
						width: 50%;

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
							position: relative;
						}

						.icon-select {
							color: #ccc;
							position: absolute;
							margin-left: 2.5rem;
						}

						.required {
							color: #f00;
						}
					}

					.checkbox {
						margin-top: .1rem;

						.checkbox-content {
							display: flex;

							.title {
								width: .9rem;
								text-align: right;
								font-size: .12rem;
								margin-top: 6rpx;
								margin-right: .1rem;
							}

							.name {
								font-size: .13rem;
							}

							.u-checkbox-group {
								flex: 1;
							}
						}
					}
				}
			}

			// 体征
			.tz-container {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: .1rem;

				.tz-content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					align-items: center;
					flex-wrap: wrap;

					.title {
						display: block;
						width: 100%;
					}

					.main {
						display: flex;
						align-items: center;
						width: 50%;
						margin-bottom: .1rem;

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
							width: .4rem;
							margin-left: .1rem;
							position: relative;
						}

						.right {
							display: flex;
							align-items: center;

							.txt {
								margin-left: .1rem;
								font-size: .11rem;
							}

							&>input {
								border: 1rpx solid #e3e3e3;
								border-radius: 8rpx;
								font-size: .12rem;
								padding: 10rpx 0 10rpx 20rpx;
								width: .4rem;
								margin-left: .1rem;
								position: relative;
							}
						}

						.company {
							font-size: .12rem;
							margin-left: 10rpx;
						}

						.icon {
							background-color: #33ccff;
							padding: 0 8rpx;
							border-radius: 8rpx;
							margin-left: 8rpx;
						}

						.connectionStatus {
							font-size: .12rem;
							margin-left: .2rem;
						}
					}
				}
			}

			// 生活方式指导
			.shfs-container {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: .1rem;

				.shfs-content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					align-items: center;
					flex-wrap: wrap;

					.title {
						display: block;
						width: 100%;
					}

					.main {
						display: flex;
						align-items: center;
						margin-top: .1rem;

						.name {
							width: 1.4rem;
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
							position: relative;
						}

						.icon-select {
							color: #ccc;
							position: absolute;
							margin-left: 3rem;
						}

						.right {
							display: flex;
							align-items: center;

							.txt {
								margin-left: .1rem;
								font-size: .11rem;
							}

							&>input {
								border: 1rpx solid #e3e3e3;
								border-radius: 8rpx;
								font-size: .12rem;
								padding: 10rpx 0 10rpx 20rpx;
								width: .62rem;
								margin-left: .1rem;
								position: relative;
							}

							.icon-select {
								color: #ccc;
								position: absolute;
								margin-left: -.22rem;
							}
						}

						.company {
							font-size: .12rem;
							margin-left: .1rem;
							width: .5rem;
						}
					}
				}
			}

			// 辅助检查
			.fzjc-container {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: .1rem;

				.fzjc-content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					align-items: center;
					flex-wrap: wrap;

					.title {
						display: block;
						width: 100%;
					}

					.main {
						width: 100%;
						display: flex;
						margin-top: .1rem;
						flex-wrap: wrap;

						.top-checkbox {
							margin-left: 1.5rem;

							.name {
								font-size: .14rem;
							}
						}

						.bottom-input {
							width: 100%;
							display: flex;
							align-items: center;
							margin-top: .1rem;

							.name {
								width: 1.4rem;
								text-align: right;
								font-size: .13rem;
							}

							&>input {
								border: 1rpx solid #e3e3e3;
								border-radius: 8rpx;
								font-size: .12rem;
								padding: 10rpx 0 10rpx 20rpx;
								flex: 1;
								margin-left: .1rem;
								position: relative;
							}
						}
					}
				}
			}

			// 目前用药情况
			.mqyy-container {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: .1rem;

				.mqyy-content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					align-items: center;
					flex-wrap: wrap;

					.head {
						display: flex;
						align-items: center;
						width: 100%;

						.icon {
							background-color: #33ccff;
							padding: 0 8rpx;
							border-radius: 8rpx;
							margin-left: .1rem;
						}

					}

					.top {
						display: flex;
						font-size: .12rem;
						margin-top: .2rem;

						.txt {
							padding-left: .2rem;
						}

						.item {
							width: 1.6rem;
							// margin-left: .4rem;
							padding-left: .4rem;
						}

						.add {
							background-color: #33ccff;
							padding: 8rpx .15rem;
							border-radius: 8rpx;
							margin-left: .16rem;
						}
					}

					.bottom {
						display: flex;
						margin-top: .1rem;

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							margin-left: .1rem;
							width: 1.4rem;
							position: relative;
						}

						.icon {
							border: 1rpx solid #e3e3e3;
							padding: 0 .1rem;
							border-radius: 8rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-left: .1rem;
						}

					}

					.select {
						display: flex;
						align-items: center;
						width: 50%;
						margin-top: .1rem;

						.name {
							font-size: .12rem;
							width: .9rem;
							text-align: right;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							margin-left: .1rem;
							width: 1.4rem;
							position: relative;
						}

						.icon-select {
							position: absolute;
							color: #c2c2c2;
							margin-left: 2.3rem;
						}
					}
				}
			}

			// 用药调整意见
			.yytz-container {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: .1rem;

				.yytz-content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					align-items: center;
					flex-wrap: wrap;

					.head {
						display: flex;
						align-items: center;
						width: 100%;

						.icon {
							background-color: #33ccff;
							padding: 0 8rpx;
							border-radius: 8rpx;
							margin-left: .1rem;
						}

					}

					.top {
						display: flex;
						font-size: .12rem;
						margin-top: .2rem;

						.txt {
							padding-left: .2rem;
						}

						.item {
							width: 1.6rem;
							// margin-left: .4rem;
							padding-left: .4rem;
						}

						.add {
							background-color: #33ccff;
							padding: 8rpx .15rem;
							border-radius: 8rpx;
							margin-left: .16rem;
						}
					}

					.bottom {
						display: flex;
						margin-top: .1rem;
						margin-left: .9rem;

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							margin-left: .1rem;
							width: 1.4rem;
							position: relative;
						}

						.icon {
							border: 1rpx solid #e3e3e3;
							padding: 0 .1rem;
							border-radius: 8rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-left: .1rem;
						}
					}
				}
			}

			// 转诊
			.zz-container {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: .1rem;

				.zz-content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					align-items: center;
					flex-wrap: wrap;

					.title {
						display: block;
						width: 100%;
					}

					.main {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						margin-top: .1rem;

						.name {
							font-size: .12rem;
							width: .9rem;
							text-align: right;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							margin-left: .1rem;
							position: relative;
						}

						.icon-select {
							position: absolute;
							color: #c2c2c2;
							margin-left: 2.5rem;
						}

						.required {
							position: absolute;
							// right: -0.1rem;
							margin-left: 2.8rem;
							color: #f00;
							font-size: .12rem;
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
