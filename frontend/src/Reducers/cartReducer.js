/*	
	Date: May 23, 2022
		* Adding Item to the Cart by Reducer.

	Date: May 24, 2022
		* Removing an Item from the Cart by reducer.
	
	Date: May 25, 2022
		* Shipping information of user.
*/
import { 
	ADD_TO_CART, 
	REMOVE_CART_ITEM, 
	SAVE_SHIPPING_INFO 
} from "../Constants/cartConstants";

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
	switch (action.type) {

		// When dispatch action item will be in addedItem.
		case ADD_TO_CART:
			const addedItem = action.payload

			// Finding the item is already in the cart or not.
			const itemInCart = state.cartItems.find(
				(item) => item.productID === addedItem.productID
			)

			// If we find item in cart then just change quantity.
			if (itemInCart) {
				return {
					...state,
					cartItems: state.cartItems.map((item) => item.productID === itemInCart.productID ? addedItem : item)
				}
			}
			// Otherwise, add item to the existing cart.
			else {
				return {
					...state,
					cartItems: [...state.cartItems, addedItem]
				}
			}

		// Removing an item from cart.
		case REMOVE_CART_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter((item) => item.productID !== action.payload.productID)
			}

		// Saving information of shipping.
		case SAVE_SHIPPING_INFO:
			return {
				...state,
				shippingInfo: action.payload
			}

		default:
			return state
	}
}