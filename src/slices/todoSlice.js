import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  todos: null,
}

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    actionAddTodo: (state, action) => {
      // args : listName , todoData
      let listName = action.payload.listName;
      let todoData = action.payload.todoData
      if (state.todos === null) {
        state.todos = {
          [`${listName}-0`]: {
            checked: false,
            details: "",
            data: todoData
          }
        }
      } else {
        let todosKeys = Object.keys(state.todos).pop();
        let lastTodoIndex = parseInt(todosKeys.split('-')[1]);
        state.todos = {
          ...state.todos,
          [`${listName}-${lastTodoIndex + 1}`]: {
            checked: false,
            details: "",
            data: todoData
          }
        }
      }
    },
    actionCheckTodo: (state, action) => {
      //args : listName , todoKey , value
      let listName = action.payload.listName;
      let value = action.payload.value;
      let todoKey = action.payload.todoKey;
      let todoIndex = todoKey.split('-')[1];
      state.todos[`${listName}-${todoIndex}`] = {
        ...state.todos[`${listName}-${todoIndex}`],
        checked: value
      }
    }
  },
})

export const { actionAddTodo, actionCheckTodo } = todoSlice.actions;
export default todoSlice.reducer;