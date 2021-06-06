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
				
				<!-- 帖子 -->
				<template v-if="type==='post'">
				<common-list :item="item" :index="index"></common-list>
				</template>
				<!-- 话题 -->
				<template v-if="type==='topic'">
				<topic-list :item="item" :index="index"></topic-list>
				</template>
				<!-- 用户 -->
				<template v-if="type==='user'">
				<user-list :item="item" :index="index"></user-list>
				</template>
				
			</block>
		</template>
	</view>
</template>



<script>
	const demoTopic = [{
					cover: "/static/demo/topicpic/1.jpeg",
					title: "话题名称",
					desc: "话题描述",
					today_count: 0,
					news_count: 10
				}, {
					cover: "/static/demo/topicpic/1.jpeg",
					title: "话题名称",
					desc: "话题描述",
					today_count: 0,
					news_count: 10
				}, {
					cover: "/static/demo/topicpic/1.jpeg",
					title: "话题名称",
					desc: "话题描述",
					today_count: 0,
					news_count: 10
				}, {
					cover: "/static/demo/topicpic/1.jpeg",
					title: "话题名称",
					desc: "话题描述",
					today_count: 0,
					news_count: 10
				}, {
					cover: "/static/demo/topicpic/1.jpeg",
					title: "话题名称",
					desc: "话题描述",
					today_count: 0,
					news_count: 10
				}]
	const demoUser = [{
					avatar: "/static/default.jpg",
					username: "用户",
					sex: 1,
					age: 24,
					isFollow: true
				}, {
					avatar: "/static/default.jpg",
					username: "用户",
					sex: 2,
					age: 24,
					isFollow: true
				}, {
					avatar: "/static/default.jpg",
					username: "用户",
					sex: 1,
					age: 24,
					isFollow: false
				}]
	const demoPost = [{
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
	import topicList from '@/components/news/topic-list.vue'
	import userList from '@/components/user-list/user-list.vue'
	export default {
		components: {
			commonList,
			topicList,
			userList
		},
		data() {
			return {
				searchText: "",
				list: ['uniapp 第二季实战开发', 'uniapp 第三季微信开发', '实战教程', '理论课程'],
				searchList: [],
				type: "post"
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

		onLoad(e) {
			let pageTitle = ''
			//console.log(e.type)
			if (e.type) {
				this.type = e.type
			}
			switch (this.type) {
				case 'post':
					pageTitle = '帖子'
					break;
				case 'topic':
					pageTitle = '话题'
					break;
				case 'user':
					pageTitle = '用户'
					break;
				default:
					break;
			}
			//动态修改搜查占位
			// #ifdef APP-PLUS
			let webview = this.$mp.page.$getAppWebview(); //获取当前窗口实例  
			webview.setStyle({
				'titleNView': {
					"searchInput": { //修改当前窗口search样式  
						"placeholder": "搜索"+pageTitle,
					}
				}
			})
			// #endif
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
					switch (this.type) {
						case 'post':
							this.searchList = demoPost
							break;
						case 'topic':
							this.searchList = demoTopic
							break;
						case 'user':
							this.searchList = demoUser
							break;
						default:
							break;
					}
					//隐藏loading
					uni.hideLoading()
				}, 2000)
			}
		},
		
		
	}
</script>

<style>

</style>
