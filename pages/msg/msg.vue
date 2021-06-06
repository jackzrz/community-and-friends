<template>
	<view>
		<!-- 消息列表 -->
		<template v-if="list.length>0">
			<block v-for="(item,index) in list " :key="index">
				<msg-list :item="item" :index="index"></msg-list>
			</block>
		</template>
		<template v-else>
			<no-thingg></no-thingg>
		</template>

		<uni-popup ref="popup" type="top">
			<view class="bg-white">
				<view class="flex align-center justify-center fond border-bottom py-2 " hover-class="bg-light"
					@click="popupEvent('friend')">
					<text class="iconfont icon-sousuo mr-2"></text>添加好友
				</view>
				<view class="flex align-center justify-center fond py-2" hover-class="bg-light"
					@click="popupEvent('clear')">
					<text class="iconfont icon-shanchu mr-2"></text>清除列表
				</view>
			</view>
		</uni-popup>


	</view>
</template>


<script>
	const demo = [{
		avtar: "../../static/default.jpg",
		username: "张三丰",
		update_time: "1570718427",
		data: "内容 调的房间内的 大幅度发声大幅度 ",
		noread: 20
	}, {
		avtar: "../../static/default.jpg",
		username: "张三丰",
		update_time: "1570718427",
		data: "内容 调的房间内的 大幅度发声大幅度 ",
		noread: 20
	}, {
		avtar: "../../static/default.jpg",
		username: "张三丰",
		update_time: "1570718427",
		data: "内容 调的房间内的 大幅度发声大幅度 ",
		noread: 20
	}]

	//import msgList from '@/components/common/msg-list.vue'
	import noThingg from '@/components/common/no-thing.vue'
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'

	export default {
		components: {
			//	msgList,
			noThingg,
			uniPopup
		},
		data() {
			return {
				list: [{
						avtar: "../../static/default.jpg",
						username: "张三",
						update_time: "1590686679",
						data: "消息消息消息消息消息消息消息消息消息",
						noread: 10
					},
					{
						avtar: "../../static/default.jpg",
						username: "张三",
						update_time: "1590686679",
						data: "消息消息消息消息消息消息消息消息消息",
						noread: 15
					}
				]
			}
		},
		onPullDownRefresh() {
			this.refresh()
		},

		onNavigationBarButtonTap(e) {
			switch (e.index) {
				case 0:
					uni.navigateTo({
						url: '../user-list/user-list',
					});

					this.$refs.popup.close();
					break;
				case 1:
					this.$refs.popup.open('top')
					//this.$refs.popup.open();
					break;
			}
		},

		methods: {
			refresh() {
				setTimeout(() => {
					this.list = demo
					// 停止下拉刷新
					uni.stopPullDownRefresh()
				}, 1500);

			},
			popupEvent(e) {
				switch (e) {
					case 'friend':
						console.log(e);
						uni.navigateTo({
							url: '../search/search?type=user',
	
						});
						break;
					case 'clear':
						console.log(e);
						break;
				}
				this.$refs.popup.close();
			}
		}
	}
</script>

<style>

</style>
