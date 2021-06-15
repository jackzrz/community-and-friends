<template>
	<view>
		<common-list :item="info" isdetail @follow="follow" @doSupport="doSupport" @doComment="doComment"
			@doShare="doShare">
			<view>{{info.content}}</view>
			<view>
				<image @click="prieview(index)" v-for="(item,index) in info.images" :src="item.url" class="w-100"
					mode="widthFix"></image>
			</view>
		</common-list>
		<divider></divider>
	

		<view class="p-2 font-md font-weight-bold">
			最新评论{{info.postStatisInfo.commentCount}}
		</view>
		<!-- <view class="uni-comment"> -->
		<view class="px-2" v-for="(item,index) in info.postComments" :key="index">
			<view class="uni-comment-list">
				<view class="uni-comment-face">
					<image src="../../static/common/nothing.png" mode="widthFix"></image>
				</view>
				<view class="uni-comment-body">
					<view class="uni-comment-top">
						<text>小猫咪</text>
					</view>
					<view class="uni-comment-content">支持国产，中国必胜</view>
					<view class="uni-comment-date">
						<view>2天前</view>
						<!-- 	<view class='uni-comment-replay-btn'>5回复</view> -->
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 占位 -->
		<view style="height: 100rpx;"></view>
		
		<bottomInput @submit="submit"></bottomInput>
		
        <!-- 分享 -->
		<more-share ref="share"></more-share>

	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue'
	import bottomInput from '@/components/common/bottom-input.vue'
    import moreShare from '@/components/common/more-share.vue'
	export default {
		components: {
			commonList,
			bottomInput,
			moreShare
			
		},
		data() {
			return {
				info: {
					username: "jack zhou",
					userpic: "../../static/default.jpg",
					newstime: "2021-10-20 下午04:30",
					isFollow: false,
					title: "标题",
					titlepic: "../../static/demo/datapic/11.jpg",
					support: {
						type: "support",
						support_count: 1,
						unsupport_count: 2
					},
					content: "选择生育第三胎的家庭将从三口之家变成四口、五口之家，大家庭模式在消费需求和结构的改变的影响将波及到超市、汽车、酒店、旅游等行业，要求这些行业进行供给侧改革",
					images: [{
							url: "/static/demo/datapic/14.jpg",
						},
						{
							url: "/static/demo/datapic/15.jpg"
						},

					],
					comment_count: 2,
					share_num: 5
				}
			}
		},
		onLoad(e) {
			
		
			if (e.detail) {
				this.init(JSON.parse(e.detail))
			}
		},

		computed: {
			imagesList() {
				return this.info.images.map(item => item.url)
			}
		},
		onNavigationBarButtonTap() {
			//	this.$refs.popup.open()
			this.$refs.share.open({
				title:this.info.title,
				shareText:this.info.title,
				href:"http://www.sohu.com",
				image:this.info.titlePic,
			}
			)
		},

		// ?没起作用 
		onBackPress() {
			this.$refs.share.close();
		},


		methods: {
			init(data) {
				uni.setNavigationBarTitle({
					title: data.title
				})
					//请求详情api todo 列表不应带images，content 等大数据
				this.info=data
			    this.info.content=''
				this.info.images=[]
				this.$H.get('/sc-post/api/v1/post/getPostById/'+this.info.id).then(res=>{
					console.log(res);
					this.info.content=res.content;
					this.info.images=res.imglist;
				})
			},
			// 评论
			doComment() {
				console.log("commnet")
			},
			// 分享
			doShare() {
				console.log("share")
			},

			doSupport(e) {
				//之前操作过
				if (this.info.support.type === e.type) {
					return uni.showToast({
						title: '你已经操作过了'
					});
				}
				let msg = e.type === 'support' ? '顶' : '踩'
				// 判断之前是否操作过
				//未顶踩
				if (this.info.support.type === '') {
					//	item.support.type = e.type
					this.info.support[e.type + '_count']++
				} else if (this.info.support.type === 'support' && e.type === 'unsupport') {

					this.info.support.unsupport_count++
				} else if (this.info.support.type === 'unsupport' && e.type === 'support') {

					this.info.support.unsupport_count--
				}
				this.info.support.type = e.type
				uni.showToast({
					title: msg
				});
			},

			follow() {
				this.info.isFollow = true;
				uni.showToast({
					title: '关注成功'
				});
			},
			prieview(index) {
				uni.previewImage({
					urls: this.imagesList,
					current: index

				});
			},
			submit(content) {
				console.log(content);
			},
		}
	}
</script>

<style>

</style>
