import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from 'redux-devtools-extension'
import { productReducer ,productDetailsReducer} from "./Reducers/productReducer";
import {userReducer,ProfileReducer} from "./Reducers/userReducer"
const reducer=combineReducers({
products:productReducer,
productallDetail:productDetailsReducer,
user:userReducer,
profile:ProfileReducer
});
let intialState={};
const middleware=[thunk];
const store=createStore(reducer,intialState,composeWithDevTools(applyMiddleware(...middleware)));
export default store;
