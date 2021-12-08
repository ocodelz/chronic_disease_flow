<template>
	<scroll-view scroll-y class="wrap">
		<free-title title="离线下载"></free-title>
		<view class="container">
			<view class="content">
				<text class="title">搜索条件</text>
				<view class="form" v-for="(item, index) in list" :key="index"
					:style="item.state ? 'width:100%;' : 'width:50%;'">
					<text class="item">{{ item.item }}</text>
					<input :placeholder="item.placeholder" v-model="item.value1" :disabled="item.disabled"
						@click="item.item == '建档日期' ? handleTapInput(0) : ''" />
					<text v-if="item.state" style="margin-left: 0.1rem">-</text>
					<input v-if="item.state" :placeholder="item.placeholder" v-model="item.value2"
						:disabled="item.disabled" @click="handleTapInput(1)" />
				</view>
				<view class="action">
					<view class="btn" @click="handleQueryPersonalInfoList">
						<text class="iconfont icon">&#xe813;</text>
						<text class="item">搜索</text>
					</view>
					<view class="btn" @click="handleDownloadingOfflineData('batch')">
						<text class="iconfont icon">&#xe669;</text>
						<text class="item">下载</text>
					</view>
				</view>
				<!-- 表格无数据 -->
				<view class="table" v-if="!table.length">
					<view class="table-th">
						<view class="item">
							<u-checkbox v-model="allChecked"></u-checkbox>
						</view>
						<view class="item">姓名</view>
						<view class="item">性别</view>
						<view class="item">身份证号</view>
						<view class="item">电话</view>
						<view class="item">民族</view>
						<view class="item">现住址</view>
						<view class="item">户籍地址</view>
					</view>
					<scroll-view scroll-y class="scroll">
						<view class="zw">
							<text class="txt">暂无数据</text>
						</view>
					</scroll-view>
				</view>
				<!-- 有数据 -->
				<view class="scroll-table" v-if="table.length">
					<scroll-view class="scroll-table-container" scroll-x :show-scrollbar="true">
						<view class="scroll-table-content">
							<view class="scroll-table-item" style="width: 0.5rem">
								<u-checkbox-group>
									<u-checkbox v-model="allChecked" @change="handleCheckboxAll"></u-checkbox>
								</u-checkbox-group>
							</view>
							<view class="scroll-table-item">姓名</view>
							<view class="scroll-table-item">性别</view>
							<view class="scroll-table-item" style="width: 1.5rem">身份证号</view>
							<view class="scroll-table-item">电话</view>
							<view class="scroll-table-item">民族</view>
							<view class="scroll-table-item">现住址</view>
							<view class="scroll-table-item">户籍地址</view>
						</view>
						<view v-for="(item, index) in table" :key="index" class="scroll-table-body">
							<view class="scroll-table-body-item" style="width: 0.5rem">
								<u-checkbox v-model="item.checked" @change="checkboxChange($event, item)"></u-checkbox>
							</view>
							<view class="scroll-table-body-item">{{ item.name }}</view>
							<view class="scroll-table-body-item">{{ item.sex }}</view>
							<view class="scroll-table-body-item" style="width: 1.5rem">{{ item.idcard }}</view>
							<view class="scroll-table-body-item">{{ item.telephone }}</view>
							<view class="scroll-table-body-item">{{ item.nation }}</view>
							<view class="scroll-table-body-item">{{ item.current_address }}</view>
							<view class="scroll-table-body-item">{{ item.permanent_address }}</view>
						</view>
					</scroll-view>
					<!-- 操作 -->
					<view class="table-left-action">
						<view class="txt">操作</view>
						<view v-for="(item, index) in table" :key="index" class="cell">
							<view class="item" @click.stop="handleDownloadingOfflineData('cell', item)">下载</view>
						</view>
					</view>
				</view>
				<view class="bottom" v-if="table.length">
					<text class="previous-page" @click="handlePreviousPage">&lsaquo;</text>
					<text class="current-page">{{ paginationobj.page }}</text>
					<text class="next-page" @click="handleNextPage">&rsaquo;</text>
					<text class="txt">到第</text>
					<input type="text" v-model="pageNum" :adjust-position="false" />
					<text class="txt">页</text>
					<view class="determine" @click="handleTapPageJumpBtn">确定</view>
				</view>
			</view>
		</view>
		<u-picker v-model="isTime" mode="time" @confirm="handlePicker"></u-picker>
		<!-- <u-mask :show="ismask" @click="ismask = false">
			<view class="" style="display: flex;align-items: center;justify-content: center;width: 70%;">
				<text>正在下载...</text>
				<u-line-progress striped striped-active active-color="#2979ff" :percent="percent"></u-line-progress>
			</view>
		</u-mask> -->
	</scroll-view>
</template>
<script>
	import freeTitle from '@/components/free-ui/free-title/free-title.vue'
	import testUtils from '@/js/test.js'
	export default {
		components: {
			freeTitle
		},
		data() {
			return {
				ismask: false,
				sumTotal: 12,
				currentNum: 0,
				percent: 0,
				pageNum: '',
				isTime: false,
				list: [{
						item: '建档日期',
						value1: '',
						value2: '',
						placeholder: '请选择日期',
						disabled: true,
						state: 1,
						key: 'startTime',
						keys: 'endTime'
					},
					{
						item: '姓名',
						value1: '',
						placeholder: '请输入姓名',
						key: 'name'
					},
					{
						item: '电话',
						value1: '',
						placeholder: '请输入电话',
						key: 'telephone'
					},
					{
						item: '身份证号',
						value1: '',
						placeholder: '请输入身份证号码',
						key: 'idcard'
					}
				],
				allChecked: false,
				table: [],
				paginationobj: {
					rows: 8,
					page: 1,
					sidx: '',
					sord: 'desc',
					records: 0,
					total: 0
				},
				state: 0,
				checkedArr: []
			}
		},
		mounted() {
			this.handleQueryPersonalInfoList()
		},
		methods: {
			// 点击建档日期输入框
			handleTapInput(item) {
				this.isTime = true
				this.state = item
			},
			// 选择时间
			handlePicker(e) {
				let date = e.year + '-' + e.month + '-' + e.day
				for (let jtem of this.list) {
					if (this.state == 0 && jtem.item == '建档日期') {
						jtem.value1 = date
					}
					if (this.state == 1 && jtem.item == '建档日期') {
						jtem.value2 = date
					}
				}
			},
			// 全选
			handleCheckboxAll(e) {
				if (e.value) {
					this.table.forEach(item => {
						this.$set(item, 'checked', true)
					})
				} else {
					this.table.forEach(item => {
						this.$set(item, 'checked', false)
					})
				}
			},
			// 是否全选
			checkboxChange(e, item) {
				setTimeout(() => {
					this.allChecked = true
					for (let a of this.table) {
						if (a.checked != true) {
							this.allChecked = false
							break
						}
					}
				}, 100)
			},
			// 受访者信息列表(离线下载)
			handleQueryPersonalInfoList() {
				let userInfo = uni.getStorageSync('user_info');
				let info = uni.getStorageSync('QueryPersonalInfoList');
				info = info ? JSON.parse(info) : [];
				let newArr = [];
				let data = {
					doctor_id: userInfo[0].doctor_id,
					paginationobj: JSON.stringify(this.paginationobj)
				}
				for (let item of this.list) {
					if (item.keys) {
						data[item.keys] = item.value2;
					}
					data[item.key] = item.value1;
				}

				if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
					// 受访者信息列表(离线下载)--高
					this.$u.post('QueryPersonalInfoList', data).then(async res => {
						let data = res.data
						if (res.code == 200 && res.info == '响应成功' && (data.pagedatas.length || userInfo[0]
								.doctor_id == 'a12c8900-6937-4cef-9c94-37fe1a098iua1')) {
							this.paginationobj.total = res.data.pagenumber
							for (let i in data.pagedatas) {
								this.$set(data.pagedatas[i], 'checked', false)
							}
							if (data.pagedatas.length) {
								this.table = data.pagedatas;
							}
							if (userInfo[0].doctor_id == 'a12c8900-6937-4cef-9c94-37fe1a098iua1') {
								newArr = testUtils.data;
							} else {
								newArr = {
									doctor_id: userInfo[0].doctor_id,
									data: this.table
								}
							}
							let queryPersonalInfoList = await this.handleData(newArr, info);
							uni.setStorageSync('QueryPersonalInfoList', JSON.stringify(queryPersonalInfoList));
						}
					}).catch(err => {

					})
				}
				for (let item of this.list) {
					item.value1 = ''
					item.value2 = ''
				}
				this.allChecked = false
			},
			// 接口数据
			async handleData(data, info) {
				console.log(info);
				const res = [data];
				console.log('res', res);
				if (info && Array.isArray(info) && info.length > 0) {
					info.forEach(item => {
						if (item.doctor_id && item.doctor_id !== data.doctor_id) {
							res.push(item);
						} else {
							const index = res.findIndex(ele => ele.doctor_id === data.doctor_id)
							const resArr = res[index].data.concat(item.data);
							let hash = {};
							res[index].data = resArr.reduce((val, next) => {
								hash[next.id] ? '' : (hash[next.id] = true && val.push(next));
								return val;
							}, []);
							res[index].data.sort(this.compare);
						}
					})
				}
				return res;
			},
			// 排序
			compare(a, b) {
				if (a.id < b.id) {
					return -1;
				} else if (a.id > b.id) {
					return 1;
				} else {
					return 0;
				}
			},
			// 上一页
			handlePreviousPage() {
				if (this.paginationobj.page == 1) {
					return this.$lz.toast('已经是第一页了哦')
				}
				this.paginationobj.page--;
				this.handleQueryPersonalInfoList();
			},
			// 下一页
			handleNextPage() {
				if (this.paginationobj.page < this.paginationobj.total) {
					this.paginationobj.page++;
					this.handleQueryPersonalInfoList();
				} else {
					return this.$lz.toast('没有更多数据了!');
				}
			},
			// 输入跳转相应页
			handleTapPageJumpBtn() {
				if (this.pageNum !== '') {
					if (this.pageNum <= this.paginationobj.total) {
						this.paginationobj.page = this.pageNum
						this.handleQueryPersonalInfoList()
					} else {
						return this.$lz.toast('暂无数据')
					}
				} else {
					return this.$lz.hideCancel('', '请输入要跳转的页数')
				}
				this.pageNum = ''
			},
			// 下载选中受访者的相关数据
			handleDownloadingOfflineData(mode, data) {
				this.checkedArr = []
				if (mode == 'batch') {
					for (let item of this.table) {
						if (item.checked) {
							this.checkedArr.push(item.id)
						}
					}
				} else {
					this.checkedArr.push(data.id)
				}
				if (!this.checkedArr.length) {
					return this.$lz.toast('请选选择')
				}
				this.handleSearchPersonInfoo(this.checkedArr.join(','))
				this.handleGetDataLX()
			},
			// 受访者档案信息列表(离线下载)--杜
			handleSearchPersonInfoo(person_id) {
				return new Promise((resolve, reject) => {
					this.$u
						.post('SearchPersonInfoo', {
							person_id
						})
						.then(res => {
							if (res.code == 200 && res.info == '响应成功') {
								resolve(res)
							}
						})
						.catch(err => {})
				})
			},
			handleGetDataLX() {
				const searchPersonInfoo = this.handleSearchPersonInfoo(this.checkedArr.join(','))
				Promise.all([searchPersonInfoo])
					.then(res => {
						this.$lz.toast('下载完成')
					})
					.catch(err => {})
			}
		}
	}
</script>
<style scoped lang="scss">
	.wrap {
		width: 100%;
		height: calc(100vh - 0.5rem);
		background-color: #f0f0f0;
		font-size: 0.14rem;

		.container {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.content {
				width: 96%;
				background-color: #fff;
				border-radius: 16rpx;
				padding: 0.15rem;
				display: flex;
				flex-wrap: wrap;
				margin-bottom: 0.15rem;

				.title {
					width: 100%;
				}

				.form {
					display: flex;
					align-items: center;
					padding-top: 0.15rem;

					.item {
						width: 0.7rem;
						text-align: right;
						flex-shrink: 0;
					}

					&>input {
						border: 1rpx solid #e3e3e3;
						border-radius: 8rpx;
						font-size: 0.12rem;
						padding: 15rpx 0 15rpx 20rpx;
						width: 1.6rem;
						margin-left: 0.1rem;
						flex-shrink: 0;
					}
				}

				.action {
					display: flex;
					align-items: center;
					padding: 0 0.1rem;
					width: 50%;
					margin-top: 0.1rem;
					padding-left: 0.8rem;

					.btn {
						padding: 15rpx 0;
						background-color: #007aff;
						border-radius: 12rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #fff;
						width: 0.7rem;
					}

					.btn:nth-child(2) {
						margin-left: 0.1rem;
						background-color: #19be6b;
					}
				}

				.table {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;

					.table-th {
						background-color: #f0f0f0;
						width: 100%;
						margin-top: 0.2rem;
						height: 0.4rem;
						display: flex;
						align-items: center;
						border-radius: 0;
						border: 1rpx solid #e3e3e3;
						justify-content: center;

						.item {
							font-weight: bold;
							flex: 1;
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
						}

						.item:not(:last-child) {
							border-right: 1rpx solid #e3e3e3;
						}
					}

					.scroll {
						width: 100%;
						height: 2.6rem;

						.zw {
							display: flex;
							align-items: center;
							justify-content: center;
							padding-top: 0.2rem;

							.txt {
								color: #ccc;
							}
						}
					}
				}

				.table-left-action {
					width: 15%;
					font-size: 0.12rem;
					margin-top: 0.1rem;

					.txt {
						display: inline-block;
						width: 100%;
						height: 0.41rem;
						background-color: #f0f0f0;
						line-height: 0.41rem;
						text-align: center;
						border: 1rpx solid #e3e3e3;
					}

					.cell {
						display: flex;
						height: 0.4rem;
						align-items: center;
						justify-content: center;
						border-bottom: 1rpx solid #e3e3e3;
						border-right: 1rpx solid #e3e3e3;
						border-left: 1rpx solid #e3e3e3;

						.item {
							background-color: #19be6b;
							width: 50%;
							display: flex;
							align-items: center;
							justify-content: center;
							padding: 10rpx 0;
							color: #fff;
							border-radius: 14rpx;
						}
					}
				}

				.bottom {
					display: flex;
					align-items: center;
					height: 0.4rem;
					// border-top: 1rpx solid #e3e3e3;
					padding-left: 0.1rem;

					.previous-page,
					.next-page {
						color: #ccc;
						margin-right: 0.1rem;
					}

					.next-page {
						margin-left: 0.1rem;
					}

					.txt {
						color: #ccc;
						margin-right: 0.1rem;
					}

					&>input {
						border: 1rpx solid #e3e3e3;
						border-radius: 8rpx;
						font-size: 0.12rem;
						width: 0.4rem;
						text-align: center;
						height: 0.25rem;
						margin-right: 0.1rem;
					}
				}
			}

			.scroll-table {
				display: flex;
				width: 100%;
				margin-top: 0.1rem;

				.scroll-table-container {
					display: flex;
					width: 85%;
					white-space: nowrap;
					z-index: 10;
					// border: 1rpx solid #e3e3e3;
					border-top: 1rpx solid #e3e3e3;
					border-left: 1rpx solid #e3e3e3;
					margin-top: 0.1rem;

					// border-right: 1rpx solid #e3e3e3;
					.scroll-table-content {
						height: 0.4rem;

						.scroll-table-item {
							display: inline-block;
							width: 1rem;
							height: 100%;
							background-color: #f0f0f0;
							line-height: 0.4rem;
							text-align: center;
							border-bottom: 1rpx solid #e3e3e3;
						}

						.scroll-table-item:not(:last-child) {
							border-right: 1rpx solid #e3e3e3;
						}
					}

					.scroll-table-body {
						display: flex;

						.scroll-table-body-item {
							flex-shrink: 0;
							width: 1rem;
							height: 0.4rem;
							text-align: center;
							line-height: 0.4rem;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							border-bottom: 1rpx solid #e3e3e3;
						}

						.scroll-table-body-item:not(:last-child) {
							border-right: 1rpx solid #e3e3e3;
						}
					}
				}

				.action {
					display: inline-block;
					width: 100%;
					height: 0.41rem;
					background-color: #f0f0f0;
					line-height: 0.41rem;
					text-align: center;
					border: 1rpx solid #e3e3e3;
				}
			}
		}
	}
</style>
