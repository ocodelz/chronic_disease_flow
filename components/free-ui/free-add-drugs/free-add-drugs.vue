<template>
	<view class="popup-wrap">
		<u-popup v-model="isFreeAddDrugs" mode="center" @close="handleTapClosePopup" width="60%" height="80%"
			border-radius="8">
			<view class="container">
				<view class="head">
					<text class="title">{{title}}</text>
				</view>
				<view class="main" v-for="(item,index) in drugForm" :key="index">
					<text class="name">{{item.name}}</text>
					<view class="input-box">
						<input v-model="item.value" :adjust-position="false" />
						<text v-if="item.select" class="iconfont select"
							@click="handleTapSelectIcon(item.name)">{{item.select}}</text>
					</view>
				</view>
				<view class="btn-box">
					<u-button class="btn" @click="handleSubmitBtn" type="primary">保存</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		/*
			添加用药组件
			以下为参数说明：
				- title 标题名称
				- 是否显示组件 isFreeAddDrugs
				- 数据 drugForm
		*/
		props: {
			title: {
				type: String,
				default: '添加用药'
			},
			isFreeAddDrug: {
				type: Boolean,
				default: false
			},
			drugForm: {
				type: [Object, Array],
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				isFreeAddDrugs: false
			}
		},
		mounted() {
			this.isFreeAddDrugs = this.isFreeAddDrug;
		},
		watch: {
			isFreeAddDrug: {
				immediate: true,
				handler(val) {
					this.isFreeAddDrugs = val;
					// console.log(this.isFreeAddDrugs);
				}
			}
		},
		methods: {
			handleTapClosePopup() {
				this.$emit('close');
			},
			handleSubmitBtn() {
				this.$emit('click');
			},
			handleTapSelectIcon(item) {
				this.$emit('slectClick', item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-wrap {
		width: 100%;
		font-size: .12rem;

		.container {
			width: 100%;
			height: 100%;
			border-radius: 8rpx;
			background-color: #ebf0ef;

			.head {
				width: 100%;
				background-color: #01ba7d;
				height: .35rem;
				display: flex;
				align-items: center;
				padding-left: .2rem;

				.title {
					color: #fff;
					font-size: .14rem;
				}
			}

			.main {
				width: 100%;
				display: flex;
				align-items: center;
				margin-top: .2rem;

				.name {
					flex-shrink: 0;
					width: 1.55rem;
					text-align: right;
				}

				.input-box {
					width: 4rem;
					height: .3rem;
					background-color: #fff;
					border-radius: 8rpx;
					display: flex;
					align-items: center;

					&>input {
						border: 1rpx solid #e3e3e3;
						border-radius: 8rpx;
						font-size: .12rem;
						height: 100%;
						width: 100%;
					}

					.select {
						width: .5rem;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						padding-right: 10rpx;
						color: #ccc;
					}
				}
			}

			.btn-box {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: .2rem;

				.btn {
					width: 1.1rem;
					height: .35rem;
				}
			}
		}
	}
</style>
