import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../constants/productConstant';

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const url = '/api/products';

    //drawback of fetch() is it do not throw an error when server sends 404. use axios for that or handle manually like below
    let response = await fetch(url);
    const data = await response.json();
    if (data.message) {
      throw new Error(data.message);
    }
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message });
  }
};
