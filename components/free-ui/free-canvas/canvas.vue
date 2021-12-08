<template>
	<view class="wrap">
		<view class="title">请在下面输入签名：</view>
		<canvas class="mycanvas" canvas-id="mycanvas" @touchstart="touchstart" @touchmove="touchmove"
			@touchend="touchend" disable-scroll></canvas>
		<view v-if="url.length">
			<image style="width: 1.2rem;height: .5rem;" :src="url"></image>
		</view>
		<view class="footer">
			<view class="btn" @click="finish">完成</view>
			<view class="btn" @click="previewImage">预览</view>
			<view class="btn" @click="clear">清除</view>
			<view class="btn" @click="close">关闭</view>
		</view>
	</view>
</template>

<script>
	var x = 20;
	var y = 20;
	export default {

		data() {
			return {
				ctx: '', //绘图图像
				points: [], //路径点集合 
				url: ''
			}
		},
		mounted() {
			this.ctx = uni.createCanvasContext("mycanvas", this); //创建绘图对象

			//设置画笔样式
			this.ctx.lineWidth = 4;
			this.ctx.lineCap = "round"
			this.ctx.lineJoin = "round"
		},
		methods: {
			//触摸开始，获取到起点
			touchstart(e) {
				let startX = e.changedTouches[0].x;
				let startY = e.changedTouches[0].y;
				let startPoint = {
					X: startX,
					Y: startY
				};

				/* **************************************************
					#由于uni对canvas的实现有所不同，这里需要把起点存起来
				 * **************************************************/
				this.points.push(startPoint);

				//每次触摸开始，开启新的路径
				this.ctx.beginPath();
			},

			//触摸移动，获取到路径点
			touchmove(e) {
				let moveX = e.changedTouches[0].x;
				let moveY = e.changedTouches[0].y;
				let movePoint = {
					X: moveX,
					Y: moveY
				};
				this.points.push(movePoint); //存点
				let len = this.points.length;
				if (len >= 2) {
					this.draw(); //绘制路径
				}

			},

			// 触摸结束，将未绘制的点清空防止对后续路径产生干扰
			touchend() {
				this.points = [];
			},

			/* ***********************************************
			#   绘制笔迹
			#	1.为保证笔迹实时显示，必须在移动的同时绘制笔迹
			#	2.为保证笔迹连续，每次从路径集合中区两个点作为起点（moveTo）和终点(lineTo)
			#	3.将上一次的终点作为下一次绘制的起点（即清除第一个点）
			************************************************ */
			draw() {
				let point1 = this.points[0]
				let point2 = this.points[1]
				this.points.shift()
				this.ctx.moveTo(point1.X, point1.Y)
				this.ctx.lineTo(point2.X, point2.Y)
				this.ctx.stroke()
				this.ctx.draw(true)
			},

			//清空画布
			clear() {
				let that = this;
				uni.getSystemInfo({
					success: (res) => {
						let canvasw = res.windowWidth;
						let canvash = res.windowHeight;
						that.ctx.clearRect(0, 0, canvasw, canvash);
						that.ctx.draw(true);
						this.url = '';
					}
				})
			},
			// 预览
			previewImage() {
				setTimeout(() => {
					uni.canvasToTempFilePath({
						canvasId: 'mycanvas',
						destWidth: 750,
						destHeight: 325,
						quality: 1,
						fileType: 'jpg',
						success: (res) => {
							this.url = res.tempFilePath
							console.log(this.url);
						}
					})
				}, 500)
			},
			finish() {
				this.$emit('finish')
			},
			close(){
				this.$emit('close');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		position: fixed;
		top: .5rem;
		bottom: 0;
		left: .9rem;
		right: 0;
		width: 100%;
		height: 100vh;
		z-index: 9999999999;

		.title {
			height: .25rem;
			/* line-height: 50upx; */
			/* font-size: 16px; */
			font-size: .14rem;
		}

		.mycanvas {
			width: 100%;
			height: calc(100vh - 2.5rem);
			background-color: #ECECEC;
		}

		.footer {
			font-size: .1rem;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: .4rem;
			.btn {
				height: .4rem;
				width: 1.2rem;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: bold;
				color: white;
				margin-right: .9rem;
			}
			.btn:first-child {
				background: #007AFF;
			}
			
			.btn:nth-child(2) {
				background: #4CD964;
			}
			.btn:nth-child(3) {
				background: orange;
			}
			
			.btn:last-child {
				background: #f00;
			}
		}
	}
</style>
