<template>
  <view class="content">
    <image class="header-image" src="/static/img/auth/icon_duanxinyannzhengma@2x.png" />
    <view class="text-left">
      消息发送至 +86 {{ mobile_str }}，请查看短信并输入验证码
    </view>
    <view class="codes">
      <text v-for="(item, index) in codes" :key="index"
        :class="{ 'codes-active': verify_code.length == index || (verify_code.length == 4 && index == 3) }">{{ item
        }}</text>
      <input ref="inputRef" type="number" v-model="verify_code" maxlength="4" @input="changeCodes">
    </view>
    <view class="send-box">
      <view v-if="second != 0" class="resend">重新发送（{{ second }}s）</view>
      <view v-else @click="sendCode" style="color: #449EF2">获取验证码</view>
      <view v-if="err_str" class="mt-20" style="color: #F24957">{{ err_str }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import userUseStore from "@/lib/stores/user";
import { routers as mainRouters } from '@/pages/host/routers';
import http from "@/lib/http";
import config from "@/lib/config";
import { reactive, ref, onBeforeUnmount, onMounted } from "vue";

const inputRef = ref(null);
const userStore = userUseStore();
const props = defineProps({
  title: String,
});
if (props.title) {
  uni.setNavigationBarTitle({
    title: props.title
  })
}
onMounted(() => {
  console.log(inputRef.value);
})
let mobile_arr = (userStore.bindPhoneParams.mobile || "").split("");
mobile_arr[3] = " *";
mobile_arr[4] = "*";
mobile_arr[5] = "*";
mobile_arr[6] = "* ";
const mobile_str = mobile_arr.join("");
const INIT_SECOND = 60;
const second = ref(0);
const verify_code = ref("");
const err_str = ref("");
const codes = reactive(new Array(4).fill("").map((e, index) => {
  return verify_code.value.split("")[index] || "";
}));
/* debug */
console.log(JSON.stringify(userStore.bindPhoneParams));
let type = userStore.bindPhoneParams.type || "wechat";
let flag = userStore.bindPhoneParams.flag;
let app_id = type == "wechat" ? config.wechat_app_id : config.wechat_app_id;
const confirmCode = () => {
  http.post(`/api/uc/Oauth2/${type}/register/${app_id}`, {
    code: userStore.bindPhoneParams.register_code,
    mobile: userStore.bindPhoneParams.mobile,
    verify_code: (!config.is_prd && verify_code.value == "6666") ? config.test_verify_code : verify_code.value
  }).then(res => {
    uni.hideLoading();
    if (inputRef.value) {
      console.log(inputRef.value);
      console.log(JSON.stringify(inputRef.value));
      (inputRef.value as HTMLImageElement).blur();
    }
    if (res.code) {
      err_str.value = res.message;
      return;
    }
    uni.showToast({ icon: "none", title: "绑定成功" });
    uni.navigateTo({ url: mainRouters.main });
  }).catch(() => {
    uni.hideLoading();
  })
}
const changeCodes = () => {
  codes.forEach((e, index) => {
    codes[index] = verify_code.value.split("")[index] || "";
  })
  err_str.value = "";
  if (verify_code.value.length == 4) {
    confirmCode();
  }
}
const sendCode = () => {
  second.value = INIT_SECOND;
  uni.showToast({ icon: "none", title: "验证码发送成功" })
  return;
  uni.showLoading();
  http.post(`/api/uc/auth/verify/code/mobile`, {
    mobile: userStore.bindPhoneParams.mobile,
    flag: flag,
  }).then(res => {
    if (res.code) {
      uni.hideLoading();
      return uni.showToast({ icon: "none", title: res.message });
    }
    second.value = INIT_SECOND;
    uni.showToast({ icon: "none", title: "验证码发送成功" })
  }).catch(() => {
    uni.hideLoading();
  })
}
sendCode();
const _interval = setInterval(() => {
  if (second.value) {
    second.value--;
  }
}, 1000)
onBeforeUnmount(() => {
  clearInterval(_interval);
})
console.log(props);

// import globalUseStore from "@/lib/stores/global";
// import GtSDK from "@/lib/geet";
// import http from "@/lib/http";
// import { ref } from "vue";

// interface Geetest {
//   challenge: string;
//   gt: string;
//   local_key: string;
// }

// const globalStore = globalUseStore();
// const mobile = ref("19900000000");
// const completed = ref(false);
// const gt_loaded = ref(false);
// const gt_success = ref(false);
// console.log(globalStore.mobile_cn);
// const gtSdk = new GtSDK();
// const init = () => {
//   gt_loaded.value = false;
//   gt_success.value = false;
//   gtSdk.initAsyncTaskGT3Captcha(() => {
//     gt_loaded.value = true;
//   });
// }
// const changeMobile = () => {
//   init();
//   completed.value = new RegExp(globalStore.mobile_cn).test(mobile.value);
// }
// changeMobile();
// init();
// const clickNext = () => {
//   if (!gt_loaded.value) {
//     return uni.showToast({ icon: "none", title: "加载中" });
//   }
//   if (!mobile.value) {
//     return;
//   }
//   console.log("-------", gt_success.value);

//   if (gt_success.value) {
//     return uni.navigateTo({ url: "/pages/auth/code" });
//   } else {
//     gtSdk.startAsyncTaskCaptcha(() => {
//       gt_success.value = true;
//       uni.navigateTo({ url: "/pages/auth/code" });
//     });
//   }
// }
// http.post(`/api/uc/Oauth2/${type}/register/${config.wechat_app_id}`, {
//   code: res.result.code,
//   register_code: res.result.code,
//   // mobile: res.result.code,
// }).then(register_res => {
//   console.log(register_res);
//   uni.hideLoading();
// }).catch(() => uni.hideLoading());
</script>

<style lang="scss" scoped>
.content {
  padding: 0 56rpx;
  font-size: 28rpx;
  font-weight: 400;
  color: #222222;
  line-height: 40rpx;
  text-align: center;
}

.header-image {
  margin: 54rpx auto 44rpx auto;
  width: 128rpx;
  height: 128rpx;
}

.codes {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 32rpx;

  >text {
    width: 80rpx;
    height: 104rpx;
    line-height: 104rpx;
    background: #F5F5F5;
    border-radius: 8rpx;
    text-align: center;
    margin-right: 24rpx;

    &.codes-active {
      border: 2rpx solid #FFE14C;
    }
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 0;
    width: 100%;
    height: 100%;
    caret-color: transparent;
  }
}

.send-box {
  margin-top: 32rpx;
  text-align: left;
}

.resend {
  font-size: 28rpx;
  font-weight: 400;
  color: #999999;
  line-height: 40rpx;
}
</style>
