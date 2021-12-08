<template>
	<scroll-view class="wrap" scroll-y>
		<view v-if="state == '0'">
			<free-title title="冠心病随访列表"></free-title>
			<follow-up :content="false"></follow-up>
			<table-list :table="table" @click="handleTableBtn" :searchStartTime="searchStartTime"
			:searchEndTime="searchEndTime" @confirm="handleConfirmPicker" @search="handleTapSearchInput"
			@scrolltolower="handleScrolltolower"></table-list>
		</view>
		<follow-up-details-of-coronary-heart-disease v-if="state == 'gxbsf'"></follow-up-details-of-coronary-heart-disease>
		
	</scroll-view>
</template>

<script>
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import followUp from '@/components/free-ui/free-followUp/followUp.vue';
	import tableList from '@/components/free-ui/free-table/table.vue';
	import followUpDetailsOfCoronaryHeartDisease from '../followUpDetailsOfCoronaryHeartDisease/followUpDetailsOfCoronaryHeartDisease.vue'
	export default {
		components:{
			freeTitle,
			followUp,
			tableList,
			followUpDetailsOfCoronaryHeartDisease
		},
		data() {
			return {
				state: '0',
				searchEndTime:'',
				searchStartTime:'',
				table: [],
				pagination: {
					rows: 10,
					page: 1,
					sidx: '',
					sord: '',
					records: 0,
					total: 0
				},
				person_id: '',
				timeStatus:''
			}
		},
		mounted() {
			let res = uni.getStorageSync('login_info');
			// console.log(res);
			if (res !== '') {
				this.person_id = res[0].id;
			}
			this.handleSearchCoronaryHeartFollowList();
		},
		methods: {
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
					this.handleSearchCoronaryHeartFollowList();
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
					console.log(this.searchStartTime);
				} else {
					this.searchEndTime = year + '-' + month + '-' + day;
				}
			},
			handleTableBtn(item,i){
				if(item == 'search'){
					this.table = [];
					this.pagination.page = 1;
					this.handleSearchCoronaryHeartFollowList();
				}
				if(item == 'searchAdd'){
					uni.removeStorageSync('edit');
					this.state = 'gxbsf';
				}
				if(item == 'edit'){
					uni.setStorageSync('edit', i);
					this.state = 'gxbsf';
					// console.log(i);
				}
				if(item == 'del'){
					this.handleDelCoronaryHeartFollow(i);
				}
			},
			handleSearchCoronaryHeartFollowList(){
				let data = {
					person_id: this.person_id,
					paginationobj: JSON.stringify(this.pagination),
					follow_starttime: this.searchStartTime,
					follow_endtime: this.searchEndTime
				}
				// console.log(data);
				this.searchStartTime = '';
				this.searchEndTime = '';
				this.$u.post('SearchCoronaryHeartFollowList',data).then(res => {
					// console.log(res);
					if (res.code == 200 && res.info == '响应成功' && res.data.infoList.length) {
						this.pagination.total = res.data.pageTotal;
						let arr = [];
						res.data.infoList.forEach(item => {
							if (item.follow_time !== '') {
								item.follow_time = /\d{4}-\d{1,2}-\d{1,2}/g.exec(item.follow_time).join(
									',');
							}
							arr.push(item)
						})
						this.table = this.table.concat(arr);
					}
					if (res.code == 200 && res.info == '响应成功' && res.data.infoList.length == 0) {
						return this.$lz.toast('没有更多数据了');
					}
				}).catch(err => {
					console.log(err);
				})
			},
			handleDelCoronaryHeartFollow(item){
				console.log(item);
				this.$lz.showCancel('','是否要删除?').then(res => {
					this.$u.post('DelCoronaryHeartFollow',{
						follow_id: item.follow_id
					}).then(res => {
						console.log(res);
						if(res.code == 200 && res.info == '响应成功' && res.data == true){
							this.table = [];
							this.pagination.page = 1;
							this.handleSearchCoronaryHeartFollowList();
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
