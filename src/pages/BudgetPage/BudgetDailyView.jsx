import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import "./style.css";
import BacKBtnComp from '../../components/BackBtnComp/BacKBtnComp';
import BudgetViewComp from '../../components/BudgetViewComp/BudgetViewComp';
import { useParams } from 'react-router';
const BudgetDailyView = () => {
  const { budgetId, date } = useParams();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <BacKBtnComp />
          <IonTitle>
            {`${budgetId.split('-')[1]} (${date})`}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen >
        <BudgetViewComp budgetId={budgetId} date={date} />
      </IonContent>
    </IonPage>
  )
}

export default BudgetDailyView
