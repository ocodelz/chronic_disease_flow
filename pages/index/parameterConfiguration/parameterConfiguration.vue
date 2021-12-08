<template>
	<view class="wrap">
		<scroll-view scroll-y class="scroll">
			<view class="head">
				<block v-for="(item,index) in headItem" :key="index">
					<view :class="current == index ? 'item active' : 'item'" @click="current = index">{{item}}</view>
				</block>
			</view>
			<view class="container" v-if="current == 1">
				<view class="content">
					<text class="title">基本设置</text>
					<view class="main" v-for="(item,index) in basicSettingsList" :key="index">
						<text class="name">{{item.name}}</text>
						<input 
							:disabled="item.disabled"
							:adjust-position="false"
							v-model="item.value"
							@click="item.select ? handleTabInput(item.name) : ''"
						/>
						<text class="iconfont select" v-if="item.select">{{item.select}}</text>
					</view>
				</view>
				<view class="content">
					<text class="title">体检及随访设置</text>
					<view class="main" v-for="(item,index) in tjsfList" :key="index">
						<text class="name">{{item.name}}</text>
						<input 
							:disabled="item.disabled" 
							:adjust-position="false"
							v-model="item.value"
							@click="item.select ? handleTabInput(item.name) : ''"
						/>
						<text class="iconfont select" v-if="item.select">{{item.select}}</text>
					</view>
				</view>
			</view>
			<view class="btn-container">
				<u-button class="btn" type="primary" @click="handleSaveBasicSetting">保存</u-button>
			</view>
		</scroll-view>
		<u-select v-model="selectorIsShow" :list="selectList" @confirm="handleConfirmSelect"></u-select>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import data from '@/common/utils.js'
	export default {
		data() {
			return {
				headItem: ['系统设置', '基本设置', '异常及体检报告设置', '快捷功能'],
				selectorIsShow: false,
				current: 1,
				selectList: [],
				item: '',
				id: '',
				F_CompanyId: ''
			}
		},
		computed: {
			...mapState(['basicSettingsList','tjsfList']),
		},
		mounted() {
			let res = uni.getStorageSync('SearchDepartList');
			console.log(res);
			if(res !== ''){
				this.F_CompanyId = '20011013-2df1-491a-938e-18613614072a';
			}
			console.log(this.tjsfList);
			this.handleSearchBasicSetting();
		},
		methods: {
			// 点击输入框 进行赋值
			handleTabInput(item){
				this.selectorIsShow = true;
				this.item = item;
				switch (item){
					case "是否显示摄像":
					case "切换用户时，是否提示保存":
					case "未完善完全信息时是否进行提示":
					case "是否默认显示最后一次随访信息":
					case "是否展示结核病以及中医辨识部分":
					case "是否开启复查":
					case "腰围计算是否开启":
					case "呼吸频率计算是否开启":
					case "食盐摄入是否显示":
					case "健康体检中的小结是否显示":
					case "高血压随访中是否显示新发合并症":
					case "高血压随访中是否显示诊断":
					case "健康指导的无是否显示":
					case "高血压随访中是否显示生活方式指导":
					case "老年人中医药管理中选中某体质是否默认文字":
					case "是否默认老年人自理能力评估":
					case "是否开启开年人中医药保健指导勾选":
						this.selectList = data.yesOrNo;
						break;
					case "健康体检减体重限制":
						this.selectList = data.tzxz;
						break;
					case "体检中血压默认左右手":
						this.selectList = data.mrzys;
						break;
					case "高血压随访中用药情况及用药指导版本":
						this.selectList = data.yyzdbb;
						break;
					case "精神病随访中用药情况及用药指导版本":
					case "精神病随访中转诊版本":
						this.selectList = data.jsbbb;
						break;
					case "精神病随访是否显示本次随访对象":
						this.selectList = data.bcsfdx;
						break;
					case "腰围计算公式":
						this.selectList = data.ywjsgs;
						break;
					
				}
			},
			// u-select confirm事件
			handleConfirmSelect(e){
				for (let item of this.basicSettingsList) {
					if(this.item == item.name){
						item.value = e[0].label
					}
				}
				for (let item of this.tjsfList) {
					if(this.item == item.name){
						item.value = e[0].label
					}
				}
			},
			// 点击保存按钮 发起网络请求保存基本设置信息 并提交vuex全局参数
			handleSaveBasicSetting(){
				let param = {
					data: {}
				}
				let basicsetup = {
					id: this.id,
					F_CompanyId: '20011013-2df1-491a-938e-18613614072a'
				}
				for(let item of this.basicSettingsList){
					basicsetup[item.key] = item.value
				}
				param.data.basicsetup = basicsetup;
				let tyjsfsz = {};
				for(let item of this.tjsfList){
					tyjsfsz[item.key] = item.value;
				}
				param.data.tyjsfsz = tyjsfsz;
				console.log(param);
				this.$u.post('SaveBasicSetting',param).then(res => {
					console.log(res);
					if(res.code == 200 && res.info == '响应成功'){
						this.id = res.data.id;
						this.$lz.toast(res.info);
						this.$store.commit("tjsfList",this.tjsfList);
						this.$store.commit("basicSettingsList",this.basicSettingsList);
					}
				}).catch(err => {
					console.log(err);
				})
			},
			// 基本设置(查询)
			handleSearchBasicSetting(){
				this.$u.post('SearchBasicSetting',{
					F_companyId: '20011013-2df1-491a-938e-18613614072a'
				}).then(res => {
					console.log(res);
					if(res.code == 200 && res.data.length){
						let data = res.data[0];
						this.id = data.id;
						for(let item of this.basicSettingsList){
							item.value = data[item.key];
						}
						for(let item of this.tjsfList){
							item.value = data[item.key];
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
			.head {
				width: 100%;
				background-color: #fff;
				height: .55rem;
				display: flex;
				align-items: flex-end;
				position: fixed;
				top: .5rem;
				z-index: 99;
				box-shadow: 0 6rpx 12rpx -2rpx #878787;
				.item {
					font: 700 .15rem/.15rem '宋体';
					padding: .25rem .3rem 0 .3rem;
					height: .55rem;
				}

				.active {
					border-bottom: 4rpx solid #19be6b;
					color: #19be6b;
				}
			}
			.container{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: .1rem 0;
				flex-direction: column;
				// margin-top: 1rem;
				overflow: scroll;
				position: relative;
				top: .6rem;
				.content{
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					margin-bottom: .1rem;
					.title{
						display: block;
						width: 100%;
						font-size: .14rem;
					}
					.main{
						width: 33%;
						display: flex;
						align-items: center;
						margin-bottom: .1rem;
						position: relative;
						.name{
							width: 1.3rem;
							text-align: right;
						}
						& > input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 1.2rem;
							margin: 0 .1rem;
						}
						.select{
							position: absolute;
							color: #ccc;
							right: .15rem;
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
				bottom: .1rem;
				width: 1.1rem;
				height: .3rem;
			}
		}
	}
</style>
