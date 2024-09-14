import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';  // Correct way to import redux-thunk
import rootReducer from './reducer' // Assuming you have an index.js in your reducers folder

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
