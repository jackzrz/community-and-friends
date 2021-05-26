<template>
	<view>
		<view v-if="shortTime" class="py-2 flex align-center justify-center font-sm text-secondary">{{shortTime}}</view>
		<view class="flex align-center px-2 my-2" :style="isSelf?'flex-direction:row-reverse ;':''">
			<image :src="item.avatar" class="rounded-circle " style="height: 90rpx; width: 90rpx;">
			</image>
			<view class="bg-light p-2 rounded mx-2" style="max-width: 450rpx;">{{item.data}}</view>
		</view>
	</view>
</template>

<script>
	//模拟当前登录用户user_id
	const uid = 1
	import $T from '@/common/time.js'

	export default {
		props: {
			item: Object,
			index: Number,
			pretime: [Number, String]
		},

		computed: {
			isSelf() {
				return uid === this.item.user_id
			},
			shortTime() {
				return $T.getChatTime(this.item.create_time, this.pretime);
			}
		},
		data() {
			return {
				uid: 1

			}
		}
	}
</script>

<style>
</style>
