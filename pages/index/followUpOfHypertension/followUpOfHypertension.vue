<template>
	<scroll-view class="wrap" scroll-y>
		<view v-if="state == '0'">
			<free-title title="高血压病随访列表"></free-title>
			<follow-up info="高血压基本信息" :list="hypertensionInfo" btn="编辑" :icon="'\ue729'"
				@click="handleTapBtn('infoBtn')">
				<template v-slot:info>
					<text v-if="hypertensionInfo.mrg_group">管理组别：{{hypertensionInfo.mrg_group}}</text>
					<text v-if="hypertensionInfo.cases_sourse" class="info">病例来源：{{hypertensionInfo.cases_sourse}}</text>
					<text v-if="hypertensionInfo.create_time" class="info">填表日期：{{hypertensionInfo.create_time}}</text>
				</template>
			</follow-up>
			<follow-up info="高血压首诊" :list="firstDiagnosisOfHypertension" btn="编辑" :icon="'\ue729'"
				@click="handleTapBtn('firstVisitBtn')">
				<template v-slot:info>
					<text v-if="firstDiagnosisOfHypertension.dateOfFirstVisit">首诊日期：{{firstDiagnosisOfHypertension.dateOfFirstVisit}}</text>
					<text v-if="firstDiagnosisOfHypertension.nextFollowUpDate">下次随访日期：{{firstDiagnosisOfHypertension.nextFollowUpDate}}</text>
				</template>
			</follow-up>
			<table-list :table="table" @click="handleTableBtn" :searchStartTime="searchStartTime" 
			:searchEndTime="searchEndTime" @confirm="handleConfirmPicker" @search="handleTapSearchInput"
			@scrolltolower="handleScrolltolower"></table-list>
		</view>
		<!-- 高血压基本信息 -->
		<hypertension-info v-if="state == 'hypertensionInfo'"></hypertension-info>
		<!-- 高血压首诊详细信息 -->
		<first-diagnosis-of-hypertension v-if="state == 'firstVisitBtn'"></first-diagnosis-of-hypertension>
		<!-- 高血压随访详细信息 -->
		<hypertension-follow-up-details v-if="state == 'searchAdd'"></hypertension-follow-up-details>
	</scroll-view>
</template>

<script>
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import hypertensionInfo from '../hypertensionInfo/hypertensionInfo.vue';
	import firstDiagnosisOfHypertension from '../firstDiagnosisOfHypertension/firstDiagnosisOfHypertension.vue';
	import followUp from '@/components/free-ui/free-followUp/followUp.vue';
	import tableList from '@/components/free-ui/free-table/table.vue';
	import hypertensionFollowUpDetails from '../hypertensionFollowUpDetails/hypertensionFollowUpDetails.vue';
	export default {
		components: {
			hypertensionInfo,
			firstDiagnosisOfHypertension,
			freeTitle,
			followUp,
			tableList,
			hypertensionFollowUpDetails
		},
		data() {
			return {
				searchOffineFollowHypertension: [],
				searchEndTime:'',
				searchStartTime:'',
				state: '0',
				hypertensionInfo: {
					mrg_group: '',
					cases_sourse: '',
					create_time: ''
				},
				firstDiagnosisOfHypertension: {
					dateOfFirstVisit: '',
					nextFollowUpDate: ''
				},
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
				timeStatus:''
			}
		},
		mounted() {
			let res = uni.getStorageSync('login_info');
			// console.log(res);
			if(res !== ''){
				this.person_id = res[0].id;
			}
			this.handleGetHypertensionInfo();
			this.handleSaveHypertensionFirst();
			this.handleSearchHypertensionFollowList();
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
			// 获取高血压基本信息
			handleGetHypertensionInfo(){
				this.$u.post('SearchHypertensionInfo',{
					person_id:this.person_id
				}).then(res => {
					// console.log(res);
					if(res.code == 200 && JSON.stringify(res.data) !== '[]'){
						this.hypertensionInfo.mrg_group = res.data[0].mrg_group;
						this.hypertensionInfo.cases_sourse = res.data[0].cases_sourse;
						this.hypertensionInfo.create_time = res.data[0].create_time;
					}else{
						this.hypertensionInfo = {}
					}
				})
			},
			
			// 获取高血压首诊信息
			handleSaveHypertensionFirst(){
				let obj = {
					person_id:this.person_id,
					follow_type:'gxysz'
				}
				this.$u.post('SearchHypertensionFirst',obj).then(res => {
					// console.log(res);
					if(res.code == 200 && JSON.stringify(res.data) !== '[]'){
						this.firstDiagnosisOfHypertension.dateOfFirstVisit = res.data[0].first_date;
						this.firstDiagnosisOfHypertension.nextFollowUpDate = res.data[0].next_follow_time;
					}else{
						this.firstDiagnosisOfHypertension = {}
					}
				})
			},
			handleTapBtn(item) {
				switch (item) {
					case 'infoBtn':
						this.state = 'hypertensionInfo';
						break;
					case 'firstVisitBtn':
						this.state = 'firstVisitBtn';
						break;
					case 'search':
						console.log('search');
				}
			},
			handleTableBtn(item,i,index){
				if(item == 'search'){
					this.table = [];
					this.pagination.page = 1;
					this.handleSearchHypertensionFollowList();
				}
				if(item == 'searchAdd'){
					this.state = 'searchAdd';
					uni.removeStorageSync('edit');
				}
				if(item == 'edit'){
					this.state = 'searchAdd';
					uni.setStorageSync('edit',i)
					// console.log(i);
				}
				if(item == 'del'){
					this.$lz.showCancel('','是否要删除?').then(res => {
						if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
							this.handleDelHypertensionFollow(i)
						}
					})
				}
			},
			// 查询高血压随访列表
			handleSearchHypertensionFollowList(){
				let obj = {
					person_id: this.person_id,
					paginationobj:JSON.stringify(this.pagination),
					follow_starttime: this.searchStartTime,
					follow_endtime: this.searchEndTime,
					next_starttime:'',
					next_endtime:''
				}
				this.searchStartTime = '';
				this.searchEndTime = '';
				// console.log(obj);
				// 有网
				if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
					this.$u.post('SearchHypertensionFollowList',obj).then(res => {
						console.log(res);
						if(res.code == 200 && res.info == '响应成功' && res.data.length){
							this.pagination.total = res.data[0].pageTotal;
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
								// console.log(this.table.length);
							}
						}
						if(res.code == 200 && res.info == '响应成功' && res.data[0].infoList.length == 0){
							this.$lz.toast('没有更多数据了~')
						}
					}).catch(err => {
						console.log(err);
					})
				}
				// 离线
				
			},
			// 查询高血压随访列表 离线
			
			handleScrolltolower(e){
				if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
					if(this.pagination.page < this.pagination.total){
						this.pagination.page++;
						this.handleSearchHypertensionFollowList();
						console.log(this.table.length);
					}else{
						this.$lz.toast('没有更多数据了!');
					}
				}
			},
			handleDelHypertensionFollow(item){
				this.$u.post('DelHypertensionFollow',{
					id: item.follow_id
				}).then(res => {
					console.log(res);
					if(res.code == 200 && res.data == true){
						this.pagination.page = 1;
						this.table = [];
						this.handleSearchHypertensionFollowList();
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
