<template>
	<view>
		<u-popup v-model="isShows" mode="center" @close="handlePopupClose" border-radius="8">
			<view class="container">
				<view v-for="(item,index) in list" :key="index" class="content"
				:class="current == index ? 'active' : ''" @click="current = index">
					<image class="img" :src="item.picture"></image>
					<view class="right">
						<text>设备名称：{{item.e_name}}</text>
						<text>设备类型：{{item.e_type}}</text>
						<view style="display: flex;">
							<text>状态：</text>
							<text :style="handleStatusStyle(item.status)">{{item.status}}</text>
						</view>
					</view>
				</view>
				<view class="btn-container">
					<u-button class="btn"  type="primary" @click="handleViewDeviceInformation">查看设备信息</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props:{
			isShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				isShows: false,
				list:[],
				current: -1
			}
		},
		mounted() {
			this.isShows = this.isShow;
		},
		watch:{
			isShow:{
				immediate: true,
				handler(val) {
					this.isShows = val;
					// console.log(this.isShows);
					if(this.isShows){
						this.handleGetDeviceInfoByDoc();
					}
				}
			}
		},
		computed:{
			handleStatusStyle(){
				return function(item){
					if(item == '已领用'){
						return 'color:#71d5a1;'
					}else{
						return 'color:#ccc;'
					}
				}
			}
		},
		methods:{
			// 关闭蒙版
			handlePopupClose(){
				this.$emit('close');
			},
			// 发起网络请求 查询医生所领用的设备信息
			handleGetDeviceInfoByDoc(){
				let res = uni.getStorageSync('user_info');
				// console.log(res);
				this.$u.post('GetDeviceInfoByDoc',{
					doctor_id: res[0].doctor_id
				}).then(res => {
					if(res.code == 200){
						this.list = res.data;
						// console.log(this.list);
					}
				}).catch(err => {
					console.log(err);
				})
			},
			// 查看设备参数信息
			handleViewDeviceInformation(){
				if(this.current == -1){
					return this.$lz.toast('请先选择设备~')
				}else{
					console.log(1);
					this.$lz.showCancel('温馨提示','设备名称:'+this.list[this.current].e_name 
					+ ';设备类型:'+this.list[this.current].e_type 
					+ ';设备状态:'+ this.list[this.current].status
					)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 7rem;
		height: 4rem;
		display: flex;
		flex-wrap: wrap;
		position: relative;
		.content{
			display: flex;
			align-items: center;
			height: 1rem;
			margin-left: .2rem;
			padding: .15rem;
			margin-top: .2rem;
			border-radius: 8rpx;
			.img{
				width: .8rem;
				height: .8rem;
				border-radius: 8rpx;
			}
			.right{
				display: flex;
				flex-direction: column;
				font-size: .12rem;
				margin-left: .1rem;
			}
		}
		.btn-container {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		
			.btn {
				position: absolute;
				bottom: .2rem;
				width: 1.1rem;
				height: .3rem;
				font-size: .12rem;
			}
		}
		.active{
			background-color: #e3e3e3;
		}
	}
</style>
