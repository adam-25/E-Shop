import { ADD_TO_CART } from "../Constants/cartConstants";
import axios from "axios";

export const addToCart = (id, quantity) => async (dispatch, getState) => {

	const { data } = await axios.get("/api/v1/product/" + id)

	dispatch({
		type: ADD_TO_CART,
		payload: {
			productID: data.oneProduct._id,
			name: data.oneProduct.productName,
			price: data.oneProduct.productPrice,
			image: data.oneProduct.productImages[0].imageURL,
			stock: data.oneProduct.productStock,
			quantity: quantity

		}
	});

	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}