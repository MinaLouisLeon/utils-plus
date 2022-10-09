import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import MainSideMenu from '../../components/SideMenus/MainSideMenu'
const MainPage = () => {
  return (
    <IonPage>
      <MainSideMenu />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot='start' />
          <IonTitle>Utils Plus</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen id="mainPage"></IonContent>
    </IonPage>
  )
}

export default MainPage
