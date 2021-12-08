<template>
	<view>
		<u-popup v-model="isShows" mode="center" @close="handlePopupClose" border-radius="6">
			<view class="container">
				<view class="head">配置登录</view>
				<view class="content">
					<view class="user">
						<text class="iconfont icon">&#xe6cc;</text>
						<input v-model="user" placeholder="请输入用户名" :adjust-position="false" />
					</view>
					<view class="user">
						<text class="iconfont icon">&#xe615;</text>
						<input v-model="pwd" placeholder="请输入密码" :adjust-position="false" />
					</view>
					<view class="btn-container">
						<u-button class="btn" ripple :hair-line="false" @click="handleTapLogin">登录</u-button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: {
			isShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				state: '0',
				isShows: false,
				user: 'admin',
				pwd: '11'
			}
		},
		mounted() {
			this.isShows = this.isShow;
		},
		watch: {
			isShow: {
				immediate: true,
				handler(val) {
					this.isShows = val;
				}
			}
		},
		methods: {
			handleTapLogin(){
				// this.isShows = false;
				this.$emit('click');
			},
			handlePopupClose() {
				this.$emit('close');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 100%;
		width: 5rem;

		.head {
			width: 100%;
			background-color: #01ba7d;
			height: .35rem;
			color: #fff;
			display: flex;
			align-items: center;
			padding-left: .2rem;
		}

		.content {
			width: 100%;
			display: flex;
			height: 2.4rem;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			.user {
				display: flex;
				align-items: center;
				position: relative;
				width: 80%;
				margin-bottom: .2rem;

				.icon {
					position: absolute;
					color: #DBF1E1;
					width: .4rem;
					left: .1rem;
				}

				&>input {
					border: 1rpx solid #e3e3e3;
					border-radius: 8rpx;
					font-size: .12rem;
					padding: 14rpx 0 14rpx 60rpx;
					width: 100%;
				}
			}

			.btn-container {
				margin-top: .1rem;

				.btn {
					width: 1.1rem;
					height: .35rem;
					background-color: #32cbfe;
					border: 1rpx solid #32cbfe;
					color: #000;
				}
			}
		}
	}
</style>
