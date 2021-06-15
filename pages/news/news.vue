<template>
	<view>
		<!-- 导航 -->
		<uni-nav-bar :fixed="true" :status-bar="true" left-icon="back" @clickLeft="back" :border="false"
			@clickRight="openAddInput">
			<view class="flex align-center justify-center font-weight-bold w-100">
				<!-- <view class="font-lg text-main  mx-1">关注</view> -->
				<view class=" mx-1" :class="tabIndex===index?'font-lg text-main':'font-md text-light-muted'"
					v-for="(item,index) in tabBars" :key="index" @click="changeTab(index)">{{item.name}}</view>
			</view>
			<text slot="right" class="iconfont icon-fatie_icon"></text>
		</uni-nav-bar>

		<swiper :duration="150" :style="'height:'+scrollH+'px'" @change="onChangeTab" :current="tabIndex">
			<!-- 关注 -->
			<swiper-item>
				<!-- <view class="swiper-item">{{item.name}}</view> -->
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'" @scrolltolower="loadmoreEvent">
				<!-- 	<block v-for="(item,index) in list" :key="index">
						<common-list :item="item" :index="index" @doSupport="doSupport"></common-list>
						<divider></divider>
					</block> -->
					<!-- 上拉加载 -->
					<load-more :loadmore="loadmore"></load-more>
				</scroll-view>
			</swiper-item>
			<!-- 话题 -->
			<swiper-item>
				<!-- <view class="swiper-item">{{item.name}}</view> -->
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'">
					<!-- 热门分类 -->
					<hot-cate :hotCate="hotCate"></hot-cate>
					<!-- 搜索框 -->
					<view class="p-2">
						<view class="bg-light py-2 rounded flex align-center justify-center text-secondary" @click="openSearch">
							<text class="iconfont icon-sousuo mr-2"></text>  搜索话题
						</view>
					</view>
					<!-- 轮播图-->
					<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="px-2">
						<swiper-item v-for="(item,index) in swiperList" :key="index">
							<image :src="item.src" style="height: 300rpx;" class="w-100 rounded ">
							</image>
						</swiper-item>
					</swiper>

					<divider></divider>
					<!-- 最近更新 -->
					<view class="p-2 font-md">最近更新</view>
					<!-- 话题列表组件 -->
					<block v-for="(item,index) in topicList" :key="index">
						<topic-list :item="item" :index="index"></topic-list>
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>

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

	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import commonList from '@/components/common/common-list.vue'
	import loadMore from '@/components/common/load_more.vue'
	import hotCate from '@/components/news/hot-cate.vue'
	import topicList from '@/components/news/topic-list.vue'
	export default {
		components: {
			loadMore,
			uniNavBar,
			commonList,
			hotCate,
			topicList
		},

		data() {
			return {
				scrollH: 500,
				tabIndex: 0,
				tabBars: [{
					name: "关注"
				}, {
					name: "话题"
				}],
				list: [],
				loadmore: "上拉加载更多",
				hotCate: [],
				swiperList:[],
				
				topicList: [{
					titlePic: "/static/demo/topicpic/1.jpeg",
					title: "话题名称",
					note: "话题描述",
					today_count: 0,
					news_count: 10
				}]
			}
		},
		
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					//console.log(;
					this.scrollH = res.windowHeight - res.statusBarHeight - 44;
				}
			})
			this.list = demo
			this.getTopicClass();
			this.getHotTopic();
			this.getSwipers();
		},
		methods: {
			// 获取热门分类
			getTopicClass(){
				   
					this.$H.get('/sc-post/api/v1/topic/topicclass').then(res=>{
					// console.log("topicclass",res);
					  this.hotCate=res
					})
			},
			// 获取热门话题
			getHotTopic(){
				this.$H.get('/sc-post/api/v1/topic/hottopic').then(res=>{
					this.topicList=res;
				})
			},
			
			// 获取轮播图
			getSwipers(){
				this.$H.post('/sc-other/api/v1/other/adsense/0').then(res=>{
					console.log(res);
					this.swiperList=res;
				})
			
			},
			
			//上拉加载更多
			loadmoreEvent() {
				//修改当前列表加载状态
				//判断是否可加载状态
				if (this.loadmore !== '上拉加载更多') return;
				this.loadmore = "加载中..."
				//模拟数据请求
				setTimeout(() => {
					this.list = [...this.list, ...this.list]
					this.loadmore = "上拉加载更多"
				}, 2000)
			},
			
			//监听滑动
			onChangeTab(e) {
				console.log(e)
				this.changeTab(e.detail.current)
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},

			changeTab(index) {
				console.log(index)
				this.tabIndex = index
			},
			//打开发布页
			openAddInput() {
				console.log("dddd");
			},

			doSupport(e) {
				let item = this.list[e.index]
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
			},
			
			openSearch(){
				uni.navigateTo({
					url: '../search/search?type=topic',
				});
			}

		},

	}
</script>

<style>

</style>
