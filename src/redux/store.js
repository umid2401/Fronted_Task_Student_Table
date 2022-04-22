import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./reducers/rootReducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension'
const middle = [thunk]

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middle)))