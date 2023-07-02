import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// Buscara index.js en reducers
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
	rootReducer, // Todos los reducers
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store