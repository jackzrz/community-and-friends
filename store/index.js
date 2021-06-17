import  Vue from 'vue'
import  Vuex from 'vuex'

Vue.use(Vuex)

export  default new Vuex.Store({
	state:{
		loginStatus:false,
		token:{},
		member:{}
	},
	mutations:{
		// changeLoginStatus(state,{num}){
		// 	state.loginStatus=num
		// }
		login(state,token){
			state.loginStatus=true;
			state.token=token
			uni.setStorageSync('token',JSON.stringify(token))
		},
		
		member(state,member){
			state.member=member
			uni.setStorageSync('member',JSON.stringify(member))
		},
		//初始化登录状态
		initUser(c){
			let token= JSON.parse(uni.getStorageSync('token'));
			let member=JSON.parse(uni.getStorageSync('member'));
			if(member){
				state.member=member
				state.token=token;
				state.loginStatus=true;
			}
		},
		//退出登录
		logout(state){
			state.member={}
			state.token={}
			state.loginStatus=false;
			uni.removeStorageSync('member');
			uni.removeStorageSync('token');
		}
		
	
		
	}
})