<template>
	<scroll-view class="wrap" scroll-y>
		<view v-if="state == '0'">
			<free-title title="糖尿病随访列表"></free-title>
			<follow-up info="糖尿病基本信息列表" :list="diabetesBasicInformation" btn="编辑" :icon="'\ue729'"
				@click="handleTapBtn('infoBtn')">
				<template v-slot:info>
					<text>管理组别:</text>
					<text class="info">{{diabetesBasicInformation.managementGroup}}</text>
					<text>病例来源:</text>
					<text class="info">{{diabetesBasicInformation.sourceOfCases}}</text>
				</template>
			</follow-up>
			<table-list :table="table" @click="handleTableBtn" :searchStartTime="searchStartTime"
				:searchEndTime="searchEndTime" @confirm="handleConfirmPicker" @search="handleTapSearchInput"
				@scrolltolower="handleScrolltolower"></table-list>

		</view>
		<basic-info-of-diabetes v-if="state == 'basicInfoOfDiabetes'"></basic-info-of-diabetes>
		<diabetes-follow-up-details v-if="state == 'diabetesFollowUpDetails'"></diabetes-follow-up-details>
	</scroll-view>
</template>

<script>
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import followUp from '@/components/free-ui/free-followUp/followUp.vue';
	import tableList from '@/components/free-ui/free-table/table.vue';
	import basicInfoOfDiabetes from '../basicInfoOfDiabetes/basicInfoOfDiabetes.vue';
	import diabetesFollowUpDetails from '../diabetesFollowUpDetails/diabetesFollowUpDetails.vue';
	import utils from '@/common/utils.js';
	export default {
		components: {
			freeTitle,
			followUp,
			tableList,
			basicInfoOfDiabetes,
			diabetesFollowUpDetails
		},
		data() {
			return {
				searchOfflineDiabetesFollow: [],
				index: 0,
				state: '0',
				diabetesBasicInformation: {
					managementGroup: '',
					sourceOfCases: ''
				},
				table: [],
				pagination: {
					rows: 10,
					page: 1,
					sidx: '',
					sord: '',
					records: 0,
					total: 0
				},
				searchStartTime: '',
				searchEndTime: '',
				timeStatus: '',
				person_id: ''
			}
		},
		mounted() {
			let res = uni.getStorageSync('login_info');
			if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false && res !== '' &&
				res !== '') {
				this.person_id = res[0].id;
			}
			this.handleSearchDiabetesInfo();
			this.handleSearchDiabetesFollowList();
		},
		methods: {
			handleTapSearchInput(item) {
				if (item == 'searchStartTimes') {
					this.timeStatus = item;
				} else {
					this.timeStatus = item;
				}
			},
			handleConfirmPicker(e) {
				let year = e.year,
					month = e.month,
					day = e.day;
				if (this.timeStatus == 'searchStartTimes') {
					this.searchStartTime = year + '-' + month + '-' + day;
					console.log(this.searchStartTime);
				} else {
					this.searchEndTime = year + '-' + month + '-' + day;
				}
			},
			// 糖尿病基本信息列表
			handleSearchDiabetesInfo() {
				console.log(this.person_id);
				if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
					this.$u.post('SearchDiabetesInfo', {
						person_id: this.person_id
					}).then(res => {
						// console.log(res);
						if (res.code == 200 && JSON.stringify(res.data) !== '[]') {
							this.diabetesBasicInformation.managementGroup = res.data.mrg_group;
							this.diabetesBasicInformation.sourceOfCases = res.data.cases_sourse;
						} else {
							this.hypertensionInfo = {}
						}
					})
				}
			},
			handleTapBtn(item) {
				switch (item) {
					case 'infoBtn':
						this.state = 'basicInfoOfDiabetes';
						break;
					default:
						break;
				}
			},
			handleTableBtn(item, i, index) {
				if (item == 'search') {
					console.log('search');
					this.pagination.page = 1;
					if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
						this.table = [];
						this.handleSearchDiabetesFollowList();
					}
					if (this.$store.state.lxUserInfo !== '' && this.$store.state.lxUserInfo.lxStatus) {
						let searchStartTime = new Date(this.searchStartTime).getTime();
						let searchEndTime = new Date(this.searchEndTime).getTime();
						console.log(this.table);
						let arr = [];
						let table = JSON.parse(JSON.stringify(this.searchOfflineDiabetesFollow));
						for (let data of table) {
							data.follow_time = new Date(data.follow_time).getTime();
							data.next_follow_time = new Date(data.next_follow_time).getTime();
							if (searchStartTime !== '' || searchEndTime !== '') {
								if (data.follow_time >= searchStartTime && data.follow_time <= searchEndTime) {
									console.log(333);
									this.$set(arr, arr.length, data)
								}
								// if(searchEndTime <= data.next_follow_time){
								// 	console.log(444);
								// 	this.$set(arr,arr.length,data)
								// }
							}
						}

						arr.forEach((ctem) => {
							ctem.follow_time = new Date(ctem.follow_time);
							ctem.follow_time = utils.formatTime(ctem.follow_time);
							ctem.next_follow_time = new Date(ctem.next_follow_time);
							ctem.next_follow_time = utils.formatTime(ctem.next_follow_time);
						})
						console.log(arr);
						this.table = arr;
					}
					this.searchEndTime = '';
					this.searchStartTime = '';
				}
				if (item == 'searchAdd') {
					this.state = 'diabetesFollowUpDetails';
					uni.removeStorageSync('edit');
				}
				if (item == 'edit') {
					this.state = 'diabetesFollowUpDetails';
					uni.setStorageSync('edit', i)
				}
				if (item == 'del') {
					this.$lz.showCancel('', '是否要删除?').then(res => {
						if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
							this.handleDelDiabetesFollow(i)
						}
					})
				}
			},
			// 查询糖尿病随访列表
			handleSearchDiabetesFollowList() {
				let obj = {
					person_id: this.person_id,
					paginationobj: JSON.stringify(this.pagination),
					follow_starttime: this.searchStartTime,
					follow_endtime: this.searchEndTime
				}
				console.log(obj);
				this.searchStartTime = '';
				this.searchEndTime = '';
				// 有网
				if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
					this.$u.post('SearchDiabetesFollowList', obj).then(res => {
						console.log(res);
						if (res.code == 200 && res.info == '响应成功' && res.data.length) {
							this.pagination.total = res.data[0].pageTotal;
							let arr = [];
							if (res.data[0].infoList.length > 0) {
								res.data[0].infoList.forEach(item => {
									if (item.follow_time !== '') {
										item.follow_time = /\d{4}-\d{1,2}-\d{1,2}/g.exec(item.follow_time)
											.join(',');
									}
									if (item.next_follow_time !== '') {
										item.next_follow_time = /\d{4}-\d{1,2}-\d{1,2}/g.exec(item
											.next_follow_time).join(',');
									}
									arr.push(item)
								})
								this.table = this.table.concat(arr);
							}
							if (res.code == 200 && res.info == '响应成功' && res.data[0].infoList.length == 0) {
								this.$lz.toast('没有更多数据了');
							}
						}
					}).catch(err => {
						console.log(err);
					})
				}
				// 离线
				
			},
			handleScrolltolower(e) {
				if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
					if (this.pagination.page < this.pagination.total) {
						this.pagination.page++;
						this.handleSearchDiabetesFollowList();
					} else {
						this.$lz.toast('没有更多数据了!');
					}
				}
			},
			// 删除
			handleDelDiabetesFollow(item) {
				let obj = {
					follow_id: item.follow_id
				}
				console.log(obj);
				this.$u.post('DelDiabetesFollow', obj).then(res => {
					console.log(res);
					if (res.code == 200 && res.data == true) {
						this.pagination.page = 1;
						this.table = [];
						this.handleSearchDiabetesFollowList();
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
		position: relative;
		width: 100%;
		height: calc(100vh - .5rem);
		background-color: #f0f0f0;
		display: flex;
		justify-content: center;
		align-items: center;

		.info {
			margin-left: .4rem;
		}
	}
</style>
