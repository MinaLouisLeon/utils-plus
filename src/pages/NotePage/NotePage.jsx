import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BacKBtnComp from '../../components/BackBtnComp/BacKBtnComp';
import { useSelector } from 'react-redux';
import { createOutline } from "ionicons/icons"
import AddNoteForm from '../../components/AddNoteForm/AddNoteForm';
const NotePage = () => {
  const { listName, noteId } = useParams();
  const note = useSelector(state => state.noteSlice.notes[noteId]);
  const [edit, setEdit] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <BacKBtnComp />
          <IonTitle>
            {note.title}
          </IonTitle>
          {edit ? <></> : <IonButton slot='end' fill='clear' color="success" onClick={() => setEdit(true)} >
            <IonIcon icon={createOutline} className="pr1" />
            Edit
          </IonButton>}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {edit ? <AddNoteForm oldValue={note.data} oldTitle={note.title} onDismiss={() => setEdit(false)} noteId={noteId} listName={listName} /> :
          <div className='ma2'>
            <div dangerouslySetInnerHTML={{ __html: note.data }} />
          </div>}
      </IonContent>
    </IonPage>
  )
}

export default NotePage
