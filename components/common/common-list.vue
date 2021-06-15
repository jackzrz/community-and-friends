<template>
	<view class="p-2 animated fast fadeIn">
		<!-- 头像昵称|关注 -->
		<view class="flex align-center justify-between">
			<view class="flex align-center">
				<image :src="item.member.icon" @click="openSpace" class="rounded-circle mr-2"
					style="width: 65rpx;height: 65rpx;" lazy-load />
				<view>
					<view class="font" style="line-height: 1.5;">{{item.member.username}}</view>
					<text class="font-sm text-light-muted">{{item.createTimeLong|formatTime}}</text>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="flex align-center justify-center rounded bg-main text-white animated faster" hover-class="tada"
				v-if="!item.isFollow" style="width: 90rpx;height: 45rpx;" @click="follow()">
				关注
			</view>





		</view>
		<!-- 标题 -->
		<view class="my-1 font-md" @click="openDetail">{{item.title}}</view>
		<!-- 帖子详情 -->
		<slot></slot>
		<!-- 图片 -->
		
		<image v-if="item.titlePic" class="rounded w-100" :src="item.titlePic" style="height: 350rpx;"
			@click="openDetail" />
		<!-- 图标按钮 -->
		<view class="flex align-center">
			<!-- 顶 @click="doSupport('support')" :class="item.support.type==='support'?'text-main':'' ">-->
			<view class="flex align-center justify-center flex-1 animated" hover-class="tada text-main"
				@click="doSupport('support')" >
				<text class="iconfont icon-dianzan2 mr-2"></text>
				<text>{{(item.postStatisInfo.supportCount!=undefined&&item.postStatisInfo.supportCount)>0?item.postStatisInfo.supportCount:'支持'}}</text>
			</view>
			<!-- 踩 	@click="doSupport('unsupport')" :class="item.support.type==='unsupport'?'text-main':'' ">-->
			<view class="flex align-center justify-center flex-1 animated" hover-class="tada text-main"
				@click="doSupport('unsupport')" >

				<text class="iconfont icon-cai mr-2"></text>
				<text>{{item.postStatisInfo.unSupportCount>0?item.postStatisInfo.unSupportCount:'反对'}}</text>
			</view>

			<view class="flex align-center justify-center flex-1 animated" hover-class="tada text-main"
				@click="doComment">
				<text class="iconfont icon-pinglun2 mr-2"></text>
				<text>{{item.postStatisInfo.commentCount>0?item.postStatisInfo.commentCount:"评论"}}</text>
			</view>
			<view class="flex align-center justify-center flex-1 animated" hover-class="tada text-main"
				@click="doShare">
				<text class="iconfont icon-fenxiang mr-2"></text>
				<text>{{item.postStatisInfo.shareCount>0?item.postStatisInfo.shareCount:"分享"}}</text>
			</view>
		</view>
	</view>
</template>


<script>
	import $T from '@/common/time.js'
	export default {
		props: {
			item: Object,
			index: {
				type: Number,
				default: -1
			},
			isdetail: {
				type: Boolean,
				default: false
			}
		},
		filters:{
			//todo data format
			formatTime(value){
				return $T.gettime(value);
			}
		},
		
		methods: {
			openSpace: function() {
				uni.navigateTo({
					url: '/pages/user-space/user-space'
				});
			},
			follow: function() {
				this.checkAuth(() => {
					this.$emit('follow', this.index);
				})
			},
			openDetail: function() {
				if (this.isdetail) {
					return;
				}
				uni.navigateTo({
					url: '/pages/detail/detail?detail=' + JSON.stringify(this.item),
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

			//顶踩操作
			doSupport: function(type) {
			    this.checkAuth(() => {
				this.$emit('doSupport', {
					type: type,
					index: this.index
				})
				})
			},

			// 评论
			doComment() {
				this.checkAuth(() => {
				if (!this.isdetail) {
					return this.openDetail()
				}
				this.$emit('doComment');
				})
			},
			// 分享
			doShare() {
				if (!this.isdetail) {
					return this.openDetail()
				}
				this.$emit('doShare');
			}

		}
	}
</script>

<style>

</style>
