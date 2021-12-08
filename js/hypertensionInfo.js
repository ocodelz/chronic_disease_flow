// 高血压基本信息
const hypertensionInfo = [
	{
		list: [
			{
				name: '管理组别',
				model: '',
				type: 'select',
				key:'mrg_group',
				required: false,
				placeholder: '请选择',
				disabled: true
			},
			{
				name: '病例来源',
				model: '',
				type: 'select',
				key:'cases_sourse',
				required: false,
				placeholder: '请选择',
				disabled: true
			}
		],
		checkbox: [
			{
				title: '家族史',
				items: [{
						value: '',
						name: '高血压',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '冠心病',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '脑卒中',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '糖尿病',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '以上皆无',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '不详',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '拒答',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					}
				]
			},
			{
				title: '目前症状',
				items: [{
						value: '',
						name: '无症状',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '头痛头晕',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '恶心呕吐',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '眼花耳鸣',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '呼吸困难',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '心悸胸闷',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '鼻衄出血不止',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '四肢发麻',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '下肢水肿',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '其他',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					}
				]
			},
			{
				title: '并发症',
				items: [{
						value: '',
						name: '无任何并发症',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '缺血性卒中',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '脑出血',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '短暂性脑缺血发作(TIA)',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '肾功能衰竭',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '视网膜出血或渗出',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '心肌梗死',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '心绞痛',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '充血性心力衰竭',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '高血压肾病',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '视乳头水肿',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					},
					{
						value: '',
						name: '其他并发症',
						disabled: false,
						checked: false,
						type: 'text',
						model: ''
					}
				]
			}
		]
	},
	{
		list: [{
				name: '是否使用降压药',
				model: '',
				type: 'select',
				key:'is_hypotensor',
				required: false,
				placeholder: '请选择',
				disabled: true
			},
			{
				name: '终止管理',
				model: '',
				type: 'select',
				key:'is_stop_mgr',
				required: false,
				placeholder: '请选择',
				disabled: true
			},
			{
				name: '终止管理理由',
				model: '',
				type: 'select',
				key:'stop_reason',
				required: false,
				placeholder: '请选择',
				disabled: true
			},
			{
				name: '终止管理日期',
				model: '',
				type: 'select',
				key:'stop_date',
				required: false,
				placeholder: '请选择',
				disabled: true
			},
		],
	}
]
// 管理组别
const managementGroup = [
	{
		value:'1',
		label:'重点组'
	},
	{
		value:'2',
		label:'好转组'
	},
	{
		value:'3',
		label:'稳定组'
	}
]
// 回答 是 & 否
const answer = [
	{
		value:'1',
		label:'是'
	},
	{
		value:'2',
		label:'否'
	}
]
// 终止管理理由
const ReasonsForTermination = [
	{
		value:'1',
		label:'死亡'
	},
	{
		value:'2',
		label:'迁出'
	},
	{
		value:'3',
		label:'失访'
	},
	{
		value:'4',
		label:'拒绝'
	}
]
export default {
	hypertensionInfo,
	managementGroup,
	answer,
	ReasonsForTermination
}
