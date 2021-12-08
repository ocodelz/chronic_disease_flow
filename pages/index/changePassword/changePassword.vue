<template>
	<view>
		<u-popup v-model="isShows" mode="center" @close="handlePopupClose" border-radius="8">
			<view class="container">
				<input 
					class="input" 
					type="text" 
					v-model="pwdone"
					placeholder="请输入密码"
					:adjust-position="false"
				/>
				<input 
					class="input" 
					type="text" 
					v-model="pwdtwo"
					placeholder="请再次输入密码"
					:adjust-position="false"
				/>
				<view class="btn-container">
					<u-button class="btn" @click="handleSubmitBtn" type="primary">保存</u-button>
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
				pwdone:'',
				pwdtwo:'',
				phone:'',
				password:''
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
				}
			}
		},
		methods:{
			// 关闭蒙版
			handlePopupClose(){
				this.$emit('close');
			},
			// 发起修改密码网络请求
			handleSubmitBtn(){
				if (this.$u.test.contains(this.pwdone, ' ') || this.pwdone.length < 6 || 
				this.$u.test.contains(this.pwdtwo, ' ') || this.pwdtwo.length < 6) {
					return this.$lz.toast('请输入合法的用户密码');
				}
				if(this.pwdone !== this.pwdtwo){
					return this.$lz.toast('两次密码必须相同');
				}
				let res = uni.getStorageSync('user_info');
				let obj = {
					phone: res[0].phone,
					password: this.pwdtwo
				}
				this.$u.post('UpdateDocPW',obj).then(res => {
					this.$lz.toast(res.info);
					uni.setStorageSync('user_info',res.data)
					this.isShows = false;
					console.log(res);
				}).catch(err => {
					this.$lz.toast(err.errMsg);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 3rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.input{
			border: 1rpx solid #e3e3e3;
			border-radius: 8rpx;
			font-size: .12rem;
			padding: 12rpx 0 12rpx 20rpx;
			width: 86%;
			margin-bottom: .1rem;
			margin-top: .1rem;
		}
		.btn-container{
			width: 50%;
			margin-top: .15rem;
			.btn{
				height: .3rem;
			}
		}
	}
</style>
