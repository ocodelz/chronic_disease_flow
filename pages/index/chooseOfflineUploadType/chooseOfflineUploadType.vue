<template>
	<view>
		<category v-if="states == 0" :contentList="contentList" @click="handleTapCategoryItem"></category>
		<view v-if="states == 1">
			<upload-personal-files-offline v-if="item == '个人档案'"></upload-personal-files-offline>
			<data-management v-if="item == '数据管理'"></data-management>
		</view>
	</view>
</template>

<script>
	import category from '@/components/free-ui/free-category/category.vue';
	import uploadPersonalFilesOffline from '../uploadPersonalFilesOffline/uploadPersonalFilesOffline.vue';
	import dataManagement from '../dataManagement/dataManagement.vue'
	export default {
		components: {
			category,
			uploadPersonalFilesOffline,
			dataManagement
		},
		data() {
			return {
				contentList: [],
				item: '',
				states: 0
			}
		},
		mounted() {
			this.__init();
		},
		methods:{
			__init() {
				this.contentList.push({
					picture: 'https://z3.ax1x.com/2021/05/29/2kL8wF.png',
					name: '个人档案'
				},
				{
					picture: 'https://z3.ax1x.com/2021/05/29/2kL8wF.png',
					name: '数据管理'
				}
				)
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
			handleTapCategoryItem(item, index) {
				this.item = item;
				// this.$emit('click', this.states, item)
				this.states = 1;
			}
		}
	}
</script>

<style>
</style>
