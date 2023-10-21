import React, { ReactNode, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, LayoutChangeEvent, ScrollResponderEvent, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { measureView, global } from "@/Utils";
import Http from "@/Http";
import Swiper from 'react-native-swiper';
import { connect, useDispatch, useSelector } from "react-redux";
import { IRootReducer } from "@/store";
import { HomeReducerBannerType } from "@/types";
type PropsType = {
  banner: Array<HomeReducerBannerType>,
  setBanner: (e: Array<HomeReducerBannerType>) => void
}
type StateType = {
  tasksViewHeight: number,
  scrollViewHeight: number,
  isBottom: boolean,
}
class PageHome extends React.Component<PropsType, StateType>{
  view: null | View;
  headerView: null | View;
  bannerView: null | View;
  scrollView: null | ScrollView;
  constructor(props: PropsType) {
    super(props)
    this.state = {
      tasksViewHeight: 0,
      scrollViewHeight: 0,
      isBottom: false,
    }
    this.view = null;
    this.headerView = null;
    this.bannerView = null;
    this.scrollView = null;
  }
  componentDidMount(): void {
    Http.get(`/api/app/adverts/position/launch?adverts=banner-home_pe`).then(res => {
      this.props.setBanner(res.result)
      // dispatch({ type: "set_banner", data: res.result });
    });
  }
  componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<StateType>, snapshot?: any): void {
  }
  scrollViewLayout(e: LayoutChangeEvent) {
    console.log(e.nativeEvent.layout);

    Promise.all([
      measureView(this.view),
      measureView(this.headerView),
      measureView(this.bannerView),
    ]).then(res => {
      // console.log(res);
      // console.log(res[2].height);
      this.setState({ scrollViewHeight: res[0].height, tasksViewHeight: res[0].height - res[1].height })
    })
  }
  onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    console.log(e.nativeEvent);
    this.setState({ isBottom: e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height >= e.nativeEvent.contentOffset.y });

  }
  render() {
    const StatusBarHeight = global.statusBarHeight;
    const banner = this.props.banner;
    console.log(this.state.tasksViewHeight);

    return (
      <View style={{ flex: 1, position: "relative", backgroundColor: "white" }} ref={e => this.view = e}>
        <View>
          <View style={styles.absoluteBg}>
            <View style={{ height: StatusBarHeight, backgroundColor: "rgba(255,225,77,1)" }}></View>
            <View style={{ height: global.rem(44 + 12), backgroundColor: "transparent" }}></View>
            <LinearGradient colors={[`rgba(255,225,77,0)`, `rgba(255,225,77,1)`]} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} style={{ height: global.rem(112) }}  >
            </LinearGradient>
          </View>
          <View onLayout={e => this.scrollViewLayout(e)}>
            <View style={styles.banner} ref={e => this.bannerView = e}>
              <Swiper showsButtons={false} dotStyle={styles.dotStyle} activeDotStyle={styles.activeDotStyle} paginationStyle={styles.paginationStyle}>
                {banner.map((e, index) => {
                  return <Image style={{ width: "100%", height: "100%" }} source={{ uri: e.adverts_link }} key={index} />
                })}
              </Swiper>
            </View>
          </View>
        </View>
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
  absoluteBg: {
    position: "absolute",
    top: -(global.statusBarHeight + global.rem(44 + 12)),
    // top: 0,
    left: 0,
    width: "100%",
  },
  banner: {
    width: global.rem(351),
    height: global.rem(142),
    marginLeft: global.rem(12),
    borderRadius: global.rem(8),
    overflow: "hidden",
  },
  paginationStyle: {
    bottom: global.rem(8),
  },
  dotStyle: {
    width: global.rem(4),
    height: global.rem(4),
    background: 'rgba(0,0,0,0.2)',
    borderColor: "rgba(255,255,255,0.2)",
    borderWidth: global.onePx,
  },
  activeDotStyle: {
    width: global.rem(10),
    height: global.rem(4),
    backgroundColor: "#FFE14D",
  }
})
export default connect((state: IRootReducer) => ({
  banner: state.HomeReducer.banner
}), (dispatch) => ({
  setBanner: (e: Array<HomeReducerBannerType>) => dispatch({ type: "set_banner", data: e })
}))(PageHome);