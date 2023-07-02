import { combineReducers } from "redux";
import errors from './errors';
import auth from "./auth";
import messages from "./messages";
import userdata from "./userdata";
import categories from "./categories";

export default combineReducers({
	auth,
	messages,
	errors,
	userdata,
	categories
});