<template>
	<view class="wrap">
		<scroll-view scroll-y class="scroll">
			<free-title title="糖尿病患者随访详细信息" isRight :camera="camera"></free-title>
			<view class="container">
				<view class="content">
					<view class="main" v-for="(item,index) in diabetesFollowUpDetails[0].list" :key="index">
						<text class="name">{{item.name}}</text>
						<input :type="item.type" :disabled="item.disabled" :placeholder="item.placeholder"
							:adjust-position="false" v-model="item.model" @click="handleTapInputItem(item.name)">
						<text class="iconfont select">{{item.select}}</text>
						<text class="iconfont required-icon">{{item.requiredIcon}}</text>
					</view>
					<view class="checkbox">
						<text class="name">{{diabetesFollowUpDetails[1].title}}</text>
						<u-checkbox-group class="u-checkbox-group" @change="checkboxGroupChange">
							<u-checkbox v-for="(item,index) in diabetesFollowUpDetails[1].checkbox" :key="index"
								v-model="item.checked" :name="item.name" @change="checkboxChange">
								<view style="display: flex;align-items: center;">
									<text class="u-checkbox-name">{{item.name}}</text>
									<input v-if="item.name == '其他' && item.checked" v-model="item.model"
										:adjust-position="false"
										style="border: 1rpx solid #e3e3e3;border-radius: 8rpx;font-size: .12rem;padding: 10rpx 0 10rpx 20rpx;width: 1.4rem;margin-left: .1rem;"
										@click.stop="" />
								</view>
							</u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
				<!-- 体征 -->
				<view class="tz-container">
					<view class="tz-content">
						<text class="title">体征</text>
						<view v-for="(item,index) in sign" :key="index" class="main"
							:style="item.name == '其他' ? 'width:100%;' : ''">
							<text class="name">{{item.name}}</text>
							<input :style="handleMainSignStyle(item)" :type="item.type" :placeholder="item.placeholder"
								:disabled="item.disabled" v-model="item.one" :adjust-position="false"
								@click="item.type == 'select' ? handleTapInputItem(item.name) : ''"
								@input="item.name == '身高' || item.name == '体重' ? handleTzzs() : ''" />
							<view class="right" v-if="item.state == 1">
								<text class="txt">/</text>
								<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
									v-model="item.two" :adjust-position="false">
							</view>
							<text class="company">{{item.company}}</text>
							<view class="icon" @click="handleViewDetails(item.name)">{{item.icon}}</view>
							<text class="connectionStatus">{{item.connectionStatus}}</text>
						</view>
					</view>
				</view>
				<!-- 生活方式指导 -->
				<view class="shfszd-content">
					<text class="title">生活方式指导</text>
					<view class="main" v-for="(item,index) in lifestyleGuidance" :key="index">
						<text class="name">{{item.name}}</text>
						<input :type="item.type" v-model="item.one" :style="handleShfsStyle(item)"
							:placeholder="item.placeholder" :adjust-position="false" :disabled="item.disabled"
							@click="item.type == 'select' ? handleTapInputItem(item.name) : ''" />
						<text class="txt" v-if="item.state == 0">/</text>
						<input v-if="item.state == 0" :type="item.type" v-model="item.two" :adjust-position="false" />
						<text class="company">{{item.company}}</text>
						<text class="iconfont select" v-if="item.select">{{item.select}}</text>
					</view>
				</view>
				<!-- 辅助检查 -->
				<view class="fzjc-content">
					<text class="title">辅助检查</text>
					<view class="main" v-for="(item,index) in fzjc" :key="index" :style="handleFzjcStyle(item)">
						<text class="name">{{item.name}}</text>
						<input type="text" v-model="item.model" :style="item.name == '其他检查' ? 'width:83%;' : ''" />
						<view class="right">
							<text class="company" v-if="item.company">{{item.company}}</text>
							<view class="icon" v-if="item.icon" @click="handleViewDetails(item.name)">{{item.icon}}
							</view>
							<text class="status" v-if="item.status">{{item.status}}</text>
						</view>
					</view>
				</view>
				<!-- 目前用药情况 -->
				<view class="mqyy-content">
					<view class="title-box">
						<text class="title">目前用药情况</text>
						<view class="icon" @click="handleViewDetails('目前用药情况')">...</view>
					</view>
					<view class="item-box">
						<view class="item1">目前用药情况</view>
						<view class="yw-item">药物名称</view>
						<view class="item">每日次数</view>
						<view class="item">每次用量</view>
						<view class="item">单位</view>
						<view class="add" @click="handleAddItem('mqyy')">+</view>
					</view>
					<view v-for="(item,index) in mqyy" :key="index" class="bottom">
						<input :adjust-position="false" v-model="item.drug_name" style="width: 2rem;" />
						<input :adjust-position="false" v-model="item.day_count" />
						<input :adjust-position="false" v-model="item.every_time_dosage" />
						<input :adjust-position="false" v-model="item.unit" />
						<view class="iconfont del" @click="handleDelItem('mqyy',index,item)">&#xe718;</view>
					</view>
				</view>
				<!--  -->
				<view class="main-content">
					<view class="main" v-for="(item,index) in list" :key="index" :style="handleMainStyle(item)">
						<text class="name">{{item.name}}</text>
						<input :type="item.type" :disabled="item.disabled" :placeholder="item.placeholder"
							v-model="item.model" @click="item.type == 'select' ? handleTapInputItem(item.name) : ''" />
						<text class="iconfont select" v-if="item.type == 'select'"
							:style="handleMainSelectStyle(item)">{{item.select}}</text>
					</view>
				</view>
				<!-- 调整用药意见 -->
				<view class="tzyy-content">
					<view class="title-box">
						<text class="title">调整用药意见</text>
						<view class="icon" @click="handleViewDetails('调整用药意见')">...</view>
					</view>
					<view class="item-box">
						<view class="item1">调整用药意见</view>
						<view class="yw-item">药物名称</view>
						<view class="item">每日次数</view>
						<view class="item">每次用量</view>
						<view class="item">单位</view>
						<view class="add" @click="handleAddItem('tzyy')">+</view>
					</view>
					<view v-for="(item,index) in tzyy[0].items" :key="index" class="bottom">
						<input :adjust-position="false" v-model="item.drug_name" style="width: 2rem;" />
						<input :adjust-position="false" v-model="item.day_count" />
						<input :adjust-position="false" v-model="item.every_time_dosage" />
						<input :adjust-position="false" v-model="item.unit" />
						<view class="iconfont del" @click="handleDelItem('tzyy',index,item)">&#xe718;</view>
					</view>
					<view class="input-box">
						<block v-for="(item,index) in tzyy[1].list" :key="index" class="mains">
							<text class="name"
								:style="item.name == '胰岛素用法和用量' ? 'margin-left:1rem;' : ''">{{item.name}}</text>
							<input :adjust-position="false" v-model="item.model">
						</block>
					</view>
				</view>
				<!-- 转诊 -->
				<view class="zz-content">
					<text class="title">转诊</text>
					<view class="main" v-for="(item,index) in zz" :key="index" :style="handleZzMainStyle(item)">
						<text class="name">{{item.name}}</text>
						<input :type="item.type" :disabled="item.disabled" :placeholder="item.placeholder"
							v-model="item.model" :adjust-position="false" :style="handleZzInputStyle(item)"
							@click="item.type == 'select' ? handleTapInputItem(item.name) : ''" />
						<text class="iconfont select" v-if="item.type =='select'">&#xe65a;</text>
						<text class="iconfont required-icon" v-if="item.required">{{item.required}}</text>
						<text class="iconfont autograph" @click="handleAutograph(item.name)"
							v-if="item.autograph">{{item.autograph}}</text>
						<image v-if="item.name == '随访医生签名' && person_sign!==''" :src="person_sign"
							style="width: 1rem;height: .3rem;">
						</image>
						<image v-if="item.name == '居民签名' && family_sign!==''" :src="family_sign"
							style="width: 1rem;height: .3rem;">
						</image>
					</view>
				</view>
			</view>
			<view class="btn-container">
				<u-button class="btn" @click="handleSubmitBtn" type="primary">保存</u-button>
			</view>
			<canva v-if="isCanvas" @close="isCanvas = false" @finish="finish"></canva>
			<free-table-popup title="血压检测列表" :isPopup="isBloodPressureCheckList" :tableHead="bloodPressureCheckList[0]"
				:tableContent="bloodPressureCheckList[1]" @close="isBloodPressureCheckList = false">
			</free-table-popup>
			<free-table-popup title="身高检测列表" :isPopup="isStatureCheckingList" :tableHead="statureCheckingList[0]"
				:tableContent="statureCheckingList[1]" @close="isStatureCheckingList = false">
			</free-table-popup>
			<free-table-popup title="体重检测列表" :isPopup="isWeightCheckingList" :tableHead="weightCheckingList[0]"
				:tableContent="weightCheckingList[1]" @close="isWeightCheckingList = false">
			</free-table-popup>
			<free-table-popup title="空腹血糖检测列表" :isPopup="isFastingBloodGlucoseTestList"
				:tableHead="fastingBloodGlucoseTestList[0]" :tableContent="fastingBloodGlucoseTestList[1]"
				@close="isFastingBloodGlucoseTestList = false">
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
				:pagination="paginationtzyy" @click="handleTapAddDrugs('调整用药意见')"
				@close="handleCloseDrugPopup('调整用药意见')" @search="handleTapSearchBtnTzyy"
				@delItem="handleDelDurgUsageListTzyy" @editItem="handleTabEditItemTzyy"
				@selectItem="handleTapSelectItemTzyy" @pageJump="handleTapPageJumpBtnTzyy"
				@previousPage="handlePreviousPageTzyy" @nextPage="handleNextPageTzyy">
			</free-table-popup>
			<free-add-drugs :isFreeAddDrug="isAddAdjustMedicationAdvice" :drugForm="adjustMedicationAdviceForm"
				@close="handleTapCloseAddDrugs('调整用药意见')" @slectClick="handleSlectClick">
			</free-add-drugs>
			<u-picker v-model="isTime" mode="time" @confirm="handlePicker"></u-picker>
			<u-select v-model="selectorIsShow" :list="selectList" @confirm="handleSelect"></u-select>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import data from '@/js/diabetesFollowUpDetails.js';
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import canva from "@/components/free-ui/free-canvas/canvas.vue";
	import util from '@/utils/util.js'
	import common from '@/common/utils.js';
	import freeTablePopup from '@/components/free-ui/free-table-popup/free-table-popup.vue';
	import freeAddDrugs from '@/components/free-ui/free-add-drugs/free-add-drugs.vue';
	let bldprs = null;
	let bldPressDevice = require('@/utils/BTDevice/BldPressBTDevice.js');
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
			canva,
			freeTablePopup,
			freeAddDrugs
		},
		data() {
			return {
				camera: '',
				xydata: {},
				isAdjustMedicationAdvice: false,
				tzyySearchBar: false,
				isListDiabetesMedications: false,
				diabetesSearchBar: false,
				isAddListDiabetesMedications: false,
				isAddAdjustMedicationAdvice: false,
				// 设备信息
				equipment: {
					e_name: "BP06D21801040414",
					notice_id: "0000FFF1-0000-1000-8000-00805F9B34FB",
					write_in_id: "0000FFF2-0000-1000-8000-00805F9B34FB",
					service_id: "0000FFF0-0000-1000-8000-00805F9B34FB",
					e_id: "f5aa736f-da98-4f3b-a1da-017336a2b5d2"
				},
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
						key: 'every_time_dosage'
					},
					{
						name: '单位：',
						value: '',
						select: '\ue65a',
						key: 'unit'
					}
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
						key: 'every_time_dosage'
					},
					{
						name: '单位：',
						value: '',
						select: '\ue65a',
						key: 'unit'
					}
				],
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
				isCanvas: false,
				person_sign: '',
				family_sign: '',
				item: '',
				diabetesFollowUpDetails: JSON.parse(JSON.stringify(data.diabetesFollowUpDetails)),
				sign: JSON.parse(JSON.stringify(data.sign)),
				lifestyleGuidance: JSON.parse(JSON.stringify(data.lifestyleGuidance)),
				fzjc: JSON.parse(JSON.stringify(data.fzjc)),
				mqyy: JSON.parse(JSON.stringify(data.mqyy)),
				list: JSON.parse(JSON.stringify(data.list)),
				tzyy: JSON.parse(JSON.stringify(data.tzyy)),
				zz: JSON.parse(JSON.stringify(data.zz)),
				person_id: '',
				follow_id: '',
				isTime: false,
				selectorIsShow: false,
				selectList: [],
				data: '',
				file_table_cell: {},
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
				// 收缩压
				systolicPressure: 0,
				// 舒张压
				diastolicPressure: 0,
				medicId: '',
				F_UserId: '',
				drugName: '',
				drugNametzyy: '',
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
				pageModel: '',
				edit: '',
				id: ''
			}
		},
		mounted() {
			bldprs = new bldPressDevice.BldPressBTDevice();
			bldprs.close();
			bldprs.init();
			// 赋值
			uni.$on('switchUser', () => {
				this.diabetesFollowUpDetails = JSON.parse(JSON.stringify(data.diabetesFollowUpDetails));
				this.sign = JSON.parse(JSON.stringify(data.sign));
				this.lifestyleGuidance = JSON.parse(JSON.stringify(data.lifestyleGuidance));
				this.fzjc = JSON.parse(JSON.stringify(data.fzjc));
				this.mqyy = JSON.parse(JSON.stringify(data.mqyy));
				this.list = JSON.parse(JSON.stringify(data.list));
				this.tzyy = JSON.parse(JSON.stringify(data.tzyy));
				this.zz = JSON.parse(JSON.stringify(data.zz))
			})
			this.file_table_cell = this.file;
			let res = uni.getStorageSync('login_info');
			this.edit = uni.getStorageSync('edit');
			console.log(this.edit);
			let userInfo = uni.getStorageSync('user_info');
			if (JSON.stringify(this.file_table_cell) !== '{}') {
				this.person_id = this.file_table_cell.person_id;
				this.follow_id = this.file_table_cell.follow_id;
			} else {
				if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
					if (userInfo !== '') {
						this.F_UserId = userInfo[0].doctor_id;
					}
					if (this.edit) {
						this.person_id = this.edit.person_id;
						this.follow_id = this.edit.follow_id;
						// console.log(this.follow_id);
					} else {
						if (res !== '') {
							this.person_id = res[0].id;
						}
					}
					console.log('联网');
				}
			}
			this.handleInit();
			this.handleSearchDiabetesFollow();
			this.camera = common.camera(this.basicSettingsList, this.camera);
			this.start();
			this.handleGetDoctorName();
		},
		destroyed() {
			uni.$off('switchUser');
			bldprs.close();
		},
		computed: {
			...mapState(['basicSettingsList', 'tjsfList']),
			handleMainSignStyle() {
				return function(item) {
					if (item.name == '足背动脉搏动' || item.name == '其他') {
						return 'width:100%;'
					}
				}
			},
			handleMainInput() {
				return function(item) {
					if (item.name == '足背动脉搏动') {
						return 'width: .96rem;'
					}
					if (item.name == '其他') {
						return 'width: 85%;'
					}
				}
			},
			handleShfsStyle() {
				return function(item) {
					if (item.state !== 0) {
						return 'width:1.77rem;'
					}
				}
			},
			handleFzjcStyle() {
				return function(item) {
					if (item.name == '糖化血红蛋白') {
						return 'width:35%;'
					}
					if (item.name == '空腹血糖值') {
						return 'width:65%;'
					}
					if (item.name == '检查日期' || item.name == '其他检查') {
						return 'width:100%;'
					}
				}
			},
			handleMainStyle() {
				return function(item) {
					if (item.state == 0 && item.name !== '药物不良反应' && item.name !== '此次随访分类') {
						return 'width:33.6%;'
					}
					if (item.name == '药物不良反应' || item.name == '此次随访分类') {
						return 'width:33.6%;margin-left:-12rpx;'
					}
					if (item.state == 1) {
						return 'width:100%;'
					}
				}
			},
			handleMainSelectStyle() {
				return function(item) {
					if (item.name == '下一步管理措施') {
						return 'position: absolute;left:2.58rem;'
					}
					if (item.name == '胰岛素用法' || item.name == '胰岛素用量') {
						return 'position: absolute;left:2.58rem;'
					}
				}
			},
			handleZzMainStyle() {
				return function(item) {
					if (item.name == '居民签名' || item.name == '备注') {
						return 'width:100%;'
					}
				}
			},
			handleZzInputStyle() {
				return function(item) {
					if (item.name == '备注') {
						return 'width:7rem;'
					}
				}
			},
			sfInit() {
				return JSON.parse(JSON.stringify(this.diabetesFollowUpDetails[0].list));
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
				if (res !== '' && this.edit == '') {
					for (let item of this.zz) {
						if (item.name == '随访医生签名') {
							item.model = res[0].doctor_name;
						}
					}
				}
			},
			handleTzzs() {
				console.log(22);
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
				for (let item of this.diabetesFollowUpDetails[0].list) {
					if (item.name == '随访日期') {
						for (let jtem of this.basicSettingsList) {
							if (jtem.name == '默认下次随访日期天数') {
								for (let ctem of this.zz) {
									if (ctem.name == '下次随访日期') {
										let time = new Date().setDate(new Date(item.model).getDate() + Number(jtem.value))
										ctem.model = common.formatTime(new Date(time))
									}
								}
							}
						}
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
								for (let item of that.sign) {
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
			checkboxChange(e) {
				for (let item of this.diabetesFollowUpDetails[1].checkbox) {
					if (e.name == '无症状' && e.value && item.name !== '无症状') {
						item.checked = false;
					}
					if (e.name !== '无症状' && item.name == '无症状') {
						item.checked = false;
					}
				}
			},
			handleSlectClick(item) {
				console.log(item);
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
						create_time: util.getFtSystemTime()
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
				this.mqyy.push(item);
				this.isListDiabetesMedications = false;
				this.diabetesSearchBar = false;
				this.isAddListDiabetesMedications = false;
			},
			handleTapSelectItemTzyy(item) {
				console.log(item);
				console.log(222);
				this.tzyy[0].items.push(item);
				this.isAdjustMedicationAdvice = false;
				this.tzyySearchBar = false;
				this.isAddAdjustMedicationAdvice = false;
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
			// 点击添加按钮 添加用药
			handleTapAddDrugs(item) {
				console.log(item);
				this.item = item;
				if (item == '目前用药情况') {
					this.isListDiabetesMedications = false;
					this.diabetesSearchBar = false;
					setTimeout(() => {
						this.isAddListDiabetesMedications = true;
					}, 450)
				} else {
					this.isAdjustMedicationAdvice = false;
					this.tzyySearchBar = false;
					setTimeout(() => {
						this.isAddAdjustMedicationAdvice = true;
					}, 450)
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
				if (item == '空腹血糖值') {
					this.isFastingBloodGlucoseTestList = true;
				}
				if (item == '目前用药情况') {
					this.isListDiabetesMedications = true;
					this.diabetesSearchBar = true;
					this.handleSearchDrugUsageListYy();
				}
				if (item == '调整用药意见') {
					this.isAdjustMedicationAdvice = true;
					this.tzyySearchBar = true;
					this.handleSearchDrugAbjustList();

				}
			},
			// 关闭用药列表弹出层
			handleCloseDrugPopup(item) {
				console.log(item);
				if (item == '目前用药情况') {
					this.isListDiabetesMedications = false;
					this.diabetesSearchBar = false;
					this.pagination.page = '1';
					console.log(2);
				} else {
					this.isAdjustMedicationAdvice = false;
					this.tzyySearchBar = false;
				}
			},
			// 关闭添加用药 弹出层
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
					for (let item of this.adjustMedicationAdviceForm) {
						item.value = '';
					}
				}
			},
			// checkbox
			checkboxGroupChange(e) {
				console.log(e);
			},
			// canvas 画板显示
			handleAutograph(item) {
				console.log(111);
				this.item = item;
				this.isCanvas = true;
			},
			// picker @confirm 事件
			handlePicker(e) {
				let _item = this.data;
				if (_item == '随访日期') {
					for (let item of this.diabetesFollowUpDetails[0].list) {
						if (item.name == _item) {
							item.model = e.year + '-' + e.month + '-' + e.day;
						}
					}
				}
				if (_item == '下次随访日期') {
					for (let item of this.zz) {
						if (item.name == _item) {
							item.model = e.year + '-' + e.month + '-' + e.day;
						}
					}
				}
			},
			// u-select @confirm 事件
			handleSelect(e) {
				let _item = this.data;
				for (let item of this.diabetesFollowUpDetails[0].list) {
					if (item.name == _item) {
						item.model = e[0].label
					}
				}
				for (let item of this.sign) {
					if (item.name == _item) {
						item.one = e[0].label
					}
				}
				for (let item of this.lifestyleGuidance) {
					if (item.name == _item) {
						item.one = e[0].label
					}
				}
				for (let item of this.list) {
					if (item.name == _item) {
						item.model = e[0].label
					}
				}
				for (let item of this.zz) {
					if (item.name == _item) {
						item.model = e[0].label
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
			// select输入框点击事件
			handleTapInputItem(item) {
				console.log(item);
				this.data = item;
				this.selectorIsShow = true;
				switch (item) {
					case "随访日期":
					case "下次随访日期":
						this.isTime = true;
						this.selectorIsShow = false;
						break;
					case "随访方式":
						this.selectList = common.followUpMode;
						console.log(this.selectList);
						console.log(common.followUpMode);
						break;
					case "足背动脉搏动":
						this.selectList = data.dorsalisPedisArteryPulsation;
						break;
					case "心理调整":
					case "遵医行为":
						this.selectList = common.behavior;
						break;
					case "服药依从性":
						this.selectList = data.medicationCompliance;
						break;
					case "药物不良反应":
						this.selectList = data.adverseDrugReactions;
						break;
					case "低血糖反应":
						this.selectList = data.hypoglycemicReaction;
						break;
					case "此次随访分类":
						this.selectList = data.ccsffl;
						break;
					case "下一步管理措施":
						this.selectList = data.nextStepManagementMeasures;
						break;
					case "结果":
						this.selectList = data.result;
						break;
				}
			},
			// 上传图片到服务器
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
								url: 'http://mediasvr.ajylive.cn:8080/batch/upload',
								filePath: path,
								name: 'file',
								formData: {
									'userid': 'ce-shi'
								},
								success: uploadFileRes => {
									let obj = JSON.parse(uploadFileRes.data);
									this.isCanvas = false;
									if (this.item == '随访医生签名') {
										this.person_sign = obj.result;
									}
									if (this.item == '居民签名') {
										this.family_sign = obj.result;
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
			// 添加用药列表
			handleAddItem(item) {
				if (item == 'mqyy') {
					this.mqyy.push({
						drug_name: '',
						day_count: '',
						every_time_dosage: '',
						unit: '',
						icon: '\ue718',
						medicId: ''
					})
				}
				if (item == 'tzyy') {
					this.tzyy[0].items.push({
						drug_name: '',
						day_count: '',
						every_time_dosage: '',
						unit: '',
						icon: '\ue718',
						medicId: ''
					})
				}
			},
			// 删除用药列表
			handleDelItem(type, index, item) {
				console.log(item);
				if (type == 'mqyy') {
					if (item.id) {
						this.$lz.showCancel('', '是否要删除?').then(res => {
							this.$u.post('DelDrug', {
								id: item.id,
								follow_id: this.follow_id
							}).then(res => {
								console.log(res);
								if (res.code == 200 && res.info == '响应成功') {
									this.mqyy.splice(index, 1);
								}
								this.$lz.toast(res.info);
							}).catch(err => {
								this.$lz.toast(err.errMsg);
							})
						})
					} else {
						this.mqyy.splice(index, 1)
					}
				}
				if (type == 'tzyy') {
					console.log(item);
					if (item.id) {
						this.$lz.showCancel('', '是否要删除?').then(res => {
							this.$u.post('DelTzDrug', {
								id: item.id,
								follow_id: this.follow_id
							}).then(res => {
								console.log(res);
								if (res.code == 200 && res.info == '响应成功') {
									this.tzyy[0].items.splice(index, 1);
								}
								this.$lz.toast(res.info);
							}).catch(err => {
								this.$lz.toast(err.errMsg);
							})
						})
					} else {
						this.tzyy[0].items.splice(index, 1);
					}
				}
			},
			// 发起网络请求 保存糖尿病随访信息
			handleSubmitBtn() {
				let params = {
					data: {}
				}
				let info = {
					follow_id: this.follow_id,
					person_id: this.person_id,
					list: []
				}
				for (let a of this.diabetesFollowUpDetails[0].list) {
					info[a.key] = a.model
				}
				for (let b of this.diabetesFollowUpDetails[1].checkbox) {
					if (b.checked) {
						info.list.push({
							symptom: b.name
						})
					}
				}
				params.data.info = info;
				let tz = {}
				for (let a of this.sign) {
					tz[a.keyone] = a.one;
					if (a.keytwo) {
						tz[a.keytwo] = a.two;
					}
				}
				params.data.tz = tz;
				let shfszd = {}
				for (let a of this.lifestyleGuidance) {
					shfszd[a.keyone] = a.one
					if (a.keytwo) {
						shfszd[a.keytwo] = a.two;
					}
				}
				params.data.shfszd = shfszd;

				let fzjc = {}
				for (let a of this.fzjc) {
					fzjc[a.key] = a.model
				}
				params.data.fzjc = fzjc;
				let drug = [];
				for (let a of this.mqyy) {
					drug.push({
						person_id: this.person_id,
						follow_id: this.id,
						follow_type: 'tnbsf',
						drug_name: a.drug_name,
						day_count: a.day_count,
						every_time_dosage: a.every_time_dosage,
						unit: a.unit,
						create_time: util.getFtSystemTime(),
						usage: '',
						medicId: '',
						id: this.$lz.formatId()
					})
				}
				params.data.drug = drug;
				let yds = {}
				for (let a of this.list) {
					yds[a.key] = a.model
				}
				params.data.yds = yds;
				let tiaozheng = {
					insulin_type1: this.tzyy[1].list[0].model,
					insulin_usage1: this.tzyy[1].list[1].model,
					list: []
				}
				for (let a of this.tzyy[0].items) {
					tiaozheng.list.push({
						id: this.$lz.formatId(),
						person_id: this.person_id,
						follow_id: this.id,
						follow_type: 'tnbsf',
						medication_type: 'tnbsf',
						drug_name: a.drug_name,
						day_count: a.day_count,
						every_time_dosage: a.every_time_dosage,
						unit: a.unit,
						create_time: util.getFtSystemTime(),
						company: '',
						is_take_institution: '',
						medicId: ''
					})
				}
				params.data.tiaozheng = tiaozheng;
				let zz = {
					follow_doctor_sign: this.person_sign,
					person_sign: this.family_sign,
					upload_status: '0'
				}
				for (let a of this.zz) {
					zz[a.key] = a.model
				}
				params.data.zz = zz;
				for (let item of this.diabetesFollowUpDetails) {
					for (let jtem of this.zz) {
						if (item.required && item.mdoel == '' || jtem.isRequired && jtem.model == '') {
							return this.$lz.toast('必填项不能为空');
						}
					}
				}
				// 联网
				if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
					this.$u.post('SaveDiabetesFollow', params).then(res => {
						console.log(res);
						if (res.code == 200 && res.info == '响应成功') {
							this.$lz.toast(res.info);
							this.follow_id = res.data[0].follow_id;
							this.mqyy = res.data[0].drug;
							this.tzyy[0].items = res.data[0].tiaozheng;
						} else {
							this.$lz.toast('保存失败:' + JSON.stringify(res.info));
						}
					}).catch(err => {
						this.$lz.toast('保存失败:' + JSON.stringify(err.errMsg));
					})
				}
				// 离线
				
			},
			// 发起网络请求 查询糖尿病随访信息
			handleSearchDiabetesFollow() {
				// 有网
				if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
					this.$u.post('SearchDiabetesFollow', {
						follow_id: this.follow_id
					}).then(res => {
						this.searchDiabetesFollow(res);
					}).catch(err => {
						this.$lz.toast(err.errMsg);
					})
				}
				// 离线
				
			},
			// 发起网络请求 查询糖尿病随访信息
			searchDiabetesFollow(res) {
				console.log(res);
				if (res.code == 200 && res.info == '响应成功' && JSON.stringify(res.data) !== '[]') {
					let data = res.data[0];
					for (let a of this.diabetesFollowUpDetails[0].list) {
						a.model = data[a.key]
					}
					let symptom = data.symptom.split(',');
					for (let a of this.diabetesFollowUpDetails[1].checkbox) {
						for (let b of symptom) {
							if (a.name == b) {
								a.checked = true;
							}
						}
					}
					for (let a of this.sign) {
						a.one = data[a.keyone];
						a.two = data[a.keytwo];
					}
					for (let a of this.lifestyleGuidance) {
						a.one = data[a.keyone];
						a.two = data[a.keytwo];
					}
					for (let a of this.fzjc) {
						a.model = data[a.key];
					}
					let drug = [];
					for (let a of data.drug) {
						drug.push({
							drug_name: a.drug_name,
							every_time_dosage: a.every_time_dosage,
							day_count: a.day_count,
							unit: a.unit,
							icon: '\ue718',
							id: a.id
						})
						this.mqyy = drug;
					}
					for (let a of this.list) {
						a.model = data[a.key]
					}
					let tiaozheng = []
					for (let a of data.tiaozheng) {
						tiaozheng.push({
							drug_name: a.drug_name,
							day_count: a.day_count,
							every_time_dosage: a.every_time_dosage,
							unit: a.unit,
							icon: '\ue718',
							id: a.id
						})
						this.tzyy[0].items = tiaozheng;
					}
					for (let a of this.tzyy[1].list) {
						a.model = data[a.key]
					}
					for (let a of this.zz) {
						a.model = data[a.key]
					}
				}
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
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;

				.content {
					width: 96%;
					padding: .15rem;
					background-color: #fff;
					border-radius: 18rpx;
					display: flex;
					flex-wrap: wrap;
					margin-bottom: .1rem;

					.main {
						display: flex;
						align-items: center;
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
							width: 1.4rem;
							margin-left: .1rem;
						}

						.select {
							color: #ccc;
							position: absolute;
							right: .18rem;
						}

						.required-icon {
							color: #f00;
						}
					}

					.checkbox {
						width: 100%;
						display: flex;
						margin-top: .2rem;

						.name {
							width: 1rem;
							text-align: right;
							display: block;
							margin-top: 6rpx;
							flex-shrink: 0;
						}

						.u-checkbox-group {
							margin-left: .11rem;

							.u-checkbox-name {
								font-size: .12rem;
							}
						}
					}
				}

				//  体征
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
								flex-shrink: 0;
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
				.shfszd-content {
					width: 96%;
					padding: .15rem 0rem;
					background-color: #fff;
					border-radius: 18rpx;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					padding: .15rem;
					margin-bottom: .1rem;

					.title {
						width: 100%;
						display: block;
					}

					.main {
						display: flex;
						align-items: center;
						width: 50%;
						margin-top: .1rem;
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
							width: .7rem;
							margin-left: .1rem;
						}

						.txt {
							margin-left: .1rem;
						}

						.company {
							margin-left: .1rem;
						}

						.select {
							position: absolute;
							color: #ccc;
							right: 1.25rem;
						}
					}
				}

				// 辅助检查
				.fzjc-content {
					width: 96%;
					padding: .15rem 0rem;
					background-color: #fff;
					border-radius: 18rpx;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					padding: .15rem;
					margin-bottom: .1rem;

					.title {
						width: 100%;
						display: block;
					}

					.main {
						display: flex;
						align-items: center;
						width: 50%;
						margin-top: .1rem;

						.name {
							width: 1rem;
							text-align: right;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 1.77rem;
							margin-left: .1rem;
						}

						.right {
							display: flex;

							.company {
								padding-left: .1rem;
							}

							.icon {
								background-color: #33ccff;
								padding: 0 5rpx;
								border-radius: 8rpx;
								margin-left: 10rpx;
							}

							.status {
								margin-left: .2rem;
							}
						}
					}
				}

				// 目前用药情况
				.mqyy-content {
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
				}

				// main
				.main-content {
					width: 96%;
					padding: .15rem 0rem;
					background-color: #fff;
					border-radius: 18rpx;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					padding: .15rem;
					margin-bottom: .1rem;

					.main {
						display: flex;
						align-items: center;
						// width: 100%;
						margin-top: .1rem;
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
							width: 1.56rem;
							margin-left: .1rem;

						}

						.select {
							position: absolute;
							color: #ccc;
							right: .1rem;
						}
					}
				}

				// 调整用药意见
				.tzyy-content {
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

					.input-box {
						display: flex;
						align-items: center;
						margin-top: .1rem;

						// width: 50%;
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
					}
				}

				// 转诊
				.zz-content {
					width: 96%;
					padding: .15rem 0rem;
					background-color: #fff;
					border-radius: 18rpx;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					padding: .15rem;
					margin-bottom: .1rem;

					.title {
						width: 100%;
						display: block;
					}

					.main {
						display: flex;
						align-items: center;
						width: 50%;
						margin-top: .1rem;
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
							width: 1.56rem;
							margin-left: .1rem;
						}

						.select {
							color: #ccc;
							position: absolute;
							right: 1.5rem;
						}

						.required-icon {
							color: #f00;
						}

						.autograph {
							margin-left: .1rem;
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
