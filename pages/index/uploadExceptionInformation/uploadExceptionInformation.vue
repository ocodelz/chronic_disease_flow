<template>
	<view>
		<u-popup v-model="isShows" mode="center" @close="handlePopupClose" border-radius="8">
			<view class="container">
				<text class="title">请准确填写您的异常信息</text>
				<scroll-view scroll-y class="scroll">
					<view class="content">
						<view class="textarea">
							<textarea auto-height placeholder="请输入异常信息" class="input" maxlength="150"
								@input="handleTextareaInput" v-model="value" placeholder-class="placeholder" />
							<text class="num">已输入{{num}}/150</text>
						</view>
					</view>
					<view class="main">
						<view class="img-box" v-for="(item,index) in imgList" :key="index">
							<u-image :src="item" width="150" height="150" @click="preview(item)"></u-image>
							<view @click="deleteImage(item)" class="del-img">
								<u-icon name="close" size="20" color="#fff"></u-icon>
							</view>
						</view>
						<view v-if="imgList.length < 9" class="add-img" @click="chooseImage">
							<view class="add-img-icon">
								<text style="font-size: 150rpx;">+</text>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="btn-container">
					<u-button class="btn" type="primary" @click="">提交</u-button>
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
				isShows: false,
				value: '',
				num: 0,
				imgList: [],
				uploadImgUrl:[]
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
					// console.log(this.isShows);
				}
			}
		},
		methods: {
			// 关闭蒙版
			handlePopupClose() {
				this.$emit('close');
			},
			// 输入框已输入多少文字
			handleTextareaInput(e) {
				this.num = e.target.value.length;
			},
			// 预览图片
			preview(item) {
				uni.previewImage({
					current: item,
					urls: this.imgList
				})
			},
			// 删除图片
			deleteImage(item) {
				uni.showModal({
					content: '是否要删除该图片?',
					success: (res) => {
						if (res.confirm) {
							let index = this.imgList.findIndex(url => url === item);
							if (index !== -1) {
								this.imgList.splice(index, 1)
								// this.$emit('update', this.imglist)
							}
						}
					}
				})
			},
			// 从相册选择图片，或者拍照
			chooseImage() {
				uni.chooseImage({
					count: 9 - this.imgList.length,
					success: (chooseImageRes) => {
						this.imgList = [...this.imgList, ...chooseImageRes.tempFilePaths]
					}
				});
				console.log(this.imgList);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 5rem;
		height: 3rem;

		.title {
			display: flex;
			align-items: center;
			justify-content: center;
			// margin-top: .1rem;
			padding-top: .15rem;
			font-weight: bold;
		}

		.scroll {
			width: 100%;
			height: 2.2rem;

			.content {
				display: flex;
				align-items: center;
				justify-content: center;

				.textarea {
					border: 1rpx solid #e3e3e3;
					width: 96%;
					height: 1rem;
					border-radius: 8rpx;
					position: relative;
					margin-top: .1rem;

					.input {
						width: 100%;
						padding: 10rpx;
					}

					.num {
						position: absolute;
						right: 10rpx;
						bottom: 10rpx;
						color: #ccc;
						font-size: .12rem;
					}

					.placeholder {
						font-size: .14rem;
					}
				}
			}
			
			.main {
				display: flex;
				flex-wrap: wrap;
				margin-left: .1rem;
			
				.img-box {
					width: 160rpx;
					display: flex;
					align-items: flex-end;
					justify-content: center;
					padding-top: .1rem;
					position: relative;
			
					.del-img {
						width: 30rpx;
						height: 30rpx;
						position: absolute;
						top: 10rpx;
						right: 0;
						background-color: rgba(0, 0, 0, .5);
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 50%;
					}
				}
			
				.add-img {
					width: 160rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: .1rem;
			
					.add-img-icon {
						width: 150rpx;
						height: 150rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: #e3e3e3;
						border-radius: 8rpx;
					}
				}
			}
		}

		.btn-container {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.btn {
				position: absolute;
				bottom: .15rem;
				width: 1.1rem;
				height: .3rem;
				font-size: .12rem;
			}
		}
	}
</style>
