import utils from "@/common/utils.js";
// 冠心病随访详细信息
const gxb = [
	{
		name: '随访日期',
		model: utils.formatTime(new Date),
		placeholder: '请选择',
		type: 'select',
		select: '\ue65a',
		required: '\ue635',
		isRequired: true,
		disabled: true,
		key: 'follow_time'
	},
	{
		name: '随访方式',
		model: '',
		placeholder: '请选择',
		type: 'select',
		select: '\ue65a',
		required: '\ue635',
		isRequired: true,
		disabled: true,
		key: 'follow_method'
	},
	{
		name: '症状',
		checkbox: [
			{
				name: '无症状',
				checked: false,
				disabled: false
			},
			{
				name: '心慌',
				checked: false,
				disabled: false
			},
			{
				name: '胸口闷痛',
				checked: false,
				disabled: false
			},
			{
				name: '心绞痛',
				checked: false,
				disabled: false
			},
			{
				name: '呼吸困难',
				checked: false,
				disabled: false
			},
			{
				name: '心悸胸闷',
				checked: false,
				disabled: false
			},
			{
				name: '喘憋',
				checked: false,
				disabled: false
			},
			{
				name: '不能平卧',
				checked: false,
				disabled: false
			},
			{
				name: '下肢水肿',
				checked: false,
				disabled: false
			},
			{
				name: '其他',
				checked: false,
				disabled: false,
				model: ''
			}
		]
	},
	{
		name: '冠心病类型',
		model: '',
		placeholder: '请选择',
		type: 'select',
		select: '\ue65a',
		required: '',
		disabled: true,
		key: 'coronary_type'
	}
]
// 体征
const sign = [
	{
		name: '身高',
		one: '',
		onekey: 'height',
		unit: 'cm',
		icon: '...',
		status: '端口"COM112"不存在。',
		state: 0
	},
	{
		name: '体重',
		one: '',
		onekey: 'weight1',
		two: '',
		twokey: 'weight2',
		unit: 'kg',
		icon: '...',
		status: '端口"COM44"不存在。',
		state: 0
	},
	{
		name: '体质指数',
		one: '',
		onekey: 'weight_num1',
		two: '',
		twokey: 'weight_num2',
		unit: 'kg/㎡',
		icon: '',
		status: '',
		state: 0
	},
	{
		name: '空腹血糖',
		one: '',
		onekey: 'empty_xuetang',
		unit: 'mmol/L',
		icon: '...',
		status: '端口"COM10"不存在。',
		state: 0
	},
	{
		name: '心率',
		one: '',
		onekey: 'heart_rate1',
		two: '',
		twokey: 'heart_rate2',
		unit: '',
		icon: '',
		status: '次/分钟',
		state: 0
	},
	{
		name: '血压',
		one: '',
		onekey: 'blood_pressurel',
		two: '',
		twokey: 'blood_pressure2',
		unit: 'mmHg',
		icon: '...',
		status: '端口"COM4"不存在。',
		state: 1
	},
	{
		name: '其他',
		one: '',
		onekey: 'other',
		unit: '',
		state: 0
	}
]
// 生活方式指导
const lifestyleGuidance = [
	{
		name: '日吸烟量(支):',
		one: '',
		onekey: 'day_smoke1',
		two: '',
		twokey: 'day_smoke2',
		state: 0
	},
	{
		name: '日饮酒量(两):',
		one: '',
		onekey: 'day_drink1',
		two: '',
		twokey: 'day_drink2',
		state: 0
	},
	{
		name: '运动:',
		one: '',
		onekey: 'current_sport_frequency',
		two: '',
		twokey: 'current_sport_time',
		oneunit: '次/周',
		twounit: '分钟/次'
	},
	{
		name: '目标运动:',
		one: '',
		onekey: 'target_sport_frequency',
		two: '',
		twokey: 'target_sport_time',
		oneunit: '次/周',
		twounit: '分钟/次'
	},
	{
		name: '摄盐情况',
		one: '',
		onekey: 'salt_intake_gram',
		two: '',
		twokey: 'salt_intake_day',
		twounit: '克/天',
		state: 0
	},
	{
		name: '心理调整',
		one: '',
		onekey: 'mentally',
		placeholder: '请选择',
		disabled: true,
		select: '\ue65a',
		state: 0
	},
	{
		name: '遵医行为',
		one: '',
		onekey: 'zunyixingwei',
		placeholder: '请选择',
		disabled: true,
		select: '\ue65a',
		state: 0
	},
	{
		name: '辅助检查',
		one: '',
		onekey: 'fuzhujiancha',
		select: '',
		required: '\ue635',
		state: 0,
		isRequired: true
	},
	{
		name: '生活方式改变监测',
		checkbox:[
			{
				name: '限盐',
				disabled: false,
				checked: false
			},
			{
				name: '减少吸烟量或吸烟',
				disabled: false,
				checked: false
			},
			{
				name: '减少饮酒量或戒酒',
				disabled: false,
				checked: false
			},
			{
				name: '合理膳食',
				disabled: false,
				checked: false
			},
			{
				name: '减轻体重',
				disabled: false,
				checked: false
			},
			{
				name: '适量运动',
				disabled: false,
				checked: false
			},
			{
				name: '放松精神',
				disabled: false,
				checked: false
			},
			{
				name: '心理调整',
				disabled: false,
				checked: false
			},
			{
				name: '其他',
				disabled: false,
				checked: false,
				model: ''
			}
		]
	}
]
// 用药情况
const medication = [
	{
		items:[
			{
				drug_name: '',
				day_count: '',
				every_time_dosage: '',
				unit: '',
				status: 0,
				medicId: ''
			}
		]
	},
	{
		list:[
			{
				name: '用药方式',
				placeholder: '请选择',
				disabled: true,
				one: '',
				two: '',
				onekey: 'drug_method',
				twokey:'drug_methods',
				select: '\ue65a',
			},
			{
				name: '服药依从性',
				placeholder: '请选择',
				disabled: true,
				one: '',
				onekey: 'compliance_drug',
				select: '\ue65a',
			},
			{
				name: '药物不良反应',
				placeholder: '请选择',
				disabled: true,
				one: '',
				onekey: 'drug_reactions',
				select: '\ue65a',
			},
			{
				name: '特殊治疗',
				placeholder: '请选择',
				disabled: true,
				one: '',
				onekey: 'special_treatment',
				select: '\ue65a',
			},
			{
				name: '此次随访分类',
				placeholder: '请选择',
				disabled: true,
				one: '',
				onekey: 'follow_type',
				select: '\ue65a',
			},
		]
	}
]
// 转诊
const zz = [
	{
		name: '原因',
		model: '',
		key: 'referral_reason'
	},
	{
		name: '机构及科别',
		model: '',
		key: 'jg_jb'
	},
	{
		name: '下次随访日期',
		model: '',
		key: 'next_follow_time',
		select: '\ue65a',
		required: '\ue635',
		isRequired: true,
		disabled: true
	},
	{
		name: '随访医生',
		model: '',
		key: 'follow_doctor_name',
		required: '\ue635',
		icon: '\ue6a4',
		isRequired: true
	}
]
// 冠心病类型 select
const gxbType = [
	{
		value:'1',
		label:'稳定型心绞痛'
	},
	{
		value:'2',
		label:'不稳定型心绞痛'
	},
	{
		value:'3',
		label:'急性心肌梗死'
	},
	{
		value:'4',
		label:'陈旧性心肌梗死'
	},
	{
		value:'5',
		label:'猝死型'
	},
	{
		value:'6',
		label:'其他不稳定类型'
	}
]
// 用药方式 select
const medicationMode = [
	{
		value:'1',
		label:'单药治疗'
	},
	{
		value:'2',
		label:'联合用药'
	},
	{
		value:'3',
		label:'药物治疗有效，坚持用药'
	},
	{
		value:'4',
		label:'效果不佳，到综合医院调整治疗方案'
	},
	{
		value:'5',
		label:'其他'
	}
]
// 服药依从性 select
const medicationCompliance = [
	{
		value:'1',
		label:'规律'
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
const ddverseDrugReactions = [
	{
		value:'1',
		label:'无'
	},
	{
		value:'2',
		label:'有'
	}
]
// 特殊治疗 select
const specialTreatment = [
	{
		value:'1',
		label:'无'
	},
	{
		value:'2',
		label:'外科手术治疗'
	},
	{
		value:'3',
		label:'介入治疗'
	},
	{
		value:'4',
		label:'起搏器'
	}
]
export default {
	gxb,
	sign,
	lifestyleGuidance,
	medication,
	zz,
	gxbType,
	medicationMode,
	medicationCompliance,
	ddverseDrugReactions,
	specialTreatment
}
