<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view class="scroll-row" scroll-x="true" :scroll-into-view="scrollInto" style="height: 100rpx;"
			scroll-with-animation>
			<view v-for="(item,index) in tabBars" :class="tabIndex===index?'text-main font-lg font-weight-bold ':''"
				:key="index" :id="'tab'+index" class="scroll-row-item px-3 py-2" @click="changeTab(index)">
				{{item.className}}
			</view>
		</scroll-view>
	
		<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:'+scrollH+'px'">
			<swiper-item v-for="(item,index) in newsList" :key="index">
				
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px'" @scrolltolower="loadmore(index)">
					<!-- <view v-for="i in 100" :key="i">{{i}}</view> -->
					<template v-if="item.list.length>0">
						<block v-for="(item2,index2) in item.list" :key="index2">
							<common-list :item="item2" :index="index2" @follow="follow" @doSupport="doSupport">
							</common-list>
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
	import commonList from '@/components/common/common-list.vue'
	import loadMore from '@/components/common/load_more.vue'
	import noThing from '@/components/common/no-thing.vue'
	export default {
		components: {
			commonList,
			loadMore,
			noThing
		},

		data() {
			return {
				scrollInto: "",
				scrollH: 600,
				tabIndex: 0,
				//顶部选项卡
				tabBars: [],
				newsList: []
			}
		},
		//监听导航栏搜索框
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search?type=post'
			})
		},

		onNavigationBarButtonTap() {
			this.navigateTo({
				url: '../add-input/add-input'
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
				//获取分类
				this.$H.get('/sc-post/api/v1/post/postclass').then(res => {
					// let [err, result] = res
					// console.log(result);
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
						this.getPostList();
					 }	
				})
			},
			
			//上拉加载更多
			loadmore(index) {
				//修改当前列表加载状态
				let item = this.newsList[index]
				//判断是否可加载状态
				if (item.loadmore !== '上拉加载更多') return;
				item.loadmore = "加载中..."
                item.page++;
				//模拟数据请求
				this.getPostList()
			},
			
			
			//监听滑动
			onChangeTab(e) {
				this.changeTab(e.detail.current)
			},
			// 获得指定分类下的列表
			getPostList(){
				let index=this.tabIndex
				let id=this.tabBars[index].id
				let page=this.newsList[index].page
			    let refresh=(page===1)
				this.$H.get('/sc-post/api/v1/post/postByclass/'+id+'/post/'+this.newsList[0].page)
				.then(resPost=>{
					//let [errPost, resultPost] = resPost
					let list=resPost
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
			
			
			//切换选项
			changeTab(index) {
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index;
				this.scrollInto = 'tab' + index
				//获取当前类别下的数据,注意防止重复加载
				if(!this.newsList[this.tabIndex].firstload){
					this.getPostList();
				}
				
			},
			
			follow(e) {
				//let item = this.newsList[0].list[e.index];
				this.newsList[0].list[e].isFollow = true;
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
