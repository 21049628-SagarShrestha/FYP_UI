import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { api } from "../api/api";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";
import paymentReducer from "./slices/paymentSlice";
import roomReducer from "./slices/roomSlice";
import searchReducer from "./slices/searchSlice";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const userPersistConfig = {
  ...persistConfig,
  key: "user",
};

const paymentPersistConfig = {
  ...persistConfig,
  key: "payment",
};

const reservationPersistConfig = {
  ...persistConfig,
  key: "reservation",
};

const searchPersistConfig = {
  ...persistConfig,
  key: "search",
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  payment: persistReducer(paymentPersistConfig, paymentReducer),
  reservation: persistReducer(reservationPersistConfig, roomReducer),
  search: persistReducer(searchPersistConfig, searchReducer),
  [api.reducerPath]: api.reducer,
});

//create store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export const persistor = persistStore(store);
