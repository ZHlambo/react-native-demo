<template>
  <view class="content">
    <view class="status_bar"></view>
    <view style="position: relative;">
      <!-- 这里是状态栏 -->
      <image class="content-close" src="/static/img/icon_close_back@2x.png" />
      <image class="content-img" src="/static/img/icon_jixiangwu@2x.png" />
    </view>
    <view style="position: relative;">
      <view class="input-view">
        <text class="input-view-left">+86</text>
        <input maxlength="11" type="number" v-model="mobile" @input="resetError" />
        <image @click="mobile = ''" src="/static/img/icon_cancel@2x.png" v-if="mobile" />
      </view>
      <view class="input-view">
        <input :type="!show_password ? 'password' : 'text'" v-model="password" @input="resetError" />
        <image @click="show_password = !show_password" src="/static/img/icon_eye_close@2x.png" v-if="!show_password" />
        <image @click="show_password = !show_password" src="/static/img/icon_cancel@2x.png" v-else />
      </view>
      <view v-if="login_error" class="login-error">{{ login_error }}</view>
    </view>
    <view :class="{ 'btn-dis': login_loading }" @click="loginPhone" class="btn-radius">登录</view>
    <view class="other-login-phone">
      <view class="" @click="toPhoneLogin">短信登录/注册</view>
      <view class="">忘记密码</view>
    </view>
    <div style="position:fixed;bottom:20rpx;left:0;width:100%;padding: 0rpx 56rpx;">
      <OtherWayLogin></OtherWayLogin>
    </div>
  </view>
</template>

<script setup lang="ts">
import { Md5 } from "ts-md5";
import useStore from "@/lib/stores/user";
import { routers as mainRouters } from '@/pages/host/routers';
import http from "@/lib/http";
import OtherWayLogin from '@/pages/login/other_way_login_component.vue' 
import { ref } from "vue";
const mobile = ref("19900000000");
const password = ref("123456");
const show_password = ref(false);
let login_loading = ref(false);
let login_error = ref("");

const userStore = useStore();
/* debug */
if (userStore.bindPhoneParams.register_code) {
  uni.navigateTo({url: "/pages/login/phone"});
}
const resetError = () => {
  // login_error.value = "";
}

const loginPhone = async () => {
  if (!mobile.value || mobile.value.length < 11) {
    uni.showToast({
      icon: "none",
      title: "请输入正确的手机号码",
    });
  }
  var body = {
    mobile: `+86-${mobile.value}`,
    password: Md5.hashStr(password.value),
  };
  login_loading.value = true;
  const res = await http.post("/api/uc/auth/login", body).catch((err) => {
    login_loading.value = false;
  });
  if (!res) return;
  if (res.code) {
    login_error.value = res.message;
    login_loading.value = false;
  } else {
    res.result.mobile = body.mobile;
    userStore.setUser(res.result);
    let user = await http.get("/mapi/v3/user?1=1").catch((err) => {
      login_loading.value = false;
    });
    if (!user) return;
    user = user.result;

    user.access_token = res.result.access_token;
    userStore.setUser(user);
    uni.navigateTo({
      url: "/pages/host/index",
    });
  }
};

function toPhoneLogin() {
	uni.navigateTo({
		url:"/pages/login/login_phone"
	})
}
</script>

<style scoped lang="scss">
.btn-radius {
  width: 638rpx;
  height: 94rpx;
  line-height: 94rpx;
  text-align: center;
  background: #ffe14c;
  border-radius: 47rpx;
  font-size: 32rpx;
  color: #222222;
  margin: auto;
  margin-top: 120rpx;
}

.btn-dis {
  opacity: 0.6;
}

.other-login-phone {
  display: flex;
  justify-content: space-between;
  font-size: 32rpx;
  color: #2B2B2B;
  margin: 40rpx 56rpx;
}

.login-error {
  position: absolute;
  left: 56rpx;
  bottom: -44rpx;
  line-height: 24rpx;
  font-size: 24rpx;
  color: #F24957;
}

.status_bar {
  height: var(--status-bar-height);
  width: 100%;
}

.content {
  text-align: center;
}

.content-close {
  position: absolute;
  top: 32rpx;
  left: 48rpx;
  width: 32rpx;
  height: 32rpx;
}

.content-img {
  height: 220rpx;
  width: 328rpx;
  margin: auto;
  margin-top: 104rpx;
  margin-bottom: 10rpx;
}

.input-view {
  margin: 32rpx 56rpx;
  margin-bottom: 0;
  height: 100rpx;
  line-height: 100rpx;
  border-bottom: 1px solid #e1e1e1;
  display: flex;
  align-items: center;
  text-align: left;

  input {
    flex: 1;
    font-size: 32rpx;
  }

  .input-view-left~input {
    padding-left: 23rpx;
  }

  image {
    width: 23rpx;
    height: 23rpx;
    padding: 10rpx;
    box-sizing: content-box;
  }
}

.content-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.other-login-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text-color-999;

  &::before,
  &::after {
    display: block;
    content: " ";
    width: 216rpx;
    height: 1px;
    background: #e1e1e1;
    margin: 0 18rpx;
  }
}

.other-login-icons {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: $text-color-999;

  >view {
    width: 160rpx;
  }

  image {
    width: 80rpx;
    height: 80rpx;
    margin-bottom: 10rpx;
  }
}

.protocols {
  text-align: center;
  margin: 48rpx 56rpx;
  margin-bottom: 18rpx;
  line-height: 34rpx;
  color: #a3a3a3;

  >text {
    color: $text-color-blue;
  }
}
</style>
