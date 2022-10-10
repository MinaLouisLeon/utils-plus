import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/react';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionDeleteBudget } from '../../slices/budgetSlice';
const ListItemsViewComp = ({ listName }) => {
  const dispatch = useDispatch(null);
  const listItemsObj = useSelector(state => state.listSlice.lists[listName]);
  return (
    <div className='ma2'>
      {listItemsObj && Object.keys(listItemsObj).map((key) => {
        return (
          <div className='ma3'>
            <IonItemSliding className='br4 shadow-2'>
              <IonItem lines='none'>
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
          </div>
        )
      })}
    </div>
  )
}

export default ListItemsViewComp
