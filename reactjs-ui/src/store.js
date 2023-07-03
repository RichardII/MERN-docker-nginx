import { configureStore } from '@reduxjs/toolkit'
import tutorialReducer from './slices/tutorials';
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";

const reducer = {
  tutorials: tutorialReducer,
  auth: authReducer,
  message: messageReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;

