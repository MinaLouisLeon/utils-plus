import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  didListExist: false,
  mainList: null
}

const listSlice = createSlice({
  name: "listSlice",
  initialState,
  reducers: {
    actionToggleDidListExist: (state, action) => {
      state.didListExist = !state.didListExist
    },
  }
})

export const { actionToggleDidListExist } = listSlice.actions;
export default listSlice.reducer;