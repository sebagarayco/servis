import { combineReducers } from "redux";
import errors from './errors';
import auth from "./auth";
import messages from "./messages";
import userdata from "./userdata";
import categories from "./categories";
import services from "./services";
import location from "./location";

export default combineReducers({
	auth,
	messages,
	errors,
	userdata,
	categories,
	services,
	location
});