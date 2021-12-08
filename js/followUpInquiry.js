const list = [{
		item: '随访类型',
		model: '',
		placeholder: '',
		disabled: true,
		type: 'select',
		state: 0,
		key: 'follow_type'
	},
	{
		item: '身份证号',
		model: '',
		placeholder: '',
		disabled: false,
		type: 'text',
		state: 0,
		key: 'idcard'
	},
	{
		item: '随访日期',
		model: '',
		mode1: '',
		placeholder: '',
		disabled: true,
		type: 'select',
		state: 0,
		key: 's_follow_time',
		keys: 'e_follow_time'
	},
	{
		item: '姓名',
		model: '',
		placeholder: '',
		disabled: false,
		type: 'select',
		state: 0,
		key: 'name'
	},
	{
		item: '随访医生',
		model: '',
		mode1: '',
		placeholder: '',
		disabled: false,
		type: 'select',
		state: 1,
		key: 'follow_doctor_name'
	},
	{
		item: '下次随访日期',
		model: '',
		mode1: '',
		placeholder: '',
		disabled: true,
		type: 'select',
		state: 1,
		key: 'snext_follow_time',
		keys: 'enext_follow_time'
	},
	{
		item: '上传状态',
		model: '',
		placeholder: '请选择',
		disabled: true,
		type: 'select',
		state: 0,
		key: 'upload_status'
	}
]
// 上传状态 select
const selectUploadStatus = [{
		value: '1',
		label: '已上传'
	},
	{
		value: '2',
		label: '未上传'
	}
]
const selectPopulationType = [{
		name: '高血压随访',
		checked: false,
		disabled: false
	},
	{
		name: '儿童健康随访',
		checked: false,
		disabled: false
	},
	{
		name: '孕产妇随访',
		checked: false,
		disabled: false
	},
	{
		name: '老年人中医药随访',
		checked: false,
		disabled: false
	},
	{
		name: '老年人自理能力评估',
		checked: false,
		disabled: false
	},
	{
		name: '糖尿病随访',
		checked: false,
		disabled: false
	},
	{
		name: '精神病随访',
		checked: false,
		disabled: false
	},
	{
		name: '冠心病随访',
		checked: false,
		disabled: false
	},
	{
		name: '脑卒中随访',
		checked: false,
		disabled: false
	},
	{
		name: '肺结核随访',
		checked: false,
		disabled: false
	},
	{
		name: '艾滋病随访',
		checked: false,
		disabled: false
	},
	{
		name: '高血压高危随访',
		checked: false,
		disabled: false
	},
	{
		name: '残疾人随访',
		checked: false,
		disabled: false
	},
	{
		name: '中医药高血压',
		checked: false,
		disabled: false
	},
	{
		name: '中医药糖尿病',
		checked: false,
		disabled: false
	},
	{
		name: '65岁以下中医体质辨识',
		checked: false,
		disabled: false
	}
]
export default {
	list,
	selectUploadStatus,
	selectPopulationType
}