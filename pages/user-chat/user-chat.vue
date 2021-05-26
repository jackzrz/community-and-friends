<template>
	<view>
		<!-- 聊天列表 -->
		<!-- <scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'"> -->
		<scroll-view scroll-y="true" style="position:absolute;left:0;top:0;right:0;bottom:100rpx" :scroll-into-view="scrollInto" scroll-with-animation>
		<block v-for="(item,index) in list" :key="index">	
		<view :id="'chat'+index">
		<user-chat-list :item="item" :index="index" :pretime="index>0?list[index-1].create_time:0  "></user-chat-list>
		</view>
		</block>
		<view style="padding-bottom: 115rpx;"></view>
		</scroll-view>
		<!-- 底部操作条 -->
		<view style="height: 100rpx;" class="fixed-bottom flex align-center border-top bg-white">
			<input  v-model="content" type="text" confirm-type="send"  class="flex-1 rounded  ml-2 bg-light" style="height: 60rpx;"
				placeholder="文明发言" @confirm="submit"/>
			<view class="iconfont icon-fabu flex align-center justify-center font-md animated"
				hover-class="text-main tada" style="width: 100rpx;" @click="submit"></view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				scrollInto:10,
				content:"",
				scrollH: 500,
				list: [{
					user_id: 2,
					avatar: "/static/default.jpg",
					username: "昵称",
					data: "你好啊",
					type: "text",
					create_time: 1570783530
				},{
					user_id: 2,
					avatar: "/static/default.jpg",
					username: "昵称",
					data: "你好啊",
					type: "text",
					create_time: 1570786530
				},{
					user_id: 1,
					avatar: "/static/default.jpg",
					username: "昵称",
					data: "你好啊",
					type: "text",
					create_time: 1570783530
				},{
					user_id: 2,
					avatar: "/static/default.jpg",
					username: "昵称",
					data: "你好啊",
					type: "text",
					create_time: 1570783530
				},{
					user_id: 1,
					avatar: "/static/default.jpg",
					username: "昵称",
					data: "你好啊",
					type: "text",
					create_time: 1570783530
				},{
					user_id: 2,
					avatar: "/static/default.jpg",
					username: "昵称",
					data: "你好啊",
					type: "text",
					create_time: 1570783530
				},{
					user_id: 1,
					avatar: "/static/default.jpg",
					username: "昵称",
					data: "你好啊",
					type: "text",
					create_time: 1570783530
				},{
					user_id: 2,
					avatar: "/static/default.jpg",
					username: "昵称",
					data: "你好啊",
					type: "text",
					create_time: 1570783530
				},{
					user_id: 1,
					avatar: "/static/default.jpg",
					username: "昵称",
					data: "你好啊",
					type: "text",
					create_time: 1570783530
				},{
					user_id: 2,
					avatar: "/static/default.jpg",
					username: "昵称",
					data: "你好啊",
					type: "text",
					create_time: 1570783530
				},{
					user_id: 1,
					avatar: "/static/default.jpg",
					username: "昵称",
					data: "你好啊",
					type: "text",
					create_time: 1570783530
				},{
					user_id: 2,
					avatar: "/static/default.jpg",
					username: "昵称",
					data: "你好啊",
					type: "text",
					create_time: 1570783530
				},{
					user_id: 1,
					avatar: "/static/default.jpg",
					username: "昵称",
					data: "你好啊",
					type: "text",
					create_time: 1570783530
				},{
					user_id: 2,
					avatar: "/static/default.jpg",
					username: "昵称",
					data: "你好啊",
					type: "text",
					create_time: 1570783530
				}]
			}
		},

		onLoad() {
			uni.getSystemInfo({
				success: res => {
					console.log(res);
					this.scrollH = res.windowHeight - uni.upx2px(101)
				}
			})
			
		},
		
		onReady(){
			this.pageToBottom();
		}
	,
		methods: {
			// 发送
			submit(){
				let obj={
					user_id: 1,
					avatar: "/static/default.jpg",
					username: "昵称",
					data: this.content,
					type: "text",
					create_time: (new Date()).getTime()
				}
				if(this.content===''){
					return uni.showToast({
						title:"消息不能为空",
					    icon:'none'
					})
				}
				this.list.push(obj)
				//清空输入框
				this.content='';
				setTimeout(()=>{
					this.pageToBottom()
				},1000
				)
	
			},
			pageToBottom(){
				let lastIndex=this.list.length-1;
				if(lastIndex<0)return;
				this.scrollInto='chat'+lastIndex
			}

		}
	}
</script>

<style>

</style>
