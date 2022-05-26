/*
	Date: May 23, 2022
		* Action to add an Item to Cart by it's reducer.
	
	Date: May 24, 2022
		* Removing an Item from Cart by it's reducer.
	
	Date: May 25, 2022
		* Save the shipping information.
*/


// Constants
import { 
ADD_TO_CART, 
REMOVE_CART_ITEM, 
SAVE_SHIPPING_INFO 
}
from "../Constants/cartConstants";

// axios to Communicate with backend.
import axios from "axios";

// Add to Cart Action which add an item to the cart and store it in localStorage.
export const addToCart = (id, quantity) => async (dispatch, getState) => {

	// Get information of an item with the id.
	const { data } = await axios.get("/api/v1/product/" + id)

	// dispatch the require information to store item in cart.
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

	// Store Item in localStorage.
	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

// Remove an Item from the cart.
export const removeItemCart = (id) => async (dispatch, getState) => {

	// get the information of an item.
	const { data } = await axios.get("/api/v1/product/" + id);

	// Dispatch to remove item from cart to reducer.
	dispatch({
		type: REMOVE_CART_ITEM,
		payload: {
			productID: data.oneProduct._id
		}
	})

	// Store new array of cart items in localStorage.
	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

}

// Saving shipping information to localStorage.
// Get data of shipping information from where it is called.
export const saveShippingInfo = (data) => async (dispatch) => {
	// Dispatch all the shipping information.
	dispatch({
		type: SAVE_SHIPPING_INFO,
		payload: data
	})

	// Save the shipping information to localStorage.
	localStorage.setItem("shippingInfo", JSON.stringify(data));
}