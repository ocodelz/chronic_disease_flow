const grxx = [{
		model: '',
		name: '姓名',
		placeholder: '请输入',
		type: 'text',
		select_icon: '',
		required_icon: '',
		key: 'name',
		style: 0,
		disabled: false,
		required: false
	},
	{
		model: '',
		name: '性别',
		placeholder: '请选择',
		type: 'select',
		select_icon: '\ue65a',
		required_icon: '',
		key: 'sex',
		style: 0,
		disabled: true,
		required: false
	},
	{
		model: '',
		name: '出生日期',
		placeholder: '请选择',
		type: 'select',
		select_icon: '\ue65a',
		required_icon: '\ue635',
		key: 'birthdate',
		style: 0,
		disabled: true,
		required: true
	},
	{
		model: '',
		name: '是否死亡',
		placeholder: '请选择',
		type: 'select',
		select_icon: '\ue65a',
		required_icon: '',
		key: 'is_die',
		style: 1,
		disabled: true,
		required: false
	},
	{
		model: '',
		name: '身份证号',
		placeholder: '请输入',
		type: 'text',
		select_icon: '',
		required_icon: '',
		key: 'idcard',
		style: 0,
		disabled: false,
		required: false
	},
	{
		model: '',
		name: '工作单位',
		placeholder: '请输入',
		type: 'text',
		select_icon: '',
		required_icon: '',
		key: 'work_unit',
		style: 3,
		disabled: false,
		required: false
	},
	{
		model: '',
		name: '本人电话',
		placeholder: '请输入',
		type: 'text',
		select_icon: '',
		required_icon: '',
		key: 'telephone',
		style: 0,
		disabled: false,
		required: false
	},
	{
		model: '',
		name: '联系人姓名',
		placeholder: '请输入',
		type: 'text',
		select_icon: '',
		required_icon: '',
		key: 'linkman',
		style: 0,
		disabled: false,
		required: false
	},
	{
		model: '',
		name: '联系人电话',
		placeholder: '请输入',
		type: 'text',
		select_icon: '',
		required_icon: '',
		key: 'linktel',
		style: 0,
		disabled: false,
		required: false
	},
	{
		model: '',
		name: '常驻类型',
		placeholder: '请选择',
		type: 'select',
		required_icon: '',
		select_icon: '\ue65a',
		key: 'resident_type',
		style: 0,
		disabled: true,
		required: false
	},
	{
		model: '',
		name: '民族',
		placeholder: '请选择',
		type: 'select',
		select_icon: '\ue65a',
		required_icon: '',
		key: 'nation',
		style: 0,
		disabled: true,
		required: false
	},
	{
		model: '',
		name: '文化程度',
		placeholder: '请选择',
		type: 'select',
		select_icon: '\ue65a',
		required_icon: '',
		key: 'degree',
		style: 0,
		disabled: true,
		required: false
	},
	{
		model: '',
		name: '所属区划',
		placeholder: '请选择',
		type: 'select',
		select_icon: '\ue65a',
		required_icon: '',
		key: 'division',
		style: 1,
		disabled: true,
		required: false
	},
	{
		model: '',
		name: '户籍地址',
		placeholder: '',
		type: 'text',
		select_icon: '',
		required_icon: '',
		key: 'permanent_address',
		style: 2,
		action: '同现住址',
		disabled: false,
		required: false
	},
	{
		model: '',
		name: '现住址',
		placeholder: '',
		type: 'text',
		select_icon: '',
		required_icon: '',
		key: 'current_address',
		style: 2,
		action: '同户籍地址',
		disabled: false,
		required: false
	},
	{
		model: '',
		name: '血型',
		placeholder: '请选择',
		type: 'select',
		select_icon: '\ue65a',
		required_icon: '',
		key: 'boold_type',
		style: 2,
		disabled: true,
		required: false
	},
	{
		model: '',
		name: 'RH阴性',
		placeholder: '请选择',
		type: 'select',
		select_icon: '\ue65a',
		required_icon: '',
		key: 'is_RH',
		style: 2,
		disabled: true,
		required: false
	},
	{
		model: '',
		name: '职业',
		placeholder: '请选择',
		type: 'select',
		select_icon: '\ue65a',
		required_icon: '',
		key: 'job',
		style: 2,
		disabled: true,
		required: false
	},
	{
		model: '',
		name: '婚姻状况',
		placeholder: '请选择',
		type: 'select',
		select_icon: '\ue65a',
		required_icon: '',
		key: 'marital',
		style: 2,
		disabled: true,
		required: false
	}
]
const zffs = [{
		model: '',
		name: '城镇或省直职工基本医疗保险',
		value: '医保卡号',
		key: '',
		checked: false,
		disabled: false,
		isInput: true
	},
	{
		model: '',
		name: '居民基本医疗保险',
		value: '医保卡号',
		key: '',
		checked: false,
		disabled: false,
		isInput: true
	},
	{
		model: '',
		name: '新型农村合作医疗',
		value: '医保卡号',
		key: '',
		checked: false,
		disabled: false,
		isInput: true
	},
	{
		model: '',
		name: '贫困救助',
		value: '医保卡号',
		key: '',
		checked: false,
		disabled: false,
		isInput: true
	},
	{
		model: '',
		name: '商业医疗保险',
		value: '',
		key: '',
		checked: false,
		disabled: false,
		state: 0
	},
	{
		model: '',
		name: '全公费',
		value: '',
		key: '',
		checked: false,
		disabled: false,
		state: 0
	},
	{
		model: '',
		name: '全自费',
		value: '',
		key: '',
		checked: false,
		disabled: false,
		state: 0
	},
	{
		model: '',
		name: '其他',
		value: '',
		key: '',
		checked: false,
		disabled: false,
		isInput: true
	}
]
const ywgms = [{
		model: '',
		name: '无',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '青霉素',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '磺胺',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '链霉素',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '其他',
		key: '',
		checked: false,
		disabled: false
	}
]
const bls = [{
		model: '',
		name: '无',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '化学品',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '毒物',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '射线',
		key: '',
		checked: false,
		disabled: false
	}
]
const tsrqfl = {
	model: '',
	placeholder: '请选择',
	type: 'text',
	select_icon: '\ue65a',
	required_icon: '',
	key: 'special_type',
	disabled: true,
	required: false
}
const rqfl = [{
		model: '',
		name: '一般人群',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '儿童',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '孕产妇',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '老年人',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '严重精神障碍',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '高血压',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '糖尿病',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '冠心病',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '脑卒中',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '肺结核',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '艾滋病',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '残疾人',
		key: '',
		checked: false,
		disabled: false
	}
]
const jb = [{
	title: '疾病',
	list: [{
			name: '无',
			key: '',
			checked: false,
			disabled: true
		},
		{
			name: '高血压',
			time: '确诊时间',
			desc: '描述',
			model_time: '',
			model_desc: '',
			key: '',
			name_type: 'text',
			time_type: 'text',
			checked: false,
			disabled: true
		},
		{
			name: '糖尿病',
			time: '确诊时间',
			desc: '描述',
			model_time: '',
			model_desc: '',
			key: '',
			name_type: 'text',
			time_type: 'text',
			checked: false,
			disabled: true
		},
		{
			name: '冠心病',
			time: '确诊时间',
			desc: '描述',
			model_time: '',
			model_desc: '',
			key: '',
			name_type: 'text',
			time_type: 'text',
			checked: false,
			disabled: true
		},
		{
			name: '慢性阻塞性肺疾病',
			time: '确诊时间',
			desc: '描述',
			model_time: '',
			model_desc: '',
			key: '',
			name_type: 'text',
			time_type: 'text',
			checked: false,
			disabled: true
		},
		{
			name: '恶性肿瘤',
			time: '确诊时间',
			desc: '描述',
			model_time: '',
			model_desc: '',
			key: '',
			name_type: 'text',
			time_type: 'text',
			checked: false,
			disabled: true
		},
		{
			name: '脑卒中',
			time: '确诊时间',
			desc: '描述',
			model_time: '',
			model_desc: '',
			key: '',
			name_type: 'text',
			time_type: 'text',
			checked: false,
			disabled: true
		},
		{
			name: '严重精神障碍',
			time: '确诊时间',
			desc: '描述',
			model_time: '',
			model_desc: '',
			key: '',
			name_type: 'text',
			time_type: 'text',
			checked: false,
			disabled: true
		},
		{
			name: '结核病',
			time: '确诊时间',
			desc: '描述',
			model_time: '',
			model_desc: '',
			key: '',
			name_type: 'text',
			time_type: 'text',
			checked: false,
			disabled: true
		},
		{
			name: '肝炎',
			time: '确诊时间',
			desc: '描述',
			model_time: '',
			model_desc: '',
			key: '',
			name_type: 'text',
			time_type: 'text',
			checked: false,
			disabled: true
		},
		{
			name: '其他法定传染病',
			time: '确诊时间',
			desc: '描述',
			model_time: '',
			model_desc: '',
			key: '',
			name_type: 'text',
			time_type: 'text',
			checked: false,
			disabled: true
		},
		{
			name: '职业病',
			time: '确诊时间',
			desc: '描述',
			model_time: '',
			model_desc: '',
			key: '',
			name_type: 'text',
			time_type: 'text',
			checked: false,
			disabled: true
		},
		{
			name: '其他',
			time: '确诊时间',
			desc: '描述',
			model_time: '',
			model_desc: '',
			key: '',
			name_type: 'text',
			time_type: 'text',
			checked: false,
			disabled: true
		}
	]
}]
const ss = [{
	title: '手术',
	list: [{
			name: '无',
			disabled: false
		},
		{
			name: '有',
			disabled: false
		}
	],
	input: [{
			name: '名称1',
			time: '时间1',
			name_placeholder: '请输入',
			time_placeholder: '请输入',
			name_key: '',
			time_key: '',
			model_name: '',
			model_time: '',
			name_type: 'text',
			time_type: 'text',
			disabled: true
		},
		{
			name: '名称2',
			time: '时间2',
			name_placeholder: '请输入',
			time_placeholder: '请输入',
			name_key: '',
			time_key: '',
			model_name: '',
			model_time: '',
			name_type: 'text',
			time_type: 'text',
			disabled: true
		},

	],
	value: ''
}]
const ws = [{
	title: '外伤',
	list: [{
			name: '无',
			disabled: false
		},
		{
			name: '有',
			disabled: false
		}
	],
	input: [{
			name: '名称1',
			time: '时间1',
			name_placeholder: '请输入',
			time_placeholder: '请输入',
			model_name: '',
			model_time: '',
			name_type: 'text',
			time_type: 'text',
			disabled: true
		},
		{
			name: '名称2',
			time: '时间2',
			name_placeholder: '请输入',
			time_placeholder: '请输入',
			model_name: '',
			model_time: '',
			name_type: 'text',
			time_type: 'text',
			disabled: true
		},

	],
	value: ''
}]
const sx = [{
	title: '输血',
	list: [{
			name: '无',
			disabled: false
		},
		{
			name: '有',
			disabled: false
		}
	],
	input: [{
			name: '原因1',
			time: '时间1',
			name_placeholder: '请输入',
			time_placeholder: '请输入',
			model_name: '',
			model_time: '',
			name_type: 'text',
			time_type: 'text',
			disabled: true
		},
		{
			name: '原因2',
			time: '时间2',
			name_placeholder: '请输入',
			time_placeholder: '请输入',
			model_name: '',
			model_time: '',
			name_type: 'text',
			time_type: 'text',
			disabled: true
		}
	],
	value: ''
}]
const ycbs = [{
	title: '遗传病史',
	list: [{
			name: '无',
			disabled: false
		},
		{
			name: '有',
			disabled: false
		}
	],
	input: [{
		name: '疾病名称',
		name_placeholder: '请输入',
		// name_key: '',
		model_name: '',
		name_type: 'text',
		time_type: 'text',
		disabled: true
	}],
	value: ''
}]
const cjqk = [{
		model: '',
		name: '无残疾',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '视力残疾',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '听力残疾',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '言语残疾',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '肢体残疾',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '智力残疾',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '精神残疾',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '其他残疾',
		key: '',
		checked: false,
		disabled: false
	}
]
const fq = [{
		model: '',
		name: '无',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '高血压',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '糖尿病',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '冠心病',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '慢性阻塞性肺疾病',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '恶性肿瘤',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '脑卒中',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '严重精神障碍',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '结核病',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '肝炎',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '先天畸形',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '其他',
		key: '',
		checked: false,
		disabled: false
	}
]
const mq = [{
		model: '',
		name: '无',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '高血压',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '糖尿病',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '冠心病',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '慢性阻塞性肺疾病',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '恶性肿瘤',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '脑卒中',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '严重精神障碍',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '结核病',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '肝炎',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '先天畸形',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '其他',
		key: '',
		checked: false,
		disabled: false
	}
]
const xdjm = [{
		model: '',
		name: '无',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '高血压',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '糖尿病',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '冠心病',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '慢性阻塞性肺疾病',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '恶性肿瘤',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '脑卒中',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '严重精神障碍',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '结核病',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '肝炎',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '先天畸形',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '其他',
		key: '',
		checked: false,
		disabled: false
	}
]
const zn = [{
		model: '',
		name: '无',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '高血压',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '糖尿病',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '冠心病',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '慢性阻塞性肺疾病',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '恶性肿瘤',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '脑卒中',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '严重精神障碍',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '结核病',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '肝炎',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '先天畸形',
		key: '',
		checked: false,
		disabled: false
	},
	{
		model: '',
		name: '其他',
		key: '',
		checked: false,
		disabled: false
	}
]
const zh = [{
		model: '',
		name: '厨房排风设施',
		placeholder: '请选择',
		type: 'select',
		select_icon: '\ue65a',
		required_icon: '',
		key: 'kitchen',
		style: 0,
		disabled: true,
		required: false
	},
	{
		model: '',
		name: '燃料类型',
		placeholder: '请选择',
		type: 'select',
		select_icon: '\ue65a',
		required_icon: '',
		key: 'fuel_type',
		style: 0,
		disabled: true,
		required: false
	},
	{
		model: '',
		name: '饮水',
		placeholder: '请选择',
		type: 'select',
		select_icon: '\ue65a',
		required_icon: '',
		key: 'water',
		style: 0,
		disabled: true,
		required: false
	},
	{
		model: '',
		name: '厕所',
		placeholder: '请选择',
		type: 'select',
		select_icon: '\ue65a',
		required_icon: '',
		key: 'toilet',
		style: 0,
		disabled: true,
		required: false
	},
	{
		model: '',
		name: '禽畜栏',
		placeholder: '请选择',
		type: 'select',
		select_icon: '\ue65a',
		required_icon: '',
		key: 'livestock',
		style: 0,
		disabled: true,
		required: false
	},
	{
		model: '',
		name: '本人签字',
		placeholder: '请输入',
		type: 'text',
		select_icon: '',
		required_icon: '\ue635',
		key: 'person_name',
		style: 0,
		disabled: false,
		required: true,
		icon: '\ue6a4'
	},
	{
		model: '',
		name: '家属签字',
		placeholder: '请输入',
		type: 'text',
		select_icon: '',
		required_icon: '',
		key: 'family_name',
		style: 0,
		disabled: false,
		required: false,
		icon: '\ue6a4'
	},
	{
		model: '',
		name: '确认时间',
		placeholder: '请选择',
		type: 'select',
		select_icon: '\ue65a',
		required_icon: '',
		key: 'create_time',
		style: 0,
		disabled: true,
		required: false
	},
]
// 生命体征
const vitalSigns = [{
		value: '1',
		label: '未死亡'
	},
	{
		value: '2',
		label: '已死亡'
	}
]
// 常驻类型
const residentType = [{
		value: '1',
		label: '户籍'
	},
	{
		value: '2',
		label: '非户籍'
	}
]
// 文化程度
const degreeOfEducation = [{
		value: '1',
		label: '研究生'
	},
	{
		value: '2',
		label: '大学本科'
	},
	{
		value: '3',
		label: '大学专科和专科学校'
	},
	{
		value: '4',
		label: '中等专业血压'
	},
	{
		value: '5',
		label: '技工学校'
	},
	{
		value: '6',
		label: '高中'
	},
	{
		value: '7',
		label: '初中'
	},
	{
		value: '8',
		label: '小学'
	},
	{
		value: '9',
		label: '文盲或半文盲'
	},
	{
		value: '10',
		label: '不详'
	}
]
// 血型
const bloodType = [{
		value: '1',
		label: 'A型'
	},
	{
		value: '2',
		label: 'B型'
	},
	{
		value: '3',
		label: 'O型'
	},
	{
		value: '4',
		label: 'AB型'
	},
	{
		value: '5',
		label: '不详'
	}
]
// RH阴性
const rhNegative = [{
		value: '1',
		label: '阴性'
	},
	{
		value: '2',
		label: '阳性'
	},
	{
		value: '3',
		label: '不祥'
	}
]
// 职业
const occupation = [{
		value: '1',
		label: '国家机关、党群组织、企业、事业单位负责人员'
	},
	{
		value: '2',
		label: '专业技术人员'
	},
	{
		value: '3',
		label: '办事人员和有关人员'
	},
	{
		value: '4',
		label: '商业、服务业人员'
	},
	{
		value: '5',
		label: '农、林、牧、渔、水利业生产人员'
	},
	{
		value: '6',
		label: '生产、运输设备操作人员、及有关人员'
	},
	{
		value: '7',
		label: '军人'
	},
	{
		value: '8',
		label: '不便分类的其他从类人员'
	},
	{
		value: '9',
		label: '无职业'
	}
]
// 婚姻状况
const maritalStatus = [{
		value: '1',
		label: '未婚'
	},
	{
		value: '2',
		label: '已婚'
	},
	{
		value: '3',
		label: '丧偶'
	},
	{
		value: '4',
		label: '离婚'
	},
	{
		value: '5',
		label: '未说明的婚姻状况'
	}
]
// 特殊人群分类
const tsrqflSelect = [
	{
		value: '1',
		label: '正常'
	},
	{
		value: '2',
		label: '计划生育特殊家庭'
	},
	{
		value: '3',
		label: '贫困人口'
	}
]
// 厨房排风设施
const cfpfss = [
	{
		value: '1',
		label: '无'
	},
	{
		value: '2',
		label: '油烟机'
	},
	{
		value: '3',
		label: '换气扇'
	},
	{
		value: '4',
		label: '烟囱'
	}
]
// 燃料类型
const rllx = [
	{
		value: '1',
		label: '液化气'
	},
	{
		value: '2',
		label: '煤'
	},
	{
		value: '3',
		label: '天然气'
	},
	{
		value: '4',
		label: '沼气'
	},
	{
		value: '5',
		label: '柴火'
	},
	{
		value: '6',
		label: '其他'
	}
]
// 禽畜栏
const qcl = [
	{
		value: '1',
		label: '无'
	},
	{
		value: '2',
		label: '单设'
	},
	{
		value: '3',
		label: '室内'
	},
	{
		value: '4',
		label: '室外'
	},
]
// 厕所
const cs = [
	{
		value: '1',
		label: '卫生厕所'
	},
	{
		value: '2',
		label: '一格或二格粪池式'
	},
	{
		value: '3',
		label: '马桶'
	},
	{
		value: '4',
		label: '露天粪坑'
	},
	{
		value: '5',
		label: '简易棚厕'
	}
]
// 饮水
const ys = [
	{
		value: '1',
		label: '自来水'
	},
	{
		value: '2',
		label: '经净化过滤的水'
	},
	{
		value: '3',
		label: '井水'
	},
	{
		value: '4',
		label: '河湖水'
	},
	{
		value: '5',
		label: '塘水'
	},
	{
		value: '6',
		label: '其他'
	}
]
export default {
	grxx,
	zffs,
	ywgms,
	bls,
	tsrqfl,
	rqfl,
	jb,
	ss,
	ws,
	sx,
	ycbs,
	cjqk,
	fq,
	mq,
	xdjm,
	zn,
	zh,
	vitalSigns,
	residentType,
	degreeOfEducation,
	bloodType,
	rhNegative,
	occupation,
	maritalStatus,
	tsrqflSelect,
	cfpfss,
	rllx,
	qcl,
	cs,
	ys
}
