import React, { useState } from 'react'
import { IonButton, IonHeader, IonToolbar, IonTitle, IonList, IonLabel, IonItem, IonInput, IonContent } from "@ionic/react";
import { useDispatch } from 'react-redux';
import { actionAddList } from '../../slices/listSlice';
const AddListForm = ({ onDismiss }) => {
  const dispatch = useDispatch(null);
  const [newListName, setNewListName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actionAddList(
      {
        listName: newListName
      }
    ));
    handleDismiss();
  }
  const handleDismiss = () => {
    setNewListName("");
    onDismiss()
  }
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Add List
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonLabel>
                List Name:
              </IonLabel>
              <IonInput
                required
                type='text'
                value={newListName}
                onIonChange={(e) => setNewListName(e.detail.value)}
              />
            </IonItem>
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

export default AddListForm
