import {combineReducers} from "redux"
import SubscribeReducer from "./SubscribeReducer"

const reducer =combineReducers({
    subscribe:SubscribeReducer
})

export default reducer
export type State=ReturnType<typeof reducer>