import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from 'redux-devtools-extension'
import { productReducer } from "./Reducers/prodcutReducer";
const reducer=combineReducers({
products:productReducer,
});
let intialState={};
const middleware=[thunk];
const store=createStore(reducer,intialState,composeWithDevTools(applyMiddleware(...middleware)));
export default store;
