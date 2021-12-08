<template>
	<view class="wrap">
		<scroll-view scroll-y class="scroll">
			<free-title title="艾滋病随访详细信息" isRight :camera="camera"></free-title>
			<view class="container">
				<view class="content">
					<view class="main" v-for="(item,index) in patientInfo" :key="index">
						<text class="name">{{item.name}}</text>
						<input v-model="item.model" :adjust-position="false" />
						<text class="iconfont required">{{item.required}}</text>
						<text class="iconfont icon" @click="handleisCanvas(item)">{{item.icon}}</text>
						<image v-if="item.name == '患者家属签名' && signatureFamilyMembers!==''" :src="signatureFamilyMembers"
							style="width: 1rem;height: .3rem;">
						</image>
					</view>
				</view>
				<view class="content">
					<view class="main" v-for="(item,index) in followUpInfo" :key="index">
						<text class="name">{{item.name}}</text>
						<input :disabled="item.disabled" :placeholder="item.placeholder" v-model="item.model"
							:adjust-position="false" @click="item.select ? handleTapInput(item.name) : ''" />
						<text class="iconfont required">{{item.required}}</text>
						<text class="iconfont select">{{item.select}}</text>
					</view>
				</view>
				<view class="content">
					<view class="main" v-for="(item,index) in theIllnessCondition" :key="index" style="width: 50%;">
						<text class="name">{{item.name}}</text>
						<input :disabled="item.disabled" :placeholder="item.placeholder" v-model="item.model"
							:adjust-position="false" @click="item.select ? handleTapInput(item.name) : ''" />
						<text class="iconfont required">{{item.required}}</text>
						<text class="iconfont select">{{item.select}}</text>
					</view>
				</view>
				<view class="wj-content">
					<view class="main" v-for="(item,index) in theQuestionnaire" :key="index"
						:style="item.state == 0 ?  'width: 100%;' : 'width:50%;'">
						<text class="name">{{item.name}}</text>
						<input :disabled="item.disabled" :placeholder="item.placeholder" v-model="item.model"
							:adjust-position="false" @click="item.select ? handleTapInput(item.name) : ''" />
						<text class="iconfont select" :style="handleWjSelectStyle(item.name)">{{item.select}}</text>
					</view>
				</view>
				<view class="sczz-content">
					<text class="title">是否出现以下结核病可疑筛查症状</text>
					<view class="main" v-for="(item,index) in suspiciousScreeningSymptoms" :key="index">
						<text class="name">{{item.name}}</text>
						<input :disabled="item.disabled" :placeholder="item.placeholder" v-model="item.model"
							:adjust-position="false" @click="item.select ? handleTapInput(item.name) : ''" />
						<text class="iconfont select" :style="handleWjSelectStyle(item.name)">{{item.select}}</text>
					</view>
				</view>
				<view class="sczz-content">
					<text class="title">转诊</text>
					<view class="main" v-for="(item,index) in referral" :key="index"
						:style="item.state == 0 ? 'width:100%;' : 'width: 50%;'">
						<text class="name" style="width: 1.2rem;"
							:style="handleZzNameStyle(item.name)">{{item.name}}</text>
						<input :disabled="item.disabled" :placeholder="item.placeholder" v-model="item.model"
							:adjust-position="false" :style="item.name == '备注：' ? 'width: 100%;' : ''"
							@click="item.select ? handleTapInput(item.name) : ''" />
						<text class="iconfont select" :style="handleZzSelectStyle(item.name)">{{item.select}}</text>
						<text class="iconfont required">{{item.required}}</text>
					</view>
				</view>
			</view>
			<view class="btn-container">
				<u-button class="btn" type="primary" @click="handleSubmitBtn">保存</u-button>
			</view>
			<canva v-if="isCanvas" @close="isCanvas = false" @finish="finish"></canva>
		</scroll-view>
		<u-picker v-model="isTime" mode="time" @confirm="handlePicker"></u-picker>
		<u-select v-model="selectorIsShow" :list="selectList" @confirm="handleSelect"></u-select>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import data from '@/js/AIDSFollowUpDetails.js';
	import canva from "@/components/free-ui/free-canvas/canvas.vue";
	import utils from '@/common/utils.js';
	export default {
		components: {
			freeTitle,
			canva,
			utils
		},
		data() {
			return {
				patientInfo: JSON.parse(JSON.stringify(data.patientInfo)),
				followUpInfo: JSON.parse(JSON.stringify(data.followUpInfo)),
				theIllnessCondition: JSON.parse(JSON.stringify(data.theIllnessCondition)),
				theQuestionnaire: JSON.parse(JSON.stringify(data.theQuestionnaire)),
				suspiciousScreeningSymptoms: JSON.parse(JSON.stringify(data.suspiciousScreeningSymptoms)),
				referral: JSON.parse(JSON.stringify(data.referral)),
				isCanvas: false,
				isTime: false,
				selectorIsShow: false,
				selectList: [],
				canvasItem: '',
				item: '',
				signatureFamilyMembers: '',
				person_id: '',
				follow_id: '',
				camera: ''
			}
		},
		mounted() {
			uni.$on('switchUser', () => {
				this.patientInfo = JSON.parse(JSON.stringify(data.patientInfo));
				this.followUpInfo = JSON.parse(JSON.stringify(data.followUpInfo));
				this.theIllnessCondition = JSON.parse(JSON.stringify(data.theIllnessCondition));
				this.theQuestionnaire = JSON.parse(JSON.stringify(data.theQuestionnaire));
				this.suspiciousScreeningSymptoms = JSON.parse(JSON.stringify(data.suspiciousScreeningSymptoms));
				this.referral = JSON.parse(JSON.stringify(data.referral))
			})
			let res = uni.getStorageSync('login_info');
			let edit = uni.getStorageSync('edit');

			if (edit) {
				this.person_id = edit.person_id;
				this.follow_id = edit.follow_id;
			} else {
				if (res !== '') {
					this.person_id = res[0].id;
				}
			}
			this.handleSearchAidsFollow();
			this.camera = utils.camera(this.basicSettingsList,this.camera);
		},
		computed: {
			...mapState(['basicSettingsList']),
			handleWjSelectStyle() {
				return function(item) {
					if (item == '是否为母婴传播病例：') {
						return `left: 3.12rem;`
					}
					if (item == '目前是否有配偶：') {
						return `left: 2.84rem;`
					}
					if (item == '目前是否有固定伴侣') {
						return `left: 2.99rem;`
					}
					if (item == '过去三个月,是否每次发生性行为都用安全套') {
						return `left: 4.42rem;`
					}
					if (item == '过去三个月,是否每次与配偶/固定性伴发生性行为时都用安全套：') {
						return `right: 2.55rem;`
					}
				}
			},
			handleZzSelectStyle() {
				return function(item) {
					if (item == '检测日期：' || item == '随访日期：') {
						return `left: 2.82rem;`
					}
					if (item == '过去6个月是否接受过结核病检查：') {
						return `left: 3.82rem;`
					}
					if (item == '目前是否接受国家免费艾滋病抗病毒治疗：') {
						return `left: 4.43rem;`
					}
				}
			},
			handleZzNameStyle() {
				return function(item) {
					if (item == '过去6个月是否接受过结核病检查：') {
						return `width: 2.2rem;`
					}
					if (item == '目前是否接受国家免费艾滋病抗病毒治疗：') {
						return `width: 2.8rem;`
					}
					if (item == 'CD4+最近一次CD4+检测结果：') {
						return `width:auto; text-align: left;`
					}

				}
			}
		},
		methods: {
			// 点击 输入框
			handleTapInput(item) {
				this.item = item;
				this.selectorIsShow = true;
				switch (item) {
					case '随访状态':
						this.selectList = data.followUpStatus;
						break;
					case '原因':
						this.selectList = data.reason;
						break;
					case '病程阶段':
						this.selectList = data.stageOfDisease;
						break;
					case '是否羁押':
					case '是否已经死亡':
					case '是否为母婴传播病例：':
					case '目前是否有固定伴侣':
					case '过去三个月,是否每次发生性行为都用安全套':
					case '咳嗽、咳痰持续2周以上：':
					case '反复咳出的痰中带血：':
					case '反复发热持续2周以上：':
					case '夜间经常出汗：':
					case '否无法解释的体重明显下降：':
					case '经常容易疲劳或呼吸短促：':
					case '淋巴结肿大：':
					case '过去6个月是否接受过结核病检查：':
					case '目前是否接受国家免费艾滋病抗病毒治疗：':
						this.selectList = utils.yesOrNo;
						break;
					case '过去三个月,是否每次与配偶/固定性伴发生性行为时都用安全套：':
						this.selectList = data.questionAndAnswer;
						break;
					case '确诊时间':
					case '检测日期：':
					case '随访日期：':
						this.isTime = true;
						this.selectorIsShow = false;
						break;
				}
			},
			// 时间赋值
			handlePicker(e) {
				for (let item of this.theIllnessCondition) {
					if (item.name == this.item) {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
				for (let item of this.referral) {
					if (item.name == this.item) {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
			},
			// select 赋值
			handleSelect(e) {
				let _item = this.item;
				for (let item of this.followUpInfo) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
				for (let item of this.theIllnessCondition) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
				for (let item of this.theQuestionnaire) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
				for (let item of this.suspiciousScreeningSymptoms) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
				for (let item of this.referral) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
			},
			// 显示画板
			handleisCanvas(item) {
				this.canvasItem = item.name;
				this.isCanvas = true;
			},
			// 上传图片信息
			finish() {
				setTimeout(() => {
					uni.canvasToTempFilePath({
						canvasId: 'mycanvas',
						destWidth: 750,
						destHeight: 325,
						quality: 1,
						fileType: 'jpg',
						success: (res) => {
							let path = res.tempFilePath;
							uni.uploadFile({
								url: 'http://mediasvr.ajylive.cn:8080/batch/upload',
								filePath: path,
								name: 'file',
								formData: {
									'userid': 'ce-shi'
								},
								success: uploadFileRes => {
									let obj = JSON.parse(uploadFileRes.data);
									this.isCanvas = false;
									if (this.canvasItem == '患者家属签名') {
										this.signatureFamilyMembers = obj.result;
									}
								},
								fail: err => {
									this.$lz.toast('上传失败');
									this.isCanvas = false;
								}
							});
						}
					})
				}, 500)
			},
			// 发起网络请求 保存/修改信息
			handleSubmitBtn() {
				for (let item of this.referral) {
					for (let jtem of this.patientInfo) {
						if (jtem.required !== '' && jtem.model == '' || item.isRequired && item.model == '' && item
							.required !== '') {
							return this.$lz.toast('必填项不能为空');
						}
					}
				}
				// 发起网络请求
				let param = {
					data: {}
				}
				let one = {
					follow_id: this.follow_id,
					person_id: this.person_id,
					person_family_sign: '',
				}
				for (let item of this.patientInfo) {
					one[item.key] = item.model;
				}
				param.data.one = one;
				let two = {}
				for (let item of this.followUpInfo) {
					two[item.key] = item.model;
				}
				param.data.two = two;
				let three = {}
				for (let item of this.theIllnessCondition) {
					three[item.key] = item.model;
				}
				param.data.three = three;
				let four = {}
				for (let item of this.theQuestionnaire) {
					four[item.key] = item.model;
				}
				param.data.four = four;
				let five = {}
				for (let item of this.suspiciousScreeningSymptoms) {
					five[item.key] = item.model;
				}
				param.data.five = five;
				let six = {
					upload_status: '0'
				}
				for (let item of this.referral) {
					six[item.key] = item.model;
				}
				param.data.six = six;
				console.log(param);
				this.$u.post('SaveAidsFollow', param).then(res => {
					console.log(res);
					this.follow_id = res.data.id;
					this.$lz.toast(res.info);
				}).catch(err => {
					console.log(err);
				})
			},
			// 查询艾滋病随访信息
			handleSearchAidsFollow() {
				this.$u.post('SearchAidsFollow', {
					follow_id: this.follow_id
				}).then(res => {
					if (res.code == 200 && res.info == '响应成功' && JSON.stringify(res.data) !== '{}') {
						let data = res.data;
						for (let item of this.patientInfo) {
							item.model = data[item.key];
						}
						for (let item of this.followUpInfo) {
							item.model = data[item.key];
						}
						for (let item of this.theIllnessCondition) {
							item.model = data[item.key];
						}
						for (let item of this.theQuestionnaire) {
							item.model = data[item.key];
						}
						for (let item of this.suspiciousScreeningSymptoms) {
							item.model = data[item.key];
						}
						for (let item of this.referral) {
							item.model = data[item.key];
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

					.main {
						display: flex;
						align-items: center;
						margin: .1rem 0;
						width: 50%;
						position: relative;

						.name {
							width: .9rem;
							flex-shrink: 0;
							text-align: right;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 1.6rem;
							margin-left: .1rem;
						}

						.required {
							color: #f00;
						}

						.select {
							position: absolute;
							color: #ccc;
							right: 1.55rem;
						}

						.icon {
							margin-left: 10rpx;
						}
					}
				}

				.wj-content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					margin-bottom: .1rem;

					.main {
						width: 100%;
						display: flex;
						align-items: center;
						margin: .1rem 0;
						position: relative;

						.name {
							width: auto;
							flex-shrink: 0;
							text-align: right;
							margin-left: .1rem;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 1.6rem;
							margin-left: .1rem;
						}

						.select {
							position: absolute;
							color: #ccc;
						}
					}
				}

				.sczz-content {
					width: 96%;
					background-color: #fff;
					border-radius: 16rpx;
					padding: .15rem;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					margin-bottom: .1rem;

					.title {
						width: 100%;
						display: block;
						font-size: .15rem;
					}

					.main {
						display: flex;
						align-items: center;
						width: 50%;
						margin: .1rem 0;
						position: relative;

						.name {
							width: 2rem;
							flex-shrink: 0;
							text-align: right;
							margin-left: .1rem;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 1.6rem;
						}

						.select {
							position: absolute;
							color: #ccc;
							left: 3.62rem;
						}

						.required {
							color: #f00;
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
