import Http from "@/Http";
import { GlobalReducerColourType, GlobalReducerPlatformsType, NativeStackNavigationPropType } from "@/types";
import React from "react"
import { View, Text, ScrollView, Image } from "react-native";
import { connect } from "react-redux";
type PropsType = NativeStackNavigationPropType & {
  init_colour: (e: GlobalReducerColourType) => void
  set_platforms: (e: GlobalReducerPlatformsType) => void
}
class WelcomePage extends React.Component<PropsType> {
  constructor(props: any) {
    super(props);
    this.state = {
      init: false
    }
  }
  componentDidMount(): void {
    Promise.all([
      Http.get(`/public/activity/topic/current/colour`).then(res => {
        this.props.init_colour(res.result)
        // dispatch({ type: "init_colour", data: res.result })
      }),
      Http.get(`/mapi/v4/user/auth/platforms`).then(res => {
        this.props.set_platforms(res.result)
        // dispatch({ type: "set_platforms", data: res.result })
      })
    ]).then(res => {
      this.props.navigation.push("首页")
    })
  }
  render() {
    return (
      <View>
        <Text>启动加载页</Text>
      </View>
    )
  }
}
export default connect(() => ({}), dispatch => {
  return {
    init_colour: (e: GlobalReducerColourType) => dispatch({ type: "init_colour", data: e }),
    set_platforms: (e: GlobalReducerPlatformsType) => dispatch({ type: "set_platforms", data: e })
  }
})(WelcomePage);