import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
  [api.reducerPath]: api.reducer,
});

//create store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export const persistor = persistStore(store);
