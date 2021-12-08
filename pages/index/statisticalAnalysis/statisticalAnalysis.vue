<template>
	<view>
		<category v-if="states == 0" :contentList="contentList" @click="handleTapCategoryItem"></category>
		<view v-if="states == 1">
			<file-query v-if="item == '档案查询'"></file-query>
			<follow-up-inquiry v-if="item == '随访查询'"></follow-up-inquiry>
		</view>
	</view>
</template>

<script>
	import category from '@/components/free-ui/free-category/category.vue';
	import fileQuery from '../fileQuery/fileQuery.vue';
	import followUpInquiry from '../followUpInquiry/followUpInquiry.vue';
	export default {
		components:{
			category,
			fileQuery,
			followUpInquiry
		},
		props: {
			state: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				states: 0,
				contentList: [],
				item: ''
			}
		},
		mounted() {
			this.__init();
			this.states = this.state;
		},
		watch: {
			// 监听 state 状态
			state: {
				immediate: true,
				handler(val) {
					this.states = val;
					// console.log(this.states);
				}
			}
		},
		methods: {
			// 初始化数据
			__init() {
				this.contentList.push({
					picture: 'https://z3.ax1x.com/2021/05/25/gzTx78.png',
					name: '档案查询'
				}, {
					picture: 'https://z3.ax1x.com/2021/05/25/gzYMN9.png',
					name: '随访查询'
				})
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
			// category组件列表点击事件
			handleTapCategoryItem(item,index) {
				this.item = item;
				this.$emit('click', this.states, item)
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
