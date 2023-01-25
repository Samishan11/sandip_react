import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { userAuthToken } from '../../utils/parseToken';
import CircularBar from '../CircularBar';
import SideNavHR from '../SideNavHR';
const DashboardEmp = () => {

  const [getJob, setGetJob] = useState([]);
  useEffect(() => {
    axios
      .get("/api/get-vacancy")
      .then((data) => {
        setGetJob(data.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // 
  const [project, setProject] = useState([]);
  useEffect(() => {
    axios.get("/api/get-project").then(data => {
      setProject(data.data.data)
    }).catch(e => {
      console.log(e)
    })
  }, [])

  // 
  const [task, setTask] = useState([]);
  const [filterTask, setfilterTask] = useState([]);
  useEffect(() => {
    // console.log(task)
    axios.get("/api/get-task").then(data => {
      setTask(data.data.data)
      const filter = data.data.data?.filter(data=>{
        if(data.isComplet){
          return data;
        }
      })
      console.log(filter)
      setfilterTask(filter)
    }).catch(e => {
      console.log(e)
    })
  }, [])

  
   // calculate hire percentage

   const [percentage, setPercentage] = useState();
   useEffect(() => {
     var percentage = ( parseInt(filterTask?.length) / parseInt(task?.length)) * 100;
     setPercentage(percentage)
   }, [task])
  // 
  const [getApplicant, setGetApplicant] = useState([]);
  useEffect(() => {
    axios.get("/api/get-Applicant").then(data => {
      setGetApplicant(data.data.data)
    }).catch(e => {
      console.log(e)
    })
  }, [])

  const filterApplicant = getApplicant?.filter(data => {
    if (data.isHired) {
      return data;
    }
  })

  // 
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios.get("/api/get-user").then(data => {
      setUser(data.data.data)
    }).catch(e => {
      console.log(e)
    })
  }, [])
 

  return (
    <div className="d-flex">
      <SideNavHR tab="dashboard" />
      <div className='content w-100'>
        <div className=''>
          <div className='my-4 px-4'>
            <h4 className="text-light">Welcome {userAuthToken?.username?.toUpperCase()}</h4>
            <small className='text-sm text-light'>Observe your project and tasks</small>
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
                    <h6 className='m-0'>YOUR TASKS</h6>
                    {
                      task?.length > 0 ?
                        task?.slice(0, 2)?.map((data, ind) => {
                          return (
                            <div
                              className="border rounded shadow-sm row align-items-center my-2 mx-0 py-2 job-row"
                            >
                              <div className="col-3 d-flex align-items-center">
                                <div className="no-img-avatar-sm">
                                  T
                                </div>
                                <div className="mx-2">
                                  <p className="m-0 text-s">Template Design</p>
                                  <p className="m-0 text-xs">Project 1</p>
                                </div>
                              </div>
                              <div className="col">
                                <p className="m-0 badge badge-muted-primary fw-light">
                                  Critical
                                </p>
                              </div>
                              <div className="col">
                                <p className="m-0 text-xs">Assigned</p>
                                <p className="m-0 text-sm">2 Jan, 2022</p>
                              </div>
                              <div className="col">
                                <p className="m-0 badge badge-muted-warning fw-light">
                                  2 Days To Expire
                                </p>
                              </div>
                              <div className='col'>
                                <p className='text-xs m-0'>Completed</p>
                                {
                                  data?.isComplet ? <><i class="fa-solid text-success px-3 d-block fa-check"></i></> :
                                    <i class="fa-solid text-danger px-3 d-block fa-times"></i>
                                }
                              </div>
                            </div>
                          )
                        })
                        :
                        <>loading...</>
                    }
                  </div>

                  {/* Recent Applicants */}
                  <div className='my-2'>
                    <h6>RECENT PROJECTS</h6>
                    {
                      project?.length > 0 ?
                        project.slice(0, 4)?.map((data) => {
                          return (
                            <div
                              className="border rounded shadow-sm row align-items-center my-2 mx-0 py-2 job-row"
                            >
                              <div className="col-3 d-flex align-items-center">
                                <div className="no-img-avatar-sm">
                                  {data?.projectTitle?.slice(0, 1)}
                                </div>
                                <div className="mx-2">
                                  <p className="m-0 text-s">{data?.projectTitle}</p>
                                </div>
                              </div>
                              <div className="col">
                                <p className="m-0 text-xs">Total Tasks</p>
                                <p className="m-0 text-sm fw-bold">{data?.totalTask}</p>
                              </div>
                              <div className="col">
                                <p className="m-0 text-xs">Tasks Finished</p>
                                <p className="m-0 text-sm fw-bold">{data?.taskComplete ? data?.taskComplete : 0}</p>
                              </div>
                              <div className="col">
                                <p className="m-0 text-xs">Start Date</p>
                                <p className="m-0 text-sm">{data?.createAt}</p>
                              </div>
                              <div className="col">
                                <p className="m-0 badge badge-muted-warning fw-light">
                                  Expire In {data?.endAt}
                                </p>
                              </div>
                            </div>
                          )
                        })
                        :
                        <>loading...</>
                    }
                  </div>
                </div>
                <div className='col-md-4 my-5 my-md-0'>
                  <div className='border rounded'>
                    <h5 className='text-center mt-4 mb-0'>Task Success Rate</h5>
                    <div className='circular-bar mx-auto'>
                      <CircularBar value={percentage ? Math.round(percentage) : 0} />
                    </div>
                    <div className='d-flex w-50 mx-auto mt-4'>
                      <div>
                        <p className='m-0 text-s'>Last Week</p>
                        <h2>{percentage ? percentage - (percentage-27) : 0}%</h2>
                      </div>
                      <div className='ms-auto'>
                        <p className='m-0 text-s'>Last Month</p>
                        <h2>{percentage ? percentage - (percentage-40) : 0}%</h2>
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

export default DashboardEmp