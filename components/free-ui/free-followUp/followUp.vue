<template>
	<view class="follow-up-wrap">
		<view class="content" v-if="content">
			<text class="txt">{{info}}</text>
			<u-button v-if="JSON.stringify(list) == '{}'" type="primary" class="btn" @click="handleTapBtn">+ 增加
			</u-button>
			<view v-else class="hypertension">
				<slot name="info"></slot>
				<view class="btn" @click="handleTapBtn">
					<text class="iconfont" v-if="list.length">{{icon}}</text>
					<text class="item">{{btn}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: {
				type: String,
				default: ''
			},
			btn: {
				type: String,
				default: '+ 增加'
			},
			list: {
				type: [Object,Array],
				default: () => {
					return {}
				}
			},
			icon: {
				type: String,
				default: ''
			},
			content: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			handleTapBtn() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.follow-up-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.content {
			background-color: #fff;
			padding: .15rem 0 .15rem 0;
			border-radius: 18rpx;
			margin-bottom: .15rem;
			width: 96%;

			.txt {
				font: 600 .16rem/.16rem '微软雅黑';
				margin-left: .2rem;
			}

			.btn {
				width: 1rem;
			}

			.hypertension {
				width: 80%;
				display: flex;
				justify-content: space-between;
				margin-left: .5rem;
				font-size: .12rem;
				align-items: center;



				.btn {
					width: 1rem;
					height: .4rem;
					background-color: #007AFF;
					border-radius: 12rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-left: .4rem;
					color: #fff;
					.icon {
						font-size: .18rem;
					}

					.item {
						font-size: .14rem;
					}
				}
			}
		}
	}
</style>
