import { useIonActionSheet, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar, IonModal, IonSelect, IonSelectOption, IonAlert } from '@ionic/react'
import React, { useState } from 'react'
// import MainSideMenu from '../../components/SideMenus/MainSideMenu'
import { add } from "ionicons/icons";
import { useSelector, useDispatch } from 'react-redux';
import AddListForm from '../../components/AddListForm/AddListForm';
import AddBudgetForm from '../../components/AddBudgetFrom/AddBudgetForm';
import { actionAddTodoTemp, actionClearDidExist } from '../../slices/listSlice';
import ListItemsViewComp from '../../components/ListItemsViewComp/ListItemsViewComp';
import AddNoteForm from '../../components/AddNoteForm/AddNoteForm';
const MainPage = () => {
  const dispatch = useDispatch(null)
  const didListExist = useSelector(state => state.listSlice.didListExist);
  const didBudgetExist = useSelector(state => state.budgetSlice.didBudgetExist);
  const lists = useSelector(state => state.listSlice.lists);
  const tempTodo = useSelector(state => state.listSlice.tempTodo);
  const [presentActionSheet] = useIonActionSheet();
  const [selectedList, setSelectedList] = useState("Main List")
  const [alertMsg, setAlertMsg] = useState("");
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null
  });
  const handleDismissModal = () => {
    setModalState({
      isOpen: false,
      type: null
    })
  }
  const handleModalChildren = () => {
    switch (modalState.type) {
      case "list":
        return <AddListForm onDismiss={handleDismissModal} />
      case "budget":
        return <AddBudgetForm onDismiss={handleDismissModal} listName={selectedList} />
      case "note":
        return <AddNoteForm onDismiss={handleDismissModal} listName={selectedList} />
      default:
        return <></>
    }
  }
  return (
    <IonPage>
      <IonAlert
        isOpen={didBudgetExist || didListExist}
        onDidDismiss={() => dispatch(actionClearDidExist())}
        header={alertMsg}
        buttons={['OK']}
      />
      {/* <MainSideMenu /> */}
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot='start' />
          <IonTitle>Utils Plus</IonTitle>
          <div className='ma1' slot='end'>
            <IonSelect disabled={tempTodo} interface='popover' placeholder={selectedList} onIonChange={(e) => setSelectedList(e.detail.value)}>
              {Object.keys(lists).map((key) => {
                return (
                  <IonSelectOption key={key} value={key}>{key}</IonSelectOption>
                )
              })}
            </IonSelect>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen id="mainPage">
        <ListItemsViewComp listName={selectedList} />
        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonFabButton disabled={tempTodo} onClick={() => {
            presentActionSheet({
              mode: "ios",
              buttons: [
                {
                  text: "Add List",
                  handler: () => {
                    setAlertMsg("List Exist !");
                    setModalState({
                      isOpen: true,
                      type: "list"
                    })
                  }
                },
                {
                  text: "Add Budget",
                  handler: () => {
                    setAlertMsg("Budget Exist !")
                    setModalState({
                      isOpen: true,
                      type: "budget"
                    })
                  }
                },
                {
                  text: "Add Todo",
                  handler: () => {
                    // TODO add handler for adding todo
                    dispatch(actionAddTodoTemp({ value: true }))
                  }
                },
                {
                  text: "Add Note",
                  handler: () => {
                    setModalState({
                      isOpen: true,
                      type: "note"
                    })
                  }
                },
                {
                  text: "Cancel",
                  role: "cancel",
                }
              ],
            })
          }}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        {/* add list modal */}
        <IonModal
          isOpen={modalState.isOpen}
          onDidDismiss={() => setModalState({
            isOpen: false,
            type: null
          })}
        >
          {handleModalChildren()}
        </IonModal>
      </IonContent>
    </IonPage >
  )
}

export default MainPage
