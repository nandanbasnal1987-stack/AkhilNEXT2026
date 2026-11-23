'use client';

import React from 'react'
const cart1 = "/images/cart1.jpg";
const cart2 = "/images/cart2.jpg";
const cart3 = "/images/cart3.jpg";
import Card from '../components/features/Card'


function Latestblog() {

    const Cdata = [
        {
            "cart": cart1,
            "title":"New Discoveries in Health care IT",
            "desc":"We are thrilled to share the success of our recent Digital Health-tech Roadshow, a remarkable collaboration between ASPL and PwC...."
        
        },
        {
            "cart": cart2,
            "title":"New Discoveries in Health care IT",
            "desc":"We are thrilled to share the success of our recent Digital Health-tech Roadshow, a remarkable collaboration between ASPL and PwC...."
        
        },
        {
            "cart": cart3,
            "title":"New Discoveries in Health care IT",
            "desc":"We are thrilled to share the success of our recent Digital Health-tech Roadshow, a remarkable collaboration between ASPL and PwC...."
        
        }
    ]

    return (
        <>
        <div className='container-fluid'>
                <div className='row gy-4 p-5' >                  

            {
             Cdata.map((value)=>(
                <Card key={value.title} imag ={value.cart} title = {value.title} desc = {value.desc}/>
             ))            
                
            }    
            </div>
            </div>
           
    

    </>
    )
}

export default Latestblog;