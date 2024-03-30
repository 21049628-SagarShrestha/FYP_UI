import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";
import paymentReducer from "./slices/paymentSlice";
import roomReducer from "./slices/roomSlice";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
  payment: persistReducer(persistConfig, paymentReducer),
  reservation: persistReducer(persistConfig, roomReducer),
  [api.reducerPath]: api.reducer,
});

//create store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export const persistor = persistStore(store);
