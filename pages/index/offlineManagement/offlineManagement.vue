<template>
	<view>
		<category v-if="states == 0" :contentList="contentList" @click="handleTapCategoryItem"></category>
		<view v-if="states == 1">
			<offline-download v-if="item == '离线下载'"></offline-download>
			<offline-upload v-if="item == '离线上传'"></offline-upload>
		</view>
	</view>
</template>

<script>
	import category from '@/components/free-ui/free-category/category.vue';
	import offlineDownload from '../offlineDownload/offlineDownload.vue';
	import offlineUpload from '../offlineUpload/offlineUpload.vue';
	export default {
		components: {
			category,
			offlineDownload,
			offlineUpload
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
				item: '',
				states: 0
			}
		},
		mounted() {
			this.__init();
			this.states = this.state;
		},
		watch: {
			state: {
				immediate: true,
				handler(val) {
					this.states = val;
				}
			}
		},
		methods: {
			__init() {
				this.contentList.push({
					picture: 'https://z3.ax1x.com/2021/05/29/2kL8wF.png',
					name: '离线下载'
				}, {
					picture: 'https://z3.ax1x.com/2021/05/29/2kLYFJ.png',
					name: '离线上传'
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
			handleTapCategoryItem(item, index) {
				this.item = item;
				this.$emit('click', this.states, item)
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		height: calc(100vh - .5rem);
		width: 100%;

		.container {
			width: 100%;
			padding: .1rem;
			display: flex;
			flex-wrap: wrap;

			.content {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 47%;
				background-color: #f7f7f7;
				border-radius: 12rpx;
				padding: .1rem;
				margin: 0 .1rem .1rem .1rem;

				&>.content-left {
					display: flex;
					align-items: center;
					justify-content: center;
					flex: 1;

					.u-checkbox-group {
						padding-left: .14rem;
					}
				}

				&>.content-right {
					display: flex;
					flex-direction: column;
					flex: 8;
					// background-color: #c2e7ff;
					padding: 0 .1rem 0 .1rem;

				}
			}
		}
	}
</style>
