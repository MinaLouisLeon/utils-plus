import React, { useState } from 'react'
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { actionAddNote } from '../../slices/noteSlice';
const AddNoteForm = ({ listName, onDismiss }) => {
  const dispatch = useDispatch(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [value, setValue] = useState('');
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  }
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'align',
    'link', 'image',
    'color', 'backgroud',
  ]
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      value: value,
      noteTitle: noteTitle,
      listName: listName
    }
    dispatch(actionAddNote(data))
    handleDismiss();
  }
  const handleDismiss = () => {
    setNoteTitle("");
    setValue("");
    onDismiss()
  }
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Add Note
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonLabel>
                Note Title:
              </IonLabel>
              <IonInput
                required
                type='text'
                value={noteTitle}
                onIonChange={(e) => setNoteTitle(e.detail.value)}
                placeholder="Enter note title"
              />
            </IonItem>
            <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} placeholder="Enter Note Data" />
            <div className='ml2 mr2 mt3'>
              <IonButton className='ma2' color="success" expand="block" type='submit'>Add</IonButton>
              <IonButton className='ma2' color="danger" expand="block" type='button' onClick={handleDismiss}>Cancel</IonButton>
            </div>
          </IonList>
        </form>

      </IonContent>
    </>
  )
}

export default AddNoteForm
