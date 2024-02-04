import './Card.scss';
import Eye from '../../assets/svg/eye.svg';
import classNames from 'classnames';

const Card = ( props ) => {
    const { cardItem, showCardNumberHandler } = props;
    
    const className =classNames('card__container', {
        'card__container--freezed': cardItem.isCardFreezed === true
    })

    return(
        <div className='card'>
            <div className='card__toggle-details' role='button' onClick={() => showCardNumberHandler(cardItem.id)}>
                <span className='card__toggle-details__icon'><img src={Eye} alt='eye-icon' /></span>
                <span className='card__toggle-details__text'>Show card number</span>
            </div>
            <div className={className}>
                <div className='card__container__aspire-icon'>
                    <img src={`data:image/svg+xml;utf8,${encodeURIComponent(cardItem.logo)}`} alt={cardItem.title}/>
                </div>
                <div className='card__container__details'>
                    <div className='card__container__details__holder-name'>
                        {cardItem.cardHolderName}
                    </div>
                    <div className='card__container__details__card-number'>
                        {
                            cardItem.cardNumber.map((number, index) => {
                                if(index === 3){
                                    return (<span className='card__container__details__card-number__number' key={index}>{number}</span>)
                                }
                                return(
                                    cardItem.showCardNumber ? <span className='card__container__details__card-number__number' key={index}>{number}</span> : 
                                    <span className='card__container__details__card-number__number' key={index}>{'****'}</span>
                                )
                            })
                        }
                    </div>
                    <div className='card__container__details__exp-date-cvv'>
                        <span className='card__container__details__exp-date'>
                            <span className='card__container__details__exp-date__text'>Thru: </span>
                            <span className='card__container__details__exp-date__value'>{cardItem.thru}</span>
                        </span>
                        <span className='card__container__details__cvv'>
                            <span className='card__container__details__cvv__text'>CVV: </span>
                            {
                                cardItem.showCardNumber ? <span className='card__container__details__cvv__value'>{cardItem.cvv}</span> :
                                <span className='card__container__details__cvv__value'>{'***'}</span>
                            }
                        </span>
                    </div>
                </div>
                <div className='card__container__footer'>
                    <img src={`data:image/svg+xml;utf8,${encodeURIComponent(cardItem.type)}`} alt='visa-logo' />
                </div>
            </div>
        </div>
    )
};

export default Card;