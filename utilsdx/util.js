const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//将Uint8Array转换为str
function uint8ArrayToStr(uint8Arrys) {
  //数组与中文之间的转换---start
  // var testStr = str2arrayBuffer('中文转换测试dvadsgaag550！#')
  // var strUint8Array = new Uint8Array(testStr)
  var strArrayBuffer = arrayToBuffer(uint8Arrys)//将Uint8Array转换为ArrayBuffer
  var strUint16Array = new Uint16Array(strArrayBuffer)//将ArrayBuffer转换为Uint16Array
  var testStrNew = array2Str(strUint16Array)//将Uint16Array转换为汉字
  return testStrNew.replace(/(^\s+)|(\s+$)/g, "");
}

function array2Str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}
// function str2arrayBuffer(str) {
//   var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
//   var bufView = new Uint16Array(buf);
//   for (var i = 0, strLen = str.length; i < strLen; i++) {
//     bufView[i] = str.charCodeAt(i);
//   }
//   return buf;
// }

function arrayToBuffer(array) {
  var buffer = new ArrayBuffer(array.length)
  var dataView8 = new Uint8Array(buffer)
  for (var i = 0; i < array.length; i++) {
    dataView8[i] = array[i]
  }
  return buffer
}

function stringToArrayBuffer(hexString){
  var typedArray3 = new Uint8Array(hexString.match(/[\da-f]{2}/gi).map(function (h) {
    return parseInt(h, 16)
  }))
  var buffer3 = typedArray3.buffer
  return buffer3
}
//数组与中文之间的转换---stop
//性别转换
function getSexFromCode(strSexCode)
{
  if ('0' == strSexCode.charAt(0)) {
    return "未知";
  }
  else if ('1' == strSexCode.charAt(0)) {
    return "男";
  }
  else if ('2' == strSexCode.charAt(0)) {
    return "女";
  }
  else if ('9' == strSexCode.charAt(0)) {
    return "未说明";
  }
  return "未定义";
}
//民族转换
function getNationFromCode(strNationCode)
{
  if (strNationCode == ("01")) {
    return "汉";
  }
  else if (strNationCode == ("02")) {
    return "蒙古";
  }
  else if (strNationCode == ("03")) {
    return "回";
  }
  else if (strNationCode == ("04")) {
    return "藏";
  }
  else if (strNationCode == ("05")) {
    return "维吾尔";
  }
  else if (strNationCode == ("06")) {
    return "苗";
  }
  else if (strNationCode == ("07")) {
    return "彝";
  }
  else if (strNationCode == ("08")) {
    return "壮";
  }
  else if (strNationCode == ("09")) {
    return "布依";
  }
  else if (strNationCode == ("10")) {
    return "朝鲜";
  }
  else if (strNationCode == ("11")) {
    return "满";
  }
  else if (strNationCode == ("12")) {
    return "侗";
  }
  else if (strNationCode == ("13")) {
    return "瑶";
  }
  else if (strNationCode == ("14")) {
    return "白";
  }
  else if (strNationCode == ("15")) {
    return "土家";
  }
  else if (strNationCode == ("16")) {
    return "哈尼";
  }
  else if (strNationCode == ("17")) {
    return "哈萨克";
  }
  else if (strNationCode == ("18")) {
    return "傣";
  }
  else if (strNationCode == ("19")) {
    return "黎";
  }
  else if (strNationCode == ("20")) {
    return "傈僳";
  }
  else if (strNationCode == ("21")) {
    return "佤";
  }
  else if (strNationCode == ("22")) {
    return "畲";
  }
  else if (strNationCode == ("23")) {
    return "高山";
  }
  else if (strNationCode == ("24")) {
    return "拉祜";
  }
  else if (strNationCode == ("25")) {
    return "水";
  }
  else if (strNationCode == ("26")) {
    return "东乡";
  }
  else if (strNationCode == ("27")) {
    return "纳西";
  }
  else if (strNationCode == ("28")) {
    return "景颇";
  }
  else if (strNationCode == ("29")) {
    return "柯尔克孜";
  }
  else if (strNationCode == ("30")) {
    return "土";
  }
  else if (strNationCode == ("31")) {
    return "达斡尔";
  }
  else if (strNationCode == ("32")) {
    return "仫佬";
  }
  else if (strNationCode == ("33")) {
    return "羌";
  }
  else if (strNationCode == ("34")) {
    return "布朗";
  }
  else if (strNationCode == ("35")) {
    return "撒拉";
  }
  else if (strNationCode == ("36")) {
    return "毛南";
  }
  else if (strNationCode == ("37")) {
    return "仡佬";
  }
  else if (strNationCode == ("38")) {
    return "锡伯";
  }
  else if (strNationCode == ("39")) {
    return "阿昌";
  }
  else if (strNationCode == ("40")) {
    return "普米";
  }
  else if (strNationCode == ("41")) {
    return "塔吉克";
  }
  else if (strNationCode == ("42")) {
    return "怒";
  }
  else if (strNationCode == ("43")) {
    return "乌孜别克";
  }
  else if (strNationCode == ("44")) {
    return "俄罗斯";
  }
  else if (strNationCode == ("45")) {
    return "鄂温克";
  }
  else if (strNationCode == ("46")) {
    return "德昂";
  }
  else if (strNationCode == ("47")) {
    return "保安";
  }
  else if (strNationCode == ("48")) {
    return "裕固";
  }
  else if (strNationCode == ("49")) {
    return "京";
  }
  else if (strNationCode == ("50")) {
    return "塔塔尔";
  }
  else if (strNationCode == ("51")) {
    return "独龙";
  }
  else if (strNationCode == ("52")) {
    return "鄂伦春";
  }
  else if (strNationCode == ("53")) {
    return "赫哲";
  }
  else if (strNationCode == ("54")) {
    return "门巴";
  }
  else if (strNationCode == ("55")) {
    return "珞巴";
  }
  else if (strNationCode == ("56")) {
    return "基诺";
  }
  else if (strNationCode == ("97")) {
    return "其他";
  }
  else if (strNationCode == ("98")) {
    return "外国血统中国籍人士";
  }

  return "未知";
}


module.exports = {
  formatTime: formatTime,
  uint8ArrayToStr: uint8ArrayToStr,
  stringToArrayBuffer: stringToArrayBuffer,
  getSexFromCode: getSexFromCode,
  getNationFromCode: getNationFromCode
}
