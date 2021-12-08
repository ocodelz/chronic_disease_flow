<template>
	<scroll-view class="wrap" scroll-y>
		<view  v-if="state == '0'">
			<free-title title="高血压高危人群列表"></free-title>
			<follow-up :content="false"></follow-up>
			<table-list :table="table" @click="handleTableBtn" :searchStartTime="searchStartTime"
			:searchEndTime="searchEndTime" @confirm="handleConfirmPicker" @search="handleTapSearchInput" @scrolltolower="handleScrolltolower"></table-list>
		</view>
		<high-risk-information-of-hypertension v-if="state == 'searchAdd'"></high-risk-information-of-hypertension>
	</scroll-view>
</template>

<script>
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import followUp from '@/components/free-ui/free-followUp/followUp.vue';
	import tableList from '@/components/free-ui/free-table/table.vue';
	import highRiskInformationOfHypertension from '../highRiskInformationOfHypertension/highRiskInformationOfHypertension.vue';
	export default {
		components:{
			freeTitle,
			followUp,
			tableList,
			highRiskInformationOfHypertension
		},
		data() {
			return {
				state: '0',
				table: [],
				person_id:'',
				pagination: {
					rows: 10,
					page: 1,
					sidx: '',
					sord: '',
					records: 0,
					total: 0
				},
				searchStartTime:'',
				searchEndTime:'',
				timeStatus:''
			}
		},
		mounted() {
			let res = uni.getStorageSync('login_info');
			if(res !== ''){
				this.person_id = res[0].id;
			}
			this.handleSearchHighFollowList();
		},
		methods: {
			handleTapSearchInput(item){
				if (item == 'searchStartTimes') {
					this.timeStatus = item;
				} else {
					this.timeStatus = item;
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
					console.log('search');
					this.table = [];
					this.pagination.page = 1;
					this.handleSearchHighFollowList();
				}
				if(item == 'searchAdd'){
					this.state = 'searchAdd';
					uni.removeStorageSync('edit');
				}
				if(item == 'edit'){
					this.state = 'searchAdd';
					uni.setStorageSync('edit',i)
				}
				if(item == 'del'){
					this.$lz.showCancel('','是否要删除').then(res => {
						this.handleDelHighHypertensionFollow(i);
					})
				}
			},
			handleSearchHighFollowList(){
				let obj = {
					person_id: this.person_id,
					paginationobj:JSON.stringify(this.pagination),
					follow_starttime: this.searchStartTime,
					follow_endtime: this.searchEndTime,
					next_starttime:'',
					next_endtime:''
				}
				// console.log(obj);
				this.searchStartTime = '';
				this.searchEndTime = '';
				this.$u.post('SearchHighFollowList',obj).then(res => {
					// console.log(res);
					if(res.code == 200 && res.info == '响应成功' && res.data.length){
						this.pagination.total = res.data.pageTotal;
						let arr = [];
						if(res.data[0].infoList.length > 0){
							res.data[0].infoList.forEach(item => {
								if(item.follow_time !== ''){
									item.follow_time = /\d{4}-\d{1,2}-\d{1,2}/g.exec(item.follow_time).join(',');
								}
								if(item.next_follow_time !== ''){
									item.next_follow_time = /\d{4}-\d{1,2}-\d{1,2}/g.exec(item.next_follow_time).join(',');
								}
								arr.push(item)
							})
							this.table = this.table.concat(arr);
						}
						if(res.code == 200 && res.info == '响应成功' && res.data[0].infoList.length == 0){
							this.$lz.toast('没有更多数据了');
						}
					}
				}).catch(err => {
					console.log(err);
				})
			},
			handleScrolltolower(e){
				if(this.pagination.page < this.pagination.total){
					this.pagination.page++;
					this.handleSearchHighFollowList();
				}else{
					this.$lz.toast('没有更多数据了!');
				}
			},
			handleDelHighHypertensionFollow(item){
				console.log(item);
				this.$u.post('DelHighHypertensionFollow',{
					id: item.follow_id
				}).then(res => {
					console.log(res);
					if(res.code == 200 && res.data == true){
						this.pagination.page = 1;
						this.table = [];
						this.handleSearchHighFollowList();
					}
				}).catch(err => {
					console.log(err);
				})
			},
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
