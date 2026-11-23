'use client';

import React, { useState } from "react";

function Faqans(props)
{

 const[show,setShow] = useState(false)

    return(
        <>
        <div className=" bg-light1 mt-3">
           <div className="faq">
           <div>
            <h5>{props.qus}</h5>

            </div>
            <div className="faq-head">
            <h3 className="text" onClick={()=>setShow(!show)}>{show? "-" : "+"}</h3>
            </div>

           </div>
            {
            show && <h8>{props.ans}</h8>
        }
        

        </div>
        
       
        
        </>
    )
}
export default Faqans;