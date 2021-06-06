<template>
<view style="height: 100rpx;" class="fixed-bottom flex align-center border-top bg-white">
		<input  v-model="content" type="text" confirm-type="send"  class="flex-1 rounded  ml-2 bg-light" style="height: 60rpx;"
			placeholder="文明发言" @confirm="submit"/>
		<view class="iconfont icon-fabu flex align-center justify-center font-md animated"
			hover-class="text-main tada" style="width: 100rpx;" @click="submit"></view>
	</view>
		
</template>

<script>
	export default{
		data(){
			return{
				content:''
			}
		},

		methods:{
			submit(){
				if(this.content===''){
					return uni.showToast({
						title:"消息不能为空",
					    icon:'none'
					})
				}
			
			this.$emit('submit',this.content)
			//清空输入框
			this.content='';
			}
			
			
		}
		
	}
</script>

<style>
</style>
