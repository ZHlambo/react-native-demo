import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { componentDidMount, global, measureView } from "@/Utils";
import Http from "@/Http";
import BaseStyle from "@/BaseStyle";
import { HomeReducerSlugType, NativeStackNavigationPropType, TaskType } from "@/types";
import LinearGradient from "react-native-linear-gradient";
type PropsType = {
  // slugs: Array<HomeReducerSlugType>,
  // tasks: Array<TaskType>,
  // setSlugs: (e: Array<HomeReducerSlugType>) => void,
  // setSlugTasks: (e: Array<TaskType>) => void,
} & NativeStackNavigationPropType
class Personal extends React.Component<
  PropsType,
  {
    slugs: Array<HomeReducerSlugType>,
    tasks: Array<TaskType>,
    activeIndex: number,
    offset: number,
    loading: boolean,
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      offset: 0,
      activeIndex: 0,
      slugs: [],
      tasks: [],
    }
  }
  tools = [
    { label: "我的名片", src: require("@/assets/imgs/personal/gerenzhongxin_icon_wodemingpian.webp") },
    { label: "邀请好友", src: require("@/assets/imgs/personal/gerenzhongxin_icon_yaoqinghaoyou.webp") },
    { label: "帮助与反馈", src: require("@/assets/imgs/personal/gerenzhongxin_icon_help.webp") },
    { label: "在线客服", src: require("@/assets/imgs/personal/gerenzhongxin_icon_kefu.webp") },
    { label: "我的关注", src: require("@/assets/imgs/personal/gerenzhongxin_icon_guanzhu.webp") },
    { label: "要我开票", src: require("@/assets/imgs/personal/gerenzhongxin_icon_kaipiao.webp") },
  ]
  componentDidMount(): void {
    Http.get(`/mapi/v3/common/section`).then(res => {
      this.setState({ slugs: res.result, offset: 0 }, () => {
        this.getTasks();
      });
    })
  }
  changeSlugIndex(index: number) {
    this.setState({ activeIndex: index, offset: 0 }, () => {
      this.getTasks();
    })
  }
  getTasks() {
    const { activeIndex, offset, slugs } = this.state;
    if (!slugs.length) return;
    let searchText = slugs[activeIndex].slug;
    let query = `?limit=30&offset=${offset}&modeTags=&orderby=update_time%3Adesc&platformFansMax=0&platformFansMin=0&platformName=&searchBy=activity&searchText=${encodeURIComponent(searchText)}`;
    this.setState({ tasks: [], loading: true });
    Http.get(`/mapi/v3/card${query}`).then(res => {
      this.setState({ loading: false });
      if (offset == 0) {
        if (slugs[activeIndex].image_url) {
          res.result.data.unshift(slugs[activeIndex].image_url)
        }
        this.setState({ tasks: res.result.data });
      } else {
        this.setState({ tasks: this.state.tasks.concat(res.result.data) });
      }
    })
  }
  render(): React.ReactNode {
    const { activeIndex, slugs, tasks, loading } = this.state
    return (
      <View style={{ flex: 1, position: "relative" }}>
        <View style={{ backgroundColor: "rgba(255,225,77,1)", position: "absolute", left: 0, top: 0, width: "100%", zIndex: 1 }}>
          <View style={{ height: global.statusBarHeight }}></View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end", marginRight: global.rem(16), marginBottom: global.rem(12) }}>
            <View style={{ marginRight: global.rem(24) }}>
              <Image source={require("@/assets/imgs/personal/shouye_icon_set.webp")} />
              <Text style={{ color: "rgba(0,0,0,.9)", fontSize: global.rem(12), lineHeight: global.rem(20) }}>设置</Text>
            </View>
            <View>
              <Image source={require("@/assets/imgs/personal/shouye_icon_xiaoxi.webp")} />
              <Text style={{ color: "rgba(0,0,0,.9)", fontSize: global.rem(12), lineHeight: global.rem(20) }}>消息</Text>
            </View>
          </View>
        </View>
        <ScrollView style={{ flex: 1, backgroundColor: "#FAFAFA", }}>
          <View style={{ backgroundColor: "rgba(255,225,77,1)" }}>
            <View style={{ height: global.statusBarHeight }}></View>
            <View style={{ height: global.rem(56) }}></View>
            <View style={{ paddingVertical: global.rem(12), paddingHorizontal: global.rem(16), flexDirection: "row", }}>
              <Image style={{ width: global.rem(64), height: global.rem(64), borderRadius: global.rem(64), backgroundColor: "#999", marginRight: global.rem(12) }} source={require("@/assets/imgs/personal/shouye_icon_xiaoxi.webp")} />
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "rgba(0,0,0,.9)", fontSize: global.rem(22), lineHeight: global.rem(30), fontWeight: "500", alignItems: "center" }}>一休</Text>
                  <Image style={{ width: global.rem(16), height: global.rem(16), marginLeft: global.rem(4) }} source={require("@/assets/imgs/personal/icon_more2.webp")} />
                </View>
                <View style={{ flexDirection: "row", marginTop: global.rem(8) }}>
                  <Text style={{ marginRight: global.rem(16) }}>关注 102</Text>
                  <Text>粉丝 76</Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <LinearGradient colors={[`rgba(255,225,77,0)`, `rgba(255,225,77,1)`]} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} style={{ height: global.rem(120) }}  >
            </LinearGradient>
            <View style={{ borderRadius: global.rem(8), borderWidth: global.onePx, borderColor: "#F0F0F0", marginTop: global.rem(24 - 120), marginHorizontal: global.rem(12), overflow: "hidden", position: "relative" }}>
              <LinearGradient colors={[`#FFFFFF`, `#FFFAE0`]} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} style={{ height: global.rem(144), padding: global.rem(12) }}  >
                <Image style={{ width: global.rem(32), height: global.rem(24), position: "absolute", top: global.rem(8), left: global.rem(8) }} source={require("@/assets/imgs/personal/gerenzhongxin_img_yinhao.webp")} />
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ fontSize: global.rem(12), fontWeight: "500", color: "rgba(0,0,0,.9)", lineHeight: global.rem(26) }}>加入智蜂 <Text style={{ fontSize: global.rem(18) }}>999</Text> 天</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: global.rem(108), height: global.rem(32), backgroundColor: "#FFEE99", borderRadius: global.rem(32) }}>
                    <Image style={{ width: global.rem(10), height: global.rem(14), marginRight: global.rem(4) }} source={require("@/assets/imgs/personal/icon_more2.webp")} />
                    <Text>今日签到</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: global.rem(16) }}>
                  <LinearGradient colors={[`#FFEE99`, `#FFF6CC`]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={{ flexDirection: "row", justifyContent: "space-between", height: global.rem(72), width: global.rem(159), borderRadius: global.rem(8), padding: global.rem(12) }}  >
                    <View>
                      <Text style={{ fontSize: global.rem(14), lineHeight: global.rem(24), marginBottom: global.rem(4), color: "rgba(0,0,0,.9)", fontWeight: "500" }}>V1基础特权</Text>
                      <Text style={{ fontSize: global.rem(14), lineHeight: global.rem(22), color: "rgba(0,0,0,0.6)" }}>会员等级</Text>
                    </View>
                    <Image style={{ width: global.rem(48), height: global.rem(48) }} source={require("@/assets/imgs/personal/gerenzhongxin_img_huiyuan.webp")} />
                  </LinearGradient>
                  <LinearGradient colors={[`#BDDFFF`, `#E0F0FF`]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={{ flexDirection: "row", justifyContent: "space-between", height: global.rem(72), width: global.rem(159), borderRadius: global.rem(8), padding: global.rem(12) }}  >
                    <View>
                      <Text style={{ fontSize: global.rem(14), lineHeight: global.rem(24), marginBottom: global.rem(4), color: "rgba(0,0,0,.9)", fontWeight: "500" }}>加入享特权</Text>
                      <Text style={{ fontSize: global.rem(14), lineHeight: global.rem(22), color: "rgba(0,0,0,0.6)" }}>测品保障</Text>
                    </View>
                    <Image style={{ width: global.rem(48), height: global.rem(48) }} source={require("@/assets/imgs/personal/gerenzhongxin_img_baozhang.webp")} />
                  </LinearGradient>
                </View>
              </LinearGradient>
              <View style={{ margin: global.rem(12), backgroundColor: "white", borderWidth: global.onePx, borderColor: "#F0F0F0", borderRadius: global.rem(8), padding: global.rem(12) }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: global.rem(16), lineHeight: global.rem(24), fontWeight: "500", color: "rgba(0,0,0,.9)" }}>我的任务</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: global.rem(14), lineHeight: global.rem(24), color: "rgba(0,0,0,.6)" }}>全部</Text>
                    <Image style={{ width: global.rem(16), height: global.rem(16) }} source={require("@/assets/imgs/personal/icon_more.webp")} />
                  </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: global.rem(12) }}>
                  <View>
                    <Image style={{ width: global.rem(40), height: global.rem(40) }} source={require("@/assets/imgs/personal/gerenzhongxin_icon_daiwancheng.webp")} />
                    <Text style={{ fontSize: global.rem(12), lineHeight: global.rem(20), marginTop: global.rem(6), color: "rgba(0,0,0,.6)" }}>待完成</Text>
                  </View>
                  <View>
                    <Image style={{ width: global.rem(40), height: global.rem(40) }} source={require("@/assets/imgs/personal/gerenzhongxin_icon_shenhezhong.webp")} />
                    <Text style={{ fontSize: global.rem(12), lineHeight: global.rem(20), marginTop: global.rem(6), color: "rgba(0,0,0,.6)" }}>审核中</Text>
                  </View>
                  <View>
                    <Image style={{ width: global.rem(40), height: global.rem(40) }} source={require("@/assets/imgs/personal/gerenzhongxin_icon_yituiguang.webp")} />
                    <Text style={{ fontSize: global.rem(12), lineHeight: global.rem(20), marginTop: global.rem(6), color: "rgba(0,0,0,.6)" }}>已推广</Text>
                  </View>
                  <View>
                    <Image style={{ width: global.rem(40), height: global.rem(40) }} source={require("@/assets/imgs/personal/gerenzhongxin_icon_yiguanbi.webp")} />
                    <Text style={{ fontSize: global.rem(12), lineHeight: global.rem(20), marginTop: global.rem(6), color: "rgba(0,0,0,.6)" }}>已关闭</Text>
                  </View>
                  <View>
                    <Image style={{ width: global.rem(40), height: global.rem(40) }} source={require("@/assets/imgs/personal/gerenzhongxin_icon_cepinzhifu.webp")} />
                    <Text style={{ fontSize: global.rem(12), lineHeight: global.rem(20), marginTop: global.rem(6), color: "rgba(0,0,0,.6)" }}>测品支付</Text>
                  </View>
                </View>
              </View>
              <View style={{ margin: global.rem(12), backgroundColor: "white", borderWidth: global.onePx, borderColor: "#F0F0F0", borderRadius: global.rem(8), padding: global.rem(12) }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: global.rem(16), lineHeight: global.rem(24), fontWeight: "500", color: "rgba(0,0,0,.9)" }}>资产钱包</Text>
                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: global.rem(12) }}>
                  <View style={{ padding: global.rem(8), backgroundColor: "#F6F6F6", borderRadius: global.rem(4), width: global.rem(143), marginRight: global.rem(10) }}>
                    <Text style={{ fontSize: global.rem(14), lineHeight: global.rem(22), fontWeight: "500", color: "rgba(0,0,0,.9)" }}>5000.00</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: global.rem(6), }}>
                      <Text style={{ fontSize: global.rem(12), lineHeight: global.rem(20), color: "rgba(0,0,0,.6)" }}>余额明细</Text>
                      <Image style={{ marginLeft: global.rem(4), width: global.rem(16), height: global.rem(16) }} source={require("@/assets/imgs/personal/icon_more.webp")} />
                    </View>
                  </View>
                  <View style={{ padding: global.rem(8), backgroundColor: "#F6F6F6", borderRadius: global.rem(4), width: global.rem(143) }}>
                    <Text style={{ fontSize: global.rem(14), lineHeight: global.rem(22), fontWeight: "500", color: "rgba(0,0,0,.9)" }}>订单结算记录</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: global.rem(6), }}>
                      <Text style={{ fontSize: global.rem(12), lineHeight: global.rem(20), color: "rgba(0,0,0,.6)" }}><Text style={{ color: "#FC910D" }}>0</Text> 个订单待结算</Text>
                      <Image style={{ marginLeft: global.rem(4), width: global.rem(16), height: global.rem(16) }} source={require("@/assets/imgs/personal/icon_more.webp")} />
                    </View>
                  </View>
                  <View style={{ padding: global.rem(8), backgroundColor: "#F6F6F6", borderRadius: global.rem(4), width: global.rem(143), marginTop: global.rem(8), marginRight: global.rem(10) }}>
                    <Text style={{ fontSize: global.rem(14), lineHeight: global.rem(22), fontWeight: "500", color: "rgba(0,0,0,.9)" }}>1</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: global.rem(6), }}>
                      <Text style={{ fontSize: global.rem(12), lineHeight: global.rem(20), color: "rgba(0,0,0,.6)" }}>我的卡券</Text>
                      <Image style={{ marginLeft: global.rem(4), width: global.rem(16), height: global.rem(16) }} source={require("@/assets/imgs/personal/icon_more.webp")} />
                    </View>
                  </View>
                  <View style={{ padding: global.rem(8), backgroundColor: "#F6F6F6", borderRadius: global.rem(4), width: global.rem(143), marginTop: global.rem(8) }}>
                    <Text style={{ fontSize: global.rem(14), lineHeight: global.rem(22), fontWeight: "500", color: "rgba(0,0,0,.9)" }}>任务结算记录</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: global.rem(6), }}>
                      <Text style={{ fontSize: global.rem(12), lineHeight: global.rem(20), color: "rgba(0,0,0,.6)" }}><Text style={{ color: "#FC910D" }}>0</Text> 个任务待结算</Text>
                      <Image style={{ marginLeft: global.rem(4), width: global.rem(16), height: global.rem(16) }} source={require("@/assets/imgs/personal/icon_more.webp")} />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ margin: global.rem(12), backgroundColor: "white", borderWidth: global.onePx, borderColor: "#F0F0F0", borderRadius: global.rem(8), padding: global.rem(12) }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: global.rem(-4) }}>
                  <Text style={{ fontSize: global.rem(16), lineHeight: global.rem(24), fontWeight: "500", color: "rgba(0,0,0,.9)" }}>常用工具</Text>
                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {this.tools.map((e, index) => (<View key={e.label} style={{ width: global.rem(64), flexDirection: "column", alignItems: "center", marginTop: global.rem(16), marginRight: index == 3 ? 0 : global.rem(12) }}>
                    <Image style={{ width: global.rem(24), height: global.rem(24) }} source={e.src} />
                    <Text style={{ fontSize: global.rem(12), lineHeight: global.rem(20), marginTop: global.rem(8), color: "rgba(0,0,0,.6)" }}>{e.label}</Text>
                  </View>))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: global.rem(16),
    paddingRight: global.rem(12),
    paddingBottom: global.rem(12),
    height: global.rem(44 + 12),
    backgroundColor: "rgba(255,225,77,1)",
  },
  slugsView: {
    height: global.rem(48),
    paddingLeft: global.rem(12),
    paddingRight: global.rem(12),
    backgroundColor: "white",
    flexDirection: "row", flexWrap: "nowrap", alignItems: "center"
  },
  slugsFixed: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 10,
    width: "100%",
    borderTopStartRadius: global.rem(8),
    borderTopEndRadius: global.rem(8),
  },
  slugItem: {
    alignItems: "center",
    position: "relative",
  },
  activeBar: {
    position: "absolute",
    left: 0,
    bottom: global.rem(11),
    width: global.rem(50),
    height: global.rem(4),
    borderRadius: global.rem(4),
    zIndex: -1,
  },
  slugText: {
    fontSize: global.rem(14),
    fontWeight: "500",
    color: "#666",
    lineHeight: global.rem(48),
    marginRight: global.rem(12),
  },
  slugActiveText: {
    fontSize: global.rem(18),
    color: "#222",
  },
  search: {
    flexDirection: "row", flexWrap: "nowrap", alignItems: "center", justifyContent: "center",
    borderWidth: global.onePx,
    width: global.rem(62),
    height: global.rem(28),
    borderColor: "#F0F0F0",
    borderRadius: global.rem(14),
    marginLeft: global.rem(12),
  }
})
export default Personal