/**
 * @filename: misaeSlice.js
 * @description: axios처리 및 상태값 관리하는 slice.js
 * @author: 최수진(sujin971008@gmail.com),박세영(qkrtpdud9899@gmail.com)
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* KEY */
const KEY =
  "H1klrl5LXfzjFdnp01Zfej7sKKi5WysCM9D5tQRb0tp3pOXckKcmZnf%2FG3Gm8ESgORTZfC6QCMleUYPp%2F5MHaw%3D%3D";

/* 비동기 처리 함수 구현 */
//  payload는 이 함수를 호출할 때 전달되는 파라미터
export const getInfo = createAsyncThunk(
  "openAPI/getInfo",
  async (payload, { rejectWidthValue }) => {
    let result = null;

    try {
      result = await axios.get(
        `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=서울&pageNo=1&numOfRows=100&returnType=json&serviceKey=${KEY}&ver=1.0`
      );
    } catch (err) {
      // 에러 발생 시 'rejectWidthValue()'함수에 에러 데이터를 전달하면 extraReducer의 rejected 함수가 호출된다.
      result = rejectWidthValue(err.response);
    }
    return result;
  }
);

/* Slice 정의 (Action함수 + Reducer의 개념) */
const misaeSlice = createSlice({
  name: "getInfo",
  initialState: {
    items: null,
    loading: false,
    error: null,
  },
  // 내부 action 밒 동기 action
  reducers: {},
  // 외부 action 및 비동기 (Ajax용)
  extraReducers: {
    [getInfo.pending]: (state, { payload }) => {
      return { ...state, loading: true };
    },
    [getInfo.fulfilled]: (state, { payload }) => {
      return {
        /* 원하는 key가 깊이 있어서 items까지 접근 */
        items: payload?.data?.response?.body?.items,
        loading: false,
        error: null,
      };
    },
    [getInfo.rejected]: (state, { payload }) => {
      return {
        items: null,
        loading: false,
        error: {
          code: payload?.status ? payload.status : 500,
          message: payload?.statusText ? payload.statusText : "Server Error",
        },
      };
    },
  },
});
// 리듀서 객체 내보내기
export default misaeSlice.reducer;
