import BaseStyle from "@/BaseStyle";
import { IRootReducer } from "@/store";
import { TaskType } from "@/types";
import { global } from "@/Utils";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
const TaskCard = (props: {
  task: TaskType
}) => {
  const platforms = useSelector((state: IRootReducer) => {
    return state.GlobalReducer.platforms
  })
  const platformConditions = (props.task.task_info?.platform_condition_list || []).slice(0, 3);
  return (
    <View style={styles.task}>
      <Image style={{ width: global.rem(171), height: global.rem(171) }} source={{ uri: props.task.product_icon }} />
      <Text style={styles.taskName} numberOfLines={2}>{props.task.task_name}</Text>
      <View style={styles.info}>
        {props.task.kind_cpp ? <Text style={styles.rewardTipCpp}>免费测品</Text> : ""}
        {props.task.kind_cpm ? <Text style={styles.rewardTipCpm}>推广费</Text> : ""}
        <View style={{ flex: 1 }}></View>
        <View style={styles.platforms}>
          {platformConditions.length ? platformConditions.map((item, index) => {
            return <View style={styles.platformItem} key={index}>
              <Image style={{ ...styles.platformItemImg, zIndex: platformConditions.length - index }} key={item.name}
                source={index == 2 ? require("@/assets/imgs/home/icon_shoye_sousuo.webp") : { uri: platforms?.find(e => e.name == item.name)?.platform_icon }} />
            </View>
          }) : ""}
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.applyView}>
        <Image style={{ width: global.rem(12), height: global.rem(12) }} source={require("@/assets/imgs/home/icon_shoye_sousuo.webp")} />
        <Text style={styles.applyText}>{props.task.apply_count}已申请</Text>
      </View>
      <View style={styles.progress}>
        <LinearGradient colors={[`#FFA961`, `#FF7400`]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
          style={{ width: `${64}%`, height: "100%", borderRadius: global.rem(12) }}>
          <View>
            <Text style={styles.progressText}>65%</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  task: {
    width: global.rem(171),
    borderWidth: global.onePx,
    borderColor: "#F0F0F0",
    borderRadius: global.rem(8),
    overflow: "hidden",
  },
  taskName: {
    padding: global.rem(8),
    paddingBottom: global.rem(6),
    fontSize: global.rem(14),
    lineHeight: global.rem(22),
    color: "rgba(0,0,0,.9)",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: global.rem(8),
    paddingRight: global.rem(8),
    paddingBottom: global.rem(4),
  },
  rewardTipCpp: {
    fontSize: global.rem(10),
    fontWeight: "500",
    color: "rgba(68,158,242,1)",
    lineHeight: global.rem(16),
    paddingLeft: global.rem(4),
    paddingRight: global.rem(4),
    borderRadius: global.rem(2),
    borderColor: "rgba(68,158,242,0.4)",
    borderWidth: global.onePx,
    marginRight: global.rem(4),
  },
  rewardTipCpm: {
    fontSize: global.rem(10),
    fontWeight: "500",
    color: "rgba(252,145,13,1)",
    lineHeight: global.rem(16),
    paddingLeft: global.rem(4),
    paddingRight: global.rem(4),
    borderRadius: global.rem(2),
    borderColor: "rgba(252,145,13,0.4)",
    borderWidth: global.onePx,
    marginRight: global.rem(4),
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
  line: {
    height: global.onePx,
    margin: global.rem(8),
    backgroundColor: "rgba(0,0,0,0.06)",
  },
  applyView: {
    flexDirection: "row",
    paddingLeft: global.rem(8),
    paddingRight: global.rem(8),
    height: global.rem(20),
    alignItems: "center",
  },
  applyText: {
    marginLeft: global.rem(2),
    fontSize: global.rem(12),
    color: "#FC910D",
  },
  progress: {
    marginLeft: global.rem(8),
    marginRight: global.rem(8),
    marginBottom: global.rem(8),
    height: global.rem(12),
    borderRadius: global.rem(12),
    backgroundColor: "#FFEFD4",
    position: "relative",
  },
  progressText: {
    color: "white",
    fontSize: global.rem(10),
    lineHeight: global.rem(12),
    paddingLeft: global.rem(4),
  },
})
export default TaskCard;