<template>
	<view class="wrap">
		<scroll-view scroll-y class="scroll">
			<free-title title="肺结核随访详细信息" isRight :camera="camera"></free-title>
			<view class="container">
				<view class="content">
					<view class="main" v-for="(item,index) in tuberculosisFollowDetails" :key="index">
						<text class="name">{{item.name}}</text>
						<input :disabled="item.disabled" :placeholder="item.placeholder" v-model="item.model"
							:adjust-position="false" @click="item.select ? handleTapInput(item.name) : ''" />
						<text class="company" v-if="item.company">{{item.company}}</text>
						<text class="iconfont required">{{item.required}}</text>
						<text class="iconfont select" v-if="item.select">{{item.select}}</text>
					</view>
				</view>
				<!-- 症状及体征 -->
				<view class="zztz-content">
					<text class="title">{{symptomsAndSigns[0].name}}</text>
					<view class="main" v-for="(item,index) in symptomsAndSigns" :key="index">
						<text class="name">{{item.name}}</text>
						<u-checkbox-group class="u-checkbox-group">
							<u-checkbox v-model="ctem.checked" v-for="(ctem, cndex) in item.checkbox" :key="cndex"
								:name="ctem.name" @change="checkboxChange">
								<view style="display: flex;align-items: center;">
									<text class="u-checkbox-name">{{ctem.name}}</text>
									<input v-if="ctem.name == '其他' && ctem.checked"
									 v-model="ctem.model" :adjust-position="false" @click.stop="" 
										style="border: 1rpx solid #e3e3e3;border-radius: 8rpx;font-size: .12rem;padding: 10rpx 0 10rpx 20rpx;width: 1.4rem;margin-left: .1rem;"/>
								</view>
							</u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
				<!-- 生活方式指导 -->
				<view class="shfs-content">
					<text class="title">生活方式指导</text>
					<view class="main" v-for="(item,index) in lifestyleGuidance" :key="index">
						<text class="name">{{item.name}}</text>
						<input v-model="item.model" :adjust-position="false" />
						<text class="company">{{item.company}}</text>
					</view>
				</view>
				<!-- 用药 -->
				<view class="yy-content">
					<text class="title">用药</text>
					<view class="main" v-for="(item,index) in medication" :key="index"
						:style="item.name == '药物不良反应' || item.name == '并发症或合并症' ? 'width:50%;' : ''">
						<view class="input-box" v-if="!item.checkbox">
							<text class="name">{{item.name}}</text>
							<input :disabled="item.disabled" :placeholder="item.placeholder" :adjust-position="false"
								:style="item.name == '化疗方案' ? 'width:86%;' : ''" v-model="item.model"
								@click="item.select ? handleTapInput(item.name) : ''" />
							<text v-if="item.company" class="company">{{item.company}}</text>
							<text class="iconfont select" v-if="item.select"
								:style="item.name == '用法' ? 'left:2.3rem;' : ''">{{item.select}}</text>
						</view>
						<view v-if="item.checkbox" class="check">
							<text class="name">{{item.name}}</text>
							<u-checkbox-group class="u-checkbox-group">
								<u-checkbox v-model="ctem.checked" v-for="(ctem, cndex) in item.checkbox" :key="cndex"
									:name="ctem.name">
									<text class="u-checkbox-name">{{ctem.name}}</text>
								</u-checkbox>
							</u-checkbox-group>
						</view>
					</view>
				</view>
				<!-- 转诊 -->
				<view class="zz-content">
					<text class="title">转诊</text>
					<view class="main" v-for="(item,index) in referral" :key="index"
						:style="handleZzMainStyle(item.name)">
						<text class="name">{{item.name}}</text>
						<input v-model="item.model" :disabled="item.disabled" :adjust-position="false"
							:style="handleZzMainInputStyle(item.name)"
							@click="item.select ? handleTapInput(item.name) : ''" />
						<text class="iconfont required">{{item.required}}</text>
						<text class="iconfont icon" @click="handleTapCanvasIcon(item.name)">{{item.icon}}</text>
						<image v-if="item.name == '随访医生签名' && followDoctorSign!==''" :src="followDoctorSign"
							style="width: 1rem;height: .3rem;">
						</image>
						<image v-if="item.name == '患者/家属签名' && personSign!==''" :src="personSign"
							style="width: 1rem;height: .3rem;">
						</image>
					</view>
				</view>
				<!-- bottom -->
				<view class="bottom-content">
					<view class="main" v-for="(item,index) in list" :key="index"
						:style="item.name == '评估医生签名' ? 'width:100%;' : ''">
						<text class="name">{{item.name}}</text>
						<input v-model="item.model" :disabled="item.disabled" :placeholder="item.placeholder"
							:adjust-position="false" @click="item.select ? handleTapInput(item.name) : ''" />
						<text class="iconfont select">{{item.select}}</text>
						<text class="company">{{item.company}}</text>
						<text class="iconfont icon" @click="handleTapCanvasIcon(item.name)">{{item.icon}}</text>
						<image v-if="item.name == '评估医生签名' && pgSign!==''" :src="pgSign"
							style="width: 1rem;height: .3rem;">
						</image>
					</view>
				</view>
			</view>
			<view class="btn-container">
				<u-button class="btn" @click="handleSubmitBtn" type="primary">保存</u-button>
			</view>
			<canva v-if="isCanvas" @close="isCanvas = false" @finish="finish"></canva>
		</scroll-view>
		<u-picker v-model="isTime" mode="time" @confirm="handlePicker"></u-picker>
		<u-select v-model="selectorIsShow" :list="selectList" @confirm="handleSelect"></u-select>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import canva from "@/components/free-ui/free-canvas/canvas.vue";
	import data from '@/js/tuberculosisFollowDetails.js';
	import utils from '@/common/utils.js';
	export default {
		components: {
			freeTitle,
			canva
		},
		data() {
			return {
				camera: '',
				tuberculosisFollowDetails: JSON.parse(JSON.stringify(data.tuberculosisFollowDetails)),
				symptomsAndSigns: JSON.parse(JSON.stringify(data.symptomsAndSigns)),
				lifestyleGuidance: JSON.parse(JSON.stringify(data.lifestyleGuidance)),
				medication: JSON.parse(JSON.stringify(data.medication)),
				referral: JSON.parse(JSON.stringify(data.referral)),
				list: JSON.parse(JSON.stringify(data.list)),
				isCanvas: false,
				followDoctorSign: '',
				personSign: '',
				canvasItem: '',
				pgSign: '',
				item: '',
				isTime: false,
				selectorIsShow: false,
				selectList: [],
				id: '',
				person_id: ''
			}
		},
		mounted() {
			uni.$on('switchUser',() => {
				this.tuberculosisFollowDetails = JSON.parse(JSON.stringify(data.tuberculosisFollowDetails));
				this.symptomsAndSigns = JSON.parse(JSON.stringify(data.symptomsAndSigns));
				this.lifestyleGuidance = JSON.parse(JSON.stringify(data.lifestyleGuidance));
				this.medication = JSON.parse(JSON.stringify(data.medication));
				this.referral = JSON.parse(JSON.stringify(data.referral));
				this.list = JSON.parse(JSON.stringify(data.list));
			})
			let res = uni.getStorageSync('login_info');
			let edit = uni.getStorageSync('edit');
			console.log(edit);
			if (edit) {
				this.person_id = edit.person_id;
				this.id = edit.follow_id;
				console.log(this.id);
			} else {
				if (res !== '') {
					this.person_id = res[0].id;
				}
			}
			this.handleInit();
			this.handleSearchLungFollow();
			this.camera = utils.camera(this.basicSettingsList,this.camera);
			this.handleGetDoctorName();
		},
		computed: {
			...mapState(['basicSettingsList']),
			handleZzMainStyle() {
				return function(item) {
					if (item == '2周内随访结果' || item == '处理意见' || item == '患者/家属签名') {
						return 'width:100%;'
					}
				}
			},
			handleZzMainInputStyle() {
				return function(item) {
					if (item == '2周内随访结果' || item == '处理意见') {
						return 'width:86%;'
					}
				}
			},
			sfInit() {
				return JSON.parse(JSON.stringify(this.tuberculosisFollowDetails));
			}
		},
		watch: {
			sfInit: {
				handler(newValue, oldValue) {
					for (let i in newValue) {
						if (oldValue[i] != newValue[i]) {
							console.log(newValue);
							this.handleInit();
						}
					}
				},
				deep: true
			}
		},
		methods: {
			// 自动获取医生
			handleGetDoctorName(){
				let res = uni.getStorageSync('user_info');
				if(res !== ''){
					for(let item of this.referral){
						if(item.name == '随访医生签名'){
							item.model = res[0].doctor_name;
						}
					}
					for(let item of this.list){
						if(item.name == '评估医生签名'){
							item.model = res[0].doctor_name;
						}
					}
				}
			},
			handleInit() {
				for (let item of this.tuberculosisFollowDetails) {
					if (item.name == '随访时间') {
						for (let jtem of this.basicSettingsList) {
							if (jtem.name == '默认下次随访日期天数') {
								for (let ctem of this.referral) {
									if (ctem.name == '下次随访时间') {
										let time = new Date().setDate(new Date(item.model).getDate() + Number(jtem.value))
										ctem.model = utils.formatTime(new Date(time))
									}
								}
							}
						}
					}
				}
			},
			checkboxChange(e){
				for (let item of this.symptomsAndSigns[0].checkbox) {
					if (e.name == '没有症状' && e.value && item.name !== '没有症状') {
						item.checked = false;
					}
					if (e.name !== '没有症状' && item.name == '没有症状') {
						item.checked = false;
					}
				}
			},
			handleTapInput(item) {
				console.log(item);
				this.item = item;
				this.selectorIsShow = true;
				switch (item) {
					case '随访时间':
					case '下次随访时间':
					case '停止治疗时间':
						this.isTime = true;
						this.selectorIsShow = false;
						break;
					case '督导人员':
						this.selectList = utils.supervisorySelection;
						break;
					case '随访方式':
						this.selectList = utils.followUpMode;
						break;
					case '用法':
						this.selectList = utils.medicationSelect;
						break;
					case '药物不良反应':
					case '并发症或合并症':
						this.selectList = utils.separateRoom;
						break;
					case '停止治疗原因':
						this.selectList = data.reasonsForStoppingTreatment;
						break;
				}
			},
			handlePicker(e) {
				for (let item of this.tuberculosisFollowDetails) {
					if (item.name == this.item) {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
				for (let item of this.referral) {
					if (item.name == this.item) {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
				for (let item of this.list) {
					if (item.name == this.item) {
						item.model = e.year + '-' + e.month + '-' + e.day;
					}
				}
			},
			handleSelect(e) {
				let _item = this.item;
				for (let item of this.tuberculosisFollowDetails) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
				for (let item of this.medication) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
				}
				for (let item of this.list) {
					if (_item == item.name) {
						item.model = e[0].label;
					}
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
									if (this.canvasItem == '随访医生签名') {
										this.followDoctorSign = obj.result;
									}
									if (this.canvasItem == '患者/家属签名') {
										this.personSign = obj.result;
									}
									if (this.canvasItem == '评估医生签名') {
										this.pgSign = obj.result;
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
			handleTapCanvasIcon(item) {
				console.log(111);
				this.isCanvas = true;
				if (item == '随访医生签名') {
					this.canvasItem = '随访医生签名'
				}
				if (item == '患者/家属签名') {
					this.canvasItem = '患者/家属签名';
				}
				if (item == '评估医生签名') {
					this.canvasItem = '评估医生签名';
				}
			},
			// 发起网络请求 保存/修改信息
			handleSubmitBtn() {
				for(let item of this.tuberculosisFollowDetails){
					for(let jtem of this.referral){
						if(item.isRequired && item.model == '' || jtem.isRequired && jtem.model == ''){
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
				}
				for (let item of this.tuberculosisFollowDetails) {
					info[item.key] = item.model;
				}
				param.data.info = info;

				let symptom = [];
				for (let item of this.symptomsAndSigns[0].checkbox) {
					if (item.checked) {
						symptom.push(item.name);
					}
				}
				param.data.symptom = symptom.join(',');

				let shfszd = {}
				for (let item of this.lifestyleGuidance) {
					shfszd[item.key] = item.model;
				}
				param.data.shfszd = shfszd;

				let Yy = {
					drug_dosage: ''
				}
				let drug_dosage = [];
				for (let item of this.medication) {
					Yy[item.key] = item.model;
					if (item.checkbox) {
						for (let ctem of item.checkbox) {
							if (ctem.checked) {
								drug_dosage.push(ctem.name);
							}
						}
					}
				}
				param.data.Yy = Yy;
				param.data.Yy.drug_dosage = drug_dosage.join(',');

				let zz = {
					follow_doctor_sign: this.followDoctorSign,
					person_sizn: this.personSign
				}
				for (let item of this.referral) {
					zz[item.key] = item.model;
				}
				param.data.zz = zz;

				let zh = {
					assessment_doctor_sign_image: this.pgSign
				};
				for (let item of this.list) {
					zh[item.key] = item.model;
				}
				param.data.zh = zh;
				param.data.upload_status = 0;
				console.log(param);
				this.$u.post('SaveLungFollow',param).then(res => {
					console.log(res);
					if(res.code == 200 && res.info == '响应成功'){
						this.$lz.toast(res.info);
						this.id = res.data.id;
					}else{
						this.$lz.toast(res.info);
					}
				}).catch(err => {
					console.log(err);
					this.$lz.toast(err.errMsg);
				})
			},
			// 查询肺结核随访信息
			handleSearchLungFollow(){
				this.$u.post('SearchLungFollow',{
					follow_id: this.id
				}).then(res => {
					console.log(res);
					if(res.code == 200 && res.info == '响应成功' && res.data.userInfo !== null){
						let data = res.data.userInfo;
						for(let item of this.tuberculosisFollowDetails){
							item.model = data[item.key];
						}
						for(let item of this.symptomsAndSigns[0].checkbox){
							for(let jtem of data.symptom.split(',')){
								if(item.name == jtem){
									item.checked = true;
								}
							}
						}
						for(let item of this.lifestyleGuidance){
							item.model = data[item.key];
						}
						for(let item of this.medication){
							item.model = data[item.key];
							if(item.name == '药品剂型'){
								for(let ctem of item.checkbox){
									for(let jtem of data.drug_dosage.split(',')){
										if(ctem.name == jtem){
											ctem.checked = true;
										}
									}
								}
							}
						}
						for(let item of this.referral){
							item.model = data[item.key];
						}
						this.followDoctorSign = data.follow_doctor_sign;
						this.personSign = data.person_sizn;
						this.pgSign = data.assessment_doctor_sign_image;
						for(let item of this.list){
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

					.main {
						width: 50%;
						display: flex;
						align-items: center;
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
							width: 1.4rem;
							margin-left: .1rem;
						}

						.company {
							margin-left: .1rem;
						}

						.required {
							color: #f00;
						}

						.select {
							color: #ccc;
							position: absolute;
							right: 1.75rem;
						}
					}
				}

				// 症状及体征
				.zztz-content {
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
					}

					.main {
						width: 100%;
						display: flex;
						margin-top: .1rem;

						.name {
							width: .9rem;
							text-align: right;
							flex-shrink: 0;
							margin-top: 6rpx;
						}

						.u-checkbox-group {
							margin-left: .1rem;

							.u-checkbox-name {
								font-size: .14rem;
							}
						}
					}
				}

				// 生活方式指导
				.shfs-content {
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
					}

					.main {
						display: flex;
						align-items: center;
						margin: .1rem 0;
						width: 50%;

						.name {
							width: .9rem;
							text-align: right;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 1.4rem;
							margin-left: .1rem;
						}

						.company {
							margin-left: .1rem;
						}
					}
				}

				// 用药
				.yy-content {
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
					}

					.main {
						width: 100%;
						margin: .1rem 0;
						position: relative;

						.input-box {
							display: flex;
							align-items: center;

							.name {
								width: .9rem;
								text-align: right;
							}

							&>input {
								border: 1rpx solid #e3e3e3;
								border-radius: 8rpx;
								font-size: .12rem;
								padding: 10rpx 0 10rpx 20rpx;
								width: 1.4rem;
								margin-left: .1rem;
							}

							.company {
								margin-left: .1rem;
							}

							.select {
								color: #ccc;
								position: absolute;
								right: 1.75rem;
							}
						}

						.check {
							display: flex;

							.name {
								width: .9rem;
								text-align: right;
								flex-shrink: 0;
								margin-top: 6rpx;
							}

							.u-checkbox-group {
								margin-left: .1rem;

								.u-checkbox-name {
									font-size: .14rem;
								}
							}
						}
					}
				}

				// 转诊
				.zz-content {
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
					}

					.main {
						display: flex;
						align-items: center;
						width: 50%;
						margin: .1rem 0;

						.name {
							width: .9rem;
							text-align: right;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 1.4rem;
							margin-left: .1rem;
						}

						.required {
							color: #f00;
						}

						.icon {
							margin-left: .1rem;
						}
					}
				}

				.bottom-content {
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
						width: 50%;
						margin: .1rem 0;
						position: relative;

						.name {
							width: .9rem;
							text-align: right;
						}

						.company {
							margin-left: .1rem;
						}

						&>input {
							border: 1rpx solid #e3e3e3;
							border-radius: 8rpx;
							font-size: .12rem;
							padding: 10rpx 0 10rpx 20rpx;
							width: 1.4rem;
							margin-left: .1rem;
						}

						.select {
							color: #ccc;
							position: absolute;
							right: 1.75rem;
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
