<template>
	<movable-area class="fixed-box">
		<movable-view class="fixed-button" direction="all" :inertia="true">
			<slot></slot>
		</movable-view>
	</movable-area>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style scoped lang="scss">
	.fixed-box {
		pointer-events: none; 
		width: calc(100vw - .9rem);
		height: calc(100vh - .5rem);
		z-index: 100000;
		position: fixed;
		right: 0;
		bottom: 0;
		.fixed-button {
			display: flex;
			justify-content: center;
			align-items: center;
			width: min-content;
			height: auto;
			pointer-events: auto;
			z-index: 9999;
			top: calc(50vh - 1rem);
			left: calc(100vw - .9rem);
		}
	}
</style>
