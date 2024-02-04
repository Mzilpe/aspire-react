import React, { useState } from "react";
import "./RecentTransactions.scss";

import { transactions } from "../../app_data/transactions";
import { Transaction } from "../../generics/Transaction/Transaction";
import { map } from "lodash";


const config ={
    title: "Recent transactions",
    logo: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><style>.a{fill:rgba(255,255,255,0);}.b,.c{fill:#325baf;}.b{opacity:0.15;}.d{fill:#23cefd;}</style></defs><g transform="translate(29 -205)"><rect class="a" width="24" height="24" transform="translate(-29 205)"/><g transform="translate(-27.011 207)"><path class="b" d="M25.758,35.53H23.921a1.564,1.564,0,1,1,0-3.129h2.347a1.565,1.565,0,0,0-.524,3.039q.007.041.015.082ZM24.73,26.222a.574.574,0,0,1-.912.148l-1.137-1.128a1.1,1.1,0,0,1,0-1.561l1.137-1.128a.573.573,0,0,1,.944.226h.527V21.2a1.239,1.239,0,0,0-2.107-.875l-2.468,2.446a2.388,2.388,0,0,0,0,3.388L23.183,28.6a1.239,1.239,0,0,0,2.107-.875V26.222Z" transform="translate(-19.217 -19.183)"/><path class="c" d="M15.216,20a2.009,2.009,0,0,1-2-2.015V16.326a.781.781,0,1,1,1.562,0v1.659a.43.43,0,0,0,.269.416.412.412,0,0,0,.465-.1l2.465-2.443a1.6,1.6,0,0,0,0-2.274L15.51,11.144a.412.412,0,0,0-.465-.1.43.43,0,0,0-.269.416V13.2a.781.781,0,0,1-.781.781H4.7a.781.781,0,0,0,0,1.562h1.25a.781.781,0,1,1,0,1.562H4.7a2.344,2.344,0,1,1,0-4.687h8.515v-.956a2,2,0,0,1,1.231-1.858,1.96,1.96,0,0,1,2.166.429l2.465,2.443a3.166,3.166,0,0,1,0,4.493L16.61,19.414A1.972,1.972,0,0,1,15.216,20Zm-9.61-9.614A1.98,1.98,0,0,0,6.847,8.532V7.654h8.476a2.344,2.344,0,0,0,0-4.687H6.847V2.011A1.98,1.98,0,0,0,5.606.157a2.01,2.01,0,0,0-2.2.425L.946,3.025a3.166,3.166,0,0,0,0,4.493L3.411,9.961a2,2,0,0,0,1.413.582,2.031,2.031,0,0,0,.782-.157ZM5,1.6a.435.435,0,0,1,.279.412V3.748a.781.781,0,0,0,.781.781h9.257a.781.781,0,0,1,0,1.562H6.065a.781.781,0,0,0-.781.781V8.532a.456.456,0,0,1-.773.319L2.046,6.408a1.6,1.6,0,0,1,0-2.274L4.511,1.691a.423.423,0,0,1,.305-.131A.5.5,0,0,1,5,1.6ZM1.5,3.58h0Z" transform="translate(0 0)"/><path class="d" d="M210.9,399.528h-2.112a.782.782,0,0,1,0-1.564H210.9a.782.782,0,0,1,0,1.564Z" transform="translate(-199.877 -382.425)"/></g></g></svg>`,
    upArrow: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><defs><style>.a{opacity:0.15;}.b{fill:#325baf;}</style></defs><g class="a" transform="translate(0 0)"><g transform="translate(0 0)"><path class="b" d="M10,20A10,10,0,1,1,20,10,10,10,0,0,1,10,20Zm4.512-8.776L10.777,7.487a.914.914,0,0,0-.125-.158.951.951,0,0,0-1.479.158L5.42,11.24a.933.933,0,1,0,1.32,1.32L9.975,9.326l3.217,3.218a.934.934,0,0,0,1.321-1.32Z" transform="translate(-0.001)"/></g></g></svg>`,
    downArrow: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><defs><style>.a{opacity:0.15;}.b{fill:#325baf;}</style></defs><g class="a" transform="translate(-0.001)"><g transform="translate(0.001)"><path class="b" d="M10,0A10,10,0,1,0,20,10,10,10,0,0,0,10,0Zm4.512,8.776-3.736,3.736a.914.914,0,0,1-.125.158.951.951,0,0,1-1.479-.158L5.42,8.76A.933.933,0,1,1,6.74,7.44l3.235,3.234,3.217-3.218a.934.934,0,0,1,1.321,1.32Z" transform="translate(-0.001)"/></g></g></svg>`
}

const RecentTransactions = () =>{
    const [showRecentTransactions, setShowRecentTransactions] = useState( true )

    const recentTransactionHandler = () => {
        setShowRecentTransactions((prevState)=> setShowRecentTransactions(!prevState))
    }

    return(
        <div className="recent-transactions">
            <div className="recent-transactions__header">
                <div className="recent-transactions__header--left">
                    <img src={`data:image/svg+xml;utf8,${encodeURIComponent(config.logo)}`} alt={config.title}/>
                    <h4>{config.title}</h4>
                </div>
                <div role="button" onClick={recentTransactionHandler}>
                {showRecentTransactions ? 
                    <img src={`data:image/svg+xml;utf8,${encodeURIComponent(config.upArrow)}`} alt={config.title}/> :
                    <img src={`data:image/svg+xml;utf8,${encodeURIComponent(config.downArrow)}`} alt={config.title}/> }
                </div>
            </div>
            { showRecentTransactions && <div className="recent-transactions__body">
                {map( transactions, transaction => {
                    return(
                        <Transaction key={transaction.id} transaction={transaction}/>
                    )
                })}
            </div>
            }
        </div>
    )
}


export default RecentTransactions;