<template>
	<view>
		<topic-info :info="info"></topic-info>
		<divider></divider>

		<block v-for="(item,index) in hotList" :key="'Hot'+index">
			<view class="p-2 flex align-center border-bottom" hover-class="bg-light">
				<text class="iconfont icon-xihuan"></text>
				<text class="font-md text-dark text-ellipsis">{{item.title}}</text>
			</view>
		</block>

		<divider></divider>
		<!-- tab -->
		<view class="flex align-center">
			<view class="flex-1 flex align-center justify-center" v-for="(item,index) in tabBars" :key="index"
				:class="index===tabIndex?'font-weight-bold text-main':'font-md'" @click="changeTab(index)">
				{{item.title}}
			</view>

		</view>
		<!-- 列表 -->
		<template v-if="listData.length >0">
			<block v-for="(item,index) in listData" :key="index">
				<common-list :item="item" :index="index"></common-list>
				<divider></divider>
			</block>

		</template>
		<template v-else>
			<no-thing></no-thing>
		</template>
		<load-more :loadmore="loadtext"></load-more>
	</view>
</template>

<script>
	const demo = [{
			username: "jack zhou",
			userpic: "../../static/default.jpg",
			newstime: "2021-10-20 下午04:30",
			isFollow: true,
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

	import topicInfo from "@/components/topic-detail/topic_info.vue"
	import commonList from "@/components/common/common-list.vue"
	import noThing from "@/components/common/no-thing.vue"
	import loadMore from "@/components/common/load_more.vue"
	export default {
		components: {
			topicInfo,
			commonList,
			noThing,
			loadMore
		},
		data() {
			return {
				info: {
					"titlePic": "/static/demo/topicpic/1.jpeg",
					"title": "话题名称",
					"note": "话题描述",
					"todaypostCount": 0,
					"postCount": 10
				},
				hotList: [{
					title: "【新人必读】uni-APP实战第三季 微信开发开发开发"
				}, {
					title: "【新人必读】uni-APP实战第三季 微信开发开发开发"
				}],
				tabIndex: 0,
				tabBars: [{
					title: "默认"
				}, {
					title: "最新"
				}],

				list1: [],
				loadtext1: "上拉加载更多",
				page1: 1,
				firstload1: false,
				list2: [],
				loadtext2: "上拉加载更多",
				page2: 1,
				firstload2: false,
			}
		},
		computed: {
			//当前列表数据

			listData() {
				return this['list' + (this.tabIndex + 1)];
			},

			loadtext() {
				return this['loadtext' + (this.tabIndex + 1)];
			}
		},
		onLoad(e) {
			console.log(e.detail)
			this.info = JSON.parse(e.detail)
			uni.setNavigationBarTitle({
				title: this.info.title
			})
			//加载数据
			this.getData();
		},

		onReachBottom() {
			console.log("上拉加载更多");
			this.loadmore();
		},


		methods: {
			changeTab(index) {
				this.tabIndex = index
				if(!this['firstload'+(index+1)]){
					this.getData()
				}
			},
			//加载数据
			getData() {
				let no = this.tabIndex + 1
				let page = this['page' + no]
				let refresh = (page === 1)
				this.$H.get('/sc-post/api/v1/post/postsByTopic/' + this.info.id + '/post/' + page)
					.then(res => {
						console.log("", res)
						let list = res
						this['list' + no] = refresh ? [...list] : [...this['list' + no], ...list],
							this['loadtext' + no] = list.length < 4 ? '没有更多了' : '上拉加载更多'

						if (refresh) {
							this['firstload' + no] = true;
						}

					}).catch(err => {
						if (!refresh) {
							this['page' + no]--;
						}
					})
			},

			loadmore() {
				let index = this.tabIndex
				if (this.loadtext !== '上拉加载更多') return;
				this['loadtext' + (index + 1)] = '加载中...';
let no=index+1;
                this['page'+no]++;
				this.getDate();
				// setTimeout(() => {
				// 	this['list' + (index + 1)] = [...this['list' + (index + 1)], ...this['list' + (index + 1)]]
				// 	this['loadtext' + (index + 1)] = "上拉加载更多"
				// }, 2000)
			}
		},
		
		
	}
</script>

<style>
	.filter {
		filter: blur(10px)
	}
</style>
