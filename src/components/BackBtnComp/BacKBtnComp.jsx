import { IonButton, IonIcon } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { arrowBack } from "ionicons/icons";
const BacKBtnComp = () => {
  const history = useHistory(null);
  return (
    <IonButton color="primary" fill="clear" slot="start" onClick={() => history.goBack()}>
      <IonIcon slot="icon-only" icon={arrowBack} />
    </IonButton>
  )
}

export default BacKBtnComp
