import { IonItem, IonLabel } from '@ionic/react';
import React from 'react';
import "./style.css";
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
const BudgetViewDailyDatesComp = ({ budgetId }) => {
  const history = useHistory();
  const data = useSelector(state => state.budgetSlice.budgets[budgetId].data);
  const totalBudget = useSelector(state => state.budgetSlice.budgets[budgetId].totalBudget);
  return (
    <>
      <div className='top-container-daily'>
        {data && Object.keys(data).map((key) => {
          return (
            <div className='ma2' key={key}>
              <IonItem lines='none' className='br4 shadow-2' button onClick={() => {
                history.push(`/DailyBudget/${budgetId}/${key}`)
              }}>
                <IonLabel slot='start'>{key}</IonLabel>
                <IonLabel slot='end' color={data[key].total >= 0 ? "success" : "danger"}>
                  {data[key].total}
                </IonLabel>
              </IonItem>
            </div>
          )
        })}
      </div>
      <div className='bottom-container-daily'>
        <IonItem lines='none' className='br4 ma3 shadow-2' color="light">
          <IonLabel slot='start'>Total Budget:</IonLabel>
          <IonLabel slot='end' color={totalBudget >= 0 ? "success" : "danger"}>{totalBudget}</IonLabel>
        </IonItem>
      </div>
    </>
  )
}

export default BudgetViewDailyDatesComp
