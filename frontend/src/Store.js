/*
	Date: May 16, 2022
		* Creating Store to get Items from BackEnd.
		* Combine Reducers for all Products.
	
	Date: May 17, 2022
		* Combine Reducers for SpecificProduct

	Date: May 19, 2022
		* Adding User information in store.

	Date: May 20, 2022
		* Adding Profile information in store.

	Date: May 21, 2022
		* Adding forgotPassword information in store.

	Date: May 23, 2022
		* Add Cart Reducer to store.
		* Change initialState of store cart to the items in localStorage of cart.

	Date: May 29, 2022
		* Adding Order Reducer to store.
		* Add Reducer for user to get their own orders.
	
	Date: May 30, 2022
		* Add Reducer for specific order by ID.
		* Add Reducer for product review.

	Date: May 31, 2022
		* Add 4 Reducers for Admin: 
			1). adminProducts.
			2). adminOrders.
			3). adminUsers.
			4). adminCreateNewProduct
	
	Date: June 1, 2022
		* Add Reducer to get random carousel products and home featured products.
*/

// Creating Store.
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Connect with Redux Web Extension.
import { composeWithDevTools } from "redux-devtools-extension";
import { AddOrUpdateReviewReducer, productReducer, specificProductReducer, carouselProductReducer, HomeProductReducer } from './Reducers/productReducer';
import { userReducer } from "./Reducers/userReducer";
import { profileReducer } from "./Reducers/profileReducer";
import { forgotPasswordReducer } from "./Reducers/forgotPasswordReducer";
import { cartReducer } from "./Reducers/cartReducer";
import { createOrderReducer, myOrderReducer, specificOrderReducer } from "./Reducers/orderReducer";
import { adminAllOrderReducer } from "./Reducers/Admin/adminOrderReducer";
import { adminAllUsersReducer } from "./Reducers/Admin/adminUsersReducer";
import { adminAllProductsReducer, adminCreateNewProductReducer } from "./Reducers/Admin/adminProductReducer";

// Combining Reducers.
const reducer = combineReducers({
	products: productReducer,
	carouselProducts: carouselProductReducer,
	homeProducts: HomeProductReducer,
	oneProduct: specificProductReducer,
	user: userReducer,
	profile: profileReducer,
	forgotPassword: forgotPasswordReducer,
	cart: cartReducer,
	order: createOrderReducer,
	myOrder: myOrderReducer,
	specificOrder: specificOrderReducer,
	addReview: AddOrUpdateReviewReducer,
	adminOrders: adminAllOrderReducer,
	adminUsers: adminAllUsersReducer,
	adminProducts: adminAllProductsReducer,
	adminCreateNewProduct: adminCreateNewProductReducer
});

let initialState = {
	cart: {
		cartItems: localStorage.getItem('cartItems') ?
		JSON.parse(localStorage.getItem('cartItems')) : [],
		shippingInfo: localStorage.getItem('shippingInfo') ?
		JSON.parse(localStorage.getItem('shippingInfo')) : {}
	}
};

const middleware = [thunk];

// Store to store every data.
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;