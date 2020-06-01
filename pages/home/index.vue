<template>
	<view>
		<view style="height: 100vh;overflow-y: auto;">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#007aff"></uni-segmented-control>
			<view class="content">
				<view style="overflow-y: auto;" v-show="current === 0"><my-info /></view>
				<view style="overflow-y: auto;" v-show="current === 1"><my-mounth /></view>
			</view>
			<!-- <button class="btn" @click="handlePeople()">选择人员</button> -->
		</view>
	</view>
</template>

<script>
import sTabs from '../../components/s-ui/s-tabs';
import sTab from '../../components/s-ui/s-tab';
import myInfo from '../index/index.vue';
import myMounth from '../mounth/index.vue';
	const app = getApp();
export default {
	components: {
		sTabs,
		sTab,
		myInfo,
		myMounth
	},
	data() {
		return {
			tabList: [1, 2],
			activeTab: 1,
			items: ['我的概况', '我的月汇总'],
			current: 0,
		};
	},
	created() {
		let name  = app.$options.globalData.name
		this.items = [`${name}的概况`,`${name}的月汇总`]
	},
	mounted() {},
	methods: {
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
			}
		},
		change(index) {
			console.log('change:', index);
		},
		render(index) {
			console.log('render:', index);
		},
		handlePeople(){
			uni.navigateTo({
				url: '../../pages/push/pushIndex'
			});
		}
	}
};
</script>

<style scoped>
.content {
	margin-top: 10px;
}

.btn{
	margin: 15px auto;
	width: 60%;
	color: #fff;
	background-color: #007AFF;
}
</style>
