<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view class="scroll-row" scroll-x="true" :scroll-into-view="scrollInto" style="height: 100rpx;"
			scroll-with-animation>
			<view v-for="(item,index) in tabBars" :class="tabIndex===index?'text-main font-lg font-weight-bold ':''"
				:key="index" :id="'tab'+index" class="scroll-row-item px-3 py-2" @click="changeTab(index)">{{item.name}}
			</view>
		</scroll-view>
		<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:'+scrollH+'px'">
			<swiper-item v-for="(item,index) in newsList" :key="index">
				<!-- <view class="swiper-item">{{item.name}}</view> -->
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px'" @scrolltolower="loadmore(index)">
					<!-- <view v-for="i in 100" :key="i">{{i}}</view> -->
					<template v-if="item.list.length>0">
						<block v-for="(item2,index2) in item.list" :key="index2">
							<topic-list :item="item2" :index="index2" >
							</topic-list>
							<divider></divider>
						</block>
						<!-- 上拉加载 -->
						<load-more :loadmore="item.loadmore"></load-more>
					</template>
					
					<template v-else>
						<no-thing></no-thing>
					</template>
					
				</scroll-view>

			</swiper-item>
		</swiper>


	</view>
</template>

<script>
	const demo = [{
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
	import topicList from '@/components/news/topic-list.vue'
	import loadMore from '@/components/common/load_more.vue'
	import noThing from '@/components/common/no-thing.vue'
	export default {
		components: {
			topicList,
			loadMore,
			noThing
		},

		data() {
			return {
				scrollInto: "",
				scrollH: 600,
				tabIndex: 0,
				//顶部选项卡
				tabBars: [{
						name: "关注"
					},
					{
						name: "推荐"
					},

					{
						name: "体育"
					},
					{
						name: "热点"
					},
					{
						name: "财经"
					},

					{
						name: "娱乐"
					},
					{
						name: "军事"
					}
				],

				newsList: []

			}
		},
		//监听导航栏搜索框
		onNavigationBarSearchInputClicked(){
			uni.navigateTo({
				url:'../search/search'
			})
		},
		
		//
		onNavigationBarButtonTap(){
			
			uni.navigateTo({
				url:'../add-input/add-input'
			})
		},
		
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					//console.log(;
					this.scrollH = res.windowHeight - uni.upx2px(100);
				}
			})
			this.getData()
		},
		methods: {
			//
			getData() {
				var arr = []
				for (let i = 0; i < this.tabBars.length; i++) {
					let obj = {
						//1. 上拉加载更多 2 加载中  3 没有更多了
						loadmore: "上拉加载更多",
						list: []
					}
					if (i < 2) {
						obj.list = demo
					}
					arr.push(obj)
				}
				this.newsList = arr;
			},

			//上拉加载更多
			loadmore(index) {

				//修改当前列表加载状态
				let item = this.newsList[index]
				//判断是否可加载状态
				if (item.loadmore !== '上拉加载更多') return;

				item.loadmore = "加载中..."

				//模拟数据请求
				setTimeout(() => {
					item.list = [...item.list, ...item.list]
					item.list.loadmore = "上拉加载更多"
				}, 2000)
			},
			//监听滑动
			onChangeTab(e) {
				//console.log(e.detail.current)
				this.changeTab(e.detail.current)
			},
			//切换选项
			changeTab(index) {
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index;
				this.scrollInto = 'tab' + index

			},
			follow(e) {
				this.list[e].isFollow = true
				uni.showToast({
					title: "关注成功"
				})
			},

			doSupport(e) {		
				let item = this.newsList[0].list[e.index]
				let msg = e.type === 'support' ? '顶' : '踩'
				//未顶踩
				if (item.support.type === '') {
					item.support.type = e.type
					item.support[e.type + '_count']++
				} else if (item.support.type === 'support' && e.type === 'unsupport') {
					item.support.support_count--
					item.support.unsupport_count++
				} else if (item.support.type === 'unsupport' && e.type === 'support') {
					item.support.support_count++
					item.support.unsupport_count--
				}
				item.support.type = e.type
				uni.showToast({
					title: msg + '成功'
				})	
			}
		}
	}
</script>

<style>
	.scroll-row {
		width: 100%;
		white-space: nowrap;
	}
</style>

