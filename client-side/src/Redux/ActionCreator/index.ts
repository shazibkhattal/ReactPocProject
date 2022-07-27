import { Dispatch } from "redux"
import { ActionType } from "../ActionTypes"
import { Action } from "../Action/index"

export const Subscribe = (value: boolean) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SUBSCRIBE,
            payload:value,
        })
    }
}