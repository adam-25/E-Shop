import { ADD_TO_CART, REMOVE_CART_ITEM } from "../Constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			const addedItem = action.payload

			const itemInCart = state.cartItems.find(
				(item) => item.productID === addedItem.productID
			)

			if (itemInCart) {
				return {
					...state,
					cartItems: state.cartItems.map((item) => item.productID === itemInCart.productID ? addedItem : item)
				}
			}
			else {
				return {
					...state,
					cartItems: [...state.cartItems, addedItem]
				}
			}

		case REMOVE_CART_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter((item) => item.productID !== action.payload.productID)
			}

		default:
			return state
	}
}