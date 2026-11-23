'use client';

import React from "react";
import Details from '../components/features/Details';
const frame = "/images/frame.svg";
const client = "/images/clint_img.svg";
import '../styles/global.css';
const downloadimg = "/images/downloadimg.svg";
const reqs = "/images/DemoReq.svg";

function OurClients() {
    return (
        <>
            <div className="container-fluid p-5 ">
                <div className="row">
                    <div className="col-md-6 pt-5 client bg-danger">
                        <h5>Manage all your Data</h5>
                        <h2>Grow with Miracle on Cloud</h2><h7>  is an initiative from Akhil Systems Pvt Ltd having  nearly 3<br></br> decades of
                            exposure in healthcare IT to digitalize smaller <br></br> healthcare facilities
                            like nursing homes, small, mid-sized <br></br>hospitals, clinics & Labs helping
                            them to deliver superior <br></br> care, improve operational agility, and thrive
                            in tooday s <br></br> dynamic healthcare
                            landscape.</h7> <br></br>
                        <img className='mt-3' src={downloadimg} height={50} alt='image' />
                        <img className='btncss mt-3' src={reqs} height={50} alt='image' />

                    </div>
                    <div className="col-md-6">
                        <img src={client} className='product-image' width="500" height={350} alt="Responsive image" />

                    </div>
                </div>
            </div>

        </>
    )
}
export default OurClients;