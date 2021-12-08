// 首诊日期 & 既往史
import utils from '@/common/utils.js';
const firstDiagnosisOfHypertension = [{
		name: '首诊日期',
		model: utils.formatTime(new Date),
		type: 'select',
		key: '',
		required: true,
		placeholder: '请选择',
		disabled: true
	},
	{
		title: '既往史',
		checkbox: [{
				value: '',
				name: '无',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '高血压病',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '糖尿病',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '冠心病',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '心绞痛',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '心肌梗死',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '冠脉介入（支架) 术后',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '冠脉搭桥手术后',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '心力衰竭',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '脑卒中未分类',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '缺血性脑卒中',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '出血性脑卒中',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '慢性肾脏疾病',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '慢性阻塞性肺病',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '支气管哮喘',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '痛风',
				disabled: false,
				checked: false,
				model: ''
			},
			{
				value: '',
				name: '外周血管病',
				disabled: false,
				checked: false,
				model: ''
			}
		]
	}
]
// 体格检查
const physicalExamination = [{
		name: '血压',
		model: '',
		mode1: '',
		type: 'text',
		key: 'blood_pressure1',
		keys: 'blood_pressure2',
		company: 'mmHg',
		required: true,
		icon: '...',
		connectionStatus: '连接成功...',
		placeholder: '请输入'
	},
	{
		name: '体重',
		model: '',
		type: 'text',
		key: 'weight',
		company: 'kg',
		required: true,
		icon: '...',
		connectionStatus: '端口"COM44"不存在。',
		placeholder: '请输入'
	},
	{
		name: '身高',
		model: '',
		type: 'text',
		key: 'height',
		company: 'cm',
		required: true,
		icon: '...',
		connectionStatus: '端口"COM112"不存在。',
		placeholder: '请输入'
	},
	{
		name: '心率',
		model: '',
		type: 'text',
		key: 'heart_rate',
		company: '次/分钟',
		required: true,
		icon: '',
		connectionStatus: '',
		placeholder: '请输入'
	},
	{
		name: '腰围',
		model: '',
		type: 'text',
		key: 'waist',
		company: 'cm',
		required: true,
		icon: '',
		connectionStatus: '',
		placeholder: '请输入'
	}
]
// 吸烟
const smoke = [{
	name: '目前是否正在吸烟',
	model: '',
	type: 'select',
	key: '',
	required: false,
	placeholder: '请选择',
	disabled: true
}]
// 辅助检查 
const supplementaryExamination = [{
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
	}
]
// 目前用药
const mqyy = [{
		name: '您目前是否在服用降压药、降脂(如他汀类)或抗血小板（如阿司匹林)等心血管病相关药物?',
		model: '',
		type: 'select',
		placeholder: '请选择',
		icon: '',
		disabled:true
	},
	{
		items:[
			{
				drug_name: '',
				every_time_dosage: '',
				unit: '',
				day_count: '',
				usage: '',
				icon: '\ue718',
				status:0,
				medicId: ''
			}
		]
	}
]
// 药物治疗
const ywzl = [{
	drug_name: '',
	every_time_dosage: '',
	unit: '',
	day_count: '',
	usage: '',
	is_take_institution: '',
	icon: '\ue718',
	status:0,
	medicId: ''
}]
// 诊断
const diagnosis = [{
		value: '',
		name: '高血压病',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '糖尿病',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '高脂血症',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '冠心病',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '心绞痛',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '心肌梗死',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '冠脉介入 (支架) 术后',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '冠脉搭桥术后',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '心力衰竭',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '脑卒中未分类',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '缺血性脑卒中',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '出血性脑卒中',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '慢性肾脏疾病',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '慢性阻塞性肺病',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '支气管哮喘',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '痛风',
		disabled: false,
		checked: false,
		model: ''
	},
	{
		value: '',
		name: '外周血管病',
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
// 生活指导方式
const lifestyleGuidance = [{
	name: '生活指导方式',
	model: '',
	type: 'text',
	key: '',
	required: false,
	placeholder: '请输入',
	disabled: false
}]
// 转诊
const referral = [{
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
		required: true,
		placeholder: '请输入',
		disabled: false
	},
]
// 目前用药 select
const mqyySelect = [
	{
		value:'1',
		label:'是'
	},
	{
		value:'2',
		label:'否'
	},
]
// 转诊 referral select
const referralSelect =[
	{
		value:'1',
		label:'是'
	},
	{
		value:'2',
		label:'否'
	}
]

export default {
	firstDiagnosisOfHypertension,
	physicalExamination,
	smoke,
	supplementaryExamination,
	mqyy,
	ywzl,
	diagnosis,
	lifestyleGuidance,
	referral,
	mqyySelect,
	referralSelect
}
