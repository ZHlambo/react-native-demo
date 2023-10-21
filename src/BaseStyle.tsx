
import { StyleSheet } from "react-native";
import { global } from "./Utils";

const styles = StyleSheet.create({
  c222: {
    color: "#222"
  },
  c333: {
    color: "#333"
  },
  c666: {
    color: "#666"
  },
  c999: {
    color: "#999"
  },
  flexCenter: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  flexWrap: {
    flexWrap: "wrap",
  },
  ...(function() {
    let obj: any = {};
    new Array(10).forEach((e, index) => {
      obj[`fontSize${12 + 2 * index}`] = {
        [`fontSize${12 + 2 * index}`]: global.rem(12 + 2 * index),
      }
    })
    return {}
  })(),
})
export default styles as any;