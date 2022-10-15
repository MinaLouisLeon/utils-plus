import { IonButton, IonButtons, IonIcon, IonInput, IonItem, IonLabel } from '@ionic/react'
import React, { useState } from 'react'
import { add, close } from "ionicons/icons";
import { useDispatch } from 'react-redux';
import { actionAddTodoTemp } from '../../slices/listSlice';
import { actionAddTodo } from '../../slices/todoSlice';
const AddTodoFormTemp = ({ listName }) => {
  const dispatch = useDispatch(null);
  const [todoData, setTodoData] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      listName: listName,
      todoData: todoData
    }
    dispatch(actionAddTodo(data));
    dispatch(actionAddTodoTemp({ value: false }))
  }
  return (
    <div className='ma2'>
      <form onSubmit={handleSubmit}>
        <IonItem className='shadow-2 br4'>
          <IonLabel>
            Todo:
          </IonLabel>
          <IonInput
            required={true}
            type='text'
            placeholder='Enter Todo Text'
            value={todoData}
            onIonChange={(e) => setTodoData(e.detail.value)}
          />
          {/* <IonButtons slot='end'> */}
          <IonButton type='submit' color="success" fill='solid' shape='round' size='small'>
            <IonIcon slot='icon-only' icon={add} />
          </IonButton>
          <IonButton type='button' color="danger" fill='solid' shape='round' size='small'
            onClick={() => dispatch(actionAddTodoTemp({ value: false }))}
          >
            <IonIcon slot='icon-only' icon={close} />
          </IonButton>
          {/* </IonButtons> */}
        </IonItem>
      </form>
    </div>
  )
}

export default AddTodoFormTemp
