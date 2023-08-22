import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  CLEAR_ERROR,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
} from "../constants/productConstant";
export const getProduct = (keyword="",currentPage=1) => async (dispatch) => {
  const link=`http://192.168.0.111:4000/api/vi/products?keyword=${keyword}&page=${currentPage}`;
  try {
    dispatch({
      type: ALL_PRODUCT_REQUEST,
    });
    const { data } = await axios.get(link);

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAIL_REQUEST,
    });
    const { data } = await axios.get(
      `http://192.168.0.111:4000/api/vi/products/${id}`
    );

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: error.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
