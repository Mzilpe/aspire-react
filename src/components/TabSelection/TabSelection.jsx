import { useState } from 'react';
import { tabsName } from '../../app_data/cardItems';
import classNames from 'classnames';
import './TabSelection.scss';

function TabSelection() {
    const [ selectedTab, setSelectedTab ] = useState(tabsName[ 0 ]);

    return( 
        <div className='tab-selection'>
        {
            tabsName.map((tabName, index) => {
                return(
                    <div 
                        className={classNames('tab-selection__tabName', {
                            'tab-selection__tabName--selected': tabName === selectedTab
                        })}
                        onClick={() => setSelectedTab(tabName)}
                        key={index}
                    >
                        {tabName}
                    </div>
                )
            })
        }
        </div>
    )
};

export default TabSelection;