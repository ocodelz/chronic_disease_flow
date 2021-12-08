<template>
	<view class="wrap">
		<scroll-view scroll-y class="scroll">
			<free-title title="艾滋病服药记录" isRight></free-title>
			<view class="container">
				<view class="content">
					<view class="main" v-for="(item,index) in list" :key="index">
						<text class="name">{{item.name}}</text>
						<input :disabled="item.disabled" :placeholder="item.placeholder" :adjust-position="false" v-model="item.model" 
						@click="item.select !== '' ? handleTapItem(item.name) : ''"/>
						<text class="iconfont required">{{item.required}}</text>
						<text class="iconfont select">{{item.select}}</text>
					</view>
				</view>
			</view>
			<view class="btn-container">
				<u-button class="btn" type="primary" @click="handleSubmitBtn">保存</u-button>
			</view>
		</scroll-view>
		<u-picker v-model="isTime" mode="time" @confirm="handlePicker"></u-picker>
		<u-select v-model="selectorIsShow" :list="sexSelect" @confirm="handleSelect"></u-select>
	</view>
</template>

<script>
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import utils from '@/common/utils.js';
	export default {
		components: {
			freeTitle
		},
		data() {
			return {
				isTime: false,
				selectorIsShow: false,
				list: [
					{
						name: '日期：',
						required: '\ue635',
						model: '',
						select: '\ue65a',
						disabled: true,
						placeholder: '请选择',
						key: 'create_time'
					},
					{
						name: '抗毒治疗编号：',
						required: '\ue635',
						model: '',
						select: '',
						disabled: false,
						placeholder: '',
						key: 'kangduzhiliao_no'
					},
					{
						name: '监督员姓名：',
						required: '\ue635',
						model: '',
						select: '',
						disabled: false,
						placeholder: '',
						key: 'supervisor_name'
					},
					{
						name: '监督员性别：',
						required: '\ue635',
						model: '',
						select: '\ue65a',
						disabled: true,
						placeholder: '请选择',
						key: 'supervisor_sex'
					},
					{
						name: '监督员年龄：',
						required: '\ue635',
						model: '',
						select: '',
						disabled: false,
						placeholder: '',
						key: 'supervisor_age'
					},
					{
						name: '监督员电话：',
						required: '\ue635',
						model: '',
						select: '',
						disabled: false,
						placeholder: '',
						key: 'supervisor_tel'
					},
					{
						name: '监督员住址：',
						required: '\ue635',
						model: '',
						select: '',
						disabled: false,
						placeholder: '',
						key: 'supervisor_ads'
					},
					{
						name: '两者之间关系：',
						required: '\ue635',
						model: '',
						select: '',
						disabled: false,
						placeholder: '',
						key: 'relative'
					}
				],
				sexSelect: utils.gender,
				person_id: '',
				id: ''
			}
		},
		mounted() {
			let res = uni.getStorageSync('login_info');
			// console.log(res);
			let edit = uni.getStorageSync('edit');
			// console.log(edit);
			if(edit){
				this.id = edit.id;
				this.person_id = edit.person_id;
			}else{
				if (res !== '') {
					this.person_id = res[0].id;
				}
			}
			this.handleSearchAidsDrugs();
		},
		methods: {
			// 判断日期选择器 和 select选择器是否显示
			handleTapItem(item){
				if(item == '日期：'){
					this.isTime = true;
				}
				if(item == '监督员性别：'){
					this.selectorIsShow = true;
				}
			},
			//时间赋值
			handlePicker(e) {
				for (let item of this.list) {
					if (item.name == '日期：') {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
			},
			// list select 赋值
			handleSelect(e) {
				for (let item of this.list) {
					if (item.name == '监督员性别：') {
						item.model = e[0].label;
					}
				}
			},
			// 发起网络请求 提交信息
			handleSubmitBtn(){
				console.log(this.list);
				for(let item of this.list){
					if(item.required!=='' && item.model == ''){
						return this.$lz.toast('必填项不能为空');
					}
				}
				let param = {
					entity:{
						id: this.id,
						person_id: this.person_id
					}
				}
				for(let item of this.list){
					param.entity[item.key] = item.model;
				}
				console.log(param);
				this.$u.post('SaveAidsDrug',param).then(res => {
					if(res.code == 200 && res.info == '响应成功'){
						this.$lz.toast(res.info);
						this.id = res.data.id;
					}
					console.log(res);
				}).catch(err => {
					console.log(err);
				})
			},
			// 发起网络请求查询信息
			handleSearchAidsDrugs(){
				this.$u.post('SearchAidsDrugs',{
					id: this.id
				}).then(res => {
					// console.log(res);
					if(res.code == 200 && res.info == '响应成功'){
						for(let item of this.list){
							item.model = res.data[item.key];
						}
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
		width: 100%;
		height: calc(100vh - .5rem);
		background-color: #f0f0f0;
		font-size: .12rem;

		.scroll {
			width: 100%;
			height: calc(100vh - .5rem);

			.container {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				margin-bottom: .1rem;

				.content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					margin-bottom: .1rem;
					.main{
						width: 50%;
						display: flex;
						margin: .1rem 0;
						align-items: center;
						position: relative;
						.name{
							width: 1rem;
							text-align: right;
							flex-shrink: 0;
						}
						& > input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 1.6rem;
							margin-left: .1rem;
						}
						.required{
							color: #f00;
						}
						.select{
							position: absolute;
							color: #ccc;
							right: 1.45rem;
						}
					}
				}
			}
		}
		.btn-container {
			display: flex;
			align-items: center;
			justify-content: center;
		
			.btn {
				position: fixed;
				bottom: .2rem;
				width: 1.1rem;
				height: .3rem;
			}
		}
	}
</style>