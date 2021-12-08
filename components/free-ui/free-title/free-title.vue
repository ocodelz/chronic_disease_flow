<template>
	<view class="wrap-title">
		<view class="content">
			<text class="title">{{title}}</text>
			<view v-if="isRight" style="display: flex;">
				<view class="iconfont right" hover-class="hoverClass" @click="handleSubmit">&#xe807;</view>
				<!-- <view>快速导航</view> -->
				<view v-if="camera" class="iconfont right" hover-class="hoverClass" @click="handleCamera">&#xe606;</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			isRight: {
				type: Boolean,
				default: false
			},
			camera: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			handleSubmit() {
				console.log('点击了按钮');
			},
			handleCamera(){
				uni.chooseImage({
					count: 1,
					sourceType: ['camera'],
					success: res => {
						console.log(res);
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePaths[0],
							success: res => {
								console.log('save success');
								// this.picture_status = '1';
							}
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap-title {
		width: 100%;
		height: .6rem;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: .25rem 0rem .25rem .3rem;

		.content {
			width: 96%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.title {
				font-size: .18rem;
				font-weight: 600;
				width: 100%;
			}

			.right {
				width: .5rem;
				height: .35rem;
				background-color: #7ed2ff;
				margin-right: .1rem;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 14rpx;
			}
			.hoverClass{
				color: #fff;
			}
		}
	}
</style>
