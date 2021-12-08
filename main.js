import Vue from 'vue'
import App from './App'
import $ from 'common/tips.js'
import store from './store';
Vue.prototype.$lz = $;
Vue.prototype.$store = store;
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
import httpInterceptor from '@/common/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)
app.$mount()
