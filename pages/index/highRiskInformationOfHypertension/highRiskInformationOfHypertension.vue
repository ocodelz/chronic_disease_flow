<template>
	<view class="wrap">
		<scroll-view class="scroll" scroll-y>
			<free-title title="高血压高危详细信息" isRight :camera="camera"></free-title>
			<!-- 随访日期 & 随访方式 -->
			<view class="container">
				<view class="content">
					<view class="main" v-for="(item,index) in highRiskInformationOfHypertension" :key="index">
						<text class="name">{{item.name}}</text>
						<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
							v-model="item.model" :adjust-position="false"
							@click="item.type == 'select' ? handleTapInput(item.name) : ''">
						<text class="iconfont icon-select">&#xe65a;</text>
						<text class="iconfont icon-required">&#xe635;</text>
					</view>
				</view>
			</view>
			<!-- 家庭膳食 -->
			<view class="jtss-container">
				<view class="jtss-content">
					<text class="title">家庭膳食</text>
					<view class="main" v-for="(item,index) in familyMeals" :key="index">
						<text class="name">{{item.name}}</text>
						<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
							v-model="item.model" :adjust-position="false">
						<text class="iconfont icon-required">&#xe635;</text>
						<view class="iconfont" v-if="item.name == '随访医生签名'" @click="isCanvas = true">&#xe6a4;</view>
						<image v-if="item.name == '随访医生' && img!==''" :src="img" style="width: 1rem;height: .3rem;">
						</image>
					</view>
				</view>
			</view>
			<!-- 个人膳食 -->
			<view class="grss-container">
				<view class="grss-content">
					<text class="title">个人膳食：请回忆在过去3个月里，使用以下食物的次数和平均每次使用量</text>
					<view class="main" v-for="(item,index) in personalMeal" :key="index">
						<text class="name">{{item.name}}</text>
						<u-radio-group size="28" @change="radioGroupChange" v-model="item.value">
							<u-radio v-for="(rtem,rndex) in item.radio" :key="rndex" :name="rtem.name"
								:disabled="rtem.disabled">
								<text class="radio-name">{{rtem.name}}</text>
							</u-radio>
						</u-radio-group>
						<view v-for="(jtem,input) in item.input" :key="input" class="input-box">
							<input v-if="jtem.item == '次/天'" :type="jtem.type" :placeholder="jtem.placeholder"
								:disabled="jtem.disabled" v-model="jtem.day" :adjust-position="false">
							<input v-if="jtem.item == '次/周'" :type="jtem.type" :placeholder="jtem.placeholder"
								:disabled="jtem.disabled" v-model="jtem.week" :adjust-position="false">
							<input v-if="jtem.item == '次/月'" :type="jtem.type" :placeholder="jtem.placeholder"
								:disabled="jtem.disabled" v-model="jtem.month" :adjust-position="false">
							<input v-if="jtem.item == '平均每次'" :type="jtem.type" :placeholder="jtem.placeholder"
								:disabled="jtem.disabled" v-model="jtem.average_dosage" :adjust-position="false">
							<text class="item">{{jtem.item}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 体质 -->
			<view class="tz-container">
				<view class="tz-content">
					<title class="title">体质</title>
					<view class="main" v-for="(item,index) in constitution" :key="index">
						<text class="name">{{item.name}}</text>
						<input :type="item.type" :placeholder="item.placeholder" v-model="item.model"
							:adjust-position="false">
						<text class="txt">/</text>
						<input :type="item.type" :placeholder="item.placeholders" v-model="item.mode1"
							:adjust-position="false">
						<text class="company">{{item.company}}</text>
						<view class="icon" @click="handleViewDetails(item.name)">{{item.icon}}</view>
						<text class="connectionStatus">{{item.connectionStatus}}</text>
					</view>
				</view>
			</view>
			<!-- 生活方式及指导 -->
			<view class="shfs-container">
				<view class="shfs-content">
					<text class="title">生活方式及指导</text>
					<view class="main" v-for="(item,index) in lifestyleAndGuidance" :key="index">
						<text class="name">{{item.this_time}}</text>
						<input :type="item.type" :placeholder="item.placeholder" v-model="item.this_time_model"
							:adjust-position="false" :disabled="item.disabled"
							@click="item.type == 'select' ? handleTapInput(item.this_time) : ''">
						<text class="iconfont icon-select" v-if="item.type == 'select'">&#xe65a;</text>
						<input v-if="item.style == 0" :type="item.type" :placeholder="item.placeholders"
							v-model="item.this_time_mode1" :adjust-position="false" :disabled="item.disabled">
						<text class="name" v-if="item.next_time">{{item.next_time}}</text>
						<input v-if="item.style == 0 || item.next_time == '下次随访目标'" :type="item.type"
							:placeholder="item.placeholder" v-model="item.next_time_model" :adjust-position="false"
							:disabled="item.disabled"
							@click="item.type == 'select' ? handleTapInput(item.next_time) : ''">
						<text class="iconfont icon-select"
							v-if="item.type == 'select' && item.next_time == '下次随访目标'">&#xe65a;</text>
						<input v-if="item.style == 0" :type="item.type" :placeholder="item.placeholders"
							v-model="item.next_time_mode1" :adjust-position="false" :disabled="item.disabled">
					</view>
				</view>
			</view>
			<!-- 下次随访日期 & 随访医生-->
			<view class="xcsf-container">
				<view class="xcsf-content">
					<view class="main" v-for="(item,index) in followUpManagement" :key="index">
						<text class="name">{{item.name}}</text>
						<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
							v-model="item.model" :adjust-position="false"
							@click="item.type == 'select' ? handleTapInput(item.name) : ''">
						<text class="iconfont icon-select" v-if="item.type == 'select'">&#xe65a;</text>
						<text class="iconfont icon-required" v-if="item.required">&#xe635;</text>
						<view class="iconfont" style="margin-left: .1rem;" v-if="item.name == '随访医生：'"
							@click="isCanvas = true">&#xe6a4;</view>
						<image v-if="item.name == '随访医生：' && img!==''" :src="img" style="width: 1rem;height: .3rem;">
						</image>
					</view>
				</view>
			</view>
			<view class="btn-container">
				<u-button class="btn" @click="handleSubmitBtn" type="primary">保存</u-button>
			</view>
			<canva v-if="isCanvas" @close="isCanvas = false" @finish="finish"></canva>
			<free-table-popup title="血压检测列表" :isPopup="isBloodPressureCheckList" @close="isBloodPressureCheckList = false" :tableHead="bloodPressureCheckList[0]" :tableContent="bloodPressureCheckList[1]"></free-table-popup>
		</scroll-view>
		<u-picker v-model="isTime" mode="time" @confirm="handlePicker"></u-picker>
		<u-select v-model="selectorIsShow" :list="selectList" @confirm="handleSelect"></u-select>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import data from '@/js/highRiskInformationOfHypertension.js';
	import canva from "@/components/free-ui/free-canvas/canvas.vue";
	import util from '@/common/utils.js';
	import freeTablePopup from '@/components/free-ui/free-table-popup/free-table-popup.vue';
	let bldprs = null;
	let bldPressDevice = require('@/utils/BTDevice/BldPressBTDevice.js');
	export default {
		components: {
			freeTitle,
			canva,
			freeTablePopup
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
				// 收缩压
				systolicPressure: 0,
				// 舒张压
				diastolicPressure: 0,
				isTime: false,
				selectorIsShow: false,
				selectList: [],
				item: '',
				img: '',
				isCanvas: false,
				highRiskInformationOfHypertension: JSON.parse(JSON.stringify(data.highRiskInformationOfHypertension)),
				familyMeals: JSON.parse(JSON.stringify(data.familyMeals)),
				personalMeal: JSON.parse(JSON.stringify(data.personalMeal)),
				constitution: JSON.parse(JSON.stringify(data.constitution)),
				lifestyleAndGuidance: JSON.parse(JSON.stringify(data.lifestyleAndGuidance)),
				followUpManagement: JSON.parse(JSON.stringify(data.followUpManagement)),
				person_id: '',
				follow_id: '',
				doctor_id: '',
				isBloodPressureCheckList: false,
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
				]
			}
		},
		mounted() {
			bldprs = new bldPressDevice.BldPressBTDevice();
			bldprs.close();
			bldprs.init();
			uni.$on('switchUser', () => {
				console.info(data)
				this.highRiskInformationOfHypertension = JSON.parse(JSON.stringify(data.highRiskInformationOfHypertension));
				this.familyMeals = JSON.parse(JSON.stringfy(data.familyMeals));
				this.personalMeal = JSON.parse(JSON.stringfy(data.personalMeal));
				this.constitution = JSON.parse(JSON.stringfy(data.constitution));
				this.lifestyleAndGuidance = JSON.parse(JSON.stringfy(data.lifestyleAndGuidance));
				this.followUpManagement = JSON.parse(JSON.stringfy(data.followUpManagement));
			});
			let edit = uni.getStorageSync('edit');
			// console.log(edit);
			if (edit !== '') {
				this.person_id = edit.person_id;
				this.follow_id = edit.follow_id;
			} else {
				let res = uni.getStorageSync('login_info');
				if (res !== '') {
					this.person_id = res[0].id;
				}
			}
			
			// console.log(this.follow_id);
			this.handleInit();
			this.handleSearchHypertensionFollow();
			this.camera = util.camera(this.basicSettingsList,this.camera);
			this.start();
			this.handleGetDoctorName();
		},
		destroyed() {
			uni.$off('switchUser');
			bldprs.close();
		},
		computed:{
			...mapState(['basicSettingsList']),
			sfInit() {
				return JSON.parse(JSON.stringify(this.highRiskInformationOfHypertension));
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
			handleGetDoctorName(){
				let res = uni.getStorageSync('user_info');
				console.log(res);
				this.doctor_id = res[0].doctor_id;
				if(res !== ''){
					for(let item of this.followUpManagement){
						if(item.name == '随访医生：'){
							item.model = res[0].doctor_name;
						}
					}
				}
			},
			handleInit() {
				for (let item of this.highRiskInformationOfHypertension) {
					if (item.name == '随访日期') {
						for (let jtem of this.basicSettingsList) {
							if (jtem.name == '默认下次随访日期天数') {
								for (let ctem of this.followUpManagement) {
									if (ctem.name == '下次随访日期：') {
										console.log(3333);
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
								for(let item of that.constitution){
									if(item.name == '血压'){
										console.log(item);
										item.model = that.systolicPressure;
										item.mode1 = that.diastolicPressure;
										item.connectionStatus = d.msg;
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
			handleViewDetails(item){
				item == '血压' ? this.isBloodPressureCheckList = true : this.isBloodPressureCheckList = false;
			},
			radioGroupChange(e) {
				console.log(e);
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
			handleTapInput(item) {
				console.log(item);
				this.item = item;
				this.selectorIsShow = true;
				switch (item) {
					case "随访日期":
					case "下次随访日期：":
						this.isTime = true;
						this.selectorIsShow = false;
						break;
					case "随访方式":
						this.selectList = util.followUpMode;
						break;
					case '摄盐情况':
						this.selectList = util.grade
						break;
					case '下次随访目标':
						this.selectList = util.grade
						break;
					case '心理调整':
						this.selectList = util.behavior
						break;
				}
			},
			handlePicker(e) {
				// this.dateofBirth = e.year + '-' + e.month + '-' + e.day;
				for (let item of this.highRiskInformationOfHypertension) {
					if (item.name == '随访日期' && this.item == '随访日期') {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
				for (let item of this.followUpManagement) {
					if (item.name == '下次随访日期：' && this.item == '下次随访日期：') {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
			},
			handleSelect(e) {
				for (let item of this.highRiskInformationOfHypertension) {
					if (item.name == '随访方式') {
						item.model = e[0].label;
					}
				}
				for (let item of this.lifestyleAndGuidance) {
					if (item.this_time == this.item && item.type == 'select') {
						item.this_time_model = e[0].label
					}
					if (item.next_time == this.item && item.type == 'select') {
						item.next_time_model = e[0].label
					}
				}
			},
			handleSubmitBtn() {
				let param = {
					data: {}
				}
				let info = {
					id: this.follow_id,
					person_id: this.person_id,
					follow_time: this.highRiskInformationOfHypertension[0].model,
					follow_method: this.highRiskInformationOfHypertension[1].model
				}
				param.data.info = info;

				let jtss = {}
				for (let item of this.familyMeals) {
					jtss[item.key] = item.model;
				}
				param.data.jtss = jtss;

				let grss = [];
				for (let item of this.personalMeal) {
					// console.log(item);
					let d = {
						isUse: item.value,
						name: item.name
					};
					for (let a of item.input) {
						d[a.key] = a[a.key];
					}
					grss.push(d);
				}
				param.data.grss = grss;
				let tz = {
					blood_pressure1: this.constitution[0].model,
					blood_pressure2: this.constitution[0].mode1
				}
				param.data.tz = tz;

				let shfsjzd = {}
				for (let item of this.lifestyleAndGuidance) {
					shfsjzd[item.key] = item.this_time_model;
					if (item.keys) {
						shfsjzd[item.keys] = item.next_time_model;
					}
					if (item.this_time_mode1) {
						shfsjzd[item.keys] = item.this_time_mode1;
					}
				}
				param.data.shfsjzd = shfsjzd;

				let zh = {
					follow_doctor_sign: this.img,
					upload_status: '0',
					follow_doctor_id: this.doctor_id,
					picture_url: "",
					danger_lever: "高危",
					diagnosisResult: "一级高血压",
					rateresult: "正常",
					picture_status: '1'
				}
				
				for (let item of this.followUpManagement) {
					zh[item.key] = item.model;
				}
				param.data.zh = zh;
				
				for(let item of this.highRiskInformationOfHypertension){
					for(let atem of this.familyMeals){
						for(let btem of this.followUpManagement){
							if(item.required && item.model== '' || atem.required && atem.model== '' || btem.required && btem.model== ''){
								return this.$lz.toast('必填项不能为空');
							}
						}
					}
				}
				this.$u.post('SaveHighHypertensionFollow', param).then(res => {
					console.log(res);
					if (res.code == 200 && JSON.stringify(res.data) !== '[]') {
						this.follow_id = res.data[0].follow_id;
						this.$lz.toast(res.info)
					}
				}).catch(err => {
					console.log(err);
				})
				console.log(param);
			},
			// 查询高危人群详细信息
			handleSearchHypertensionFollow() {
				this.$u.post('SearchHighFollowInfo', {
					follow_id: this.follow_id,
				}).then(res => {
					// console.log(res);
					if (res.code == 200 && JSON.stringify(res.data) !== '[]') {
						let data = res.data[0];
						this.follow_id = data.follow_id;
						for (let item of this.highRiskInformationOfHypertension) {
							item.model = data[item.key]
						}
						for (let item of this.familyMeals) {
							item.model = data[item.key]
						}
						let meal=data.meal;
						for (let item of this.personalMeal) {
							for(let a of meal){
								if(a.name==item.name){
									item.value=data[item.keys];
									for(let b of item.input){
										b[b.key] = a[b.key]
									}
								}
							}
						}
						for (let item of this.constitution) {
							item.model = data[item.key]
							if (item.keys) {
								item.mode1 = data[item.keys]
							}
						}
						for (let item of this.lifestyleAndGuidance) {
							item.this_time_model = data[item.key];
							if (item.current_sport_time) {
								item.this_time_mode1 = data[item.current_sport_time];
							}
							if (item.target_sport_time) {
								item.next_time_mode1 = data[item.target_sport_time];
							}
							if (item.keys) {
								item.next_time_model = data[item.keys];
							}
						}
						for (let item of this.followUpManagement) {
							item.model = data[item.key]
						}
						this.img = data.follow_doctor_sign;
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

		.scroll {
			width: 100%;
			height: calc(100vh - .5rem);

			//  症状
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
					padding: .15rem .15rem .5rem .15rem;
					display: flex;
					align-items: center;

					.main {
						display: flex;
						align-items: center;
						width: 50%;

						.name {
							width: .9rem;
							text-align: right;
							font-size: .14rem;
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

						.icon-required {
							color: #f00;
						}
					}

				}
			}

			// 家庭膳食
			.jtss-container {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: .1rem;

				.jtss-content {
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
						padding-left: .1rem;
					}

					.main {
						display: flex;
						align-items: center;
						width: 100%;
						margin-top: .2rem;

						.name {
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

						.icon-required {
							color: #f00;
						}
					}
				}
			}

			// 个人膳食
			.grss-container {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: .1rem;

				.grss-content {
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
						padding-left: .1rem;
					}

					.main {
						display: flex;
						align-items: center;
						width: 100%;
						margin-top: .2rem;

						.name {
							width: .9rem;
							text-align: right;
							font-size: .14rem;
							margin-right: .1rem;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 1.6rem;
							margin-left: .1rem;
						}

						.icon-required {
							color: #f00;
						}

						.radio-name {
							font-size: .14rem;
						}

						.input-box {
							display: flex;
							align-items: center;

							&>input {
								border: 1rpx solid #e3e3e3;
								border-radius: 8rpx;
								font-size: .12rem;
								padding: 10rpx 0 10rpx 20rpx;
								width: .7rem;
								margin-left: .1rem;
							}

							.item {
								margin-left: .1rem;
								font-size: .14rem;
							}
						}
					}
				}
			}

			// 体质
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
						padding-left: .1rem;
					}

					.main {
						display: flex;
						align-items: center;

						.name {
							width: .9rem;
							text-align: right;
							font-size: .14rem;
						}

						.txt {
							margin-left: .1rem;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: .7rem;
							margin-left: .1rem;
						}

						.company {
							margin-left: .1rem;
						}

						.icon {
							background-color: #007AFF;
							border-radius: 8rpx;
							padding: 0 10rpx;
							margin-left: 10rpx;
						}

						.connectionStatus {
							margin-left: .3rem;
						}
					}
				}
			}

			// 生活方式及指导
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
						padding-left: .1rem;
					}

					.main {
						display: flex;
						align-items: center;
						margin-top: .2rem;

						.name {
							width: .9rem;
							text-align: right;
							font-size: .14rem;
							margin-left: .1rem;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: .7rem;
							margin-left: .1rem;
							// position: relative;
						}

						.icon-select {
							color: #ccc;
							// position: absolute;
							// margin-left: 2.5rem;
							margin-left: -.2rem;
						}
					}
				}
			}

			// 下次随访日期 & 随访医生
			.xcsf-container {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: .1rem;

				.xcsf-content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .3rem;
					display: flex;
					align-items: center;
					flex-wrap: wrap;

					.main {
						display: flex;
						align-items: center;
						width: 50%;
						position: relative;

						.name {
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

						.icon-select {
							color: #ccc;
							position: absolute;
							right: 1.45rem;
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
