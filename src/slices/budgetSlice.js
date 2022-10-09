import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  budgets: null,
  didBudgetExist: false
}

const budgetSlice = createSlice({
  name: "budgetSlice",
  initialState,
  reducers: {
    actionToggleDidBudgetExist: (state, action) => {
      state.didBudgetExist = !state.didBudgetExist;
    },
  }
})

export const { actionToggleDidBudgetExist } = budgetSlice.actions;
export default budgetSlice.reducer;