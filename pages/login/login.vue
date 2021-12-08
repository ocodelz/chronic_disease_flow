<template>
	<page-meta root-font-size="100px"></page-meta>
	<view class="wrap" :style="'height:'+pageHeight+'px'">
		<view class="content-box">
			<view class="content">
				<text class="title">慢病随访管理系统</text>
				<view class="input-box">
					<text class="iconfont">&#xe6cc;</text>
					<input class="input" placeholder="请输入用户名" v-model="form.phone" />
				</view>
				<view class="input-box">
					<text class="iconfont">&#xe615;</text>
					<input class="input" type="password" placeholder="请输入密码" v-model="form.password" />
				</view>
				<view class="action">
					<!-- <view>记住密码</view> -->
					<u-checkbox-group size="24">
						<u-checkbox @change="checkboxChange" v-model="offlineLoginStatus" :disabled="false"
							label-size=".12rem">强制离线登录</u-checkbox>
					</u-checkbox-group>
					<!-- <text class="register" @click="downloadingOfflinePackages">下载离线包</text> -->
					<text class="register" @click="isRegister = true">点我注册</text>
				</view>
				<u-button :custom-style="btnStyle" type="success" @click="handleTapSubmitBtn">登录</u-button>
			</view>
		</view>
		<u-popup v-model="isRegister" mode="center" border-radius="8">
			<view class="wrap-popup">
				<view class="title">医生注册</view>
				<view class="main">
					<view v-for="(item,index) in registerInfo" :key="index" class="content">
						<view class="iconfont icon">{{item.icon}}</view>
						<input :type="item.type" :placeholder="item.placeholder" :disabled="item.disabled"
							v-model="item.value" placeholder-class="placeholderClass" :adjust-position="false"
							@click="item.type == 'select' ? handleRegisterItem(item.name) : ''">
						<text class="iconfont select" v-if="item.type == 'select'">&#xe65a;</text>
					</view>
					<u-button class="btn" type="success" @click="handleDocregister">完成注册</u-button>
				</view>
			</view>
		</u-popup>
		<u-select v-model="selectorIsShow" :list="selectList" mode="single-column" @confirm="handleSelect"></u-select>
	</view>
</template>
<script>
	import md5Libs from "uview-ui/libs/function/md5";
	import {
		mapMutations
	} from 'vuex';
	var requestNum = 0;
	export default {
		data() {
			return {
				count: 0,
				offlinePackageTapStatus: false,
				interval: '',
				offlineLoginStatus: false,
				keyword: '',
				selectorIsShow: false,
				isRegister: false,
				selectList: [],
				department: [],
				company: [],
				item: '',
				// 页面高度
				pageHeight: 0,
				// 表单信息
				form: {
					phone: '13176008726',
					password: '111222'
				},
				// 按钮样式
				btnStyle: {
					width: '2rem',
					height: '.3rem',
					fontSize: '.14rem',
					color: '#fff'
				},
				registerInfo: [{
						icon: '\ue6cc',
						placeholder: '请输入您的姓名',
						value: '',
						type: 'text',
						disabled: false,
						key: 'F_RealName'
					},
					{
						icon: '\ue78d',
						placeholder: '请输入您的手机号',
						value: '',
						type: 'text',
						disabled: false,
						key: 'F_Mobile'
					},
					{
						icon: '\ue615',
						placeholder: '请输入您的密码',
						value: '',
						type: 'password',
						disabled: false,
						key: 'F_Password'
					},
					{
						icon: '\ue615',
						placeholder: '请确认您的密码',
						value: '',
						type: 'password',
						disabled: false
					},
					{
						name: '机构',
						icon: '\ue6b6',
						placeholder: '请选择您所在的机构',
						value: '',
						type: 'select',
						disabled: true
						// key: 'F_CompanyId'
					},
					{
						name: '部门',
						icon: '\ue6b6',
						placeholder: '请选择您的部门',
						value: '',
						type: 'select',
						disabled: true
						// key: 'F_DepartmentId'
					}
				]
			}
		},
		created() {
			// 页面高度赋值
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
		},
		computed: {
			...mapMutations(['uploadUserLxInfo'])
		},
		methods: {
			checkboxChange(e) {
				this.offlineLoginStatus = e.value;
			},
			handleRegisterItem(item) {
				this.item = item;
				if (item == '部门') {
					this.handleSearchDepartList();
					console.log(this.selectList);
				}
				if (item == '机构') {
					this.handleSearchCompanyList();
					console.log(this.selectList);
				}
			},
			handleSelect(e) {
				this.registerInfo.forEach(item => {
					if (this.item == item.name) {
						item.value = e[0].label;
					}
				})
			},
			// 查询部门列表
			handleSearchDepartList() {
				let obj = {
					companyId: "20011013-2df1-491a-938e-18613614072a",
					keyword: ''
				}
				this.$u.post('SearchDepartList', obj).then(res => {
					if (res.code == 200 && res.data.length) {
						let data = res.data,
							arr = [];
						data.forEach(item => {
							arr.push({
								value: item.F_CompanyId,
								label: item.F_FullName
							})
						})
						this.selectList = arr;
						this.selectorIsShow = true;
						this.department = arr;
						uni.setStorageSync('SearchDepartList', res.data);
					}
				}).catch(err => {
					// console.log(err);
				})
			},
			// 查询机构
			handleSearchCompanyList() {
				this.$u.post('SearchCompanyList').then(res => {
					if (res.code == 200 && res.data.length) {
						let data = res.data,
							arr = [];
						data.forEach(item => {
							console.log(item);
							arr.push({
								value: item.f_companyid,
								label: item.f_fullname
							})
						})
						this.selectList = arr;
						this.company = arr;
						this.selectorIsShow = true;
					}
				}).catch(err => {
					console.log(err);
				})
			},
			handleDocregister() {
				console.log(this.company);
				console.log(this.department);
				let F_CompanyId = '',
					F_DepartmentId = '';
				for (let item of this.registerInfo) {
					for (let jtem of this.company) {
						if (item.value == jtem.label) {
							F_CompanyId = jtem.value;
						}
					}
					for (let dtem of this.department) {
						if (item.value == dtem.label) {
							F_DepartmentId = dtem.value;
						}
					}
				}
				let obj = {
					F_CompanyId,
					F_DepartmentId
				}
				for (let item of this.registerInfo) {
					if (item.key) {
						obj[item.key] = item.value;
					}
				}
				obj.F_Password = md5Libs.md5(obj.F_Password);
				console.log(obj.F_Password);
				this.$u.post('Docregister', obj).then(res => {
					console.log(res);
					this.$lz.toast(res.info);
					this.isRegister = false;
				}).catch(err => {
					console.log(err);
				})
			},
			handleValidate() {
				if (this.$u.test.isEmpty(this.form.phone) || this.$u.test.isEmpty(this.form.password)) {
					return this.$lz.toast('用户名或用户密码不能为空');
				}
				if (!this.$u.test.mobile(this.form.phone)) {
					return this.$lz.toast('请输入合法的用户名');
				}
				if (this.$u.test.contains(this.form.password, ' ') || this.form.password.length < 6) {
					return this.$lz.toast('请输入合法的用户密码');
				}
			},
			handleLxStatus(bol) {
				uni.setStorageSync('lx_user_info', {
					lxStatus: bol
				});
				this.$store.commit("uploadUserLxInfo", {
					lxStatus: bol
				});
				this.$u.route({
					type: 'reLaunch',
					url: '/pages/index/index'
				})
			},
			// 提交信息 验证登录
			handleTapSubmitBtn() {
				if (this.handleValidate()) return;
				// console.log(this.$store.state.lxUserInfo);
				let lxstate = this.$store.state.lxUserInfo;
				// console.log(lxstate);
				uni.getNetworkType({
					success: res => {
						let networkType = res.networkType;
						if (networkType !== 'none' && this.offlineLoginStatus == false) {
							this.handleDocLogin();
						} else if (networkType !== 'none' && this.offlineLoginStatus && (lxstate == '' || lxstate.lxStatus == false)) {
							this.$lz.toast('请先下载离线包!');
						} else if (networkType !== 'none' && this.offlineLoginStatus && lxstate != '' && (lxstate.lxStatus == false || lxstate.lxStatus)) {
							this.handleLxStatus(true);
						} else if (networkType == 'none' && lxstate == '') {
							this.$lz.toast('请先下载离线包');
						} else if (networkType == 'none' && lxstate != '') {
							this.handleLxStatus(true);
						}
					},
					fail: err => {
						this.$lz.toast(err.errMsg);
					}
				})
			},
			// 发请求 用户登录
			handleDocLogin() {
				let obj = {
					phone: this.form.phone,
					password: md5Libs.md5(this.form.password)
				}
				this.$u.post('DocLogin', obj).then(res => {
					console.log(res);
					if (res.code == 200 && res.info == '响应成功') {
						this.$lz.toast(res.info);
						uni.setStorageSync('user_info', res.data);
						this.handleLxStatus(false);
					} else {
						this.$lz.toast(res.info)
					}
				}).catch(err => {
					this.$lz.toast(err.errMsg)
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.wrap {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background-color: #ffe6e6;
		font-size: .14rem;

		.content-box {
			width: 4rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #fff;
			border-radius: 6rpx;
			box-shadow: 0 0 .2rem #000;
			padding: .15rem 0;

			.content {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				width: 3rem;

				.title {
					font-size: 0.2rem;
				}

				.input-box {
					display: flex;
					align-items: center;
					width: 3rem;
					border: 1rpx solid #ccc;
					height: .4rem;
					position: relative;
					margin-top: .1rem;

					.iconfont {
						display: flex;
						align-items: center;
						justify-content: center;
						margin-left: .1rem;
						position: absolute;
						font-size: .14rem;
					}

					.input {
						width: 100%;
						font-size: .12rem;
						margin-left: .3rem;
						height: 100%;

					}
				}
			}
		}

		.action {
			display: flex;
			width: 100%;
			justify-content: space-between;
			padding: .1rem 0;
			align-items: center;
			font-size: .12rem;

			.register {
				color: #007AFF;
			}
		}

		.wrap-popup {
			width: 4rem;
			height: 3.6rem;

			.title {
				display: flex;
				align-items: center;
				width: 100%;
				height: .3rem;
				background-color: #01ba7d;
				padding-left: .1rem;
				color: #fff;
			}

			.main {
				width: 100%;
				height: 3.3rem;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;

				.content {
					display: flex;
					align-items: center;
					width: 96%;
					justify-content: center;
					position: relative;
					margin-bottom: .1rem;

					.icon {
						position: absolute;
						left: .1rem;
					}

					&>input {
						border: 1rpx solid #e3e3e3;
						border-radius: 8rpx;
						font-size: .12rem;
						padding: 15rpx .3rem;
						width: 100%;
					}

					.select {
						color: #ccc;
						position: absolute;
						right: 10rpx;
					}

					/deep/.placeholderClass {
						font-size: .12rem;
					}
				}

				.btn {
					width: 50%;
					height: .3rem;
					margin-top: .1rem;
				}
			}
		}
	}
</style>
