import { LayoutAnimation, NativeModules } from 'react-native';
import React, { useState } from "react";
import { global } from "@/Utils";

import { Button, Text, StyleSheet, StatusBar, View, Image, TouchableWithoutFeedback } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type PropsTypes = {
  title?: string,
  visibleStatusBar?: boolean,
  bgStatusBar?: string,
  navigation: NativeStackNavigationProp<any>,
}
const StatusBarView = (props: PropsTypes) => {
  return (
    <View style={styles.container}>
      <View style={{height: global.statusBarHeight}}></View>
      <StatusBar hidden={props.visibleStatusBar} backgroundColor={props.bgStatusBar || "transparent"} barStyle="dark-content" />
      <View style={styles.content}>
        {props.navigation.canGoBack() && <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
          <Image source={require("@/assets/imgs/base/back.webp")} style={styles.img}></Image>
        </TouchableWithoutFeedback>}
        <Text style={styles.textStyle}>{props.title || ""}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: global.onePx,
    backgroundColor: "white",
    marginBottom: global.onePx,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: global.rem(44),
    width: "100%",
    borderBottomColor: "rgba(0,0,0,0.1)",
    borderBottomWidth: global.onePx,
  },
  img: {
    position: "absolute",
    left: global.rem(12),
    top: global.rem(10),
    width: global.rem(24),
    height: global.rem(24),
  },
  textStyle: {
    width: global.rem(300),
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: 'left',
    fontSize: global.rem(18),
    color: "#000",
    fontWeight: "600"
  }
});

export default StatusBarView;