import utils from '@/common/utils.js';
// 随访日期 & 随访方式
const highRiskInformationOfHypertension = [{
		name: '随访日期',
		model: utils.formatTime(new Date),
		type: 'select',
		key: 'follow_time',
		required: true,
		placeholder: '请选择',
		disabled: true
	},
	{
		name: '随访方式',
		model: '',
		type: 'select',
		key: 'follow_method',
		required: true,
		placeholder: '请选择',
		disabled: true
	}
]
// 家庭膳食
const familyMeals = [{
		name: '过去三个月内,常住在家中一起吃饭的人数？（包括没有户籍但在您家居住的人，如亲戚、保姆等)',
		model: '',
		type: 'text',
		key: 'three_month_eat_count',
		required: true,
		placeholder: '人',
		disabled: false
	},
	{
		name: '其中一起吃饭的低于6岁的儿童有几人?',
		model: '',
		type: 'text',
		key: 'under_six_count',
		required: true,
		placeholder: '人',
		disabled: false
	},
	{
		name: '过去的3个月，您家平均一个月吃几克盐?',
		model: '',
		type: 'text',
		key: 'three_salt',
		required: true,
		placeholder: '克',
		disabled: false
	},
	{
		name: '过去的三个月，您家平均一个月能吃几克酱油?',
		model: '',
		type: 'text',
		key: 'three_soysauce',
		required: true,
		placeholder: '克',
		disabled: false
	}
]
// 个人膳食
const personalMeal = [
	{
		name: '咸蛋',
		radio: [{
				name: '是',
				disabled: false
			},
			{
				name: '否',
				disabled: false
			}
		],
		input: [{
				day: '',
				key:'day',
				item: '次/天',
				placeholder: '次',
				disabled: false
			},
			{
				week: '',
				key:'week',
				item: '次/周',
				placeholder: '次',
				disabled: false
			},
			{
				month: '',
				key:'month',
				item: '次/月',
				placeholder: '次',
				disabled: false
			},
			{
				average_dosage: '',
				key:'average_dosage',
				item: '平均每次',
				placeholder: '克',
				disabled: false
			}
		],
		value:'',
		keys:'xiandan'
	},
	{
		name: '咸鱼',
		radio: [{
				name: '是',
				disabled: false
			},
			{
				name: '否',
				disabled: false
			}
		],
		input: [{
				day: '',
				key:'day',
				item: '次/天',
				placeholder: '次',
				disabled: false
			},
			{
				week: '',
				key:'week',
				item: '次/周',
				placeholder: '次',
				disabled: false
			},
			{
				month: '',
				key:'month',
				item: '次/月',
				placeholder: '次',
				disabled: false
			},
			{
				average_dosage: '',
				key:'average_dosage',
				item: '平均每次',
				placeholder: '克',
				disabled: false
			}
		],
		value:'',
		keys:'xianyu'
	},
	{
		name: '虾皮',
		radio: [{
				name: '是',
				disabled: false
			},
			{
				name: '否',
				disabled: false
			}
		],
		input: [{
				day: '',
				key:'day',
				item: '次/天',
				placeholder: '次',
				disabled: false
			},
			{
				week: '',
				key:'week',
				item: '次/周',
				placeholder: '次',
				disabled: false
			},
			{
				month: '',
				key:'month',
				item: '次/月',
				placeholder: '次',
				disabled: false
			},
			{
				average_dosage: '',
				key:'average_dosage',
				item: '平均每次',
				placeholder: '克',
				disabled: false
			}
		],
		value:'',
		keys:'xiapi'
	},
	{
		name: '虾米',
		radio: [{
				name: '是',
				disabled: false
			},
			{
				name: '否',
				disabled: false
			}
		],
		input: [{
				day: '',
				key:'day',
				item: '次/天',
				placeholder: '次',
				disabled: false
			},
			{
				week: '',
				key:'week',
				item: '次/周',
				placeholder: '次',
				disabled: false
			},
			{
				month: '',
				key:'month',
				item: '次/月',
				placeholder: '次',
				disabled: false
			},
			{
				average_dosage: '',
				key:'average_dosage',
				item: '平均每次',
				placeholder: '克',
				disabled: false
			}
		],
		value:'',
		keys:'xiami'
	},
	{
		name: '方便面',
		radio: [{
				name: '是',
				disabled: false
			},
			{
				name: '否',
				disabled: false
			}
		],
		input: [{
				day: '',
				item: '次/天',
				key:'day',
				placeholder: '次',
				disabled: false
			},
			{
				week: '',
				item: '次/周',
				key:'week',
				placeholder: '次',
				disabled: false
			},
			{
				month: '',
				item: '次/月',
				key:'month',
				placeholder: '次',
				disabled: false
			},
			{
				average_dosage: '',
				key:'average_dosage',
				item: '平均每次',
				placeholder: '克',
				disabled: false
			}
		],
		value:'',
		keys:'fangbianmian'
	},
	{
		name: '豆腐乳',
		radio: [{
				name: '是',
				disabled: false
			},
			{
				name: '否',
				disabled: false
			}
		],
		input: [{
				day: '',
				key:'day',
				item: '次/天',
				placeholder: '次',
				disabled: false
			},
			{
				week: '',
				key:'week',
				item: '次/周',
				placeholder: '次',
				disabled: false
			},
			{
				month: '',
				key:'month',
				item: '次/月',
				placeholder: '次',
				disabled: false
			},
			{
				average_dosage: '',
				key:'average_dosage',
				item: '平均每次',
				placeholder: '克',
				disabled: false
			}
		],
		value:'',
		keys:'doufuru'
	},
	{
		name: '咸菜',
		radio: [{
				name: '是',
				disabled: false
			},
			{
				name: '否',
				disabled: false
			}
		],
		input: [{
				day: '',
				key:'day',
				item: '次/天',
				placeholder: '次',
				disabled: false
			},
			{
				week: '',
				key:'week',
				item: '次/周',
				placeholder: '次',
				disabled: false
			},
			{
				month: '',
				key:'month',
				item: '次/月',
				placeholder: '次',
				disabled: false
			},
			{
				average_dosage: '',
				key:'average_dosage',
				item: '平均每次',
				placeholder: '克',
				disabled: false
			}
		],
		value:'',
		keys:'xiancai'
	},
	{
		name: '辣椒酱',
		radio: [{
				name: '是',
				disabled: false
			},
			{
				name: '否',
				disabled: false
			}
		],
		input: [{
				day: '',
				key:'day',
				item: '次/天',
				placeholder: '次',
				disabled: false
			},
			{
				week: '',
				key:'week',
				item: '次/周',
				placeholder: '次',
				disabled: false
			},
			{
				month: '',
				key:'month',
				item: '次/月',
				placeholder: '次',
				disabled: false
			},
			{
				average_dosage: '',
				key:'average_dosage',
				item: '平均每次',
				placeholder: '克',
				disabled: false
			}
		],
		value:'',
		keys:'lajiaojiang'
	},
	{
		name: '虾酱',
		radio: [{
				name: '是',
				disabled: false
			},
			{
				name: '否',
				disabled: false
			}
		],
		input: [{
				day: '',
				key:'day',
				item: '次/天',
				placeholder: '次',
				disabled: false
			},
			{
				week: '',
				key:'week',
				item: '次/周',
				placeholder: '次',
				disabled: false
			},
			{
				month: '',
				key:'month',
				item: '次/月',
				placeholder: '次',
				disabled: false
			},
			{
				average_dosage: '',
				key:'average_dosage',
				item: '平均每次',
				placeholder: '克',
				disabled: false
			}
		],
		value:'',
		keys:'xiajiang'
	},
	{
		name: '甜面酱',
		radio: [{
				name: '是',
				disabled: false
			},
			{
				name: '否',
				disabled: false
			}
		],
		input: [{
				day: '',
				key:'day',
				item: '次/天',
				placeholder: '次',
				disabled: false
			},
			{
				week: '',
				key:'week',
				item: '次/周',
				placeholder: '次',
				disabled: false
			},
			{
				month: '',
				key:'month',
				item: '次/月',
				placeholder: '次',
				disabled: false
			},
			{
				average_dosage: '',
				key:'average_dosage',
				item: '平均每次',
				placeholder: '克',
				disabled: false
			}
		],
		value:'',
		keys:'tianmianjiang'
	},
	{
		name: '豆瓣酱',
		radio: [{
				name: '是',
				disabled: false
			},
			{
				name: '否',
				disabled: false
			}
		],
		input: [{
				day: '',
				key:'day',
				item: '次/天',
				placeholder: '次',
				disabled: false
			},
			{
				week: '',
				key:'week',
				item: '次/周',
				placeholder: '次',
				disabled: false
			},
			{
				month: '',
				key:'month',
				item: '次/月',
				placeholder: '次',
				disabled: false
			},
			{
				average_dosage: '',
				key:'average_dosage',
				item: '平均每次',
				placeholder: '克',
				disabled: false
			}
		],
		value:'',
		keys:'doubanjiang'
	}
]
// 体质
const constitution = [{
	name: '血压',
	model: '',
	mode1: '',
	key:'blood_pressure1',
	keys:'blood_pressure2',
	type: 'text',
	placeholder: '高压',
	placeholders: '低压',
	company: 'mmHg',
	icon: '...',
	connectionStatus: '连接成功...'
}]
// 生活方式及指导
const lifestyleAndGuidance = [
	{
		this_time: '日吸烟量',
		next_time: '下次随访目标',
		this_time_model: '',
		next_time_model:'',
		type: 'text',
		key: 'day_smoke',
		keys: 'target_smoke',
		required: false,
		placeholder: '支',
		disabled: false
	},
	{
		this_time: '日饮酒量',
		next_time:'下次随访目标',
		this_time_model: '',
		next_time_model:'',
		type: 'text',
		key: 'day_drink',
		keys: 'target_drink',
		required: false,
		placeholder: '两',
		disabled: false
	},
	{
		this_time: '运动',
		next_time:'下次随访目标',
		this_time_model: '',
		next_time_model: '',
		this_time_mode1:'',
		next_time_mode1:'',
		type: 'text',
		key: 'current_sport_frequency',
		keys: 'target_sport_frequency',
		current_sport_time:'current_sport_time',
		target_sport_time:'target_sport_time',
		required: false,
		placeholder: '次/周',
		placeholders: '分钟/次',
		disabled: false,
		style:0
	},
	{
		this_time: '摄盐情况',
		next_time:'下次随访目标',
		this_time_model: '',
		next_time_model:'',
		type: 'select',
		key: 'current_salt',
		keys: 'target_salt',
		required: false,
		placeholder: '请选择',
		disabled: true
	},
	{
		this_time: '食盐摄入量',
		this_time_model: '',
		type: 'text',
		key: 'salt',
		required: false,
		placeholder: '克',
		disabled: false
	},
	{
		this_time: '心理调整',
		this_time_model: '',
		type: 'select',
		key: 'mentally',
		required: false,
		placeholder: '请选择',
		disabled: true
	}
]
// 下次随访日期 & 随访医生
const followUpManagement = [{
		name: '下次随访日期：',
		model: '',
		type: 'select',
		key: 'next_follow_time',
		required: true,
		placeholder: '请选择',
		disabled: true
	},
	{
		name: '随访医生：',
		model: '',
		type: 'text',
		key: 'follow_doctor_name',
		required: false,
		placeholder: '请输入',
		disabled: false
	}
]
export default {
	highRiskInformationOfHypertension,
	familyMeals,
	personalMeal,
	constitution,
	lifestyleAndGuidance,
	followUpManagement
}