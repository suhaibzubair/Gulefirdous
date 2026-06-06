import { combineReducers } from '@reduxjs/toolkit';
import aboutYourLmsReducer from './Slices/aboutYourLmsSlice';

const rootReducer = combineReducers({
  aboutYourLms: aboutYourLmsReducer,
});

export { rootReducer }; 