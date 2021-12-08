<template>
	<view class="wrap">
		<scroll-view class="container" scroll-y>
			<free-title title="肺结核第一次随访详细信息" isRight :camera="camera"></free-title>
			<view class="container">
				<view class="content">
					<view class="main" v-for="(item,index) in tuberculosisFirstFollow" :key="index">
						<text class="name">{{item.name}}</text>
						<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
							v-model="item.model" @click="item.type == 'select'  ? handleTapInput(item.name) : ''" />
						<text class="iconfont select" v-if="item.select">{{item.select}}</text>
						<text class="iconfont required" v-if="item.required">{{item.required}}</text>
					</view>
				</view>
				<!-- 病状及体征 -->
				<view class="bz-content">
					<text class="title">症状及体征</text>
					<view class="main">
						<text class="main-title">症状及体征</text>
						<u-checkbox-group @change="checkboxGroupChange" class="u-checkbox-group">
							<u-checkbox v-model="item.checked" v-for="(item,index) in symptomsAndSigns" :key="index"
								:name="item.name" @change="checkboxChange">
								<view style="display: flex;align-items: center;">
									<text class="u-checkbox-group-name">{{item.name}}</text>
									<input v-if="item.name == '其他' && item.checked" v-model="item.model" @click.stop=""
										style="border: 1rpx solid #e3e3e3;border-radius: 8rpx;font-size: .12rem;padding: 10rpx 0 10rpx 20rpx;width: 1.4rem;margin-left: .1rem;" />
								</view>
							</u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
				<!-- 用药 -->
				<view class="yy-content">
					<text class="title">用药</text>
					<view class="main" v-for="(item,index) in medication">
						<view v-if="!item.title" class="main-input">
							<text class="main-input-name">{{item.name}}</text>
							<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
								v-model="item.model" :style="item.name == '化疗方案' ? 'width:7.2rem;' : ''"
								@click="item.type == 'select'  ? handleTapInput(item.name) : ''" />
							<text class="iconfont select" v-if="item.select">{{item.select}}</text>
						</view>
						<view class="u-checkbox-group-wrap">
							<text class="u-checkbox-group-title">{{item.title}}</text>
							<u-checkbox-group @change="checkboxGroupChange" class="u-checkbox-group">
								<u-checkbox v-model="ctem.checked" v-for="(ctem,cndex) in item.checkbox" :key="cndex"
									:name="ctem.name">
									<text class="u-checkbox-group-name">{{ctem.name}}</text>
								</u-checkbox>
							</u-checkbox-group>
						</view>
					</view>
				</view>
				<!-- 家庭居住环境评估 -->
				<view class="jtzj-content">
					<text class="title">家庭居住环境评估</text>
					<view class="main" v-for="(item,index) in jtzj" :key="index">
						<text class="name">{{item.name}}</text>
						<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
							v-model="item.model" @click="item.type == 'select'  ? handleTapInput(item.name) : ''" />
						<text class="iconfont select" v-if="item.select">{{item.select}}</text>
					</view>
				</view>
				<!-- 生活方式评估 -->
				<view class="jtzj-content">
					<text class="title">生活方式评估</text>
					<view class="main" v-for="(item,index) in lifestyleAssessment" :key="index">
						<text class="name">{{item.name}}</text>
						<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
							v-model="item.model" />
						<text class="company">{{item.company}}</text>
					</view>
				</view>
				<!-- 健康教育及培训 -->
				<view class="jkjy-content">
					<text class="title">健康教育及培训</text>
					<view class="main" :style="item.name == '密切接触者检查' ? 'width:100%;' : ''"
						v-for="(item,index) in healthEducationAndTraining" :key="index">
						<text class="name">{{item.name}}</text>
						<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
							v-model="item.model" :adjust-position="false"
							@click="item.type == 'select'  ? handleTapInput(item.name) : ''" />
						<text class="iconfont select"
							:style="item.name == '密切接触者检查' ? 'position: absolute;left:3.1rem;' : ''"
							v-if="item.select">{{item.select}}</text>
						<text class="iconfont required" v-if="item.required">{{item.required}}</text>
						<text class="iconfont autograph" @click="handleTapCanvasIcon(item.name)"
							v-if="item.autograph">{{item.autograph}}</text>
						<image v-if="item.name == '评估医生签名' && followDoctorSign!==''" :src="followDoctorSign"
							style="width: 1rem;height: .3rem;">
						</image>
						<image v-if="item.name == '患者（家属) 签名' && personSign!==''" :src="personSign"
							style="width: 1rem;height: .3rem;">
						</image>
					</view>
				</view>
			</view>
			<canva v-if="isCanvas" @close="isCanvas = false" @finish="finish"></canva>
			<view class="btn-container">
				<u-button class="btn" @click="handleSubmitBtn" type="primary">保存</u-button>
			</view>
		</scroll-view>
		<u-picker v-model="isTime" mode="time" @confirm="handlePicker"></u-picker>
		<u-select v-model="selectorIsShow" :list="selectList" @confirm="handleSelect"></u-select>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import data from '../../../js/tuberculosisFirstFollow.js'
	import canva from "@/components/free-ui/free-canvas/canvas.vue";
	import utils from '@/common/utils.js'
	export default {
		components: {
			freeTitle,
			canva
		},
		data() {
			return {
				camera: '',
				isTime: false,
				selectorIsShow: false,
				isCanvas: false,
				followDoctorSign: '',
				personSign: '',
				canvasItem: '',
				tuberculosisFirstFollow: JSON.parse(JSON.stringify(data.tuberculosisFirstFollow)),
				symptomsAndSigns: JSON.parse(JSON.stringify(data.symptomsAndSigns)),
				medication: JSON.parse(JSON.stringify(data.medication)),
				jtzj: JSON.parse(JSON.stringify(data.jtzj)),
				lifestyleAssessment: JSON.parse(JSON.stringify(data.lifestyleAssessment)),
				healthEducationAndTraining: JSON.parse(JSON.stringify(data.healthEducationAndTraining)),
				item: '',
				selectList: [],
				person_id: '',
				id: ''
			}
		},
		mounted() {
			uni.$on('switchUser', () => {
				console.info(data)
				this.tuberculosisFirstFollow = JSON.parse(JSON.stringify(data.tuberculosisFirstFollow)),
					this.symptomsAndSigns = JSON.parse(JSON.stringify(data.symptomsAndSigns)),
					this.medication = JSON.parse(JSON.stringify(data.medication)),
					this.jtzj = JSON.parse(JSON.stringify(data.jtzj)),
					this.lifestyleAssessment = JSON.parse(JSON.stringify(data.lifestyleAssessment)),
					this.healthEducationAndTraining = JSON.parse(JSON.stringify(data.healthEducationAndTraining))
			})
			let res = uni.getStorageSync('login_info');
			let edit = uni.getStorageSync('edit');
			// console.log(res);
			if (edit) {
				this.person_id = edit.person_id;
				this.id = edit.follow_id;
			} else {
				if (res !== '') {
					this.person_id = res[0].id;
				}
			}
			this.handleSearchLungFirstFollow();
			this.camera = utils.camera(this.basicSettingsList, this.camera)
			this.handleGetDoctorName();
		},
		computed: {
			...mapState(['basicSettingsList'])
		},
		methods: {
			// 自动获取医生
			handleGetDoctorName() {
				let res = uni.getStorageSync('user_info');
				if (res !== '') {
					for (let item of this.healthEducationAndTraining) {
						if (item.name == '评估医生签名') {
							item.model = res[0].doctor_name;
						}
					}
				}
			},
			checkboxChange(e) {
				for (let item of this.symptomsAndSigns) {
					if (e.name == '没有症状' && e.value && item.name !== '没有症状') {
						item.checked = false;
					}
					if (e.name !== '没有症状' && item.name == '没有症状') {
						item.checked = false;
					}
				}
			},
			checkboxGroupChange(e) {
				console.log(e);
			},
			handleTapInput(item) {
				console.log(item);
				this.item = item;
				this.selectorIsShow = true;
				switch (item) {
					case '随访时间':
					case '下次随访日期':
					case '取药时间':
						this.isTime = true;
						this.selectorIsShow = false;
						break;
					case '随访方式':
						this.selectList = data.followMode;
						break;
					case '患者类型':
						this.selectList = data.patientType;
						break;
					case '病菌情况':
						this.selectList = data.sputumBacteriaSituation;
						break;
					case '耐药情况':
						this.selectList = data.drugResistanceSituation;
						break;
					case '用法':
						this.selectList = utils.medicationSelect;
						break;
					case '督导人员选择':
						this.selectList = utils.supervisorySelection;
						break;
					case '单独的居室':
						this.selectList = utils.separateRoom;
						break;
					case '通风情况':
						this.selectList = utils.behavior;
						break;
					case '患者服药记录卡的填写类型':
					case '服药方法及药品存放':
					case '肺结核治疗疗程':
					case '不规律服药危害':
					case '服药后不良反应及处理':
					case '治疗期间复诊查痰':
					case '外出期间如何坚持服药':
					case '生活习惯及注意事项':
					case '密切接触者检查':
						this.selectList = utils.masterTheSituation;
						break;
				}
			},
			handlePicker(e) {
				for (let item of this.tuberculosisFirstFollow) {
					if (item.name == this.item) {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
				for (let item of this.healthEducationAndTraining) {
					if (item.name == this.item) {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
			},
			handleSelect(e) {
				let _item = this.item;
				for (let item of this.tuberculosisFirstFollow) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
				for (let item of this.medication) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
				for (let item of this.jtzj) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
				for (let item of this.healthEducationAndTraining) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
			},
			handleTapCanvasIcon(item) {
				this.isCanvas = true;
				if (item == '评估医生签名') {
					this.canvasItem = '评估医生签名'
				}
				if (item == '患者（家属) 签名') {
					this.canvasItem = '患者（家属) 签名';
				}
			},
			finish() {
				setTimeout(() => {
					uni.canvasToTempFilePath({
						canvasId: 'mycanvas',
						destWidth: 750,
						destHeight: 325,
						quality: 1,
						fileType: 'jpg',
						success: res => {
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
									if (this.canvasItem == '评估医生签名') {
										this.followDoctorSign = obj.result;
									}
									if (this.canvasItem == '患者（家属) 签名') {
										this.personSign = obj.result;
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
			// 发起请求 保存/修改个人信息
			handleSubmitBtn() {
				for (let item of this.tuberculosisFirstFollow) {
					for (let jtem of this.healthEducationAndTraining) {
						if (item.isRequired && item.model == '' || jtem.isRequired && jtem.model == '') {
							return this.$lz.toast('必填项不能为空');
						}
					}
				}
				// 发起网络请求
				let param = {
					data: {}
				}
				let info = {
					id: this.id,
					person_id: this.person_id,
					symptom: []
				}
				for (let item of this.tuberculosisFirstFollow) {
					info[item.key] = item.model;
				}
				for (let item of this.symptomsAndSigns) {
					if (item.checked) {
						info.symptom.push(item.name);
					}
				}
				param.data.info = info;
				param.data.info.symptom = info.symptom.join(',');

				let yy = {
					drug_dosage: []
				}
				for (let item of this.medication) {
					yy[item.key] = item.model;
					if (item.title == '药品剂型') {
						for (let ctem of item.checkbox) {
							if (ctem.checked) {
								yy.drug_dosage.push(ctem.name);
							}
						}
					}
				}
				param.data.yy = yy;
				param.data.yy.drug_dosage = yy.drug_dosage.join(',');

				let jzqg = {};
				for (let item of this.jtzj) {
					jzqg[item.key] = item.model;
				}
				param.data.jzqg = jzqg;

				let shfspg = {};
				for (let item of this.lifestyleAssessment) {
					shfspg[item.key] = item.model;
				}
				param.data.shfspg = shfspg;

				let jkpx = {
					follow_doctor_sign: this.followDoctorSign,
					person_sign: this.personSign
				}
				for (let item of this.healthEducationAndTraining) {
					jkpx[item.key] = item.model;
				}
				param.data.jkpx = jkpx;

				console.log(param);

				// 保存肺结核第一次随访详细信息
				this.$u.post('SaveLungFristFollow', param).then(res => {
					console.log(res);
					if (res.code == 200 && res.info == '响应成功') {
						this.$lz.toast(res.info);
						this.id = res.data.id;
					} else {
						this.$lz.toast(res.info);
					}
				}).catch(err => {
					this.$lz.toast(err.errMsg);
					console.log(err);
				})
			},
			// 查询肺结核第一次随访详细信息
			handleSearchLungFirstFollow() {
				this.$u.post('SearchLungFirstFollow', {
					person_id: this.person_id
				}).then(res => {
					console.log(res);
					if (res.code == 200 && res.info == '响应成功' && JSON.stringify(res.data) !== '[]') {
						let data = res.data[0];
						for (let item of this.tuberculosisFirstFollow) {
							item.model = data[item.key];
						}
						for (let item of this.symptomsAndSigns) {
							for (let jtem of data.symptom.split(',')) {
								if (item.name == jtem) {
									item.checked = true;
								}
							}
						}

						for (let item of this.medication) {
							item.model = data[item.key];
							if (item.title == '药品剂型') {
								for (let ctem of item.checkbox) {
									for (let jtem of data.drug_dosage.split(',')) {
										if (ctem.name == jtem) {
											item.checked = true;
										}
									}
								}
							}
						}

						for (let item of this.jtzj) {
							item.model = data[item.key];
						}

						for (let item of this.lifestyleAssessment) {
							item.model = data[item.key];
						}

						for (let item of this.healthEducationAndTraining) {
							item.model = data[item.key];
						}

						this.followDoctorSign = data.follow_doctor_sign;
						this.personSign = data.person_sign;
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

		.container {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			.content {
				width: 96%;
				background-color: #fff;
				border-radius: 16rpx;
				padding: .15rem;
				display: flex;
				flex-wrap: wrap;
				margin-bottom: .15rem;

				.main {
					display: flex;
					align-items: center;
					width: 40%;
					margin-bottom: .1rem;
					position: relative;

					.name {
						width: .9rem;
						text-align: right;
					}

					&>input {
						border: 1rpx solid #e3e3e3;
						border-radius: 8rpx;
						font-size: .12rem;
						padding: 10rpx 0 10rpx 20rpx;
						width: 1.6rem;
						margin-left: .1rem;
						position: relative;
					}

					.select {
						color: #ccc;
						position: absolute;
						right: .7rem;
					}

					.required {
						color: #f00;
					}
				}
			}

			.bz-content {
				width: 96%;
				background-color: #fff;
				border-radius: 16rpx;
				padding: .15rem;
				display: flex;
				flex-wrap: wrap;
				margin-bottom: .15rem;

				.title {
					width: 100%;
				}

				.main {
					display: flex;
					margin-top: .1rem;

					.main-title {
						width: .9rem;
						text-align: right;
						flex-shrink: 0;
						margin-top: 8rpx;
					}

					.u-checkbox-group {
						margin-left: .1rem;

						.u-checkbox-group-name {
							font-size: .14rem;
						}
					}
				}
			}

			.yy-content {
				width: 96%;
				background-color: #fff;
				border-radius: 16rpx;
				padding: .15rem;
				display: flex;
				flex-wrap: wrap;
				margin-bottom: .15rem;

				.title {
					width: 100%;
				}

				.main {
					display: flex;
					align-items: center;
					width: 100%;

					.main-input {
						display: flex;
						align-items: center;
						margin-bottom: .1rem;
						position: relative;

						.main-input-name {
							width: .9rem;
							text-align: right;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 1.6rem;
							margin-left: .1rem;
							position: relative;
						}

						.select {
							color: #ccc;
							position: absolute;
							right: 8rpx;
						}
					}

					.u-checkbox-group-wrap {
						display: flex;
						align-items: center;
						margin-bottom: .1rem;

						.u-checkbox-group-title {
							width: .9rem;
							text-align: right;
						}

						.u-checkbox-group {
							margin-left: .1rem;

							.u-checkbox-group-name {
								font-size: .14rem;
							}
						}
					}
				}
			}

			// 家庭居中环境评估
			.jtzj-content {
				width: 96%;
				background-color: #fff;
				border-radius: 16rpx;
				padding: .15rem;
				display: flex;
				flex-wrap: wrap;
				margin-bottom: .15rem;

				.title {
					width: 100%;
				}

				.main {
					display: flex;
					align-items: center;
					margin-bottom: .1rem;
					position: relative;
					width: 40%;

					.name {
						width: .9rem;
						text-align: right;
					}

					&>input {
						border: 1rpx solid #e3e3e3;
						border-radius: 8rpx;
						font-size: .12rem;
						padding: 10rpx 0 10rpx 20rpx;
						width: 1.6rem;
						margin-left: .1rem;
						position: relative;
					}

					.select {
						color: #ccc;
						position: absolute;
						right: .7rem;
					}

					.company {
						margin-left: .1rem;
					}
				}
			}

			// 健康教育及培训
			.jkjy-content {
				width: 96%;
				background-color: #fff;
				border-radius: 16rpx;
				padding: .15rem;
				display: flex;
				flex-wrap: wrap;
				margin-bottom: .15rem;

				.title {
					width: 100%;
				}

				.main {
					display: flex;
					align-items: center;
					width: 50%;
					margin-bottom: .1rem;
					position: relative;

					.name {
						width: 1.5rem;
						text-align: right;
					}

					&>input {
						border: 1rpx solid #e3e3e3;
						border-radius: 8rpx;
						font-size: .12rem;
						padding: 10rpx 0 10rpx 20rpx;
						width: 1.6rem;
						margin-left: .1rem;
						position: relative;
					}

					.select {
						color: #ccc;
						position: absolute;
						right: .95rem;
					}

					.required {
						color: #f00;
					}

					.autograph {
						margin-left: .1rem;
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
