import { ADD_TO_CART, REMOVE_CART_ITEM } from "../Constants/cartConstants";
import axios from "axios";

export const addToCart = (id, quantity) => async (dispatch, getState) => {

	const { data } = await axios.get("/api/v1/product/" + id)

	dispatch({
		type: ADD_TO_CART,
		payload: {
			productID: data.oneProduct._id,
			productName: data.oneProduct.productName,
			productPrice: data.oneProduct.productPrice,
			productImages: data.oneProduct.productImages[0].imageURL,
			productStock: data.oneProduct.productStock,
			orderQuantity: quantity

		}
	});

	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const removeItemCart = (id) => async (dispatch, getState) => {

	const { data } = await axios.get("/api/v1/product/" + id);

	dispatch({
		type: REMOVE_CART_ITEM,
		payload: {
			productID: data.oneProduct._id
		}
	})
	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

}