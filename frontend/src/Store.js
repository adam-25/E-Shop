/*
	Date: May 16, 2022
		* Creating Store to get Items from BackEnd.
		* Combine Reducers for all Products.
	
	Date: May 17, 2022
		* Combine Reducers for SpecificProduct

*/

// Creating Store.
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Connect with Redux Web Extension.
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer, specificProductReducer,  } from './Reducers/productReducer';
import { userReducer } from "./Reducers/userReducer";
import { profileReducer } from "./Reducers/profileReducer";
import { forgotPasswordReducer } from "./Reducers/forgotPasswordReducer";
import { cartReducer } from "./Reducers/cartReducer";

// Combining Reducers.
const reducer = combineReducers({
	products: productReducer,
	oneProduct: specificProductReducer,
	user: userReducer,
	profile: profileReducer,
	forgotPassword: forgotPasswordReducer,
	cart: cartReducer
});

let initialState = {
	cart: {
		cartItems: localStorage.getItem('cartItems') ?
		JSON.parse(localStorage.getItem('cartItems')) :
		[]
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