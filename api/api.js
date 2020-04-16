const host = "http://60.190.10.82";
const baseURL = host + ":10012/";
const ddBaseURL = host + ":10014/dingtalk/";

const api = {
	dd:{//钉钉相关接口
		in:ddBaseURL + 'login',//钉钉登录
	},
	ddUser:{//钉钉用户相关接口
		list:baseURL+'dd-user/getUsers',//钉钉用户列表
		dplist:baseURL+'dd-department/getDepartments',//钉钉部门列表
	},
	workReport:{//考勤记录管理及相关接口
		report:baseURL + 'work-record/report',//考勤报表
		list:baseURL +'work-record/list',//考勤列表
	}
}

export default api;
