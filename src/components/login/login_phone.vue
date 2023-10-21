<template>
	<view class="status-bar"></view>
	<view class="action_bar">
		<image class="close-btn" src="/static/img/icon_close_back@2x.png"/>
	</view>
	<view class="justify-center">
		<image class="login-img" src="/src/static/img/icon_jixiangwu@2x.png"/>
	</view>
	<view class="input-view" style="margin-top: 194rpx;">
		<text class="font-32">+86</text>
		<input
		maxlength="11"
		type="number" v-model="mobile"/>
		<image @click="mobile = ''" 
		v-if="mobile"
		src="/src/static/img/icon_cancel@2x.png"/>
	</view>
	<text class="hint-register-text">未注册的手机号验证后自动创建账号</text>
	<text class="error-text">{{ errorMsg }}</text>
	<view class="submit-btn" :class="{'submit-btn-active': btnActive}" @click="onSubmit"><text>获取验证码</text></view>
	<text class="pwd-login-text" @click="toPwdLogin">账号密码登录</text>
    <div style="position:fixed;bottom:20rpx;left:0;width:100%;padding: 0rpx 56rpx;">
      <OtherWayLogin></OtherWayLogin>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import OtherWayLogin from '@/pages/login/other_way_login_component.vue'

const mobile = ref("")
const errorMsg = ref("")
const btnActive = computed(() => {
	return mobile.value.length >= 11
})

function onSubmit() {
	
}

function toPwdLogin() {
	console.log("toPwdLogin")
	uni.navigateTo({url: "/pages/login/login_phone_pwd"});
}




</script>

<style scoped lang="scss">
	
	.close-btn {
		height: 32rpx;
		width: 32rpx;
		margin-left: 46rpx;
		margin-top: 36rpx;
	}
	
	.login-img {
		width: 314rpx;
		height: 220rpx;
		margin-top: 48rpx;
	}
	
	.input-view {
		display: flex;
		align-items: center;
		border-bottom: solid #e1e1e1 1rpx;
		padding-bottom: 28rpx;
		margin: 0rpx 56rpx;
		
		input {
			flex: 1;
			font-size: 32rpx;
			margin-left: 24rpx;
		}
		
		image {
			height: 30rpx;
			width: 30rpx;
			padding: 4rpx;
		}
	}
	
	.hint-register-text {
		display: block;
		margin: 20rpx 56rpx;
		font-size: 24rpx;
		color: $text-color-999;
	}
	
	.error-text {
		display: block;
		margin: 0rpx 56rpx;
		font-size: 24rpx;
		color: #F24957;
		height: 34rpx;
	}
	
	.submit-btn {
		opacity: 0.6;
		display: flex;
		height: 94rpx;
		background-color: $text-color-them;
		border-radius: 100rpx;
		align-items: center;
		justify-content: center;
		margin: 0rpx 62rpx;
		margin-top: 20rpx;
		pointer-events: none;
		
		text {
			color: $text-color-333;
		}
	
		
	}
	
	
	.submit-btn-active {
		pointer-events: all;
		opacity: 1;
	}
	
	.pwd-login-text {
		display: block;
		font-size: 32rpx;
		color: $text-color-333;
		margin: 40rpx 62rpx;
	}
	
	
	
	
	
	
	
</style>