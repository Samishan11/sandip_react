import React from 'react';
import { useLocation } from "react-router-dom";
import SideNavHR from './SideNavHR';

const Cv = () => {
  const data = useLocation()?.state?.data;
  function getExtension(filename) {
    return filename.split('.').pop()
  }
  return (
    <div className='d-flex bg-light' >

      {/* <SideNavHR tab="applicant" /> */}
      <div className='container'>
        <div className='row '>
          <div className='col-md-10 d-block mx-auto '>
            <i onClick={() => window.print()} className="fa-solid my-3 d-block mx-auto fa-print text-dark h4"></i>
            <div className='d-flex justify-content-center align-items-center'>
              <img className='d-flex justify-content-center align-items-center' style={{ objectFit: 'cover', width: '100%', height: "100%", backgroundRepeat: "no-repeat" }} src={data?.cv}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
export default Cv;