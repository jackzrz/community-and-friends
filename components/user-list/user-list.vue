<template>
	<view class="p-2 flex align-center border-bottom border-light-secondary" hover-class="bg-light">
		<image :src='item.avatar' style='width:100rpx;height:100rpx'
			class="rounded-circle mr-2"></image>
		<view class="flex flex-column flex-1">
			<view class="font-md text-dark">{{item.username}}</view>
	
			<uni-badge size="small" :text="item.age" :type="item.sex===1?'error':'primary'">
				<text v-if="item.sex>0" :class="item.sex===1?'icon-nv':'icon-nan'"
					class="iconfont icon-nv text-white font-sm "
					style="margin-right: 5rpx;"></text>
			</uni-badge>
		</view>
		<view class="uni-icon uni-icon-checkbox-filled "
			:class="item.isFollow?'text-light-muted':'text-main'"> </view>
	</view>
</template>

<script>
	export default{
		props:{
			item:Object,
			index:Number
		}
	}
</script>

<style>
</style>
