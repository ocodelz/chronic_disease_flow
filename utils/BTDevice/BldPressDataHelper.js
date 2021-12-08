let tool = require("../util.js");
class BldPressDataHelper {
	constructor(hexdata) {
		this.hexdata = hexdata | "";
		this.strdata = "";
		this.datacursor = 0
	}

	parseData(hexdata = "") {
		this.hexdata = hexdata || this.hexdata;
		this.datacursor = 0
		console.log('parseData=', this.hexdata);

        //设备连接回应
		if (this.hexdata.indexOf("aa800203010100") > -1) {
			return {
				type: "conn",
				success: true,
				msg: '连接血压仪成功!',
				data: ""
			}
		} 
		//设备启动(开始测量)成功
		else if (this.hexdata.indexOf("aa800203010200") > -1) {
			return {
				type: "start",
				success: true,
				msg: '开始血压测量成功!',
				data: "",
			}
		} 
		//停止测量命令成功
		else if (this.hexdata.indexOf("aa800203010300") > -1) {
			return {
				type: "stop",
				success: true,
				msg: '停止测量命令成功!',
				data: "",
			}
		} 
		//错误信息
		else if (this.hexdata.indexOf("aa8002030107") > -1) {
			
			console.log('err='+this. hexdata)
			let errCode=this.hexdata.substr(12,2);
			
			let errMsg=''
			
			if (errCode=="01"){
				
				errMsg='臂筒内上游气囊压力超过安全压力';
			}else 	if (errCode=="02"){
				errMsg='测量中手臂放置不正确或臂筒内上游气囊漏气';
				
			} else if (errCode=="05"){
				errMsg='测量中手臂放置不正确或臂筒内下游气囊漏气';
				
				
			}else if (errCode=="06"){
				errMsg='手臂放置方式不正确或脉搏传感器无信号';
				
			}else if (errCode=="07"){
					errMsg='电量不足,请充电';
				
			} else if (errCode=="09"){
				errMsg='臂筒内气囊放气时间过长';
				
			}else {
				errMsg='未知错误';
				
			}
			//hexToDec;
			
			return {
				type: "err",
				success: false,
				msg: errMsg,
				data: errCode
			}
		}
		//血压计实时压力值
		else if (this.hexdata.indexOf("aa8002080105") > -1) {
			
			let pressData=this.hexdata.substr(12);
			console.log('pressData='+pressData)
			let dat4=pressData.substr(2,2);
			let dat1=pressData.substr(8,2);
			let decData=tool.hexToDec(dat4)*256
			+tool.hexToDec(dat1)^tool.hexToDec(dat4);
			
			//hexToDec;
			
			return {
				type: "data-press",
				success: true,
				msg: '血压实时压力!',
				data: decData+"mmHg"
			}
		}
		//测量完成后,最终血压值
		else if (this.hexdata.indexOf("aa80020f0106") > -1) {
			
			console.log('result='+this.hexdata)	
			//aa80020f010601 14050c0c1f12  0080004900459b 
			//{"type":"data-result","success":true,"msg":"最终血压值"
			//,"data":{"username":549790351622,"time":"2001-- --"
			//,"sysVal":null,"diaVal":10245,"pulVal":671750156}}
			
			let username=tool.hexToDec( this.hexdata.substr(12,2));			
			let timer6byte=this.hexdata.substr(14,12);
			 console.log('timer6byte='+timer6byte);
			let tmpYearPart=tool.hexToDec( timer6byte.substr(0,2)).toString();
			//let tmpY=tmpYearPart<10?'0'+tmpYearPart:tmpYearPart+''
			//时间
			let strTime="20"+tmpYearPart
			 +'-'+ tool.hexToDec(  timer6byte.substr(2,2)).toString()
			 +'-'+tool.hexToDec( timer6byte.substr(4,2)).toString()
			 +' '+tool.hexToDec(timer6byte.substr(6,2)).toString()
			 +':'+tool.hexToDec(timer6byte.substr(8,2)).toString()
			 +':'+tool.hexToDec(timer6byte.substr(10,2)).toString()
			 
			 console.log('strTime='+strTime);
			 
			 let vale6byte=this.hexdata.substr(26,12);
			//收缩压
			let  strSysVal=tool.hexToDec(vale6byte.substr(0,2))*256
			     +tool.hexToDec(vale6byte.substr(2,2))
				 
			console.log('strSysVal='+strSysVal);
			//舒张压
			let  strDiaVal=tool.hexToDec(vale6byte.substr(4,2))*256
			     +tool.hexToDec(vale6byte.substr(6,2))
			
			//脉搏数
			let  strPulVal=tool.hexToDec(vale6byte.substr(8,2))*256
			     +tool.hexToDec(vale6byte.substr(10,2))	
		
			
			return {
				type: "data-result",
				success: true,
				msg: '最终血压值',
				data:{
					username:username, time:strTime,sysVal:strSysVal,
					diaVal:strDiaVal,pulVal:strPulVal
				}
			}
		}
		
		
		else{
			
			return {
				type: "other",
				success: true,
				msg: '未知!',
				data: this.hexdata 
			}
		}
		//let resultAry=this.strdata.split(' ')
		// let jsonResult = {
		// 	som: resultAry[0].substr(0,1),			
		// 	protocol: resultAry[0].substr(1,1),
		// 	upload_log: resultAry[0].substr(2,1),
		// 	data_size:resultAry[1],
		// 	datas:[]
		// };


		// for (var i = 2; i < resultAry.length-1; i+=3) {
		// 	let item={
		// 		datetime:this._getValueDate(resultAry[i]),
		// 	    value:resultAry[i+1],
		// 		flag :resultAry[i+2],
		// 		result:this._getValueResult(resultAry[i+1])
		// 	 };
		// 	 jsonResult.datas.push(item)
		// }		
		//return  jsonResult;
	}


}
module.exports = { //必须在这里暴露接口，以便被外界访问，不然就不能访问
	BldPressDataHelper: BldPressDataHelper
}
