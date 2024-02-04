import React from "react";

import "./Transaction.scss";
import { get } from "lodash";


export const Transaction = (props) =>{
    const transaction = get(props, 'transaction', [])

    return(
        <div className="transaction">
            <div className="transaction__summary">
                <div className="transaction__summary--details">
                    <div className="transaction__summary--details--icon" style={{ backgroundColor: transaction.color }}>
                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(transaction.icon)}`} alt={transaction.name}/>
                    </div>
                    <div className="transaction__summary--details--info">
                        <div className="transaction__summary--details--info--name" >{transaction.name}</div>
                        <div className="transaction__summary--details--info--date">{transaction.dateOfTransaction}</div>
                    </div>
                </div>
                <div className="transaction__summary--amount">
                    {transaction.amount}
                </div>
            </div>
            
           <div className="transaction__type">
                <div className="transaction__type--logo">
                    <img src={`data:image/svg+xml;utf8,${encodeURIComponent(transaction.logo)}`} alt={transaction.name}/>
                </div>
                <div className="transaction__type--text">{transaction.typeOfTransaction}</div>
           </div>
        </div>
    )
}