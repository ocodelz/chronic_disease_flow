// 肺结核随访详细信息
import utils from '@/common/utils.js';
const tuberculosisFollowDetails = [
	{
		name: '随访时间',
		disabled: true,
		model: utils.formatTime(new Date),
		placeholder: '请选择',
		required: '\ue635',
		select: '\ue65a',
		key: 'follow_time',
		isRequired: true
	},
	{
		name: '治疗月序第',
		disabled: false,
		model: '',
		placeholder: '',
		select: '',
		company: '月',
		key: 'treatment_month'
	},
	{
		name: '督导人员',
		disabled: true,
		model: '',
		placeholder: '请选择',
		select: '\ue65a',
		key: 'supervisory_staff'
	},
	{
		name: '随访方式',
		disabled: true,
		model: '',
		placeholder: '请选择',
		select: '\ue65a',
		key: 'follow_method'
	}
]
// 症状及体征
const symptomsAndSigns = [{
	name: '症状及体征',
	checkbox: [{
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
			name: '胸痛削瘦',
			checked: false,
			disabled: false
		},
		{
			name: '恶心纳差',
			checked: false,
			disabled: false
		},
		{
			name: '关节疼痛',
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
			disabled: false,
			model: ''
		}
	]
}]
// 生活方式指导
const lifestyleGuidance = [
	{
		name: '目前吸烟量',
		model: '',
		company: '支/天',
		key: 'day_smoke1'
	},
	{
		name: '目标吸烟量',
		model: '',
		company: '支/天',
		key: 'target_smoke'
	},
	{
		name: '目前饮酒量',
		model: '',
		company: '两/天',
		key: 'day_drink'
	},
	{
		name: '目标饮酒量',
		model: '',
		company: '两/天',
		key: 'target_drink'
	}
]
// 用药
const medication = [
	{
		name: '化疗方案',
		model: '',
		key: 'chemotherapy_menthod'
	},
	{
		name: '用法',
		placeholder: '请选择',
		model: '',
		key: 'usage',
		disabled: true,
		select: '\ue65a'
	},
	{
		name: '药品剂型',
		checkbox: [{
				name: '固定剂量复合制剂',
				checked: false,
				disabled: false
			},
			{
				name: '散装药',
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
		name: '漏服药次数',
		model: '',
		key: 'loufuyaocishu',
		company: '次'
	},
	{
		name: '药物不良反应',
		placeholder: '请选择',
		model: '',
		key: 'bad_reaction',
		disabled: true,
		select: '\ue65a'
	},
	{
		name: '并发症或合并症',
		placeholder: '请选择',
		model: '',
		key: 'complication',
		disabled: true,
		select: '\ue65a'
	}
]
// 转诊
const referral = [{
		name: '转诊原因',
		model: '',
		key: 'referral_reason'
	},
	{
		name: '机构及科别',
		model: '',
		key: 'jg_jb'
	},
	{
		name: '2周内随访结果',
		model: '',
		key: 'twoweek_follow_result'
	},
	{
		name: '处理意见',
		model: '',
		key: 'handling_opinions'
	},
	{
		name: '下次随访时间',
		model: '',
		disabled: true,
		key: 'next_follow_time',
		required: '\ue635',
		select: '\ue65a',
		isRequired: true
	},
	{
		name: '随访医生签名',
		model: '',
		key: 'follow_doctor_name',
		required: '\ue635',
		icon: '\ue6a4',
		isRequired: true
	},
	{
		name: '患者/家属签名',
		model: '',
		key: 'person_name',
		icon: '\ue6a4'
	}
]
// bottom
const list = [{
		name: '停止治疗时间',
		model: '',
		placeholder: '请选择',
		key: 'stop_treat_time',
		select: '\ue65a',
		disabled: true
	},
	{
		name: '停止治疗原因',
		model: '',
		key: 'stop_treat_reason',
		placeholder: '请选择',
		select: '\ue65a',
		disabled: true
	},
	{
		name: '应访视患者',
		model: '',
		key: 'ying_visit',
		company: '次'
	},
	{
		name: '实际访规',
		model: '',
		key: 'shiji_visit',
		company: '次'
	},
	{
		name: '应服药',
		model: '',
		key: 'yin_eatdrug',
		company: '次'
	},
	{
		name: '实际服药',
		model: '',
		key: 'shiji_eatdrug',
		company: '次'
	},
	{
		name: '服药率',
		model: '',
		key: 'eatdrug_rate',
		company: '%'
	},
	{
		name: '评估医生签名',
		model: '',
		key: 'assessment_doctor_sign',
		icon: '\ue6a4'
	}
]
// 停止治疗原因 select
const reasonsForStoppingTreatment = [
	{
		value: '1',
		label: '完成疗程'
	},
	{
		value: '2',
		label: '死亡'
	},
	{
		value: '3',
		label: '丢失'
	},
	{
		value: '4',
		label: '转入耐多药治疗'
	}
]
export default{
	tuberculosisFollowDetails,
	symptomsAndSigns,
	lifestyleGuidance,
	medication,
	referral,
	list,
	reasonsForStoppingTreatment
}