<template>
	<view>
		<template v-if="searchList.length===0">
			<view class="py-2 font-md px-2">搜索历史</view>
			<view class="flex flex-wrap">
				<view class="border font rounded mx-2 my-1 px-2 px-2" v-for="(item,index) in list " :key="index"
					hover-class="bg-light" @click="tabSearchHistory(item)">{{item}}</view>
			</view>
		</template>
		<template v-else>
			<!-- 搜索数据结果列表 -->
			<block v-for="(item,index) in searchList" :key="index">
				<common-list :item="item" :index="index"></common-list>
			</block>
		</template>
	</view>
</template>



<script>
	const demo = [
		{
			username: "jack zhou",
			userpic: "../../static/default.jpg",
			newstime: "2021-10-20 下午04:30",
			isFollow: false,
			title: "标题",
			titlepic: "../../static/demo/datapic/11.jpg",
			support: {
				type: "support",
				support_count: 1,
				unsupport_count: 2
			},
			comment_count: 2,
			share_num: 5

		}, {
			username: "jack zhou",
			userpic: "../../static/default.jpg",
			newstime: "2021-10-20 下午04:30",
			isFollow: true,
			title: "标题",
			titlepic: "",
			support: {
				type: "unsupport",
				support_count: 1,
				unsupport_count: 2
			},
			comment_count: 2,
			share_num: 5
		},
		{
			username: "jack zhou",
			userpic: "../../static/default.jpg",
			newstime: "2021-10-20 下午04:30",
			isFollow: true,
			title: "标题",
			titlepic: "",
			support: {
				type: "", //未操作
				support_count: 1,
				unsupport_count: 2
			},
			comment_count: 0,
			share_num: 5
		}
	]

	import commonList from '@/components/common/common-list.vue'
	export default {
		components: {
			commonList
		},
		data() {
			return {
				searchText: "",
				list: ['uniapp 第二季实战开发', 'uniapp 第三季微信开发', '实战教程', '理论课程'],
				searchList: []
			}
		},
		// 监听导航输入
		onNavigationBarSearchInputChanged(e) {
			console.log(e);
			this.searchText = e.text;
		},
		//监听
		onNavigationBarButtonTap(e) {
			console.log(e);
			this.searchEvent()
		},
		methods: {
			// 点击搜索历史
			tabSearchHistory(text) {
				this.searchText = text;
				this.searchEvent()
			},
			searchEvent() {
				// 收起键盘
				uni.hideKeyboard();
				uni.showLoading({
					title: "加载中...",
					mask: false
				})
				//请求搜索
				setTimeout(() => {
					this.searchList = demo
					//隐藏loading
					uni.hideLoading()
				}, 2000)
				
			}
		}
	}
</script>

<style>

</style>
