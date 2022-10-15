import React from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router-dom';
import BacKBtnComp from '../../components/BackBtnComp/BacKBtnComp';
import { useSelector, useDispatch } from 'react-redux';
import BudgetViewComp from '../../components/BudgetViewComp/BudgetViewComp';
import BudgetViewDailyDatesComp from '../../components/BudgetViewDailyComps/BudgetViewDailyDatesComp';
import { actionCheckDailyBudget } from '../../slices/budgetSlice';
const BudgetPage = () => {
  const { budgetId } = useParams();
  const dispatch = useDispatch(null)
  const budgetType = useSelector(state => state.budgetSlice.budgets[budgetId].type);
  if (budgetType === "daily") {
    dispatch(actionCheckDailyBudget({ budgetId: budgetId }))
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <BacKBtnComp />
          <IonTitle>
            {budgetId.split('-')[1]}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {budgetType && <>
          {budgetType === "one-time" ?
            <>
              <BudgetViewComp budgetId={budgetId} date={null} />
            </>
            : <>
              <BudgetViewDailyDatesComp budgetId={budgetId} />
            </>}
        </>}
      </IonContent>
    </IonPage>
  )
}

export default BudgetPage
