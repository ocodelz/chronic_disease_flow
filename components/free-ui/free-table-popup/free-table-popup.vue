<template>
	<view class="popup-wrap">
		<u-popup v-model="isPopups" mode="center" @close="handlePopupClose" width="90%" :height="searchBars == true ? '94%' : '80%'" border-radius="8">
			<view class="container">
				<view class="head">
					<text class="title">{{title}}</text>
				</view>
				<view v-if="searchBars == true" style="width: 100%;padding: .15rem 0 0 .1rem;">
					<view style="">搜索条件</view>
					<view style="display: flex;align-items: center;padding: .1rem 0 .15rem .9rem;">
						<text>药物名称</text>
						<input v-model="drugNames" style="width: 1.5rem;border: 1rpx solid #e3e3e3;border-radius: 8rpx;
					font-size: .12rem;
					padding: 20rpx 0 20rpx 20rpx;
					margin-left: .1rem;
					margin-right: .1rem;" />
					<view class="btn-box">
						<view class="btn" @click="handleTapSearchBtn">
							<text class="iconfont icon-sousuo1 icon"></text>
							<text class="item">搜索</text>
						</view>
						<view class="btn">
							<text class="iconfont icon-jia icon"></text>
							<text class="item" @click="handleTapAdddrugs">添加</text>
						</view>
					</view>
					</view>
				</view>
				<view class="table-wrap">
					<view class="table-head">
						<view class="th" v-for="(item,index) in tableHead" :key="index"
						:style="item.th == '操作' ? 'flex: 1.16;' : 'flex:1;'">
							<view class="th" :style="item.th == '操作' ? 'flex: 1.16;' : 'flex:1;'">{{item.th}}</view>
						</view>
					</view>
					<scroll-view scroll-y class="main">
						<view class="main-cell" v-for="(item,index) in tableContents" :key="index">
							<view v-for="(item1,index1) in tableHead" :key="index1" class="main-cell-item"
							:style="item1.key == 'operation' ? 'flex:1.16;' : 'flex:1;'">
								<view v-if="item1.key == 'operation'" class="operation">
									<view class="edit" @click="handleTabEditItem(item)">编辑</view>
									<view class="select-btn" @click="handleTapSelectItem(item)">选择</view>
									<view class="del" @click="handleTabDelItem(item,index)">删除</view>
								</view>
								<view v-if="item1.key !== 'operation'">
									{{item[item1.key]}}
								</view>
							</view>
						</view>
					</scroll-view>
					<!-- <view class="data-status" v-if="!tableContents.length">无数据</view> -->
					<view class="bottom" v-if="pagination.total > 1">
						<text class="previous-page" @click="handlePreviousPage"><</text>
						<text class="current-page">{{paginations.page}}</text>
						<text class="next-page" @click="handleNextPage">></text>
						<text class="txt">到第</text>
						<input type="text" v-model="pageModels" :adjust-position="false">
						<text class="txt">页</text>
						<view class="determine" @click="handleTapPageJumpBtn">确定</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: {
			isPopup: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			},
			tableHead: {
				type: [Array, Object],
				default: () => {
					return []
				}
			},
			tableContent: {
				type: [Array,Object],
				default: () => {
					return []
				}
			},
			searchBar: {
				type: Boolean,
				default: false
			},
			drugName: {
				type: String,
				default: ''
			},
			pagination:{
				type: [Object,Array],
				default: () => {
					return {}
				}
			},
			pageModel: {
				type: [String,Number],
				default: ''
			}
		},
		data() {
			return {
				isPopups: false,
				searchBars: false,
				drugNames: '',
				pageModels: '',
				tableContents: [],
				paginations: {}
			}
		},
		mounted() {
			this.isPopups = this.isPopup;
			this.searchBars = this.searchBar;
			this.tableContents = this.tableContent;
			this.drugNames = this.drugName;
			this.paginations = this.pagination;
			this.pageModels = this.pageModel;
		},
		watch: {
			isPopup: {
				immediate: true,
				handler(val) {
					this.isPopups = val;
					// console.log(this.isPopups);
				}
			},
			searchBar: {
				immediate: true,
				handler(val) {
					this.searchBars = val;
					// console.log(this.searchBars);
				}
			},
			drugName: {
				immediate: true,
				handler(val) {
					this.drugNames = val;
					// console.log(this.drugNames);
				}
			},
			pagination: {
				immediate: true,
				handler(val) {
					this.paginations = val;
					// console.log(this.paginations);
				}
			},
			pageModel: {
				immediate: true,
				handler(val) {
					this.pageModels = val;
					// console.log(this.pageModels);
				}
			},
			tableContent: {
				immediate: true,
				handler(val) {
					this.tableContents = val;
					// console.log(this.tableContents);
				}
			}
		},
		methods: {
			handlePopupClose() {
				this.$emit('close');
			},
			handleTapAdddrugs(){
				this.$emit('click');
			},
			handleTapSearchBtn(){
				this.$emit('search',this.drugNames);
			},
			handleTabDelItem(item,index){
				this.$emit('delItem',item,index);
			},
			handleTabEditItem(item){
				this.$emit('editItem',item);
			},
			handleTapPageJumpBtn(){
				this.$emit('pageJump',this.pageModels);
			},
			handlePreviousPage(){
				this.$emit('previousPage');
			},
			handleNextPage(){
				this.$emit('nextPage');
			},
			handleTapSelectItem(item){
				this.$emit('selectItem',item);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-wrap {
		width: 100%;

		.container {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			.head {
				width: 100%;
				background-color: #01ba7d;
				height: .3rem;
				display: flex;
				align-items: center;
				padding-left: .2rem;

				.title {
					color: #fff;
					font-size: .14rem;
				}
			}

			.table-wrap {
				width: 98%;
				border: 1rpx solid #e3e3e3;
				margin-top: .1rem;

				.table-head {
					border-bottom: 1rpx solid #e3e3e3;
					background-color: #f0f0f0;
					display: flex;
					align-items: center;
					height: .4rem;

					.th {
						display: flex;
						align-items: center;
						font-weight: 500;
						flex: 1;
						padding-left: .1rem;
						height: 100%;
					}

					.th:not(:last-child) {
						border-right: 1rpx solid #e3e3e3;
					}
				}

				.main {
					display: flex;
					height: 3.25rem;

					.main-cell {
						display: flex;
						border-bottom: 1rpx solid #e3e3e3;

						.main-cell-item {
							height: .4rem;
							display: flex;
							align-items: center;
							flex-wrap: nowrap;
							flex-shrink: 0;
							flex: 1;
							overflow: hidden;
							text-overflow: ellipsis;
							.operation {
								display: flex;
								align-items: center;
								.del,
								.select-btn,
								.edit {
									display: flex;
									align-items: center;
									justify-content: center;
									background-color: #ff5722;
									width: .4rem;
									height: .3rem;
									border-radius: 8rpx;
									margin-left: .1rem;
								}

								.edit {
									background-color: #33ccff;
								}
								.select-btn{
									background-color: #fcbd71;
								}
							}
						}
					}
					.main-cell-item:last-child {
						padding-right: .1rem;
					}
					.main-cell-item:not(:last-child) {
						border-right: 1rpx solid #e3e3e3;
						padding-left: .1rem;
					}
				}

				.data-status {
					height: .35rem;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #ccc;
					font-size: .12rem;
				}

				.bottom {
					display: flex;
					align-items: center;
					height: .4rem;
					border-top: 1rpx solid #e3e3e3;
					padding-left: .1rem;
					.previous-page,
					.next-page {
						color: #ccc;
						margin-right: .1rem;
					}
					.next-page {
						margin-left: .1rem;
					}
					.txt {
						color: #ccc;
						margin-right: .1rem;
					}
					&>input {
						border: 1rpx solid #e3e3e3;
						border-radius: 8rpx;
						font-size: .12rem;
						width: .4rem;
						text-align: center;
						height: .25rem;
						margin-right: .1rem;
					}
				}
			}
		}
		.btn-box {
			display: flex;
		
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
</style>
