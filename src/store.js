import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import budgetSlice from "./slices/budgetSlice";
import listSlice from "./slices/listSlice";
const reducers = combineReducers({
  budgetSlice: budgetSlice,
  listSlice: listSlice
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['budgetSlice', 'listSlice']
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
})