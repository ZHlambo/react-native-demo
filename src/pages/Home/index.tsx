
import { View, Text, ScrollView, Image, StyleSheet, ImageBackground, TouchableWithoutFeedback, ImageSourcePropType, StatusBar } from "react-native";
import BaseStyles from "@/BaseStyle";
import { useEffect, useState } from "react";
import { componentDidMount } from "@/Utils";
import Http from "@/Http";
import PageHome from "./PageHome";
import PagePersonal from "./PagePersonal";
import { useSelector, useDispatch } from 'react-redux'   //导入两个hooks
import { IRootReducer } from "@/store";
import { NativeStackNavigationPropType } from "@/types";

type ListItem = {
  unselect_image_url: ImageSourcePropType,
  select_image_url: ImageSourcePropType,
  name: string,
  select_color: string,
  unselect_color: string,
  component: React.JSX.Element,
  has_init: boolean,
}
const Home = (props: NativeStackNavigationPropType) => {
  componentDidMount(() => {
    clickItem(0);
  })
  const [activeIndex, setActiveIndex] = useState(0);

  const tabbars = useSelector((state: IRootReducer) => {  //拿到store中的state
    return state.GlobalReducer.colour?.tabbars
  }) || [];

  const [list, setList] = useState([
    {
      unselect_image_url: require("@/assets/img/xhdpi/bottom_icon_zhuye_normal.webp"),
      select_image_url: require("@/assets/img/xhdpi/bottom_icon_zhuye_choose.webp"),
      name: "智蜂",
      select_color: "#000000",
      unselect_color: "#333333",
      component: <PageHome navigation={props.navigation} route={props.route}/>,
      has_init: false,
    },
    {
      unselect_image_url: require("@/assets/img/xhdpi/bottom_icon_faxian_normal.webp"),
      select_image_url: require("@/assets/img/xhdpi/bottom_icon_faxian_choose.webp"),
      name: "发现",
      select_color: "#000000",
      unselect_color: "#333333",
      component: <PageHome navigation={props.navigation} route={props.route}/>,
      has_init: false,
    },
    {
      unselect_image_url: require("@/assets/img/xhdpi/bottom_icon_renwu_normal.webp"),
      select_image_url: require("@/assets/img/xhdpi/bottom_icon_renwu_choose.webp"),
      name: "任务",
      select_color: "#000000",
      unselect_color: "#333333",
      component: <PageHome navigation={props.navigation} route={props.route}/>,
      has_init: false,
    },
    {
      unselect_image_url: require("@/assets/img/xhdpi/bottom_icon_my_normal.webp"),
      select_image_url: require("@/assets/img/xhdpi/bottom_icon_my_choose.webp"),
      name: "我的",
      select_color: "#000000",
      unselect_color: "#333333",
      component: <PagePersonal navigation={props.navigation} route={props.route}/>,
      has_init: false,
    },
  ])
  function clickItem(index: number) {
    list[index] = { ...list[index], has_init: true, };
    setList([...list]);
    setActiveIndex(index);
  }
  const renderList = list.map((e, index) => {
    e = { ...e };
    e.unselect_image_url = tabbars[index]?.unselect_image_url ? { uri: tabbars[index].unselect_image_url } : e.unselect_image_url;
    e.select_image_url = tabbars[index]?.select_image_url ? { uri: tabbars[index].select_image_url } : e.select_image_url;
    e.name = tabbars[index]?.name || e.name;
    e.select_color = tabbars[index]?.select_color || e.select_color;
    e.unselect_color = tabbars[index]?.unselect_color || e.unselect_color;
    return e
  })

  return (
    <View style={{ flex: 1, }}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
        {renderList.map((item, index) => {
          if (item.has_init) {
            return <View style={[{ height: "100%" }, activeIndex != index ? { position: "absolute", left: "100%", top: "100%" } : {}]} key={index}>{item.component}</View>
          }
        })}
      </View>
      <View style={styles.bottomIcons} >
        {renderList.map((item, index) => {
          return (
            <TouchableWithoutFeedback key={item.name} >
              <View style={styles.bottomIconItem}>
                <Image style={{ ...styles.bottomIconImage, display: activeIndex == index ? "flex" : "none" }} source={item.select_image_url} />
                <Image style={{ ...styles.bottomIconImage, display: activeIndex == index ? "none" : "flex" }} source={item.unselect_image_url} />
                <Text style={{ color: activeIndex == index ? item.select_color : item.unselect_color }}>
                  <Text style={activeIndex == index ? styles.bottomIconTextActive : styles.bottomIconText}>{item.name}</Text>
                </Text>
              </View>
            </TouchableWithoutFeedback>)
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomIcons: {
    height: 64,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  bottomIconItem: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomIconImage: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  bottomIconText: {
    fontSize: 12,
    color: "#666",
  },
  bottomIconTextActive: {
    fontSize: 12,
    color: "#333",
    fontWeight: "600",
  },
})
export default Home;