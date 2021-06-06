<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view class="">
			<view class="iconfont icon-guanbi flex align-center justify-center fong-lg mt-1"
				style="width: 100rpx; height: 100rpx;" hover-class="bg-light" @click="back"></view>
		</view>
		<view class="px-2">
			<view class="text-center font-lg " style="padding-top: 130rpx;padding-bottom: 70rpx;">
				{{status?'手机验证码登录':'账号密码登录'}}
			</view>
			<template v-if="!status">
				<view class="mb-2">
					<input type="text" placeholder="昵称/手机号/邮箱" v-model="username" class="border-bottom p-2" />
				</view>
				<view class="mb-2  flex align-stretch">
					<input type="text" placeholder="输入密码" v-model="password" class="border-bottom p-2 flex-1" />
					<view class="border-bottom flex align-center justify-center font text-muted" style="width: 150rpx;">
						忘记密码
					</view>
				</view>
			</template>

			<template v-else>
				<view class="mb-2 flex align-stretch">
					<view class="border-bottom flex align-center justify-center font px-2">+86</view>
					<input type="text" placeholder="手机号" v-model="phone" class="border-bottom p-2 flex-1" />
				</view>
				<view class="mb-2  flex align-stretch">
					<input type="text" placeholder="请输入验证码" v-model="code" class="border-bottom p-2 flex-1" />
					<view class="border-bottom flex align-center justify-center font text-white " style="width: 180rpx;"
						:class="codeTime>0?'bg-main-disabled':'bg-main'" @click="getCode">
						{{codeTime>0?codeTime+'秒':'获取验证码'}}
					</view>
				</view>

			</template>
		</view>
		<view class="py-2 px-3">
			<button class="bg-main text-white " style="border-radius: 50rpx;border: 0;" type="primary"
				:disabled="disabled" :class="disabled?'bg-main-disabled':'bg-main'" @click="submit">登录</button>
		</view>

		<view class="flex align-center justify-center pt-2 pb-4">
			<view class="text-primary font-sm" @click="changeStatus()">{{status?'社交账号登录':'验证码登录'}}</view>
			<view class="text-primary mx-2">|</view>
			<view class="text-primary font-sm">登录遇到问题</view>
		</view>

		<view class="flex align-center justify-center ">
			<view style="height: 1rpx;background-color: #dddddd;width: 100rpx;"></view>
			<view class="mx-2 text-muted">社交账号登录</view>
			<view style="height: 1rpx;background-color: #dddddd;width: 100rpx;"></view>
		</view>

	<other-login></other-login>
		<view class="flex align-center justify-center text-muted">注册即代表同意
			<text class="text-primary">《XXX社区协议》</text>
		</view>

	</view>
</template>

<script>
	import otherLogin from "@/components/common/other-login.vue"
	export default {
		components:{
			otherLogin
		},
		data() {
			return {
				status: false,
				code: "",
				phone: "",
				username: "",
				password: "",
				codeTime: 0
			}
		},

		onLoad() {
			let {
				statusBarHeight
			} = uni.getSystemInfoSync()
			this.statusBarHeight = 40
		},
		computed: {
			disabled() {
				if ((this.username === '' || this.password === '') && (this.phone === '' || this.code === '')) {
					return true;
				}
				return false;
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			changeStatus() {
				this.initForm()
				this.status = !this.status

			},
			initForm() {
				this.username = ''
				this.password = ''
				this.phone = ''
				this.code = ''
			},
			// 表单验证
			validate(){
				//手机号正则
				// var mPattern = /^1[34578]d{9}$/; //http://caibaojian.com/regexp-example.html

			// if(!mPattern.test(this.phone)){
			// 	uni.showToast({
			// 		title: '手机号不正确',
			// 		icon:'none'
			// 	});
			// 	return false
			// }
			return true;
				
			},
			submit(){
				// 表单验证
				if(!this.validate()){
					return;
				}
				// 提交后端
				// 登录成功处理
			},
			
			getCode() {
				//防止重复获取
				if (this.codeTime > 0) {
					return
				}
				if(!this.validate()){
					return;
				}
				// 倒计时
				this.codeTime = 60
				let timer = setInterval(() => {
					if (this.codeTime >= 1) {
						this.codeTime--
					} else {
						this.codeTime = 0
						clearInterval(timer)
					}
				}, 1000)
			}
		}
	}
</script>

<style>

</style>
