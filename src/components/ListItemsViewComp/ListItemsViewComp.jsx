import { IonCheckbox, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/react';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionDeleteBudget } from '../../slices/budgetSlice';
import { useHistory } from 'react-router-dom';
import { card, documentText } from "ionicons/icons";
import AddTodoFormTemp from '../AddTodoFormTemp/AddTodoFormTemp';
import { actionCheckTodo, actionDeleteTodo } from '../../slices/todoSlice';
import { actionDeleteNote } from '../../slices/noteSlice';
const ListItemsViewComp = ({ listName }) => {
  const dispatch = useDispatch(null);
  const history = useHistory();
  const listItemsObj = useSelector(state => state.listSlice.lists[listName]);
  const tempTodo = useSelector(state => state.listSlice.tempTodo);
  const handleItemView = (item, key) => {
    switch (key.split('-')[0]) {
      case "budget":
        return <>
          <IonItemSliding className='br4 shadow-2'>
            <IonItem lines='none' button disabled={tempTodo} onClick={() => history.push(`/Budget/${item.budgetId}`)}>
              <IonIcon slot='start' icon={card} color="secondary" />
              <IonLabel>
                {key.split('-')[1]}
              </IonLabel>
            </IonItem>
            <IonItemOptions>
              <IonItemOption color="danger" onClick={() => {
                dispatch(actionDeleteBudget({
                  budgetId: listItemsObj[key].budgetId
                }))
              }}>Delete</IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        </>
      case "todo":
        return <>
          <IonItemSliding className='br4 shadow-2'>
            <IonItem lines='none'>
              <IonCheckbox slot='start' disabled={tempTodo} value={item.checked}
                onIonChange={(e) => dispatch(actionCheckTodo({
                  listName: listName,
                  todoKey: key,
                  value: e.detail.checked
                }))}
              />
              <IonLabel>
                {item.checked ? <s>{item.data}</s> : <>{item.data}</>}
              </IonLabel>
            </IonItem>
            <IonItemOptions>
              <IonItemOption color="danger" onClick={() => {
                dispatch(actionDeleteTodo({
                  listName: listName,
                  todoKey: key
                }))
              }}>Delete</IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        </>
      case "note":
        return <>
          <IonItemSliding className='br4 shadow-2'>
            <IonItem lines='none' button disabled={tempTodo} onClick={() => history.push(`/Note/${listName}/${item.noteId}`)}>
              <IonIcon slot='start' icon={documentText} color="tertiary" />
              <IonLabel>
                {item.title}
              </IonLabel>
            </IonItem>
            <IonItemOptions>
              <IonItemOption color="danger"
                onClick={() => {
                  dispatch(actionDeleteNote({
                    noteKey: key,
                    listName: listName
                  }))
                }}
              >Delete</IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        </>
      default:
        return <></>
    }
  }
  return (
    <div className='ma2'>
      {listItemsObj && Object.keys(listItemsObj).map((key) => {
        return (
          <div className='ma3' key={key}>
            {handleItemView(listItemsObj[key], key)}
          </div>
        )
      })}
      {tempTodo && <AddTodoFormTemp listName={listName} />}
    </div>
  )
}

export default ListItemsViewComp
