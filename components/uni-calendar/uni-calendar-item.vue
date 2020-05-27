<template>
	<view
		class="uni-calendar-item__weeks-box"
		:class="{
			'uni-calendar-item--disable': weeks.disable,
			'uni-calendar-item--isDay': calendar.fullDate === weeks.fullDate && weeks.isDay,
			'uni-calendar-item--checked': calendar.fullDate === weeks.fullDate && !weeks.isDay,
			'uni-calendar-item--multiple': weeks.multiple
		}"
		@click="choiceDate(weeks)"
	>
		<view class="uni-calendar-item__weeks-box-item">
			<text v-if="selected && weeks.extraInfo" :class="['uni-calendar-item__weeks-box-circle',`date-state-${getStateName(weeks.extraInfo.info)}`]"></text>
			<text
				class="uni-calendar-item__weeks-box-text"
				:class="{
					'uni-calendar-item--isDay-text': weeks.isDay,
					'uni-calendar-item--isDay': calendar.fullDate === weeks.fullDate && weeks.isDay,
					'uni-calendar-item--checked': calendar.fullDate === weeks.fullDate && !weeks.isDay,
					'uni-calendar-item--multiple': weeks.multiple,
					'uni-calendar-item--disable': weeks.disable
				}"
			>
				{{ weeks.date }}
			</text>
			<text
				v-if="!lunar && !weeks.extraInfo && weeks.isDay"
				class="uni-calendar-item__weeks-lunar-text"
				:class="{
					'uni-calendar-item--isDay-text': weeks.isDay,
					'uni-calendar-item--isDay': calendar.fullDate === weeks.fullDate && weeks.isDay,
					'uni-calendar-item--checked': calendar.fullDate === weeks.fullDate && !weeks.isDay,
					'uni-calendar-item--multiple': weeks.multiple
				}"
			>
				今天
			</text>
			<text
				v-if="lunar && !weeks.extraInfo"
				class="uni-calendar-item__weeks-lunar-text"
				:class="{
					'uni-calendar-item--isDay-text': weeks.isDay,
					'uni-calendar-item--isDay': calendar.fullDate === weeks.fullDate && weeks.isDay,
					'uni-calendar-item--checked': calendar.fullDate === weeks.fullDate && !weeks.isDay,
					'uni-calendar-item--multiple': weeks.multiple,
					'uni-calendar-item--disable': weeks.disable
				}"
			>
				{{ weeks.isDay ? '今天' : weeks.lunar.IDayCn === '初一' ? weeks.lunar.IMonthCn : weeks.lunar.IDayCn }}
			</text>
			<text
				v-if="weeks.extraInfo && weeks.extraInfo.info"
				class="uni-calendar-item__weeks-lunar-text"
				:class="{
					'uni-calendar-item--extra': weeks.extraInfo.info,
					'uni-calendar-item--isDay-text': weeks.isDay,
					'uni-calendar-item--isDay': calendar.fullDate === weeks.fullDate && weeks.isDay,
					'uni-calendar-item--checked': calendar.fullDate === weeks.fullDate && !weeks.isDay,
					'uni-calendar-item--multiple': weeks.multiple,
					'uni-calendar-item--disable': weeks.disable
				}"
			>
			<span :class="[`date-text-${getStateName(weeks.extraInfo.info)}`]">{{ weeks.extraInfo.info }}</span>	 
			</text>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		weeks: {
			type: Object,
			default() {
				return {};
			}
		},
		calendar: {
			type: Object,
			default: () => {
				return {};
			}
		},
		selected: {
			type: Array,
			default: () => {
				return [];
			}
		},
		lunar: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		choiceDate(weeks) {
			this.$emit('change', weeks);
		},
		getStateName(state) {
			let obj = '';
			if (state === '缺勤') {
				obj = 1;
			} else if (state === '出勤') {
				obj = 2;
			} else if (state === '迟到') {
				obj = 3;
			} else if (state === '早退') {
				obj = 4;
			} else if (state === '休息') {
				obj = 5;
			} else if (state === '迟到早退') {
				obj = 6;
			} else if (state === '上午缺勤') {
				obj = 7;
			} else if (state === '下午缺勤') {
				obj = 8;
			} else if (state === '请假') {
				obj = 10;
			} else {
				obj = 100;
			}
			return obj;
		},
		
	},
	created() {
		// console.log('weeks----------------------',this.weeks)
		// // console.log('calendar------------------',this.calendar)
		// console.log('selected------------------',this.selected)
	}
};
</script>

<style scoped>
.uni-calendar-item__weeks-box {
	flex: 1;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.uni-calendar-item__weeks-box-text {
	font-size: 28rpx;
	color: #333;
}

.uni-calendar-item__weeks-lunar-text {
	font-size: 24rpx;
	color: #333;
}

.uni-calendar-item__weeks-box-item {
	position: relative;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100rpx;
	height: 100rpx;
}

.uni-calendar-item__weeks-box-circle {
	position: absolute;
	top: 5px;
	right: 5px;
	width: 8px;
	height: 8px;
	border-radius: 8px;
	background-color: #dd524d;
}
.date-state-1 {
	background-color: #dd524d !important;
	color: #dd524d !important;
}
.date-state-2 {
	background-color: #4cd964 !important;
	color: #4cd964 !important;
}
.date-state-3 {
	background-color: #FFA200 !important;
	color: #FFA200 !important;
}
.date-state-4 {
	background-color: pink !important;
	color: pink !important;
}
.date-state-5 {
	background-color: #4CD964 !important;
	color: #4CD964 !important;
}
.date-state-6 {
	background-color: #F0AD4E !important;
	color: #F0AD4E !important;
}
.date-state-7 {
	background-color: #FF00FF !important;
	color: #FF00FF !important;
}

.date-state-8 {
	background-color: #FF1493 !important;
	color: #FF1493 !important;
}
.date-state-10 {
	background-color: #CD8500 !important;
	color: #CD8500 !important;
}
.date-text-1 {
	color: #dd524d !important;
}
.date-text-2 {
	color: #4cd964 !important;
}
.date-text-3 {
	color: #FFA200 !important;
}
.date-text-4 {
	color: pink !important;
}
.date-text-5 {
	color: #4CD964 !important;
}
.date-text-6 {
	color: #F0AD4E !important;
}
.date-text-7 {
	color: #FF00FF !important;
}

.date-text-8 {
	color: #FF1493 !important;
}
.date-text-10 {
	color: #CD8500 !important;
}

.uni-calendar-item--disable {
	background-color: rgba(249, 249, 249, 0.3);
	color: #c0c0c0;
}

.uni-calendar-item--isDay-text {
	color: #007aff;
}

.uni-calendar-item--isDay {
	background-color: #007aff;
	opacity: 0.8;
	color: #fff;
}

.uni-calendar-item--extra {
	color: #dd524d;
	opacity: 0.8;
}

.uni-calendar-item--checked {
	background-color: #007aff;
	color: #fff;
	opacity: 0.8;
}

.uni-calendar-item--multiple {
	background-color: #007aff;
	color: #fff;
	opacity: 0.8;
}
</style>
