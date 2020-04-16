import api from './api.js';
import request from '../util/request.js';

// const api = require('./api.js');
// const request = require('../util/request.js');

//dd登录
const login = (data) => {
	// console.log('api------', api.workReport.report);
	return request({
		url: api.dd.in,
		method: 'GET',
		data
	})
}


//获取所有钉钉用户
const list = (data) => {
	// console.log('api------', api.workReport.report);
	return request({
		url: api.ddUser.list,
		method: 'GET',
		data
	})
}
//获取所有钉钉部门
const dplist = (data) => {
	// console.log('api------', api.workReport.report);
	return request({
		url: api.ddUser.dplist,
		method: 'GET',
		data
	})
}




export default {
	login,
	list,
	dplist
}
