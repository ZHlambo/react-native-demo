import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

// import Navigator from "./components/Navigator";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import store from '@/store'
import { Provider } from 'react-redux'    //导入Provider组件
import Home from "./pages/Home/index";
import WelcomePage from "./pages/WelcomePage";
import TaskDetail from "./pages/TaskDetail";
import { global } from './Utils';


const Stack = createNativeStackNavigator();

const headerBarDefaultOptions = (props: any) => ({
  headerLeft: () => <View>
    <TouchableWithoutFeedback onPress={() => props.navigation.canGoBack && props.navigation.goBack()}>
      <Image style={{ width: global.rem(24), height: global.rem(24) }} source={require("@/assets/imgs/base/back.webp")} />
    </TouchableWithoutFeedback>
  </View>
})
const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="欢迎页" options={{ headerShown: false }} component={WelcomePage} />
            <Stack.Screen name="首页" options={{ headerShown: false }} component={Home} />
            <Stack.Screen name="任务详情" options={{ headerShown: false }} component={TaskDetail} />
            {/* <Stack.Screen name="任务详情" options={e => {
              return {
                headerShown: false,
                ...headerBarDefaultOptions(e),
              }
            }} component={TaskDetail} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  highScoresTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  scores: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
export default App;

