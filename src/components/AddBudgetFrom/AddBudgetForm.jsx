import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionAddBudget } from '../../slices/budgetSlice';

const AddBudgetForm = ({ listName, onDismiss }) => {
  const dispatch = useDispatch(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("one-time");
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      type: type,
      listName: listName,
      name: name
    }
    dispatch(actionAddBudget(data))
    handleDismiss();
  }
  const handleDismiss = () => {
    setName("");
    setType("one-time");
    onDismiss();
  }
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Add Budget
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonLabel>
                Budget Name:
              </IonLabel>
              <IonInput
                required
                type='text'
                value={name}
                onIonChange={(e) => setName(e.detail.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>
                Budget Type:
              </IonLabel>
              <IonSelect interface='popover' placeholder="One Time Budget" onIonChange={(e) => setType(e.detail.value)}>
                <IonSelectOption value="one-time">One Time Budget</IonSelectOption>
                <IonSelectOption value="daily">Daily Budget</IonSelectOption>
              </IonSelect>
            </IonItem>
            <div className='ml2 mr2 mt3'>
              <IonButton className='ma2' color="success" expand='block' type='submit'>
                Add
              </IonButton>
              <IonButton className='ma2' color="danger" expand="block" type='button' onClick={handleDismiss}>
                Cancel
              </IonButton>
            </div>
          </IonList>
        </form>
      </IonContent>
    </>
  )
}

export default AddBudgetForm
