<template>
	<view>
		<u-popup v-model="isSwitchRespondents" mode="center" @close="handlePopupClose">
			<view class="switch-respondents">
				<view class="title">
					<text class="txt">切换受访者</text>
				</view>
				<view v-for="(item,index) in list" :key="index" class="nav-tap">
					<view class="nav-content" :class="index == 0 ? 'active' : ''">
						<text class="txt">{{item}}</text>
					</view>
				</view>
				<view class="input-box" v-for="(item,index) in formList" :key="item.model"
					@click="handleTapSelectInput(item.model)">
					<input class="input" :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
						v-model="item.value" :adjust-position="false" />
					<view v-if="item.type == 'select'" class="iconfont icon">&#xe65a;</view>
					<view v-if="item.required" class="required">*</view>
				</view>
				<view class="desc-box">
					<view class="desc-content">
						<view :class="isActive ? 'active' : 'left'">
							<text>{{descInfo}}</text>
						</view>
						<view class="right" @click="isNewPhysicalExamination">
							<text class="iconfont check" v-if="isActive == true">&#xe74c;</text>
						</view>
					</view>
				</view>
				<view class="btn-box">
					<u-button class="btn" type="primary" @click="handleTapSignInBtn">登录</u-button>
				</view>
			</view>
		</u-popup>
		<!-- <u-select v-show="actionList.length" v-model="selectorIsShow" :list="actionList" @confirm="handleConfirm"></u-select> -->
		<u-select v-model="selectorIsShow" :list="actionList" @confirm="handleConfirm"></u-select>
	</view>
</template>

<script>
	import common from '@/common/utils.js';
	import utils from '@/utils/util.js';
	export default {
		props: {
			isSwitchRespondent: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				telephone: '',
				selectorIsShow: false,
				isSwitchRespondents: false,
				descInfo: '是否创建新的体检',
				isActive: false,
				// isNotion: false,
				item: '',
				current: 0,
				list: ['身份证登录'],
				actionList: [],
				formList: [{
						placeholder: '请输入身份证号',
						model: 'idnumber',
						type: 'idcard',
						disabled: false,
						value: '370827200102211612',
						required: true
					},
					{
						placeholder: '请输入您的姓名',
						model: 'username',
						type: 'text',
						disabled: false,
						value: '刘至',
						required: true
					},
					{
						placeholder: '请选择您的性别',
						model: 'sex',
						type: 'select',
						disabled: true,
						value: '男',
						required: false
					},
					{
						placeholder: '请选择民族',
						model: 'nation',
						type: 'select',
						disabled: true,
						value: '汉族',
						required: false
					},
					{
						placeholder: '请输入户籍地址',
						model: 'address',
						type: 'text',
						disabled: false,
						value: '山东省济南市历下区',
						required: true
					}
				],
				idcard: '',
				name: '',
				sex: '',
				nation: '',
				permanent_address: '',
				personalInfoList: []
			}
		},
		mounted() {
			this.isSwitchRespondents = this.isSwitchRespondent;
		},
		watch: {
			// 监听 isSwitchRespondents 状态
			isSwitchRespondent: {
				immediate: true,
				handler(val) {
					this.isSwitchRespondents = val;
				}
			}
		},
		methods: {
			handleConfirm(e) {
				console.log(e);
				for (let item of this.formList) {
					if (this.item == item.model) {
						item.value = e[0].label
					}
				}
			},
			// 性别 民族 输入框
			handleTapSelectInput(item) {
				this.item = item;
				if (item == 'sex') {
					this.actionList = common.gender;
					this.selectorIsShow = true;
				} else if (item == 'nation') {
					this.actionList = common.nation;
					this.selectorIsShow = true;
				}
			},
			// 传递弹出层状态
			handlePopupClose() {
				// this.isNotion = false;
				this.$emit('close');
			},
			// 是否创建新的体检
			isNewPhysicalExamination() {
				this.isActive = !this.isActive;
				this.isActive == true ? this.descInfo = '再次点击取消创建' : this.descInfo = '是否创建新的体检';

			},
			// 提交信息 验证切换受访者身份
			handleTapSignInBtn() {
				for (let item of this.formList) {
					if (item.model == 'idnumber') {
						this.idcard = item.value;
						if (!this.$u.test.idCard(item.value)) {
							return this.$lz.toast('非法身份证');
						}
					}
					if (item.model == 'username') {
						this.name = item.value;
						if (this.$u.test.isEmpty(item.value)) {
							return this.$lz.toast('非法姓名');
						}
					}
					if (item.model == 'sex') {
						this.sex = item.value;
						if (this.$u.test.isEmpty(item.value)) {
							return this.$lz.toast('非法姓名');
						}
					}
					if (item.model == 'nation') {
						this.nation = item.value;
						if (this.$u.test.isEmpty(item.value)) {
							return this.$lz.toast('非法民族');
						}
					}
					if (item.model == 'address') {
						this.permanent_address = item.value;
						if (this.$u.test.isEmpty(item.value)) {
							return this.$lz.toast('非法户籍');
						}
					}
				}
				let data = {
					idcard: this.idcard,
					name: this.name,
					sex: this.sex,
					nation: this.nation,
					permanent_address: this.permanent_address,
					data_type: 3,
					type: this.isActive == false ? 1 : 0,
					create_time: new Date().getTime()
				}
				// console.log(data);
				// 有网
				if (this.$store.state.lxUserInfo == '' || this.$store.state.lxUserInfo.lxStatus == false) {
					this.$u.post('Login', data).then(res => {
						console.log(res);
						if (res.code == 200 && res.info == '响应成功') {
							this.isSwitchRespondents = false;
							this.$lz.toast(res.info);
							uni.setStorageSync('login_info', res.data);
							uni.removeStorageSync('save_person_info');
							uni.$emit('switchUser', {});
						}
					})
				}
				// 离线
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.switch-respondents {
		width: 3rem;
		height: 4rem;

		.title {
			width: 100%;
			height: .3rem;
			background-color: #01ba7d;
			padding-left: .1rem;
			display: flex;
			align-items: center;

			.txt {
				color: #fff;
				font-size: .14rem;
			}
		}

		.nav-tap {
			width: 100%;
			height: .4rem;
			background-color: #ebfcf6;
			display: flex;
			align-items: flex-end;

			.active {
				background-color: #fff;
				color: #19692C;
			}

			.nav-content {
				height: .3rem;
				display: flex;
				align-items: center;
				border-top-right-radius: 4rpx;
				border-top-left-radius: 4rpx;
				padding: 0 .2rem 0 .2rem;

				.txt {
					font-size: .12rem;
				}
			}
		}

		.input-box {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-top: 10rpx;
			// margin-bottom: .1rem;

			.icon {
				position: absolute;
				right: 50rpx;
			}

			.input {
				position: relative;
				width: 80%;
				font-size: .12rem;
				height: .3rem;
				border: 1rpx solid #ccc;
				border-radius: 4rpx;
				padding-left: .1rem;
			}

			.required {
				position: absolute;
				right: .16rem;
				color: #f00;
				font-size: .12rem;
			}
		}

		.desc-box {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: .15rem;
			margin-bottom: .2rem;

			.desc-content {
				width: 85%;
				display: flex;
				align-items: center;

				.left {
					width: 1.1rem;
					height: .24rem;
					font-size: .12rem;
					display: flex;
					align-items: center;
					background-color: #ccc;
					justify-content: center;
					color: #fff;
					font-size: .12rem;
				}

				.active {
					width: 1.1rem;
					height: .24rem;
					font-size: .12rem;
					display: flex;
					align-items: center;
					background-color: #71d5a1;
					justify-content: center;
					color: #fff;
					font-size: .12rem;
				}

				.right {
					width: .22rem;
					height: .24rem;
					display: flex;
					align-items: center;
					font-size: .1rem;
					border: 1rpx solid #ccc;
					justify-content: center;

					.check {
						color: #18b566;
						font-size: .24rem;
						font-weight: 700;
					}
				}
			}
		}

		.btn-box {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 0.25rem;

			.btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 1.4rem;
				height: 0.25rem;
				font-size: .14rem;
			}
		}
	}
</style>
