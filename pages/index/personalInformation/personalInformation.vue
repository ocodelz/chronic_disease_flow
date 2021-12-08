<template>
	<view>
		<u-popup v-model="isShows" mode="center" @close="handlePopupClose" border-radius="8">
			<view class="container">
				<view class="content">
					<view class="left">
						<image class="img" src="https://z3.ax1x.com/2021/05/16/gcHRpT.png"></image>
						<text class="item">医生编号</text>
					</view>
					<text class="right">编号：{{list[0].doctor_id}}</text>
				</view>
				<view class="content">
					<view class="left">
						<image class="img" src="https://z3.ax1x.com/2021/05/16/gcHghV.png"></image>
						<text class="item">姓名</text>
					</view>
					<text class="right">{{list[0].doctor_name}}</text>
				</view>
				<view class="content">
					<view class="left">
						<image class="img" src="https://z3.ax1x.com/2021/05/16/gcHct0.png"></image>
						<text class="item">所属医院</text>
					</view>
					<text class="right">{{list[0].hospital}}</text>
				</view>
				<view class="content">
					<view class="left">
						<image class="img" src="https://z3.ax1x.com/2021/05/16/gcHW1U.png"></image>
						<text class="item">所属部门</text>
					</view>
					<text class="right">{{list[0].dept}}</text>
				</view>
				<view class="content">
					<view class="left">
						<image class="img" src="https://z3.ax1x.com/2021/05/16/gcH6kq.png"></image>
						<text class="item">联系方式</text>
					</view>
					<text class="right">{{list[0].phone}}</text>
				</view>
				<view class="btn-container">
					<u-button class="btn"  type="primary" @click="isShows = false">关闭</u-button>
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
				list:[]
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
					let res  = uni.getStorageSync('user_info');
					this.list = res;
					// console.log(this.list);
				}
			}
		},
		methods:{
			handlePopupClose(){
				this.$emit('close');
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 5rem;
		height: 3rem;
		padding: .1rem;
		.content{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: .4rem;
			border-bottom: 1rpx solid #e3e3e3;
			.left{
				display: flex;
				align-items: center;
				.img{
					width: .2rem;
					height: .2rem;
				}
				.item{
					font-size: .13rem;
					margin-left: .1rem;
				}
			}
			.right{
				color: #ccc;
				font-size: .12rem;
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
	}
</style>
