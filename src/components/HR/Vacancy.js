import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import SideNavHR from "../SideNavHR";
const Vacancy = () => {
  const navigate = useNavigate();
  const vacancies = [
    {
      title: "React Developer",
      position: "Junior",
      type: "Full Time",
      applicants: 0,
      date: "23 Dec, 2022",
      expires: 12,
    },
    {
      title: "QA Engineer",
      position: "Mid",
      type: "Full Time",
      applicants: 0,
      date: "23 Dec, 2022",
      expires: 12,
    },
    {
      title: "Software Engineer",
      position: "Senior",
      type: "Part Time",
      applicants: 0,
      date: "23 Dec, 2022",
      expires: 12,
    },
    {
      title: "Laravel Developer",
      position: "Junior",
      type: "Full Time",
      applicants: 0,
      date: "23 Dec, 2022",
      expires: 12,
    },
    {
      title: "UI Designer",
      position: "Intern",
      type: "Full Time",
      applicants: 0,
      date: "23 Dec, 2022",
      expires: 12,
    },
    {
      title: "React Developer",
      position: "Mid",
      type: "Part Time",
      applicants: 0,
      date: "23 Dec, 2022",
      expires: 12,
    },
  ];
  const [getJob, setGetJob] = useState([]);
  const [load, setLoad] = useState(false);
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
  }, [load]);

  //
  const getIndexData = (i) => {
    navigate("/add-job", { state: { data: getJob[i] } });
  };

  // 
  const deleteApi = async (id) => {
    try {
      var res = await axios.delete('/api/delete-vacancy/' + id)
      toast.success("Deleted")
      if (!load) {
        setLoad(true)
      } else {
        setLoad(false)
      }
    } catch (error) {
      toast.error("Someting went wrong")
    }

  };
  // filter 
  const [filterchange, setfilterchange] = useState();
  const filter = getJob?.filter(data => {
    if (data.vacancyTitle.toLowerCase().includes(filterchange) || data.position === filterchange || data.salary === filterchange || data.jobType === filterchange) {
      return data;
    }
  })

  return (
    <div className="d-flex">
      <SideNavHR tab="jobs" />
      <div className="content w-100">
        <div className="">
          <div className="my-4 px-4">
            <h4 className="text-light">Job Vacancies</h4>
            <small className="text-sm text-light">
              See jobs available for your company.
            </small>
          </div>
          <div className="container-fluid px-4">
            <div
              className="container mx-auto row border rounded position-relative bg-light shadow-sm py-4"
              style={{ zIndex: "1" }}
            >
              <div className="col-md-3">
                <label htmlFor="">Search</label>
                <input
                  onChange={e => setfilterchange(e.target.value)}
                  type="text"
                  className="form-control form-control-sm form-control-solid"
                  placeholder="Search..."
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="">Position</label>
                <select
                  onChange={e => setfilterchange(e.target.value)}
                  className="form-control-sm form-select py-0 text-secondary text-sm"
                  name=""
                  id=""
                >
                  <option className="text-sm" disabled value="" selected>
                    None Selected
                  </option>
                  <option className="text-sm" value="Intern">
                    Intern
                  </option>
                  <option className="text-sm" value="Junior">
                    Junior
                  </option>
                  <option className="text-sm" value="Mid Level">
                    Mid Level
                  </option>
                  <option className="text-sm" value="Senior">
                    Senior
                  </option>
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor="">Type</label>
                <select
                  onChange={e => setfilterchange(e.target.value)}
                  className="form-control-sm form-select py-0 text-secondary text-sm"
                  name=""
                  id=""
                >
                  <option className="text-sm" disabled value="" selected>
                    None Selected
                  </option>
                  <option className="text-sm" value="Full Time">
                    Full Time
                  </option>
                  <option className="text-sm" value=" Part Time">
                    Part Time
                  </option>
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor="">Salary</label>
                <input onChange={e => setfilterchange(e.target.value)} type="number" className="form-control form-control-sm" />
              </div>
              <div className="col d-flex align-items-end">
                <button className="btn btn-sm btn-primary w-75">Filter</button>
              </div>
            </div>
          </div>

          <div className="container-fluid middle-section">
            <div className="middle-content pb-5">
              <div className="col">
                {/* Recent Jobs */}
                <div className="mb-4">
                  <div className="d-flex align-items-center my-3">
                    <h6 className="m-0">JOB VACANCIES</h6>
                    <Link className="ms-auto" to="/add-job">
                      <button className="btn no-img-avatar-sm bg-primary text-light shadow me-3">
                        +
                      </button>
                    </Link>
                  </div>
                  {
                  filter.length === 0 ?
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
                        <div className="col">
                          <button
                            onClick={() => {
                              getIndexData(ind);
                            }}
                            to="/add-job"
                            className="btn btn-sm rounded badge-muted-primary"
                          >
                            <i className="fa-solid fa-edit text-primary"></i>
                          </button>
                          <button className="btn btn-sm rounded badge-muted-danger mx-2">
                            <i onClick={() => deleteApi(val._id)} className="fa-solid fa-trash text-danger"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })
                :
                filter.map((val, ind) => {
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
                      <div className="col">
                        <button
                          onClick={() => {
                            getIndexData(ind);
                          }}
                          to="/add-job"
                          className="btn btn-sm rounded badge-muted-primary"
                        >
                          <i className="fa-solid fa-edit text-primary"></i>
                        </button>
                        <button className="btn btn-sm rounded badge-muted-danger mx-2">
                          <i onClick={() => deleteApi(val._id)} className="fa-solid fa-trash text-danger"></i>
                        </button>
                      </div>
                    </div>
                  );
                })
                }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vacancy;
