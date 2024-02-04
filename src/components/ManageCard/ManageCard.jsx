import React from "react";
import { map } from 'lodash';

import "./ManageCard.scss";

const ManageCard = ( props ) =>{
    return(
        <div className="manage-card">
            {
                map(props.cardFeaturesData, cardAction => {
                    return(
                        <div className="manage-card__item" key={cardAction.name} role="button" onClick={()=> props.onActionClick({ cardAction, item: props.selectedCardItem}) }>
                            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(cardAction.icon)}`} alt={cardAction.name}/>
                            <span  className="manage-card__item--title">{cardAction.name}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ManageCard;