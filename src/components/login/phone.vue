<template>
  <view class="content">
    <view class="input-view">
      <text class="input-view-left">+86</text>
      <input maxlength="11" type="number" placeholder="请输入手机号" v-model="mobile" @input="changeMobile" />
      <image @click="mobile = ''" src="/static/img/icon_cancel@2x.png" v-if="mobile" />
    </view>
    <view :class="{ 'btn-dis': !completed }" @click="clickNext" class="btn-radius">下一步</view>
  </view>
</template>

<script setup lang="ts">
import globalUseStore from "@/lib/stores/global";
import userUseStore from "@/lib/stores/user";
import gtSdk from "@/lib/geet";
import { ref } from "vue";

const globalStore = globalUseStore();
const userStore = userUseStore();
/* debug */
console.log(JSON.stringify(userStore.bindPhoneParams));
if (userStore.bindPhoneParams.mobile) {
  uni.navigateTo({url: `/pages/login/code?mobile=${userStore.register_mobile}&title=${"用户首次登录绑定手机"}`});
}
const mobile = ref("18306677680");
const completed = ref(false);
const gt_loaded = ref(false);
const gt_success = ref(false);
console.log(globalStore.mobile_cn);
const initGt = () => {
  gt_loaded.value = false;
  gt_success.value = false;
  gtSdk.initAsyncTaskGT3Captcha(() => {
    gt_loaded.value = true;
  });
}
const changeMobile = () => {
  initGt();
  completed.value = new RegExp(globalStore.mobile_cn).test(mobile.value);
}
changeMobile();
const clickNext = () => {
  if (!gt_loaded.value) {
    return uni.showToast({ icon: "none", title: "加载中，请稍后重试。。。" });
  }
  if (!mobile.value) {
    return;
  }
  if (gt_success.value) {
    return uni.navigateTo({ url: "/pages/login/code" });
  } else {
    gtSdk.startAsyncTaskCaptcha(() => {
      gt_success.value = true;
      userStore.setRegisterMobile(mobile.value);
      uni.navigateTo({url: `/pages/login/code?mobile=${userStore.register_mobile}&title=${"用户首次登录绑定手机"}`});
    });
  }
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
  margin: 120rpx auto auto;
}

.btn-dis {
  opacity: 0.6;
}

.input-view {
  margin: 32rpx 56rpx 0;
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
    padding-left: 24rpx;
  }

  image {
    width: 23rpx;
    height: 23rpx;
    padding: 10rpx;
    box-sizing: content-box;
  }
}
</style>
