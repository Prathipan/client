import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { TransContext } from '../../App';
import './MoneyDetails.css'

const MoneyDetails = () => {

  const {trans,setTrans} = useContext(TransContext)

  let [balance,setBalance] = useState(0);
  let [income,setIncome] = useState(0);
  let [expense,setExpense] = useState(0);

  // useEffect( () => {
  //    getValues();
  // },[]);

  const getBalance = () => {
    trans.map((tran) => {
      if(tran.type === "income")
      {
        income += tran.amount;
      }else if(tran.type === "expense")
       {
         expense += tran.amount;
       }
       balance = income - expense;
      return balance
    })
  }
  getBalance();


  return (
    <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="balance-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
                alt="balance"
                className="details-img"
              />
              <div>
                <p className="details-text">Your Balance</p>
                <p className="details-money" testid="balanceAmount">
                  Rs {balance}
                </p>
              </div>
            </div>
            </div>
            <div className="col-lg-4">
            <div className="income-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
                alt="income"
                className="details-img"
              />
              <div>
                <p className="details-text">Your Income</p>
                <p className="details-money" testid="incomeAmount">
                  Rs {income}
                </p>
              </div>
            </div>
            </div>
            <div className="col-lg-4">
            <div className="expenses-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
                alt="expenses"
                className="details-img"
              />
              <div>
                <p className="details-text">Your Expenses</p>
                <p className="details-money" testid="expensesAmount">
                  Rs {expense}
                </p>
              </div>
            </div>
            </div>
          
        </div>
      </div>
  )
}

export default MoneyDetails

