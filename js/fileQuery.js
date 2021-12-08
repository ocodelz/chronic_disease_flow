const selectUploadStatus = [{
		value: '1',
		label: '已上传'
	},
	{
		value: '2',
		label: '未上传'
	}
]
const list = [{
		item: '姓名',
		model: '',
		placeholder: '',
		disabled: false,
		type: 'text',
		state: 0,
		key:'name'
	},
	{
		item: '责任医生',
		model: '',
		placeholder: '',
		disabled: false,
		type: 'text',
		state: 0,
		key:'docname'
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
		item: '人群类型',
		model: '',
		placeholder: '请选择人群类型',
		disabled: true,
		type: 'select',
		state: 0
	},
	{
		item: '出生日期',
		model: '',
		mode1: '',
		placeholder: '',
		disabled: true,
		type: 'select',
		state: 1,
		key: 's_birthdate',
		keys: 'e_birthdate'
	},
	{
		item: '建档日期',
		model: '',
		mode1: '',
		placeholder: '',
		disabled: true,
		type: 'select',
		state: 1,
		key: 's_create_time',
		keys: 'e_create_time'
	},
	{
		item: '上传状态',
		model: '',
		placeholder: '请选择',
		disabled: true,
		type: 'select',
		state: 0
	}
]
const selectPopulationType = [
	{
		name: '一般人群',
		checked: false,
		disabled: false
	},
	{
		name: '高血压',
		checked: false,
		disabled: false
	},
	{
		name: '儿童',
		checked: false,
		disabled: false
	},
	{
		name: '孕产妇',
		checked: false,
		disabled: false
	},
	{
		name: '老年人',
		checked: false,
		disabled: false
	},
	{
		name: '糖尿病',
		checked: false,
		disabled: false
	},
	{
		name: '精神病',
		checked: false,
		disabled: false
	},
	{
		name: '冠心病',
		checked: false,
		disabled: false
	},
	{
		name: '脑卒中',
		checked: false,
		disabled: false
	},
	{
		name: '肺结核',
		checked: false,
		disabled: false
	},
	{
		name: '艾滋病',
		checked: false,
		disabled: false
	}
]
export default {
	selectUploadStatus,
	list,
	selectPopulationType
}
