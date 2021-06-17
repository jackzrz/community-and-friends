<template>
	<view>
		<!-- 未登陆 -->
		<template v-if="!loginStatus">
			<view class="flex align-center justify-center py-2 font">
				登录社区，体验更多功能
			</view>
			<other-login></other-login>
			<view class="flex align-center justify-center py-2 font text-secondary" @click="openLogin()">
				账号/手机登录
				<text class="ml-1 iconfont icon-jinru"></text>
			</view>
		</template>
		<!-- 已登陆 -->
	   <navigator url="../login/login" v-else>
		<view class="flex align-center p-2" hover-class="bg-light">
			<image :src="avatar" style="width:100rpx;height: 100rpx;" class="rounded-circle"></image>
			<view class="flex flex-column flex-1 px-2">
				<text class="font-lg font-weight-bold">{{member.nickname}}</text>
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
	import otherLogin from '@/components/common/other-login.vue'
	import {mapState} from 'vuex'
	// import uniList from '@/components/uni-ui/uni-list/uni-list.vue'
	export default {
		components: {
			uniListItem,
			otherLogin
			
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
		computed:{
			...mapState({
				loginStatus:state=>state.loginStatus,
				member:state=>state.member
			}),
			//用户头像，处理头像不存在的情况
			avatar(){
				return this.member.icon? this.member.icon :'../../static/default.jpg'
			}
			
		},
		methods: {
		openLogin(){
			
			uni.navigateTo({
				url: '../login/login',
			});
		}
		}
	}
</script>

<style>

</style>
