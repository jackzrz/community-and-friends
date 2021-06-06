<template>
	<view>
	<!-- 	<uni-list-item title="浏览历史" showArrow>
			<view slot="header" class="slot-box">
				<text  class="iconfont icon-liulan font-lg mr-1" ></text>
			</view>
		</uni-list-item> -->
		<uni-list>
		<uni-list-item  :border="false" title="头像" showArrow clickable @click="changeUserPic">
			<template slot="footer">
				<image class="slot-image rounded-circle" style="height: 120rpx;width: 120rpx;" :src="userPic" ></image>
			    <text class="iconfont icon-bianji1 mt-4 ml-2"></text>
			</template>
		</uni-list-item>
		
		<uni-list-item :border="false" title="昵称" showArrow >
			<input class="uni-input text-right"  v-model="username"/>
		</uni-list-item>
		<uni-list-item :border="false" title="性别" showArrow rightText="不限"></uni-list-item>
		<uni-list-item :border="false" title="生日" showArrow :rightText="birthday"></uni-list-item>
		
		<!-- <picker mode="date" :value="birthday" @change="onDateChange">
			<view>
				<uni-list-item :border="false" title="生日"  clickable showArrow :rightText="birthday"></uni-list-item>
			</view>
		</picker> -->
		
		<uni-list-item :border="false" title="情感" showArrow rightText="已婚"></uni-list-item>
		<uni-list-item :border="false" title="职业" showArrow rightText="IT"></uni-list-item>
		<uni-list-item :border="false" title="家乡" showArrow rightText="广东广州"></uni-list-item>
		</uni-list>
	<view class="py-2 px-3">
		<button  class="bg-main text-white "
			style="border-radius: 50rpx;border: 0;" type="primary" >设置</button>
	</view>
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
				userPic:"/static/default.jpg",
				username:"jackzhou",
				birthday:"2019-03-18"
			}
		},
		methods: {
			// 修改生日
			onDateChange(e){
				console.log(e)
				
			},
			changeUserPic(){
				console.log("1111")
				uni.chooseImage({
					count:1,
					sizeType:["compressed"],
					sourceType:["album","camera"],
					success:(res)=>{
					//	console.log(res);
						this.userPic=res.tempFilePaths[0]
					}
				})
			}
		}
	}
</script>

<style>

</style>
