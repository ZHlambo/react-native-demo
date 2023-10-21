import { GlobalReducerType, ReducerActionType } from "@/types"

const initState: GlobalReducerType = {
    uuid: "",
    colour: null,
    platforms: null,
}

const GlobalReducer = (state = initState, action: ReducerActionType): GlobalReducerType => {
    switch (action.type) {
        case "init_colour": {
            return { ...state, colour: action.data }
        }
        case "set_platforms": {
            return { ...state, platforms: action.data }
        }
        default: {
            return { ...state }
        }
    }
}

export default GlobalReducer
