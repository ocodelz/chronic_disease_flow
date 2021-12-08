// 管理组别 & 病例来源
const basicInfoOfDiabetes = [{
		list: [{
				model: '',
				name: '管理组别',
				placeholder: '请选择',
				type: 'select',
				key: 'mrg_group',
				select: '\ue65a',
				requiredIcon: '\ue635',
				disabled: true,
				required: true
			},
			{
				model: '',
				name: '病例来源',
				placeholder: '请选择',
				type: 'select',
				key: 'cases_sourse',
				select: '\ue65a',
				requiredIcon: '\ue635',
				disabled: true,
				required: true
			}
		]
	},
	{
		title: '家族史',
		checkbox: [{
				name: '高血压',
				key: '',
				checked: false
			},
			{
				name: '冠心病',
				key: '',
				checked: false
			},
			{
				name: '脑卒中',
				key: '',
				checked: false
			},
			{
				name: '糖尿病',
				key: '',
				checked: false
			},
			{
				name: '以上皆无',
				key: '',
				checked: false
			},
			{
				name: '不详',
				key: '',
				checked: false
			},
			{
				name: '拒答',
				key: '',
				checked: false
			}
		]
	},
	{
		list: [{
				model: '',
				name: '糖尿病类型',
				placeholder: '请选择',
				type: 'select',
				key: 'diabetes_type',
				select: '\ue65a',
				disabled: true,
				required: false
			},
			{
				model: '',
				name: '确诊时间',
				placeholder: '请选择',
				type: 'select',
				key: 'diagnosis_time',
				select: '\ue65a',
				requiredIcon: '\ue635',
				disabled: true,
				required: true
			},
			{
				model: '',
				name: '确诊单位',
				placeholder: '请输入',
				type: 'text',
				key: 'jz_unit',
				select: '',
				disabled: false,
				required: false
			},
			{
				model: '',
				name: '是否使用胰岛素',
				placeholder: '请选择',
				type: 'select',
				key: 'is_insulin',
				select: '\ue65a',
				disabled: true,
				required: false
			},
			{
				model: '',
				name: '胰岛素用量',
				placeholder: '请输入',
				type: 'text',
				key: 'insulin_comsumption',
				select: '',
				disabled: false,
				required: false
			},
			{
				model: '',
				name: '是否使用口服降糖药',
				placeholder: '请选择',
				type: 'select',
				key: 'is_koufu_drug',
				select: '\ue65a',
				disabled: true,
				required: false
			}
		]
	}
]
// 目前症状
const currentSymptoms = [{
		name: '无症状',
		key: '',
		checked: false
	},
	{
		name: '消瘦',
		key: '',
		checked: false
	},
	{
		name: '多尿',
		key: '',
		checked: false
	},
	{
		name: '感染',
		key: '',
		checked: false
	},
	{
		name: '乏力',
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
		name: '视力模糊',
		key: '',
		checked: false
	},
	{
		name: '手脚麻木',
		key: '',
		checked: false
	},
	{
		name: '下肢浮肿',
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
// 糖尿病并发症
const diabeticComplications = [{
		model: '',
		name: '肾脏病变',
		key: 'sz_year',
		checked: false,
		disabled: true
	},
	{
		model: '',
		name: '神经病变',
		key: 'sj_year',
		checked: false,
		disabled: true
	},
	{
		model: '',
		name: '心脏病变',
		key: 'xz_year',
		checked: false,
		disabled: true
	},
	{
		model: '',
		name: '视网膜病变',
		key: 'swm_year',
		checked: false,
		disabled: true
	},
	{
		model: '',
		name: '足部病变',
		key: 'zb_year',
		checked: false,
		disabled: true
	},
	{
		model: '',
		name: '脑血管病变',
		key: 'nxg_year',
		checked: false,
		disabled: true
	},
	{
		model: '',
		mode1: '',
		name: '其他病变',
		key: 'other_year',
		keys:'other_bb',
		checked: false,
		disabled: true
	}
]
// 终止管理
const zzgl = [{
		model: '',
		name: '是否终止',
		placeholder: '请选择',
		type: 'select',
		key: 'is_stop_mgr',
		select: '\ue65a',
		disabled: true,
		required: false
	},
	{
		model: '',
		name: '终止管理理由',
		placeholder: '请选择',
		type: 'select',
		key: 'stop_reason',
		select: '\ue65a',
		disabled: true,
		required: false
	},
	{
		model: '',
		name: '终止管理日期',
		placeholder: '请选择',
		type: 'select',
		key: 'stop_date',
		select: '\ue65a',
		disabled: true,
		required: false
	}
]
// select 管理组别
const selectManagementGroup = [
	{
		value: '1',
		label: '常规管理'
	},
	{
		value: '2',
		label: '强化管理'
	}
]
// select 糖尿病类型
const DiabetesType = [
	{
		value: '1',
		label: '1型糖尿病'
	},
	{
		value: '2',
		label: '2型糖尿病'
	},
	{
		value: '3',
		label: '营养不良型'
	},
	{
		value: '4',
		label: 'IGT'
	},
	{
		value: '5',
		label: 'IFG'
	},
	{
		value: '6',
		label: '其他'
	}
]
// select 终止管理理由
const ReasonsformTerminationOfmanagement = [
	{
		value: '1',
		label: '死亡'
	},
	{
		value: '2',
		label: '迁出'
	},
	{
		value: '3',
		label: '失访'
	},
	{
		value: '4',
		label: '拒绝'
	},
]
export default {
	basicInfoOfDiabetes,
	currentSymptoms,
	diabeticComplications,
	zzgl,
	selectManagementGroup,
	DiabetesType,
	ReasonsformTerminationOfmanagement
}
