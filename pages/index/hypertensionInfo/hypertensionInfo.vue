<template>
	<view class="container">
		<free-title title="高血压基本信息" isRight></free-title>
		<view class="content" v-for="(item,index) in list" :key="index">
			<view v-for="(jtem,jndex) in item.list" :key="jndex" :style="handleInputStyle">
				<text class="name">{{jtem.name}}</text>
				<input :type="jtem.type" class="input" :disabled="jtem.disabled" :placeholder="jtem.placeholder"
					v-model="jtem.model" @click="handleTapInput(jtem.name)">
				<view v-if="jtem.type == 'select'" class="iconfont icon">&#xe65a;</view>
			</view>
			<block v-for="(ctem,cndex) in item.checkbox" :key="cndex">
				<view class="checkbox">
					<text class="txt">{{ctem.title}}</text>
					<view class="checkbox-group">
						<u-checkbox-group>
							<u-checkbox @change="checkboxChange($event,cndex,ctem)" v-for="(ztem,zndex) in ctem.items"
								:key="zndex" v-model="ztem.checked" :name="ztem.name">
								<view style="display: flex;align-items: center;">
									<text>{{ztem.name}}</text>
									<input @click.stop="" v-if="(ztem.name == '其他' || ztem.name == '其他并发症') && ztem.checked" :type="ztem.type"
										class="input" :disabled="ztem.disabled" :placeholder="ztem.placeholder"
										v-model="ztem.model" style="margin-left: .1rem;">
								</view>
							</u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
			</block>
		</view>
		<view class="btn-container">
			<u-button class="btn" @click="handleSubmitBtn" type="primary">保存</u-button>
		</view>
		<u-picker v-model="isTime" mode="time" @confirm="handlePicker"></u-picker>
		<u-select v-model="selectorIsShow" :list="selectList" @confirm="handleSelect"></u-select>
	</view>
</template>
<script>
	let searchOffineHypertensionInfo = uni.getStorageSync('SearchOffineHypertensionInfo');
	import freeTitle from '@/components/free-ui/free-title/free-title.vue';
	import common from '../../../js/hypertensionInfo.js';
	import utils from '@/common/utils.js';
	import gutils from '@/utils/util.js';
	export default {
		components: {
			freeTitle
		},
		data() {
			return {
				list: JSON.parse(JSON.stringify(common.hypertensionInfo)),
				person_id: '',
				selectorIsShow: false,
				selectList: [],
				item: '',
				isTime: false,
				dateofBirth: '',
				id: ''
			}
		},
		computed: {
			handleInputStyle() {
				for (let item of this.list) {
					for (let jtem of item.list) {
						if (jtem.name == '终止管理') {
							return `display: flex;align-items: center; width:50%;position:relative;`
						}
					}
				}
			}
		},
		mounted() {
			console.log(searchOffineHypertensionInfo);
			let res = uni.getStorageSync('login_info');
			if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
				if (res !== '') {
					this.person_id = res[0].id;
				}
				console.log(2323);
			}
			
			this.handleSearchHypertensionInfo();
			uni.$on('switchUser', () => {
				this.list = JSON.parse(JSON.stringify(common.hypertensionInfo))
			})
		},
		destroyed() {
			uni.$off('switchUser');
		},
		methods: {
			checkbox(arr, e, title) {
				let data = ['无症状', '无任何并发症', '以上皆无', '不详', '拒答'];
				for (let item of arr) {
					if (item.checkbox) {
						for (let ctem of item.checkbox) {
							if (ctem.title == title) {
								for (let jtem of ctem.items) {
									if (data.indexOf(e.name) !== -1 && e.value && (data.indexOf(jtem.name) == -1)) {
										jtem.checked = false;
									}
									if ((data.indexOf(e.name) == -1) && (data.indexOf(jtem.name) !== -1) || (data.indexOf(
											jtem.name) >= 1)) {
										jtem.checked = false;
									}
								}
							}
						}
					}
				}
			},
			checkboxChange(e, cndex, ctem) {
				if (ctem.title == '家族史' || ctem.title == '目前症状' || ctem.title == '并发症') {
					this.checkbox(this.list, e, ctem.title);
				}
				console.log(e);
			},
			handleTapInput(item) {
				this.item = item;
				this.selectorIsShow = true;
				switch (item) {
					case "管理组别":
						this.selectList = common.managementGroup;
						break;
					case "病例来源":
						this.selectList = utils.sourceOfCases;
						break;
					case "是否使用降压药":
					case "终止管理":
						this.selectList = common.answer;
						break;
					case "终止管理理由":
						this.selectList = common.ReasonsForTermination;
						break;
					case "终止管理日期":
						this.isTime = true;
						this.selectorIsShow = false;
						break;
				}
			},
			handlePicker(e) {
				this.dateofBirth = e.year + '-' + e.month + '-' + e.day;
				for (let item of this.list) {
					for (let jtem of item.list) {
						if (jtem.name == this.item) {
							jtem.model = this.dateofBirth;
						}
					}
				}
			},
			handleSelect(e) {
				let _item = this.item;
				for (let item of this.selectList) {
					for (let jtem of this.list) {
						for (let ltem of jtem.list) {
							if (_item == ltem.name) {
								ltem.model = e[0].label
							}
						}
					}
				}
			},
			// 保存 & 修改高血压基本信息
			handleSubmitBtn() {
				let param = {
					data: {}
				}
				let info = {
					id: this.id,
					person_id: this.person_id,
					jzs: [],
					zz: [],
					bfz: []
				}
				console.log(info);
				for (let item of this.list[0].list) {
					info[item.key] = item.model;
				}
				for (let item of this.list[0].checkbox[0].items) {
					if (item.checked) {
						let obj = {
							family_history: item.name
						}
						info.jzs.push(obj)
					}
				}
				for (let item of this.list[0].checkbox[1].items) {
					if (item.checked) {
						let obj = {
							symptom: item.name
						}
						info.zz.push(obj)
					}
				}
				for (let item of this.list[0].checkbox[2].items) {
					if (item.checked) {
						let obj = {
							complication: item.name
						}
						info.bfz.push(obj)
					}
				}
				param.data.info = info;
				let zh = {
					create_time: gutils.getFtSystemTime()
				}
				for (let item of this.list[1].list) {
					zh[item.key] = item.model;
				}
				param.data.zh = zh;
				console.log(param);
				// 联网
				if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
					this.$u.post('SaveHypertensionInfo', param).then(res => {
						console.log(res);
						if (res.code == 200 && res.info == '响应成功') {
							this.id = res.data[0].id;
							this.$lz.toast(res.info)
						}
					}).catch(err => {
						this.$lz.toast(err.errMsg);
					})
				}
				// 离线
			},
			// 查询高血压基本信息
			handleSearchHypertensionInfo() {
				// 联网
				if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
					this.$u.post('SearchHypertensionInfo', {
						person_id: this.person_id
					}).then(res => {
						if (res.code == 200 && JSON.stringify(res.data) !== '[]') {
							this.$lz.toast(res.info);
							this.id = res.data[0].id;
							for (let item of this.list[0].list) {
								item.model = res.data[0][item.key]
							}
							for (let item of this.list[1].list) {
								item.model = res.data[0][item.key]
							}
							for (let item of this.list[0].checkbox[0].items) {
								for (let jtem of res.data[0].family_history.split(',')) {
									if (item.name == jtem) {
										item.checked = true;
									}
								}
							}
						
							for (let item of this.list[0].checkbox[1].items) {
								for (let jtem of res.data[0].symptom.split(',')) {
									if (item.name == jtem) {
										item.checked = true;
									}
								}
							}
							for (let item of this.list[0].checkbox[2].items) {
								for (let jtem of res.data[0].complication.split(',')) {
									if (item.name == jtem) {
										item.checked = true;
									}
								}
							}
						}
					}).catch(err => {
						this.$lz.toast(err.errMsg)
					})
				}
				// 离线
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	.container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.content {
			width: 96%;
			background-color: #fff;
			border-radius: 18rpx;
			padding: .15rem 0 .15rem 0;
			margin-bottom: .15rem;
			display: flex;
			flex-wrap: wrap;
			align-content: center;

			.name {
				width: 1.2rem;
				text-align: right;
				margin-right: .1rem;
			}

			.input {
				border: 1rpx solid #e3e3e3;
				border-radius: 8rpx;
				font-size: .12rem;
				padding: 10rpx 0 10rpx 20rpx;
				width: 1.6rem;
				margin-bottom: .1rem;
				margin-top: .1rem;
				position: relative;
			}

			.icon {
				position: absolute;
				right: 32%;
				color: #ccc;
			}

			.checkbox {
				display: flex;

				.txt {
					width: 1.2rem;
					text-align: right;
					margin-right: .1rem;
					margin-top: 5rpx;
				}

				.checkbox-group {
					flex: 1;
					margin-bottom: .1rem;
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
