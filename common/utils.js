// 拍照
const camera = function(arr, camera) {
	let flag = false;
	arr.forEach(item => {
		if (item.name == '是否显示摄像') {
			flag = (item.value == '是')
		}
	})
	return flag
}

const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()

	return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

// 病例来源
const sourceOfCases = [{
		value: '1',
		label: '健康档案'
	},
	{
		value: '2',
		label: '首诊测压'
	},
	{
		value: '3',
		label: '社区门诊'
	}
]
// 民族
const nation = [{
		value: "01",
		label: "汉族"
	},
	{
		value: "02",
		label: "蒙古族"
	},
	{
		value: "03",
		label: "回族"
	},
	{
		value: "04",
		label: "藏族"
	},
	{
		value: "05",
		label: "维吾尔族"
	},
	{
		value: "06",
		label: "苗族"
	},
	{
		value: "07",
		label: "彝族"
	},
	{
		value: "08",
		label: "壮族"
	},
	{
		value: "09",
		label: "布依族"
	},
	{
		value: "10",
		label: "朝鲜族"
	},
	{
		value: "11",
		label: "满族"
	},
	{
		value: "12",
		label: "侗族"
	},
	{
		value: "13",
		label: "瑶族"
	},
	{
		value: "14",
		label: "白族"
	},
	{
		value: "15",
		label: "土家族"
	},
	{
		value: "16",
		label: "哈尼族"
	},
	{
		value: "17",
		label: "哈萨克族"
	},
	{
		value: "18",
		label: "傣族"
	},
	{
		value: "19",
		label: "黎族"
	},
	{
		value: "20",
		label: "傈僳族"
	},
	{
		value: "21",
		label: "佤族"
	},
	{
		value: "22",
		label: "畲族"
	},
	{
		value: "23",
		label: "高山族"
	},
	{
		value: "24",
		label: "拉祜族"
	},
	{
		value: "25",
		label: "水族"
	},
	{
		value: "26",
		label: "东乡族"
	},
	{
		value: "27",
		label: "纳西族"
	},
	{
		value: "28",
		label: "景颇族"
	},
	{
		value: "29",
		label: "柯尔克孜族"
	},
	{
		value: "30",
		label: "土族"
	},
	{
		value: "31",
		label: "达斡尔族"
	},
	{
		value: "32",
		label: "仫佬族"
	},
	{
		value: "33",
		label: "羌族"
	},
	{
		value: "34",
		label: "布朗族"
	},
	{
		value: "35",
		label: "撒拉族"
	},
	{
		value: "36",
		label: "毛难族"
	},
	{
		value: "37",
		label: "仡佬族"
	},
	{
		value: "38",
		label: "锡伯族"
	},
	{
		value: "39",
		label: "阿昌族"
	},
	{
		value: "40",
		label: "普米族"
	},
	{
		value: "41",
		label: "塔吉克族"
	},
	{
		value: "42",
		label: "怒族"
	},
	{
		value: "43",
		label: "乌孜别克族"
	},
	{
		value: "44",
		label: "俄罗斯族"
	},
	{
		value: "45",
		label: "鄂温克族"
	},
	{
		value: "46",
		label: "崩龙族"
	},
	{
		value: "47",
		label: "保安族"
	},
	{
		value: "48",
		label: "裕固族"
	},
	{
		value: "49",
		label: "京族"
	},
	{
		value: "50",
		label: "塔塔尔族"
	},
	{
		value: "51",
		label: "独龙族"
	},
	{
		value: "52",
		label: "鄂伦春族"
	},
	{
		value: "53",
		label: "赫哲族"
	},
	{
		value: "54",
		label: "门巴族"
	},
	{
		value: "55",
		label: "珞巴族"
	},
	{
		value: "56",
		label: "基诺族"
	}
]
// 性别
const gender = [{
		value: '1',
		label: '男'
	},
	{
		value: '2',
		label: '女'
	},
	{
		value: '3',
		label: '未说明的性别'
	},
	{
		value: '4',
		label: '未知的性别'
	}
]
// 吸烟 select
const smokeSelect = [{
		value: '1',
		label: '是，几乎每天或大多数天吸烟'
	},
	{
		value: '2',
		label: '是，偶尔吸烟'
	},
	{
		value: '3',
		label: '否，已戒烟'
	},
	{
		value: '4',
		label: '否，从不吸烟'
	}
]
// 是 & 否
const yesOrNo = [{
		value: '1',
		label: '是'
	},
	{
		value: '2',
		label: '否'
	}
]
// 行为 (良好，一般，差)
const behavior = [{
		value: '1',
		label: '良好'
	},
	{
		value: '2',
		label: '一般'
	},
	{
		value: '3',
		label: '差'
	}
]
// 等级 (轻，中，重)
const grade = [{
		value: '1',
		label: '轻'
	},
	{
		value: '2',
		label: '中'
	},
	{
		value: '3',
		label: '重'
	}
]
// 随访方式 select
const followUpMode = [{
		value: '1',
		label: '门诊'
	},
	{
		value: '2',
		label: '家庭'
	},
	{
		value: '3',
		label: '电话'
	}
]
// 掌握情况 select
const masterTheSituation = [{
		value: '1',
		label: '掌握'
	},
	{
		value: '2',
		label: '未掌握'
	}
]
// 督导人员选择 select
const supervisorySelection = [{
		value: '1',
		label: '医生'
	},
	{
		value: '2',
		label: '家属'
	},
	{
		value: '3',
		label: '自服药'
	},
	{
		value: '4',
		label: '其他'
	}
]
// 用法 select
const medicationSelect = [{
		value: '1',
		label: '每日'
	},
	{
		value: '2',
		label: '间歇'
	}
]

// 无 有 select
const separateRoom = [{
		value: '1',
		label: '无'
	},
	{
		value: '2',
		label: '有'
	}
]
// 此次随访分类 select
const classificationThisFollowUp = [{
		value: '1',
		label: '控制满意'
	},
	{
		value: '2',
		label: '控制不满意'
	},
	{
		value: '3',
		label: '不良反应'
	},
	{
		value: '4',
		label: '并发症'
	}
]
// 以下为添加用药选项
// 用法
const usage = [{
		value: '1',
		label: '口服'
	},
	{
		value: '2',
		label: '外敷'
	},
	{
		value: '3',
		label: '皮下注射'
	}
]
// 用药频次
const drugUseFrequency = [{
		value: '1',
		label: '每日一次'
	},
	{
		value: '2',
		label: '每日两次'
	},
	{
		value: '3',
		label: '每日三次'
	},
	{
		value: '4',
		label: '隔日一次'
	},
	{
		value: '5',
		label: '每周一次'
	},
	{
		value: '6',
		label: '每周两次'
	},
	{
		value: '7',
		label: '每周三次'
	},
	{
		value: '8',
		label: '隔周一次'
	},
	{
		value: '9',
		label: '每两周一次'
	},
	{
		value: '10',
		label: '每三周一次'
	},
	{
		value: '11',
		label: '每四周一次'
	}
]
// 用量
const dosage = [{
		value: '1',
		label: '2'
	},
	{
		value: '2',
		label: '3'
	},
	{
		value: '3',
		label: '4'
	}
]
// 单位
const unit = [{
		value: '1',
		label: 'mg'
	},
	{
		value: '2',
		label: 'ml'
	},
	{
		value: '3',
		label: '粒'
	},
	{
		value: '4',
		label: '片'
	}
]
// 健康体检减体重限制
const tzxz = [{
		value: '1',
		label: '开启'
	},
	{
		value: '2',
		label: '关闭'
	}
]
// 体检中血压默认左右手
const mrzys = [{
		value: '1',
		label: '左侧'
	},
	{
		value: '2',
		label: '右侧'
	}
]
// 高血压随访中用药情况及用药指导版本
const yyzdbb = [{
		value: '1',
		label: '国家版'
	},
	{
		value: '2',
		label: '云南版'
	},
	{
		value: '3',
		label: '广西版'
	}
]
// 腰围计算公式
const ywjsgs = [{
		value: '1',
		label: '体脂指数*3.3'
	},
	{
		value: '2',
		label: '男性：身高（cm）÷2-11（cm）女性：身高（cm）÷2-13（cm）'
	}
]
// 精神病随访中用药情况及用药指导版本 & 精神病随访中转诊版本
const jsbbb = [{
		value: '1',
		label: '国家版'
	},
	{
		value: '2',
		label: '云南版'
	}
]
// 精神病随访是否显示本次随访对象
const bcsfdx = [{
		value: '1',
		label: '显示'
	},
	{
		value: '2',
		label: '不显示'
	}
]
export default {
	camera,
	sourceOfCases,
	nation,
	gender,
	smokeSelect,
	yesOrNo,
	behavior,
	grade,
	followUpMode,
	masterTheSituation,
	supervisorySelection,
	medicationSelect,
	separateRoom,
	classificationThisFollowUp,
	usage,
	drugUseFrequency,
	dosage,
	unit,
	tzxz,
	mrzys,
	yyzdbb,
	ywjsgs,
	jsbbb,
	bcsfdx,
	formatTime
}
