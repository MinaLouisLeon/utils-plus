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
    },
    actionDeleteNote: (state, action) => {
      //args : noteKey , listName
      let noteKey = action.payload.noteKey;
      let listName = action.payload.listName;
      let noteIndex = noteKey.split('-')[1];
      let length = Object.keys(state.notes).length;
      if (length === 1) {
        state.notes = null;
      } else {
        delete state.notes[`${listName}-${noteIndex}`]
      }
    },
    actionSaveEditNote: (state, action) => {
      //args : noteId , value , noteTitle,listName
      let noteId = action.payload.noteId;
      let value = action.payload.value;
      let noteTitle = action.payload.noteTitle;
      state.notes[noteId] = {
        data: value,
        title: noteTitle
      }
    }
  }
})

export const { actionAddNote, actionDeleteNote, actionSaveEditNote } = noteSlice.actions;
export default noteSlice.reducer;