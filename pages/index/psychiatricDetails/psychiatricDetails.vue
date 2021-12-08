<template>
	<view class="wrap">
		<scroll-view scroll-y class="scroll">
			<free-title title="严重精神障碍患者个人信息补充表" isRight></free-title>
			<view class="container">
				<view class="content">
					<view class="main" v-for="(item,index) in psychiatricDetails" :key="index"
						:style="handleMainStyle(item.name)">
						<view class="input-box" v-if="!item.checkbox">
							<text class="name">{{item.name}}</text>
							<input :disabled="item.disabled" :placeholder="item.placeholder" :adjust-position="false"
								v-model="item.model" :style="handleInputStyle(item.name)"
								@click="item.select ? handleTapInput(item.name) : ''" />
							<text class="iconfont required">{{item.required}}</text>
							<text class="iconfont select">{{item.select}}</text>
							<text class="iconfont icon" @click="handleisCanvas(item)">{{item.icon}}</text>
							<image v-if="item.name == '知情同意签字' && zqSign!==''" :src="zqSign"
								style="width: 1rem;height: .3rem;">
							</image>
							<image v-if="item.name == '医生签名' && doctorSign!==''" :src="doctorSign"
								style="width: 1rem;height: .3rem;">
							</image>
							<image v-if="item.name == '患者(家属)签名' && familyMembersSign!==''" :src="familyMembersSign"
								style="width: 1rem;height: .3rem;">
							</image>
						</view>
						<view class="check" v-if="item.checkbox">
							<text class="name">{{item.name}}</text>
							<view class="u-checkbox-group-box">
								<u-checkbox-group v-for="(ctem, cndex) in item.checkbox" :key="cndex"
									class="u-checkbox-group" :style="handleCheckboxGroupStyle(item.name)">
									<u-checkbox v-model="ctem.checked" :name="ctem.name">
										<view style="display: flex;align-items: center;">
											<text class="u-checkbox-name"
												:style="handleCheckboxNameStyle(item.name)">{{ctem.name}}</text>
											<input v-model="ctem.model" v-if="ctem.name == '其他' && ctem.checked"
												@click.stop="" :adjust-position="false"
												style="border: 1rpx solid #e3e3e3;border-radius: 8rpx;font-size: .12rem;padding: 10rpx 0 10rpx 20rpx;width: 1.4rem;margin-left: .1rem;" />
										</view>
									</u-checkbox>
									<input v-if="item.name == '危险行为' && ctem.name !== '无'" :disabled="!ctem.checked"
										:adjust-position="false" v-model="ctem.model" />
									<text v-if="item.name == '危险行为'" class="company">{{ctem.company}}</text>
								</u-checkbox-group>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="btn-container">
				<u-button class="btn" type="primary" @click="handleSubmitBtn">保存</u-button>
			</view>
			<canva v-if="isCanvas" @close="isCanvas = false" @finish="finish"></canva>
		</scroll-view>
		<u-picker v-model="isTime" mode="time" @confirm="handlePicker"></u-picker>
		<u-select v-model="selectorIsShow" :list="selectList" @confirm="handleSelect"></u-select>
	</view>
</template>

<script>
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import data from '@/js/psychiatricDetails.js';
	import canva from "@/components/free-ui/free-canvas/canvas.vue";
	export default {
		components: {
			freeTitle,
			canva
		},
		data() {
			return {
				psychiatricDetails: JSON.parse(JSON.stringify(data.psychiatricDetails)),
				isCanvas: false,
				item: '',
				canvasItem: '',
				zqSign: '',
				doctorSign: '',
				familyMembersSign: '',
				isTime: false,
				selectorIsShow: false,
				selectList: [],
				id: '',
				person_id: ''
			}
		},
		mounted() {
			uni.$on('switchUser', () => {
				this.psychiatricDetails = JSON.parse(JSON.stringify(data.psychiatricDetails));
			})
			let res = uni.getStorageSync('login_info');
			if (res !== '') {
				this.person_id = res[0].id;
			}
			this.handleSearchMentalIllnessInfo();
			this.handleGetDoctorName();
		},
		destroyed() {
			uni.$off('switchUser');
		},
		computed: {
			handleMainStyle() {
				return function(item) {
					if (item == '村委会联系人、电话' || item == '诊断' || item == '专科医生的意见' ||
						item == '既往主要症状' || item == '危险行为') {
						return 'width: 100%;'
					}
				}
			},
			handleInputStyle() {
				return function(item) {
					if (item == '村委会联系人、电话' || item == '诊断' || item == '专科医生的意见') {
						return 'width: 100%;'
					}
				}
			},
			handleCheckboxGroupStyle() {
				return function(item) {
					if (item == '危险行为') {
						return 'width: 50%;margin-bottom: .1rem;'
					}
				}
			},
			handleCheckboxNameStyle() {
				return function(item) {
					if (item == '危险行为') {
						return 'display: block;width:.9rem;'
					}
				}
			}
		},
		methods: {
			// 自动获取医生
			handleGetDoctorName() {
				let res = uni.getStorageSync('user_info');
				console.log(res);
				if (res !== '') {
					for (let item of this.psychiatricDetails) {
						if (item.name == '医生签名') {
							item.model = res[0].doctor_name;
						}
					}
				}
			},
			// 输入框点击事件 赋值
			handleTapInput(item) {
				console.log(item);
				this.item = item;
				this.selectorIsShow = true;
				switch (item) {
					case '签字时间':
					case '初次发病时间':
					case '首次治疗时间':
					case '确诊日期':
					case '填表日期':
						this.isTime = true;
						this.selectorIsShow = false;
						break;
					case '与患者关系':
						this.selectList = data.patientRelationship;
						break;
					case '户别':
						this.selectList = data.householdRegisterDifference;
						break;
					case '就业情况':
						this.selectList = data.employmentSituation;
						break;
					case '知情同意':
						this.selectList = data.informedConsent;
						break;
					case '既往关锁情况':
						this.selectList = data.previousLockdownStatus;
						break;
					case '门诊':
						this.selectList = data.outpatientService;
						break;
					case '最近一次治疗效果':
						this.selectList = data.effectOfTheLatestTreatment;
						break;
					case '经济情况':
						this.selectList = data.stateOfTheEconomy;
						break;
				}
			},
			// 时间选择器赋值
			handlePicker(e) {
				for (let item of this.psychiatricDetails) {
					if (item.name == this.item) {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
			},
			// select选择器赋值
			handleSelect(e) {
				let _item = this.item;
				for (let item of this.psychiatricDetails) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
			},
			// Canvas画板显示状态
			handleisCanvas(item) {
				this.canvasItem = item.name;
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
									if (this.canvasItem == '知情同意签字') {
										this.zqSign = obj.result;
									}
									if (this.canvasItem == '医生签名') {
										this.doctorSign = obj.result;
									}
									if (this.canvasItem == '患者(家属)签名') {
										this.familyMembersSign = obj.result;
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
			// 发起网络请求 保存信息
			handleSubmitBtn() {
				for (let item of this.psychiatricDetails) {
					if (item.isRequired && item.model == '') {
						return this.$lz.toast('必填项不能为空');
					}
				}
				let param = {
					data: {}
				}
				let info = {
					id: this.id,
					person_id: this.person_id,
					history_symptom: '',
					dangerous_act: '',
					informed_sign: this.zqSign,
					follow_doctor_sign: this.doctorSign,
					person_sign: this.familyMembersSign
				}
				let history_symptom = [],
					dangerous_act = [];
				for (let item of this.psychiatricDetails) {
					info[item.key] = item.model;
					if (item.name == '既往主要症状') {
						for (let jtem of item.checkbox) {
							info[jtem.key] = jtem.model;
							if (jtem.checked) {
								history_symptom.push(jtem.name);
							}
						}
					}
					if (item.name == '危险行为') {
						for (let ctem of item.checkbox) {
							info[ctem.key] = ctem.model;
							if (ctem.checked) {
								dangerous_act.push(ctem.name);
							}
						}
					}
				}
				param.data.info = info;
				param.data.info.history_symptom = history_symptom.join(',');
				param.data.info.dangerous_act = dangerous_act.join(',');
				console.log(param);
				this.$u.post('SaveMentalIllnessInfo', param).then(res => {
					console.log(res);
					if (res.code == 200 && res.info == '响应成功') {
						this.$lz.toast(res.info);
						this.id = res.data.id;
					}
				}).catch(err => {
					console.log(err);
					this.$lz.toast(err.errMsg);
				})
				console.log(param);
			},
			// 发起网络请求 查询信息
			handleSearchMentalIllnessInfo() {
				this.$u.post('SearchMentalIllnessInfo', {
					persion_id: this.person_id
				}).then(res => {
					console.log(res);
					if (res.code == 200 && res.info == '响应成功') {
						let data = res.data;
						this.id = data.id;
						for (let item of this.psychiatricDetails) {
							item.model = data[item.key];
							this.zqSign = data.informed_sign;
							this.doctorSign = data.follow_doctor_sign;
							this.familyMembersSign = data.person_sign;
							if (item.name == '既往主要症状') {
								for (let ctem of item.checkbox) {
									for (let jtem of data.history_symptom.split(',')) {
										if (ctem.name == jtem) {
											ctem.checked = true;
										}
									}
								}
							}
							if (item.name == '危险行为') {
								for (let ctem of item.checkbox) {
									ctem.model = data[ctem.key];
									for (let jtem of data.dangerous_act.split(',')) {
										if (ctem.name == jtem) {
											ctem.checked = true;
										}
									}
								}
							}
						}
					}
				}).catch(err => {
					console.log(err);
					this.$lz.toast(err.errMsg);
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

					.main {
						width: 50%;
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
								right: 1.55rem;
								color: #ccc;
							}

							.icon {
								margin-left: .1rem;
							}
						}

						.check {
							display: flex;

							.name {
								width: .9rem;
								text-align: right;
								flex-shrink: 0;
								margin-top: 6rpx;
							}

							.u-checkbox-group-box {
								margin-left: .1rem;

								.u-checkbox-group {
									// margin-bottom: .1rem;

									.u-checkbox-name {
										font-size: .14rem;
									}

									&>input {
										border: 1rpx solid #e3e3e3;
										border-radius: 8rpx;
										font-size: .12rem;
										padding: 10rpx 0 10rpx 20rpx;
										width: .9rem;
										margin-left: .1rem;
									}

									.company {
										margin: 10rpx 0 0 10rpx;
									}
								}
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
