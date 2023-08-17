import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  CLEAR_ERROR,
  ALL_PRODUCT_SUCCESS,
} from "../constants/productConstant";
export const productReducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
          return {
            loading: true,
            product: [],
          };
        case ALL_PRODUCT_SUCCESS:
          return {
            loading: false,
            product: action.payload.product,
            productsCount: action.payload.totalProducts,
          };
        case ALL_PRODUCT_FAIL:
          return {
            loading: false,
            error: action.payload,
          };
        case CLEAR_ERROR:
          return {
            ...state,
            error: null,
          };
        default:
          return state;
      }
    
};
