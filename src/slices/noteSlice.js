import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: null
}

const noteSlice = createSlice({
  name: "noteSlice",
  initialState,
  reducers: {
    actionAddNote: (state, action) => {
      //args : listName , value , noteTitle
      let listName = action.payload.listName;
      let value = action.payload.value;
      let noteTitle = action.payload.noteTitle;
      if (state.notes === null) {
        state.notes = {
          [`${listName}-0`]: {
            data: value,
            title: noteTitle
          }
        }
      } else {
        let notesKey = Object.keys(state.notes).pop();
        let lastNoteKey = parseInt(notesKey.split('-')[1]);
        state.notes = {
          ...state.notes,
          [`${listName}-${lastNoteKey + 1}`]: {
            data: value,
            title: noteTitle
          }
        }
      }
    }
  }
})

export const { actionAddNote } = noteSlice.actions;
export default noteSlice.reducer;