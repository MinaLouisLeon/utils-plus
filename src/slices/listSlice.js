import { createSlice } from "@reduxjs/toolkit";
// import dayjs from "dayjs";
const initialState = {
  didListExist: false,
  lists: {
    "Main List": null
  },
  tempTodo: false,
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
    actionAddTodoTemp: (state, action) => {
      //args : value
      state.tempTodo = action.payload.value
    }
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
    },
    [`todoSlice/actionAddTodo`]: (state, action) => {
      // args : listName , todoData
      let listName = action.payload.listName;
      let todoData = action.payload.todoData;
      if (state.lists[listName] !== null && state.lists[listName] !== undefined) {
        let index = null
        Object.keys(state.lists[listName]).map((key, mapIndex) => {
          if (key.includes("todo")) {
            index = mapIndex
          }
        })
        if (index !== null) {
          let lastTodoKey = Object.keys(state.lists[listName])[index]
          let lastTodoIndex = parseInt(lastTodoKey.split('-')[1]);
          state.lists[listName] = {
            ...state.lists[listName],
            [`todo-${lastTodoIndex + 1}`]: {
              checked: false,
              todoId: `${listName}-${lastTodoIndex + 1}`,
              data: todoData
            }
          }
        } else {
          state.lists[listName] = {
            ...state.lists[listName],
            [`todo-0`]: {
              checked: false,
              todoId: `${listName}-0`,
              data: todoData
            }
          }
        }
      } else {
        state.lists[listName] = {
          [`todo-0`]: {
            checked: false,
            todoId: `${listName}-0`,
            data: todoData
          }
        }
      }
    },
    [`todoSlice/actionCheckTodo`]: (state, action) => {
      //args : listName , todoKey , value
      let listName = action.payload.listName;
      let todoKey = action.payload.todoKey;
      let value = action.payload.value;
      state.lists[listName][todoKey] = {
        ...state.lists[listName][todoKey],
        checked: value
      }
    },
    [`todoSlice/actionDeleteTodo`]: (state, action) => {
      //args : todoKey , listName
      let listName = action.payload.listName;
      let todoKey = action.payload.todoKey;
      let length = Object.keys(state.lists[listName]).length
      if (length === 1) {
        state.lists[listName] = null;
      } else {
        delete state.lists[listName][todoKey]
      }
    }
  }
})

export const { actionClearDidExist, actionAddList, actionAddTodoTemp } = listSlice.actions;
export default listSlice.reducer;