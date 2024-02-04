import React from "react";

import './CardSummary.scss'
import RecentTransactions from '../RecentTransactions/RecentTransactions';
import ManageCard from "../ManageCard/ManageCard";

const CardSummary = ( props ) =>{
    return(
        <div className="card-summary">
            <ManageCard {...props}/>
            <RecentTransactions/>
        </div>
    )
}

export default CardSummary;