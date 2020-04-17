<template>
	<view style="height: 100vh;overflow-y: auto;">
		<uni-list style="margin-bottom: 10px;">
			<uni-list-item :title="info.name" :rightText="info.type" :show-arrow="false"></uni-list-item>
		</uni-list>
		<uni-calendar class="changeDate" @dateClick="clickItem" :insert="true" :lunar="true" :showItem="true" @change="change"
		 :selected="dateInfo" @monthSwitch="monthChange"></uni-calendar>
		<uni-list v-if="info.onWork||info.offWork" style="margin-top: 10px;">
			<uni-list-item title="上班打卡时间" :rightText="info.onWork" :showArrow="false"></uni-list-item>
			<uni-list-item title="下班打卡时间" :rightText="info.offWork" :showArrow="false"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import tool from '../../util/tool';
	import main from '../../api/mounth';
	const App = getApp();

	export default {
		data() {
			return {
				info: {
					name: '', //姓名
					type: '', //类型
					onWork: '', //上班时间
					offWork: '', //下班时间
				},
				dateInfo: []
			};
		},
		created() {
			let time = tool.getTime(0); //获取当前时间
			console.log('现在是--------', time);
			let info = time.split('-');
			this.getCheckInfo({
				year: parseInt(info[0]),
				month: parseInt(info[1])
			});
			let app = App.$options.globalData;
			this.info.name = app.name;
			this.info.type = app.type;
		},
		methods: {
			//判断考勤的状态返回考勤的中文名称
			getStateName(state) {
				let obj = '';
				if (state === 1) {
					obj = '缺勤';
				} else if (state === 2) {
					obj = '出勤';
				} else if (state === 3) {
					obj = '迟到';
				} else if (state === 4) {
					obj = '早退';
				} else if (state === 5) {
					obj = '休息';
				} else if (state === 6) {
					obj = '迟到早退';
				} else if (state === 7) {
					obj = '上午缺勤';
				} else if (state === 8) {
					obj = '下午缺勤';
				} else if (state === 10) {
					obj = '请假';
				} else {
					obj = '--';
				}
				return obj;
			},
			getCheckInfo(info) {
				let {
					year,
					month
				} = info;
				let days = tool.getMonthDay(year, month);
				console.log(days);
				let workDateBegin = year + '-' + (month < 10 ? '0' + month : month) + '-01';
				let workDateEnd = year + '-' + (month < 10 ? '0' + month : month) + '-' + days;
				main.list({
						userUnionid: App.$options.globalData.unionid,
						workDateBegin,
						workDateEnd
					}).then(res => {
						console.log('返回的信息--------', res);
						let list = res.data;
						this.dateInfo = [];
						list.forEach(item => {
							this.dateInfo.push({
								date: item.workdate,
								info: this.getStateName(item.state),
								data: {
									onworktime: item.onworktime ? item.onworktime.split(' ')[1] : '', //上班时间
									offworktime: item.offworktime ? item.offworktime.split(' ')[1] : '' //下班时间
								}
							});
						});
					})
					.catch(err => {
						alert(err);
					});
			},
			change(e) {
				//点击具体的时间
				console.log('点击了时间', e);

				let info = e.extraInfo.data;
				this.info.onWork = info.onworktime;
				this.info.offWork = info.offworktime;

			},
			clickItem(e) {
				//点击了月份（暂留功能）
				console.log('点击了');
			},
			monthChange(e) {
				//月份改变时间监听
				console.log('月份改变--', e);
				this.getCheckInfo(e);
				// console.log(days);
			}
		}
	};
</script>

<style scoped></style>
