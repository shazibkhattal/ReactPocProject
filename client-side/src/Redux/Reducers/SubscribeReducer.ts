import {Action} from "../Action"
import { ActionType } from "../ActionTypes/index";

const initialState=false;


const Reducer=(state:boolean=initialState,action:Action):boolean=>{
    switch(action.type){

        case ActionType.SUBSCRIBE:
            return state=true
        
        default:
            return state
    }
}

export default Reducer;