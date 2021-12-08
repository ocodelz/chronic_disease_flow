<template>
	<scroll-view scroll-y class="wrap">
		<free-title title="离线上传个人档案"></free-title>
		<view class="container">
			<view class="content">
				<text class="title">搜索条件</text>
				<view class="user-info">
					<text class="item">姓名</text>
					<input placeholder="请输入姓名" v-model="userInfo.name">
				</view>
				<view class="user-info">
					<text class="item">电话</text>
					<input placeholder="请输入电话" v-model="userInfo.telephone">
				</view>
				<view class="user-info">
					<text class="item">身份证号</text>
					<input placeholder="请输入身份证号码" v-model="userInfo.idcard">
				</view>
				<view class="action">
					<view class="btn" @click="handleGetOfflineData('search')">
						<text class="iconfont icon">&#xe813;</text>
						<text class="item">搜索</text>
					</view>
					<view class="btn" @click="handleUploadOfflineData">
						<text class="iconfont icon">&#xe669;</text>
						<text class="item">上传</text>
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
							<view class="scroll-table-item" style="width: .5rem;">
								<u-checkbox-group>
									<u-checkbox v-model="allChecked" @change="handleCheckboxAll"></u-checkbox>
								</u-checkbox-group>
							</view>
							<view class="scroll-table-item">姓名</view>
							<view class="scroll-table-item">性别</view>
							<view class="scroll-table-item" style="width: 1.5rem;">身份证号</view>
							<view class="scroll-table-item">电话</view>
							<view class="scroll-table-item">民族</view>
							<view class="scroll-table-item">现住址</view>
							<view class="scroll-table-item">户籍地址</view>
						</view>
						<view v-for="(item,index) in table" :key="index" class="scroll-table-body">
							<view class="scroll-table-body-item" style="width: .5rem;">
								<u-checkbox v-model="item.checked" @change="checkboxChange($event,item)"></u-checkbox>
							</view>
							<view class="scroll-table-body-item">{{item.data.grxx.name}}</view>
							<view class="scroll-table-body-item">{{item.data.grxx.sex}}</view>
							<view class="scroll-table-body-item" style="width: 1.5rem;">{{item.data.grxx.idcard}}</view>
							<view class="scroll-table-body-item">{{item.data.grxx.telephone}}</view>
							<view class="scroll-table-body-item">{{item.data.grxx.nation}}</view>
							<view class="scroll-table-body-item">{{item.data.grxx.current_address}}</view>
							<view class="scroll-table-body-item">{{item.data.grxx.permanent_address}}</view>
						</view>
					</scroll-view>
					<!-- 操作 -->
					<view class="table-left-action">
						<view class="txt">操作</view>
						<view v-for="(item,index) in table" :key="index" class="cell">
							<view class="item" @click="handleSearchPersonInfoo(item)">上传</view>
						</view>
					</view>
				</view>
				<view class="bottom" v-if="paginationobj.total > 1 && table.length">
					<text class="previous-page" @click="handlePreviousPage">&lsaquo;</text>
					<text class="current-page">{{paginationobj.page}}</text>
					<text class="next-page" @click="handleNextPage">&rsaquo;</text>
					<text class="txt">到第</text>
					<input type="text" v-model="pageNum" :adjust-position="false">
					<text class="txt">页</text>
					<view class="determine" @click="handleTapPageJumpBtn">确定</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>
<script>
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	export default {
		components: {
			freeTitle
		},
		data() {
			return {
				isFlag: true,
				pageNum: '',
				userInfo: {
					name: '',
					telephone: '',
					idcard: ''
				},
				allChecked: false,
				table: [],
				paginationobj: {
					rows: 10,
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
			this.handleGetOfflineData('init');
		},
		computed: {

		},
		methods: {
			// 全选
			handleCheckboxAll(e) {
				console.log(e);
				if (e.value) {
					this.table.forEach(item => {
						this.$set(item, 'checked', true);
					})
				} else {
					this.table.forEach(item => {
						this.$set(item, 'checked', false);
					})
				}
			},
			// 是否全选
			checkboxChange(e, item) {
				setTimeout(() => {
					this.allChecked = true;
					for (let a of this.table) {
						if (a.checked != true) {
							// console.info(a)
							this.allChecked = false;
							break;
						}
					}
				}, 100)
			},
			// 获取数据
			handleGetOfflineData(state) {
				let data = uni.getStorageSync('personInfo');
				// let userInfo = Object.values(this.userInfo).every((item) => item == null || item == "");
				if(data.length){
					this.table = data.filter(item => {
						let name = true;
						let idcard = true;
						let telephone = true;
						// 姓名模糊搜索
						if (this.userInfo.name) {
							const keys = this.userInfo.name.toUpperCase().replace(' ', '').split('');
							name = keys.every(key => item.data.grxx.name.toUpperCase().includes(key));
						}
						if (this.userInfo.idcard) {
							idcard = item.data.grxx.idcard == this.userInfo.idcard;
						}
						if (this.userInfo.telephone) {
							telephone = item.data.grxx.telephone == this.userInfo.telephone;
						}
						return name && idcard && telephone;
					})
				}
				
				let table = JSON.parse(JSON.stringify(this.table));
				this.paginationobj.total = parseInt(table.length / this.paginationobj.rows) + (table.length % this
					.paginationobj.rows > 0 ? 1 : 0);
				if (state == 'search') {
					this.paginationobj.page = 1;
				}
				if (this.paginationobj.page < this.paginationobj.total) {
					this.table = table.slice((this.paginationobj.page - 1) * this.paginationobj.rows, (this
						.paginationobj.page - 1) * this.paginationobj.rows + this.paginationobj.rows);
				} else if (this.paginationobj.page == this.paginationobj.total) {
					this.table = table.slice((this.paginationobj.page - 1) * this.paginationobj.rows, (this
						.paginationobj.page - 1) * this.paginationobj.rows + (table.length - (this.paginationobj
						.page - 1) * this.paginationobj.rows));
				} else {
					this.table = [];
				}
			},
			// 上一页
			handlePreviousPage() {
				if (this.paginationobj.page > 1) {
					this.paginationobj.page--;
					this.handleGetOfflineData('init');
				} else {
					this.$lz.toast('已经在第一页了');
				}
			},
			// 下一页
			handleNextPage() {
				if (this.paginationobj.page < this.paginationobj.total) {
					this.paginationobj.page++;
					this.handleGetOfflineData('init');
				} else {
					this.$lz.toast('没有更多数据了');
				}
			},
			// 点击确定跳转到相应页
			handleTapPageJumpBtn() {
				if (this.pageNum !== '') {
					if (this.pageNum <= this.paginationobj.total) {
						this.paginationobj.page = this.pageNum;
						this.handleGetOfflineData('init');
					} else {
						return this.$lz.toast('暂无数据');
					}
				} else {
					return this.$lz.hideCancel('', '请输入要跳转的页数');
				}
				this.pageNum = '';
			},
			// 列表点击上传按钮
			handleSearchPersonInfoo(item) {
				console.log(item);
			},
			// 上传多条
			handleUploadOfflineData() {
				this.checkedArr = [];
				for (let item of this.table) {
					if (item.checked) {
						this.checkedArr.push(item)
					}
				}
				if (this.checkedArr.length) {
					for (let jtem of this.checkedArr) {
						console.log(jtem);
						this.$u.post('SavePersonInfo', jtem).then(res => {
							console.log(res);
						}).catch(err => {
							console.log(err);
						})
					}
				} else {
					return this.$lz.toast('请选选择')
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	.wrap {
		width: 100%;
		height: calc(100vh - .5rem);
		background-color: #f0f0f0;
		font-size: .14rem;

		.container {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.content {
				width: 96%;
				background-color: #fff;
				border-radius: 16rpx;
				padding: .15rem;
				display: flex;
				flex-wrap: wrap;
				margin-bottom: .15rem;

				.title {
					width: 100%;
				}

				.user-info {
					display: flex;
					align-items: center;
					padding-top: .15rem;
					width: 50%;

					.item {
						width: .7rem;
						text-align: right;
						flex-shrink: 0;
					}

					&>input {
						border: 1rpx solid #e3e3e3;
						border-radius: 8rpx;
						font-size: .12rem;
						padding: 15rpx 0 15rpx 20rpx;
						width: 1.6rem;
						margin-left: .1rem;
						flex-shrink: 0;
					}
				}

				.action {
					display: flex;
					align-items: center;
					padding: 0 .1rem;
					width: 50%;
					margin-top: .1rem;
					padding-left: .8rem;

					.btn {
						padding: 15rpx 0;
						background-color: #007AFF;
						border-radius: 12rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #fff;
						width: .7rem;
					}

					.btn:nth-child(2) {
						margin-left: .1rem;
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
						margin-top: .2rem;
						height: .4rem;
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
							padding-top: .2rem;

							.txt {
								color: #ccc;
							}
						}
					}
				}

				.table-left-action {
					width: 15%;
					font-size: .12rem;
					margin-top: .1rem;

					.txt {
						display: inline-block;
						width: 100%;
						height: .41rem;
						background-color: #f0f0f0;
						line-height: .41rem;
						text-align: center;
						border: 1rpx solid #e3e3e3;
					}

					.cell {
						display: flex;
						height: .4rem;
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
					height: .4rem;
					// border-top: 1rpx solid #e3e3e3;
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

			.scroll-table {
				display: flex;
				width: 100%;
				margin-top: .1rem;

				.scroll-table-container {
					display: flex;
					width: 85%;
					white-space: nowrap;
					z-index: 10;
					// border: 1rpx solid #e3e3e3;
					border-top: 1rpx solid #e3e3e3;
					border-left: 1rpx solid #e3e3e3;
					margin-top: .1rem;

					// border-right: 1rpx solid #e3e3e3;
					.scroll-table-content {
						height: .4rem;

						.scroll-table-item {
							display: inline-block;
							width: 1rem;
							height: 100%;
							background-color: #f0f0f0;
							line-height: .4rem;
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
							height: .4rem;
							text-align: center;
							line-height: .4rem;
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
					height: .41rem;
					background-color: #f0f0f0;
					line-height: .41rem;
					text-align: center;
					border: 1rpx solid #e3e3e3;
				}
			}
		}
	}
</style>
