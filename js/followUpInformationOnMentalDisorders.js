// 严重精神障碍患者随访详细信息
import utils from '@/common/utils.js';
const list = [{
		name: '随访日期',
		model: utils.formatTime(new Date),
		disabled: true,
		placeholder: '请选择',
		required: '\ue635',
		select: '\ue65a',
		key: 'follow_time',
		isRequired: true
	},
	{
		name: '本次随访形式',
		model: '',
		disabled: true,
		placeholder: '请选择',
		required: '\ue635',
		select: '\ue65a',
		key: 'follow_method',
		isRequired: true
	},
	{
		name: '失访原因',
		model: '',
		disabled: true,
		placeholder: '请选择',
		required: '\ue635',
		select: '\ue65a',
		key: 'follow_up_reason',
		isRequired: true
	}
]
// 如死亡，日期和原因
const dateAndCauseOfDeath = [{
		name: '死亡日期',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'dead_time'
	},
	{
		name: '死亡原因',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'dead_reason'
	}
]
// 目前症状
const theCurrentSymptoms = [{
		name: '危险性评估',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'risk_assessment'
	},
	{
		name: '目前症状',
		checkbox: [{
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
				name: '搜索',
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
		name: '自知力',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'insight'
	},
	{
		name: '睡眠情况',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'sleep'
	},
	{
		name: '饮食情况',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'eat'
	}
]
// 社会功能情况
const socialFunction = [{
		name: '个人生活料理',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'life_cuisine'
	},
	{
		name: '家务劳动',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'housework'
	},
	{
		name: '生产劳动及工作',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'productive_labor'
	},
	{
		name: '学习能力',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'study'
	},
	{
		name: '社会人际交往',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'social'
	}
]
// 危险行为
const main = [{
		name: '危险行为',
		checkbox: [{
				name: '轻度滋事',
				checked: false,
				disabled: true,
				one: '',
				onekey: 'qdzs_num',
				unit: '次'
			},
			{
				name: '肇事',
				checked: false,
				disabled: true,
				one: '',
				onekey: 'zs_num',
				unit: '次'
			},
			{
				name: '肇祸',
				checked: false,
				disabled: true,
				one: '',
				onekey: 'zh_num',
				unit: '次'
			},
			{
				name: '其他危害行为',
				checked: false,
				disabled: true,
				one: '',
				onekey: 'qtwhxw_num',
				unit: '次'
			},
			{
				name: '自伤',
				checked: false,
				disabled: true,
				one: '',
				onekey: 'zshang_num',
				unit: '次'
			},
			{
				name: '自杀未遂',
				checked: false,
				disabled: true,
				one: '',
				onekey: 'zsws_num',
				unit: '次'
			},
			{
				name: '无',
				checked: false,
				disabled: true
			}
		]
	},
	{
		name: '两次随访期间关锁情况',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'lcsfgsqk'
	},
	{
		name: '两次随访期间住院情况',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'lcsfzyqk'
	},
	{
		name: '末次出院时间',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'last_leave_time'
	},
	{
		name: '实验室检查',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'sysjc'
	},
	{
		name: '用药依从性',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'drug_status'
	},
	{
		name: '药物不良反应',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'bad_reaction'
	},
	{
		name: '治疗效果',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'treatment_effect'
	},
	{
		name: '康复措施',
		checkbox: [{
				name: '生活劳动能力',
				disabled: false,
				checked: false
			},
			{
				name: '职业训练',
				disabled: false,
				checked: false
			},
			{
				name: '学习能力',
				disabled: false,
				checked: false
			},
			{
				name: '社会交往',
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
	},
	{
		name: '本次随访分类',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'follow_type'
	},
	{
		name: '通知联系部门',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'tzlxbm'
	},
	{
		name: '公安部门受理人姓名',
		model: '',
		key: 'gabmslrname'
	},
	{
		name: '社区受理人姓名',
		model: '',
		key: 'sqslrname'
	},
	{
		name: '公安部门受理人电话',
		model: '',
		key: 'gabmslrtel'
	},
	{
		name: '社区受理人电话',
		model: '',
		key: 'sqslrtel'
	}
]
// 目前用药
const currentMedication = [{
	drug_name: '',
	day_count: '',
	every_time_dosage: '',
	unit: '',
	status: 0,
	medicId: ''
}]
// 转诊
const referral = [{
		name: '是否需要转诊',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'is_referral'
	},
	{
		name: '转诊是否成功',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'referral_result'
	},
	{
		name: '联系精神专科医师',
		model: '',
		disabled: true,
		placeholder: '请选择',
		select: '\ue65a',
		key: 'lxjskdoc'
	},
	{
		name: '精神专科医师姓名',
		model: '',
		key: 'jszkdoc_name'
	},
	{
		name: '电话',
		model: '',
		key: 'jszkdoc_tel'
	},
	{
		name: '处置结果',
		model: '',
		key: 'treatment_result'
	}
]
// 调整用药情况
const adjustMedication = [{
		items: [{
			drug_name: '',
			day_count: '',
			every_time_dosage: '',
			unit: '',
			status: 0
		}]
	},
	{
		list: [{
				name: '下次随访日期',
				model: '',
				disabled: true,
				placeholder: '请选择',
				required: '\ue635',
				select: '\ue65a',
				key: 'next_follow_time',
				isRequired: true
			},
			{
				name: '随访医生签名',
				model: '',
				required: '\ue635',
				icon: '\ue6a4',
				key: 'follow_doctor_name',
				isRequired: true
			},
			{
				name: '患者家属签名',
				model: '',
				icon: '\ue6a4',
				key: 'person_name'
			}
		]
	}
]
// 本次随访形式 select
const theFormOfFollowUp = [
	{
		value: '1',
		label: '门诊'
	},
	{
		value: '2',
		label: '家庭访视'
	},
	{
		value: '3',
		label: '电话'
	}
]
// 失访原因 select
const reasonsForMissingFollowUp = [
	{
		value: '1',
		label: '外出打工'
	},
	{
		value: '2',
		label: '迁居他处'
	},
	{
		value: '3',
		label: '走失'
	},
	{
		value: '4',
		label: '连续3次未到访'
	},
	{
		value: '5',
		label: '其他'
	}
]
// 死亡原因 select
const causeOfDeath = [
	{
		value: '1',
		label: '躯体疾病'
	},
	{
		value: '2',
		label: '自杀'
	},
	{
		value: '3',
		label: '他杀'
	},
	{
		value: '4',
		label: '意外'
	},
	{
		value: '5',
		label: '精神疾病相关并发症'
	},
	{
		value: '6',
		label: '其他'
	}
]
// 危险性评估 select
const riskAssessment = [
	{
		value: '1',
		label: '0'
	},
	{
		value: '2',
		label: '1'
	},
	{
		value: '3',
		label: '2'
	},
	{
		value: '4',
		label: '3'
	},
	{
		value: '5',
		label: '4'
	},
	{
		value: '6',
		label: '5'
	}
]
// 自知力 select
const insight = [
	{
		value: '1',
		label: '自知力完全'
	},
	{
		value: '2',
		label: '自知力不全'
	},
	{
		value: '3',
		label: '自知力缺失'
	}
]
// 生产劳动及工作 select
const productionLaborAndwork = [
	{
		value:'1',
		label:'良好'
	},
	{
		value:'2',
		label:'一般'
	},
	{
		value:'3',
		label:'差'
	},
	{
		value:'4',
		label:'此项不适应'
	}
]
// 两次随访期间关锁情况 select
const lcsfqjgsqk = [
	{
		value:'1',
		label:'无关锁'
	},
	{
		value:'2',
		label:'关锁'
	},
	{
		value:'3',
		label:'关锁已解除'
	}
]
// 两次随访期间住院情况 select
const lcsfqjzyqk = [
	{
		value:'1',
		label:'从未住院'
	},
	{
		value:'2',
		label:'目前正在住院'
	},
	{
		value:'3',
		label:'即住院，现未住院'
	}
]
// 用药依从性 select
const medicationCompliance = [
	{
		value:'1',
		label:'按医嘱规律服药'
	},
	{
		value:'2',
		label:'间断服药'
	},
	{
		value:'3',
		label:'不服药'
	},
	{
		value:'4',
		label:'医嘱勿需服药'
	}
]
// 药物不良反应 select
const adverseDrugReactions = [
	{
		value:'1',
		label:'无'
	},
	{
		value:'2',
		label:'有'
	},
	{
		value:'3',
		label:'此项不适应'
	}
]
// 治疗效果 select
const treatmentEffect = [
	{
		value:'1',
		label:'痊愈'
	},
	{
		value:'2',
		label:'好转'
	},
	{
		value:'3',
		label:'无变化'
	},
	{
		value:'4',
		label:'加重'
	},
	{
		value:'5',
		label:'此项不适应'
	}
]
// 本次随访分类 select
const classificationOfThisFollowUp = [
	{
		value:'1',
		label:'不稳定'
	},
	{
		value:'2',
		label:'基本稳定'
	},
	{
		value:'3',
		label:'稳定'
	}
]

export default {
	list,
	dateAndCauseOfDeath,
	theCurrentSymptoms,
	socialFunction,
	main,
	currentMedication,
	referral,
	adjustMedication,
	theFormOfFollowUp,
	reasonsForMissingFollowUp,
	causeOfDeath,
	riskAssessment,
	insight,
	productionLaborAndwork,
	lcsfqjgsqk,
	lcsfqjzyqk,
	medicationCompliance,
	adverseDrugReactions,
	treatmentEffect,
	classificationOfThisFollowUp
}
