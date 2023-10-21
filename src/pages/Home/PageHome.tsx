import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableWithoutFeedback, VirtualizedList, Task, NativeSyntheticEvent, NativeScrollEvent, LayoutChangeEvent, Animated } from "react-native";
import { componentDidMount, global, measureView } from "@/Utils";
import Http from "@/Http";
import BaseStyle from "@/BaseStyle";
import { connect, useDispatch, useSelector } from "react-redux";
import { IRootReducer } from "@/store";
import LinearGradient from "react-native-linear-gradient";
import TaskCard from "@/common/TaskCard"
// import WaterfallFlow from '@/components/WaterfallFlow'
import WaterfallFlow from '@/components/react-native-waterfall-flow'
// import WaterfallFlow from "react-native-waterfall-flow";
import { HomeReducerSlugType, NativeStackNavigationPropType, TaskType } from "@/types";
import PageHomeHeader from "./PageHomeHeader";
type PropsType = {
} & NativeStackNavigationPropType
class PageHome extends React.Component<
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
  static getDerivedStateFromProps(props: PropsType) {
    return {};
  }
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
      // console.log(res.result.data);

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
      <View style={{ flex: 1, backgroundColor: "white" }} >
        <View style={{ zIndex: 2 }}>
          <View style={{ height: global.statusBarHeight, backgroundColor: "rgba(255,225,77,1)" }}></View>
          <View style={styles.pageHeader}>
            <Image source={require("@/assets/imgs/home/img_shouye_slogan.webp")} />
            <View style={{ flex: 1 }}></View>
            <View style={{ marginRight: 12 }}>
              <Image style={{ width: 24, height: 24 }} source={require("@/assets/imgs/home/icon_shoye_sousuo.webp")} />
              <Text style={{ fontSize: 10, color: "#222", textAlign: "center" }}>搜素</Text>
            </View>
            <View>
              <Image style={{ width: 24, height: 24 }} source={require("@/assets/imgs/home/icon_shouye_xiaoxi.webp")} />
              <Text style={{ fontSize: 10, color: "#222", textAlign: "center" }}>消息</Text>
            </View>
          </View>
        </View>
        <WaterfallFlow
          style={{ flex: 1 }} data={tasks}
          numColumns={2}
          stickyHeaderIndices={[1]}
          ListHeaderComponentArray={
            [<PageHomeHeader />,
            <View style={styles.slugsView}>
              <ScrollView horizontal={true}>
                {slugs.map((e, index) => {
                  return <TouchableWithoutFeedback key={index} onPress={() => this.changeSlugIndex(index)}>
                    <View style={styles.slugItem}>
                      <Text style={Object.assign({}, styles.slugText, activeIndex == index && styles.slugActiveText)}>{e.slug}</Text>
                      <View style={styles.activeBar}></View>
                      {activeIndex == index && <LinearGradient colors={[`rgba(255,225,77,0)`, `rgba(255,225,77,1)`]} start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} style={styles.activeBar}  >
                      </LinearGradient>}
                    </View>
                  </TouchableWithoutFeedback>
                })}
              </ScrollView>
              <View style={styles.search}>
                <Image style={{ width: global.rem(20), height: global.rem(20) }} source={require("@/assets/imgs/home/icon_shoye_sousuo.webp")} />
                <Text style={{ ...BaseStyle.fontSize14, ...BaseStyle.c222 }}>筛选</Text>
              </View>
            </View>,
            !tasks.length ? <View style={{}}>
              <Text style={{ fontSize: global.rem(16), margin: global.rem(12), textAlign: "center" }}>{loading ? "加载中。。。" : "暂无数据"}</Text>
            </View> : ""
            ]
          }
          renderItem={({ item, index, columnIndex }) => {
            const itemStyle = { marginBottom: global.rem(8), marginLeft: global.rem(12) };
            if (typeof item == "string") {
              return <View key={item} style={itemStyle}>
                <Image style={{ width: global.rem(171), height: global.rem(108), borderRadius: global.rem(8) }} source={{ uri: item }} />
              </View>
            } else {
              return <TouchableWithoutFeedback onPress={() => {
                this.props.navigation.push('任务详情', {
                  card_id: item.card_id,
                })
              }}>
                <View key={item.card_id} style={itemStyle}>
                  <TouchableWithoutFeedback>
                    <TaskCard task={item} />
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            }
          }}
        />
      </View >
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
export default PageHome