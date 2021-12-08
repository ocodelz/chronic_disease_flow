<template>
	<scroll-view class="wrap" scroll-y>
		<view v-if="state == '0'">
			<free-title title="精神病详细信息"></free-title>
			<follow-up info="精神障碍患者个人信息补充表" :list="info" btn="编辑" :icon="'\ue729'" @click="handleTableBtn('infoBtn')">
				<template v-slot:info>
					<text>监护人姓名：{{info.nameOfGuardian}}</text>
					<text>与患者的关系：{{info.RelationshipWithPatients}}</text>
					<text>填表日期：{{info.dateOfCompletion}}</text>
				</template>
			</follow-up>
			<table-list :table="table" @click="handleTableBtn" :searchStartTime="searchStartTime"
				:searchEndTime="searchEndTime" @confirm="handleConfirmPicker" @search="handleTapSearchInput"
				@scrolltolower="handleScrolltolower"></table-list>
		</view>
		<psychiatric-details v-if="state == 'psychiatricDetails'"></psychiatric-details>
		<follow-up-information-on-mental-disorders v-if="state == 'followUpInformationOnMentalDisorders'">
		</follow-up-information-on-mental-disorders>
	</scroll-view>
</template>

<script>
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import followUp from '@/components/free-ui/free-followUp/followUp.vue';
	import tableList from '@/components/free-ui/free-table/table.vue';
	import psychiatricDetails from '../psychiatricDetails/psychiatricDetails.vue'
	import followUpInformationOnMentalDisorders from '../followUpInformationOnMentalDisorders/followUpInformationOnMentalDisorders.vue'
	export default {
		components: {
			freeTitle,
			followUp,
			tableList,
			psychiatricDetails,
			followUpInformationOnMentalDisorders
		},
		data() {
			return {
				state: '0',
				searchEndTime: '',
				searchStartTime: '',
				timeStatus: '',
				pagination: {
					rows: 10,
					page: 1,
					sidx: '',
					sord: '',
					records: 0,
					total: 0
				},
				person_id: '',
				info: {
					nameOfGuardian: '',
					RelationshipWithPatients: '',
					dateOfCompletion: ''
				},
				table: []
			}
		},
		mounted() {
			let res = uni.getStorageSync('login_info');
			if (res !== '') {
				this.person_id = res[0].id;
			}
			this.handleSearchMentalIllnessFollowList();
			this.handleSearchMentalIllnessInfo();
		},
		methods: {
			handleSearchMentalIllnessInfo(){
				this.$u.post('SearchMentalIllnessInfo',{
					persion_id: this.person_id
				}).then(res => {
					// console.log(res);
					if (res.code == 200 && res.info == '响应成功') {
						this.info.nameOfGuardian = res.data.guardian;
						this.info.RelationshipWithPatients = res.data.relative;
						this.info.dateOfCompletion = res.data.create_time;
					}else{
						this.info = {}
					}
				})
			},
			handleTableBtn(item, i) {
				if (item == 'search') {
					this.table = [];
					this.pagination.page = 1;
					this.handleSearchMentalIllnessFollowList();
				}
				if (item == 'searchAdd') {
					uni.removeStorageSync('edit');
					this.state = 'followUpInformationOnMentalDisorders';
				}
				if (item == 'edit') {
					uni.setStorageSync('edit', i);
					this.state = 'followUpInformationOnMentalDisorders';
				}
				if (item == 'del') {
					this.handleDelMentalIllnessFollow(i);
				}
				if (item == 'infoBtn') {
					this.state = 'psychiatricDetails';
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
			handleTapSearchInput(item) {
				if (item == 'searchStartTimes') {
					this.timeStatus = item;
				} else {
					this.timeStatus = item;
				}
			},
			handleSearchMentalIllnessFollowList() {
				let data = {
					person_id: this.person_id,
					paginationobj: JSON.stringify(this.pagination),
					follow_starttime: this.searchStartTime,
					follow_endtime: this.searchEndTime
				}
				// console.log(data);
				this.searchStartTime = '';
				this.searchEndTime = '';
				this.$u.post('SearchMentalIllnessFollowList', data).then(res => {
					// console.log(res);
					if (res.code == 200 && res.info == '响应成功' && res.data[0].infoList.length) {
						let arr = [];
						this.pagination.total = res.data[0].pageTotal;
						res.data[0].infoList.forEach(item => {
							if (item.follow_time !== '') {
								item.follow_time = /\d{4}-\d{1,2}-\d{1,2}/g.exec(item.follow_time).join(
									',');
							}
							if (item.next_follow_time !== '') {
								item.next_follow_time = /\d{4}-\d{1,2}-\d{1,2}/g.exec(item
									.next_follow_time).join(
									',');
							}
							arr.push(item)
						})
						this.table = this.table.concat(arr);
					}
					if (res.code == 200 && res.info == '响应成功' && res.data[0].pageTotal == 0) {
							this.$lz.toast('没有更多数据了');
					}
				}).catch(err => {
					console.log(err);
				})
			},
			handleScrolltolower(e) {
				if (this.pagination.page < this.pagination.total) {
					this.pagination.page++;
					this.handleSearchMentalIllnessFollowList();
				} else {
					this.$lz.toast('没有更多数据了!');
				}
			},
			handleDelMentalIllnessFollow(item) {
				this.$lz.showCancel('', '是否要删除?').then(res => {
					console.log(item);
					this.$u.post('DelMentalIllnessFollow', {
						follow_id: item.follow_id
					}).then(res => {
						console.log(res);
						if (res.code == 200 && res.info == '响应成功' && res.data == true) {
							this.pagination.page = 1;
							this.table = [];
							this.handleSearchMentalIllnessFollowList();
						}
					}).catch(err => {
						console.log(err);
					})
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
	}
</style>
