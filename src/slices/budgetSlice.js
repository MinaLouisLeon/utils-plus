import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  budgets: null,
  didExist: false
}

const budgetSlice = createSlice({
  name: "budgetSlice",
  initialState,
  reducers: {
    actionToggleDidExist: (state, action) => {
      state.didExist = !state.didExist;
    },
  }
})

export const { actionToggleDidExist } = budgetSlice.actions;
export default budgetSlice.reducer;