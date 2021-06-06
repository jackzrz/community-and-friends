<template>
	
	<view class="flex align-center p-2 border-bottom border-light-secondary animated fast fadeIn" hover-class="bg-light" @click="open">
		<image :src="item.avtar" style="width: 80rpx;height:80rpx" class="rounded-circle mr-2"></image>
		<view class="flex flex-column flex-1">
			<view class="flex align-center justify-between">
				<text class="font-md">{{item.username}}</text>
				<text class="font-sm text-secondary">{{item.update_time | formatTime}}</text>
			</view>
			<view class="flex align-center justify-between">
				<text class="text-secondary text-ellipsis font" style="max-width: 500rpx;">{{item.data}}</text>
				<uni-badge :text="item.noread" type="error"></uni-badge>
			</view>
		</view>
	</view> 
</template>

<script>
	//引入时间库
	import $T from '@/common/time.js';
	
	export default{
		comments:{

		},
		props:{
			item:Object,
			index:Number
		},
		// //过滤器
		filters:{
			formatTime(value){
				return $T.gettime(value)
			}
		},
		methods:{
			open(){
				uni.navigateTo({
					url: '../../pages/user-chat/user-chat',
				});
			}
		}
	}
</script>

<style>
</style>
