import NewButtonIcon from '../../assets/svg/add-btn-icon.svg';
import AspireIcon from '../../assets/svg/aspire.svg';
import './CardBalance.scss';
import { createPortal } from 'react-dom';
import  AddNewCard from '../AddNewCard/AddNewCard';

const CardBalance = ( props ) => {
    const { selectedCardItem, addNewCardHandler, showForm, outSideClickHandler, setShowForm} = props;
    
     
   
    return(
        <>
            {showForm && createPortal(
                <div className='modal'>
                <AddNewCard outSideClickHandler={outSideClickHandler} addNewCardHandler={addNewCardHandler}/></div>, document.body)}
            <div className='card-balance'>
                <div className='card-balance__upper-section'>
                    <div className='card-balance__upper-section__account-text'>Account Balance</div>
                    <div className='card-balance__upper-section__aspire-icon'>
                        <img src={AspireIcon} alt='aspire-icon' />
                    </div>
                </div>
                <div className='card-balance__lower-section'>
                    <div className='card-balance__lower-section__balance'>
                        <span className='card-balance__lower-section__balance__dollar'>S$</span>
                        <span className='card-balance__lower-section__balance__amount'>{selectedCardItem.accountBalance}</span>
                    </div>
                    <div className='card-balance__lower-section__new-action' role='button' onClick={() => setShowForm(true)}>
                        <span className='card-balance__lower-section__new-action__icon'>
                            <img src={NewButtonIcon} alt='new-btn-icon' />
                        </span>
                        <span className='card-balance__lower-section__new-action__btn'>
                            New card
                        </span>
                    </div>
                </div>
        
            </div>
        </>
    )
};

export default CardBalance;