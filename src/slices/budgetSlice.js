import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
const initialState = {
  budgets: null,
  didBudgetExist: false
}

const budgetSlice = createSlice({
  name: "budgetSlice",
  initialState,
  reducers: {
    actionAddBudget: (state, action) => {
      //args : type,name,listName
      let budgetType = action.payload.type;
      let budgetName = action.payload.name;
      let listName = action.payload.listName
      if (state.budgets !== null && state.budgets !== undefined) {
        if (Object.keys(state.budgets).includes(`${listName}-${budgetName}`)) {
          state.didBudgetExist = true;
        } else {
          state.budgets = {
            ...state.budgets,
            [`${listName}-${budgetName}`]: {
              name: budgetName,
              type: budgetType,
              data: null,
              totalBudget: 0,
              date: dayjs().format("DD-MM-YYYY")
            }
          }
        }
      } else {
        state.budgets = {
          [`${listName}-${budgetName}`]: {
            name: budgetName,
            type: budgetType,
            data: null,
            totalBudget: 0,
            date: dayjs().format("DD-MM-YYYY")
          }
        }
      }
    },
    actionDeleteBudget: (state, action) => {
      // args : budgetId
      delete state.budgets[action.payload.budgetId]
    }
  },
  extraReducers: {
    [`listSlice/actionClearDidExist`]: (state, action) => {
      state.didBudgetExist = false
    }
  }
})

export const { actionAddBudget, actionDeleteBudget } = budgetSlice.actions;
export default budgetSlice.reducer;