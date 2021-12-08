<template>
	<view class="wrap">
		<view class="left"></view>
		<view class="center">
			<text class="result-txt">测量结果</text>
			<view class="result-box">
				<view class="result">
					<view class="blood-pressure-box">
						<view class="blood-pressure">
							<text class="txt">血压</text>
							<image src="/static/image/index/xueya.png" class="img"></image>
						</view>
						<view class="measurement-result">
							<view class="measurement-result-ssy">
								<view class="info">
									<text class="txt1">收缩压</text>
									<text class="txt2">mmHg</text>
								</view>
								<view class="measurement-num"
									:style="state == 1 || measurementStatus == 1 ? handleGetSystolicPressure : ''">
									<text class="ssy-num">{{systolicPressure == 0 ? '---' : systolicPressure}}</text>
								</view>
							</view>
							<view class="measurement-result-szy">
								<view class="info">
									<text class="txt1">舒张压</text>
									<text class="txt2">mmHg</text>
								</view>
								<view class="measurement-num"
									:style="measurementStatus == 1 ? handleGetDiastolicPressure : ''">
									<text class="szy-num">{{measurementStatus == 0 ? '---' : diastolicPressure}}</text>
								</view>
							</view>
						</view>
						<view class="blood-pressure-result" v-if="isxyResult" :style="handleGetBloodPressureStyle">
							<text>{{bloodPressureResult}}</text>
						</view>
						<view class="right-bz">
							<text class="txt">理想标准(mmHg):</text>
							<text class="txt">收缩压&lt;120</text>
							<text class="txt">舒张压&lt;80</text>
						</view>
					</view>
					<view class="blood-pressure-box">
						<view class="blood-pressure">
							<text class="txt">心率</text>
							<image src="/static/image/index/xinlv.png" style="width: .9rem;height: .7rem;"></image>
						</view>
						<view class="heartrate-result">
							<text class="txt1">{{measurementStatus == 0 ? '---' : pulse}}</text>
							<text class="txt2">/分钟</text>
						</view>
						<view class="heart-rate-result" v-if="isxlResult" :style="handleGetHeartRateStyle">
							<text>{{heartRateResult}}</text>
						</view>
						<view class="right-bz">
							<text class="txt">正常标准(分钟):</text>
							<text class="txt">心率: 60-100</text>
						</view>
					</view>
				</view>
			</view>
			<view class="measurement-info">
				<view class="info">
					<text class="txt">测量结果:</text>
					<text class="txt" v-if="bloodPressureResult !== '' && heartRateResult !== ''">血压：{{bloodPressureResult}},心率：{{heartRateResult}}</text>
					<text class="txt" v-else>---</text>
				</view>
				<view class="measurement-time">
					<text class="txt">测量时间:</text>
					<text class="txt">{{measuringTime == ''? '---' : measuringTime}}</text>
				</view>
			</view>
			<view class="start">
				<view v-if="isOperationButton" @click="handleisOperationButton">
					<image src="/static/image/index/kaishi.png" style="width: .5rem; height: .5rem;"></image>
				</view>
				<view v-else>
					<image src="/static/image/index/zanting.png" style="width: .5rem; height: .5rem;"></image>
				</view>
			</view>
		</view>
		<view class="right"></view>
		<!-- <scroll-view style="height: 500;background-color: #007AFF;width: 1200rpx;" scroll-y="true" scroll-x>
			<text style="color: #f00;">测试数据:</text>{{testData}}
			<text style="color: #f00;">数据: </text>{{Data}}
			<text style="color: #f00;">入参:</text>{{testDat}}
			<text style="color: #f00;">最终血压值: </text>{{msg}}
			<text style="color: #f00;">dType: </text>{{dType}}
			<text style="color: #f00;">dSuccess: </text>{{dSuccess}}
		</scroll-view> -->
	</view>
</template>
<script>
	let bldprs = null;
	let bldPressDevice = require('@/utils/BTDevice/BldPressBTDevice.js');
	import tool from '@/utils/util.js';
	import common from '../../../js/bloodPressure.js'
	export default {
		props: {
			isOperationBtn: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				// dType: '',
				// dSuccess: '',
				// msg: '',
				// testDat: '',
				// testData: '',
				// Data: '',
				// 测量值
				xydata: {},
				measurementStatus: 0,
				state: 0,
				// 测量开关
				isOperationButton: false,
				// 收缩压
				systolicPressure: 0,
				// 舒张压
				diastolicPressure: 0,
				// 心率
				pulse: 0,
				// 血压结果
				bloodPressureResult: '',
				// 心率结果
				heartRateResult: '',
				// 血压测量结果显示状态
				isxyResult: false,
				// 心率测量结果显示状态
				isxlResult: false,
				// 设备信息
				equipment: {
					e_name: "BP06D21801040414",
					notice_id: "0000FFF1-0000-1000-8000-00805F9B34FB",
					write_in_id: "0000FFF2-0000-1000-8000-00805F9B34FB",
					service_id: "0000FFF0-0000-1000-8000-00805F9B34FB",
					e_id: "f5aa736f-da98-4f3b-a1da-017336a2b5d2"
				},
				// 测量结果
				result: '',
				// 测量时间
				measuringTime: '',
				judgeConditions: [[],[],[]]
			}
		},
		mounted() {
			this.handleGetJudgmentConditions();
			bldprs = new bldPressDevice.BldPressBTDevice();
			bldprs.close();
			bldprs.init();
		},
		destroyed() {
			bldprs.close();
		},
		watch: {
			isOperationBtn: {
				immediate: true,
				handler(val) {
					this.isOperationButton = val;
				}
			}
		},
		computed: {
			// 动态获取收缩压样式
			handleGetSystolicPressure() {
				let arr = common.systolicPressure;
				for (let item of this.judgeConditions[0]) {
					for (let jtem of arr) {
						if (item.result_judge == jtem.result && jtem.compulate(this.systolicPressure, item
								.lowRange, item.highRange)) {
							return `color:${jtem.color}`
						}
					}
				}
			},
			// 动态获取舒张压样式
			handleGetDiastolicPressure() {
				let arr = common.diastolicPressure;
				for (let item of this.judgeConditions[1]) {
					for (let jtem of arr) {
						if (item.result_judge == jtem.result && jtem.compulate(this.diastolicPressure, item
								.lowRange, item.highRange)) {
							return `color:${jtem.color}`
						}
					}
				}
			},
			// 动态显示心率样式
			handleGetHeartRateStyle() {
				let arr = common.heart;
				for (let item of this.judgeConditions[2]) {
					for (let jtem of arr) {
						if (item.result_judge == jtem.result && jtem.compulate(this.pulse, item.lowRange, item
								.highRange)) {
							this.heartRateResult = jtem._result;
							return `background:${jtem.background}`
						}
					}
				}
			},
			// 动态显示血压测量结果
			handleGetBloodPressureStyle() {
				let arr = common.bloodPressure;
				for (let item of this.judgeConditions[0]) {
					for (let jtem of this.judgeConditions[1]) {
						for (let rtem of arr) {
							if ((item.result_judge == rtem.result1 && jtem.result_judge == rtem.result2) &&
								rtem.compulate(this.systolicPressure, this.diastolicPressure, jtem.lowRange, jtem
									.highRange,
									item.lowRange,
									item.highRange)) {
								this.bloodPressureResult = rtem.result;
								return `background:${rtem.bg}`
								break;
							}
						}
					}
				}
			}
		},
		methods: {
			// 获取判断条件
			handleGetJudgmentConditions() {
				let res = uni.getStorageSync('GetStandardRange');
				// console.log(res);
				for (let item of res) {
					switch (item.classify_name) {
						case "收缩压":
							this.judgeConditions[0].push(item);
							break;
						case "舒张压":
							this.judgeConditions[1].push(item);
							break;
						case "心率":
							this.judgeConditions[2].push(item);
							break;
					}
				}
			},
			// 操作按钮
			handleisOperationButton() {
				let that = this;
				try {
					that.isOperationButton = false;
					that.$emit('changeisOperationButton', that.isOperationButton);
					that.measurementStatus = 0;
					that.systolicPressure = 0;
					that.pulse = 0;
					that.state = 0;
					that.isxyResult = false;
					that.isxlResult = false;
					that.bloodPressureResult = '';
					that.heartRateResult = '';
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
							// that.dSuccess = JSON.stringify(d);
							console.log(JSON.stringify(d));
							// that.dType = d.type;
							if (d.success == true) {
								that.dType = JSON.stringify(d.type);
								if (d.type == "data-press" || d.type == "data-result") {
									that.xydata = d.data;
									that.$lz.hideLoading();
									that.state = 1;
									that.measuringTime = tool.getFtSystemTime();
								}
								if (that.xydata.sysVal) {
									that.measurementStatus = 1;
									that.isxyResult = true;
									that.isxlResult = true;
								}
								if (JSON.stringify(that.xydata) !== "{}") {
									that.systolicPressure = that.xydata.sysVal ? that.xydata.sysVal : that.xydata
										.replace("mmHg", '');
								}
								that.diastolicPressure = that.xydata.diaVal;
								that.pulse = that.xydata.pulVal;
								if (d.msg == '最终血压值') {
									// that.$lz.toast('最终血压值--wrap');
									// that.msg = '最终血压值';
									setTimeout(() => {
										// that.$lz.toast('最终血压值');
										that.handleBloodPressureUpload();
										// that.msg = '最终血压值ss';
										that.isOperationButton = true;
									},200)
								}
							} else {
								if (d.type && d.type == 'initBlue') {
									that.$lz.hideCancel('注意', d.msg);
									that.isOperationButton = true;
								}
								if (d.type == '_getDevInfo') {
									that.$lz.hideCancel('注意', "请把绑带按说明书要求绑扎到胳膊上,打开血压计电源开关后,再按'开始测量'按钮!")
									that.isOperationButton = true;
								}

								if (d.type && d.type !== '_getDevInfo') {
									that.$lz.hideCancel('注意', d.msg);
									that.isOperationButton = true;
								}
								if (d.type && d.type == 'err') {
									that.$lz.hideCancel('发生错误', d.msg);
									that.isOperationButton = true;
								}
								if (d.type && d.type == 'startReceive') {
									that.$lz.hideCancel('发生错误', d.msg);
									that.isOperationButton = true;
								}
								that.$lz.hideLoading();
								that.$emit('changeisOperationButton', that.isOperationButton);
							}
						}, 2000
						);
				} catch (e) {
					that.isOperationButton = true;
					that.$lz.hideLoading();
				}
			},
			// 血压上传
			handleBloodPressureUpload() {
				let res = uni.getStorageSync('user_info');
				let data = uni.getStorageSync('login_info');
				// this.msg = '进入血压上传方法';
				let xueyaEntity = {
					person_id: data[0].id,
					low_pressure: this.systolicPressure,
					high_pressure: this.diastolicPressure,
					heart_rate: this.pulse,
					check_time: this.measuringTime,
					follow_doctor_name: res[0].doctor_name,
					person_name: data[0].name,
					device_code: '05432012240015',
					diagnosisResult: this.bloodPressureResult,
					rateresult: this.heartRateResult
				}
				// this.testData = JSON.stringify(xueyaEntity);
				// this.testDat = JSON.stringify(xueyaEntity);
				this.isOperationButton = true;
				this.$u.post('SaveXueyaInfo',{
					xueyaEntity: JSON.stringify(xueyaEntity)
				}).then(res => {
					this.$lz.toast(res)
					// this.Data = JSON.stringify(res);
					if(res.code == 200){
						// this.Data = JSON.stringify(res);
						this.$lz.toast(res.info);
					}else{
						this.$lz.toast(res.info);
						// this.Data = JSON.stringify(res);
					}
				}).catch(err => {
					this.$lz.toast(err.errMsg);
					// this.$lz.toast('err');
					// this.Data = JSON.stringify(err.errMsg);
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.wrap {
		display: flex;

		.left {
			height: 100vh;
			flex: 1;
			background: url('/static/image/index/bg.jpg') no-repeat;
			background-position: center center;
			background-size: 100% 100%;
		}

		.center {
			flex: 1.5;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			padding-top: .1rem;

			.result-txt {
				font-size: .14rem;
				color: #ff7f27;
				margin-left: .1rem;
			}

			.result-box {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				// border: 1rpx solid #007AFF;
				margin-top: .2rem;

				.result {
					width: 94%;
					// border: 1rpx solid #d924d6;
					height: 2rem;
					display: flex;
					flex-direction: column;

					.blood-pressure-box {
						width: 100%;
						height: 1rem;
						// background-color: #007AFF;
						display: flex;
						align-items: center;

						.blood-pressure {
							width: 1rem;
							height: 1rem;
							display: flex;
							align-items: center;
							justify-content: center;

							.txt {
								font-size: .14rem;
								// font-weight: 900;
								writing-mode: tb-rl;
								letter-spacing: 0.5em;
								margin-top: .1rem;
							}

							.img {
								// border: 1rpx solid #f00;
								width: 1rem;
								height: 1rem;
								margin-left: .1rem;
							}
						}

						.heartrate-result {
							display: flex;
							align-items: center;
							width: 1rem;

							.txt1 {
								font-size: .22rem;
							}

							.txt2 {
								font-size: .18rem;
							}
						}

						.heart-rate-result {
							width: .2rem;
							height: .8rem;
							// background-color: #71d5a1;
							border-radius: .25rem;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: .12rem;
							writing-mode: tb-rl;
						}

						.measurement-result {
							display: flex;
							flex-direction: column;
							width: 1rem;

							.measurement-result-ssy {
								display: flex;
								align-items: center;

								.info {
									display: flex;
									flex-direction: column;

									.txt1 {
										font-size: .14rem;
									}

									.txt2 {
										font-size: .10rem;
									}
								}

								.measurement-num {
									margin-left: .1rem;

									.ssy-num {
										font-size: .18rem;
									}
								}
							}

							.measurement-result-szy {
								display: flex;
								align-items: center;

								.info {
									display: flex;
									flex-direction: column;

									.txt1 {
										font-size: .14rem;
									}

									.txt2 {
										font-size: .10rem;
									}
								}

								.measurement-num {
									margin-left: .1rem;

									.szy-num {
										font-size: .18rem;
									}
								}
							}
						}

						.blood-pressure-result {
							width: .2rem;
							height: .8rem;
							// background-color: #71d5a1;
							border-radius: .25rem;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: .12rem;
							writing-mode: tb-rl;
						}

						.right-bz {
							display: flex;
							flex-direction: column;
							margin-top: .1rem;
							margin-left: .1rem;
							width: 1rem;

							.txt {
								font-size: .12rem;
							}
						}
					}

				}
			}

			.measurement-info {
				border-top: 1rpx solid #22b14c;
				border-bottom: 1rpx solid #22b14c;
				padding: .1rem 0 .1rem 0;

				.info {
					display: flex;
					align-items: center;
					margin-left: .1rem;

					.txt {
						font-size: .14rem;
					}
				}

				.measurement-time {
					display: flex;
					align-items: center;
					margin-left: .1rem;

					.txt {
						font-size: .14rem;
					}
				}
			}

			.start {
				height: 1rem;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: .1rem;
			}
		}

		.right {
			height: 100vh;
			flex: 1;
			background: url('/static/image/index/bgright.jpg') no-repeat;
			background-position: center center;
			background-size: 100% 100%;
		}
	}
</style>
