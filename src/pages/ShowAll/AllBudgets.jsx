import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React, { useState, useEffect } from 'react'
import BacKBtnComp from '../../components/BackBtnComp/BacKBtnComp'
import { useSelector } from 'react-redux';
import { card } from 'ionicons/icons';
import { useHistory } from 'react-router';
import dayjs from 'dayjs';
const AllBudgets = () => {
  const history = useHistory();
  const budgets = useSelector(state => state.budgetSlice.budgets);
  let listsArr = [];
  const [listsArrState, setListsArrState] = useState(null);
  console.log(listsArrState)
  useEffect(() => {
    if (budgets !== null || budgets !== undefined) {
      Object.keys(budgets).map((key) => {
        console.log(key)
        console.log(listsArr.includes(key.split('-')[0]))
        if (!(listsArr.includes(key.split('-')[0]))) {
          console.log("if")
          listsArr.push(key.split('-')[0])
        }
      });
      setListsArrState(listsArr);
    }
  }, [])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <BacKBtnComp />
          <IonTitle>
            Budgets
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {listsArrState && listsArrState.map((item) => {
          return (
            <IonCard key={item} className='ma3 br4 shadow-2'>
              <IonCardHeader>
                <IonCardSubtitle>{item}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  {Object.keys(budgets).map((key) => {
                    return (
                      <>
                        {key.split('-')[0] === item ? <>
                          <IonItem button onClick={() => {
                            // budgets[key].type === "one-time" ? history.push(`/Budget/${key}`)
                            //   : history.push(`/DailyBudget/${key}/${dayjs().format("DD-MM-YYYY")}`)
                            history.push(`/Budget/${key}`)
                          }}>
                            <IonIcon icon={card} color="secondary" className='mr2' />
                            <IonLabel>
                              {budgets[key].name}
                            </IonLabel>
                          </IonItem>
                        </>
                          : <></>}
                      </>
                    )
                  })}
                </IonList>
              </IonCardContent>
            </IonCard>
          )
        })}
      </IonContent>
    </IonPage>
  )
}

export default AllBudgets
