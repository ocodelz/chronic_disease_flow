<template>
	<view class="wrap">
		<scroll-view scroll-y class="scroll">
			<free-title title="高血压首诊详细信息" isRight :camera="camera"></free-title>
			<!-- 首诊日期 & 既往史-->
			<view class="container">
				<view class="content">
					<view class="main" v-for="(item,index) in firstDiagnosisOfHypertension" :key="index">
						<view class="input-box" v-if="item.name == '首诊日期'">
							<text class="name">{{item.name}}</text>
							<input v-model="item.model" :type="item.type" :placeholder="item.placeholder"
								:disabled="item.disabled"
								@click="item.type == 'select' ? handleTapInput(item.name) : ''" />
							<text class="iconfont icon-select">&#xe65a;</text>
							<text class="iconfont icon-required">&#xe635;</text>
						</view>
						<view class="checkbox-wrap">
							<text class="title">{{item.title}}</text>
							<u-checkbox-group @change="checkboxGroupChange" style="margin-left: .1rem;">
								<u-checkbox v-model="ctem.checked" v-for="(ctem, cndex) in item.checkbox" :key="cndex"
									:name="ctem.name" @change="checkboxChange($event,item.title,index)">{{ctem.name}}
								</u-checkbox>
							</u-checkbox-group>
						</view>
					</view>
				</view>
			</view>
			<!-- 体格检查 -->
			<view class="tg-container">
				<view class="tg-content">
					<text class="title">体格检查</text>
					<view v-for="(item,index) in physicalExamination" :key="index" class="tg-main">
						<view class="tg-name">{{item.name}}</view>
						<input :type="item.type" v-model="item.model" :class="item.name !== '血压' ? 'input' : 'input1'"
							:adjust-position="false">
						<view v-if="item.name == '血压'" class="input-right">
							<text class="txt">/</text>
							<input class="input1" :type="item.type" v-model="item.mode1" :adjust-position="false">
						</view>
						<view :class="item.name !== '体重' ? 'company' :'company1'">{{item.company}}</view>
						<view class="icon" @click="handleViewDetails(item.name)">{{item.icon}}</view>
						<view class="connectionStatus">{{item.connectionStatus}}</view>
					</view>
				</view>
			</view>
			<!-- 吸烟 -->
			<view class="xy-container">
				<view class="xy-content">
					<text class="title">吸烟</text>
					<view v-for="(item,index) in smoke" :key="index" class="xy-main">
						<view class="xy-name">{{item.name}}</view>
						<input :type="item.type" v-model="item.model" class="input" :adjust-position="false"
							:placeholder="item.placeholder" :disabled="item.disabled"
							@click="item.type == 'select' ? handleTapInput(item.name) : ''">
						<text class="iconfont icon-select">&#xe65a;</text>
					</view>
				</view>
			</view>
			<!-- 辅助检查 -->
			<view class="fzjc-container">
				<view class="fzjc-content">
					<text class="title">辅助检查</text>
					<view class="checkbox-wrap">
						<text class="ctitle">辅助检查</text>
						<u-checkbox-group @change="checkboxGroupChange" style="margin-left: .1rem;">
							<u-checkbox v-model="item.checked" v-for="(item, index) in supplementaryExamination"
								:key="index" :name="item.name" @change="checkboxChange($event,'fzjc',index)">
								{{item.name}}
							</u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
			</view>
			<!-- 目前用药 -->
			<view class="mqyy-container">
				<view class="mqyy-content">
					<view class="title">
						<text class="left">目前用药</text>
						<view class="right" @click="handleViewDetails('目前用药')">...</view>
					</view>
					<view class="mqyy-main" v-for="(item,index) in mqyy" :key="index">
						<view class="top" v-if="item.name">
							<text class="mqyy-name">{{item.name}}</text>
							<input :type="item.type" v-model="item.model" class="input" :adjust-position="false"
								:placeholder="item.placeholder" :disabled="item.disabled"
								@click="item.type == 'select' ? handleTapInput(item.name) : ''">
							<text class="iconfont icon-select">&#xe65a;</text>
						</view>
						<view class="item" v-if="!item.name">
							<view class="item1">药名</view>
							<view class="item2">单次剂量</view>
							<view class="item3">单位</view>
							<view class="item4">用药频次</view>
							<view class="item5">用法</view>
							<view class="iconfont add" @click="handleAdd">&#xe608;</view>
						</view>
						<view v-for="(jtem,jndex) in item.items" :key="jndex" class="bottom">
							<input type="text" class="input" v-model="jtem.drug_name" :adjust-position="false">
							<input type="text" class="input1" v-model="jtem.every_time_dosage" autocomplete="off"
								:adjust-position="false">
							<input type="text" class="input1" v-model="jtem.unit" :adjust-position="false">
							<input type="text" class="input" v-model="jtem.day_count" :adjust-position="false">
							<input type="text" class="input" v-model="jtem.usage" :adjust-position="false">
							<view class="del" @click="handleDelItem(jndex,jtem)">
								<text class="iconfont">&#xe718;</text>
							</view>
						</view>
					</view>
				</view>.
			</view>
			<!-- 药物治疗 -->
			<view class="ywzl-container">
				<view class="ywzl-content">
					<view class="title">
						<text class="left">药物治疗</text>
						<view class="right" @click="handleViewDetails('药物治疗')">...</view>
					</view>
					<view class="ywzl-main">
						<view class="item" v-if="!item.name">
							<view class="item1">药名</view>
							<view class="item2">单次剂量</view>
							<view class="item3">单位</view>
							<view class="item4">用药频次</view>
							<view class="item5">用法</view>
							<view class="item6">是否在本机构取药</view>
							<view class="iconfont add" @click="handleAddywzl">&#xe608;</view>
						</view>
						<view style="display: flex;justify-content: center;width: 100%;
						margin-left: .2rem;margin-top: .1rem;" v-for="(item,index) in ywzl" :key="index">
							<input type="text" class="input" v-model="item.drug_name" :adjust-position="false">
							<input type="text" class="input1" v-model="item.every_time_dosage" :adjust-position="false">
							<input type="text" class="input1" v-model="item.unit" :adjust-position="false">
							<input type="text" class="input1" v-model="item.day_count" :adjust-position="false">
							<input type="text" class="input" v-model="item.usage" :adjust-position="false">
							<input type="text" class="input" v-model="item.is_take_institution"
								:adjust-position="false">
							<view class="del" @click="handleDelYwzlItem(index,item)">
								<text class="iconfont">&#xe718;</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 诊断 -->
			<view class="fzjc-container">
				<view class="fzjc-content">
					<text class="title">诊断</text>
					<view class="checkbox-wrap">
						<text class="ctitle">诊断</text>
						<u-checkbox-group @change="checkboxGroupChange" style="margin-left: .1rem;flex: 1;">
							<u-checkbox v-model="item.checked" v-for="(item, index) in diagnosis" :key="index"
								:name="item.name">
								<view style="display: flex;align-items: center;">
									<text>{{item.name}}</text>
									<input @click.stop="" v-if="item.name == '其他' && item.checked" :type="item.type"
										v-model="item.model" class="input" :adjust-position="false"
										:placeholder="item.placeholder">
								</view>
							</u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
			</view>
			<!-- 生活方式指导 -->
			<view class="zd-container">
				<view class="zd-content">
					<text class="title">生活方式指导</text>
					<view v-for="(item,index) in lifestyleGuidance" :key="index" class="zd-main">
						<text class="name">{{item.name}}</text>
						<input :type="item.type" v-model="item.model" class="input" :adjust-position="false"
							:placeholder="item.placeholder" :disabled="item.disabled">
					</view>
				</view>
			</view>
			<!-- 转诊 -->
			<view class="zz-container">
				<view class="zz-content">
					<text class="title">转诊</text>
					<view v-for="(item,index) in referral" :key="index" class="zz-main"
						:style="item.name == '是否转诊' ? 'width:100%;' : 'width:50%;'">
						<text class="name">{{item.name}}</text>
						<input :type="item.type" v-model="item.model" class="input" :adjust-position="false"
							:placeholder="item.placeholder" :disabled="item.disabled"
							@click="item.type == 'select' ? handleTapInput(item.name) : ''">
						<text class="iconfont icon-select">&#xe65a;</text>
						<text class="iconfont icon-required" v-if="item.required">&#xe635;</text>
						<view class="iconfont" v-if="item.name == '随访医生签名'" @click="isCanvas = true">&#xe6a4;</view>
						<image v-if="item.name == '随访医生签名' && img!==''" :src="img" style="width: 1rem;height: .3rem;">
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

			<free-table-popup ref="tables" title="用药列表" :isPopup="isCurrentDruguse" :searchBar="currentDruguseSearchBar"
				:tableHead="currentDruguseList[0]" :tableContent="currentDruguseList[1]" :pagination="pagination"
				@click="handleTapAddDrugs('目前用药')" @close="handleCloseDrugPopup('目前用药')" @search="handleTapSearchBtnYy"
				@delItem="handleDelDurgUsageListYy" @editItem="handleTabEditItemYy" @pageJump="handleTapPageJumpBtnYy"
				@previousPage="handlePreviousPageYy" @nextPage="handleNextPageYy" @selectItem="handleTapSelectItemYy">
			</free-table-popup>
			<free-add-drugs :isFreeAddDrug="isFreeAddDrug" :drugForm="currentDruguseForm"
				@close="handleTapCloseAddDrugs('目前用药')" @click="handleAddDrugsSubmitBtn"
				@slectClick="handleTapSelectIcon">
			</free-add-drugs>
			<free-table-popup ref="lz" title="用药列表" :isPopup="isDrugTherapy" :searchBar="drugTherapySearchBar"
				:tableHead="drugTherapyList[0]" :tableContent="drugTherapyList[1]" :pagination="paginationtzyy"
				@click="handleTapAddDrugs('药物治疗')" @close="handleCloseDrugPopup('药物治疗')"
				@search="handleTapSearchBtnTzyy" @delItem="handleDelDurgUsageListTzyy" @editItem="handleTabEditItemTzyy"
				@selectItem="handleTapSelectItemTzyy" @pageJump="handleTapPageJumpBtnTzyy"
				@previousPage="handlePreviousPageTzyy" @nextPage="handleNextPageTzyy">
			</free-table-popup>
			<free-add-drugs :isFreeAddDrug="isDrugTherapyForm" :drugForm="drugTherapyForm" @click="handleSaveDrugAbjust"
				@close="handleTapCloseAddDrugs('药物治疗')" @slectClick="handleTapSelectIcon">
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
	import data from '../../../js/firstDiagnosisOfHypertension.js';
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import canva from "@/components/free-ui/free-canvas/canvas.vue";
	import util from '@/utils/util.js';
	import utils from '@/common/utils.js';
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
				isDrugTherapyForm: false,
				isFreeAddDrug: false,
				currentDruguseSearchBar: false,
				drugTherapySearchBar: false,
				// 设备信息
				equipment: {
					e_name: "BP06D21801040414",
					notice_id: "0000FFF1-0000-1000-8000-00805F9B34FB",
					write_in_id: "0000FFF2-0000-1000-8000-00805F9B34FB",
					service_id: "0000FFF0-0000-1000-8000-00805F9B34FB",
					e_id: "f5aa736f-da98-4f3b-a1da-017336a2b5d2"
				},
				drugTherapyForm: [{
						name: '药物名称：',
						value: '',
						key: 'drug_name'
					},
					{
						name: '用法：',
						value: '',
						select: '\ue65a',
						key: 'usage'
					},
					{
						name: '用药频次：',
						value: '',
						select: '\ue65a',
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
					},
					{
						name: '是否在本机构取药：',
						value: '',
						key: 'is_take_institution'
					}
				],
				currentDruguseForm: [{
						name: '药物名称：',
						value: '',
						key: 'drug_name',
						required: true,
					},
					{
						name: '用法：',
						value: '',
						select: '\ue65a',
						required: true,
						key: 'usage'
					},
					{
						name: '用药频次：',
						value: '',
						select: '\ue65a',
						key: 'day_count',
						required: true
					},
					{
						name: '用量：',
						value: '',
						select: '\ue65a',
						key: 'every_time_dosage',
						required: true,
					},
					{
						name: '单位：',
						value: '',
						select: '\ue65a',
						key: 'unit',
						required: true,
					},
					{
						name: '降压药服药依从性：',
						value: '',
						key: 'hypotensor_compliance',
						required: false
					},
					{
						name: '不依从原因：',
						value: '',
						key: 'non_compliance',
						required: false
					}
				],
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
					[]
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
				currentDruguseList: [
					[{
							th: '名称',
							key: 'drug_name'
						},
						{
							th: '单次剂量',
							key: 'every_time_dosage'
						},
						{
							th: '单位',
							key: 'unit'
						},
						{
							th: '用药频次',
							key: 'day_count'
						},
						{
							th: '用法',
							key: 'usage'
						},
						{
							th: '操作',
							key: 'operation'
						}
					],
					[]
				],
				drugTherapyList: [
					[{
							th: '名称',
							key: 'drug_name'
						},
						{
							th: '单次剂量',
							key: 'every_time_dosage'
						},
						{
							th: '单位',
							key: 'unit'
						},
						{
							th: '用药频次',
							key: 'day_count'
						},
						{
							th: '用法',
							key: 'usage'
						},
						{
							th: '操作',
							key: 'operation'
						}
					],
					[]
				],
				isBloodPressureCheckList: false,
				isStatureCheckingList: false,
				isWeightCheckingList: false,
				isCurrentDruguse: false,
				isDrugTherapy: false,
				dateofBirth: '',
				isTime: false,
				item: '',
				selectorIsShow: false,
				img: '',
				isCanvas: false,
				firstDiagnosisOfHypertension: JSON.parse(JSON.stringify(data.firstDiagnosisOfHypertension)),
				physicalExamination: JSON.parse(JSON.stringify(data.physicalExamination)),
				smoke: JSON.parse(JSON.stringify(data.smoke)),
				supplementaryExamination: JSON.parse(JSON.stringify(data.supplementaryExamination)),
				mqyy: JSON.parse(JSON.stringify(data.mqyy)),
				ywzl: JSON.parse(JSON.stringify(data.ywzl)),
				diagnosis: JSON.parse(JSON.stringify(data.diagnosis)),
				lifestyleGuidance: JSON.parse(JSON.stringify(data.lifestyleGuidance)),
				referral: JSON.parse(JSON.stringify(data.referral)),
				id: '',
				person_id: '',
				selectList: [],
				// 收缩压
				systolicPressure: 0,
				// 舒张压
				diastolicPressure: 0,
				// 心率
				pulse: 0,
				drugName: '',
				drugNametzyy: '',
				pageModel: '',
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
				F_UserId: ''
			}
		},
		mounted() {
			bldprs = new bldPressDevice.BldPressBTDevice();
			bldprs.close();
			bldprs.init();
			uni.$on('switchUser', () => {
				console.info(data)
				this.firstDiagnosisOfHypertension = JSON.parse(JSON.stringify(data.firstDiagnosisOfHypertension))
				this.physicalExamination = JSON.parse(JSON.stringify(data.physicalExamination))
				this.smoke = JSON.parse(JSON.stringify(data.smoke))
				this.supplementaryExamination = JSON.parse(JSON.stringify(data.supplementaryExamination))
				this.mqyy = JSON.parse(JSON.stringify(data.mqyy))
				console.info(this.mqyy)
				this.ywzl = JSON.parse(JSON.stringify(data.ywzl))
				this.diagnosis = JSON.parse(JSON.stringify(data.diagnosis))
				this.lifestyleGuidance = JSON.parse(JSON.stringify(data.lifestyleGuidance))
				this.referral = JSON.parse(JSON.stringify(data.referral))
			});
			let res = uni.getStorageSync('login_info');
			let userInfo = uni.getStorageSync('user_info');
			console.error(userInfo);
			if (userInfo !== '') {
				this.F_UserId = userInfo[0].doctor_id;
			}
			if (res !== '') {
				this.person_id = res[0].id;
			}
			this.handleInit();
			this.handleSearchHypertensionFirst();
			this.camera = utils.camera(this.basicSettingsList, this.camera);
			this.start();
			this.handleGetDoctorName();
		},
		destroyed() {
			uni.$off('switchUser');
			bldprs.close();
		},
		computed: {
			...mapState(['basicSettingsList']),
			szInit() {
				return JSON.parse(JSON.stringify(this.firstDiagnosisOfHypertension));
			}
		},
		watch: {
			szInit: {
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
					for (let item of this.referral) {
						if (item.name == '随访医生签名') {
							item.model = res[0].doctor_name;
						}
					}
				}
			},
			handleInit() {
				for (let item of this.firstDiagnosisOfHypertension) {
					if (item.name == '首诊日期') {
						for (let jtem of this.basicSettingsList) {
							if (jtem.name == '默认下次随访日期天数') {
								for (let ctem of this.referral) {
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
			// 发起网络请求 查询用药列表 (目前用药情况)
			handleSearchDrugUsageListYy() {
				let obj = {
					F_UserId: this.F_UserId,
					drug_name: this.drugName,
					pagination: JSON.stringify(this.pagination)
				}
				this.currentDruguseList[1] = [];
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
						this.currentDruguseList[1] = arr;
						this.$refs.tables.tableContents = this.currentDruguseList[1];
					} else {
						this.$lz.toast('暂无数据~');
						this.pagination.total = res.data.pagenumber;
						this.currentDruguseList[1] = [];
						this.$refs.tables.tableContents = this.currentDruguseList[1];
					}
				}).catch(err => {
					console.log(err);
					this.$lz.toast(err.errMsg);
				})
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
							this.currentDruguseList[1] = [];
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
								for (let item of that.physicalExamination) {
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
				let data = ['无'];
				for (let item of arr) {
					if (data.indexOf(e.name) !== -1 && e.value && (data.indexOf(item.name) == -1)) {
						item.checked = false;
					}
					if ((data.indexOf(e.name) == -1) && (data.indexOf(item.name) !== -1)) {
						item.checked = false;
					}
				}
			},
			checkboxChange(e, title, index) {
				if (title == '既往史') {
					this.checkbox(this.firstDiagnosisOfHypertension[index].checkbox, e)
				}
				if (title == 'fzjc') {
					this.checkbox(this.supplementaryExamination, e)
				}
			},
			// 点击添加按钮 添加用药
			handleTapAddDrugs(item) {
				this.medicId = '';
				if (item == '目前用药') {
					this.isCurrentDruguse = false;
					this.currentDruguseSearchBar = false;
					this.isFreeAddDrug = true;
					for (let item of this.currentDruguseForm) {
						item.value = '';
					}
				} else if (item == '药物治疗') {
					this.isDrugTherapy = false;
					this.drugTherapySearchBar = false;
					this.isDrugTherapyForm = true;
					for (let item of this.drugTherapyForm) {
						item.value = '';
					}
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
				if (item == '目前用药') {
					this.currentDruguseSearchBar = true;
					this.isCurrentDruguse = true;
					this.handleSearchDrugUsageListYy();
				}
				if (item == '药物治疗') {
					this.drugTherapySearchBar = true;
					this.isDrugTherapy = true;
					this.handleSearchDrugAbjustList();
				}
			},
			// 目前用药情况 & 调整用药情况的用药列表弹出层关闭
			handleCloseDrugPopup(item) {
				console.error(item);
				if (item == '目前用药') {
					this.currentDruguseSearchBar = false;
					this.isCurrentDruguse = false;
					this.pagination.page = '1';
				} else {
					this.drugTherapySearchBar = false;
					this.isDrugTherapy = false;
					this.paginationtzyy.page = 1;
				}
			},
			// 目前用药情况 & 调整用药情况的添加用药弹出层关闭
			handleTapCloseAddDrugs(item) {
				if (item == '目前用药') {
					this.isFreeAddDrug = false;
					this.isCurrentDruguse = true;
					this.currentDruguseSearchBar = true;
					this.handleSearchDrugUsageListYy();
					for (let item of this.currentDruguseForm) {
						item.value = '';
					}
				} else {
					this.isDrugTherapyForm = false;
					this.isDrugTherapy = true;
					this.drugTherapySearchBar = true;
				}
			},
			handleTapInput(item) {
				this.item = item;
				this.selectorIsShow = true;
				switch (item) {
					case "目前是否正在吸烟":
						this.selectList = utils.smokeSelect
						break;
					case "您目前是否在服用降压药、降脂(如他汀类)或抗血小板（如阿司匹林)等心血管病相关药物?":
						this.selectList = data.mqyySelect
						break;
					case "是否转诊":
						this.selectList = data.referralSelect
						break;
					case "首诊日期":
					case "下次随访日期":
						this.isTime = true;
						this.selectorIsShow = false;
						break;
				}
			},
			checkboxGroupChange(e) {
				// console.log(JSON.stringify(e));
			},
			handleAdd() {
				if (this.mqyy[1].items.length == 0) {
					this.$set(this.mqyy[1], 'items', []);
				}
				console.info(this.mqyy[1].items);
				this.mqyy[1].items.push({
					drug_name: '',
					every_time_dosage: '',
					unit: '',
					day_count: '',
					usage: '',
					status: 0,
					medicId: ''
				})
				console.log(this.mqyy[1].items);
			},
			handleAddywzl() {
				this.ywzl.push({
					drug_name: '',
					every_time_dosage: '',
					unit: '',
					day_count: '',
					usage: '',
					is_take_institution: '',
					status: 0,
					medicId: ''
				})
			},
			handleDelItem(index, item) {
				console.log(item);
				if (item.status !== 0) {
					this.$lz.showCancel('', '是否要删除?').then(res => {
						this.$u.post('DelDrug', {
							id: item.id,
							follow_id: this.id
						}).then(res => {
							console.log(res);
							if (res.code == 200 && res.info == '响应成功') {
								this.mqyy[1].items.splice(index, 1)
							}
							this.$lz.toast(res.info);
						}).catch(err => {
							// console.log(err);
							this.$lz.toast(err.errMsg);
						})
					})
				} else {
					this.mqyy[1].items.splice(index, 1)
				}
			},
			handleDelYwzlItem(index, item) {
				console.log(item);
				if (item.status !== 0) {
					this.$lz.showCancel('', '是否要删除?').then(res => {
						this.$u.post('DelTzDrug', {
							id: item.id,
							follow_id: this.id
						}).then(res => {
							if (res.code == 200 && res.info == '响应成功') {
								this.ywzl.splice(index, 1)
							}
							this.$lz.toast(res.info);
						}).catch(err => {
							// console.log(err);
							this.$lz.toast(err.errMsg);
						})
					})
				} else {
					this.ywzl.splice(index, 1)
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
									this.img = obj.result;;
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
			handlePicker(e) {
				// this.dateofBirth = e.year + '-' + e.month + '-' + e.day;
				if (this.item == '首诊日期') {
					for (let item of this.firstDiagnosisOfHypertension) {
						if (item.name == this.item) {
							item.model = e.year + '-' + e.month + '-' + e.day;
						}
					}
				}
				if (this.item == '下次随访日期') {
					for (let item of this.referral) {
						if (item.name == this.item) {
							item.model = e.year + '-' + e.month + '-' + e.day;
						}
					}
				}

			},
			handleSelect(e) {
				let _item = this.item;
				for (let jtem of this.smoke) {
					if (_item == jtem.name) {
						jtem.model = e[0].label
					}
				}
				for (let jtem of this.mqyy) {
					if (_item == jtem.name) {
						jtem.model = e[0].label
					}
				}
				for (let jtem of this.referral) {
					if (_item == jtem.name) {
						jtem.model = e[0].label
					}
				}
				for (let jtem of this.currentDruguseForm) {
					if (_item == jtem.name) {
						jtem.value = e[0].label
					}
				}
				for (let jtem of this.drugTherapyForm) {
					if (_item == jtem.name) {
						jtem.value = e[0].label
					}
				}
			},
			// 保存高血压信息
			handleSubmitBtn() {
				let param = {
					data: {}
				}
				let info = {
					id: this.id,
					person_id: this.person_id,
					first_date: this.firstDiagnosisOfHypertension[0].model,
					jws: []
				}
				for (let item of this.firstDiagnosisOfHypertension[1].checkbox) {
					if (item.checked) {
						let obj = {
							history: item.name
						}
						info.jws.push(obj)
					}
				}
				param.data.info = info;

				let tgjc = {};
				for (let item of this.physicalExamination) {
					tgjc[item.key] = item.model;
					if (item.mode1) {
						tgjc[item.keys] = item.mode1;
					}
				}
				param.data.tgjc = tgjc

				let xy = [{
					smoke: this.smoke[0].model
				}]
				param.data.xy = xy

				let fzjc = [];
				for (let item of this.supplementaryExamination) {
					if (item.checked) {
						let obj = {
							fuzhujiancha: item.name
						}
						fzjc.push(obj)
					}
				}
				param.data.fzjc = fzjc

				let mqyy = [{
					is_hypotensor: this.mqyy[0].model,
					list: []
				}]
				for (let item of this.mqyy[1].items) {
					let obj = {
						person_id: this.person_id,
						follow_id: '',
						follow_type: 'gxysz',
						create_time: util.getFtSystemTime(),
						drug_name: item.drug_name,
						every_time_dosage: item.every_time_dosage,
						unit: item.unit,
						day_count: item.day_count,
						usage: item.usage,
						medicId: ''
					}
					mqyy[0].list.push(obj)
				}
				param.data.mqyy = mqyy
				let ywzl = []
				for (let item of this.ywzl) {
					let obj = {
						person_id: this.person_id,
						follow_id: '',
						follow_type: 'gxysz',
						drug_name: item.drug_name,
						every_time_dosage: item.every_time_dosage,
						unit: item.unit,
						day_count: item.day_count,
						usage: item.usage,
						is_take_institution: item.is_take_institution,
						medicId: ''
					}
					ywzl.push(obj)
				}
				param.data.ywzl = ywzl
				let zd = []
				for (let item of this.diagnosis) {
					if (item.checked) {
						let obj = {
							diagnosis: item.name
						}
						zd.push(obj)
					}
				}
				param.data.zd = zd
				let shfszd = [{
					lifestyle: this.lifestyleGuidance[0].model
				}]
				param.data.shfszd = shfszd
				let zz = {
					follow_doctor_sign: this.img
				}
				for (let item of this.referral) {
					zz[item.key] = item.model
				}
				param.data.zz = zz
				console.log(param);
				for (let item of this.firstDiagnosisOfHypertension) {
					for (let jtem of this.referral) {
						if (item.required && item.model == '' || jtem.required && jtem.model == '') {
							return this.$lz.toast('必填项不能为空');
						}
					}
				}
				this.$u.post('SaveHypertensionFirst', param).then(res => {
					console.log(res);
					this.$lz.toast(res.info)
					if (res.code == 200 && JSON.stringify(res.data) !== '[]') {
						let data = res.data[0];
						this.id = data.follow_id;
						if (data.drug.length) {
							this.mqyy[1].items = data.drug;
						}
						if (data.tiaozheng.length) {
							this.ywzl = data.tiaozheng;
						}
					}
				}).catch(err => {
					console.log(err);
				})
			},
			// 高血压首诊查询
			handleSearchHypertensionFirst() {
				let obj = {
					person_id: this.person_id,
					follow_type: 'gxysz'
				}
				this.$u.post('SearchHypertensionFirst', obj).then(res => {
					// console.log(res);
					if (res.code == 200 && JSON.stringify(res.data) !== '[]') {
						let data = res.data[0];
						this.id = data.follow_id;
						this.firstDiagnosisOfHypertension[0].model = data.first_date;
						for (let item of this.firstDiagnosisOfHypertension[1].checkbox) {
							for (let jtem of data.history.split(',')) {
								if (item.name == jtem) {
									item.checked = true;
								}
							}
						}
						for (let item of this.physicalExamination) {
							item.model = data[item.key];
							if (item.model) {
								item.mode1 = data[item.keys];
							}
						}
						this.smoke[0].model = data.smoke;
						for (let item of this.supplementaryExamination) {
							for (let jtem of data.fuzhujiancha.split(',')) {
								if (item.name == jtem) {
									item.checked = true;
								}
							}
						}
						this.mqyy[0].model = data.is_hypotensor;
						let drug = []
						for (let item of data.drug) {
							drug.push({
								drug_name: item.drug_name,
								every_time_dosage: item.every_time_dosage,
								unit: item.unit,
								day_count: item.day_count,
								usage: item.usage,
								icon: '\ue718',
								id: item.id
							})
							this.mqyy[1].items = drug;
						}

						let ywzl = []
						for (let item of data.tiaozheng) {
							ywzl.push({
								drug_name: item.drug_name,
								every_time_dosage: item.every_time_dosage,
								unit: item.unit,
								day_count: item.day_count,
								usage: item.usage,
								is_take_institution: item.is_take_institution,
								icon: '\ue718',
								id: item.id
							})
							this.ywzl = ywzl;
						}
						for (let item of this.diagnosis) {
							for (let jtem of data.diagnosis.split(',')) {
								if (item.name == jtem) {
									item.checked = true;
								}
							}
						}

						this.lifestyleGuidance[0].model = data.lifestyle;
						for (let item of this.referral) {
							item.model = data[item.key];
						}
						this.img = data.follow_doctor_sign;
					}
				}).catch(err => {
					console.log(err);
				})
			},
			handleTapSelectIcon(item) {
				this.item = item;
				this.selectorIsShow = true;
				switch (item) {
					case "用法：":
						this.selectList = utils.usage;
						break;
					case "用药频次：":
						this.selectList = utils.drugUseFrequency;
						break;
					case "用量：":
						this.selectList = utils.dosage;
						break;
					case "单位：":
						this.selectList = utils.unit;
						break;
				}
			},
			// 发起网络请求 添加用药 用药情况 icon
			handleAddDrugsSubmitBtn() {
				for (let item of this.currentDruguseForm) {
					if (item.required && item.value == '') {
						return this.$lz.toast(item.name + '不能为空');
					}
				}
				let param = {},
					data = {
						medicId: this.medicId,
						F_UserId: this.F_UserId,
						create_time: util.getFtSystemTime()
					};
				for (let item of this.currentDruguseForm) {
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
			// 发起网络请求 添加用药 药物治疗 icon
			handleSaveDrugAbjust() {
				for (let item of this.drugTherapyForm) {
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
				for (let item of this.drugTherapyForm) {
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
					this.isDrugTherapyForm = false;
				}).catch(err => {
					this.isDrugTherapyForm = false;
					this.$lz.toast(err.errMsg);
					console.log(err);
				})
			},
			// 发起网络请求 查询用药列表 (药物治疗)
			handleSearchDrugAbjustList() {
				let obj = {
					F_UserId: this.F_UserId,
					drug_name: this.drugName,
					pagination: JSON.stringify(this.paginationtzyy)
				}
				this.drugTherapyList[1] = [];
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
						this.drugTherapyList[1] = arr;
						// console.log(this.adjustMedicationAdviceList[1]);
						this.$refs.lz.tableContents = this.drugTherapyList[1];
						// console.log(this.$refs.lz.tableContents);
					} else {
						this.$lz.toast('暂无数据~');
						this.paginationtzyy.total = res.data.pagenumber;
						this.drugTherapyList[1] = [];
						this.$refs.lz.tableContents = this.drugTherapyList[1];
					}
				}).catch(err => {
					console.log(err);
					this.$lz.toast(err.errMsg);
				})
			},
			// 发起网络请求 查询用药列表 药名搜索 (目前用药情况)
			handleTapSearchBtnYy(item) {
				this.drugName = item;
				this.currentDruguseList[1] = [];
				this.pagination.page = 1;
				this.handleSearchDrugUsageListYy();
			},
			// 发起网络请求 查询用药列表 药名搜索 (药物治疗)
			handleTapSearchBtnTzyy(item) {
				console.log(item);
				this.drugName = item;
				this.drugTherapyList[1] = [];
				this.paginationtzyy.page = 1;
				this.handleSearchDrugAbjustList();
			},
			// 发起网络请求 删除用药列表 (药物治疗)
			handleDelDurgUsageListTzyy(item, index) {
				console.log(item);
				this.$lz.showCancel('', '是否要删除?').then(res => {
					this.$u.post('DelDrugAbjustList', {
						medicId: item.medicId
					}).then(res => {
						console.log(res);
						if (res.code == 200 && res.info == '响应成功' && res.data) {
							this.$lz.toast(res.info);
							this.drugTherapyList[1] = [];
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
			// 发起网络请求 查询用药调整信息
			handleTabEditItemTzyy(item) {
				this.medicId = item.medicId;
				this.$u.post('SearchDrugAbjust', {
					medicId: this.medicId
				}).then(res => {
					if (res.code == 200 && res.info == '响应成功') {
						let data = res.data[0];
						this.isDrugTherapy = false;
						this.isDrugTherapyForm = true;
						for (let item of this.drugTherapyForm) {
							item.value = data[item.key];
						}
					}
				}).catch(err => {
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
						this.isCurrentDruguse = false;
						this.isFreeAddDrug = true;
						for (let item of this.currentDruguseForm) {
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
				this.mqyy[1].items.push(item)
				this.isCurrentDruguse = false;
				this.currentDruguseSearchBar = false;
				this.isFreeAddDrug = false;
			},
			handleTapSelectItemTzyy(item) {
				console.log(item);
				this.ywzl.push(item);
				this.isDrugTherapy = false;
				this.drugTherapySearchBar = false;
				this.isDrugTherapyForm = false;
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

			// 首诊日期 & 既往史
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

					.main {
						.input-box {
							display: flex;
							align-items: center;

							.name {
								width: .8rem;
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
								left: 2.7rem;
							}

							.icon-required {
								color: #f00;
							}
						}

						.checkbox-wrap {
							display: flex;
							margin-top: .1rem;

							.title {
								width: 1rem;
								text-align: right;
								font-size: .12rem;
								margin-left: .38rem;
							}
						}
					}
				}
			}

			// 体格检查
			.tg-container {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: .1rem;

				.tg-content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					flex-wrap: wrap;

					.title {
						display: block;
						width: 100%;
					}

					.tg-main {
						width: 50%;
						display: flex;
						align-items: center;
						margin-top: .1rem;

						.tg-name {
							width: .8rem;
							text-align: right;
							font-size: .12rem;
						}

						.input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 1.2rem;
							margin-left: .1rem;
						}

						.input-right {
							display: flex;
							align-items: center;

							.txt {
								margin-left: .1rem;
								font-size: .1rem;
							}
						}

						.input1 {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: .42rem;
							margin-left: .1rem;
						}

						.company {
							width: .5rem;
							font-size: .1rem;
							padding-left: .1rem;
						}

						.company1 {
							font-size: .1rem;
							padding-left: .1rem;
						}

						.icon {
							padding: 0 5rpx 0 5rpx;
							background-color: #007AFF;
							border-radius: 8rpx;
							// width: .1rem;
						}

						.connectionStatus {
							font-size: .1rem;
							padding-left: .1rem;
						}
					}
				}
			}

			// 吸烟
			.xy-container {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: .1rem;

				.xy-content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					flex-wrap: wrap;

					.title {
						display: block;
						width: 100%;
					}

					.xy-main {
						display: flex;
						align-items: center;

						.xy-name {
							width: 1.2rem;
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
							left: 3.1rem;
						}
					}
				}
			}

			// 辅助检查 & 诊断
			.fzjc-container {
				width: 100%;
				display: flex;
				justify-content: center;
				margin-bottom: .1rem;

				.fzjc-content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					flex-wrap: wrap;

					.title {
						display: block;
						width: 100%;
					}

					.checkbox-wrap {
						display: flex;
						margin-top: .1rem;

						.ctitle {
							width: 1.2rem;
							text-align: right;
							margin-top: 7rpx;
						}
					}
				}

				.input {
					border: 1rpx solid #e3e3e3;
					border-radius: 8rpx;
					font-size: .12rem;
					padding: 10rpx 0 10rpx 20rpx;
					width: 1.6rem;
				}
			}

			// 目前用药
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
					flex-wrap: wrap;

					.title {
						display: flex;
						align-items: center;
						width: 100%;

						.right {
							padding: 0 10rpx 0 10rpx;
							background-color: #007AFF;
							border-radius: 8rpx;
							margin-left: .2rem;
						}
					}

					.mqyy-main {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						width: 100%;

						.top {
							display: flex;
							align-items: center;
							justify-content: center;
							flex: 1;
							margin-top: .1rem;

							.mqyy-name {
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
								right: 1.35rem;
							}
						}

						.item {
							display: flex;
							justify-content: center;
							font-size: .12rem;
							width: 100%;
							margin-top: .3rem;

							.item1 {
								width: 1.5rem;
								padding-left: .1rem;
							}

							.item2 {
								width: .9rem;
								padding-left: .2rem;
							}

							.item3 {
								width: .9rem;
								padding-left: .3rem;
							}

							.item4 {
								width: 1.5rem;
								padding-left: .45rem;
							}

							.item5 {
								width: 1.5rem;
								padding-left: .6rem;
							}

							.add {
								background-color: #007AFF;
								border-radius: 8rpx;
								width: .3rem;
								display: flex;
								align-items: center;
								justify-content: center;
								position: relative;
								left: .55rem;
							}
						}

						.bottom {
							display: flex;
							justify-content: center;
							margin-top: .1rem;
							width: 100%;
							margin-left: .4rem;

							.input {
								border: 1rpx solid #e3e3e3;
								border-radius: 8rpx;
								font-size: .12rem;
								padding: 10rpx 0 10rpx 20rpx;
								width: 1.4rem;
								margin-left: .1rem;
								position: relative;
							}

							.input1 {
								border: 1rpx solid #e3e3e3;
								border-radius: 8rpx;
								font-size: .12rem;
								padding: 10rpx 0 10rpx 20rpx;
								width: .8rem;
								margin-left: .1rem;
								position: relative;
							}

							.del {
								width: .3rem;
								border-radius: 8rpx;
								border: 1rpx solid #f0f0f0;
								display: flex;
								align-items: center;
								justify-content: center;
								margin-left: .1rem;
							}
						}
					}
				}
			}

			// 药物治疗
			.ywzl-container {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: .1rem;

				.ywzl-content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					flex-wrap: wrap;

					.title {
						display: flex;
						align-items: center;
						width: 100%;

						.right {
							padding: 0 10rpx 0 10rpx;
							background-color: #007AFF;
							border-radius: 8rpx;
							margin-left: .2rem;
						}
					}

					.ywzl-main {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						width: 100%;

						.item {
							display: flex;
							justify-content: center;
							font-size: .12rem;
							width: 100%;
							margin-top: .3rem;

							.item1 {
								width: 1.1rem;
								padding-left: .4rem;
							}

							.item2 {
								width: 1rem;
								position: relative;
								left: .5rem;
							}

							.item3 {
								width: .9rem;
								position: relative;
								left: .52rem;
							}

							.item4 {
								width: 1.1rem;
								position: relative;
								left: .65rem;
							}

							.item5 {
								width: 1.1rem;
								position: relative;
								left: .56rem;
							}

							.item6 {
								margin-left: .7rem;
							}

							.add {
								background-color: #007AFF;
								border-radius: 8rpx;
								width: .3rem;
								display: flex;
								align-items: center;
								justify-content: center;
								position: relative;
								margin-left: .15rem;
							}
						}

						.input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 1rem;
							margin-left: .1rem;
							position: relative;
						}

						.input1 {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: .8rem;
							margin-left: .1rem;
							position: relative;
						}

						.del {
							width: .3rem;
							border-radius: 8rpx;
							border: 1rpx solid #f0f0f0;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-left: .1rem;
						}
					}
				}
			}

			// 生活方式指导
			.zd-container {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: .1rem;

				.zd-content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					flex-wrap: wrap;

					.title {
						display: block;
						width: 100%;
					}

					.zd-main {
						display: flex;
						align-items: center;
						width: 100%;

						.name {
							width: 1.4rem;
							text-align: right;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 100%;
							margin-left: .1rem;
							position: relative;
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
					flex-wrap: wrap;

					.title {
						display: block;
						width: 100%;
					}

					.zz-main {
						display: flex;
						align-items: center;

						.name {
							width: 1.2rem;
							text-align: right;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 1.6rem;
							margin-left: .1rem;
							position: relative;
							margin-bottom: .1rem;
							margin-top: .1rem;
						}

						.icon-select {
							color: #ccc;
							position: absolute;
							left: 3.1rem;
						}

						.icon-required {
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
				bottom: .1rem;
				width: 1.1rem;
				height: .3rem;
			}
		}
	}
</style>
