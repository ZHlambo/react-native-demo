import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type User = {
    accessToken: string,
    uuid: string,
    alias: string,
    name: string,
    email: string,
    mobile: string,
    address: string,
    icon: string,
    counterIntroduction: string,
    counterName: string,
    counterIcon: string
}


export type AppConfig = {
    APIHost: string, isAppleReview: boolean, isReviewDemoUrl: boolean
}

export type DefRes = {
    code: number,
    message: string,
    result?: any
}
export type ReducerActionType = {
    type: string
    [index: string]: any
}

export type GlobalReducerTabbarsType = Array<{
    "unselect_image_url": string
    "select_image_url": string
    "name": string
    "select_color": string
    "unselect_color": string
    "select_dark_color": string
    "unselect_dark_color": string
}>
export type GlobalReducerColourType = {
    "nav_color": string,
    "background_image_url": string
    "categorys": Array<{
        "image_url": string
        "name": string
        "color": string
        "dark_color": string
        "action_url": string
    }>,
    "tabbars": GlobalReducerTabbarsType,
    "tabbar_background_color": string
    "tabbar_background_dark_color": string
    "advertisement_url": string
    "background_image_url_v2": string
    "default_topic": true,
    "immersion_color": string
    "immersion_dark_color": string
    "title_bar_text_image_url": string
    "title_bar_button_image_url": string
    "scroll_top_image_url": string
    "nav_dark_color": string
}
export type GlobalReducerPlatformsType = Array<{
    binding_tutorial: string
    description: string
    domain: string
    fields_limit: string
    is_authenticated: number
    is_banned: number
    is_get_content: number
    link_rule: string
    name: string
    platform_icon: string
    platform_id: number
    platform_name: string
    quotation_fans_limit: number
}>
export type GlobalReducerType = {
    uuid: string,
    colour: null | GlobalReducerColourType
    platforms: null | GlobalReducerPlatformsType
}
export type HomeReducerBannerType = {
    adverts_link: string
    target_address: string
    title: string
    weight: number
    target_type: number
    [index: string]: any
}
export type HomeReducerSlugType = {
    slug: string,
    section_tags: string,
    image_url: string,
    tasks?: Array<TaskType>
}
export type TaskType = {
    activity_user_limit: number
    apply_count: number
    apply_flag: boolean
    apply_ok_count: number
    card_id: number
    create_time: number
    mode_tags: string
    platform_sell: number
    product_icon: string
    product_name: string
    task_name: string
    labeler_image?: string
    categories?: Array<{
        id: number
        name: string
    }>
    card_identifies?: Array<string>
    kind_cpm?: {
        reward_amount: number
        user_limit: number
    }
    kind_cpp?: {
        deposit_amount: number
        user_limit: number
    }
    task_info?: {
        platform: string
        task_desc: string
        task_image: string
        territory: Array<string>
        task_name: string,
        platform_fans_condition?: {
            [index: string]: number
        }
        platform_condition_list?: Array<{
            font_count: number
            name: string
        }>
    }
}
export type HomeReducerType = {
    banner: Array<HomeReducerBannerType>
    slugs: Array<HomeReducerSlugType>
    tasks: Array<string | TaskType>
}


type MeasureViewType = {
    x: number,
    y: number,
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
}
type NativeStackNavigationPropType = {
  navigation: NativeStackNavigationProp<any>,
  route: RouteProp<any>,
}