<template>
	<view class="p-2">
		<!-- 头像昵称|关注 -->
		<view class="flex align-center justify-between">
			<view class="flex align-center">
				<image :src="item.userpic" @click="openSpace" class="rounded-circle mr-2"
					style="width: 65rpx;height: 65rpx;" lazy-load />
				<view>
					<view class="font" style="line-height: 1.5;">{{item.username}}</view>
					<text class="font-sm text-light-muted">{{item.newstime}}</text>
				</view>
			</view>
			<!-- 按钮 -->
			<view 
			class="flex align-center justify-center rounded bg-main text-white animated faster" hover-class="tada"
			v-if="!item.isFollow"
				style="width: 90rpx;height: 45rpx;" @click="follow">
				关注
			</view>
		</view>
		<!-- 标题 -->
		<view class="my-1 font-md" @click="openDetail">{{item.title}}</view>
		<!-- 图片 -->
		<image v-if="item.titlepic" class="rounded w-100" :src="item.titlepic" style="height: 350rpx;"
			@click="openDetail" />
		<!-- 图标按钮 -->
		<view class="flex align-center">
			<!-- 顶 -->
			<view class="flex align-center justify-center flex-1 animated" hover-class="tada text-main"
				@click="doSupport('support')" 
				:class="item.support.type==='support'?'text-main':'' ">
				<text class="iconfont icon-dianzan2 mr-2"></text>
				<text>{{item.support.support_count>0?item.support.support_count:'支持'}}</text>
			</view>
			<!-- 踩 -->
			<view class="flex align-center justify-center flex-1 animated" hover-class="tada text-main"
				@click="doSupport('unsupport')"
				:class="item.support.type==='unsupport'?'text-main':'' ">
				<text class="iconfont icon-cai mr-2"></text>
				<text>{{item.support.unsupport_count>0?item.support.unsupport_count:'反对'}}</text>
			</view>
			
			<view class="flex align-center justify-center flex-1 animated" hover-class="tada text-main"
				@click="openDetail">
				<text class="iconfont icon-pinglun2 mr-2"></text>
				<text>{{item.comment_count>0?item.comment_count:"评论"}}</text>
			</view>
			<view class="flex align-center justify-center flex-1 animated" hover-class="tada text-main"
				@click="openDetail">
				<text class="iconfont icon-fenxiang mr-2"></text>
				<text>{{item.share_num>0?item.share_num:"分享"}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},
		methods: {
			openSpace: function() {
				console.log('打开个人空间');
			},
			
			follow: function() {
				console.log('关注');
				this.$emit('follow',this.index);
			},
			
			openDetail: function() {
				console.log('detail--');
			},
			
			//顶踩操作
			doSupport: function(type) {
				console.log('type1',type);
				this.$emit('doSupport',{
					type:type,
					index:this.index
				})
				console.log('type',type);
			}

		}
	}
</script>

<style>

</style>
