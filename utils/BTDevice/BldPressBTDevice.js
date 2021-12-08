let common = require("../util.js");
import {
	BTDevice
} from "./BTDevice.js"
let datahelper = require("./BldPressDataHelper.js")

class BldPressBTDevice extends BTDevice {
	constructor() {
		super();
	}
	close(callback) {
		try {
			this._closefinder()
			this.stop()
			super.close(callback)
		} catch (e) {
			console.log(e.message)
		}
	}

	init() {
		try {
			this._init()
			this._openBlue()
		} catch (e) {
			console.log(e.message)

		}
	}

	start(jsonParam, callback, interval = 2000) {
		let that = this;
		try {
			this.hexData = [];
			this.receiveCount = 0;

			console.log(JSON.stringify(jsonParam));
			if (that.busying) {
				callback({
					type: "conn",
					success: false,
					msg: '已经连接!',
					data: jsonResult
				})
				return;
			}
			//let itmer = null;
			that._doConnect(jsonParam, callback)
		} catch (e) {
			console.log(e.message)

		}
		//this.itmer = setInterval(that._doConnect.bind(this), interval, jsonParam, callback)
		//that._doConnect(jsonParam, callback);

	}
	//    start(){
	// 	super.sendCmd('CC80020301020002'); //8.0
	// }
	stop() {
		try {
			super.sendCmd("CC80020301030003")
		} catch (e) {
			console.log(e.message)

		}
	}
	_doConnect(jsonParam, callback) {
		let that = this;
		//that.busying=true;
		try {
			super.initBlue(jsonParam, d => {
				console.log('super.initBlue ' + JSON.stringify(d));
				if (!d.success) {
					that.busying = false;
					//that._closefinder()
					callback(d)
					return;
				}
				if (!!callback) {
					callback({
						type: "initBlue",
						success: true,
						msg: '蓝牙初始化成功!',
						data: ""
					})
				}
				//callback(d)
				that.finded = true;
				that.busying = false;
				that._closefinder()
				that._connReceive(callback)

			}, false)
		} catch (e) {
			console.log(e.message)

		}
	}
	_connReceive(callback) {
		let that = this;
		try {
			super.connetBlue(d => {
				if (!d.success) {
					that.busying = false;
					callback(d)
				} else {
					if (!!callback) {
						callback({
							type: "conn",
							success: true,
							msg: '蓝牙初始连接成功!',
							data: ""
						})
					}
					//	super.sendCmd('CC80020301010001'); //连接设备。
					//	super.sendCmd('CC80020301020002'); //开始测量

					super.startReceive(d => {
						if (!d.success) {
							that.busying = false;
							callback(d)
						} else {
							that.busying = false;
							that._receiveDataCallBack(d.data, callback)
						}
					}, d => {
						callback(d)
						if (d.success) {
							super.sendCmd('CC80020301010001', d => {
								callback(d)
								if (d.success) {
									super.sendCmd('CC80020301020002', d => {
										callback(d)
									}); //开始测量
								}
							}); //连接设备。
						}

					})

				}
			}, callback)
		} catch (e) {
			console.log(e.message)

		}
	}
	_receiveDataCallBack(data, callback) {
		let that = this;
		try {
			this.receiveCount++;
			let hData = common.ab2hex(data)

			if (!this.hexData.some(d => d == hData)) {
				this.hexData.push(hData)
			}

			//console.log('receiveDataCallBack:' + hData)
			let strHexdata = this.hexData.join('');

			//console.log('receiveDataCallBack strHexdata:' + strHexdata)
			//if (hData.indexOf('aa80') > 0 ) {

			//接受数据ack自动关机			
			let helper = new datahelper.BldPressDataHelper()
			let jsonResult = helper.parseData(strHexdata);
			if (!!callback) {
				// {
				// 	type: "_receiveDataCallBack",
				// 	success: true,
				// 	msg: '返回数据成功!',
				// 	data: jsonResult
				// }
				callback(jsonResult)
				this.receiveCount = 0
				this.hexData = [];
			}
		} catch (e) {
			console.log(e.message)

		}

	}
}
module.exports = { //必须在这里暴露接口，以便被外界访问，不然就不能访问
	BldPressBTDevice: BldPressBTDevice
}
