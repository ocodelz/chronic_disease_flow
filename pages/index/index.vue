<template>
	<page-meta root-font-size="100px"></page-meta>
	<view class="wrap">
		<!-- 头部 -->
		<view class="heard-wrap">
			<view class="heard-left" @click="isSwitchRespondents = true">
				<u-image style="width: .3rem;height: .3rem;line-height: .3rem;" src="/static/image/index/userimg.jpg"
					shape="circle"></u-image>
				<view class="info">
					<text class="u-line-1">{{username}}</text>
					<text class="u-line-1">{{department}}</text>
				</view>
			</view>
			<view class="heard-right">
				<view class="content-menu">
					<view class="content-item" :style="index > 0 ? 'margin-left: .1rem;' : ''"
						v-for="(item,index) in menuList" :key="index" @click="handleMenuItem(index)">
						<text class="iconfont">{{item.icon}}</text>
						<text style="font-size: .12rem;">{{item.name}}</text>
					</view>
				</view>
				<view class="btn-box">
					<u-button class="btn" @click="handleUploadBtn">上传</u-button>
				</view>
				<view class="loding-type">
					<text>当前登录方式：</text>
					<text :style="lodingType == '离线登录' ? 'color: #f00;' : 'color: #19be6b;'">{{lodingType}}</text>
				</view>
			</view>
		</view>
		<view class="menu-wrap">
			<scroll-view scroll-y class="u-tab-view">
				<view class="u-tab-item" v-for="(item,index) in categoryList" :key="index"
					:class="current == index ? 'u-tab-item-active' : 'u-tab-item-color'" @click="handleTapItem(index)">
					<text class="u-line-1 text-white" style="font-size: .12rem;">{{item}}</text>
				</view>
			</scroll-view>
			<view :class="state ==0 ? 'content' : ''">
				<category v-if="current== 0" :contentList="contentList" @click="handleTapCategoryItem"></category>
				<personal-files v-if="current == 1"></personal-files>
				<follow-up-management v-if="current == 2" :state="status" @click="followUpManagement">
				</follow-up-management>
				<statistical-analysis v-if="current == 3" :state="statisticalAnalysisShow"
					@click="handleStatisticalAnalysis"></statistical-analysis>
				<system-settings v-if="current == 7"></system-settings>
				<offline-management :state="offlineManagement" @click="handleOfflineManagement" v-if="current == 8">
				</offline-management>
			</view>
			<view class="content" v-if="state == 1">
				<blood-pressure v-if="type == '血压测量'" :isOperationBtn="isOperationButton"
					@changeisOperationButton="changeOperationButton"></blood-pressure>
				<blood-sugar v-if="type == '血糖测量'"></blood-sugar>
			</view>
		</view>
		<switch-respondents :isSwitchRespondent="isSwitchRespondents" @close="isSwitchRespondents = false">
		</switch-respondents>
	</view>
</template>

<script>
	import category from '@/components/free-ui/free-category/category.vue';
	import personalFiles from './personalFiles/personalFiles.vue';
	import followUpManagement from './followUpManagement/followUpManagement.vue';
	import systemSettings from './systemSettings/systemSettings.vue';
	import bloodPressure from './bloodPressure/bloodPressure.vue';
	import bloodSugar from './bloodSugar/bloodSugar.vue';
	import switchRespondents from './switchRespondents/switchRespondents.vue';
	import statisticalAnalysis from './statisticalAnalysis/statisticalAnalysis.vue';
	import offlineManagement from './offlineManagement/offlineManagement.vue';
	import utils from '@/utils/util.js';
	export default {
		components: {
			category,
			personalFiles,
			followUpManagement,
			systemSettings,
			bloodPressure,
			bloodSugar,
			switchRespondents,
			statisticalAnalysis,
			offlineManagement
		},
		data() {
			return {
				lodingType: '联网登录',
				current: 6,
				state: 0,
				status: 0,
				offlineManagement: 0,
				statisticalAnalysisShow: 0,
				type: '',
				isOperationButton: true,
				isSwitchRespondents: true,
				bloodPressure: false,
				bloodSugar: false,
				username: '清澈',
				department: '妇产科',
				categoryList: ['首页', '个人档案', '随访管理', '统计分析', '消息中心', '数据导出', '切换受访者', '系统设置', '离线管理'],
				menuList: [{
						icon: "\ue813",
						name: '搜索'
					},
					{
						icon: "\ue60d",
						name: '离线下载'
					}
				],
				contentList: []
			}
		},
		onLoad() {
			this.handleGetStandardRange();
		},
		onShow() {

		},
		mounted() {
			this.__init();
		},
		methods: {
			// 查询慢病标准范围
			handleGetStandardRange() {
				this.$u.post('GetStandardRange', {
					classify_name: '',
					type: '血压'
				}).then(res => {
					// console.log(res);
					if (res.code == 200 && res.data.length) {
						uni.setStorageSync('GetStandardRange', res.data)
					}
				}).catch(err => {
					console.log(err);
				})
			},
			// 随访管理
			followUpManagement(e, item) {
				this.status = 1;
			},
			handleOfflineManagement(e, item) {
				this.offlineManagement = 1;
			},
			// 统计分析
			handleStatisticalAnalysis() {
				this.statisticalAnalysisShow = 1;
			},
			// 获取数据
			__init() {
				let searchIcon = uni.getStorageSync('SearchIcon');
				console.log(searchIcon);
				let lxstate = this.$store.state.lxUserInfo;
				if (lxstate != '' && lxstate.lxStatus) {
					this.lodingType = lxstate.lxStatus == true ? '离线登录' : '联网登录';
				}
				if (searchIcon.length && lxstate != '' && lxstate.lxStatus) {
					this.contentList = searchIcon;
				}
				if (lxstate == '' || lxstate.lxStatus == false) {
					this.$u.post('SearchIcon', {
						type: '首页'
					}).then(res => {
						this.contentList.push(res.data);
					})
				}
				let data = this.contentList;
				let list = [];
				for (let i = 0, len = data.length; i < len; i += 12) {
					list.push(data.slice(i, i + 12));
				}
				this.contentList = [];
				for (let j = 0; j < list.length; j++) {
					this.contentList.push(list[j]);
				}
			},
			// 血压测量状态
			changeOperationButton(data) {
				this.isOperationButton = data;
			},
			// 切换左侧导航
			handleTapItem(index) {
				if (uni.getStorageSync('login_info') || index == 3 || index == 7 || index == 8) {
					if (this.isOperationButton == false) {
						this.$lz.showCancel('提示', '正在进行测量确定要切换吗').then(() => {
							this.state = 0;
							this.isOperationButton = true;
							this.current = index;
							index !== 6 ? this.isSwitchRespondents = false : this.isSwitchRespondents = true;
						})
					} else {
						index !== 6 ? this.isSwitchRespondents = false : this.isSwitchRespondents = true;
						this.current = index;
						this.state = 0;
						this.status = 0;
						this.statisticalAnalysisShow = 0;
						this.offlineManagement = 0;
					}
				} else {
					if (index == 6) {
						this.isSwitchRespondents = true;
					} else {
						this.$lz.hideCancel('温馨提示', '请先登录').then(res => {
							this.current = 6;
							this.isSwitchRespondents = true;
						})
					}
				}
			},
			// 顶部通栏
			handleMenuItem(index) {
				switch (index) {
					case 0:
						this.$u.route('/pages/search/search')
						break;
				}
			},
			// 上传
			handleUploadBtn() {
				this.$lz.toast('敬请期待');
			},
			// 首页
			handleTapCategoryItem(item, index) {
				this.type = item;
				switch (item) {
					case '血压测量':
						this.state = 1;
						break;
					case '血糖测量':
						this.state = 1;
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 100%;
		// height: 100vh;
		display: flex;

		// background-color: #f0f0f0;
		.heard-wrap {
			width: 100%;
			height: .5rem;
			position: fixed;
			background-color: #fff;
			display: flex;
			border-bottom: 1rpx solid #ccc;

			.heard-left {
				width: .9rem;
				background-color: #555555;
				display: flex;
				align-items: center;
				padding-left: .1rem;
				text-align: left;


				.info {
					font-size: .12rem;
					display: flex;
					flex-direction: column;
					color: #fff;
					padding-left: .1rem;
				}
			}

			.heard-right {
				height: .5rem;
				display: flex;
				align-items: center;
				flex: 1;

				.btn-box {
					margin-left: .2rem;
					display: flex;
					align-items: center;
					justify-content: center;

					.btn {
						display: flex;
						align-items: center;
						justify-content: center;
						height: .2rem;
						width: .2rem;
						font-size: .14rem;
					}
				}

				.content-menu {
					background-color: rgba(0, 0, 0, .5);
					border-radius: 12rpx;
					display: flex;
					color: #fff;
					padding: 0 .1rem 0 .1rem;
					margin-left: .2rem;

					.content-item {
						display: flex;
						align-items: center;
						justify-content: center;
						height: .2rem;
					}
				}

				.loding-type {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					flex: 1;
					padding-right: 1.4rem;
				}
			}
		}

		.menu-wrap {
			flex: 1;
			display: flex;
			overflow: hidden;
			height: calc(100vh - .5rem);
			z-index: 55;
			position: relative;
			top: .5rem;

			.u-tab-view {
				width: .9rem;
				background-color: #555555;

				.u-tab-item {
					height: .5rem;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					// justify-content: center;
					padding-left: .1rem;
					font-size: .13rem;
					font-weight: 400;
					line-height: 1;
					// border-bottom: 1rpx solid #e3e3e3;
					// color: #fff;
				}

				.u-tab-item-active {
					// position: relative;
					color: #fc979f;
					font-weight: 600;
				}

				.u-tab-item-color {
					color: #fff;
				}

				// .u-tab-item-active::before {
				// 	content: "";
				// 	position: absolute;
				// 	border-left: 4px solid #dd6161;
				// 	height: .48rem;
				// 	right: 0;
				// 	color: #f00;
				// }
			}
		}

		.content {
			width: calc(100% - .9rem);
			height: 100vh;
		}
	}
</style>
