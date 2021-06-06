<template>
	<view class="flex align-center px-5 py-5">
		<!-- <view class="flex-1 flex align-center justify-center" v-for="(item,index) in providerList" :key="index" >
			<view :class="item.icon+' '+item.bgColor" 
				class="iconfont font-lg text-white flex align-center justify-center rounded-circle"
				style="width: 100rpx ;height: 100rpx ;"></view>
		</view> -->

		<view class="flex-1 flex align-center justify-center" v-for="(item,index) in providerList" :key="index">
			<view :class="item.icon+' '+item.bgColor"
				class="iconfont font-lg  text-white flex align-center justify-center rounded-circle"
				style="width: 100rpx ;height: 100rpx ;"></view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				providerList: [],
				provider: ["qq", "weixin", "univerify", "sinaweibo"]
			}
		},
		mounted() {
			uni.getProvider({
				service: 'oauth',
				success: (result) => {
					// console.log(result)
					//未找到需要排除的方法 
					this.providerList = result.provider.map((value) => {
						let providerName = '';
						let icon = '';
						let bgColor = ''
						switch (value) {
							case 'weixin':
								providerName = '微信登录'
								icon = 'icon-weixin'
								bgColor = 'bg-success'
								break;
							case 'qq':
								providerName = 'QQ登录'
								icon = 'icon-QQ'
								bgColor = 'bg-primary'
								break;
							case 'sinaweibo':
								providerName = '新浪微博登录'
								icon = 'icon-xinlangweibo'
								bgColor = 'bg-warning'
								break;
							case 'univerify':
								providerName = '一键登录'
								icon = 'icon-xinlangweibo'
								bgColor = 'bg-warning'
								break;
							default:
								break;
						}
						return {
							name: providerName,
							id: value,
							icon: icon,
							bgColor: bgColor,
						}
					}).filter((value) => {
						return value.name !== ''
					});

					console.log(this.providerList)

				},
				fail: (error) => {
					console.log('获取登录通道失败', error);
				}
			});

		}
	}
</script>

<style>
</style>
