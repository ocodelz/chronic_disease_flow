<template>
	<scroll-view class="wrap" scroll-y>
		<view v-if="state == '0'">
			<free-title title="肺结核第一次随访信息"></free-title>
			<follow-up info="肺结核第一次随访信息" :list="info" btn="编辑" :icon="'\ue729'"
			@click="handleTableBtn('infoBtn')">
				<template v-slot:info>
					<text>随访编号：{{info.followUpNumber}}</text>
					<text>随访时间：{{info.followUpTime}}</text>
					<text>随访方式：{{info.followUpMode}}</text>
				</template>
			</follow-up>
			<table-list :table="table" @click="handleTableBtn" :searchStartTime="searchStartTime"
			:searchEndTime="searchEndTime" @confirm="handleConfirmPicker" @search="handleTapSearchInput"
			@scrolltolower="handleScrolltolower"></table-list>
		</view>
		<tuberculosis-first-follow v-if="state == 'tuberculosisFirstFollow'"></tuberculosis-first-follow>
		<tuberculosis-follow-details v-if="state == 'tuberculosisFollowDetails'"></tuberculosis-follow-details>
	</scroll-view>
</template>

<script>
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import followUp from '@/components/free-ui/free-followUp/followUp.vue';
	import tableList from '@/components/free-ui/free-table/table.vue';
	import tuberculosisFirstFollow from '../tuberculosisFirstFollow/tuberculosisFirstFollow.vue';
	import tuberculosisFollowDetails from '../tuberculosisFollowDetails/tuberculosisFollowDetails.vue';
	export default {
		components:{
			freeTitle,
			followUp,
			tableList,
			tuberculosisFirstFollow,
			tuberculosisFollowDetails
		},
		data() {
			return {
				state: '0',
				info:{
					followUpNumber:'',
					followUpTime:'',
					followUpMode:''
				},
				pagination: {
					rows: 10,
					page: 1,
					sidx: '',
					sord: '',
					records: 0,
					total: 0
				},
				searchEndTime:'',
				searchStartTime:'',
				table: [],
				timeStatus: '',
				person_id: ''
			}
		},
		mounted() {
			let res = uni.getStorageSync('login_info');
			// console.log(res);
			if (res !== '') {
				this.person_id = res[0].id;
			}
			this.handleSearchLungFollowList();
			this.handleSearchLungFirstFollow();
		},
		methods: {
			handleSearchLungFirstFollow(){
				this.$u.post('SearchLungFirstFollow',{
					person_id: this.person_id
				}).then(res => {
					console.log(res);
				}).catch(err => {
					console.log(err);
				})
			},
			handleTapSearchInput(item){
				if (item == 'searchStartTimes') {
					this.timeStatus = item;
				} else {
					this.timeStatus = item;
				}
			},
			handleScrolltolower(e){
				if(this.pagination.page < this.pagination.total){
					this.pagination.page++;
					this.handleSearchLungFollowList();
				}else{
					this.$lz.toast('没有更多数据了!');
				}
			},
			handleConfirmPicker(e){
				let year = e.year,
					month = e.month,
					day = e.day;
				if (this.timeStatus == 'searchStartTimes') {
					this.searchStartTime = year + '-' + month + '-' + day;
				} else {
					this.searchEndTime = year + '-' + month + '-' + day;
				}
			},
			handleTableBtn(item,i){
				if(item == 'infoBtn'){
					this.state = 'tuberculosisFirstFollow';
					console.log(1);
				}
				if(item == 'search'){
					this.table = [];
					this.pagination.page = 1;
					console.log(2);
					this.handleSearchLungFollowList();
				}
				if(item == 'searchAdd'){
					uni.removeStorageSync('edit');
					this.state = 'tuberculosisFollowDetails';
					console.log(3);
				}
				if(item == 'edit'){
					uni.setStorageSync('edit', i);
					console.log(i);
					this.state = 'tuberculosisFollowDetails';
				}
				if(item == 'del'){
					console.log(5);
					this.handleDelLungFollow(i);
				}
			},
			// 查询肺结核随访列表信息
			handleSearchLungFollowList(){
				let data = {
					person_id: this.person_id,
					paginationobj: JSON.stringify(this.pagination),
					follow_starttime: this.searchStartTime,
					follow_endtime: this.searchEndTime
				}
				this.searchStartTime = '';
				this.searchEndTime = '';
				this.$u.post('SearchLungFollowList',data).then(res => {
					console.log(res);
					if(res.code == 200 && res.info == '响应成功' && res.data.pagedatas.length){
						this.pagination.total = res.data.pagenumber;
						let arr = [];
						res.data.pagedatas.forEach(item => {
							if (item.follow_time !== '') {
								item.follow_time = /\d{4}-\d{1,2}-\d{1,2}/g.exec(item.follow_time).join(
									',');
							}
							if (item.next_follow_time !== '') {
								item.next_follow_time = /\d{4}-\d{1,2}-\d{1,2}/g.exec(item.next_follow_time).join(
									',');
							}
							arr.push(item)
						})
						this.table = this.table.concat(arr);
					}
				}).catch(err => {
					console.log(err);
				})
			},
			handleDelLungFollow(item){
				console.log(item);
				this.$lz.showCancel('','是否要删除?').then(res => {
					this.$u.post('DelLungFollow',{
						id: item.follow_id
					}).then(res => {
						console.log(res);
						if(res.code == 200 && res.info == '响应成功' && res.data == true){
							this.table = [];
							this.pagination.page = 1;
							this.handleSearchLungFollowList();
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
