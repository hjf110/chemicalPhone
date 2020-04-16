import api from './api.js';
import request from '../util/request.js';

// const api = require('./api.js');
// const request = require('../util/request.js');

const list = (data) => {
	console.log('api------', api.workReport.report);
	return request({
		url: api.workReport.report,
		method: 'POST',
		data
	})
}


export default {
	list
}
