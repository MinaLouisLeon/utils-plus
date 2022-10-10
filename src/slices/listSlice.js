import { createSlice } from "@reduxjs/toolkit";
// import dayjs from "dayjs";
const initialState = {
  didListExist: false,
  lists: {
    "Main List": null
  }
}

const listSlice = createSlice({
  name: "listSlice",
  initialState,
  reducers: {
    actionClearDidExist: (state, action) => {
      state.didListExist = false
    },
    actionAddList: (state, action) => {
      //args listName
      let listName = action.payload.listName;
      if (Object.keys(state.lists).includes(listName)) {
        state.didListExist = true;
      } else {
        state.lists = {
          ...state.lists,
          [listName]: null
        }
      }
    },
  },
  extraReducers: {
    [`budgetSlice/actionAddBudget`]: (state, action) => {
      let listName = action.payload.listName;
      let budgetName = action.payload.name;
      if (state.lists[listName] !== null && state.lists[listName] !== undefined) {
        state.lists[listName] = {
          ...state.lists[listName],
          [`budget-${budgetName}`]: {
            totalBudget: 0,
            budgetId: `${listName}-${budgetName}`,
          }
        }
      } else {
        state.lists[listName] = {
          [`budget-${budgetName}`]: {
            totalBudget: 0,
            budgetId: `${listName}-${budgetName}`,
          }
        }
      }
    },
    [`budgetSlice/actionDeleteBudget`]: (state, action) => {
      //args : budgetId
      let budgetId = action.payload.budgetId;
      let budgetIdArr = budgetId.split('-');
      let listName = budgetIdArr[0];
      let budgetName = budgetIdArr[1];
      delete state.lists[listName][`budget-${budgetName}`]
    }
  }
})

export const { actionClearDidExist, actionAddList } = listSlice.actions;
export default listSlice.reducer;