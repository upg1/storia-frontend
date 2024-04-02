import { combineReducers } from '@reduxjs/toolkit'; 
import postGraphSlice from './postGraphSlice';

const rootReducer = {
  posts: postGraphSlice, 
  // Add more reducers as your application grows
}

export default rootReducer;