const patientInfo = [
	{
		name: '患者卡片编号',
		required: '\ue635',
		model: '',
		key: 'p_card_no'
	},
	{
		name: '患者家属签名',
		required: '\ue635',
		model: '',
		icon: '\ue6a4',
		key: 'person_family_name'
	}
]
// 随访信息
const followUpInfo = [
	{
		name: '随访状态',
		placeholder: '请选择',
		select: '\ue65a',
		model: '',
		key: 'follow_status',
		disabled: true
	},
	{
		name: '随访次数',
		model: '',
		key: 'follow_number'
	},
	{
		name: '是否羁押',
		placeholder: '请选择',
		select: '\ue65a',
		model: '',
		key: 'is_detain',
		disabled: true
	},
	{
		name: '原因',
		placeholder: '请选择',
		select: '\ue65a',
		model: '',
		key: 'reason',
		disabled: true
	}
]
// 病程阶段
const theIllnessCondition = [
	{
		name: '病程阶段',
		placeholder: '请选择',
		select: '\ue65a',
		model: '',
		key: 'disease_starge',
		disabled: true
	},
	{
		name: '确诊时间',
		placeholder: '请选择',
		select: '\ue65a',
		model: '',
		key: 'diagnosis_time',
		disabled: true
	},
	{
		name: '是否已经死亡',
		placeholder: '请选择',
		select: '\ue65a',
		model: '',
		key: 'is_die',
		disabled: true
	}
]
// 问卷 (是否为母婴传播病例)
const theQuestionnaire = [
	{
		name: '是否为母婴传播病例：',
		placeholder: '请选择',
		select: '\ue65a',
		model: '',
		key: 'is_mother',
		disabled: true,
		state: 0
	},
	{
		name: '目前是否有配偶：',
		placeholder: '请选择',
		select: '\ue65a',
		model: '',
		key: 'is_spouse',
		disabled: true,
		state: 0
	},
	{
		name: '目前是否有固定伴侣',
		placeholder: '请选择',
		select: '\ue65a',
		model: '',
		key: 'is_partner',
		disabled: true,
		state: 0
	},
	{
		name: '异性固定性伴个数',
		model: '',
		key: 'yxpartner_count',
		state: 1
	},
	{
		name: '检测个数',
		model: '',
		key: 'yxpartner_monitor_count',
		state: 1
	},
	{
		name: '同性固定性伴个数',
		model: '',
		key: 'txpartner_count',
		state: 1
	},
	{
		name: '检测个数',
		model: '',
		key: 'txpartner_monitor_count',
		state: 1
	},
	{
		name: '过去三个月,多少人与您有过性行为',
		model: '',
		key: 'three_month_sexual',
		state: 0
	},
	{
		name: '过去三个月,是否每次发生性行为都用安全套',
		model: '',
		key: 'three_use_condom',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		state: 0
	},
	{
		name: '过去三个月,是否每次与配偶/固定性伴发生性行为时都用安全套：',
		model: '',
		key: 'three_use_condom1',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		state: 0
	}
]
// 是否出现以下结核病可疑筛查症状
const suspiciousScreeningSymptoms = [
	{
		name: '咳嗽、咳痰持续2周以上：',
		model: '',
		key: 'two_week_cough',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a'
	},
	{
		name: '反复咳出的痰中带血：',
		model: '',
		key: 'repeatedly_blood',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a'
	},
	{
		name: '反复发热持续2周以上：',
		model: '',
		key: 'two_week_fever',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a'
	},
	{
		name: '夜间经常出汗：',
		model: '',
		key: 'yjjcch',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a'
	},
	{
		name: '否无法解释的体重明显下降：',
		model: '',
		key: 'height_lower',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a'
	},
	{
		name: '经常容易疲劳或呼吸短促：',
		model: '',
		key: 'rongyipilao',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a'
	},
	{
		name: '淋巴结肿大：',
		model: '',
		key: 'linbajiezhongda',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a'
	}
]
// 转诊
const referral = [
	{
		name: '过去6个月是否接受过结核病检查：',
		model: '',
		key: 'six_jiehebingjiancha',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		state: 0
	},
	{
		name: '目前是否接受国家免费艾滋病抗病毒治疗：',
		model: '',
		key: 'current_mainfeizhiliao',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		state: 0
	},
	{
		name: 'CD4+检测次数：',
		model: '',
		key: 'CD_count'
	},
	{
		name: 'CD4+最近一次CD4+检测结果：',
		model: '',
		key: 'CD_current_result'
	},
	{
		name: '检测日期：',
		model: '',
		key: 'monitor_date',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a'
	},
	{
		name: '检测单位：',
		model: '',
		key: 'monitor_unit'
	},
	{
		name: '随访实施单位：',
		model: '',
		key: 'follow_imple_unit'
	},
	{
		name: '随访人员：',
		model: '',
		key: 'follow_doctor_name'
	},
	{
		name: '随访日期：',
		model: '',
		key: 'follow_time',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		required: '\ue635',
		state: 0,
		isRequired: true
	},
	{
		name: '备注：',
		model: '',
		key: 'memo',
		state: 0
	}
]
// 随访状态 select
const followUpStatus = [
	{
		value: '1',
		label: '随访'
	},
	{
		value: '2',
		label: '失访'
	},
	{
		value: '3',
		label: '查无此人'
	}
]
// 原因 select
const reason = [
	{
		value: '1',
		label: '外出'
	},
	{
		value: '2',
		label: '拒绝随访'
	},
	{
		value: '3',
		label: '羁押'
	},
	{
		value: '4',
		label: '转入时地址不详.此次随访结束'
	}
]
// 病程阶段 select
const stageOfDisease = [
	{
		value: '1',
		label: '艾滋病毒感染者'
	},
	{
		value: '2',
		label: '艾滋病病人'
	}
]
//过去三个月，是否每次与配偶/固定性伴发生性行为时都用安全套 select
const questionAndAnswer = [
	{
		value: '1',
		label: '是'
	},
	{
		value: '2',
		label: '否'
	},
	{
		value: '3',
		label: '未与配偶发生性行为'
	}
]
export default {
	patientInfo,
	followUpInfo,
	theIllnessCondition,
	theQuestionnaire,
	suspiciousScreeningSymptoms,
	referral,
	followUpStatus,
	reason,
	stageOfDisease,
	questionAndAnswer
}