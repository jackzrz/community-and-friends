<template>
	<view>
		<navigator url="../login/login">
		<view class="flex align-center p-2" hover-class="bg-light">
			<image src="../../static/default.jpg" style="width:100rpx;height: 100rpx;" class="rounded-circle"></image>
			<view class="flex flex-column flex-1 px-2">
				<text class="font-lg font-weight-bold">13051671980</text>
				<text class="font text-muted">总帖子10 今日发帖0</text>
			</view>
			<text class="iconfont icon-jinru"></text>
		</view>
		</navigator> 
		
		<view class="flex align-center px-3 py-2">
			<view class="flex-1 flex flex-column align-center justify-center" v-for="(item,index) in myData"
				:key="index">
				<text class="font-lg font-weight-bold">{{item.num}}</text>
				<text class="font text-muted">{{item.name}}</text>
			</view>
		</view>
		<!-- 广告位-->
		<view class="px-3 py-2">
			<image class="rounded" src="/static/demo/banner1.jpg" mode="aspectFill" style="height:170rpx;width: 100%;">
			</image>
		</view>
		
		
		<uni-list-item :border="false" title="浏览历史" showArrow>
			<view slot="header" class="slot-box">
				<text  class="iconfont icon-liulan font-lg mr-1" ></text>
			</view>
		</uni-list-item>
		
		<uni-list-item :border="false" title="社区认证" showArrow>
			<view slot="header" class="slot-box">
				<text  class="iconfont icon-huiyuanvip font-lg mr-1" ></text>
			</view>
		</uni-list-item>
		
		<uni-list-item :border="false" title="审核帖子" showArrow>
			<view slot="header" class="slot-box">
				<text  class="iconfont icon-keyboard font-lg mr-1" ></text>
			</view>
		</uni-list-item>


	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	// import uniList from '@/components/uni-ui/uni-list/uni-list.vue'
	export default {
		components: {
			uniListItem
			
		},
		data() {
			return {
				myData: [{
					"name": "帖子",
					num: 1
				}, {
					"name": "动态",
					num: 1
				}, {
					"name": "评论",
					num: 1
				}, {
					"name": "粉丝",
					num: 0
				}]
			}
		},
		onNavigationBarButtonTap(){
			uni.navigateTo({
				url: '/pages/user-set/user-set'
			});
		},
		methods: {

		}
	}
</script>

<style>

</style>
