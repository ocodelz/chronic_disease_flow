const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'http://app.jnthinksoft.cn:6060/api/area/',
		loadingText: '努力加载中~',
		loadingTime: 500,
		header: {
			'content-type': 'application/json'
		}
	});
}

export default {
	install
}