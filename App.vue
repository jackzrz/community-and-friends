<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//检测更新
		    
			//初始化数据
			
			this.$U.update()
			// 网络监听
			this.$U.onNetWork();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/uni.css";

	/*自定义图标库*/
	@import "./common/icon.css";

	/*字体动画样式库*/
	@import "./common/animate.min.css";

	/* 自定义样式库 */
	@import "./common/free.css";

	/* 全局样式 */
	@import "./common/common.css";
</style>
