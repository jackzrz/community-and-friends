<template>
	<view>
		<!-- tab -->
		<view class="flex align-center" style="height: 100rpx">
			<view class="flex-1 flex align-center justify-center" v-for="(item,index) in tabBars" :key="index"
				:class="index===tabIndex?'font-weight-bold text-main':'font-md'" @click="changeTab(index)">
				{{item.name}}<text class="ml-1" v-if="item.num>0">{{item.num}}</text>
			</view>
		</view>
		
		<!-- 列表 -->
		<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:'+scrollH+'px'">
			<swiper-item v-for="(item,index) in newsList" :key="index">
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px'" @scrolltolower="loadmore(index)">
					<template v-if="item.list.length>0">
						<block v-for="(item2,index2) in item.list" :key="index2">
							<user-list :item="item2" :index="index2"></user-list>
						</block>
						<!-- 上拉加载 -->
						<load-more v-if="item.list.length>10" :loadmore="item.loadmore"></load-more>
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
	
	import loadMore from '@/components/common/load_more.vue'
	import noThing from '@/components/common/no-thing.vue'
	export default {
		components: {
			noThing,
			loadMore
		},
		data() {
			return {
				newsList: [],
				scrollH: 500,
				tabIndex: 0,
				tabBars: [{
					name: "互关",
					num: 0,
				}, {
					name: "关注",
					num: 2
				}, {
					name: "粉丝",
					num: 30
				}],
			}
		},
		// 监听点击搜索
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search',

			});
		},
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta: 1
			});
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					//console.log(;
					this.scrollH = res.windowHeight - uni.upx2px(100);
				}
			})
			this.getData();
		},
		methods: {
			getData() {
				var arr = []
				for (let i = 0; i < this.tabBars.length; i++) {
					let obj = {
						//1. 上拉加载更多 2 加载中  3 没有更多了
						loadmore: "上拉加载更多",
						list: []
					}
					if (i < 2) {
						//obj.list = demo
						obj.list = demo
					}
					arr.push(obj)
				}
				this.newsList = arr;
			},
			changeTab(index) {
				this.tabIndex = index
			},
			//监听滑动
			onChangeTab(e) {
				//console.log(e.detail.current)
				this.changeTab(e.detail.current)
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
			//切换选项
			changeTab(index) {
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index;
				this.scrollInto = 'tab' + index

			},
		}
	}
</script>

<style>

</style>
