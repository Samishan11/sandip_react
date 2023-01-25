import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import SideNavHR from '../SideNavHR';

const Leave = () => {
  const [getLeave, setGetLeave] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    axios.get("/api/get-leaves").then(data => {
      setGetLeave(data.data.data)
    }).catch(e => {
      console.log(e)
    })
  }, [load])

  // 
  const [approved, setApproved] = useState();
  const leaveApprove = async (id) => {
    try {
      var res = await axios.put("/api/update-leave/" + id, {
        isApproved: approved
      });
      toast.success("Leave Approved")
    } catch (error) {
      toast.error("Something went wrong!!!")
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const results = getLeave?.filter(data => {
      return data.user.username?.toLowerCase().includes(searchTerm) || data.user.username?.toUpperCase().includes(searchTerm)
    });
    console.log(results)
    setSearchResults(results);
  }, [searchTerm]);

  // 
  const deleteLeave = async (id) => {
    try {
      const res = await axios.delete('/api/delete-leave/' + id);
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

  return (
    <div className="d-flex">
      <SideNavHR tab="leaves" />
      <div className="content w-100">
        <div className=''>
          <div className='my-4 px-4'>
            <h4 className="text-light">Manage Leave Applicantion</h4>
            <small className='text-sm text-light'>See all user leave application for your company.</small>
          </div>
          <div className='container-fluid px-4'>
            <div className="container mx-auto row border rounded position-relative bg-light shadow-sm py-4" style={{ zIndex: "1" }}>
              <div className="col-md-4">
                <label htmlFor="">Search</label>
                <input onChange={e => handleChange(e)} type="text" className="form-control form-control-sm form-control-solid" placeholder="Search..." />
              </div>
              <div className="col-md-4">
                <label htmlFor="">User Type</label>
                <select className="form-control-sm form-select py-0 text-secondary text-sm" name="" id="">
                  <option className="text-sm" disabled value="" selected>None Selected</option>
                  <option className="text-sm" value="">Hr</option>
                  <option className="text-sm" value="">Manager</option>
                  <option className="text-sm" value="">Employee</option>
                </select>
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
                    <h6 className='m-0'>LEAVES</h6>
                    <Link className="ms-auto" to="/manager/add-leave">
                      <button className="btn no-img-avatar-sm bg-primary text-light shadow me-3">+</button>
                    </Link>
                  </div>
                  {
                    searchResults.length === 0 ?
                      getLeave.length > 0 ?
                        getLeave.map((data, ind) => {
                          return (
                            <div className="border rounded shadow-sm row align-items-center my-2 mx-0 py-2 job-row" >
                              <div className="col d-flex align-items-center">
                                <div className="mx-2">
                                  <p className="m-0 text-xs">Username</p>
                                  <p className="m-0 text-s">{data?.user?.username}</p>
                                </div>
                              </div>
                              <div className="col">
                                <p className="m-0 text-xs">Leave Type</p>
                                <p className="m-0 text-s">{data?.leaveType}</p>
                              </div>
                              <div className="col">
                                <p className="m-0 text-xs">Duration</p>
                                <p className="m-0 text-sm fw-bold">{data?.leaveDuration}</p>
                              </div>
                              <div className="col">
                                <p className="m-0 text-xs">Reason</p>
                                <p className="m-0 text-sm fw-bold">{data?.leaveReason}</p>
                              </div>
                              <div className="col">
                                <p className="m-0 text-xs">Leave Date</p>
                                <p className="m-0 text-sm">{new Date(data?.leaveDate)?.toDateString()}</p>
                              </div>
                              <div className="col">
                                <p className="m-0 text-xs">Is Approved</p>
                                {/* <p className={`m-0 badge ${data?.isApproved === true ? ' badge-muted-warning' : ' badge-muted-danger'} fw-light`}>
                             {data?.isApproved ? 'Approved' : 'Not Approved'}
                           </p> */}
                                <select onChange={e => setApproved(e.target.value)} className="form-select" aria-label="Default select example">
                                  <option value={data?.isApproved} selected>{data?.isApproved ? "Approved" : "Pending"}</option>
                                  <option value={true}>Approved</option>
                                  <option value={false}>Pending</option>
                                </select>
                              </div>
                              <div className="col">
                                <button
                                  onClick={() => leaveApprove(data?._id)}
                                  to="/add-job"
                                  className="btn btn-sm rounded badge-muted-primary"
                                >
                                  save
                                </button>
                                <button onClick={() => deleteLeave(data._id)} className="btn btn-sm rounded badge-muted-danger mx-2">
                                  <i className="fa-solid fa-trash text-danger"></i>
                                </button>
                              </div>
                            </div>
                          )
                        })
                        :
                        <>loadding...</> :
                      searchResults.map((data, ind) => {
                        return (
                          <div className="border rounded shadow-sm row align-items-center my-2 mx-0 py-2 job-row" >
                            <div className="col d-flex align-items-center">
                              <div className="mx-2">
                                <p className="m-0 text-xs">Username</p>
                                <p className="m-0 text-s">{data?.user?.username}</p>
                              </div>
                            </div>
                            <div className="col">
                              <p className="m-0 text-xs">Leave Type</p>
                              <p className="m-0 text-s">{data?.leaveType}</p>
                            </div>
                            <div className="col">
                              <p className="m-0 text-xs">Duration</p>
                              <p className="m-0 text-sm fw-bold">{data?.leaveDuration}</p>
                            </div>
                            <div className="col">
                              <p className="m-0 text-xs">Reason</p>
                              <p className="m-0 text-sm fw-bold">{data?.leaveReason}</p>
                            </div>
                            <div className="col">
                              <p className="m-0 text-xs">Leave Date</p>
                              <p className="m-0 text-sm">{new Date(data?.leaveDate)?.toDateString()}</p>
                            </div>
                            <div className="col">
                              <p className="m-0 text-xs">Is Approved</p>
                              {/* <p className={`m-0 badge ${data?.isApproved === true ? ' badge-muted-warning' : ' badge-muted-danger'} fw-light`}>
                            {data?.isApproved ? 'Approved' : 'Not Approved'}
                          </p> */}
                              <select onChange={e => setApproved(e.target.value)} className="form-select" aria-label="Default select example">
                                <option value={data?.isApproved} selected>{data?.isApproved ? "Approved" : "Pending"}</option>
                                <option value={true}>Approved</option>
                                <option value={false}>Pending</option>
                              </select>
                            </div>
                            <div className="col">
                              <button
                                onClick={() => leaveApprove(data?._id)}
                                to="/add-job"
                                className="btn btn-sm rounded badge-muted-primary"
                              >
                                save
                              </button>
                              <button onClick={() => deleteLeave(data._id)} className="btn btn-sm rounded badge-muted-danger mx-2">
                                <i className="fa-solid fa-trash text-danger"></i>
                              </button>
                            </div>
                          </div>
                        )
                      })
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

export default Leave;