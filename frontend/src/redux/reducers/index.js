import { combineReducers } from "redux";
import errors from './errors';
import auth from "./auth";
import messages from "./messages";
import userdata from "./userdata";
import categories from "./categories";
import services from "./services";
import contracts from "./contracts";

export default combineReducers({
	auth,
	messages,
	errors,
	userdata,
	categories,
	services,
	contracts
});