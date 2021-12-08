let tool = require("../util.js");
class BldSugarDataHelper {
	constructor(hexdata) {
		this.hexdata = hexdata|"";
		this.strdata="";
		this.datacursor=0
	}
	_getValueResult(value){
		
		if (value<=10) {
			return  '低'
		}else if  (value<=600){
			return  '正常'
		}else if (value>600){
			return  '高'
		}
		
	}
	_getValueDate(value){
		let strDatetime=value.replace("\u001e",'')
		return  '20'+strDatetime.substr(4,2)
		+'-'+strDatetime.substr(0,2)
		+'-'+strDatetime.substr(2,2)
		+' '+strDatetime.substr(6,2)
		+':'+strDatetime.substr(8,2)
	}
	parseData(hexdata="") {
		//&DZ 1 0102150643 63 0 11430
		//&DZ 1 0102150644 55 0 63855
		this.hexdata = hexdata||this.hexdata;
		this.datacursor=0
		this.strdata=tool.hexcharcode2Str(this.hexdata)
		console.log('parseData tool.hexcharcode2Str(this.hexdata)='+this.strdata)
		let resultAry=this.strdata.split(' ')
		let jsonResult = {
			som: resultAry[0].substr(0,1),			
			protocol: resultAry[0].substr(1,1),
			upload_log: resultAry[0].substr(2,1),
			data_size:resultAry[1],
			datas:[]
		};
		
		
		for (var i = 2; i < resultAry.length-1; i+=3) {
			console.log(resultAry[i+1] + '-------------');
			let item={
				datetime:this._getValueDate(resultAry[i]),
			    value: (Number( resultAry[i+1])/18+0.05).toFixed(2),
				flag :resultAry[i+2],
				result:this._getValueResult(resultAry[i+1])
			 };
			 jsonResult.datas.push(item)
		}		
		return  jsonResult;
	}


}
module.exports = { //必须在这里暴露接口，以便被外界访问，不然就不能访问
	BldSugarDataHelper: BldSugarDataHelper
}
