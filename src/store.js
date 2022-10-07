import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import budgetSlice from "./slices/budgetSlice";

const reducers = combineReducers({
  budgetSlice: budgetSlice,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['budgetSlice']
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
})