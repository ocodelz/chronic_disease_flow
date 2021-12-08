// 随访日期 & 症状
import utils from '@/common/utils.js';
const hypertensionFollowUpDetails = [
	{
		name: '随访日期',
		model: utils.formatTime(new Date),
		type: 'select',
		key: 'follow_time',
		required: true,
		placeholder: '请选择',
		disabled: true
	},
	{
		name: '随访方式',
		model: '',
		type: 'select',
		key: 'follow_method',
		required: true,
		placeholder: '请选择',
		disabled: true
	},
	{
		title: '症状',
		checkbox: [{
				value: '',
				name: '无症状',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '头痛头晕',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '恶心呕吐',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '眼花耳鸣',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '呼吸困难',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '心悸胸闷',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '鼻衄出血不止',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '四肢发麻',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '下肢水肿',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '其他',
				disabled: false,
				checked: false,
				model: ''
			}
		]
	}
]
// 体征
const sign = [{
		name: '血压',
		model: '',
		mode1: '',
		type: 'text',
		key: 'blood_pressure1',
		keys: 'blood_pressure2',
		company: 'mmHg',
		required: false,
		icon: '...',
		connectionStatus: '连接成功...',
		placeholder: '请输入',
		state: 0
	},
	{
		name: '体重',
		model: '',
		mode1: '',
		type: 'text',
		key: 'weight1',
		keys: 'weight2',
		company: 'kg',
		required: false,
		// icon: '...',
		connectionStatus: '端口"COM44"不存在。',
		placeholder: '请输入',
		state: 1
	},
	{
		name: '身高',
		model: '',
		mode1: '',
		type: 'text',
		key: 'height1',
		keys: 'height2',
		company: 'cm',
		required: false,
		// icon: '...',
		connectionStatus: '连接成功...',
		placeholder: '请输入',
		state: 1
	},
	{
		name: '体质指数',
		model: '',
		mode1: '',
		type: 'text',
		key: 'weight_num1',
		keys: 'weight_num2',
		company: 'kg/㎡',
		required: false,
		icon: '',
		connectionStatus: '',
		placeholder: '请输入',
		state: 1
	},
	{
		name: '心率',
		model: '',
		mode1: '',
		type: 'text',
		key: 'heart_rate1',
		keys: 'heart_rate2',
		company: '',
		required: false,
		icon: '',
		connectionStatus: '',
		placeholder: '请输入',
		state: 1
	},
	{
		name: '腰围',
		model: '',
		type: 'text',
		key: 'waist',
		company: 'cm',
		required: false,
		icon: '',
		connectionStatus: '',
		placeholder: '请输入',
		state: 1
	},
	{
		name: '其他',
		model: '',
		type: 'text',
		key: 'other',
		company: '',
		required: false,
		icon: '',
		connectionStatus: '',
		placeholder: '请输入',
		state: 1
	}
]
// 生活方式指导
const lifestyleGuidance = [{
		name: '目前是否正在吸烟',
		model: '',
		type: 'select',
		key: 'is_smoke',
		required: false,
		placeholder: '请选择',
		disabled: true
	},
	{
		name: '最近7天内是否吸烟了',
		model: '',
		type: 'select',
		key: 'smoke_seven',
		required: false,
		placeholder: '请选择',
		disabled: true
	},
	{
		name: '开始吸烟年龄',
		model: '',
		type: 'text',
		key: 'smoke_age',
		company:'岁',
		required: false,
		placeholder: '请输入',
		disabled: false
	},
	{
		name: '日吸烟量',
		model: '',
		mode1:'',
		type: 'text',
		key: 'day_smoke1',
		keys: 'day_smoke2',
		company:'支',
		// style:0,
		required: false,
		placeholder: '请输入',
		disabled: false
	},
	{
		name: '日饮酒量',
		model: '',
		mode1:'',
		type: 'text',
		key: 'day_drink1',
		keys: 'day_drink2',
		company:'两',
		// style:0,
		required: false,
		placeholder: '请输入',
		disabled: false
	},
	{
		name: '运动频率',
		model: '',
		mode1:'',
		type: 'text',
		key: 'sport_frequency1',
		keys: 'sport_frequency2',
		company:'次/周',
		// style:0,
		required: false,
		placeholder: '请输入',
		disabled: false
	},
	{
		name: '运动时长',
		model: '',
		mode1:'',
		type: 'text',
		key: 'sport_time1',
		keys: 'sport_time2',
		company:'分钟/次',
		// style:0,
		required: false,
		placeholder: '请输入',
		disabled: false
	},
	{
		name: '摄盐情况(咸淡)',
		model: '',
		mode1:'',
		type: 'select',
		key: 'current_salt1',
		keys: 'current_salt2',
		// style:0,
		required: false,
		placeholder: '请选择',
		disabled: true
	},
	{
		name: '心理调整',
		model: '',
		type: 'select',
		key: 'mentally',
		required: false,
		placeholder: '请选择',
		disabled: true
	},
	{
		name: '遵医行为',
		model: '',
		type: 'select',
		key: 'zunyixingwei',
		required: false,
		placeholder: '请选择',
		disabled: true
	}
]
// 辅助检查
const supplementaryExamination = [
	{
		value: '',
		name: '无',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '血常规',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '尿常规',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '血钾',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '血肌酐',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '血糖',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '血脂',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '心电图',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '辅助检查',
		disabled: false,
		checked: false,
		model: '',
		type:'text',
		key:'fuzhujiancha1'
	}
]
// 目前用药情况
const mqyy = [
	{
		items:[
			{
				drug_name:'',
				day_count:'',
				every_time_dosage:'',
				unit:'',
				icon:'\ue718',
				status:0,
				medicId: ''
			}
		],
		// state:0
	},
	{
		name: '服药依从性',
		model: '',
		type: 'select',
		key: 'compliance_drug',
		required: true,
		placeholder: '请选择',
		disabled: true,
		status:1
	},
	{
		name: '药物不良反应',
		model: '',
		type: 'select',
		key: 'drug_reactions',
		required: true,
		placeholder: '请选择',
		disabled: true,
		status:1
	},
	{
		name: '此次随访分类',
		model: '',
		type: 'select',
		key: 'follow_type',
		required: true,
		placeholder: '请选择',
		disabled: true,
		status:1
	},
	{
		name: '下一步管理措施',
		model: '',
		type: 'select',
		key: 'next_mgr_measure',
		required: true,
		placeholder: '请选择',
		disabled: true,
		status:1
	}
]
// 用药调整意见
const yytz = [
	{
		drug_name:'',
		day_count:'',
		every_time_dosage:'',
		unit:'',
		icon:'\ue718',
		state: 0,
		medicId: ''
	}
]
// 转诊
const referral = [
	{
		name: '是否转诊',
		model: '',
		type: 'select',
		key: 'is_referral',
		required: false,
		placeholder: '请选择',
		disabled: true
	},
	{
		name: '下次随访日期',
		model: '',
		type: 'select',
		key: 'next_follow_time',
		required: true,
		placeholder: '请选择',
		disabled: true
	},
	{
		name: '随访医生签名',
		model: '',
		type: 'text',
		key: 'follow_doctor_name',
		icon:'\ue6a4',
		required: true,
		placeholder: '请输入',
		
		disabled: false
	},
	{
		name: '居民签名',
		model: '',
		type: 'text',
		key: 'person_name',
		icon:'\ue6a4',
		required: false,
		placeholder: '请输入',
		disabled: false
	},
	{
		name: '备注',
		model: '',
		type: 'text',
		key: 'memo',
		required: false,
		placeholder: '请输入',
		disabled: false
	}
]
// 服药依从性
const medicationCompliance = [
	{
		value:'1',
		label:'过滤'
	},
	{
		value:'2',
		label:'间断'
	},
	{
		value:'3',
		label:'不服药'
	}
]
// 药物不良反应
const adverseDrugReactions = [
	{
		value:'1',
		label:'无'
	},
	{
		value:'2',
		label:'有'
	}
]
// 此次随访分类
const ccsffl = [
	{
		value:'1',
		label:'控制满意'
	},
	{
		value:'2',
		label:'控制不满意'
	},
	{
		value:'3',
		label:'不良反应'
	},
	{
		value:'4',
		label:'并发症'
	}
]
// 下一步管理措施
const nextStepManagementMeasures = [
	{
		value:'1',
		label:'常规随访'
	},
	{
		value:'2',
		label:'第1次控制不满意2周随访'
	},
	{
		value:'3',
		label:'两次控制不满意转诊随访'
	},
	{
		value:'4',
		label:'紧急转诊'
	}
]

export default{
	hypertensionFollowUpDetails,
	sign,
	lifestyleGuidance,
	supplementaryExamination,
	mqyy,
	yytz,
	referral,
	medicationCompliance,
	adverseDrugReactions,
	ccsffl,
	nextStepManagementMeasures
}