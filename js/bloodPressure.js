// 血压测量结果判断
const bloodPressure = [{
		result1: '低血压',
		result2: '低血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '低血压',
		bg: '#ccc'
	},
	{
		result1: '低血压',
		result2: '正常',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '低血压',
		bg: '#ccc'
	},
	{
		result1: '低血压',
		result2: '正常高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '低血压',
		bg: '#ccc'
	},
	{
		result1: '低血压',
		result2: '一级高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '低血压',
		bg: '#ccc'
	},
	{
		result1: '低血压',
		result2: '二级高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '低血压',
		bg: '#ccc'
	},
	{
		result1: '低血压',
		result2: '三级高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '异常',
		bg: '#f00'
	},
	{
		result1: '正常',
		result2: '低血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '低血压',
		bg: '#ccc'
	},
	{
		result1: '正常',
		result2: '正常',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '正常',
		bg: '#399561'
	},
	{
		result1: '正常',
		result2: '正常高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '正常高血压',
		bg: '#71d5a1'
	},
	{
		result1: '正常',
		result2: '一级高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '一级高血压',
		bg: '#dea234'
	},
	{
		result1: '正常',
		result2: '二级高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '二级高血压',
		bg: '#f00'
	},
	{
		result1: '正常',
		result2: '三级高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '三级高血压',
		bg: '#f00'
	},
	{
		result1: '正常高血压',
		result2: '低血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '低血压',
		bg: '#ccc'
	},
	{
		result1: '正常高血压',
		result2: '正常',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '正常高血压',
		bg: '#71d5a1'
	},
	{
		result1: '正常高血压',
		result2: '正常高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '正常高血压',
		bg: '#71d5a1'
	},
	{
		result1: '正常高血压',
		result2: '一级高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '一级高血压',
		bg: '#dea234'
	},
	{
		result1: '正常高血压',
		result2: '二级高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '二级高血压',
		bg: '#f00'
	},
	{
		result1: '正常高血压',
		result2: '三级高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '三级高血压',
		bg: '#f00'
	},
	{
		result1: '一级高血压',
		result2: '低血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '低血压',
		bg: '#ccc'
	},
	{
		result1: '一级高血压',
		result2: '正常',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '一级高血压',
		bg: '#dea234'
	},
	{
		result1: '一级高血压',
		result2: '正常高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '一级高血压',
		bg: '#dea234'
	},
	{
		result1: '一级高血压',
		result2: '一级高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '一级高血压',
		bg: '#dea234'
	},
	{
		result1: '一级高血压',
		result2: '二级高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '二级高血压',
		bg: '#f00'
	},
	{
		result1: '一级高血压',
		result2: '三级高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '三级高血压',
		bg: '#f00'
	},
	{
		result1: '二级高血压',
		result2: '低血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '低血压',
		bg: '#ccc'
	},
	{
		result1: '二级高血压',
		result2: '正常',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '二级高血压',
		bg: '#f00'
	},
	{
		result1: '二级高血压',
		result2: '正常高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '二级高血压',
		bg: '#f00'
	},
	{
		result1: '二级高血压',
		result2: '一级高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '二级高血压',
		bg: '#f00'
	},
	{
		result1: '二级高血压',
		result2: '二级高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '二级高血压',
		bg: '#f00'
	},
	{
		result1: '二级高血压',
		result2: '三级高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '三级高血压',
		bg: '#f00'
	},
	{
		result1: '三级高血压',
		result2: '低血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '异常',
		bg: '#f00'
	},
	{
		result1: '三级高血压',
		result2: '正常',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '三级高血压',
		bg: '#f00'
	},
	{
		result1: '三级高血压',
		result2: '正常高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '三级高血压',
		bg: '#f00'
	},
	{
		result1: '三级高血压',
		result2: '一级高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '三级高血压',
		bg: '#f00'
	},
	{
		result1: '三级高血压',
		result2: '二级高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '三级高血压',
		bg: '#f00'
	},
	{
		result1: '三级高血压',
		result2: '三级高血压',
		compulate: function(num1, num2, szyNum1, szyNum2, ssyNum1, ssyNum2) {
			return (num1 >= ssyNum1 && num1 <= ssyNum2) && (num2 >= szyNum1 && num2 <= szyNum2);
		},
		result: '三级高血压',
		bg: '#f00'
	}
];
// 收缩压
const systolicPressure = [{
		result: '低血压',
		compulate: function(ssy, num1, num2) {
			return (ssy <= num2);
		},
		color: '#ccc'
	},
	{
		result: '正常',
		compulate: function(ssy, num1, num2) {
			return (ssy >= num1 && ssy <= num2);
		},
		color: '#399561'
	},
	{
		result: '正常高血压',
		compulate: function(ssy, num1, num2) {
			return (ssy >= num1 && ssy <= num2);
		},
		color: '#71d5a1'
	},
	{
		result: '一级高血压',
		compulate: function(ssy, num1, num2) {
			return (ssy >= num1 && ssy <= num2);
		},
		color: '#dea234'
	},
	{
		result: '二级高血压',
		compulate: function(ssy, num1, num2) {
			return (ssy >= num1 && ssy <= num2);
		},
		color: '#f00'
	},
	{
		result: '三级高血压',
		compulate: function(ssy, num1, num2) {
			return (ssy >= num1);
		},
		color: '#f00'
	},
]
// 舒张压
const diastolicPressure = [{
		result: '低血压',
		compulate: function(szy, num1, num2) {
			return (szy <= num2);
		},
		color: '#ccc'
	},
	{
		result: '正常',
		compulate: function(szy, num1, num2) {
			return (szy >= num1 && szy <= num2);
		},
		color: '#399561'
	},
	{
		result: '正常高血压',
		compulate: function(szy, num1, num2) {
			return (szy >= num1 && szy <= num2);
		},
		color: '#71d5a1'
	},
	{
		result: '一级高血压',
		compulate: function(szy, num1, num2) {
			return (szy >= num1 && szy <= num2);
		},
		color: '#dea234'
	},
	{
		result: '二级高血压',
		compulate: function(szy, num1, num2) {
			return (szy >= num1 && szy <= num2);
		},
		color: '#f00'
	},
	{
		result: '三级高血压',
		compulate: function(szy, num1, num2) {
			return (szy >= num1);
		},
		color: '#f00'
	}
]
// 心率
const heart = [{
		result: '心率慢',
		compulate: function(pulseResult, num1, num2) {
			return (pulseResult <= num2);
		},
		background: '#e1a12f',
		_result: '心率慢'
	},
	{
		result: '正常',
		compulate: function(pulseResult, num1, num2) {
			return (pulseResult >= num1 && pulseResult <= num2);
		},
		background: '#399561',
		_result: '正常'
	},
	{
		result: '心率快',
		compulate: function(pulseResult, num1, num2) {
			return (pulseResult >= num1);
		},
		background: '#f00',
		_result: '心率快'
	}
]
export default {
	// result,
	bloodPressure,
	systolicPressure,
	diastolicPressure,
	heart
}
