//reducer.ts
import { combineReducers, createStore } from "redux"
import {GlobalReducerType, HomeReducerType} from "@/types"
import GlobalReducer from "./Global/reducer"
import HomeReducer from "./HomeReducer"
export interface IRootReducer {   //合并reducer之后，state的类型
    GlobalReducer: GlobalReducerType
    HomeReducer: HomeReducerType
}

export default createStore(combineReducers<IRootReducer>({
  GlobalReducer: GlobalReducer,
  HomeReducer: HomeReducer,
}))