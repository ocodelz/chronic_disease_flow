<template>
	<view class="table-wrap">
		<view class="content">
			<view>
				<text class="title">搜索条件</text>
				<view class="time">
					<text class="date">随访日期</text>
					<input v-model="searchStartTimes" type="text" disabled class="input"
						@click="handTapSearchInput('searchStartTimes')" />
					<text v-if="endTimeInput">-</text>
					<input v-if="endTimeInput" v-model="searchEndTimes" type="text" disabled class="input"
						@click="handTapSearchInput('searchEndTimes')" />
					<view class="btn-box">
						<view class="btn" @click="handleTapBtn('search')">
							<text class="iconfont icon-sousuo1 icon"></text>
							<text class="item">搜索</text>
						</view>
						<view class="btn" @click="handleTapBtn('searchAdd')"
							:style="add == '添加服药记录' ? 'width:1.2rem;':'width:1rem;'">
							<text class="iconfont icon-jia icon"></text>
							<text class="item">{{add}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="table">
				<view class="content">
					<view class="th">随访日期</view>
					<view class="th">随访方式</view>
					<view class="th">随访医生</view>
					<view class="th">下次随访日期</view>
					<view class="th">操作</view>
				</view>
				<scroll-view scroll-y class="scroll" @scrolltolower="handleScrolltolower" lower-threshold="0">
					<view v-for="(item,index) in table" :key="index" class="tbl"
						:class="current == index ? 'active' : ''" v-if="table.length" @click="current = index">
						<view class="txt">{{item.follow_time}}</view>
						<view class="txt">{{item.follow_method}}</view>
						<view class="txt">{{item.follow_doctor_name}}</view>
						<view class="txt">{{item.next_follow_time}}</view>
						<view class="txt">
							<u-button type="primary" @click="handleTapBtn('edit',item,index)" class="primary">编辑
							</u-button>
							<u-button type="error" @click="handleTapBtn('del',item,index)" class="error">删除
							</u-button>
						</view>
					</view>
					<view v-if="!table.length"
						style="display: flex;align-items: center;justify-content: center; padding-top: .2rem;">
						<text style="color: #ccc;">暂无数据</text>
					</view>
				</scroll-view>
			</view>
			<u-picker v-model="isSearchPicker" mode="time" @confirm="handleConfirmPicker"></u-picker>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			table: {
				type: Array,
				default: []
			},
			add: {
				type: String,
				default: '添加随访'
			},
			endTimeInput: {
				type: Boolean,
				default: true
			},
			searchStartTime: {
				type: String,
				default: ''
			},
			searchEndTime: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				searchStartTimes: '',
				searchEndTimes: '',
				current: -1,
				isSearchPicker: false,
				timeStatus: ''
			}
		},
		mounted() {
			this.searchStartTimes = this.searchStartTime;
			this.searchEndTimes = this.searchEndTime;
		},
		watch: {
			searchStartTime: {
				immediate: true,
				handler(val) {
					this.searchStartTimes = val;
					// console.log(this.searchStartTimes);
				}
			},
			searchEndTime: {
				immediate: true,
				handler(val) {
					this.searchEndTimes = val;
					// console.log(this.searchEndTimes);
				}
			}
		},
		methods: {
			handleTapBtn(item, i, index) {
				this.$emit('click', item, i,index)
				this.current = index
			},
			handleConfirmPicker(e) {
				this.$emit('confirm', e)
			},
			handTapSearchInput(item) {
				this.isSearchPicker = true;
				this.$emit('search', item)
			},
			handleScrolltolower(e) {
				this.$emit('scrolltolower', e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.table-wrap {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.content {
			width: 96%;
			background-color: #fff;
			border-radius: 18rpx;
			margin-bottom: .1rem;
			height: 5.3rem;

			.title {
				font: 600 .16rem/.16rem '微软雅黑';
				margin-left: .2rem;
				position: relative;
				top: .15rem;
			}

			.btn {
				width: 1rem;
			}

			.time {
				display: flex;
				align-items: center;
				margin: .15rem 0 0 .4rem;
				padding-top: .1rem;

				.date {
					font-size: .12rem;
				}

				.input {
					width: 1.5rem;
					border: 1rpx solid #e3e3e3;
					border-radius: 8rpx;
					font-size: .12rem;
					padding: 20rpx 0 20rpx 20rpx;
					margin-left: .1rem;
					margin-right: .1rem;
				}

				.btn-box {
					display: flex;

					.btn {
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

			.table {
				width: 100%;
				display: flex;
				justify-content: center;

				align-items: center;
				flex-direction: column;

				.content {
					background-color: #f0f0f0;
					width: 94%;
					margin-top: .2rem;
					height: .4rem;
					display: flex;
					align-items: center;
					border-radius: 0;
					border: 1rpx solid #e3e3e3;

					.th {
						font-weight: bold;
						flex: 1;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.th:not(:last-child) {
						border-right: 1rpx solid #e3e3e3;
					}
				}

				.scroll {
					width: 100%;
					height: 3.7rem;
					margin-top: -.1rem;

					.tbl {
						width: 94%;
						display: flex;
						align-items: center;
						justify-content: center;
						border-left: 1rpx solid #e3e3e3;
						border-right: 1rpx solid #e3e3e3;
						border-bottom: 1rpx solid #e3e3e3;
						margin-left: .26rem;

						.txt {
							display: flex;
							align-items: center;
							flex: 1;
							justify-content: center;
							border-right: 1rpx solid #e3e3e3;
							height: .4rem;

							.primary {
								width: .6rem;
								height: .3rem;
							}

							.error {
								width: .6rem;
								height: .3rem;
							}
						}

						.txt:last-child {
							border-right: 0;
							display: flex;
						}
					}
				}
			}

			.active {
				background-color: #f0f0f0;
			}
		}
	}
</style>
