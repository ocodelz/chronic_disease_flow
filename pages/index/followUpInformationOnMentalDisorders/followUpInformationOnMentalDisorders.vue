<template>
	<view class="wrap">
		<scroll-view scroll-y class="scroll">
			<free-title title="严重精神障碍患者随访详细信息" isRight :camera="camera"></free-title>
			<view class="container">
				<view class="content">
					<view class="main" v-for="(item,index) in list" :key="index">
						<text class="name">{{item.name}}</text>
						<input :disabled="item.disabled" :placeholder="item.placeholder" :adjust-position="false"
							v-model="item.model" @click="item.select ? handleTapInput(item.name) : ''">
						<text class="iconfont required">{{item.required}}</text>
						<text class="iconfont select">{{item.select}}</text>
					</view>
				</view>
				<!-- 如死亡，日期及原因 -->
				<view class="content">
					<text class="title">如死亡，日期和原因</text>
					<view class="main" v-for="(item,index) in dateAndCauseOfDeath" :key="index">
						<text class="name">{{item.name}}</text>
						<input :disabled="item.disabled" :placeholder="item.placeholder" :adjust-position="false"
							v-model="item.model" @click="item.select ? handleTapInput(item.name) : ''">
						<text class="iconfont select">{{item.select}}</text>
					</view>
				</view>
				<!-- 目前症状 -->
				<view class="mqzz-content">
					<text class="title">目前症状</text>
					<view class="main" :style="handleMqzzMainStyle(item.name)"
						v-for="(item,index) in theCurrentSymptoms" :key="index">
						<view class="input-box" v-if="!item.checkbox">
							<text class="name">{{item.name}}</text>
							<input :disabled="item.disabled" :placeholder="item.placeholder" :adjust-position="false"
								v-model="item.model" @click="item.select ? handleTapInput(item.name) : ''">
							<text class="iconfont select">{{item.select}}</text>
						</view>
						<view class="check" v-if="item.checkbox">
							<text class="name">{{item.name}}</text>
							<u-checkbox-group class="u-checkbox-group">
								<u-checkbox v-model="ctem.checked" v-for="(ctem, cndex) in item.checkbox" :key="cndex"
									:name="ctem.name">
									<view style="display: flex;align-items: center;">
										<text class="u-checkbox-name">{{ctem.name}}</text>
										<input v-model="ctem.model" :adjust-position="false" @click.stop=""
											v-if="ctem.name == '其他' && ctem.checked"
											style="border: 1rpx solid #e3e3e3;border-radius: 8rpx;font-size: .12rem;padding: 10rpx 0 10rpx 20rpx;width: 1.4rem;margin-left: .1rem;" />
									</view>
								</u-checkbox>
							</u-checkbox-group>
						</view>
					</view>
				</view>
				<!-- 社会功能情况 -->
				<view class="content">
					<text class="title">社会功能情况</text>
					<view class="main" v-for="(item,index) in socialFunction" :key="index">
						<text class="name">{{item.name}}</text>
						<input :disabled="item.disabled" :placeholder="item.placeholder" :adjust-position="false"
							v-model="item.model" @click="item.select ? handleTapInput(item.name) : ''">
						<text class="iconfont select">{{item.select}}</text>
					</view>
				</view>
				<!-- 危险行为 -->
				<view class="wxxw-content">
					<view class="main" v-for="(item,index) in main" :key="index"
						:style="item.checkbox ? 'width:100%;' : 'width:50%;'">
						<view class="main-wxxw-wrap" v-if="item.checkbox">
							<text class="name">{{item.name}}</text>
							<view class="u-checkbox-group-box">
								<u-checkbox-group class="u-checkbox-group" v-for="(ctem, cndex) in item.checkbox"
									:key="cndex" :style="item.name !== '康复措施' ? 'width:50%;' : ''">
									<u-checkbox v-model="ctem.checked" :name="ctem.name">
										<view style="display: flex;align-items: center;">
											<text
												:class="item.name !== '康复措施' ? 'u-checkbox-name' : ''">{{ctem.name}}</text>
											<input v-model="ctem.model" :adjust-position="false" @click.stop=""
												v-if="ctem.name == '其他' && ctem.checked"
												style="border: 1rpx solid #e3e3e3;border-radius: 8rpx;font-size: .12rem;padding: 10rpx 0 10rpx 20rpx;width: 1.4rem;margin-left: .1rem;" />
										</view>
									</u-checkbox>
									<input :adjust-position="false" v-model="ctem.one"
										v-if="ctem.name !== '无' && item.name !== '康复措施'">
									<text class="unit" v-if="ctem.unit">{{ctem.unit}}</text>
								</u-checkbox-group>
							</view>
						</view>
						<view class="input-box" v-if="!item.checkbox">
							<text class="name">{{item.name}}</text>
							<input :adjust-position="false" v-model="item.model" :placeholder="item.placeholder"
								:disabled="item.disabled" @click="item.select ? handleTapInput(item.name) : ''">
							<text class="iconfont select">{{item.select}}</text>
						</view>
					</view>
				</view>
				<!-- 目前用药情况 -->
				<view class="yytz-container">
					<view class="yytz-content">
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
							<view class="add" @click="handleAddCurrentDrug">+</view>
						</view>
						<view v-for="(item,index) in currentMedication" :key="index" class="bottom">
							<input :type="item.type" v-model="item.drug_name" :adjust-position="false">
							<input :type="item.type" v-model="item.day_count" :adjust-position="false">
							<input :type="item.type" v-model="item.every_time_dosage" :adjust-position="false">
							<input :type="item.type" v-model="item.unit" :adjust-position="false">
							<view class="icon iconfont" @click="handleDelCurrentDrug(index,item)">&#xe718;</view>
						</view>
					</view>
				</view>
				<!-- 转诊 -->
				<view class="zz-content">
					<text class="title">转诊</text>
					<view class="main" v-for="(item,index) in referral" :key="index"
						:style="item.name == '处置结果' ? 'width:100%;' : ''">
						<text class="name">{{item.name}}</text>
						<input :disabled="item.disabled" :placeholder="item.placeholder" :adjust-position="false"
							:style="item.name == '处置结果' ? 'width: 100%;' : ''" v-model="item.model"
							@click="item.select ? handleTapInput(item.name) : ''">
						<text class="iconfont select">{{item.select}}</text>
					</view>
				</view>
				<!-- 调整用药情况 -->
				<view class="mqyy-content">
					<view class="head">
						<text class="title">调整用药情况</text>
						<view class="icon" @click="handleViewDetails('调整用药情况')">...</view>
					</view>
					<view class="top">
						<view class="txt">调整用药情况</view>
						<view class="item">药物名称</view>
						<view class="item">每日次数</view>
						<view class="item">每次用量</view>
						<view class="item">单位</view>
						<view class="add" @click="handleAddAdjustMedication">+</view>
					</view>
					<view v-for="(item,index) in adjustMedication[0].items" :key="index" class="bottom"
						style="margin-left: .9rem;width:100%;">
						<input v-model="item.drug_name" :adjust-position="false">
						<input v-model="item.day_count" :adjust-position="false">
						<input v-model="item.every_time_dosage" :adjust-position="false">
						<input v-model="item.unit" :adjust-position="false">
						<view class="icon iconfont" @click="handleDelAdjustMedication(index,item)">&#xe718;</view>

					</view>
					<block v-for="(ctem,cndex) in adjustMedication[1].list" :key="cndex">
						<view class="select">
							<text class="name">{{ctem.name}}</text>
							<input :type="ctem.type" :placeholder="ctem.placeholder" :disabled="ctem.disabled"
								v-model="ctem.model" :adjust-position="false"
								@click="ctem.select ? handleTapInput(ctem.name) : ''">
							<text class="iconfont icon-select">{{ctem.select}}</text>
							<text class="iconfont required">{{ctem.required}}</text>
							<text class="iconfont icon" @click="handleTapCanvasIcon(ctem.name)">{{ctem.icon}}</text>
							<image v-if="ctem.name == '随访医生签名' && followDoctorSign!==''" :src="followDoctorSign"
								style="width: 1rem;height: .3rem;">
							</image>
							<image v-if="ctem.name == '患者家属签名' && personSign!==''" :src="personSign"
								style="width: 1rem;height: .3rem;">
							</image>
						</view>
					</block>
				</view>
			</view>
			<canva v-if="isCanvas" @close="isCanvas = false" @finish="finish"></canva>
			<view class="btn-container">
				<u-button class="btn" type="primary" @click="handleSubmitBtn">保存</u-button>
			</view>
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
	import data from '@/js/followUpInformationOnMentalDisorders.js';
	import canva from "@/components/free-ui/free-canvas/canvas.vue";
	import utils from '@/common/utils.js';
	import util from '@/utils/util.js';
	import freeTablePopup from '@/components/free-ui/free-table-popup/free-table-popup.vue';
	import freeAddDrugs from '@/components/free-ui/free-add-drugs/free-add-drugs.vue';
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
				isAdjustMedicationAdvice: false,
				tzyySearchBar: false,
				isListDiabetesMedications: false,
				diabetesSearchBar: false,
				isAddListDiabetesMedications: false,
				isAddAdjustMedicationAdvice: false,
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
						key: 'every_time_dosage',
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
						key: 'every_time_dosage',
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
				list: JSON.parse(JSON.stringify(data.list)),
				dateAndCauseOfDeath: JSON.parse(JSON.stringify(data.dateAndCauseOfDeath)),
				theCurrentSymptoms: JSON.parse(JSON.stringify(data.theCurrentSymptoms)),
				socialFunction: JSON.parse(JSON.stringify(data.socialFunction)),
				main: JSON.parse(JSON.stringify(data.main)),
				currentMedication: JSON.parse(JSON.stringify(data.currentMedication)),
				referral: JSON.parse(JSON.stringify(data.referral)),
				adjustMedication: JSON.parse(JSON.stringify(data.adjustMedication)),
				isTime: false,
				selectorIsShow: false,
				isCanvas: false,
				followDoctorSign: '',
				personSign: '',
				canvasItem: '',
				selectList: [],
				item: '',
				follow_id: '',
				person_id: '',
				id: '',
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
			// 赋值
			uni.$on('switchUser', () => {
				this.list = JSON.parse(JSON.stringify(data.list));
				this.dateAndCauseOfDeath = JSON.parse(JSON.stringify(data.dateAndCauseOfDeath));
				this.theCurrentSymptoms = JSON.parse(JSON.stringify(data.theCurrentSymptoms));
				this.socialFunction = JSON.parse(JSON.stringify(data.socialFunction));
				this.main = JSON.parse(JSON.stringify(data.main));
				this.currentMedication = JSON.parse(JSON.stringify(data.currentMedication));
				this.referral = JSON.parse(JSON.stringify(data.referral));
				this.adjustMedication = JSON.parse(JSON.stringify(data.adjustMedication))
			})
			let res = uni.getStorageSync('login_info');
			let edit = uni.getStorageSync('edit');
			let userInfo = uni.getStorageSync('user_info');
			console.log(userInfo);
			if (userInfo !== '') {
				this.F_UserId = userInfo[0].doctor_id;
			}
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
			this.handleSearchMentalIllnessFollow();
			this.camera = utils.camera(this.basicSettingsList, this.camera);
			this.handleGetDoctorName();
		},
		destroyed() {
			uni.$off('switchUser');
		},
		computed: {
			...mapState(['basicSettingsList', 'tjsfList']),
			handleMqzzMainStyle() {
				return function(item) {
					if (item == '目前症状') {
						return `width: 100%;`
					}
				}
			},
			sfInit() {
				return JSON.parse(JSON.stringify(this.list));
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
					for (let item of this.adjustMedication[1].list) {
						if (item.name == '随访医生签名') {
							item.model = res[0].doctor_name;
						}
					}
				}
			},
			handleInit() {
				for (let item of this.list) {
					if (item.name == '随访日期') {
						for (let jtem of this.basicSettingsList) {
							if (jtem.name == '默认下次随访日期天数') {
								for (let ctem of this.adjustMedication) {
									if (ctem.list) {
										for (let dtem of ctem.list) {
											if (dtem.name == '下次随访日期') {
												let time = new Date().setDate(new Date(item.model).getDate() + Number(jtem
													.value))
												dtem.model = utils.formatTime(new Date(time))
											}
										}
									}
								}
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
				this.currentMedication.push(item);
				this.isListDiabetesMedications = false;
				this.diabetesSearchBar = false;
				this.isAddListDiabetesMedications = false;
			},
			handleTapSelectItemTzyy(item) {
				console.log(item);
				console.log(222);
				this.adjustMedication[0].items.push(item);
				this.isAdjustMedicationAdvice = false;
				this.tzyySearchBar = false;
				this.isAddAdjustMedicationAdvice = false;
			},
			// ----------------------------------------
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
						create_time: util.getFtSystemTime()
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
			// ----------------------------------------
			// 目前用药情况 添加
			handleAddCurrentDrug() {
				this.currentMedication.push({
					drug_name: '',
					day_count: '',
					every_time_dosage: '',
					unit: '',
					status: 0,
					medicId: ''
				})
			},
			// 目前用药情况 删除
			handleDelCurrentDrug(index, item) {
				console.log(item);
				if (item.status == 0) {
					this.currentMedication.splice(index, 1);
				} else {
					this.$lz.showCancel('', '是否要删除?').then(res => {
						this.$u.post('DelDrug', {
							id: item.id,
							follow_id: item.follow_id
						}).then(res => {
							if (res.code == 200 && res.info == '响应成功') {
								console.log(res);
								this.currentMedication.splice(index, 1);
							}
							this.$lz.toast(res.info);
						}).catch(err => {
							this.$lz.toast(err.errMsg);
						})
					})
				}
			},
			// 调整用药情况 添加
			handleAddAdjustMedication() {
				this.adjustMedication[0].items.push({
					drug_name: '',
					day_count: '',
					every_time_dosage: '',
					unit: '',
					status: 0
				})
			},
			// 调整用药情况 删除
			handleDelAdjustMedication(index, item) {
				let obj = {
					id: item.id,
					follow_id: this.follow_id
				}
				console.log(obj);
				if (item.status == 0) {
					this.adjustMedication[0].items.splice(index, 1);
				} else {
					this.$lz.showCancel('', '是否要删除?').then(res => {
						this.$u.post('DelTzDrug', obj).then(res => {
							if (res.code == 200 && res.info == '响应成功') {
								this.adjustMedication[0].items.splice(index, 1);
							}
							this.$lz.toast(res.info);
						}).catch(err => {
							this.$lz.toast(err.errMsg);
						})
					})
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
			// 分发popup弹出
			handleViewDetails(item) {
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
			// select输入框点击事件
			handleTapInput(item) {
				console.log(item);
				this.item = item;
				this.selectorIsShow = true;
				switch (item) {
					case '随访日期':
					case '死亡日期':
					case '末次出院时间':
					case '下次随访日期':
						this.selectorIsShow = false;
						this.isTime = true;
						break;
					case '本次随访形式':
						this.selectList = data.theFormOfFollowUp;
						break;
					case '失访原因':
						this.selectList = data.reasonsForMissingFollowUp;
						break;
					case '死亡原因':
						this.selectList = data.causeOfDeath;
						break;
					case '危险性评估':
						this.selectList = data.riskAssessment;
						break;
					case '自知力':
						this.selectList = data.insight;
						break;
					case '睡眠情况':
					case '饮食情况':
					case '个人生活料理':
					case '家务劳动':
					case '学习能力':
					case '社会人际交往':
						this.selectList = utils.behavior;
						break;
					case '生产劳动及工作':
						this.selectList = data.productionLaborAndwork;
						break;
					case '两次随访期间关锁情况':
						this.selectList = data.lcsfqjgsqk;
						break;
					case '两次随访期间住院情况':
						this.selectList = data.lcsfqjzyqk;
						break;
					case '实验室检查':
						this.selectList = utils.separateRoom;
						break;
					case '用药依从性':
						this.selectList = data.medicationCompliance;
						break;
					case '药物不良反应':
						this.selectList = data.adverseDrugReactions;
						break;
					case '治疗效果':
						this.selectList = data.treatmentEffect;
						break;
					case '本次随访分类':
						this.selectList = data.classificationOfThisFollowUp;
						break;
					case '通知联系部门':
					case '是否需要转诊':
					case '转诊是否成功':
					case '联系精神专科医师':
						this.selectList = utils.yesOrNo;
						break;
				}
			},
			// picker @confirm 事件
			handlePicker(e) {
				// this.dateofBirth = e.year + '-' + e.month + '-' + e.day;
				for (let item of this.list) {
					if (item.name == this.item) {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
				for (let item of this.dateAndCauseOfDeath) {
					if (item.name == this.item) {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
				for (let item of this.main) {
					if (item.name == this.item) {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
				for (let item of this.adjustMedication[1].list) {
					if (item.name == this.item) {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
			},
			// u-select @confirm 事件
			handleSelect(e) {
				let _item = this.item;
				for (let item of this.list) {
					if (_item == item.name) {
						item.model = e[0].label
					}
				}
				for (let item of this.dateAndCauseOfDeath) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
				for (let item of this.theCurrentSymptoms) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
				for (let item of this.socialFunction) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
				for (let item of this.main) {
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
			// Canvas画板显示
			handleTapCanvasIcon(item) {
				this.isCanvas = true;
				if (item == '随访医生签名') {
					this.canvasItem = '随访医生签名'
				}
				if (item == '患者家属签名') {
					this.canvasItem = '患者家属签名';
				}
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
									if (this.canvasItem == '随访医生签名') {
										this.followDoctorSign = obj.result;
									}
									if (this.canvasItem == '患者家属签名') {
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
			// 发起请求 保存/修改信息
			handleSubmitBtn() {
				for (let item of this.list) {
					for (let jtem of this.adjustMedication[1].list) {
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
					follow_id: this.follow_id,
					person_id: this.person_id
				}
				for (let item of this.list) {
					info[item.key] = item.model;
				}
				param.data.info = info;

				let dead = {}
				for (let item of this.dateAndCauseOfDeath) {
					dead[item.key] = item.model;
				}
				param.data.dead = dead;

				let sysptom = {
					symptom: ''
				}
				let arr = [];
				for (let item of this.theCurrentSymptoms) {
					sysptom[item.key] = item.model;
					if (item.checkbox) {
						for (let ctem of item.checkbox) {
							if (ctem.checked) {
								arr.push(ctem.name);
							}
						}
					}
				}
				// console.log(arr);
				param.data.sysptom = sysptom;
				param.data.sysptom.symptom = arr.join(',');

				let society = {}
				for (let item of this.socialFunction) {
					society[item.key] = item.model;
				}
				param.data.society = society;

				let risk = {
					dangerous_act: '',
					kfcs: ''
				}
				let dangerous_act = [],
					kfcs = [];
				for (let item of this.main) {
					if (item.name == '危险行为') {
						for (let ctem of item.checkbox) {
							risk[ctem.onekey] = ctem.one;
							if (ctem.checked) {
								dangerous_act.push(ctem.name);
							}
						}
					}
					if (item.name == '康复措施') {
						for (let ctem of item.checkbox) {
							risk[ctem.onekey] = ctem.one;
							if (ctem.checked) {
								kfcs.push(ctem.name);
							}
						}
					}
					risk[item.key] = item.model;
				}
				param.data.risk = risk;
				param.data.risk.dangerous_act = dangerous_act.join(',');
				param.data.risk.kfcs = kfcs.join(',');

				let drug = [];
				for (let item of this.currentMedication) {
					let obj = {
						person_id: this.person_id,
						follow_id: '',
						follow_type: 'jsbsf',
						drug_name: item.drug_name,
						day_count: item.day_count,
						every_time_dosage: item.every_time_dosage,
						unit: item.unit,
						create_time: util.getFtSystemTime(),
						usage: '',
						medicId: ''
					}
					drug.push(obj);
				}
				param.data.drug = drug;

				let transfer = {};
				for (let item of this.referral) {
					transfer[item.key] = item.model;
				}
				param.data.transfer = transfer;

				let tiaoZhengDrug = {
					drug: [],
					upload_status: '0',
					follow_doctor_sign: this.followDoctorSign,
					person_sign: this.personSign
				}
				for (let item of this.adjustMedication[0].items) {
					let obj = {
						person_id: this.person_id,
						follow_id: '',
						follow_type: 'jsbsf',
						drug_name: item.drug_name,
						day_count: item.day_count,
						every_time_dosage: item.every_time_dosage,
						unit: item.unit,
						create_time: util.getFtSystemTime(),
						usage: ''
					}
					tiaoZhengDrug.drug.push(obj);
				}
				for (let item of this.adjustMedication) {
					if (item.list) {
						for (let jtem of item.list) {
							tiaoZhengDrug[jtem.key] = jtem.model;
						}
					}
				}
				param.data.tiaoZhengDrug = tiaoZhengDrug;

				this.$u.post('SaveMentalIllnessFollow', param).then(res => {
					console.log(res);
					if (res.code == 200 && JSON.stringify(res.data) !== '[]') {
						this.$lz.toast(res.info);
						let data = res.data[0];
						this.follow_id = data.follow_id;
						this.currentMedication = data.drug;
						this.adjustMedication[0].items = data.tiaozheng;
					}
				}).catch(err => {
					console.log(err);
					this.$lz.toast(err.errMsg);
				})
				console.log(param);
			},
			// 发起请求 查询精神病随访详细信息
			handleSearchMentalIllnessFollow() {
				this.$u.post('SearchMentalIllnessFollow', {
					follow_id: this.follow_id
				}).then(res => {
					// console.log(res);
					if (res.code == 200 && res.info == '响应成功' && JSON.stringify(res.data) !== '[]') {
						let data = res.data[0];
						for (let item of this.list) {
							item.model = data[item.key];
						}
						for (let item of this.dateAndCauseOfDeath) {
							item.model = data[item.key];
						}

						for (let item of this.theCurrentSymptoms) {
							item.model = data[item.key];
							if (item.checkbox) {
								for (let ctem of item.checkbox) {
									for (let jtem of data.symptom.split(',')) {
										if (ctem.name == jtem) {
											ctem.checked = true;
										}
									}
								}
							}
						}

						for (let item of this.socialFunction) {
							item.model = data[item.key];
						}

						for (let item of this.main) {
							item.model = data[item.key];
							if (item.name == '危险行为') {
								for (let ctem of item.checkbox) {
									ctem.one = data[ctem.onekey];
									for (let jtem of data.dangerous_act.split(',')) {
										if (ctem.name == jtem) {
											ctem.checked = true;
										}
									}
								}
							}
							if (item.name == '康复措施') {
								for (let ctem of item.checkbox) {
									for (let jtem of data.kfcs.split(',')) {
										if (ctem.name == jtem) {
											ctem.checked = true;
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
								this.currentMedication = drug;
							}

							for (let item of this.referral) {
								item.model = data[item.key];
							}
							let tiaozheng = [];

							for (let item of data.tiaozheng) {
								tiaozheng.push({
									drug_name: item.drug_name,
									day_count: item.day_count,
									every_time_dosage: item.every_time_dosage,
									unit: item.unit,
									id: item.id
								})
								this.adjustMedication[0].items = tiaozheng;
							}

							for (let item of this.adjustMedication[1].list) {
								item.model = data[item.key];
							}
							this.followDoctorSign = data.follow_doctor_sign;
							this.personSign = data.person_sign;
						}
					}
				}).catch(err => {
					console.log(err);
				})
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
						position: relative;

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
							width: 1.6rem;
							margin-left: .1rem;
						}

						.required {
							color: #f00;
						}

						.select {
							position: absolute;
							color: #e3e3e3;
							right: 1.55rem;
						}
					}
				}

				// 目前症状
				.mqzz-content {
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
						position: relative;

						.input-box {
							display: flex;
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
								width: 1.6rem;
								margin-left: .1rem;
							}

							.required {
								color: #f00;
							}

							.select {
								position: absolute;
								color: #e3e3e3;
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

				// 危险行为
				.wxxw-content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					margin-bottom: .1rem;

					.main {
						// width: 100%;
						margin: .1rem 0;
						display: flex;
						position: relative;

						.main-wxxw-wrap {
							display: flex;

							.name {
								width: .9rem;
								text-align: right;
								flex-shrink: 0;
								margin-top: 8rpx;
							}

							.u-checkbox-group-box {
								margin-left: .1rem;

								.u-checkbox-group {
									margin-bottom: .1rem;

									.u-checkbox-name {
										width: .9rem;
										font-size: .14rem;
										flex-shrink: 0;
										display: block;
									}

									&>input {
										border: 1rpx solid #e3e3e3;
										border-radius: 8rpx;
										font-size: .12rem;
										padding: 10rpx 0 10rpx 20rpx;
										width: .9rem;
										margin-left: .1rem;
									}

									.unit {
										margin: 10rpx 0 0 10rpx;
									}
								}
							}
						}

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

							.select {
								color: #ccc;
								position: absolute;
								right: 1.55rem;
							}
						}
					}
				}

				// 目前用药情况
				.yytz-container {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					margin-bottom: .1rem;

					.yytz-content {
						width: 96%;
						background-color: #fff;
						border-radius: 16rpx;
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
						font-size: .15rem;
					}

					.main {
						width: 50%;
						display: flex;
						align-items: center;
						margin: .1rem 0;
						position: relative;

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
							margin-left: .1rem;
							width: 1.6rem;
						}

						.select {
							color: #e3e3e3;
							position: absolute;
							right: 1.55rem;
						}
					}
				}

				// 目前用药情况
				.mqyy-content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					margin-bottom: .1rem;

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

						.required {
							color: #f00;
						}

						.icon {
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
