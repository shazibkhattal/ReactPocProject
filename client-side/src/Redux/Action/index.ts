
import { ActionType } from "../ActionTypes/index";

interface Subscribe {
    type: ActionType.SUBSCRIBE;
    payload: boolean;
}

interface unSubscribe {
    type: ActionType.UNSUBSCRIBE;
    payload: boolean;
}

export type Action=Subscribe|unSubscribe