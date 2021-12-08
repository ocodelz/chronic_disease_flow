<template>
	<swiper :indicator-dots="isIndicatorDots" class="swiper-box">
		<swiper-item class="swiper-item" v-for="(item,index) in contentList" :key="index">
			<view v-for="(item2,index2) in item" :key="index2" class="swiper-item-box" @click="handleTapItem(item2.name,index2)">
				<image :src="item2.picture" class="img"></image>
				<text class="text">{{item2.name}}</text>
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		props: {
			contentList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				isIndicatorDots: false
			}
		},
		mounted() {
			this.handleSwiperIndicatorDots();
			// console.log(this.contentList);
		},
		methods: {
			// 面板指示点显示状态
			handleSwiperIndicatorDots() {
				this.contentList.length > 1 ? this.isIndicatorDots = true : this.isIndicatorDots = false
			},
			// 传递数据
			handleTapItem(item, index) {
				this.$emit('click', item, index);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-box {
		height: calc(100vh - .5rem);
		width: 100%;
		.swiper-item {
			display: flex;
			flex-wrap: wrap;
			.swiper-item-box {
				display: flex;
				flex-direction: column;
				width: 1.5rem;
				align-items: center;
				justify-content: center;
				height: 1.9rem;
				.img {
					width: 1rem;
					height: 1rem;
					border-radius: 12rpx;
					border: 1rpx solid #f0f0f0;
				}

				.text {
					width: 100%;
					height: .4rem;
					font-size: .21rem;
					margin-top: .2rem;
					color: #6c757d;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
</style>
