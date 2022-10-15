import React, { useState } from 'react'
import "./style.css";
import { useSelector, useDispatch } from 'react-redux';
import { IonButton, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPopover } from '@ionic/react';
import { actionAddAmount, actionDeleteAmount } from '../../slices/budgetSlice';
const BudgetViewComp = ({ budgetId, date }) => {
  const dispatch = useDispatch(null);
  const budgetData = useSelector(state => state.budgetSlice.budgets[budgetId].data);
  const totalBudget = useSelector(state => state.budgetSlice.budgets[budgetId].totalBudget)
  const budgetType = useSelector(state => state.budgetSlice.budgets[budgetId].type);
  const [amount, setAmount] = useState(null);
  const [amountName, setAmountName] = useState("");
  const [amountType, setAmountType] = useState("");
  const [popoverState, setPopoverState] = useState({ isOpen: false, e: undefined });
  console.log(budgetData)
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      amount: amount,
      amountType: amountType,
      budgetId: budgetId,
      budgetType: budgetType,
      amountName: amountName,
      date: date
    }
    dispatch(actionAddAmount(data));
    setAmountType("");
    setAmountName("");
    setAmount(null);
    setPopoverState({
      isOpen: false,
      e: undefined
    })
  }
  const handleDeleteAmount = (index) => {
    let data = {
      amountIndex: index,
      budgetId: budgetId,
      budgetType: budgetType,
      date: date
    }
    dispatch(actionDeleteAmount(data))
  }
  return (
    <>
      {/* add income or expens popover */}
      <IonPopover
        isOpen={popoverState.isOpen}
        onDidDismiss={() => {
          setAmount(null)
          setAmountName("");
          setAmountType("");
          setPopoverState({
            isOpen: false,
            e: undefined
          })
        }}
      >
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonLabel>
                Name:
              </IonLabel>
              <IonInput
                type='text'
                required
                value={amountName}
                onIonChange={(e) => setAmountName(e.detail.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>
                Amount:
              </IonLabel>
              <IonInput
                required
                type='number'
                step="0.01"
                value={amount}
                onIonChange={(e) => setAmount(e.detail.value)}
              />
            </IonItem>
            <div className='ma2'>
              <IonButton color="success" expand="block" type='submit' className='mb2'>Add</IonButton>
              <IonButton color="danger" expand="block" type='button' onClick={() => {
                setAmountType("");
                setAmount(null);
                setAmountName("");
                setPopoverState({
                  isOpen: false,
                  e: undefined
                })
              }}>Cancel</IonButton>
            </div>
          </IonList>
        </form>
      </IonPopover>
      {/* top content data */}
      <div className='top-container'>
        {date === null ? <>
          {/* one-time view */}
          {budgetData && Object.keys(budgetData).map((key) => {
            return (
              <div key={key} className="ma2">
                <IonItemSliding className='br4 shadow-2'>
                  <IonItem lines='none'>
                    <IonLabel slot='start'>{budgetData[key].amountName}</IonLabel>
                    <IonLabel slot='end' color={budgetData[key].amountType === "income" ? "success" : "danger"}>
                      {budgetData[key].amount}
                    </IonLabel>
                  </IonItem>
                  <IonItemOptions>
                    <IonItemOption color="danger" onClick={() => handleDeleteAmount(key)}>Delete</IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              </div>
            )
          })}
        </> :
          <>
            {/* daily view */}
            {budgetData[date].data && Object.keys(budgetData[date].data).map((key) => {
              return (
                <div key={key} className="ma2">
                  <IonItemSliding className='br4 shadow-2'>
                    <IonItem lines='none'>
                      <IonLabel slot='start'>{budgetData[date].data[key].amountName}</IonLabel>
                      <IonLabel slot='end' color={budgetData[date].data[key].amountType === "income" ? "success" : "danger"}>
                        {budgetData[date].data[key].amount}
                      </IonLabel>
                    </IonItem>
                    <IonItemOptions>
                      <IonItemOption color="danger" onClick={() => handleDeleteAmount(key)}>Delete</IonItemOption>
                    </IonItemOptions>
                  </IonItemSliding>
                </div>
              )
            })}
          </>}
      </div>
      {/* bottom content  */}
      <div className='bottom-container'>
        <div className='btn-container ma2'>
          <IonButton onClick={(e) => {
            setAmountType("income")
            setPopoverState({
              isOpen: true,
              e: e.persist()
            });
          }}>add Income</IonButton>
          <IonButton onClick={(e) => {
            setAmountType("expens");
            setPopoverState({
              isOpen: true,
              e: e.persist()
            })
          }}>add Expens</IonButton>
        </div>
        <div className='ma3'>
          <IonItem className='br4 shadow-2' lines='none' color="light">
            <IonLabel slot='start'>Total</IonLabel>
            <IonLabel slot='end' color={totalBudget >= 0 ? 'success' : 'danger'} >{totalBudget}</IonLabel>
          </IonItem>
        </div>
      </div>
    </>
  )
}

export default BudgetViewComp
