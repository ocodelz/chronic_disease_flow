<script>
	import { mapState } from 'vuex';
	import utils from '@/utils/util.js';
	export default {
		computed: {
			...mapState(['basicSettingsList','tjsfList']),
		},
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
			// plus.screen.lockOrientation('landscape-primary');
			// #endif
			this.$u.post('SearchBasicSetting',{
				F_companyId: '20011013-2df1-491a-938e-18613614072a'
			}).then(res => {
				// console.log(res);
				if(res.code == 200 && res.data.length){
					let data = res.data[0];
					for(let item of this.basicSettingsList){
						item.value = data[item.key];
					}
					for(let item of this.tjsfList){
						item.value = data[item.key];
					}
					// console.log(this.basicSettingsList)
				}
			}).catch(err => {
				console.log(err);
			})
		},					
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import './common/free-iconfont.css';
</style>
