// Configure store

import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducer from './reducer'


export default function configureStore() {

	const store = createStore(reducer, applyMiddleware(ReduxThunk));	

	return store;
}