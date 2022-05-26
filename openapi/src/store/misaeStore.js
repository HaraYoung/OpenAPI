/**
 * @filename: misaeStore.js
 * @description: slice 묶어서 index.js에 전달
 * @author: 최수진(sujin971008@gmail.com),박세영()
 */
import { configureStore } from "@reduxjs/toolkit";
import misaeSlice from "../slices/misaeSlice";

const store = configureStore({
  reducer: { getInfo: misaeSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
