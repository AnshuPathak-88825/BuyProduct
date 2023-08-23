import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  CLEAR_ERROR,
} from "../constants/userConstant";

import axios from "axios";
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { header: { "Content-Type": "application/json" } };
    const {data} = await axios.post("http://192.168.0.111:4000/api/vi/login", { email, password }, config);
    console.log(data);
    dispatch({type:LOGIN_SUCCESS,payload:data.user});
    
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
