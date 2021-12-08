<template>
	<view class="wrap">
		<view class="left"></view>
		<view class="center">
			<view class="measured-value-wrap">
				<view class="box">
					<view class="content">
						<text class="val">{{measuredValue > 0 ? measuredValue : '---'}}</text>
						<text class="txt">mmol/L</text>
						<view v-if="isResult" class="result" :style="handleBloodSugarStyle" style="width: .5rem;height: .18rem;display: flex;
						align-items: center;justify-content: center;border-radius: 100rpx;margin-top: .1rem;">
							<text style="font-size: .12rem;color: #fff;">{{result}}</text>
						</view>
					</view>
				</view>
				<view class="tap-nav">
					<block v-for="(item,index) in navTap" :key="index">
						<text :class="current == index ? 'active name' : 'name'" @click="current = index">{{item}}</text>
					</block>
				</view>
			</view>
			<view class="lower-half-region">
				<view class="sugar-control-target" v-for="(item,index) in list" :key="index" v-if="item.jieguopanding == '正常'">
					<text class="iconfont">&#xe614; 控糖目标 {{item.jieguozhifanwei1}} - {{item.jieguozhifanwei2}}</text>
				</view>
				<view class="tag-wrap">
					<view class="tag-top">
						<text class="title">为此次血糖添加标签</text>
						<view class="tag-content">
							<block v-for="(item,index) in tag[0]" :key="index">
								<u-tag shape="circle" :class="checkedTag[0].indexOf(item) !== -1 ? 'active' : 'tag'" :index="index" mode="plain"
								 border-color="#e6e5ea" :text="item" @click="handleActiveTag(item,0)" />
							</block>
						</view>
					</view>
					<view class="tag-top">
						<text class="title">当前感觉</text>
						<view class="tag-content">
							<block v-for="(item,index) in tag[1]" :key="index">
								<u-tag shape="circle" :class="checkedTag[1].indexOf(item) !== -1 ? 'active' : 'tag'" :index="index" mode="plain"
								 border-color="#e6e5ea" :text="item" @click="handleActiveTag(item,1)" />
							</block>
						</view>
					</view>
					<text :style="equipmentStatus == true ? 'color:#19be6b' : 'color:#f00'">{{ deviceStatus }}</text>
				</view>
			</view>
		</view>
		<view class="right"></view>
	</view>
</template>

<script>
	// import tool from '@/utils/util.js';
	import tool from '../../../utils/util.js'
	let bldsgr = null;
	let bldsugarDevice = require('@/utils/BTDevice/BldSugarBTDevice.js');
	export default {
		data() {
			return {
				measuredValue:'0',
				result: '',
				isResult:false,
				current: 0,
				deviceStatus: '未就绪,请稍后,如果等待超过30秒,请返回首页重新进入血糖测量界面...',
				equipmentStatus:false,
				navTap: ['空腹', '餐后2小时'],
				list: [],
				time:'',
				tag: [['已口服药', '已注射胰岛素', '运动后'],['正常', '头晕', '头痛', '心慌', '恶心', '呕吐']],
				checkedTag: [[],[]],
				person_id:'',
				person_name:'',
				follow_doctor_name:'',
				kzy:''
			}
		},
		watch: {
			current: {
				immediate: true,
				handler(val) {
					this.current = val;
					this.handleGetMeasuredValue();
				}
			}
		},
		mounted() {
			bldsgr = new bldsugarDevice.BldSugarBTDevice();
			bldsgr.close();
			bldsgr.init();
			this.initXtyBlue();
			let res = uni.getStorageSync('login_info');
			// console.log(res);
			if(res !== ''){
				this.person_id = res[0].id;
				this.person_name = res[0].name
			}
			
		},
		destroyed() {
			bldsgr.close();
		},
		computed:{
			handleBloodSugarStyle(){
				let result = this.measuredValue, _bg = '';
				for(let item of this.list){
					let num1 = item.jieguozhifanwei1,num2 = item.jieguozhifanwei2;
					if(this.current == 0){
						if(item.jieguopanding == '血糖低' && result >= num1 && result < num2){
							this.result = item.jieguopanding;
							_bg = '#5500ff';
						}
						if(item.jieguopanding == '正常' && result >= num1 && result <= num2){
							this.result = item.jieguopanding;
							_bg = '#19be6b';
						}
						if(item.jieguopanding == '血糖高' && result > num1 && result <= num2){
							this.result = item.jieguopanding;
							_bg = '#f00';
						}
					}else{
						if(item.jieguopanding == '正常' && result >= num1 && result <= num2){
							this.result = item.jieguopanding;
							_bg = '#19be6b';
						}
						if(item.jieguopanding == '血糖低' && result >= num1 && result < num2){
							this.result = item.jieguopanding;
							_bg = '#5500ff';
						}
						if(item.jieguopanding == '血糖高' && result > num1 && result <= num2){
							this.result = item.jieguopanding;
							_bg = '#f00';
						}
					}
				}
				return `backgroundColor:` + _bg;
			}
		},
		methods: {
			initXtyBlue() {
				let that = this;
				try {
					let jsonParam = {
						deviceName: 'OGM_112404X200D1CC',
						notifyId: '00004A5B-0000-1000-8000-00805F9B34FB',
						writeId:'00004A5B-0000-1000-8000-00805F9B34FB',
						serviceId: '11223344-5566-7788-99AA-BBCCDDEEFF00'  
					};
					bldsgr.conn(
						jsonParam,
						function(d) {
							console.log(JSON.stringify(d))
							if (d.success == true) {
								that.time = tool.getFtSystemTime();
								let xtarr = d.data.datas;
								console.log(xtarr)
								let _arr = [];
								//处理仪器返回的数据改成列表数据
								for (let item of xtarr) {
									_arr.push({
										flag: item.flag,
										type: '血糖',
										state: 1,
										test_result: item.result,
										celiangzhi: item.value,
									});
								}
								that.measuredValue = _arr[0].celiangzhi;
								that.result = _arr[0].test_result;
								that.isResult = true;
								that.is_kzy = _arr[0].flag;
								setTimeout(() => {
									that.handleSaveXuetangInfo();
									console.log('999999999999999999999999')
								}, 1000);
							} else {
								if (d.type && d.type == '_getDevInfo') {
									that.deviceStatus = '已就绪,请根据血糖仪指示进行采血测量(' + tool.formatTime(new Date()) + ')...';
									that.equipmentStatus = true;
								}
								if (d.type && d.type == 'initBlue') {
									that.deviceStatus = d.msg;
									that.equipmentStatus = false;
								}
								if (d.type && d.type == 'err') {
									that.deviceStatus = d.msg;
									that.equipmentStatus = false;
								}
								if (d.type && d.type == 'startReceive') {
									that.deviceStatus = d.msg;
									that.equipmentStatus = false;
								}
							}
						},
						2000
					);
				} catch (e) {
					console.log(e.message);
					this.$lz.hideCancel('err',e.message)
				}
			},
			// 获取控糖值
			handleGetMeasuredValue() {
				let res = uni.getStorageSync('judging_conditions'),
					arr = [];
				for (let item of res) {
					if (this.current == 0 && item.classify_name == '血糖' && item.teshutiaojian == '餐前') {
						arr.push(item);
						this.list = arr;
					} else if (this.current == 1 && item.classify_name == '血糖' && item.teshutiaojian == '餐后') {
						arr.push(item);
						this.list = arr;
					}
				}
			},
			// tag 标签
			handleActiveTag(item, index) {
				if (this.checkedTag[index].indexOf(item) == -1) {
					this.checkedTag[index].push(item);
				} else {
					this.checkedTag[index].splice(this.checkedTag[index].indexOf(item), 1);
				}
			},
			// 上传血糖测量信息
			handleSaveXuetangInfo(){
				let res = uni.getStorageSync('user_info');
				let obj = {}
				let is_eat = '空腹';
				is_eat = this.current == 0 ? is_eat = '空腹' : '餐后2小时';
				let is_effect = '有效';
				is_effect = this.kzy == 0 ? '有效' : '无效';
				let xuetangEntity = {
					id:'',
					person_id: this.person_id,
					glucose: this.measuredValue,
					check_time: this.time,
					lable: this.checkedTag[0].join(','),
					follow_doctor_name: res[0].doctor_name,
					follow_doctor_sign:'',
					person_name: this.person_name,
					person_sign:'',
					current_feel:this.checkedTag[1].join(','),
					is_eat: is_eat,
					is_kzy: this.is_kzy,
					is_effect: is_effect
				}
				obj.xuetangEntity = JSON.stringify(xuetangEntity);
				console.log(obj);
				this.$u.post('SaveXuetangInfo',obj).then(res => {
					console.log(res);
					this.$lz.toast(res.info)
				}).catch(err => {
					console.log(err);
					this.$lz.toast(err.errMsg)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		display: flex;
		height: 100vh;

		.left {
			flex: 1;
			background-color: #007AFF;
		}

		.center {
			flex: 1.5;

			.measured-value-wrap {
				width: 100%;
				height: 2rem;
				background: linear-gradient(180deg, #fc979f 15%, #fac6b6 51%, #fac6b6 100%);
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				position: relative;

				.box {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 1.2rem;
					height: 1.2rem;
					background-color: #fff;
					border-radius: 50%;

					.content {
						width: 1rem;
						height: 1rem;
						border: 1rpx solid #e3e3e3;
						border-radius: 50%;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;

						.val {
							font-size: .26rem;
							color: #4CD964;
						}

						.txt {
							color: #e3e3e3;
							font-size: .12rem;
						}

						.result {
							font-size: .12rem;
						}
					}
				}

				.tap-nav {
					display: flex;
					position: absolute;
					bottom: .1rem;
					left: 0;

					.name {
						font-size: .14rem;
						margin-left: .1rem;
					}

					.active {
						color: #2B85E4;
					}
				}
			}

			.lower-half-region {
				width: 100%;
				height: 100vh;

				.sugar-control-target {
					width: 100%;
					height: .4rem;
					display: flex;
					align-items: center;
					justify-content: center;
					border-bottom: 1rpx solid #e3e3e3;
					font-size: .12rem;
				}

				.tag-wrap {
					width: 100%;
					padding-left: .1rem;

					.tag-top {
						margin-top: .1rem;

						.title {
							font-size: .12rem;
						}

						.tag-content {
							display: flex;
							flex-wrap: wrap;
							margin-top: .1rem;

							.active {
								color: #f00;
								margin: 0 .1rem .1rem 0;
							}

							.tag {
								color: #007AFF;
								margin: 0 .1rem .1rem 0;
							}
						}
					}
				}
			}
		}

		.right {
			flex: 1;
			background-color: #f00;
		}
	}
</style>
