import { applyMiddleware, createStore } from "redux";
import Rlogger from 'redux-logger'
import thunk from "redux-thunk"
import reducers from "./Reducers";

export const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk,Rlogger)
)