<template>
	<div class="container">
		<uni-collapse accordion="true">
			<uni-collapse-item v-for="(list,index) in dpList" :key="index" :title="list.name">
				<uni-list v-for="(item,i) in userList">
					<uni-list-item :key="i" v-if="list.deptId == item.departmentId" @click="getUserData(item)">
						{{item.name}}
					</uni-list-item>
				</uni-list>
			</uni-collapse-item>
		</uni-collapse>
	</div>
</template>

<script>
	import main from '../../api/ddLogin';
	const app = getApp();
	export default {
		data() {
			return {
				userList: null,
				dpList: null,
				subset: ''
			}
		},
		methods: {
			getUserData(data) {
				let dpinfo = this.dpList.find(j => data.departmentId === j.departmentId); //获取部门名称
				let {
					name
				} = dpinfo ? dpinfo : {
					name: ''
				};
				app.$options.globalData.user = { ...data
				};
				app.$options.globalData.name = data.name;
				app.$options.globalData.type = name;
				app.$options.globalData.unionid = data.unionid;
				uni.navigateTo({
					url: '../../pages/home/index'
				});
			}
		},
		mounted() {
			let _this = this
			Promise.all([main.list(), main.dplist()])
				.then(res2 => {
					console.log('返回得数就好---------', res2);
					_this.userList = res2[0].data;
					_this.dpList = res2[1].data;
				})
				.catch(err => {
					alert(err);
				});
		}
	}
</script>

<style scoped lang="scss">
	.container {
		width: 100vw;
		height: 100vh;
	}
</style>
