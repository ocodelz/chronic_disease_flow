<template>
	<scroll-view class="wrap" scroll-y>
		<view v-if="state == '0'">
			<free-title title="随访查询"></free-title>
			<view class="container">
				<view class="content">
					<text class="title">搜索条件</text>
					<view class="main" v-for="(item,index) in list" :key="index">
						<text class="item">{{item.item}}</text>
						<input :type="item.type" :disabled="item.disabled" :placeholder="item.placeholder"
							v-model="item.model" @click="item.type == 'select' ? handleTapInput(item,0) : ''" />
						<text class="txt" v-if="item.item == '随访日期' || item.item == '下次随访日期'">-</text>
						<input v-if="item.item == '随访日期' || item.item == '下次随访日期'" :type="item.type"
							@click="item.type == 'select' ? handleTapInput(item,1) : ''" :disabled="item.disabled"
							:placeholder="item.placeholder" v-model="item.mode1" />
					</view>
					<view class="action">
						<text class="item">到期未做随访</text>
						<u-switch v-model="takePhoto" @change="handleChangeSwitch"></u-switch>
						<view class="btn" @click="handleTapSearch">
							<text class="iconfont icon">&#xe813;</text>
							<text class="search">搜索</text>
						</view>
						<view class="btn" @click="handleExportDetails">
							<text class="search">导出详情</text>
						</view>
						<view class="btn" style="width: 1rem;" @click="handleTapModifyuploadStatus">
							<text>修改上传状态</text>
						</view>
					</view>
					<view class="table-box" v-if="!table.length">
						<view class="table-th">
							<view class="item1">
								<u-checkbox-group>
									<u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList"
										:key="index" :name="item.name"><text>{{item.name}}</text></u-checkbox>
								</u-checkbox-group>
							</view>
							<view class="item">居民姓名</view>
							<view class="item">性别</view>
							<view class="item">身份证号</view>
							<view class="item">体检编号</view>
							<view class="item">人群类型</view>
							<view class="item">随访医生</view>
							<view class="item">随访项目</view>
							<view class="item">随访日期</view>
							<view class="item">下次随访日期</view>
						</view>
						<scroll-view scroll-y class="scroll">
							<view
								style="display: flex;align-items: center;justify-content: center; padding-top: .2rem;">
								<text style="color: #ccc;">暂无数据</text>
							</view>
						</scroll-view>
					</view>
					<!--  -->
					<view class="scroll-table" v-if="table.length">
						<scroll-view class="scroll-table-container" scroll-x>
							<view class="scroll-table-content">
								<view class="scroll-table-item" style="width: .5rem;padding-left: .15rem;">
									<u-checkbox-group>
										<u-checkbox v-model="checked" @change="tableHeadCheckboxChange"></u-checkbox>
									</u-checkbox-group>
								</view>
								<view class="scroll-table-item">居民姓名</view>
								<view class="scroll-table-item">性别</view>
								<view class="scroll-table-item" style="width: 1.5rem;">身份证号</view>
								<view class="scroll-table-item">体检编号</view>
								<view class="scroll-table-item">人群类型</view>
								<view class="scroll-table-item">随访医生</view>
								<view class="scroll-table-item">随访项目</view>
								<view class="scroll-table-item">随访日期</view>
								<view class="scroll-table-item">下次随访日期</view>
								<view class="scroll-table-item">所属机构</view>
								<view class="scroll-table-item">上传状态</view>
							</view>
							<view v-for="(item,index) in table" :key="index" class="scroll-table-body">
								<view class="scroll-table-body-item" style="width: .5rem;padding-left: .15rem;">
									<u-checkbox v-model="item.checked" @change="checkboxChange($event,item)">
									</u-checkbox>
								</view>
								<view class="scroll-table-body-item">{{item.name}}</view>
								<view class="scroll-table-body-item">{{item.sex}}</view>
								<view class="scroll-table-body-item" style="width: 1.5rem;">{{item.idcard}}</view>
								<view class="scroll-table-body-item">{{item.tjbh}}</view>
								<view class="scroll-table-body-item">{{item.person_type}}</view>
								<view class="scroll-table-body-item">{{item.follow_doctor_name}}</view>
								<view class="scroll-table-body-item">{{item.follow_project}}</view>
								<view class="scroll-table-body-item">{{item.follow_time}}</view>
								<view class="scroll-table-body-item">{{item.next_follow_time}}</view>
								<view class="scroll-table-body-item">{{item.shjg}}</view>
								<view class="scroll-table-body-item">{{item.upload_status}}</view>
							</view>
						</scroll-view>
						<!-- 操作 -->
						<view style="width: 30%;">
							<view class="action">操作</view>
							<view v-for="(item,index) in table" :key="index"
								style="display: flex;height: .4rem;align-items: center;justify-content: center;border-bottom: 1rpx solid #e3e3e3;border-right: 1rpx solid #e3e3e3;border-left: 1rpx solid #e3e3e3;">
								<view style="background-color: #ff5722;padding: 8rpx;border-radius: 8rpx;"
									@click="handleUploadStatus(item)">修改上传状态</view>
								<view @click="handleTableEdit(item)"
									style="background-color: #33ccff;border-radius: 8rpx;padding: 10rpx;margin-left: .1rem;">
									编辑</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="isPersonalFiles" mode="center" width="90%" border-radius="16">
			<diabetes-follow-up-details v-if="diabetesFollowUpDetails == true" :file="file">
			</diabetes-follow-up-details>
			<hypertension-follow-up-details v-if="hypertensionFollowUpDetails == true"></hypertension-follow-up-details>
		</u-popup>
		<u-picker v-model="isTime" mode="time" @confirm="handlePicker"></u-picker>
		<u-select v-model="selectorIsShow" :list="selectList" @confirm="handleSelect"></u-select>
		<u-popup v-model="isPopulationType" mode="bottom">
			<view class="population-type">
				<view
					style="display: flex;height: .3rem;align-items: center;justify-content: space-between; border-bottom: 1rpx solid #e3e3e3;margin: 0 .15rem;">
					<view @click="isPopulationType = false">取消</view>
					<view @click="handlePopupConfirm">确定</view>
				</view>
				<scroll-view scroll-y style="height: 2.5rem;">
					<u-checkbox-group wrap style="width: 100%;padding: 0 .15rem;">
						<u-checkbox v-model="item.checked" v-for="(item, index) in selectPopulationType" :key="index"
							:name="item.name" style="border-bottom: 1rpx solid #e3e3e3;" @change="checkboxPopupChange">
							<view>{{item.name}}</view>
						</u-checkbox>
					</u-checkbox-group>
				</scroll-view>
			</view>
		</u-popup>
	</scroll-view>
</template>

<script>
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import data from '@/js/followUpInquiry.js';
	import diabetesFollowUpDetails from '../diabetesFollowUpDetails/diabetesFollowUpDetails.vue';
	import hypertensionFollowUpDetails from '../hypertensionFollowUpDetails/hypertensionFollowUpDetails.vue';
	export default {
		components: {
			freeTitle,
			diabetesFollowUpDetails,
			hypertensionFollowUpDetails
		},
		data() {
			return {
				// 初始 时间选择器显示状态
				isTime: false,
				// 初始 select选择器显示状态
				selectorIsShow: false,
				// 初始 随访类型popup显示状态
				isPopulationType: false,
				checked: false,
				checkboxList: [{
					name: '',
					checked: false,
					disabled: false
				}],
				table: [],
				state: '0',
				// 初始到期未做随访状态
				takePhoto: false,
				list: data.list,
				selectPopulationType: data.selectPopulationType,
				selectList: [],
				item: '',
				populationType: [],
				isPersonalFiles: false,
				diabetesFollowUpDetails: false,
				hypertensionFollowUpDetails: false,
				file: {},
				is_wsf: '0'
			}
		},
		mounted() {

		},
		computed: {

		},
		methods: {
			// 搜索
			handleTapSearch() {
				let pagination = {
					rows: 10,
					page: 1,
					sidx: '',
					sord: '',
					records: 0,
					total: 0
				}

				let obj = {
					pagination: JSON.stringify(pagination),
					is_wsf: this.is_wsf,
				}

				for (let item of this.list) {
					if (item.key) {
						obj[item.key] = item.model;
					}
					if (item.keys) {
						obj[item.keys] = item.mode1;
					}
				}
				for (let item of this.list) {
					if (item.item == '随访类型' && item.model == '') {
						return this.$lz.toast('随访类型不能为空')
					}
				}
				this.$u.post('SearchFollowList', obj).then(res => {
					console.log(res.data.infoList.length);
					if (res.code == 200 && res.info == '响应成功' && res.data.infoList.length !== 0) {
						this.table = res.data.infoList;
					} else {
						this.table = []
						this.$lz.toast('暂无数据');
					}
				}).catch(err => {
					console.log(err);
				})
			},
			handlePicker(e) {
				console.log(e);
				for (let item of this.list) {
					if (item.item == this.item) {
						if (this.index == 0) {
							item.model = e.year + '-' + e.month + '-' + e.day;
						}
						if (this.index == 1) {
							item.mode1 = e.year + '-' + e.month + '-' + e.day;
						}
					}
					if (item.item == this.item) {
						if (this.index == 0) {
							item.model = e.year + '-' + e.month + '-' + e.day;
						}
						if (this.index == 1) {
							item.mode1 = e.year + '-' + e.month + '-' + e.day;
						}
					}
				}
			},
			handleSelect(e) {
				let name = this.item;
				for (let item of this.list) {
					if (name == item.item) {
						item.model = e[0].label
						this.upload_status = item.model == '已上传' ? '1' : '0'
					}
				}
			},
			handlePopupConfirm() {
				this.isPopulationType = false;
				for (let item of this.list) {
					if (item.item == '随访类型') {
						item.model = this.populationType.join(',');
						console.log(item.model);
					}
				}
			},
			checkboxPopupChange(e) {
				console.log(e);
				setTimeout(() => {
					this.populationType = [];
					for (let item of this.selectPopulationType) {
						console.log(item);
						if (item.checked) {
							this.populationType.push(item.name)
						}
					}
					console.log(this.populationType);
				}, 100)
			},
			handleTableEdit(item) {
				this.file = item;
				console.log(this.file);
				this.isPersonalFiles = true;
				if (item.follow_project == '糖尿病随访') {
					this.diabetesFollowUpDetails = true;
				}
				if (item.follow_project == '高血压随访') {
					this.hypertensionFollowUpDetails = true;
				}
			},
			// 导出详情
			handleExportDetails() {
				console.log('2');
			},
			tableHeadCheckboxChange(e) {
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
			checkboxChange(e, item) {
				setTimeout(() => {
					this.checked = true;
					for (let a of this.table) {
						if (a.checked != true) {
							console.info(a)
							this.checked = false;
							break;
						}
					}
				}, 100)
			},
			handleUploadStatus(item) {
				let entity = {
					follow_type: '糖尿病随访',
					list: []
				}
				item.upload_status = item.upload_status == '已上传' ? '0' : '1';
				entity.list.push({
					follow_id: item.follow_id,
					upload_status: item.upload_status
				})
				let params = {
					entity: entity
				}
				this.$u.post('UpdateUploadStatusList', params).then(res => {
					console.log(res);
					if (res.code == 200 && res.data == true) {
						this.$lz.toast(res.info);
						this.handleTapSearch();
					}
				}).catch(err => {
					console.log(err);
				})
			},
			// 修改上传状态
			handleTapModifyuploadStatus() {
				let uploadTableCellList = [];
				for (let a of this.table) {
					if (a.checked) {
						uploadTableCellList.push(a)
					}
				}
				if (uploadTableCellList.length) {
					let entity = {
						follow_type: '糖尿病随访',
						list: []
					}
					for (let item of uploadTableCellList) {
						item.upload_status = item.upload_status == '已上传' ? '0' : '1';
						// item.upload_status = !item.upload_status;
						let obj = {
							follow_id: item.follow_id,
							upload_status: item.upload_status
						}
						entity.list.push(obj)
					}
					let params = {
						entity: entity
					}
					console.log(params);
					this.$u.post('UpdateUploadStatusList', params).then(res => {
						console.log(res);
						if (res.code == 200 && res.data == true) {
							uploadTableCellList = [];
							this.checked = false;
							this.$lz.toast(res.info);
							this.handleTapSearch();
						}
					}).catch(err => {
						console.log(err);
					})
				} else {
					this.$lz.toast('请先选择要修改的内容');
				}
			},
			// 监听switch开关
			handleChangeSwitch(e) {
				this.is_wsf = e == true ? '1' : '0'
			},
			//  
			checkboxGroupChange(e) {

			},
			//  
			handleTapInput(item, index) {
				this.item = item.item;
				this.index = index
				if (item.item == '上传状态') {
					this.selectList = data.selectUploadStatus;
					this.selectorIsShow = true;
				}
				if (item.item == '随访日期' || item.item == '下次随访日期') {
					this.isTime = true;
				}
				if (item.item == '随访类型') {
					this.isPopulationType = true;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 100%;
		height: calc(100vh - .5rem);
		background-color: #f0f0f0;
		font-size: .12rem;

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

				.main {
					display: flex;
					align-items: center;
					margin-bottom: .1rem;

					.item {
						width: .9rem;
						text-align: right;
					}

					.txt {
						margin-left: .1rem;
					}

					&>input {
						border: 1rpx solid #e3e3e3;
						border-radius: 8rpx;
						font-size: .12rem;
						padding: 10rpx 0 10rpx 20rpx;
						width: 1.1rem;
						margin-left: .1rem;
						position: relative;
					}
				}

				.action {
					display: flex;
					align-items: center;

					.item {
						width: .9rem;
						text-align: right;
						margin-right: .1rem;
					}

					.btn {
						height: .3rem;
						background-color: #007AFF;
						border-radius: 12rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-left: .1rem;
						color: #fff;
						width: .7rem;
					}
				}

				.table-box {
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

						.item1 {
							padding-left: .15rem;
							font-weight: bold;
							// flex: 1;
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
						}

						.item1:not(:last-child) {
							border-right: 1rpx solid #e3e3e3;
						}

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
					}
				}

				.scroll-table {
					display: flex;
					width: 100%;
					margin-top: .1rem;

					.scroll-table-container {
						display: flex;
						width: 70%;
						white-space: nowrap;
						z-index: 10;
						// border: 1rpx solid #e3e3e3;
						border-top: 1rpx solid #e3e3e3;
						border-left: 1rpx solid #e3e3e3;

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
	}
</style>
