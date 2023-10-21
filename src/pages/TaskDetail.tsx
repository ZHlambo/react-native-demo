import { global } from "@/Utils";
import React from "react"
import Navigator from "@/components/Navigator";
import { View, Text, ScrollView, Image, StyleSheet, Alert, Animated, Easing, TouchableWithoutFeedback } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import Http from "@/Http";
import { GlobalReducerPlatformsType, TaskType, NativeStackNavigationPropType } from "@/types";
import { BoxShadow } from 'react-native-shadow'
import { connect } from "react-redux";
import { IRootReducer } from "@/store";
type PropsType = NativeStackNavigationPropType & {
  platforms: GlobalReducerPlatformsType
}
type ViewUsersItem = { alias: string, icon: string, text: string, marginLeft?: number }
type StateType = {
  card_id: number
  viewUsers: Array<Array<ViewUsersItem>>
  task: null | TaskType
  fadeInOpacity: Animated.Value
  rotation: Animated.Value
  fontSize: Animated.Value
}
class TaskDetail extends React.Component<PropsType, StateType> {
  card_id: number = 0
  constructor(props: PropsType) {
    super(props);
    this.state = {
      card_id: 0,
      viewUsers: [],
      // [
      //   [
      //     { marginLeft: 0, icon: require("@/assets/imgs/task_detail/icon_fenxiang_weixin.webp"), alias: "用户名称", message: "正在查看" },
      //     { marginLeft: 0, icon: require("@/assets/imgs/task_detail/icon_fenxiang_weixin.webp"), alias: "用户名称1", message: "正在查看" },
      //     { marginLeft: 0, icon: require("@/assets/imgs/task_detail/icon_fenxiang_weixin.webp"), alias: "用户名称2", message: "正在查看" },
      //     { marginLeft: 0, icon: require("@/assets/imgs/task_detail/icon_fenxiang_weixin.webp"), alias: "用户名称3", message: "正在查看" },
      //     { marginLeft: 0, icon: require("@/assets/imgs/task_detail/icon_fenxiang_weixin.webp"), alias: "用户名称4", message: "正在查看" },
      //   ].map(e => {
      //     e.marginLeft = global.rem(Math.random() * 22 + 22);
      //     return e;
      //   }),
      //   [
      //     { marginLeft: 0, icon: require("@/assets/imgs/task_detail/icon_fenxiang_weixin.webp"), alias: "用户名称", message: "正在查看" },
      //     { marginLeft: 0, icon: require("@/assets/imgs/task_detail/icon_fenxiang_weixin.webp"), alias: "用户名称1", message: "正在查看" },
      //     { marginLeft: 0, icon: require("@/assets/imgs/task_detail/icon_fenxiang_weixin.webp"), alias: "用户名称2", message: "正在查看" },
      //     { marginLeft: 0, icon: require("@/assets/imgs/task_detail/icon_fenxiang_weixin.webp"), alias: "用户名称3", message: "正在查看" },
      //     { marginLeft: 0, icon: require("@/assets/imgs/task_detail/icon_fenxiang_weixin.webp"), alias: "用户名称4", message: "正在查看" },
      //   ].map(e => {
      //     e.marginLeft = global.rem(Math.random() * 22 + 22);
      //     return e;
      //   })
      // ]
      task: null,
      fadeInOpacity: new Animated.Value(0),
      rotation: new Animated.Value(0),
      fontSize: new Animated.Value(0)
    }
  }
  static getDerivedStateFromProps(prevProps: PropsType) {
    return {
      card_id: prevProps.route.params?.card_id
    }
  }
  componentDidMount(): void {

    Http.get(`/mapi/v3/card/${this.state.card_id}`).then(res => {
      this.setState({ task: res.result })
    })
    Http.get(`/mapi/card/viewUsers?card_id=${this.state.card_id}`).then(res => {
      const arr: Array<ViewUsersItem> = res.result;
      const list: Array<Array<ViewUsersItem>> = [];
      arr.forEach((e, index) => {
        list[Math.ceil(index % 5)] = list[Math.ceil(index % 5)] || [];
        e.marginLeft = global.rem(Math.random() * 22 + 22);
        list[Math.ceil(index % 5)].push(e);
      })
      this.setState({ viewUsers: list }, () => {
        const config1 = {
          toValue: 1,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: false,
        };
        const config2 = {
          toValue: 0,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: false,
        };
        Animated.parallel([
          Animated.timing(this.state.fadeInOpacity, config1),
          Animated.timing(this.state.rotation, config1),
          Animated.timing(this.state.fontSize, config1),
        ]).start((e) => {
        })
      });
    })
  }
  render() {
    const { task, viewUsers } = this.state;
    const { platforms } = this.props;
    const platformConditions = (task?.task_info?.platform_condition_list || []).slice(0, 3);

    return (
      <View style={{ backgroundColor: "#E4AA80", flex: 1 }}>
        <View style={{ opacity: 0, position: "absolute", left: 0, top: 0, width: "100%" }}>
          <Navigator title="任务详情" navigation={this.props.navigation} />
        </View>
        <View>
          <View style={{ height: global.statusBarHeight }}></View>
          <View style={{ height: global.rem(44), paddingHorizontal: global.rem(12), flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <Image source={require("@/assets/imgs/base/back.webp")} style={{ width: global.rem(24), height: global.rem(24) }}></Image>
            </TouchableWithoutFeedback>
            <View style={{ flex: 1 }}></View>
            <View style={{ width: global.rem(88), height: global.rem(24), backgroundColor: "white", borderRadius: global.rem(4), alignItems: "center", justifyContent: "center", }}>
              <Text style={{ fontSize: global.rem(12), color: "#FC910D" }}>邀请好友参与</Text>
            </View>
            <Image style={{ width: global.rem(4), height: global.rem(8), marginRight: global.rem(4) }} source={require("@/assets/imgs/task_detail/icon_qipao.webp")} />
            <Image style={{ width: global.rem(24), height: global.rem(24) }} source={require("@/assets/imgs/task_detail/icon_fenxiang_weixin.webp")} />
          </View>
        </View>
        {task && <>
          <View style={styles.infoBox}>
            <View style={{ flexDirection: "row", }}>
              <BoxShadow setting={styles.imgShadow}>
                <Image style={{ width: global.rem(98), height: global.rem(98), borderWidth: global.rem(2), borderColor: "white", borderRadius: global.rem(8), }} source={{ uri: task.product_icon }} />
              </BoxShadow>
              <View style={{ marginLeft: global.rem(12), flex: 1 }}>
                <Text numberOfLines={2} style={{ marginTop: global.rem(8), fontSize: global.rem(18), lineHeight: global.rem(26), fontWeight: "500", color: "white" }}>{task.task_name}{task.task_name}{task.task_name}{task.task_name}{task.task_name}{task.task_name}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "rgba(255,255,255,0.55)", fontSize: global.rem(12), lineHeight: global.rem(20), marginTop: global.rem(4) }}>佣金计划丨粉丝下单返￥6.98/件</Text>
                  <Image style={{ width: global.rem(16), height: global.rem(16) }} source={require("@/assets/imgs/task_detail/icon_fenxiang_weixin.webp")} />
                </View>
              </View>
            </View>
            <View style={{ height: global.onePx, width: "100%", backgroundColor: "rgba(255,255,255,0.15)", marginVertical: global.rem(12) }}></View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {(task.card_identifies || []).map((e, index) => {
                return <Text style={styles.tips} key={index}>{e}</Text>
              })}
              <Text style={{ flex: 1 }}></Text>
              <Image style={{ width: global.rem(12), height: global.rem(20) }} source={require("@/assets/imgs/task_detail/icon_fenxiang_weixin.webp")} />
              <Text style={styles.categories}>{(task.categories || []).map(e => e.name).join("·")}</Text>

            </View>
            <View style={{ marginTop: global.rem(12), flexDirection: "row", alignItems: "flex-end" }}>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: global.rem(24), height: global.rem(24), lineHeight: global.rem(24), color: "white" }}>No.12</Text>
                  <Image style={{ width: global.rem(16), height: global.rem(16), marginTop: global.rem(8) }} source={require("@/assets/imgs/task_detail/icon_fenxiang_weixin.webp")} />
                </View>
                <Text style={{ color: "rgba(255,255,255,0.55)", fontSize: global.rem(12), marginTop: global.rem(4) }}>自媒体热度指数62万</Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
                {platformConditions?.length ? platformConditions.map((item, index) => {
                  return <View style={styles.platformItem} key={index}>
                    <Image style={{ ...styles.platformItemImg, zIndex: platformConditions.length - index }} key={item.name}
                      source={index == 2 ? require("@/assets/imgs/home/icon_shoye_sousuo.webp") : { uri: platforms?.find(e => e.name == item.name)?.platform_icon }} />
                  </View>
                }) : ""}
              </View>
            </View>
          </View>
          <Animated.View style={styles.infoBox}>
            <View>
              <Text>asdfads</Text>
            </View>
            <View style={{ position: "relative", overflow: "hidden", backgroundColor: "rgba(0,0,0,0.1)", marginTop: global.rem(12), height: global.rem(116), borderRadius: global.rem(4) }}>
              {viewUsers.map((item, index) => (<Animated.View style={{
                flexDirection: "row", flexWrap: "nowrap", marginTop: global.rem(18)
              }}>
                {item.map((e, index) => (<Animated.View key={index} style={{
                  left: this.state.fadeInOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["100%", "-100%"]
                  }), flexDirection: "row", alignItems: "center", marginLeft: e.marginLeft, paddingRight: global.rem(8), backgroundColor: "rgba(255,255,255,0.1)", borderRadius: global.rem(12)
                }}>
                  <Image style={{ width: global.rem(24), height: global.rem(24), borderRadius: global.rem(12) }} source={{ uri: e.icon }} />
                  <Text style={{ fontSize: global.rem(12), color: "white", marginLeft: global.rem(4) }}>{e.alias + e.text}</Text>
                </Animated.View>))}
              </Animated.View>))}

            </View>
          </Animated.View>
        </>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imgShadow: {
    width: global.rem(98 - 2 * 2),
    height: global.rem(98 - 2 * 2),
    color: "#000",
    border: global.rem(10),
    radius: global.rem(8),
    opacity: 0.2,
    x: global.rem(2),
    y: global.rem(2),
    style: { marginTop: global.rem(-16), }
  },
  infoBox: {
    position: "relative",
    paddingHorizontal: global.rem(12),
    marginTop: global.rem(28),
    marginHorizontal: global.rem(12),
    height: global.rem(192),
    backgroundColor: "rgba(0,0,0,.15)",
    borderRadius: global.rem(12)
  },
  tips: {
    paddingHorizontal: global.rem(4),
    lineHeight: global.rem(20),
    fontSize: global.rem(12),
    color: "white",
    marginRight: global.rem(8),
    borderRadius: global.rem(4),
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  categories: {
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingRight: global.rem(12),
    marginRight: global.rem(-12),
    fontSize: global.rem(14),
    color: "rgba(255,255,255,0.55)",
    lineHeight: global.rem(20),
    height: global.rem(20),
  },

  platforms: {
    flexDirection: "row",
  },
  platformItem: {
    marginLeft: global.rem(-8),
  },
  platformItemImg: {
    width: global.rem(20),
    height: global.rem(20),
    borderRadius: global.rem(20),
    borderWidth: global.onePx * 2,
    borderColor: "white",
  },
})
export default connect((state: IRootReducer) => ({
  platforms: state.GlobalReducer.platforms
}))(TaskDetail);