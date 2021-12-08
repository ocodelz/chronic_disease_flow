// 肺结核第一次随访详细信息
const tuberculosisFirstFollow = [
	{
		name: '随访时间',
		placeholder: '请选择',
		type: 'select',
		model: '',
		required: '\ue635',
		isRequired: true,
		select: '\ue65a',
		disabled: true,
		key: 'follow_time'
	},
	{
		name: '随访方式',
		placeholder: '请选择',
		type: 'select',
		model: '',
		required: '\ue635',
		select: '\ue65a',
		disabled: true,
		isRequired: true,
		key: 'follow_method'
	},
	{
		name: '患者类型',
		placeholder: '请选择',
		type: 'select',
		select: '\ue65a',
		model: '',
		required: '',
		disabled: true,
		key: 'person_type'
	},
	{
		name: '病菌情况',
		placeholder: '请选择',
		type: 'select',
		select: '\ue65a',
		model: '',
		required: '',
		disabled: true,
		key: 'sputum_bacteria'
	},
	{
		name: '耐药情况',
		placeholder: '请选择',
		type: 'select',
		select: '\ue65a',
		model: '',
		required: '',
		disabled: true,
		key: 'drug_resistance'
	},
]
// 病状及体征
const symptomsAndSigns = [
	{
		name: '没有症状',
		checked: false,
		disabled: false
	},
	{
		name: '咳嗽咳痰',
		checked: false,
		disabled: false
	},
	{
		name: '低热盗汗',
		checked: false,
		disabled: false
	},
	{
		name: '咯血或血痰',
		checked: false,
		disabled: false
	},
	{
		name: '胸痛消瘦',
		checked: false,
		disabled: false
	},
	{
		name: '恶心纳差',
		checked: false,
		disabled: false
	},
	{
		name: '头痛失眠',
		checked: false,
		disabled: false
	},
	{
		name: '视物模糊',
		checked: false,
		disabled: false
	},
	{
		name: '皮肤瘙痒、皮疹',
		checked: false,
		disabled: false
	},
	{
		name: '耳鸣、听力下降',
		checked: false,
		disabled: false
	},
	{
		name: '其他',
		checked: false,
		disabled: false
	}
]
// 用药
const medication = [
	{
		name: '化疗方案',
		model: '',
		disabled: false,
		placeholder: '',
		key: 'chemotherapy_menthod',
		type: 'text',
		icon: ''
	},
	{
		name: '用法',
		model: '',
		disabled: true,
		placeholder: '请选择',
		key: 'usage',
		type: 'select',
		select: '\ue65a',
	},
	{
		title: '药品剂型',
		checkbox: [{
				name: '固定剂量复合制剂',
				checked: false,
				disabled: false
			},
			{
				name: '闪装药',
				checked: false,
				disabled: false
			},
			{
				name: '板式组合药',
				checked: false,
				disabled: false
			},
			{
				name: '注射剂',
				checked: false,
				disabled: false
			}
		]
	},
	{
		name: '督导人员选择',
		model: '',
		disabled: true,
		placeholder: '请选择',
		key: 'guardian',
		type: 'select',
		select: '\ue65a'
	}
]
// 家庭居住环境评估
const jtzj = [
	{
		name: '单独的居室',
		placeholder: '请选择',
		type: 'select',
		model: '',
		select: '\ue65a',
		disabled: true,
		key: 'dandujushi'
	},
	{
		name: '通风情况',
		placeholder: '请选择',
		type: 'select',
		model: '',
		select: '\ue65a',
		disabled: true,
		key: 'tongfengqingkuang'
	}
]
// 生活方式评估
const lifestyleAssessment = [
	{
		name: '目前吸烟量',
		model: '',
		placeholder: '',
		company: '支/天',
		key: 'day_smoke'
	},
	{
		name: '目标吸烟量',
		model: '',
		placeholder: '',
		company: '支/天',
		key: 'target_smoke'
	},
	{
		name: '目前饮酒量',
		model: '',
		placeholder: '',
		company: '两/天',
		key: 'day_drink'
	},
	{
		name: '目标饮酒量',
		model: '',
		placeholder: '',
		company: '两/天',
		key: 'target_drink'
	}
]
// 健康教育及培训
const healthEducationAndTraining = [
	{
		name: '取药地点',
		model: '',
		placeholder: '',
		disabled: false,
		type: 'text',
		key: 'take_drug_ads'
	},
	{
		name: '取药时间',
		model: '',
		placeholder: '',
		disabled: true,
		type: 'select',
		key: 'take_drug_date'
	},
	{
		name: '患者服药记录卡的填写类型',
		model: '',
		placeholder: '',
		disabled: true,
		type: 'select',
		key: 'jiluka',
		select: '\ue65a'
	},
	{
		name: '服药方法及药品存放',
		model: '',
		placeholder: '',
		disabled: true,
		type: 'select',
		key: 'fayaofangfa',
		select: '\ue65a'
	},
	{
		name: '肺结核治疗疗程',
		model: '',
		placeholder: '',
		disabled: true,
		type: 'select',
		key: 'zhiliaoliaocheng',
		select: '\ue65a'
	},
	{
		name: '不规律服药危害',
		model: '',
		placeholder: '',
		disabled: true,
		type: 'select',
		key: 'bglfywh',
		select: '\ue65a'
	},
	{
		name: '服药后不良反应及处理',
		model: '',
		placeholder: '',
		disabled: true,
		type: 'select',
		key: 'fyblfy',
		select: '\ue65a'
	},
	{
		name: '治疗期间复诊查痰',
		model: '',
		placeholder: '',
		disabled: true,
		type: 'select',
		key: 'zlqjrhjcfy',
		select: '\ue65a'
	},
	{
		name: '外出期间如何坚持服药',
		model: '',
		placeholder: '',
		disabled: true,
		type: 'select',
		key: 'wcqjrhjcfy',
		select: '\ue65a'
	},
	{
		name: '生活习惯及注意事项',
		model: '',
		placeholder: '',
		disabled: true,
		type: 'select',
		key: 'shxgjzysx',
		select: '\ue65a'
	},
	{
		name: '密切接触者检查',
		model: '',
		placeholder: '',
		disabled: true,
		type: 'select',
		key: 'mqjczjc',
		select: '\ue65a'
	},
	{
		name: '下次随访日期',
		model: '',
		placeholder: '',
		disabled: true,
		isRequired: true,
		type: 'select',
		key: 'next_follow_time',
		required: '\ue635',
		select: '\ue65a'
	},
	{
		name: '评估医生签名',
		model: '',
		placeholder: '',
		disabled: false,
		type: 'text',
		key: 'follow_doctor_name',
		autograph: '\ue6a4'
	},
	{
		name: '患者（家属) 签名',
		model: '',
		placeholder: '',
		disabled: false,
		type: 'text',
		autograph: '\ue6a4',
		key: 'person_name',
	}
]
// 随访方式 select
const followMode = [
	{
		value: '1',
		label: '门诊'
	},
	{
		value: '2',
		label: '家庭'
	}
]
// 患者类型 select
const patientType = [
	{
		value: '1',
		label: '初治'
	},
	{
		value: '2',
		label: '复治'
	}
]
// 痰菌情况 select
const sputumBacteriaSituation = [
	{
		value: '1',
		label: '阳性'
	},
	{
		value: '2',
		label: '阴性'
	},
	{
		value: '3',
		label: '未查痰'
	}
]
// 耐药情况 select
const drugResistanceSituation = [
	{
		value: '1',
		label: '耐药'
	},
	{
		value: '2',
		label: '非耐药'
	},
	{
		value: '3',
		label: '未检测'
	}
]
export default {
	tuberculosisFirstFollow,
	symptomsAndSigns,
	medication,
	jtzj,
	lifestyleAssessment,
	healthEducationAndTraining,
	followMode,
	patientType,
	sputumBacteriaSituation,
	drugResistanceSituation
}