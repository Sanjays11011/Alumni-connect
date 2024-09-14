import { combineReducers } from 'redux';

import userReducer from './userReducer'; // Assuming you have a user reducer

const rootReducer = combineReducers({
 
  user: userReducer,

});

export default rootReducer;
