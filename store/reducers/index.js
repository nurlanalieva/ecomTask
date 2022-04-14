import { combineReducers } from "redux";
import authReducer from "./auth";
import cartReducer from "./cartReducer/cartReducer";

export default combineReducers({
  auth: authReducer,
  cart: cartReducer,
});
