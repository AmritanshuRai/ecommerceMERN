import { CART_ADD_ITEM } from '../constant/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const url = `/api/products/${id}`;
  let response = await fetch(url);
  const data = await response.json();
  if (data.message) {
    throw new Error(data.message);
  }
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
