<template>
	<scroll-view class="wrap" scroll-y>
		<view v-if="state == '0'">
			<free-title title="艾滋病随访列表"></free-title>
			<followUp :content="false"></followUp>
			<view class="container">
				<view class="content">
					<view class="main">
						<text class="title">搜索条件</text>
						<view class="action-bar">
							<text class="name">随访日期</text>
							<input :disabled="true" v-model="create_time" @click="handleTapFollowTime('fy')" />
							<view class="search" @click="handleAction('search')">
								<text class="iconfont search-txt">&#xe654;</text>
								<text class="name" @click="handleSearchBtnAidsDrugsList">搜索</text>
							</view>
							<view class="search" @click="handleAction('add')">
								<text class="iconfont search-txt">&#xe608;</text>
								<text class="name">添加服药记录</text>
							</view>
						</view>
					</view>
					<view class="table-wrap">
						<view class="table-head">
							<view class="th">建档日期</view>
							<view class="th">监督员姓名</view>
							<view class="th">监督员性别</view>
							<view class="th">监督员电话</view>
							<view class="th">两者之前关系</view>
							<view class="th">操作</view>
						</view>
						<scroll-view scroll-y class="main" v-if="fyTable.length">
							<view class="main-cell" v-for="(item,index) in fyTable" :key="index">
								<view class="main-cell-item">{{item.create_time}}</view>
								<view class="main-cell-item">{{item.supervisor_name}}</view>
								<view class="main-cell-item">{{item.supervisor_sex}}</view>
								<view class="main-cell-item">{{item.supervisor_tel}}</view>
								<view class="main-cell-item">{{item.relative}}</view>
								<view class="main-cell-item main-cell-item1">
									<view class="edit" @click="handleTapEditBtn(item,'fy')">编辑</view>
									<view class="del" @click="handleTapDelFyCell(item)">删除</view>
								</view>
							</view>
						</scroll-view>
						<view v-if="!fyTable.length" class="data-status">无数据</view>
						<view class="bottom" v-if="fyPagination.total > 1">
							<text class="previous-page" @click="handleFyPreviousPage"><</text>
							<text class="current-page">{{fyPagination.page}}</text>
							<text class="next-page" @click="handleFyNextPage">></text>
							<text class="txt">到第</text>
							<input type="text" v-model="fyPageModel" :adjust-position="false">
							<text class="txt">页</text>
							<view class="determine">确定</view>
						</view>
					</view>
				</view>
			</view>
			<view class="container">
				<view class="content">
					<view class="main">
						<text class="title">搜索条件</text>
						<view class="action-bar">
							<text class="name">随访日期</text>
							<input :disabled="true" v-model="follow_time" @click="handleTapFollowTime('sf')" />
							<view class="search" @click="handleAction('search')">
								<text class="iconfont search-txt">&#xe654;</text>
								<text class="name" @click="handleSearchBtnAidsFollowList">搜索</text>
							</view>
							<view class="search" @click="handleAction('addsf')">
								<text class="iconfont search-txt">&#xe608;</text>
								<text class="name">添加随访</text>
							</view>
						</view>
					</view>
					<view class="table-wrap">
						<view class="table-head">
							<view class="th">随访日期</view>
							<view class="th">随访人员</view>
							<view class="th" style="flex: 2;">操作</view>
						</view>
						<scroll-view scroll-y class="main" v-if="table.length">
							<view class="main-cell" v-for="(item,index) in table" :key="index">
								<view class="main-cell-item">{{item.follow_time}}</view>
								<view class="main-cell-item">{{item.follow_doctor_name}}</view>
								<view class="main-cell-item main-cell-item1" style="flex: 2;justify-content: start;">
									<view class="edit" @click="handleTapEditBtn(item,'sf')">编辑</view>
									<view class="del" @click="handleTapDelSfCell(item)">删除</view>
								</view>
							</view>
						</scroll-view>
						<view v-if="!table.length" class="data-status">无数据</view>
						<view class="bottom" v-if="sfPagination.total > 1">
							<text class="previous-page" @click="handlePreviousPage"><</text>
							<text class="current-page">{{sfPagination.page}}</text>
							<text class="next-page" @click="handleNextPage">></text>
							<text class="txt">到第</text>
							<input type="text" v-model="sfPageModel" :adjust-position="false">
							<text class="txt">页</text>
							<view class="determine">确定</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<AIDSMedicationRecord v-if="state == 'AIDSMedicationRecord'"></AIDSMedicationRecord>
		<AIDSFollowUpDetails v-if="state == 'AIDSFollowUpDetails'"></AIDSFollowUpDetails>
		<u-picker v-model="isSearchPicker" mode="time" @confirm="handleConfirmPicker"></u-picker>
	</scroll-view>
</template>

<script>
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import followUp from '@/components/free-ui/free-followUp/followUp.vue';
	import AIDSMedicationRecord from '../AIDSMedicationRecord/AIDSMedicationRecord.vue';
	import AIDSFollowUpDetails from '../AIDSFollowUpDetails/AIDSFollowUpDetails.vue';
	export default {
		components: {
			freeTitle,
			followUp,
			AIDSMedicationRecord,
			AIDSFollowUpDetails
		},
		data() {
			return {
				state: '0',
				follow_time: '',
				create_time: '',
				fyPageModel: '1',
				sfPageModel: '1',
				isSearchPicker: false,
				fyPagination: {
					rows: 10,
					page: 1,
					sidx: '',
					sord: '',
					records: 0,
					total: 0
				},
				sfPagination: {
					rows: 10,
					page: 1,
					sidx: '',
					sord: '',
					records: 0,
					total: 0
				},
				person_id: '',
				table: [],
				fyTable: [],
				item: ''
			}
		},
		mounted() {
			let res = uni.getStorageSync('login_info');
			// console.log(res);
			if (res !== '') {
				this.person_id = res[0].id;
			}
			// 获取随访搜索列表信息
			this.handleSearchAidsFollowList();
			// 获取服药搜索列表信息
			this.handleSearchAidsDrugsList();
		},
		methods: {
			// 点击 输入框 （开始时间 结束时间）
			handleTapFollowTime(item) {
				this.item = item;
				this.isSearchPicker = true;
			},
			// 日期
			handleConfirmPicker(e) {
				let year = e.year,
					month = e.month,
					day = e.day;
				if (this.item == 'sf') {
					this.follow_time = year + '-' + month + '-' + day;
				} else {
					this.create_time = year + '-' + month + '-' + day;
				}
			},
			handleAction(item) {
				uni.removeStorageSync('edit');
				if (item == 'add') {
					this.state = 'AIDSMedicationRecord';
				}
				if (item == 'addsf') {
					this.state = 'AIDSFollowUpDetails'
				}
			},
			// 点击 编辑按钮
			handleTapEditBtn(item, state) {
				uni.setStorageSync('edit', item)
				if (state == 'sf') {
					this.state = 'AIDSFollowUpDetails';
				}
				if (state == 'fy') {
					this.state = 'AIDSMedicationRecord';
				}
			},
			handleSearchBtnAidsFollowList(){
				this.sfPagination.page = 1;
				this.handleSearchAidsFollowList();
			},
			// 随访列表 显示
			handleSearchAidsFollowList() {
				let data = {
					person_id: this.person_id,
					paginationobj: JSON.stringify(this.sfPagination),
					follow_time: this.follow_time
				}
				// console.log(data);
				this.follow_time = '';
				this.$u.post('SearchAidsFollowList', data).then(res => {
					console.log(res);
					if (res.code == 200 && res.info == '响应成功' && res.data.infoList.length) {
						this.sfPagination.total = res.data.pageTotal;
						let arr = [];
						res.data.infoList.forEach(item => {
							if (item.follow_time !== '') {
								item.follow_time = /\d{4}-\d{1,2}-\d{1,2}/g.exec(item.follow_time).join(
									',');
							}
							arr.push(item)
						})
						this.table = arr;
					}
					if (res.code == 200 && res.info == '响应成功' && res.data.infoList.length == 0) {
						return this.$lz.toast('没有更多数据了');
					}
				}).catch(err => {
					console.log(err);
				})
			},
			// 切换列表显示页数 上一页(服药)
			handleFyPreviousPage() {
				if (this.fyPagination.page !== 1) {
					this.fyPagination.page--;
					this.handleSearchAidsDrugsList();
				} else {
					return this.$lz.toast('当前已经是' + this.fyPagination.page + '页了哦');
				}
			},
			// 切换列表显示页数 下一页(服药)
			handleFyNextPage() {
				if (this.fyPagination.page < this.fyPagination.total) {
					this.fyPagination.page++;
					this.handleSearchAidsDrugsList();
				} else {
					return this.$lz.toast('没有更多数据了!');
				}
			},
			// 切换列表显示页数 下一页
			handleNextPage() {
				if (this.sfPagination.page < this.sfPagination.total) {
					this.sfPagination.page++;
					this.handleSearchAidsFollowList();
				} else {
					return this.$lz.toast('没有更多数据了!');
				}
			},
			// 切换列表显示页数 上一页
			handlePreviousPage() {
				if (this.sfPagination.page == 1) {
					this.$lz.toast('已经是第一页了哦');
				} else {
					this.sfPagination.page--;
					this.handleSearchAidsFollowList();
				}
			},
			// 删除列表信息 服药
			handleTapDelFyCell(item) {
				this.$u.post('DelAidsDrug', {
					id: item.id
				}).then(res => {
					if (res.code == 200 && res.data == true) {
						this.$lz.toast(res.info);
						this.fyTable = [];
						this.fyPagination.page = 1;
						this.handleSearchAidsDrugsList();
					}
				}).catch(err => {
					console.log(err);
				})
			},
			// 删除列表信息 随访
			handleTapDelSfCell(item) {
				this.$u.post('DelAidsFollow', {
					follow_id: item.follow_id
				}).then(res => {
					console.log(res);
					if (res.code == 200 && res.data == true) {
						this.$lz.toast(res.info);
						this.table = [];
						this.sfPagination.page = 1;
						this.handleSearchAidsFollowList();
					}
				}).catch(err => {
					console.log(err);
				})
			},
			
			handleSearchBtnAidsDrugsList(){
				this.fyTable = [];
				this.fyPagination.page = 1;
				this.handleSearchAidsDrugsList();
			},
			// 列表搜索 服药
			handleSearchAidsDrugsList() {
				let data = {
					person_id: this.person_id,
					paginationobj: JSON.stringify(this.fyPagination),
					create_time: this.create_time
				}
				this.create_time = '';
				this.$u.post('SearchAidsDrugsList', data).then(res => {
					console.log(res);
					if (res.code == 200 && res.info == '响应成功' && res.data.infoList.length) {
						this.fyPagination.total = res.data.pageTotal;
						let arr = [];
						res.data.infoList.forEach(item => {
							if (item.create_time !== '') {
								item.create_time = /\d{4}-\d{1,2}-\d{1,2}/g.exec(item.create_time).join(
									',');
							}
							arr.push(item)
						})
						// this.table = this.table.concat(arr);
						this.fyTable = arr;
					}
					if (res.code == 200 && res.info == '响应成功' && res.data.infoList.length == 0) {
						return this.$lz.toast('没有更多数据了');
					}
				}).catch(err => {
					console.log(err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 100%;
		height: calc(100vh - .5rem);
		background-color: #f0f0f0;
		display: flex;
		justify-content: center;
		font-size: .14rem;

		.container {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			margin: .1rem 0;

			.content {
				width: 96%;
				background-color: #fff;
				border-radius: 16rpx;
				padding: .15rem;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				margin-bottom: .1rem;

				.main {
					.title {
						font-size: .15rem;
					}

					.action-bar {
						display: flex;
						align-items: center;
						margin: .1rem 0;

						.name {
							width: .9rem;
							text-align: right;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 1.6rem;
							margin-left: .1rem;
						}

						.search {
							height: .35rem;
							background-color: #007AFF;
							border-radius: 12rpx;
							line-height: .35rem;
							padding: 0 .15rem;
							color: #fff;
							margin-left: .1rem;
						}
					}
				}

				.table-wrap {
					width: 100%;
					border: 1rpx solid #e3e3e3;

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
								flex-shrink: 0;
								flex: 1;
								height: .4rem;
								padding-left: .1rem;
								line-height: .4rem;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}

							.main-cell-item1 {
								display: flex;
								align-items: center;
								justify-content: space-around;
							}

							.edit,
							.del {
								display: flex;
								align-items: center;
								height: .3rem;
								background-color: #33ccff;
								padding: 0 .1rem;
								border-radius: 8rpx;
								margin-right: .1rem;
							}

							.del {
								background-color: #ff5722;
							}
						}

						// .main-cell:not(:last-child) {
						// 	border-bottom: 1rpx solid #e3e3e3;
						// }

						.main-cell-item:not(:last-child) {
							border-right: 1rpx solid #e3e3e3;
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

						.determine {
							width: .5rem;
							height: .26rem;
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: .12rem;
						}
					}
				}
			}
		}
	}
</style>
