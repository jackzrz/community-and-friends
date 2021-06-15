<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view class="scroll-row" scroll-x="true" :scroll-into-view="scrollInto" style="height: 100rpx;"
			scroll-with-animation>
			<view v-for="(item,index) in tabBars" :class="tabIndex===index?'text-main font-lg font-weight-bold ':''"
				:key="index" :id="'tab'+index" class="scroll-row-item px-3 py-2" @click="changeTab(index)">{{item.className}}
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
					<!-- 加载中 -->
					<template v-else-if="!item.firstload">
						<view class="text-light-muted flex align-center justify-center font-md"
						style="height: 200rpx;">加载中</view>
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
				tabBars: [
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
		
			getData() {
				this.$H.get('/sc-post/api/v1/topic/topicclass').then(res => {
					console.log(res)
					this.tabBars = res;
					// 生成列表
					var arr = []
					for (let i = 0; i < this.tabBars.length; i++) {
						arr.push({
							//1. 上拉加载更多 2 加载中  3 没有更多了
							loadmore: "上拉加载更多",
							list: [],
							page: 1,
							firstload:false
						})
					}
					this.newsList = arr;
					//获取第一个分类的数据
					 if(this.tabBars.length){
						this.getTopicList();
					 }	
				})
			},

			//上拉加载更多
			loadmore(index) {
				console.log("index----"+index);
				//修改当前列表加载状态
				let item = this.newsList[index]
				//判断是否可加载状态
				if (item.loadmore !== '上拉加载更多') return;
				item.loadmore = "加载中..."
                item.page++;
				this.getTopicList();
			},
			
			// 获得指定分类下的列表
			getTopicList(){
				console.log("TopicList-----");
				let index=this.tabIndex
				let id=this.tabBars[index].id
				let page=this.newsList[index].page
			    let refresh=(page===1)
				
				this.$H.get('/sc-post/api/v1/topic/topicclass/'+id+'/topic/'+this.newsList[index].page)
				.then(res=>{
					console.log("resPost",res);
					//let [errPost, resultPost] = resPost
					let list=res
					this.newsList[index].list=refresh?list:[...this.newsList[index].list,...list],
					this.newsList[index].loadmore=list.length<4?'没有更多了':'上拉加载更多'
					if(refresh){
						this.newsList[index].firstload=true;
					}
				}).catch(err=>{
					//取值失败要回退到上页
					if(!refresh){
						this.newsList[index].page--;
					}
				})
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
				//获取当前类别下的数据,注意防止重复加载
				if(!this.newsList[this.tabIndex].firstload){
					this.getTopicList();
				}
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

