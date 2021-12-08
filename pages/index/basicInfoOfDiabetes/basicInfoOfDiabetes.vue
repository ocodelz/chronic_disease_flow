<template>
	<view class="wrap">
		<scroll-view scroll-y class="scroll">
			<free-title title="糖尿病基本信息" isRight></free-title>
			<view class="container">
				<view class="content">
					<view class="main" v-for="(item,index) in basicInfoOfDiabetes" :key="index">
						<view class="item" v-for="(jtem,jndex) in item.list" :key="jndex"
							:style="handleItemStyle(jtem)">
							<text class="name">{{jtem.name}}</text>
							<input :type="jtem.type" :disabled="jtem.disabled" :placeholder="jtem.placeholder"
								:adjust-position="false" v-model="jtem.model"
								@click="jtem.type == 'select' ? handleInputItem(jtem.name) : ''" />
							<text v-if="jtem.type == 'select'" class="iconfont icon">{{jtem.select}}</text>
							<text v-if="jtem.type == 'select'"
								class="iconfont requiredIcon">{{jtem.requiredIcon}}</text>
						</view>
						<view class="check-box">
							<text class="title">{{item.title}}</text>
							<u-checkbox-group @change="checkboxGroupChange" class="checkbox-group">
								<u-checkbox v-for="(ctem,cndex) in item.checkbox" :key="cndex" :name="ctem.name"
									v-model="ctem.checked" @change="checkboxChange($event,item,index)">
									<text class="name">{{ctem.name}}</text>
								</u-checkbox>
							</u-checkbox-group>
						</view>
					</view>
					<!-- 目前症状 -->
					<view class="check-box">
						<text class="title" style="width: 1.2rem;">目前症状</text>
						<u-checkbox-group @change="checkboxGroupChange" class="checkbox-group">
							<u-checkbox v-for="(item,index) in currentSymptoms" :name="item.name" :key="index"
								v-model="item.checked" @change="checkboxChange($event,'mqzz',index)">
								<view style="display: flex;align-items: center;">
									<text class="name">{{item.name}}</text>
									<input v-if="item.name == '其他' && item.checked" v-model="item.model" @click.stop=""
										:adjust-position="false"
										style="border: 1rpx solid #e3e3e3;border-radius: 8rpx;font-size: .12rem;padding: 10rpx 0 10rpx 20rpx;width: 1.4rem;margin-left: .1rem;" />
								</view>
							</u-checkbox>
						</u-checkbox-group>
					</view>
					<!-- 糖尿病并发症 -->
					<view class="tnb-wrap">
						<text class="title">糖尿病并发症</text>
						<view class="u-checkbox-group-box">
							<block v-for="(item,index) in diabeticComplications" :key="index">
								<view class="tnb-main">
									<u-checkbox-group @change="checkboxGroupChange">
										<u-checkbox :name="item.name" v-model="item.checked">
											<view class="tnb-name">{{item.name}}</view>
										</u-checkbox>
									</u-checkbox-group>
									<view class="input-box">
										<view class="input-content">
											<input v-if="item.name == '其他病变'" type="text" :adjust-position="false"
												v-model="item.mode1" style="width: 1.4rem;margin-right: .1rem;" />
											<input type="text" :adjust-position="false" v-model="item.model" />
											<text class="name">年</text>
										</view>
									</view>
								</view>
							</block>
						</view>
					</view>
					<!-- 终止管理 -->
					<view class="zzgl-wrap">
						<block v-for="(item,index) in zzgl" :key="index">
							<text class="name">{{item.name}}</text>
							<input :type="item.type" :disabled="item.disabled" :placeholder="item.placeholder"
								:adjust-position="false" v-model="item.model"
								@click="item.type == 'select' ? handleInputItem(item.name) : ''" />
							<text v-if="item.type == 'select'" class="iconfont icon">{{item.select}}</text>
						</block>
					</view>
				</view>
			</view>
			<view class="btn-container">
				<u-button class="btn" @click="handleSubmitBtn" type="primary">保存</u-button>
			</view>
		</scroll-view>
		<u-picker v-model="isTime" mode="time" @confirm="handlePicker"></u-picker>
		<u-select v-model="selectorIsShow" :list="list" @confirm="handleSelect"></u-select>
	</view>
</template>
<script>
	let searchOfflineDiabetesInfo = uni.getStorageSync('SearchOfflineDiabetesInfo');
	import data from '@/js/basicInfoOfDiabetes.js';
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import util from '@/utils/util.js'
	import common from '@/common/utils.js';
	export default {
		components: {
			freeTitle
		},
		data() {
			return {
				isExist: false,
				basicInfoOfDiabetes: JSON.parse(JSON.stringify(data.basicInfoOfDiabetes)),
				currentSymptoms: JSON.parse(JSON.stringify(data.currentSymptoms)),
				diabeticComplications: JSON.parse(JSON.stringify(data.diabeticComplications)),
				zzgl: JSON.parse(JSON.stringify(data.zzgl)),
				person_id: '',
				id: '',
				isTime: false,
				selectorIsShow: false,
				list: [],
				item: ''
			}
		},
		mounted() {
			uni.$on('switchUser', () => {
				console.info(data)
				this.basicInfoOfDiabetes = JSON.parse(JSON.stringify(data.basicInfoOfDiabetes));
				this.currentSymptoms = JSON.parse(JSON.stringify(data.currentSymptoms));
				this.diabeticComplications = JSON.parse(JSON.stringify(data.diabeticComplications));
				this.zzgl = JSON.parse(JSON.stringify(data.zzgl))
			});
			let res = uni.getStorageSync('login_info');
			if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false && res !== '') {
				this.person_id = res[0].id;
				console.log('联网');
			}
			this.handleSearchDiabetesInfo();
		},
		destroyed() {
			uni.$off('switchUser')
		},
		computed: {
			handleItemStyle() {
				return function(item) {
					if (item.name == '确诊单位') {
						return 'width:100%;'
					}
				}
			}
		},
		methods: {
			checkbox(arr, e) {
				let data = ['无症状', '以上皆无', '不详', '拒答'];
				for (let jtem of arr) {
					if (data.indexOf(e.name) !== -1 && e.value && (data.indexOf(jtem.name) == -1)) {
						jtem.checked = false;
					}
					if ((data.indexOf(e.name) == -1) && (data.indexOf(jtem.name) !== -1) || (data.indexOf(jtem.name) >=
							1)) {
						jtem.checked = false;
					}
				}
			},
			checkboxChange(e, item, index) {
				if (item.title == '家族史') {
					this.checkbox(this.basicInfoOfDiabetes[index].checkbox, e)
				}
				if (item == 'mqzz') {
					this.checkbox(this.currentSymptoms, e)
				}
			},
			// 时间选择器 赋值
			handlePicker(e) {
				// this.dateofBirth = e.year + '-' + e.month + '-' + e.day;
				let _item = this.item;
				if (_item == '确诊时间') {
					for (let item of this.basicInfoOfDiabetes[2].list) {
						if (item.name == _item) {
							item.model = e.year + '-' + e.month + '-' + e.day;
						}
					}
				}
				if (_item == '终止管理日期') {
					for (let item of this.zzgl) {
						if (item.name == _item) {
							item.model = e.year + '-' + e.month + '-' + e.day;
						}
					}
				}
			},
			// select 选择器 赋值
			handleSelect(e) {
				console.log(e);
				for (let item of this.basicInfoOfDiabetes) {
					if (!item.checkbox) {
						for (let jtem of item.list) {
							if (jtem.name == this.item) {
								console.log(1);
								jtem.model = e[0].label
								console.log(jtem.model);
							}
						}
					}
				}
				for (let item of this.zzgl) {
					if (item.name == this.item) {
						item.model = e[0].label
					}
				}
			},
			checkboxGroupChange(e) {

			},
			// 输入框点击时间  赋值
			handleInputItem(item) {
				this.item = item;
				this.selectorIsShow = true;
				switch (item) {
					case "管理组别":
						this.list = data.selectManagementGroup;
						break;
					case "病例来源":
						this.list = common.sourceOfCases;
						break;
					case "糖尿病类型":
						this.list = data.DiabetesType;
						break;
					case "确诊时间":
					case "终止管理日期":
						this.isTime = true;
						this.selectorIsShow = false;
						break;
					case "是否使用胰岛素":
					case "是否使用口服降糖药":
					case "是否终止":
						this.list = common.yesOrNo;
						break;
					case "终止管理理由":
						this.list = data.ReasonsformTerminationOfmanagement;
						break;
				}
			},
			// 发起网络请求 保存信息
			handleSubmitBtn() {
				let params = {
					data: {}
				}
				let info = {
					id: this.id,
					person_id: this.person_id,
					create_time: util.getFtSystemTime()
				}
				for (let a of this.basicInfoOfDiabetes) {
					if (a.list) {
						for (let b of a.list) {
							info[b.key] = b.model
						}
					}
				}
				for (let a of this.zzgl) {
					info[a.key] = a.model
				}
				params.data.info = info;

				let jzs = []
				for (let a of this.basicInfoOfDiabetes) {
					if (a.checkbox) {
						for (let b of a.checkbox) {
							if (b.checked) {
								jzs.push({
									family_history: b.name
								})
							}
						}
					}
				}
				params.data.jzs = jzs;
				let mqzz = []
				for (let a of this.currentSymptoms) {
					if (a.checked) {
						mqzz.push({
							symptom: a.name
						})
					}
				}
				params.data.mqzz = mqzz;
				let tnbbfz = []
				for (let a of this.diabeticComplications) {
					if (a.checked) {
						if (a.name !== '其他病变') {
							tnbbfz.push({
								insulin_complication: a.name,
								year: a.model
							})
						}
						if (a.name == '其他病变') {
							tnbbfz.push({
								insulin_complication: a.name,
								year: a.model,
								name: a.mode1
							})
						}
					}
				}
				params.data.tnbbfz = tnbbfz;
				// console.log(params);
				for (let item of this.basicInfoOfDiabetes) {
					if (!item.checkbox) {
						for (let jtem of item.list) {
							if (jtem.required && jtem.model == '') {
								return this.$lz.toast('必填项不能为空');
							}
						}
					}
				}
				// console.log(params);
				if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
					this.$u.post('SaveDiabetesInfo', params).then(res => {
						console.log(res);
						if (res.code == 200 && res.info == '响应成功') {
							this.$lz.toast(res.info)
							this.id = res.data.id
						}
					}).catch(err => {
						console.log(err);
					})
				}
			},
			// 发起网络请求 查询信息
			handleSearchDiabetesInfo() {
				// 有网
				if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
					this.$u.post('SearchDiabetesInfo', {
						person_id: this.person_id
					}).then(res => {
						console.log('有网');
						this.searchDiabetesInfo(res);
					})
				}
				// 离线
				
			},
			searchDiabetesInfo(res) {
				console.log(res);
				if (res.code == 200 && res.info == '响应成功') {
					var data = []
					data.push(res.data);
					this.id = data[0].id;
					for (let a of this.basicInfoOfDiabetes) {
						if (a.list) {
							for (let b of a.list) {
								b.model = data[0][b.key]
							}
						}
					}
					let family_history = data[0].family_history.split(',');
					for (let a of family_history) {
						for (let b of this.basicInfoOfDiabetes) {
							if (b.checkbox) {
								for (let c of b.checkbox) {
									if (a == c.name) {
										c.checked = true;
									}
								}
							}
						}
					}
					let symptom = data[0].symptom.split(',');
					for (let a of symptom) {
						for (let b of this.currentSymptoms) {
							if (a == b.name) {
								b.checked = true
							}
						}
					}
					for (let a of this.diabeticComplications) {
						a.model = data[0][a.key]
						if (a.keys) {
							a.mode1 = data[0][a.keys]
						}
					}
					let insulin_complication = data[0].insulin_complication.split(',');
					for (let a of insulin_complication) {
						for (let b of this.diabeticComplications) {
							if (a == b.name) {
								b.checked = true
							}
						}
					}
					for (let a of this.zzgl) {
						a.model = data[0][a.key]
					}
				}
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
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: .1rem;
				flex-direction: column;

				.content {
					background-color: #fff;
					border-radius: 16rpx;
					width: 96%;
					padding: .2rem;
					margin-bottom: .1rem;

					.main {
						display: flex;
						flex-wrap: wrap;

						.item {
							display: flex;
							align-items: center;
							width: 50%;
							margin-bottom: .1rem;
							position: relative;

							.name {
								width: 1.2rem;
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

							.icon {
								position: absolute;
								right: 1.4rem;
								color: #ccc;
							}

							.requiredIcon {
								color: #f00;
								font-size: .1rem;
							}
						}

						.check-box {
							display: flex;
							// align-items: center;
							margin-bottom: .1rem;

							.title {
								width: 1.2rem;
								text-align: right;
								flex-shrink: 0;
							}

							.checkbox-group {
								// margin-left: .1rem;

								.name {
									font-size: .14rem;
								}
							}
						}
					}

					.check-box {
						display: flex;
						margin-bottom: .1rem;

						.title {
							width: 1.32rem;
							text-align: right;
							margin-top: 8rpx;
							display: block;
							flex-shrink: 0;
						}

						.checkbox-group {
							margin-left: .1rem;

							.name {
								font-size: .14rem;
							}
						}
					}

					.tnb-wrap {
						display: flex;

						.title {
							width: 2.6rem;
							text-align: right;
							margin-top: 8rpx;
							display: block;
						}

						.u-checkbox-group-box {
							display: flex;
							flex-wrap: wrap;
							margin-left: .1rem;

							.tnb-main {
								display: flex;
								width: 50%;
								margin-bottom: .1rem;

								.tnb-name {
									width: .8rem;
									font-size: .14rem;
								}

								.input-box {
									display: flex;

									.input-content {
										display: flex;
										align-items: center;

										&>input {
											border: 1rpx solid #e3e3e3;
											border-radius: 8rpx;
											font-size: .12rem;
											padding: 10rpx 0 10rpx 20rpx;
											width: .5rem;
										}

										.name {
											margin-left: .1rem;
										}
									}
								}
							}
						}
					}

					.zzgl-wrap {
						display: flex;
						align-items: center;

						.name {
							width: 1.2rem;
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

						.icon {
							color: #ccc;
							margin-left: -.2rem;
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
