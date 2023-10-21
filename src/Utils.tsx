import { useEffect, useState } from 'react';
import { Platform, NativeModules, Dimensions, StatusBar, PixelRatio, View } from 'react-native';
import { MeasureViewType } from './types';
const { StatusBarManager } = NativeModules;

// 是否横屏来判断真实屏幕宽高
var relWidth = Dimensions.get('window').width
var relHeight = Dimensions.get('window').height
if (relWidth > relHeight) {
    let change = relWidth
    relWidth = relHeight
    relHeight = change
}

export const global = {
    onePx: 1 / PixelRatio.get(),
    isAndroid: Platform.OS === 'android',
    isIOS: Platform.OS !== 'android',
    statusBarHeight: Platform.OS === 'android' ? StatusBar.currentHeight : StatusBarManager.HEIGHT,
    screen_width: relWidth,
    screen_height: relHeight,
    APIHost: "https://test-api.intbee.com",
    rem: (num: number) => {
        return num * relWidth / 375
    },
    // changeStyleToRem(obj: any) {
    //     if (typeof obj == "object") {
    //         for (const key in obj) {
    //             if (typeof obj[key] == "object") {
    //                 this.changeStyleToRem(obj[key])
    //             } else {
    //                 if (typeof obj[key] == "number" && key != "fontWeight") {

    //                 }
    //             }
    //         }
    //     }
    // }
}
export const initApp = async () => {

    // console.log(NativeModules.AppReactModule);
    // console.log(NativeModules.AppReactModule.openNativeVC());
    // NativeModules.AppReactModule.testCallBack("@222", (user: string) => {
    //     console.log("testCallBack", user);
    // });

    // NativeModules.AppReactModule.getAppCofig(function (res: AppConfig) {
    //     global.config = res;
    // })
    // NativeModules.AppReactModule.getUserInfo(function (res: User) {
    //     global.user = res;
    // })
    // let res = await NativeModules.AppReactModule.getUserInfoP()
    // console.log(res, typeof res);

}


export const componentDidMount = (callBack: Function) => {
    const [init, setInit] = useState(false);
    useEffect(() => {
        if (!init) callBack();
        setInit(true);
    })
}
export const componentWillUpdate = (callBack: Function) => {
    const [init, setInit] = useState(false);
    useEffect(() => {
        if (init) {
            callBack()
        }
        setInit(true);
    })
}

export const measureView = (view: null | View): Promise<MeasureViewType> => {
    return new Promise(resolve => {
        view?.measure((x, y, width, height, offsetX, offsetY) => {
            resolve({ x, y, width, height, offsetX, offsetY })
        })
    })
}