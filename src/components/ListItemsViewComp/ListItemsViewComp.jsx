import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/react';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionDeleteBudget } from '../../slices/budgetSlice';
import { useHistory } from 'react-router-dom';
import { card } from "ionicons/icons";
const ListItemsViewComp = ({ listName }) => {
  const dispatch = useDispatch(null);
  const history = useHistory();
  const listItemsObj = useSelector(state => state.listSlice.lists[listName]);
  const handleItemView = (item, key) => {
    switch (key.split('-')[0]) {
      case "budget":
        return <>
          <IonItemSliding className='br4 shadow-2'>
            <IonItem lines='none' button onClick={() => history.push(`/Budget/${item.budgetId}`)}>
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
    </div>
  )
}

export default ListItemsViewComp
