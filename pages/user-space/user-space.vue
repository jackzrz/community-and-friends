<template>
	<view>
		<!-- 头部 -->
		<view class="flex align-center p-3 border-bottom border-light-secondary">
			<image src="/static/default.jpg" class="rounded-circle" style="width: 170rpx; height: 170rpx;"></image>
			<view class="pl-3 flex flex-column  flex-1">
				<view class="flex align-center">
					<view class="flex-1 flex align-center justify-center flex-column">
						<text class="font-lg font-weight-bold">1</text>
						<text class="font text-muted">获赞</text>
					</view>
					<view class="flex-1 flex align-center justify-center flex-column">
						<text class="font-lg font-weight-bold">1</text>
						<text class="font text-muted">关注</text>
					</view>
					<view class="flex-1 flex align-center justify-center flex-column">
						<text class="font-lg font-weight-bold">1</text>
						<text class="font text-muted">粉丝</text>
					</view>
				</view>
				<view class="flex align-center justify-center pt-2">
					<button class="bg-main" type="primary" size="mini" style="width:400rpx">关注</button>
				</view>

			</view>
		</view>

		<view class="flex align-center" style="height: 100rpx">
			<view class="flex-1 flex align-center justify-center" v-for="(item,index) in tabBars" :key="index"
				:class="index===tabIndex?'font-weight-bold text-main':'font-md'" @click="changeTab(index)">
				{{item.name}}
			</view>
		</view>

		<template v-if="tabIndex===0">
			<view class="animated fadeInDown">
				<view class="py-2 px-3 border-bottom">
					<view class="font-md mb-1">账号信息</view>
					<view class="font text-muted">账号年龄：12个月</view>
					<view class="font text-muted">账号ID：1</view>
				</view>

				<view class="p-3 border-bottom">
					<view class="font-md mb-1">个人信息</view>
					<view class="font text-muted">星座：12个月</view>
					<view class="font text-muted">职业：IT</view>
					<view class="font text-muted">故乡：中国</view>
					<view class="font text-muted">情感：未婚</view>
				</view>
			</view>
		</template>

		<template v-else>
			<view class="animated fast fadeIn">
				<common-list v-for="(item,index) in list" :key="index" :item="item" :index="index" @follow="follow"
					@doSupport="doSupport"></common-list>
				<divider></divider>

				<load-more :loadmore="loadmore"></load-more>
			</view>
		</template>

		<uni-popup ref="popup" type="top">
			<view class="bg-white">
				<view class="flex align-center justify-center fond border-bottom py-2 " hover-class="bg-light"
					@click="popupEvent('friend')">
					<text class="iconfont icon-sousuo mr-2"></text>加入黑名单
				</view>
				<view class="flex align-center justify-center fond py-2" hover-class="bg-light"
					@click="popupEvent('clear')">
					<text class="iconfont icon-shanchu mr-2"></text>聊天
				</view>
			</view>
		</uni-popup>

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
	import loadMore from '@/components/common/load_more.vue'
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	export default {
		components: {
			commonList,
			loadMore,
			uniPopup
		},
		data() {
			return {
				tabIndex: 0,
				tabBars: [{
					name: "主页"

				}, {
					name: "帖子",
					list: demo,
					loadmore: "上拉加载更多"
				}, {
					name: "动态",
					list: demo,
					loadmore: "上拉加载更多"

				}]
			}
		},
		computed: {
			list() {
				return this.tabBars[this.tabIndex].list
			},
			loadmore() {
				return this.tabBars[this.tabIndex].loadmore
			}
		},
		onNavigationBarButtonTap(e) {
			this.$refs.popup.open()
		},
		methods: {
			// //上拉加载更多
			// loadmore(index) {

			// 	//修改当前列表加载状态
			// 	let item = this.newsList[index]
			// 	//判断是否可加载状态
			// 	if (item.loadmore !== '上拉加载更多') return;

			// 	item.loadmore = "加载中..."

			// 	//模拟数据请求
			// 	setTimeout(() => {
			// 		item.list = [...item.list, ...item.list]
			// 		item.list.loadmore = "上拉加载更多"
			// 	}, 2000)
			// },
			changeTab(index) {
				this.tabIndex = index
			},

			follow(e) {
				let list = this.tabBars[this.tabIndex].list
				list[e].isFollow = true
				uni.showToast({
					title: "关注成功"
				})
			},
			doSupport(e) {
				let list = this.tabBars[this.tabIndex].list
				let item = list[e.index]
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

</style>
