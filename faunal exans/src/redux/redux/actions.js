import axios from "axios";

const API = "http://localhost:5000/products";

export const fetchProducts = () => async (dispatch) => {
  const res = await axios.get(API);
  dispatch({ type: "SET_PRODUCTS", payload: res.data });
};

export const addProduct = (product) => async (dispatch) => {
  await axios.post(API, product);
  dispatch(fetchProducts());
};

export const deleteProduct = (id) => async (dispatch) => {
  await axios.delete(`${API}/${id}`);
  dispatch(fetchProducts());
};

export const updateProduct = (product) => async (dispatch) => {
  await axios.put(`${API}/${product.id}`, product);
  dispatch(fetchProducts());
};