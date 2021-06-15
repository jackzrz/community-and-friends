<template>
	<view>
		<view class="flex align-center justify-between px-2">
			<text class="font-md">热门分类</text>
			<view class="flex align-center font text-secondary" @click="openMore">
				更多 <text class="iconfont icon-jinru"></text>
			</view>
		</view>
		<view class="flex align-center py-3 border-bottom px-2">
			<view v-for="(item,index) in hotCate" :key="index" class="border rounded bg-light px-1 mx-1 animated "
				hover-class="tada"@click="openMore">{{item.className}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['hotCate'],
		methods: {
			openMore() {
				console.log("more");
				uni.navigateTo({
					url: '../../pages/topic-nav/topic-nav'
				});
			},

			// openDetail(item) {
			// 	console.log("detail")
			// }
		}
	}
</script>

<style>
</style>
