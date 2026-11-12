'use client';

import React from 'react'
import '../../styles/global.css';
const downloadimg = "/images/downloadimg.svg";
const reqs = "/images/DemoReq.svg";

function Details(props) {
    return (
        <>
        
            <h1 className='headcolor'>{props.first}</h1>
            <h1 className='headcolor2'>{props.second}</h1>
            <div>
                <img className='hidden' src={downloadimg} height={50} alt='image'/>
                <img className='btncss hidden' src={reqs} height={50} alt='image'/>
            
            </div>
            
        </>
    )
}
export default Details