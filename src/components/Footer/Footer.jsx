import React from "react";
import { map } from "lodash";
import "./Footer.scss";
import { footer } from "../../app_data/footer";

const Footer = () =>{
    return(
        <div className="footer">
            {
                map(footer, item => {
                    return(
                        <section key={item.name} className="footer--item">
                            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(item.icon)}`} alt={item.name}/>
                            <span>{item.name}</span>
                        </section>
                    )
                })
            }
        </div>
    )
}

export default Footer;