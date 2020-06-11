<template>
	<view class="container">
		<view class="top">
			<view class="clickBox">
				<view @click="cWeek" :class="['boxItem', isClick ? 'isClick' : '']">周</view>
				<view @click="cMouth" :class="['boxItem', !isClick ? 'isClick' : '']">月</view>
			</view>

			<block v-if="!isClick">
				<uni-calendar class="changeDate" @dateClick="clickItem" :insert="true" :lunar="true" :showItem="false" @change="change" @monthSwitch="monthChange"></uni-calendar>
			</block>
			<block v-else>
				<view v-if="isClick" class="weekNow">本周</view>
			</block>
			
		</view>
		<uni-list style="margin-bottom: 10px;">
			<uni-list-item :title="info.name" :rightText="info.type" :show-arrow="false"></uni-list-item>
		</uni-list>
		<!-- 一般用法 -->
		<uni-list>
			<template  v-for="(list,index) in totalState">
				<uni-list-item :key="index" :title="stateName[list.state]"  :rightText="list.num + ' 天'" />
			</template>
		</uni-list>
	</view>
</template>

<script>
import tool from '../../util/tool.js';
import main from '../../api/index.js';
const App= getApp();

export default {
	data() {
		return {
			info: {
				name: '', //姓名
				type: '' ,//类型
			},
			isClick: true,
			href: 'https://uniapp.dcloud.io/collocation/pages?id=easycom',
			stateName:{
				 1: '缺勤',
				 2: '出勤',
				 3: '迟到',
				 4: '早退',
				 5: '休息',
				 6: '迟到早退',
				 7: '上午缺勤',
				 8: '下午缺勤',
				 10: '事假',
				 11: '调休',
				 12: '病假',
				 13: '产假',
				 14: '陪产假',
				 15: '婚假',
				 16: '例假',
				 17: '丧假',
				 18: '年假',
				 19: '出差',
				 20: '外出',
			},
			totalState:[]
		};
	},
	created() {
		console.log("app------",App);
		// App.$options.globalData.unionid = '346778888888'
		let app = App.$options.globalData;
		this.info.name = app.name;
		this.info.type = app.type;
		// alert(App.$options.globalData.unionid+);
		
		
		let weekList = tool.getWeekStartAndEnd(); //获取当前周的开始日期和结束日期
		console.log(weekList);
		//alert(`${App.$options.globalData.unionid}-------${ weekList[0]}=======${ weekList[1]}`);
		this.getInfo({ begin: weekList[0], end: weekList[1] }, 2);
	},
	methods: {
		//获取具体的考勤信息
		getInfo(info, type = 1) {
			let workDateBegin;
			let workDateEnd;

			if (type === 1) {
				let { year, month } = info;
				let days = tool.getMonthDay(year, month);
				console.log(days);
				workDateBegin = year + '-' + (month < 10 ? '0' + month : month) + '-01';
				workDateEnd = year + '-' + (month < 10 ? '0' + month : month) + '-' + days;
			} else if (type === 2) {
				let { begin, end } = info;
				workDateBegin = begin;
				workDateEnd = end;
			}

			main.list({ userUnionid:App.$options.globalData.unionid, workDateBegin, workDateEnd })
				.then(res => {
					console.log('调用成功', res);
					this.totalState = res
				})
				.catch(err => {
					alert(err);
					//console.error('调用数百----', err);
				});
		},
		change(e) {
			//点击具体的时间
			console.log(e);
		},
		clickItem(e) {
			//点击了月份（暂留功能）
			console.log('点击了');
		},
		monthChange(e) {
			//月份改变时间监听
			console.log('月份改变--', e);
			this.getInfo(e);
			// console.log(days);
		},
		cWeek() {
			//点击了周
			this.isClick = true;
			let weekList = tool.getWeekStartAndEnd(); //获取当前周的开始日期和结束日期
			console.log(weekList);
			this.getInfo({ begin: weekList[0], end: weekList[1] }, 2);
		},
		cMouth() {
			//点击了月
			this.isClick = false;

			let time = tool.getTime(0); //获取当前时间
			console.log('现在是--------', time);
			let info = time.split('-');

			this.getInfo({
				year: parseInt(info[0]),
				month: parseInt(info[1])
			});
		}
	}
};
</script>

<style scoped>
.intro {
	font-size: 14px;
	line-height: 24px;
}
.changeDate {
	position: absolute;
	right: -10rpx;
	top: 1%;
}
.top {
	position: relative;
	margin-bottom: 20rpx;
	width: 100%;
	height: 110rpx;
	background-color: #ffffff;
}
.clickBox {
	position: absolute;
	top: 22%;
	left: 4%;
	border: 1rpx solid #007aff;
	width: 230rpx;
	height: 60rpx;
}
.boxItem {
	display: inline-block;
	/* border: 1px solid #007AFF; */
	width: 50%;
	height: 100%;
	line-height: 60rpx;
	text-align: center;
}

.isClick {
	background-color: #007aff;
	color: #ffffff;
}
.myInfo {
	width: 100%;
	height: 70px;
	background-color: white;
	/* border-bottom: 1px solid ; */
}
.weekNow {
	width: 30%;
	height: 100%;
	line-height: 110rpx;
	position: absolute;
	right: -20rpx;
}
</style>
