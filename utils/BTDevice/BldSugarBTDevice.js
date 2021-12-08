let common = require("../util.js");
import {
	BTDevice
} from "./BTDevice.js"
let datahelper = require("./BldSugarDataHelper.js")

class BldSugarBTDevice extends BTDevice {
	constructor() {
		super();
		this.dataReceiveFinished=false;
	}
	close(callback) {
		this._closefinder()
		super.close(callback)
		//super._closeBlue();

	}
    init(){
		this._init()
		
		this._openBlue()
	}
	conn(jsonParam, callback, interval = 2000) {
		let that = this;
		//this.uicallback=callback;
		if (!!that.closed){
			
			//已关闭无法进行其他操作
			console.log('conn,已关闭无法进行reconn操作')
			return ;
		}
		this.hexData = [];
		this.receiveCount = 0;
//		console.log(JSON.stringify(jsonParam));
		if (that.busying) {

			callback({
				success: false,
				msg: '已经连接!',
				data: jsonResult
			})
			return;
		}
		//let itmer = null;
		that._doConnect(jsonParam, callback)
		//this.itmer = setInterval(that._doConnect.bind(this), interval, jsonParam, callback)
		//that._doConnect(jsonParam, callback);

	}

	_doConnect(jsonParam, callback) {
		let that = this;
		//that.busying=true;
		super.initBlue(jsonParam, d => {

			if (!d.success) {
				that.busying = false;
				//that._closefinder()
				callback(d)
				return;
			}
//			console.log('3 成功返回到_doConnect');
			that.finded = true;			
			that.busying = false;
			that._closefinder()
			that._connReceive(callback)

		})
	}



	_connReceive(callback) {
		let that = this;
		super.connetBlue(d => {
			if (!d.success) {
				that.busying = false;
				callback(d)
			} else {
				super.startReceive(d => {
					if (!d.success) {
						that.busying = false;
						callback(d)
					} else {
						that.busying = false;
						that._receiveDataCallBack(d.data, callback)
					}
				}
				// ,d=>{
				// 	callback(d)
				// 	//console.log('_connReceive ready write ',JSON.stringify(d))
				// 	//callback(d)
				// }
				)

			}
		})
	}
	_receiveDataCallBack(data, callback) {
		let that=this;
		
		that.dataReceiveFinished=false;
		
		this.receiveCount++;
//		console.log(data)
		let hData = common.ab2hex(data)
//		console.log('DataCallBack hData='+hData)
		//let hexStr= common.hexcharcode2Str(hData);
		
//		console.log('DataCallBack hexStr='+hexStr)
		
		//.indexOf('0d') 
		if (!that.dataReceiveFinished){
			if (hData.toUpperCase().indexOf("26445A")>-1) {
				that.receiveCount=1;
				that.hexData=[];
			}
			that.hexData.push(hData)
			
		}
		// if (!this.hexData.some(d => d == hData)) {
		// 	this.hexData.push(hData)
		// }
//		console.log('receiveDataCallBack:' + hData)
		let strHexdata = this.hexData.join('');
		//console.log('DataCallBack hexStr='+hexStr)
	    
        //let hexAscString= common.hexcharcode2Str(strHexdata)
//		console.log('DataCallBack hexAscString='+hexAscString)
		//console.log('receiveDataCallBack hexAscString:' + hexAscString)
		if (strHexdata.toUpperCase().indexOf('26445A') > -1 
		&& strHexdata.toUpperCase().indexOf("0D") > -1) {
			console.log('接收数据完成', common.hexcharcode2Str(strHexdata))
			that.dataReceiveFinished=true;
			super.sendCmd('2644312031200632373838340D',d=>{	
				
//				console.log('sendCmd 完成命令:' +JSON.stringify(d))
				if (d.success){
					 setTimeout(()=>{
						  that.conn(that.jsonParam, callback)
						 
					 },10000)
										
				}
				 // super._closeConect(d=>{
					
					 
				 // })
			}); 
			//接受数据ack自动关机			
			let helper = new datahelper.BldSugarDataHelper()
			let jsonResult = helper.parseData(strHexdata);
//			console.log('_receiveDataCallBack 返回的数据:' +JSON.stringify(jsonResult))
			
			if (!!callback) {
//				console.log('_receiveDataCallBack callback:' +JSON.stringify(jsonResult))
				callback({
					success: true,
					msg: '返回数据成功!',
					data: jsonResult
				})
			}
			that.receiveCount = 0
			that.hexData = [];
           
			
			//  setTimeout (d=>{				 
			// 	 	that.conn(that.jsonParam, that.callback)
			//  },8000)
			
			
				
			
			
		}

	}

}
module.exports = { //必须在这里暴露接口，以便被外界访问，不然就不能访问
	BldSugarBTDevice: BldSugarBTDevice
}
