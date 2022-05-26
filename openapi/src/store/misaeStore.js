import { configureStore } from "@reduxjs/toolkit";
import misaeSlice from "../slices/misaeSlice";

const store = configureStore({
  reducer: { getInfo: misaeSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
