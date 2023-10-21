<template>
	<view>
		<view class="other-way-title">
			<text>其他登录方式</text>
		</view>
		<view class="flex">
			<view class="other-login-btn" @click="onOtherwayLogin(btn.tag)" v-for="btn in otherLoginBtns">
				<image :src="btn.icon"></image>
				<text>{{ btn.name }}</text>
			</view>
		</view>
		<view class="protocol-container">
			<text class="protocol-start">完成登录，则默认同意</text>
			<text @click="onClickProtocol(protocol.url)" v-for="protocol in protocols">{{ protocol.name }}</text>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { isIos, isInMobileDevice } from '@/utils/platform-utils'
	import useStore from "@/lib/stores/user";
	import { routers as mainRouters } from '@/pages/host/routers';
	import http from "@/lib/http";
	
	const userStore = useStore();
	
	const otherLoginBtns = [{
		icon: "/static/img/icon_login_wechat@2x.png",
		name: "微信登录",
		tag: "weixin"
	}, {
		icon: "/static/img/icon_login_weibo@2x.png",
		name: "微博登录",
		tag: "weibo"
	}, {
		icon: "/static/img/icon_login_yijiandenglu@2x.png",
		name: "一键登录",
		tag: "oneclick"
	}]
	
	
	if (isIos()) {
		otherLoginBtns.push({
		icon: "/static/img/icon_login_apple@2x.png",
		name: "通过苹果登录",
		tag: "apply"
	})
	}

	const protocols = [{
		name: "《智蜂用户协议》",
		url: "001"
	}, {
		name: "《智蜂委托服务协议》",
		url: "002"
	}, {
		name: "《隐私声明》",
		url: "003"
	}
	]

	function onOtherwayLogin(otherway : string) {
		
		if (!isInMobileDevice()) {
			uni.showToast({
				title: '非手机设备',
				icon:"error",
			})
			return
		}
		
		switch (otherway) {
			case "weixin":
				onWeChatLogin()
				break;
			case "weibo":
				onWeiboLogin()
				break;
			case "oneclick":
				onOneClickLogin()
				break;
			case "apply":
				onAppleLogin()
				break;
			default:
				break;
		}

	}


	function onWeChatLogin() {
		uni.showLoading();
		uni.login({
		  provider: 'weixin', //使用微信登录
		  success: function (loginRes) {
		    let authResult: any = loginRes.authResult;
		    const type = "wechat";
		    const body = {
		      app_id: 101,
		      expires_in: authResult.expires_in,
		      access_token: authResult.access_token,
		      id: authResult.unionid,
		      account: authResult.openid,
		      platform_name: type,
		    };
		    http.post(`/api/uc/Oauth2/${type}/token/app`, body).then(res => {
		      if (res.code) {
		        uni.hideLoading();
		        uni.showToast({ icon: "none", title: res.message, });
		      } else if (res.result.code) {/* 授权未注册 */
		        uni.hideLoading();
		        userStore.setBindPhoneParams({
		          register_code: res.result.code,
		          flag: userStore.PhoneCodeFlag.BIND,
		          type: type,
		        });
		        uni.navigateTo({url: "/pages/login/phone"});
		      } else {/* 授权登录成功 */
		        uni.hideLoading();
		        userStore.setUser(res.result);
				uni.navigateTo({url: mainRouters.main});
		      }
		      console.log(res);
		    }).catch(() => uni.hideLoading());
		    console.log(loginRes);
		  },
		  fail: () => {
			uni.showToast({ icon: "none", title: "调用微信授权失败，请使用其他方式", });
		  	uni.hideLoading()
		  }
		  // "authResult": {
		  //     "access_token": "67_ku85v7xXohWC95TaQPcSl9qH8AlNFszvyEwBliuJqBpQOWaaTp-SClE3UAr0IgYwtUE4wSbFo3cOJIhtejHeDEZDzqimw9JvUtxHi5_QDoE",
		  //     "expires_in": 7200,
		  //     "refresh_token": "67_qW8UihUVfnJBZx6SY02pwuxoFhB2BQjruxejTFg2Wq1gPGygNz7vNBoO9EG1Tn-AWf_gkcDze91bOLzAMsmJMKQlrLdW9HthTridcvMS4Fs",
		  //     "openid": "oRrdQtxTqcayYGgs165byL0wynkU",
		  //     "scope": "snsapi_userinfo",
		  //     "unionid": "oU5Yyt5EQ_KgM8WQZKsT--r3jSBQ"
		  // },
		});
		// login_error.value = "";
	}

	function onWeiboLogin() {
		uni.showLoading();
		uni.login({
		  provider: 'sinaweibo', //使用微信登录
		  success: function (loginRes) {
			console.log(loginRes);
		    let authResult: any = loginRes.authResult;
		    const type = "weibo";
		    const body = {
		      app_id: 101,
		      expires_in: authResult.expires_in,
		      access_token: authResult.access_token,
		      id: authResult.unionid,
		      account: authResult.openid,
		      platform_name: type,
		    };
		    http.post(`/api/uc/Oauth2/${type}/token/app`, body).then(res => {
		      if (res.code) {
		        uni.hideLoading();
		        uni.showToast({ icon: "none", title: res.message, });
		      } else if (res.result.code) {/* 授权未注册 */
		        uni.hideLoading();
		        userStore.setBindPhoneParams({
		          register_code: res.result.code,
		          flag: userStore.PhoneCodeFlag.BIND,
		          type: type,
		        });
		        uni.navigateTo({url: "/pages/login/phone"});
		      } else {/* 授权登录成功 */
		        uni.hideLoading();
		        userStore.setUser(res.result);
				uni.navigateTo({url: "pages/home/index"});
		      }
		      console.log(res);
		    }).catch(() => uni.hideLoading());
		    console.log(loginRes);
		  },
		  fail: () => {
			uni.showToast({ icon: "none", title: "调用微信授权失败，请使用其他方式", });
		  	uni.hideLoading()
		  }
		  // "authResult": {
		  //     "access_token": "67_ku85v7xXohWC95TaQPcSl9qH8AlNFszvyEwBliuJqBpQOWaaTp-SClE3UAr0IgYwtUE4wSbFo3cOJIhtejHeDEZDzqimw9JvUtxHi5_QDoE",
		  //     "expires_in": 7200,
		  //     "refresh_token": "67_qW8UihUVfnJBZx6SY02pwuxoFhB2BQjruxejTFg2Wq1gPGygNz7vNBoO9EG1Tn-AWf_gkcDze91bOLzAMsmJMKQlrLdW9HthTridcvMS4Fs",
		  //     "openid": "oRrdQtxTqcayYGgs165byL0wynkU",
		  //     "scope": "snsapi_userinfo",
		  //     "unionid": "oU5Yyt5EQ_KgM8WQZKsT--r3jSBQ"
		  // },
		});
	}

	function onOneClickLogin() {
		console.log("onOneClickLogin")
	}

	function onAppleLogin() {
		console.log("onAppleLogin")

	}
	
	function onClickProtocol(url: string) {
		console.log(`Protocol url: ${url}`)
	}
	
</script>

<style scoped lang="scss">
	.other-way-title {
		display: flex;
		align-items: center;

		text {
			font-size: 28rpx;
			color: $text-color-999;
		}

		&::before,
		&::after {
			content: "";
			display: block;
			flex: 1;
			height: 2rpx;
			background-color: #e1e1e1;
			margin-right: 20rpx;
		}

		&::after {
			margin-right: 0rpx;
			margin-left: 20rpx;
		}
	}

	.other-login-btn {
		flex: 1;
		text-align: center;
		margin-top: 40rpx;

		image {
			height: 80rpx;
			width: 80rpx;
		}

		text {
			display: block;
			font-size: 24rpx;
			margin-top: 10rpx;
			color: $text-color-666;
		}
	}

	.protocol-container {
		margin-top: 48rpx;

		text {
			color: $text-color-666;
			font-size: 24rpx;
		}

		.protocol-start~text {
			color: #449EF2;
		}
	}
</style>