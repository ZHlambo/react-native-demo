import { HomeReducerType, ReducerActionType } from "@/types"

const initState: HomeReducerType = {
    banner: [],
    slugs: [],
    tasks: [],
}

const HomeReducer = (state = initState, action: ReducerActionType): HomeReducerType => {
    switch (action.type) {
        case "set_banner": {
            return { ...state, banner: action.data }
        }
        case "set_slugs": {
            return { ...state, slugs: action.data }
        }
        case "set_slug_tasks": {
            return { ...state, tasks: action.data }
        }
        default: {
            return { ...state }
        }
    }
}

export default HomeReducer
