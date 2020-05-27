<script>
export default {
	globalData: {
		user:{},
		name:'',//用户姓名
		type:'',//值班类型
		unionid: '251827673421699472',//用户唯一id
		showType:'',
	},
	onLaunch() {
		console.log('App Launch');
		if(!this.globalData.name){
			uni.redirectTo({
				url: './pages/ddLogin/index'
			});
		}
	},
	onShow() {
		console.log('App Show');
		console.log('全局参数----',this.globalData)
		
	},
	onHide() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
page {
	background: #ececec;
}
/* #endif */
</style>
