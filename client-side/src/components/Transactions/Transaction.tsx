import { forwardRef, useEffect, useImperativeHandle, useReducer } from "react";
import { ICountAction } from "../../Interface/Transaction/ICountAction";
import {ICountState} from "../../Interface/Transaction/ICountState"
import { CountActionKind } from "../../Enum/CountActionKind";

  // An interface for our state
  function counterReducer(state: ICountState, action: ICountAction) {
    const { type, payload } = action;
    switch (type) {

      case CountActionKind.INCREASE:
        return {
          count: state.count + payload,
        };
  
      default:
        return state;
    }
  }
//When a child component needs to refer to its parent’s current node, the parent component must have a way for the child to receive its ref. The technique is known as ref forwarding.
 const Transactions=forwardRef((props: any, ref: any)=>{
 const [state, dispatch] = useReducer(counterReducer, { count: 0 });

 /* useImperativeHandle
 It gives you control over the value that is returned. Instead of returning the instance element, you explicitly state what the return value will be (see snippet below).
 It allows you to replace native functions (such as blur, focus, etc) with functions of your own, thus allowing side-effects to the normal behavior, or a different behavior altogether. Though, you can call the function whatever you like.*/
 useImperativeHandle(ref, () => ({
    getOnClick() {
      dispatch({ type: CountActionKind.INCREASE, payload: 1 })
    }
  }));

 return(
    <>
    {console.log(state.count)}
        <p style={{color:'black'}}>NO.Transactions: <b>{state.count}</b></p>
    </>
 );
}
)
export default Transactions;