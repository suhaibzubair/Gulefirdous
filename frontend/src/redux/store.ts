import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { composeWithDevTools } from 'redux-devtools-extension';
import userSlice from "./Slices/login-registerSlice";
import schoolCreationSlice from "./Slices/SchoolSlice";
import { compose } from 'redux';
import OrganizationSlice from "./Slices/OrganizationSlice";
// import rootReducer from './rootReducer';
import { rootReducer as combinedReducers } from './rootReducer'; 

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Combine reducers
const rootReducer = combineReducers({
  user: userSlice,
  schoolCreation: schoolCreationSlice,
  organization:OrganizationSlice
});

// const store = configureStore({
//   reducer: rootReducer,
//   devTools: process.env.NODE_ENV !== 'production',
// });
const store = configureStore({
  reducer: combinedReducers, // Use the alias here
  devTools: process.env.NODE_ENV !== 'production',
});

export
 
type RootState = ReturnType<typeof store.getState>;

export
 
type AppDispatch = typeof store.dispatch;

export default store;

