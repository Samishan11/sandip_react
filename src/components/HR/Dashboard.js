import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { userAuthToken } from '../../utils/parseToken';
import CircularBar from '../CircularBar';
import SideNavHR from '../SideNavHR';
const Dashboard = () => {
  const [getJob, setGetJob] = useState([]);
  useEffect(() => {
    axios
      .get("/api/get-vacancy")
      .then((data) => {
        console.log(data.data.data);
        setGetJob(data.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const [getApplicant, setGetApplicant] = useState([]);
  const [filterApplicant, setfilterApplicant] = useState([]);
  useEffect(() => {
    axios.get("/api/get-Applicant").then(data => {
      setGetApplicant(data.data.data)
      const filterApplicant = data.data.data?.filter(data => {
        if (data.isHired) {
          return data;
        }
      });
      setfilterApplicant(filterApplicant)
    }).catch(e => {
      console.log(e)
    })
  }, []);

  // 
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios.get("/api/get-user").then(data => {
      setUser(data.data.data)
    }).catch(e => {
      console.log(e)
    })
  }, [])

  // 
 

  // calculate hire percentage
  const [percentage, setPercentage] = useState();
  useEffect(() => {
    var percentage = (parseInt(setfilterApplicant?.length) / parseInt(getJob?.length)) * 100;
    setPercentage(percentage)
  }, [getApplicant || getJob]);


  return (
    <div className="d-flex">
      <SideNavHR tab="dashboard" />
      <div className='content w-100'>
        <div className=''>
          <div className='my-4 px-4'>
            <h4 className="text-light">Welcome {userAuthToken?.username?.toUpperCase()}</h4>
            <small className='text-sm text-light'>Observe your Human Resourcing Performance.</small>
          </div>
          <div className='container mx-auto row px-3'>
            <div className='col-md-2'>
              <div className='rounded border bg-light px-2 pt-3 shadow text-secondary my-2'>
                <span className='d-block text-center'><i className='fa-solid fa-crosshairs'></i> Positions</span>
                <p className='text-center fw-bold' style={{ fontSize: "3rem" }}>20</p>
              </div>
            </div>
            <div className='col-md-2'>
              <div className='rounded border bg-light px-2 pt-3 shadow text-secondary my-2'>
                <span className='d-block text-center'><i className='fa-solid fa-users'></i> Employees</span>
                <p className='text-center fw-bold' style={{ fontSize: "3rem" }}>{user?.length}</p>
              </div>
            </div>
            <div className='col-md-2'>
              <div className='rounded border bg-light px-2 pt-3 shadow text-secondary my-2'>
                <span className='d-block text-center'><i className='fa-solid fa-briefcase'></i> Active Jobs</span>
                <p className='text-center fw-bold' style={{ fontSize: "3rem" }}>{getJob?.length}</p>
              </div>
            </div>
            <div className='col-md-2'>
              <div className='rounded border bg-light px-2 pt-3 shadow text-secondary my-2'>
                <span className='d-block text-center'><i className='fa-solid fa-user-group'></i> Applicants</span>
                <p className='text-center fw-bold' style={{ fontSize: "3rem" }}>{getApplicant?.length}</p>
              </div>
            </div>
            <div className='col-md-2'>
              <div className='rounded border bg-light px-2 pt-3 shadow text-secondary my-2'>
                <span className='d-block text-center'><i className='fa-solid fa-user-clock'></i> Interviewed</span>
                <p className='text-center fw-bold' style={{ fontSize: "3rem" }}>{filterApplicant?.length}</p>
              </div>
            </div>
            <div className='col-md-2'>
              <div className='rounded border bg-light px-2 pt-3 shadow text-secondary my-2'>
                <span className='d-block text-center'><i className='fa-solid fa-file-lines'></i> Resume</span>
                <p className='text-center fw-bold' style={{ fontSize: "3rem" }}>{getApplicant?.length}</p>
              </div>
            </div>
          </div>

          <div className='container-fluid middle-section'>
            <div className='middle-content pb-5'>
              <div className='row px-3'>
                <div className='col-md-8'>
                  {/* Recent Jobs */}
                  <div className='mb-4'>
                    <h6 className='m-0'>RECENT JOBS</h6>
                    {
                      getJob.map((val, ind) => {
                        return (
                          <div
                            key={ind}
                            className="border rounded shadow-sm row align-items-center my-2 mx-0 py-2 job-row"
                          >
                            <div className="col-3 d-flex align-items-center">
                              <div className="no-img-avatar-sm">
                                {val.vacancyTitle?.slice(0, 1)}
                              </div>
                              <div className="mx-2">
                                <p className="m-0 text-s">{val?.vacancyTitle}</p>
                                <p className="m-0 text-xs">{val?.jobType}</p>
                              </div>
                            </div>
                            <div className="col">
                              <p className="m-0 badge badge-muted-primary fw-light">
                                {val?.position}
                              </p>
                            </div>
                            <div className="col">
                              <p className="m-0 text-s">
                                Applicants: {val?.applicants}
                              </p>
                            </div>
                            <div className="col">
                              <p className="m-0 text-xs">Posted</p>
                              <p className="m-0 text-sm">{val?.postAt}</p>
                            </div>
                            <div className="col">
                              <p className="m-0 badge badge-muted-warning fw-light">
                                {val?.dueDate} Days To Expire
                              </p>
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>

                  {/* Recent Applicants */}
                  <div className='my-2'>
                    <h6>RECENT APPLICANTS</h6>
                    <div className='border rounded shadow bg-light px-3 py-3 text-secondary' style={{ width: "100%", overflowX: "hidden" }}>
                      <table class="table table-borderless">
                        <thead className='text-secondary'>
                          <tr>
                            <td className=""></td>
                            <td className="">NAME</td>
                            <td className="">APPLY FOR</td>
                            <td className="">DATE</td>
                            <td className=""></td>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            getApplicant.length > 0 ?
                              getApplicant.map((val, ind) => {
                                return (
                                  <tr className=''>
                                    <td><div className='sq-avatar-sm rounded d-flex align-items-center justify-content-center text-secondary'>MN</div></td>
                                    <td>
                                      <p className='m-0 text-s'>{val?.user?.firstName + val?.user?.lastName}</p>
                                      <p className='m-0 text-xs'>{val?.user?.email}</p>
                                    </td>
                                    <td className='text-s'>{val?.vacancy?.vacancyTitle}</td>
                                    <td className='text-s'>{val?.applied_at}</td>
                                    <td><span className={`badge ${val?.isHired ? ' badge-muted-success' : ' badge-muted-warning'} fw-light py-2`}>{val?.isHired ? 'INTERVIEWED' : 'PENDING'}</span></td>
                                  </tr>
                                )
                              })
                              :
                              <p className=''>loading...</p>
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className='col-md-4 my-5 my-md-0'>
                  <div className='border rounded'>
                    <h5 className='text-center mt-4 mb-0'>Hire Rate</h5>
                    <div className='circular-bar mx-auto'>
                      <CircularBar value={percentage ? percentage : 0} />
                    </div>
                    <div className='d-flex w-50 mx-auto mt-4'>
                      <div>
                        <p className='m-0 text-s'>Last Week</p>
                        <h2>{percentage ? percentage - (percentage-23) : 0}%</h2>
                      </div>
                      <div className='ms-auto'>
                        <p className='m-0 text-s'>Last Month</p>
                        <h2>{percentage ? percentage - (percentage - 42) : 0}%</h2>
                      </div>
                    </div>
                    <p className='text-center text-s mt-4'>You have completed {filterApplicant?.length} Tasks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard