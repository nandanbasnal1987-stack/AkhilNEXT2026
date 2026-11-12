'use client';

import React from 'react'
const plateform = "/images/plateform.jpg";
const card1 = "/images/Card_frst.jpg";
const card2 = "/images/Card_sec.jpg";
const card3 = "/images/Card_third.jpg";
const card4 = "/images/Card_four.jpg";
const card5 = "/images/Card_five.jpg";
import ScrollTrigger from "@/components/common/ScrollTrigger";
import { useState } from 'react';



function Plateform() {
    const [trans, setTrans] = useState(false)

    return (
        <>
            <ScrollTrigger onEnter={() => setTrans(true)} onExit={() => setTrans(false)}>
                <div className='container-fluid plateform'>
                    <div className='row p-5'>
                        <div className='col-md-3 plt'>
                            {trans && <img className='pimg' src={card1} height={200} width={200} />}
                        </div>
                        <div className='col-md-6'>
                        </div>
                        <div className='col-md-3 plt'>
                            {trans && <img className='pimg' src={card2} height={200} width={200} />}
                        </div>
                    </div>
                    <div className='row p-5 '>
                        <div className='col-md-5 plt1'>
                            {trans && <img className='pimg' src={card3} height={200} width={200} />}
                        </div>
                        <div className='col-md-3'>
                        </div>
                        <div className='col-md-4 plt2'>
                            {trans && <img className='pimg' src={card4} height={200} width={200} />}
                        </div>
                    </div>
                    <div className='row p-5 '>
                        <div className='col-md-4'>
                        </div>

                        <div className='col-md-4 '>
                            {trans && <img className='plt3' src={card5} height={200} width={200} />}
                        </div>
                    </div>
                </div>
            </ScrollTrigger>
        </>
    )
}
export default Plateform;