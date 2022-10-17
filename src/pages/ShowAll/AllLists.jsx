import { IonAlert, IonContent, IonHeader, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import BacKBtnComp from '../../components/BackBtnComp/BacKBtnComp';
const AllLists = () => {
  const history = useHistory();
  const lists = useSelector(state => state.listSlice.lists);
  const [showAlert, setShowAlert] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <BacKBtnComp />
          <IonTitle>
            Lists
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header='Warning !'
          message="Deleting list will delete all it's content."
          buttons={[
            {
              text: "Confirm",
              handler: () => {
                console.log("confirm");
                setShowAlert(false);
              }
            }, {
              text: "Cancel",
              handler: () => {
                console.log("cancel");
                setShowAlert(false);
              }
            }
          ]}
        />
        <div className='mt3'>
          {Object.keys(lists).map((key) => {
            return (
              <div className='ma3' key={key}>
                <IonItemSliding className='br4 shadow-2'>
                  <IonItem lines='none'>
                    <IonLabel>
                      {key}
                    </IonLabel>
                  </IonItem>
                  <IonItemOptions>
                    <IonItemOption color="danger" onClick={() => setShowAlert(true)}>Delete</IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              </div>
            )
          })}
        </div>
      </IonContent>
    </IonPage>
  )
}

export default AllLists
