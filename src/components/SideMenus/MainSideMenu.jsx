import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
const MainSideMenu = () => {
  const history = useHistory(null);
  return (
    <IonMenu contentId='mainPage'>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Menu
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {/* <IonItem key="home" lines='full' button onClick={() => history.push("/home")}>
            <IonLabel>
              Home
            </IonLabel>
          </IonItem> */}
          <IonItem key="all-lists" lines='full' button onClick={() => history.push("/AllLists")}>
            <IonLabel>
              Lists
            </IonLabel>
          </IonItem>
          <IonItem key="all-budgets" lines='full' button onClick={() => history.push("/AllBudgets")}>
            <IonLabel>
              Budgets
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  )
}

export default MainSideMenu
