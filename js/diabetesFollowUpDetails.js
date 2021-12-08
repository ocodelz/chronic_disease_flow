// 糖尿病患者随访详细信息
import utils from '@/common/utils.js';
// 随访日期 & 随访方式 & 症状
const diabetesFollowUpDetails = [{
		list: [{
				model: utils.formatTime(new Date),
				name: '随访日期',
				placeholder: '请选择',
				type: 'select',
				key: 'follow_time',
				select: '\ue65a',
				requiredIcon: '\ue635',
				disabled: true,
				required: true
			},
			{
				model: '',
				name: '随访方式',
				placeholder: '请选择',
				type: 'select',
				key: 'follow_method',
				select: '\ue65a',
				requiredIcon: '\ue635',
				disabled: true,
				required: true
			}
		]
	},
	{
		title: '症状',
		checkbox: [{
				name: '无症状',
				key: '',
				checked: false
			},
			{
				name: '多饮',
				key: '',
				checked: false
			},
			{
				name: '多食',
				key: '',
				checked: false
			},
			{
				name: '多尿',
				key: '',
				checked: false
			},
			{
				name: '视力模糊',
				key: '',
				checked: false
			},
			{
				name: '感染',
				key: '',
				checked: false
			},
			{
				name: '手脚麻不',
				key: '',
				checked: false
			},
			{
				name: '下肢浮肿',
				key: '',
				checked: false
			},
			{
				name: '体重明显下降',
				key: '',
				checked: false
			},
			{
				name: '其他',
				key: '',
				checked: false,
				model: ''
			}
		]
	}
]
// 体征
const sign = [{
		name: '血压',
		one: '',
		two: '',
		keyone: 'blood_pressure1',
		keytwo: 'blood_pressure2',
		company: 'mmhg',
		icon: '...',
		status: '连接成功...',
		type: 'text',
		state: 1
	},
	{
		name: '体重',
		one: '',
		two: '',
		keyone: 'weight1',
		keytwo: 'weight2',
		company: 'kg',
		icon: '...',
		status: '端口"COM44"不存在。',
		type: 'text',
		state: 0
	},
	{
		name: '身高',
		one: '',
		two: '',
		keyone: 'height1',
		keytwo: 'height2',
		company: 'cm',
		icon: '...',
		status: '端口"COM112"不存在。',
		type: 'text',
		state: 0
	},
	{
		name: '体质指数',
		one: '',
		two: '',
		keyone: 'weight_num1',
		keytwo: 'weight_num2',
		company: 'kg/m²',
		type: 'text',
		state: 0
	},
	{
		name: '足背动脉搏动',
		one: '',
		keyone: 'zbdmbd',
		type: 'select',
		disabled: true,
		placeholder: '请选择',
		state: 0
	},
	{
		name: '其他',
		one: '',
		keyone: 'other',
		type: 'text',
		state: 0
	}
]
// 生活方式指导
const lifestyleGuidance = [{
		name: '日吸烟量',
		one: '',
		two: '',
		keyone: 'day_smoke1',
		keytwo: 'day_smoke2',
		company: '支',
		type: 'text',
		// state: 0
	},
	{
		name: '日饮酒量',
		one: '',
		two: '',
		keyone: 'day_drink1',
		keytwo: 'day_drink2',
		company: '两',
		type: 'text',
		// state: 0
	},
	{
		name: '目前运动频率',
		one: '',
		keyone: 'current_sport_frequency',
		company: '次/周',
		type: 'text'
	},
	{
		name: '目前运动时长',
		one: '',
		keyone: 'current_sport_time',
		company: '分钟/次',
		type: 'text'
	},
	{
		name: '目标运动频率',
		one: '',
		keyone: 'target_sport_frequency',
		company: '次/周',
		type: 'text'
	},
	{
		name: '目标运动时长',
		one: '',
		keyone: 'target_sport_time',
		company: '分钟/次',
		type: 'text'
	},
	{
		name: '主食',
		one: '',
		two: '',
		keyone: 'food1',
		keytwo: 'food2',
		company: '克/天',
		type: 'text',
		state: 0
	},
	{
		name: '心理调整',
		one: '',
		keyone: 'mentally',
		placeholder: '请选择',
		select: '\ue65a',
		type: 'select',
		disabled: true
	},
	{
		name: '遵医行为',
		one: '',
		keyone: 'zunyixingwei',
		placeholder: '请选择',
		select: '\ue65a',
		type: 'select',
		disabled: true
	}
]
// 辅助检查
const fzjc = [{
		name: '空腹血糖值',
		model: '',
		key: 'empty_xuetang',
		company: 'mmol/L',
		icon: '...',
		status: '等待设备连接中...',
	},
	{
		name: '糖化血红蛋白',
		model: '',
		key: 'tanghuaxhdb',
		company: '%',
	},
	{
		name: '检查日期',
		model: '',
		key: 'check_time'
	},
	{
		name: '其他检查',
		model: '',
		key: 'other_check'
	}
]
// 目前用药情况
const mqyy = [{
	drug_name: '',
	day_count: '',
	every_time_dosage: '',
	unit: '',
	icon: '\ue718',
	medicId: ''
}]
// 
const list = [{
		name: '胰岛素种类',
		model: '',
		key: 'insulin_type',
		placeholder: '请输入',
		type: 'text',
		disabled: false
	},
	{
		name: '胰岛素用法',
		model: '',
		key: 'insulin_usage',
		select: '\ue65a',
		placeholder: '请输入',
		type: 'text',
		disabled: false
	},
	{
		name: '胰岛素用量',
		model: '',
		key: 'insulin_dosage',
		select: '\ue65a',
		placeholder: '请输入',
		type: 'text',
		disabled: false,
	},
	{
		name: '服药依从性',
		model: '',
		key: 'drug_status',
		select: '\ue65a',
		placeholder: '请选择',
		type: 'select',
		disabled: true,
		state: 0
	},
	{
		name: '药物不良反应',
		model: '',
		key: 'bad_reaction',
		select: '\ue65a',
		placeholder: '请选择',
		type: 'select',
		disabled: true,
		state: 0
	},
	{
		name: '低血糖反应',
		model: '',
		key: 'low_xuetang',
		select: '\ue65a',
		placeholder: '请选择',
		type: 'select',
		disabled: true,
		state: 0
	},
	{
		name: '此次随访分类',
		model: '',
		key: 'follow_type',
		select: '\ue65a',
		placeholder: '请选择',
		type: 'select',
		disabled: true,
		state: 0
	},
	{
		name: '下一步管理措施',
		model: '',
		key: 'next_mgr_measure',
		select: '\ue65a',
		placeholder: '请选择',
		type: 'select',
		disabled: true,
		state: 1
	},
]
// 调整用药意见
const tzyy = [{
		items: [{
			drug_name: '',
			day_count: '',
			every_time_dosage: '',
			unit: '',
			icon: '\ue718',
			medicId: ''
		}]
	},
	{
		list: [{
				name: '胰岛素种类',
				model: '',
				key: 'insulin_type1'
			},
			{
				name: '胰岛素用法和用量',
				model: '',
				key: 'insulin_usage1'
			}
		]
	}
]
// 转诊
const zz = [{
		name: '原因',
		placeholder: '请输入',
		type: 'text',
		disabled: false,
		model: '',
		key: 'referral_reason'
	},
	{
		name: '机构及科别',
		placeholder: '请输入',
		type: 'text',
		disabled: false,
		model: '',
		key: 'jg_jb'
	},
	{
		name: '联系人及电话',
		placeholder: '请输入',
		type: 'text',
		disabled: false,
		model: '',
		key: 'linkman_tel'
	},
	{
		name: '结果',
		placeholder: '请选择',
		type: 'select',
		disabled: true,
		model: '',
		key: 'referral_result'
	},
	{
		name: '下次随访日期',
		placeholder: '请选择',
		type: 'select',
		disabled: true,
		model: '',
		key: 'next_follow_time',
		required: '\ue635',
		isRequired: true
	},
	{
		name: '随访医生签名',
		placeholder: '请输入',
		type: 'text',
		disabled: false,
		model: '',
		key: 'follow_doctor_name',
		required: '\ue635',
		autograph: '\ue6a4',
		isRequired: true
	},
	{
		name: '居民签名',
		placeholder: '请输入',
		type: 'text',
		disabled: false,
		model: '',
		key: 'person_name',
		autograph: '\ue6a4'
	},
	{
		name: '备注',
		placeholder: '请输入',
		type: 'text',
		disabled: false,
		model: '',
		key: 'memo',
		autograph: ''
	}
]
// select 足背动脉搏动
const dorsalisPedisArteryPulsation = [{
		value: '1',
		label: '触及正常'
	},
	{
		value: '2',
		label: '减弱双侧'
	},
	{
		value: '3',
		label: '减弱左侧'
	},
	{
		value: '4',
		label: '减弱右侧'
	},
	{
		value: '5',
		label: '消失双侧'
	},
	{
		value: '6',
		label: '消失左侧'
	},
	{
		value: '7',
		label: '消失右侧'
	}
]
// select 服药依从性
const medicationCompliance = [{
		value: '1',
		label: '规律'
	},
	{
		value: '2',
		label: '间断'
	},
	{
		value: '3',
		label: '不服药'
	}
]
// select 药物不良反应
const adverseDrugReactions = [{
		value: '1',
		label: '无'
	},
	{
		value: '2',
		label: '有'
	}
]
// select 低血糖反应
const hypoglycemicReaction = [{
		value: '1',
		label: '无'
	},
	{
		value: '2',
		label: '偶尔'
	},
	{
		value: '3',
		label: '频繁'
	}
]
// select 下一步管理措施
const nextStepManagementMeasures = [{
		value: '1',
		label: '常规随访'
	},
	{
		value: '2',
		label: '第1次控制不满意2周随访'
	},
	{
		value: '3',
		label: '两次控制不满意转诊随访'
	},
	{
		value: '4',
		label: '紧急转诊'
	}
]
// select 此次随访分类
const ccsffl = [{
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
// select 结果
const result = [{
		value: '1',
		label: '到位'
	},
	{
		value: '2',
		label: '不到位'
	},
]
export default {
	diabetesFollowUpDetails,
	sign,
	lifestyleGuidance,
	fzjc,
	mqyy,
	list,
	tzyy,
	zz,
	dorsalisPedisArteryPulsation,
	medicationCompliance,
	adverseDrugReactions,
	hypoglycemicReaction,
	nextStepManagementMeasures,
	ccsffl,
	result
}
