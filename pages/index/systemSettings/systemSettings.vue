<template>
	<view>
		<view v-if="state == '0'">
			<category :contentList="contentList" @click="handleTapCategoryItem"></category>
			<change-password :isShow="changePasswordPage" @close="changePasswordPage = false"></change-password>
			<personal-information :isShow="personalInformation" @close="personalInformation = false"></personal-information>
			<device-management :isShow="deviceManagement" @close="deviceManagement = false"></device-management>
			<upload-exception-information :isShow="uploadExceptionInformation" @close="uploadExceptionInformation = false">
			</upload-exception-information>
			<configure-login :isShow="configureLogin" @close="configureLogin = false" @click="handleTapLogin"></configure-login>
		</view>
		<view v-if="state == '1'">
			<parameter-configuration></parameter-configuration>
		</view>
	</view>
</template>

<script>
	import category from '@/components/free-ui/free-category/category.vue';
	import changePassword from '../changePassword/changePassword.vue';
	import personalInformation from '../personalInformation/personalInformation.vue';
	import deviceManagement from '../deviceManagement/deviceManagement.vue';
	import uploadExceptionInformation from '../uploadExceptionInformation/uploadExceptionInformation.vue';
	import configureLogin from '../configureLogin/configureLogin.vue';
	import parameterConfiguration from '../parameterConfiguration/parameterConfiguration.vue';
	export default {
		components: {
			category,
			changePassword,
			personalInformation,
			deviceManagement,
			uploadExceptionInformation,
			configureLogin,
			parameterConfiguration
		},
		data() {
			return {
				contentList: [],
				changePasswordPage: false,
				personalInformation: false,
				deviceManagement: false,
				uploadExceptionInformation: false,
				configureLogin: false,
				state: '0'
			}
		},
		mounted() {
			this.__init();
		},
		methods: {
			// 初始化数据
			__init() {
				this.contentList.push({
					picture: 'https://z3.ax1x.com/2021/05/29/2kL8wF.png',
					name: '设备管理'
				}, {
					picture: 'https://z3.ax1x.com/2021/05/29/2kLYFJ.png',
					name: '个人信息'
				}, {
					picture: 'https://z3.ax1x.com/2021/05/29/2kO8jP.png',
					name: '修改密码'
				}, {
					picture: 'https://z3.ax1x.com/2021/05/29/2kLtY9.png',
					name: '版本信息'
				}, {
					picture: 'https://z3.ax1x.com/2021/05/29/2kLGo4.png',
					name: '升级检测'
				}, {
					picture: 'https://z3.ax1x.com/2021/05/29/2kOFpR.png',
					name: '上传异常信息'
				}, {
					picture: 'https://z3.ax1x.com/2021/06/09/26Rer4.png',
					name: '配置'
				}, {
					picture: 'https://z3.ax1x.com/2021/05/29/2kLaS1.png',
					name: '退出当前账号'
				})
				let data = this.contentList;
				let list = [];
				for (let i = 0, len = data.length; i < len; i += 12) {
					list.push(data.slice(i, i + 12));
				}
				this.contentList = [];
				for (let j = 0; j < list.length; j++) {
					this.contentList.push(list[j]);
				}
			},
			// 点击列表事件
			handleTapCategoryItem(item, index) {
				switch (item) {
					case '设备管理':
						this.deviceManagement = true;
						// console.log(this.deviceManagement);
						break;
					case '个人信息':
						this.personalInformation = true;
						// console.log(this.personalInformation);
						break;
					case '修改密码':
						this.changePasswordPage = true;
						// console.log(this.changePasswordPage);
						break;
					case '版本信息':
					// #ifdef APP-PLUS
						plus.runtime.getProperty(plus.runtime.appid, (v) => {
							this.$lz.toast('当前是' + v.version + '版本!')
						})
					// #endif
						break;
					case '升级检测':
						this.$lz.toast('敬请期待!')
						break;
					case '上传异常信息':
						this.uploadExceptionInformation = true;
						// console.log(this.uploadExceptionInformation);
						break;
					case '配置':
						this.configureLogin = true;
						break;
					case '退出当前账号':
						this.$lz.showCancel('提示', '是否要退出').then(() => {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						})
						break;
				}
			},
			handleTapLogin(){
				this.configureLogin = false;
				this.state = '1';
			}
		}
	}
</script>

<style>
</style>
