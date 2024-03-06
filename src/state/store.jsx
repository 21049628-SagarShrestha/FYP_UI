import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";

//import userreducer from userSlice
import userReducer from "./slices/userSlice";

//create store
const store = configureStore({
  reducer: {
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export default store;  
