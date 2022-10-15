import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays"
import { parseISO } from "date-fns";
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
          if (budgetType === "daily") {
            state.budgets = {
              ...state.budgets,
              [`${listName}-${budgetName}`]: {
                name: budgetName,
                type: budgetType,
                data: {
                  [dayjs().format("DD-MM-YYYY")]: {
                    data: null,
                    total: 0
                  }
                },
                totalBudget: 0,
                date: dayjs().format("DD-MM-YYYY")
              }
            }
          } else if (budgetType === "one-time") {
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
        }
      } else {
        if (budgetType === "daily") {
          state.budgets = {
            [`${listName}-${budgetName}`]: {
              name: budgetName,
              type: budgetType,
              data: {
                [dayjs().format("DD-MM-YYYY")]: {
                  data: null,
                  total: 0
                }
              },
              totalBudget: 0,
              date: dayjs().format("DD-MM-YYYY")
            }
          }
        } else if (budgetType === "one-time") {
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
      }
    },
    actionDeleteBudget: (state, action) => {
      // args : budgetId
      delete state.budgets[action.payload.budgetId]
    },
    actionAddAmount: (state, action) => {
      //args : budgetId, budgetType , amount , amountType , amountName,date
      let budgetId = action.payload.budgetId;
      let budgetType = action.payload.budgetType;
      let amount = action.payload.amount;
      let amountName = action.payload.amountName;
      let amountType = action.payload.amountType;
      let date = action.payload.date
      if (budgetType === "one-time") {
        if (state.budgets[budgetId].data === null || state.budgets[budgetId].data === undefined) {
          state.budgets[budgetId].data = {
            0: {
              amountName: amountName,
              amountType: amountType,
              amount: amount
            }
          }
        } else {
          let lastAmountIndex = Object.keys(state.budgets[budgetId].data).pop();
          let nextAmountIndex = parseInt(lastAmountIndex) + 1;
          state.budgets[budgetId].data = {
            ...state.budgets[budgetId].data,
            [nextAmountIndex]: {
              amountName: amountName,
              amountType: amountType,
              amount: amount
            }
          }
        }
        if (amountType === 'income') {
          state.budgets[budgetId].totalBudget = parseFloat(state.budgets[budgetId].totalBudget) + parseFloat(amount);
        } else {
          state.budgets[budgetId].totalBudget = parseFloat(state.budgets[budgetId].totalBudget) - parseFloat(amount);
        }
      } else {
        if (state.budgets[budgetId].data[date].data === null || state.budgets[budgetId].data[date].data === undefined) {
          state.budgets[budgetId].data[date].data = {
            0: {
              amountName: amountName,
              amountType: amountType,
              amount: amount
            }
          }
        } else {
          let lastAmountIndex = Object.keys(state.budgets[budgetId].data[date].data).pop();
          let nextAmountIndex = parseInt(lastAmountIndex) + 1;
          state.budgets[budgetId].data[date].data = {
            ...state.budgets[budgetId].data[date].data,
            [nextAmountIndex]: {
              amountName: amountName,
              amountType: amountType,
              amount: amount
            }
          }
        }
        if (amountType === 'income') {
          state.budgets[budgetId].totalBudget = parseFloat(state.budgets[budgetId].totalBudget) + parseFloat(amount);
          state.budgets[budgetId].data[date].total = parseFloat(state.budgets[budgetId].data[date].total) + parseFloat(amount);
        } else {
          state.budgets[budgetId].totalBudget = parseFloat(state.budgets[budgetId].totalBudget) - parseFloat(amount);
          state.budgets[budgetId].data[date].total = parseFloat(state.budgets[budgetId].data[date].total) - parseFloat(amount);
        }
      }
    },
    actionCheckDailyBudget: (state, action) => {
      //args : budgetId 
      let budgetId = action.payload.budgetId;
      let lastDayInBudgetString = Object.keys(state.budgets[budgetId].data).pop();
      let dayArr = lastDayInBudgetString.split('-');
      let lastDayInBudget = `${dayArr[2]}-${dayArr[1]}-${dayArr[0]}`
      let today = dayjs().format('YYYY-MM-DD');
      let diffInDays = differenceInCalendarDays(parseISO(today), parseISO(lastDayInBudget));
      if (diffInDays === 1) {
        state.budgets[budgetId].data = {
          ...state.budgets[budgetId].data,
          [dayjs().format("DD-MM-YYYY")]: {
            data: null,
            total: 0
          }
        }
      } else {
        for (let i = 1; i <= diffInDays; i++) {
          state.budgets[budgetId].data = {
            ...state.budgets[budgetId].data,
            [dayjs(lastDayInBudgetString, "DD-MM-YYYY").add(i, 'day').format("DD-MM-YYYY")]: {
              data: null,
              total: 0
            }
          }
        }
      }
    },
    actionDeleteAmount: (state, action) => {
      // args : budgetId , amountIndex , budgetType,date
      let budgetType = action.payload.budgetType;
      let budgetId = action.payload.budgetId;
      let amountIndex = action.payload.amountIndex;
      let date = action.payload.date
      if (budgetType === "one-time") {
        let amount = state.budgets[budgetId].data[amountIndex].amount;
        let amountType = state.budgets[budgetId].data[amountIndex].amountType;
        let length = Object.keys(state.budgets[budgetId].data).length;
        if (length > 1) {
          delete state.budgets[budgetId].data[amountIndex];
        } else {
          state.budgets[budgetId].data = null;
        }
        if (amountType === "income") {
          state.budgets[budgetId].totalBudget = parseFloat(state.budgets[budgetId].totalBudget) - parseFloat(amount);
        } else {
          state.budgets[budgetId].totalBudget = parseFloat(state.budgets[budgetId].totalBudget) + parseFloat(amount)
        }
      } else {
        let amount = state.budgets[budgetId].data[date].data[amountIndex].amount;
        let amountType = state.budgets[budgetId].data[date].data[amountIndex].amountType;
        let length = Object.keys(state.budgets[budgetId].data[date].data).length;
        if (length > 1) {
          delete state.budgets[budgetId].data[date].data[amountIndex];
        } else {
          state.budgets[budgetId].data[date].data = null;
        }
        if (amountType === "income") {
          state.budgets[budgetId].totalBudget = parseFloat(state.budgets[budgetId].totalBudget) - parseFloat(amount);
          state.budgets[budgetId].data[date].total = parseFloat(state.budgets[budgetId].data[date].total) - parseFloat(amount);
        } else {
          state.budgets[budgetId].totalBudget = parseFloat(state.budgets[budgetId].totalBudget) + parseFloat(amount);
          state.budgets[budgetId].data[date].total = parseFloat(state.budgets[budgetId].data[date].total) + parseFloat(amount);
        }
      }
    },
  },
  extraReducers: {
    [`listSlice/actionClearDidExist`]: (state, action) => {
      state.didBudgetExist = false
    }
  }
})

export const { actionAddBudget, actionDeleteBudget, actionAddAmount, actionCheckDailyBudget, actionDeleteAmount } = budgetSlice.actions;
export default budgetSlice.reducer;