import axios, { spread } from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

import SideNavHR from '../SideNavHR';
const Applicantemp = () => {
    const navigate = useNavigate();
    const [getJob, setGetJob] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        axios.get("/api/get-Applicant").then(data => {
            setGetJob(data.data.data)
        }).catch(e => {
            console.log(e)
        })
    }, [load]);

    // 
    const deleteApplicant = async (id) => {
        try {
            const res = await axios.delete('/api/delete-applicant/' + id, {
                isHired: true
            });
            if (!load) {
                setLoad(true)
            } else {
                setLoad(false)
            }
            toast.success("Deleted Sucessfully")
        } catch (error) {
            toast.error("Something went wrong")
        }
    };

    // 
    function getExtension(filename) {
        return filename.split('.').pop()
    }
    return (
        <div className="d-flex">
            <SideNavHR tab="applicant" />
            <div className="content w-100">
                <div className=''>
                    <div className='my-4 px-4'>
                        <h4 className="text-light">Job Applicant</h4>
                        <small className='text-sm text-light'>See all the applicant who want to work for your company.</small>
                    </div>
                    <div className='container-fluid px-4'>
                        <div className="container mx-auto row border rounded position-relative bg-light shadow-sm py-4" style={{ zIndex: "1" }}>
                            <div className="col-md-3">
                                <label htmlFor="">Search</label>
                                <input type="text" className="form-control form-control-sm form-control-solid" placeholder="Search..." />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="">Position</label>
                                <select className="form-control-sm form-select py-0 text-secondary text-sm" name="" id="">
                                    <option className="text-sm" disabled value="" selected>None Selected</option>
                                    <option className="text-sm" value="">Intern</option>
                                    <option className="text-sm" value="">Junior</option>
                                    <option className="text-sm" value="">Mid Level</option>
                                    <option className="text-sm" value="">Senior</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="">Type</label>
                                <select className="form-control-sm form-select py-0 text-secondary text-sm" name="" id="">
                                    <option className="text-sm" disabled value="" selected>None Selected</option>
                                    <option className="text-sm" value="">Full Time</option>
                                    <option className="text-sm" value="">Part Time</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="">Salary</label>
                                <input type="number" className="form-control form-control-sm" />
                            </div>
                            <div className="col d-flex align-items-end">
                                <button className="btn btn-sm btn-primary w-75">Filter</button>
                            </div>
                        </div>
                    </div>

                    <div className='container-fluid middle-section'>
                        <div className='middle-content pb-5'>
                            <div className='col'>
                                {/* Recent Jobs */}
                                <div className='mb-4'>
                                    <div className="d-flex align-items-center my-3">
                                        <h6 className='m-0'>Your Job Apply</h6>
                                    </div>
                                    {
                                        getJob?.length > 0 ?
                                            getJob.map((val, ind) => {
                                                return <div key={ind} className='border rounded shadow-sm row align-items-center my-2 mx-0 py-2 job-row'>
                                                    <div className='col-3 d-flex align-items-center'>
                                                        <div className='no-img-avatar-sm me-3'>
                                                            {
                                                                val?.user?.profile_pic ?
                                                                    <img className='no-img-avatar-sm' src={`http://localhost:5000/${val?.user?.profile_pic}`} /> :
                                                                    <div className='no-img-avatar-sm'>{val?.user?.firstName?.slice(0, 1)?.toUpperCase() + val?.user?.lastName?.slice(0, 1)?.toUpperCase()}</div>
                                                            }
                                                        </div>
                                                        <div className='mx-2'>
                                                            <p className='m-0 text-s'>{val.vacancy.vacancyTitle}</p>
                                                        </div>
                                                        <div className='me-2'>
                                                            <p className='m-0 text-xs'>{val?.jobType}</p>
                                                        </div>
                                                    </div>
                                                    <div className='col'>
                                                        <p className='m-0 badge badge-muted-primary fw-light'>{val?.vacancy?.position}</p>
                                                    </div>

                                                    <div className='col'>
                                                        <p className='m-0 text-xs'>Is Approved</p>
                                                        <p className={`m-0 badge ${val?.isHired ? ' badge-muted-success' : ' badge-muted-danger'} fw-light`}>{val?.isHired ? 'Shortlisted' : 'Pending'}</p>
                                                    </div>
                                                    <div className='col'>
                                                        <p className='m-0 badge badge-muted-warning fw-light'>{val?.applied_at}</p>
                                                    </div>
                                                    <div className='col'>
                                                        <button onClick={() => {
                                                            getExtension(val?.cv) === "pdf" ?
                                                                window.location = `http://localhost:5000//${val?.cv}`
                                                                :
                                                                navigate("/cv", { state: { data: val } })

                                                        }} className="btn btn-sm rounded badge-muted-primary mx-2"><i className="fa-solid fa-print text-light"></i></button>
                                                        <button onClick={() => deleteApplicant(val?._id)} className="btn btn-sm rounded badge-muted-danger mx-2"><i className="fa-solid fa-trash text-danger"></i></button>
                                                    </div>
                                                </div>
                                            })
                                            :
                                            <p>loading...</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Applicantemp;