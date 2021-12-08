import utils from "../utils/util.js";
const formatId = () => {
	let date = new Date();
	let str = '';
	let strLength = 4;
	let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
	for (let i = 0; i < strLength; i++) {
		let index = Math.floor(Math.random() * 9);
		str += random[index];
	}
	str = 'sfblxid' + utils.formatTime(date) + date.getMilliseconds() + str;
	return str = str.replace(/[/: ]/g, "");
}
const toast = str => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: str,
			icon: "none",
			duration: 2000,
			success: () => {
				setTimeout(() => {
					resolve
				}, 2000)
			}
		})
	})
};
const successToast = str => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: str,
			icon: "success",
			duration: 2000,
			success: () => {
				setTimeout(() => {
					resolve()
				}, 2000)
			}
		})
	})
};
const showLoading = () => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			success: () => {
				resolve()
			}
		})
	})
};
const tipLoading = str => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: str,
			mask: true,
			success: () => {
				resolve()
			}
		})
	})
};
const hideLoading = () => {
	return new Promise((resolve, reject) => {
		uni.hideLoading({
			success: () => {
				resolve()
			}
		})
	})
};
const showCancel = (title, content) => {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: title,
			content: content,
			showCancel: true,
			success: res => {
				if (res.confirm) {
					resolve();
				} else {
					reject();
				}
			}
		})
	})
};
const hideCancel = (title, content) => {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: title,
			content: content,
			showCancel: false,
			success: res => {
				if (res.confirm) {
					resolve();
				}
			}
		})
	})
};
export default {
	toast,
	successToast,
	showLoading,
	tipLoading,
	hideLoading,
	showCancel,
	hideCancel,
	formatId
}
