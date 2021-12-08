<template>
	<view v-if="loading">
		<category v-if="states == 0" :contentList="contentList" @click="handleTapCategoryItem"></category>
		<view v-if="states == 1">
			<follow-up-management v-if="item == '高血压随访'"></follow-up-management>
			<diabetes-follow-up v-if="item == '糖尿病随访'"></diabetes-follow-up>
			<severe-mental-illness v-if="item == '重性精神疾病'"></severe-mental-illness>
			<follow-up-of-coronary-heart-disease v-if="item == '冠心病随访'"></follow-up-of-coronary-heart-disease>
			<follow-up-of-stroke v-if="item == '脑卒中随访'"></follow-up-of-stroke>
			<follow-up-of-tuberculosis v-if="item == '结核病随访'"></follow-up-of-tuberculosis>
			<AIDSFollowUp v-if="item == '艾滋病随访'"></AIDSFollowUp>
			<high-risk-group-of-hypertension v-if="item == '高血压高危人群'"></high-risk-group-of-hypertension>
		</view>
	</view>
</template>

<script>
	import category from '@/components/free-ui/free-category/category.vue';
	import followUpManagement from '../followUpOfHypertension/followUpOfHypertension.vue';
	import diabetesFollowUp from '../diabetesFollowUp/diabetesFollowUp.vue';
	import severeMentalIllness from '../severeMentalIllness/severeMentalIllness.vue';
	import followUpOfCoronaryHeartDisease from '../followUpOfCoronaryHeartDisease/followUpOfCoronaryHeartDisease.vue';
	import followUpOfStroke from '../followUpOfStroke/followUpOfStroke.vue';
	import followUpOfTuberculosis from '../followUpOfTuberculosis/followUpOfTuberculosis.vue';
	import AIDSFollowUp from '../AIDSFollowUp/AIDSFollowUp.vue';
	import highRiskGroupOfHypertension from '../highRiskGroupOfHypertension/highRiskGroupOfHypertension.vue';
	export default {
		components: {
			category,
			followUpManagement,
			diabetesFollowUp,
			severeMentalIllness,
			followUpOfCoronaryHeartDisease,
			followUpOfStroke,
			followUpOfTuberculosis,
			AIDSFollowUp,
			highRiskGroupOfHypertension
		},
		props: {
			state: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				contentList: [],
				states: 0,
				item: '',
				loading: false,
				flag: true,
			}
		},
		mounted() {
			let res = uni.getStorageSync('login_info');
			if(res !== ''){
				this.id = res[0].id;
			}
			this.__init();
			this.states = this.state;
		},
		watch: {
			// 监听 state 状态
			state: {
				immediate: true,
				handler(val) {
					this.states = val;
				}
			}
		},
		methods: {
			__init() {
				let searchIcons = uni.getStorageSync('SearchIcons');
				// console.log('searchIcons',searchIcons);
				let loginInfoLx = uni.getStorageSync('login_info_lx');
				let personInfo = uni.getStorageSync('personInfo');
				let icons = [{id: 1, name: '高血压高危人群'}];
				if(this.$store.state.lxUserInfo != '' && this.$store.state.lxUserInfo.lxStatus && searchIcons.length){
					if(this.flag){
						for(let item of searchIcons){
							if(item.person_id == loginInfoLx.id){
								this.contentList = item.icons;
								console.log(item);
							}else{
								this.flag = false;
							}
						}
					}
					if(this.flag == false){
						let i = 1, name = '';
						for(let item of personInfo){
							if(item.data.grxx.id == loginInfoLx.id){
								for(let jtem of item.data.rqfl){
									i++;
									if(jtem.person_type !== '严重精神障碍' || jtem.person_type !== '高血压高危人群'){
										name = jtem.person_type + '随访'
									}
									if(jtem.person_type == '严重精神障碍'){
										name = '重性精神疾病'
									}
									icons.push({
										id: i,
										name: name
									});
								}
							}
						}
						this.contentList = icons;
					}
				}
				if(this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false){
					this.$u.post('SearchIcon', {
						person_id: this.id,
						type: '随访管理'
					}).then(res => {
						// console.log(JSON.stringify(res));
						this.contentList.push(res.data);
						// console.log(res);
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
				this.loading = true;
			},
			handleTapCategoryItem(item, index) {
				this.item = item;
				this.$emit('click', this.states, item)
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
