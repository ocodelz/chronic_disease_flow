// 精神障碍患者个人信息补充表
const psychiatricDetails = [
	{
		name: '监护人姓名',
		model: '',
		required: '\ue635',
		key: 'guardian',
		isRequired: true
	},
	{
		name: '与患者关系',
		model: '',
		placeholder: '请选择',
		required: '\ue635',
		select: '\ue65a',
		disabled: true,
		key: 'relative',
		isRequired: true
	},
	{
		name: '监护人地址',
		model: '',
		required: '\ue635',
		key: 'guardian_ads',
		isRequired: true
	},
	{
		name: '监护人电话',
		model: '',
		key: 'guardian_tel'
	},
	{
		name: '村委会联系人、电话',
		model: '',
		key: 'cunweihui_tel'
	},
	{
		name: '户别',
		model: '',
		placeholder: '请选择',
		select: '\ue65a',
		disabled: true,
		key: 'hubie'
	},
	{
		name: '就业情况',
		model: '',
		placeholder: '请选择',
		select: '\ue65a',
		disabled: true,
		key: 'employ_condition'
	},
	{
		name: '知情同意',
		model: '',
		placeholder: '请选择',
		select: '\ue65a',
		disabled: true,
		key: 'is_informed'
	},
	{
		name: '知情同意签字',
		model: '',
		icon: '\ue6a4',
		key: 'informed_name'
	},
	{
		name: '签字时间',
		model: '',
		key: 'sign_date',
		placeholder: '请选择',
		select: '\ue65a',
		disabled: true
	},
	{
		name: '初次发病时间',
		model: '',
		key: 'first_morbidity_date',
		placeholder: '请选择',
		select: '\ue65a',
		disabled: true
	},
	{
		name: '既往主要症状',
		checkbox: [
			{
				name: '幻觉',
				checked: false,
				disabled: false
			},
			{
				name: '交流困难',
				checked: false,
				disabled: false
			},
			{
				name: '猜疑',
				checked: false,
				disabled: false
			},
			{
				name: '喜怒无常',
				checked: false,
				disabled: false
			},
			{
				name: '行为怪异',
				checked: false,
				disabled: false
			},
			{
				name: '兴奋话多',
				checked: false,
				disabled: false
			},
			{
				name: '伤人毁物',
				checked: false,
				disabled: false
			},
			{
				name: '悲观厌世',
				checked: false,
				disabled: false
			},
			{
				name: '无故外走',
				checked: false,
				disabled: false
			},
			{
				name: '自语自笑',
				checked: false,
				disabled: false
			},
			{
				name: '孤僻懒散',
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
		name: '既往关锁情况',
		model: '',
		key: 'history_guansuo',
		select: '\ue65a',
		placeholder: '请选择',
		disabled: true
	},
	{
		name: '门诊',
		model: '',
		key: 'out_depart',
		select: '\ue65a',
		placeholder: '请选择',
		disabled: true
	},
	{
		name: '首次治疗时间',
		model: '',
		key: 'first_treatment_date',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a'
	},
	{
		name: '住院次数',
		model: '',
		key: 'hos_num'
	},
	{
		name: '诊断',
		model: '',
		key: 'diagnosis'
	},
	{
		name: '确诊医院',
		model: '',
		key: 'diagnosis_hos'
	},
	{
		name: '确诊日期',
		model: '',
		key: 'diagnosis_date',
		disabled: true,
		select: '\ue65a',
		placeholder: '请选择'
	},
	{
		name: '最近一次治疗效果',
		model: '',
		key: 'last_treatment_effect',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a'
	},
	{
		name: '危险行为',
		checkbox:[
			{
				name: '轻度滋事',
				disabled: true,
				checked: false,
				model: '',
				key: 'qdzs_num',
				company: '次'
			},
			{
				name: '肇事',
				disabled: true,
				checked: false,
				model: '',
				key: 'zs_num',
				company: '次'
			},
			{
				name: '肇祸',
				disabled: true,
				checked: false,
				model: '',
				key: 'zh_num',
				company: '次'
			},
			{
				name: '其他危害行为',
				disabled: true,
				checked: false,
				model: '',
				key: 'qtwhxw_num',
				company: '次'
			},
			{
				name: '自伤',
				disabled: true,
				checked: false,
				model: '',
				key: 'zshang_num',
				company: '次'
			},
			{
				name: '自杀未遂',
				disabled: true,
				checked: false,
				model: '',
				key: 'zsws_num',
				company: '次'
			},
			{
				name: '无',
				disabled: true,
				checked: false
			}
		]
	},
	{
		name: '经济情况',
		model: '',
		key: 'economic',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a'
	},
	{
		name: '专科医生的意见',
		model: '',
		key: 'zhaungkedoc_proposal'
	},
	{
		name: '填表日期',
		model: '',
		key: 'create_time',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		required: '\ue635',
		isRequired: true
	},
	{
		name: '医生签名',
		model: '',
		key: 'follow_doctor_name',
		icon: '\ue6a4'
	},
	{
		name: '患者(家属)签名',
		model: '',
		key: 'person_name',
		icon: '\ue6a4'
	}
]
// 与患者关系 select
const patientRelationship = [
	{
		value: '1',
		label: '户主'
	},
	{
		value: '2',
		label: '配偶'
	},
	{
		value: '3',
		label: '父亲'
	},
	{
		value: '4',
		label: '母亲'
	},
	{
		value: '5',
		label: '兄弟'
	},
	{
		value: '6',
		label: '姐妹'
	},
	{
		value: '7',
		label: '儿子'
	},
	{
		value: '8',
		label: '女儿'
	},
	{
		value: '9',
		label: '儿媳'
	},
	{
		value: '10',
		label: '女婿'
	},
	{
		value: '11',
		label: '孙子'
	},
	{
		value: '12',
		label: '孙女'
	},
	{
		value: '13',
		label: '外孙'
	},
	{
		value: '14',
		label: '外孙女'
	},
	{
		value: '15',
		label: '其他'
	}
]
// 户别 select
const householdRegisterDifference = [
	{
		value: '1',
		label: '城镇'
	},
	{
		value: '2',
		label: '农村'
	}
]
// 就业情况 select
const employmentSituation = [
	{
		value: '1',
		label: '在岗工人'
	},
	{
		value: '2',
		label: '在岗管理者'
	},
	{
		value: '3',
		label: '农民'
	},
	{
		value: '4',
		label: '下岗或无业'
	},
	{
		value: '5',
		label: '在校学生'
	},
	{
		value: '6',
		label: '退休'
	},
	{
		value: '7',
		label: '专业技术人员'
	},
	{
		value: '8',
		label: '其他'
	},
	{
		value: '9',
		label: '不详'
	}
]
// 知情同意 select
const informedConsent = [
	{
		value: '1',
		label: '同意参加管理'
	},
	{
		value: '2',
		label: '不同意参加管理'
	}
]
// 既往关锁情况 select
const previousLockdownStatus = [
	{
		value: '1',
		label: '无关锁'
	},
	{
		value: '2',
		label: '关锁'
	},
	{
		value: '3',
		label: '关锁已解除'
	}
]
// 门诊 select
const outpatientService = [
	{
		value: '1',
		label: '未治'
	},
	{
		value: '2',
		label: '间断门诊治疗'
	},
	{
		value: '3',
		label: '连续门诊治疗'
	}
]
// 最近一次治疗效果 select
const effectOfTheLatestTreatment = [
	{
		value: '1',
		label: '临床痊愈'
	},
	{
		value: '2',
		label: '好转'
	},
	{
		value: '3',
		label: '无变化'
	},
	{
		value: '4',
		label: '加重'
	}
]
// 经济状况 select
const stateOfTheEconomy = [
	{
		value: '1',
		label: '贫困，在当地贫困线标准以下'
	},
	{
		value: '2',
		label: '非贫困'
	}
]
export default {
	psychiatricDetails,
	patientRelationship,
	householdRegisterDifference,
	employmentSituation,
	informedConsent,
	previousLockdownStatus,
	outpatientService,
	effectOfTheLatestTreatment,
	stateOfTheEconomy
}