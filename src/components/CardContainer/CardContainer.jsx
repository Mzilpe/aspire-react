import React, { Fragment } from 'react';
import './CardContainer.scss';
import Card from '../Card/Card';

const CardContainer = React.forwardRef(( props, ref ) => {
    const { cardItems, showCardNumberHandler } = props;

    return(
        <div ref={ref} className='card-container'>
            {
                cardItems.map((cardItem) => {
                    return(
                        <Fragment key={cardItem.id}>
                            <div className='card-container__card-item' >
                                <Card cardItem={cardItem} showCardNumberHandler={showCardNumberHandler}/>
                            </div>
                        </Fragment>
                    )
                })
            }
        </div>
    )
});

export default CardContainer;