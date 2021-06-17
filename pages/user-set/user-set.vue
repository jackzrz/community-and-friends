<template>
	<view>
		<template v-if="loginStatus">
		<uni-list-item :border="false" title="账号与安全" showArrow clickable @click="open('user-password')"></uni-list-item>
		<uni-list-item :border="false" title="绑定设置" showArrow clickable @click="open('user-email')" />
		<uni-list-item :border="false" title="资料编辑" showArrow clickable @click="open('user-info')" />
		</template>
		<uni-list-item :border="false" title="清除缓存" showArrow clickable :rightText="currentSize|format" @click="clear"/>
		<uni-list-item v-if="loginStatus" :border="false" title="意见反馈" showArrow clickable @click="open('user-feedback')" />
		<uni-list-item :border="false" title="关于社区" showArrow clickable @click="open('about')" />
		<view class="py-2 px-3">
			<button v-if="loginStatus" class="bg-main text-white " style="border-radius: 50rpx;border: 0;" type="primary" @click="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	import {mapState} from 'vuex'
	export default {
		components: {
			uniListItem
		},

		data() {
			return {
				currentSize: 0
			}
		},

		onLoad() {
		 this.getStorageInfo()
		},

		filters: {
			format(value) {
				return value > 1024 ? (value / 1024).toFixed(2) + 'MB' : value.toFixed(2) + 'KB'
			}
		},
		computed:{
			...mapState({
				loginStatus:state=>state.loginStatus
			})
		},
		methods: {
			logout(){
			uni.showModal({
				// title: '',
				content: '是否要退出登录',
				// cancelText: '',
				// confirmText: '',
				success: res => {
					if(res.confirm){
						this.$store.commit('logout');
						uni.navigateBack({
							delta: 1
						});
						uni.showToast({
							title: '退出登录成功',
							icon:'none'
						});
					}
				},

			});
				
			},
			getStorageInfo(){
				let res = uni.getStorageInfoSync()
				this.currentSize = res.currentSize
			},
			clear() {
				uni.showModal({
					title: '提示',
					content: '是否要清除缓存？',
					cancelText: '不清除',
					confirmText: '清除',
					success: res => {
						if(res.confirm){
							uni.clearStorage();
							this.getStorageInfo();
							uni.showToast({
								title: '清除成功'
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},

			open(path) {
				//console.log(path)
				//？？todo url用模板字符串不起作用
				uni.navigateTo({
					url: '/pages/' + path + '/' + path,
					fail: (res) => {
						console.log(res)
					}
				});
			}

		}
	}
</script>

<style>

</style>
