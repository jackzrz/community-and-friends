<template>
	<view>
		<view class="flex align-center justify-center flex-column pt-4 pb-3">
			<image src="../../static/common/nothing.png" sytle="width:60rph;height:60rpx" 
			class="rounded-circle " mode="widthFix"></image>
			<text class="font text-muted mt-2">version 1.0.1</text>


		</view>
		
		<uni-list-item :border="false" title="新版本检测" showArrow clickable  ></uni-list-item>
		<uni-list-item :border="false" title="社区用户协议" showArrow clickable />
				
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
