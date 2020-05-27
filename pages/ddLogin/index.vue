<template>
	<view></view>
	<!-- <view v-loading="loading" :element-loading-text="errLogin" style="width: 100%;height: 100%;"></view> -->
</template>

<script>
// import main from '@/api/ddLogin';
import main from '../../api/ddLogin';
import * as dd from 'dingtalk-jsapi';

const app = getApp();

export default {
	name: 'ddLogin',
	onLoad(option) {
		console.log();
		app.$options.globalData.showType = option.type;
	},
	data() {
		return {
			loading: true,
			errLogin: '正在自动登录中.......'
		};
	},
	methods: {
		testLogin() {
			let testJson = {
				departmentId: 148824287,
				id: 15,
				authtype: 2,
				locked: false,
				name: 'admin',
				street: '',
				placepoint: 'admin,--',
				unionid: '212640673021199344'
			};
			sessionStorage.setItem('ms_userInfo', JSON.stringify(testJson)); //登录用户姓名
			this.toLoginIng(); //跳转页面
		},
		toLoginIng() {
			uni.hideLoading();
			uni.redirectTo({
				url: '../../pages/home/index'
			});
			// let isPC = this.$ValidateUtil.IsPC();
			// if (isPC) {
			//     this.$router.push('/dashboard');//跳转到PC系统首页
			// } else {
			//     this.$router.push('/home');//跳转到手机系统首页
			// }
		}
	},
	mounted() {
		const _this = this;
		// this.testLogin();
		uni.showLoading({
			title: '自动登录中'
		});
		dd.ready(() => {
			// dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
			dd.runtime.permission.requestAuthCode({
				corpId: 'dinga20b46a54924871d35c2f4657eb6378f',
				onSuccess: function(result) {
					let code = result.code;
					// _this.code = code;
					_this.errLogin = code;
					Promise.all([main.list(), main.dplist(), main.login({ code: result.code })])
						.then(res2 => {
							console.log('返回得数就好---------', res2);
							let ddUnionid = res2[2].data;
							let userList = res2[0].data;
							let dpList = res2[1].data;
							let userInfo = userList.find(j => j.unionid === ddUnionid); //用户所有信息
							let dpinfo = dpList.find(j => userInfo.departmentId === j.departmentId); //获取部门名称
							let { name } = dpinfo ? dpinfo : { name: '' };
							userInfo.dpname = name;
							app.$options.globalData.user = { ...userInfo };
							app.$options.globalData.name = userInfo.name;
							app.$options.globalData.type = name;
							app.$options.globalData.unionid = ddUnionid;

							_this.toLoginIng(); //跳转页面
						})
						.catch(err => {
							alert(err);
						});
				},
				onFail: function(err) {
					dd.device.notification.alert({
						message: err,
						title: '错误', //可传空
						buttonName: '好的',
						onSuccess: function() {
							//onSuccess将在点击button之后回调
							/*回调*/
						},
						onFail: function(err) {}
					});
				}
			});
		});

		if (dd.env.platform == 'notInDingTalk') {
		}
	}
};
</script>

<style scoped></style>
