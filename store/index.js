import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		basicSettingsList: [{
				name: '默认下次随访日期天数',
				value: '30',
				key: 'next_follow_day'
			},
			{
				name: '控制不满意时显示的下次随访日期天数',
				value: '50',
				key: 'dissatisfied_follow_day'
			},
			{
				name: '控制满意时显示的下次随访日期天数',
				value: '15',
				key: 'satisfied_follow_day'
			},
			{
				name: '是否显示摄像',
				value: '是',
				select: '\ue65a',
				disabled: true,
				key: 'is_camera'
			},
			{
				name: '老年人年龄判断',
				value: '65',
				key: 'elder_age'
			},
			{
				name: '年龄的计算方式',
				value: '精确到年',
				key: 'age_calculation'
			}
		],
		tjsfList: [{
				name: '切换用户时，是否提示保存',
				value: '是',
				select: '\ue65a',
				disabled: true,
				key: 'switchuser_save'
			},
			{
				name: '未完善完全信息时是否进行提示',
				value: '是',
				select: '\ue65a',
				disabled: true,
				key: 'lack_info_save'
			},
			{
				name: '是否默认显示最后一次随访信息',
				value: '否',
				select: '\ue65a',
				disabled: true,
				key: 'is_finally_follow'
			},
			{
				name: '是否展示结核病以及中医辨识部分',
				value: '否',
				select: '\ue65a',
				disabled: true,
				key: 'is_tuberculosis'
			},
			{
				name: '展示肺结核年龄',
				value: '70',
				key: 'ruberculosis_age'
			},
			{
				name: '是否开启复查',
				value: '是',
				select: '\ue65a',
				disabled: true,
				key: 'is_review'
			},
			{
				name: '腰围计算是否开启',
				value: '否',
				select: '\ue65a',
				disabled: true,
				key: 'is_waist_calculation'
			},
			{
				name: '腰围计算公式',
				value: '',
				select: '\ue65a',
				disabled: true,
				key: 'waist_calculation'
			},
			{
				name: '呼吸频率计算是否开启',
				value: '否',
				select: '\ue65a',
				disabled: true,
				key: 'is_breathe_calculation'
			},
			{
				name: '健康体检减体重限制',
				value: '关闭',
				select: '\ue65a',
				disabled: true,
				key: 'weight_loss_limit'
			},
			{
				name: '减体重限制减少值',
				value: '2',
				key: 'weight_loss_val'
			},
			{
				name: '食盐摄入是否显示',
				value: '否',
				select: '\ue65a',
				disabled: true,
				key: 'is_salt'
			},
			{
				name: '健康体检中的小结是否显示',
				value: '否',
				select: '\ue65a',
				disabled: true,
				key: 'is_brief_summary'
			},
			{
				name: '用法',
				value: '口服,外敷,皮下注射',
				key: 'usage'
			},
			{
				name: '用药频次',
				value: '每日一次,每日两次,每日三次,隔日一次,每周一次,每周两次,每周三次,隔周一次,每两周一次,每三周一次,每四周一次',
				key: 'med_frequency'
			},
			{
				name: '用量',
				value: '2,3,4',
				key: 'consumption'
			},
			{
				name: '单位',
				value: 'mg,ml,片',
				key: 'unit'
			},
			{
				name: '精神病随访是否显示本次随访对象',
				value: '不显示',
				select: '\ue65a',
				disabled: true,
				key: 'is_psychosis_follow_object'
			},
			{
				name: '精神病随访中用药情况及用药指导版本',
				value: '国家版',
				select: '\ue65a',
				disabled: true,
				key: 'psychosis_guidance_version'
			},
			{
				name: '精神病随访中转诊版本',
				value: '国家版',
				select: '\ue65a',
				disabled: true,
				key: 'psychosis_referral_version',
			},
			{
				name: '高血压随访中是否显示新发合并症',
				value: '否',
				select: '\ue65a',
				disabled: true,
				key: 'is_new_complications'
			},
			{
				name: '高血压随访中是否显示诊断',
				value: '否',
				select: '\ue65a',
				disabled: true,
				key: 'is_diagnosis'
			},
			{
				name: '健康指导的无是否显示',
				value: '否',
				select: '\ue65a',
				disabled: true,
				key: 'is_health_guidance'
			},
			{
				name: '高血压随访中是否显示生活方式指导',
				value: '否',
				select: '\ue65a',
				disabled: true,
				key: 'is_lifestyle'
			},
			{
				name: '高血压随访中用药情况及用药指导版本',
				value: '国家版',
				select: '\ue65a',
				disabled: true,
				key: 'hypertension_guidance_version'
			},
			{
				name: '体检中血压默认左右手',
				value: '左侧',
				select: '\ue65a',
				disabled: true,
				key: 'default_hand'
			},
			{
				name: '是否默认老年人自理能力评估',
				value: '是',
				select: '\ue65a',
				disabled: true,
				key: 'is_default_ability'
			},
			{
				name: '老年人中医药管理中选中某体质是否默认文字',
				value: '否',
				select: '\ue65a',
				disabled: true,
				key: 'is_default_character'
			},
			{
				name: '是否开启开年人中医药保健指导勾选',
				value: '是',
				select: '\ue65a',
				disabled: true,
				key: 'is_care_instruction'
			}
		],
		lxUserInfo: uni.getStorageSync('lx_user_info')
	},
	mutations: {
		// 更改用户登录状态
		uploadUserLxInfo(state, params) {
			state.lxUserInfo = params;
			try {
				uni.setStorageSync('lx_user_info', params)
			} catch (e) {
				// console.log(e);
			}
		},
		// 更改系统设置(基本设置)
		basicSettingsList(state, params) {
			state.basicSettingsList = params;
		},
		// 更改系统设置(体检及随访设置)
		tjsfList(state, params) {
			state.tjsfList = params;
		}
	}
})

export default store
