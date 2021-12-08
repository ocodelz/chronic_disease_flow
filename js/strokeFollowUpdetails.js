// 脑卒中随访详细信息
import utils from '@/common/utils.js';
const strokeFollowUpdetails = [
	{
		name: '随访日期',
		disabled: true,
		placeholder: '请选择',
		model: utils.formatTime(new Date),
		required: '\ue635',
		isRequired: true,
		select: '\ue65a',
		key: 'follow_time'
	},
	{
		name: '随访方式',
		disabled: true,
		placeholder: '请选择',
		model: '',
		required: '\ue635',
		isRequired: true,
		select: '\ue65a',
		key: 'follow_method'
	},
	{
		name: '脑卒中类型',
		disabled: true,
		placeholder: '请选择',
		model: '',
		select: '\ue65a',
		key: 'cerebral_type'
	},
	{
		name: '脑卒中部位',
		disabled: true,
		placeholder: '请选择',
		model: '',
		required: '\ue635',
		select: '\ue65a',
		key: 'cerebral_part',
		isRequired: true
	},
	{
		name: '症状',
		checkbox:[
			{
				name: '无症状',
				checked: false,
				disabled: false
			},
			{
				name: '嘴、眼歪斜',
				checked: false,
				disabled: false
			},
			{
				name: '半身不遂',
				checked: false,
				disabled: false
			},
			{
				name: '舌强言蹇',
				checked: false,
				disabled: false
			},
			{
				name: '智力障碍',
				checked: false,
				disabled: false
			},
			{
				name: '其他症状',
				checked: false,
				disabled: false,
				model: ''
			}
		]
	},
	{
		name: '个人病史',
		checkbox:[
			{
				name: '冠心病',
				checked: false,
				disabled: false
			},
			{
				name: '高血压',
				checked: false,
				disabled: false
			},
			{
				name: '高脂血症',
				checked: false,
				disabled: false
			},
			{
				name: '糖尿病',
				checked: false,
				disabled: false
			},
			{
				name: '无',
				checked: false,
				disabled: false
			}
		]
	},
	{
		name: '脑卒中并发症情况',
		checkbox:[
			{
				name: '无症状',
				checked: false,
				disabled: false
			},
			{
				name: '褥疮',
				checked: false,
				disabled: false
			},
			{
				name: '呼吸道感染',
				checked: false,
				disabled: false
			},
			{
				name: '尿道感染',
				checked: false,
				disabled: false
			},
			{
				name: '沁深静脉炎',
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
		name: '新发卒中症状',
		checkbox:[
			{
				name: '无症状',
				checked: false,
				disabled: false
			},
			{
				name: '构音障碍',
				checked: false,
				disabled: false
			},
			{
				name: '失语',
				checked: false,
				disabled: false
			},
			{
				name: '面瘫',
				checked: false,
				disabled: false
			},
			{
				name: '感觉障碍',
				checked: false,
				disabled: false
			},
			{
				name: '左侧肢体瘫痪',
				checked: false,
				disabled: false
			},
			{
				name: '共济失调',
				checked: false,
				disabled: false
			},
			{
				name: '昏迷',
				checked: false,
				disabled: false
			},
			{
				name: '右侧肢体瘫痪',
				checked: false,
				disabled: false
			},
			{
				name: '头疼',
				checked: false,
				disabled: false
			},
			{
				name: '呕吐',
				checked: false,
				disabled: false
			},
			{
				name: '意识障碍',
				checked: false,
				disabled: false
			},
			{
				name: '眩晕',
				checked: false,
				disabled: false
			},
			{
				name: '癫痫',
				checked: false,
				disabled: false
			}
		]
	},
	{
		name: '其他新发卒中症状',
		model: '',
		key: 'other_xfczzz'
	}
]
// 生活行为
const lifeBehavior = [
	{
		name: '日吸烟量',
		one: '',
		onekey: 'day_smoke1',
		two: '',
		twokey: 'day_smoke2',
		company: '支'
	},
	{
		name: '日饮酒量',
		one: '',
		onekey: 'day_drink1',
		two: '',
		twokey: 'day_drink2',
		company: '两'
	},
	{
		name: '运动频率',
		one: '',
		onekey: 'current_sport_frequency',
		two: '',
		twokey: 'target_sport_frequency',
		company: '次/周'
	},
	{
		name: '运动时长',
		one: '',
		onekey: 'current_sport_time',
		two: '',
		twokey: 'target_sport_time',
		company: '分钟/次'
	}
]
// 体验结果
const experienceResults = [
	{
		name: '身高',
		one: '',
		onekey: 'height',
		company: 'cm',
		icon: '...',
		status: '端口"COM112"不存在。'
	},
	{
		name: '体重',
		one: '',
		onekey: 'weight1',
		two: '',
		twokey: 'weight2',
		company: 'kg',
		icon: '...',
		status: '端口"COM44"不存在。'
	},
	{
		name: '腰围',
		one: '',
		onekey: 'waist'
	},
	{
		name: '体质指数',
		one: '',
		onekey: 'weight_num1',
		two: '',
		twokey: 'weight_num2',
		company: 'kg/㎡'
	},
	{
		name: '血压',
		one: '',
		onekey: 'blood_pressure1',
		two: '',
		twokey: 'blood_pressure2',
		company: 'mmHg',
		icon: '...',
		status: '端口"COM4"不存在。',
		state: 1
	},
	{
		name: '空腹血糖',
		one: '',
		onekey: 'empty_xuetang',
		company: 'mmol/L',
		icon: '...',
		status: '端口"COM10"不存在。'
	},
	{
		name: '其他',
		one: '',
		onekey: 'other'
	}
]
// 服用何种药物防治
const ywfz = {
	name: '服用何种药物防治',
	model: '',
	key: 'drug'
}
// 生活方式指导
const lifestyleGuidance = [
	{
		name: '饮酒注意事项',
		model: '',
		key: 'drink_notice'
	},
	{
		name: '运动注意事项',
		model: '',
		key: 'sport_notice'
	},
	{
		name: '摄盐注意事项',
		model: '',
		key: 'salt_notice'
	},
	{
		name: '心理调整',
		model: '',
		placeholder: '请选择',
		disabled: true,
		select: '\ue65a',
		key: 'mentally'
	},
	{
		name: '遵医行为',
		model: '',
		placeholder: '请选择',
		disabled: true,
		select: '\ue65a',
		key: 'zunyixingwei'
	}
]
// 辅助检查
const fzjc = {
	name: '辅助检测',
	model: '',
	key: 'fuzhujiancha'
}
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
		list: [
			{
				name: '服药依从性',
				select: '\ue65a',
				disabled: true,
				placeholder: '请选择',
				model: '',
				key: 'compliance_drug'
			},
			{
				name: '药物不良反应',
				select: '\ue65a',
				disabled: true,
				placeholder: '请选择',
				model: '',
				key: 'drug_reactions'
			},
			{
				name: '生活能力是否自理',
				select: '\ue65a',
				disabled: true,
				placeholder: '请选择',
				model: '',
				key: 'is_self_care'
			},
			{
				name: '康复治疗方式',
				select: '\ue65a',
				disabled: true,
				placeholder: '请选择',
				model: '',
				key: 'rehabilitation_treatment'
			},
			{
				name: '肢体恢复情况',
				select: '\ue65a',
				disabled: true,
				placeholder: '请选择',
				model: '',
				key: 'zthfqk'
			},
			{
				name: '此次随访分类',
				select: '\ue65a',
				disabled: true,
				placeholder: '请选择',
				model: '',
				key: 'follow_type'
			},
			{
				name: '此次随访建议',
				model: '',
				key: 'follow_proposal'
			}
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
		disabled: true,
		key: 'next_follow_time',
		required: '\ue635',
		select: '\ue65a',
		placeholder: '请选择',
		isRequired: true
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
// 脑卒中类型 select
const typeOfStroke = [
	{
		value: '1',
		label: '蛛网膜下腔出血'
	},
	{
		value: '2',
		label: '脑出血'
	},
	{
		value: '3',
		label: '脑血栓形成'
	},
	{
		value: '4',
		label: '脑栓塞'
	},
	{
		value: '5',
		label: '脑隙性梗死'
	},
	{
		value: '6',
		label: '分水岭脑梗死'
	},
	{
		value: '7',
		label: '未分类脑卒中'
	}
]
// 脑卒中部位 select
const locationOfStroke = [
	{
		value: '1',
		label:'大脑半球左侧'
	},
	{
		value: '2',
		label:'大脑半球右侧'
	},
	{
		value: '3',
		label:'脑干'
	},
	{
		value: '4',
		label:'小脑'
	},
	{
		value: '5',
		label:'不确定'
	}
]
// 服药依从性 select
const medicationCompliance = [
	{
		value: '1',
		label:'规律'
	},
	{
		value: '2',
		label:'间断'
	},
	{
		value: '3',
		label:'不服药'
	}
]
// 生活能力是否自理 select
const shnlzl = [
	{
		value: '1',
		label:'完全自理'
	},
	{
		value: '2',
		label:'部分自理'
	},
	{
		value: '3',
		label:'完全不能自理'
	}
]
// 康复治疗方式 select
 const rehabilitationTreatmentMode = [
	 {
	 	value: '1',
	 	label:'无'
	 },
	 {
	 	value: '2',
	 	label:'按摩'
	 },
	 {
	 	value: '3',
	 	label:'针灸'
	 },
	 {
	 	value: '4',
	 	label:'运动训练'
	 },
	 {
	 	value: '5',
	 	label:'其他方式'
	 }
 ]
export default {
	strokeFollowUpdetails,
	lifeBehavior,
	experienceResults,
	ywfz,
	lifestyleGuidance,
	fzjc,
	medication,
	zz,
	typeOfStroke,
	locationOfStroke,
	medicationCompliance,
	shnlzl,
	rehabilitationTreatmentMode
}