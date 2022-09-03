import React from "react";


export default function header({page}){
    return(
        <div className="header">
                <div className="logo">
                    <div className="header__back">
                        <i classNamex="fas fa-angle-left"></i>
                    </div>
                    <h3>{page}</h3>
                </div>
            </div>  
    )
}