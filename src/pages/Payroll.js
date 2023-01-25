import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SideNavHR from "../components/SideNavHR";
const Payroll = () => {
  const navigate = useNavigate();
  const [getUser, setGetUser] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    axios
      .get("/api/get-user")
      .then((data) => {
        setGetUser(data.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [load]);
  //
  const getUserData = (i) => {
    navigate("/payroll-detail", { state: { data: getUser[i] } });
  };
  //
  const deleteApi = async (id) => {
    try {
      var res = await axios.delete("/api/delete-user/" + id);
      toast.success("User Has Been Deleted");
      if (!load) {
        setLoad(true);
      } else {
        setLoad(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  // filter
  const [filterchange, setfilterchange] = useState();
  const [search, setSearch] = useState([]);
  var filterData;
  const searchUser = async (e) => {
    try {
      var res = await axios.get("/api/search-user/" + filterchange);
      setSearch(res.data.data);
      setfilterchange("");
      console.log(res.data);
    } catch (error) {
      toast.error("Resut not found!!");
    }
  };
  const filter = getUser?.filter((data) => {
    if (data.username === filterchange || data.isHR === filterchange) {
      filterData = data;
      return data;
    }
  });

  return (
    <div className="d-flex">
      <SideNavHR tab="payroll" />
      <div className="content w-100">
        <div className="">
          <div className="my-4 px-4">
            <h4 className="text-light">Pay Roll</h4>
            <small className="text-sm text-light">
              See all user Pay Roll.
            </small>
          </div>
          <div className="container-fluid px-4">
            <div
              className="container mx-auto row border rounded position-relative bg-light shadow-sm py-4"
              style={{ zIndex: "1" }}
            >
              <div className="col-md-4">
                <label htmlFor="">Search</label>
                <input
                  onChange={(e) => setfilterchange(e.target.value)}
                  type="text"
                  className="form-control form-control-sm form-control-solid"
                  placeholder="Search..."
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="">User Type</label>
                <select
                  onChange={(e) => setfilterchange(e.target.value)}
                  className="form-control-sm form-select py-0 text-secondary text-sm"
                  name=""
                  id=""
                >
                  <option className="text-sm" disabled value="" selected>
                    None Selected
                  </option>
                  <option className="text-sm" value={"isHR"}>
                    Hr
                  </option>
                  <option className="text-sm" value={"isManager"}>
                    Manager
                  </option>
                  <option className="text-sm" value={"isEmployee"}>
                    Employee
                  </option>
                </select>
              </div>
              <div className="col d-flex align-items-end">
                <button
                  onClick={() => {
                    searchUser();
                  }}
                  className="btn btn-sm btn-primary w-75"
                >
                  Filter
                </button>
              </div>
            </div>
          </div>

          <div className="container-fluid middle-section">
            <div className="middle-content pb-5">
              <div className="col">
                {/* Recent Jobs */}
                <div className="mb-4">
                  {search.length === 0
                    ? getUser?.map((val, ind) => {
                        return (
                          <div
                            key={ind}
                            className="border rounded shadow-sm row align-items-center my-2 mx-0 py-2 job-row"
                          >
                            <div className="col-3 d-flex align-items-center">
                              {val?.profile_pic ? (
                                <div className="no-img-avatar-sm">
                                  <img
                                    className="no-img-avatar-sm"
                                    src={`http://localhost:5000/${val?.profile_pic}`}
                                  />
                                </div>
                              ) : (
                                <div className="no-img-avatar-sm">
                                  {val?.firstName?.slice(0, 1)?.toUpperCase() +
                                    val?.lastName?.slice(0, 1)?.toUpperCase()}
                                </div>
                              )}
                              <div className="mx-2">
                                <p className="m-0 text-s">{val?.firstName}</p>
                                <p className="m-0 text-xs">{val?.lastName}</p>
                              </div>
                            </div>
                            <div className="col">
                              <p className="m-0 badge badge-muted-primary fw-light">
                                {val?.username}
                              </p>
                            </div>
                            <div className="col">
                              <p className="m-0 text-s">Email: {val?.email}</p>
                            </div>

                            <div className="col">
                              <button
                                onClick={() => getUserData(ind)}
                                className="btn btn-sm rounded badge-muted-primary"
                              >
                                <i className="fa-solid fa-circle-info text-primary"></i>
                              </button>
                            </div>
                          </div>
                        );
                      })
                    : search?.map((val, ind) => {
                        return (
                          <div
                            key={ind}
                            className="border rounded shadow-sm row align-items-center my-2 mx-0 py-2 job-row"
                          >
                            <div className="col-3 d-flex align-items-center">
                              {val?.profile_pic !== "" ? (
                                <div className="no-img-avatar-sm">
                                  <img
                                    className="no-img-avatar-sm"
                                    src={`http://localhost:5000/${val?.profile_pic}`}
                                  />
                                </div>
                              ) : (
                                <div className="no-img-avatar-sm">
                                  {val?.firstName?.slice(0, 1)?.toUpperCase() +
                                    val?.lastName?.slice(0, 1)?.toUpperCase()}
                                </div>
                              )}
                              <div className="mx-2">
                                <p className="m-0 text-s">{val?.firstName}</p>
                                <p className="m-0 text-xs">{val?.lastName}</p>
                              </div>
                            </div>
                            <div className="col">
                              <p className="m-0 badge badge-muted-primary fw-light">
                                {val?.username}
                              </p>
                            </div>
                            <div className="col">
                              <p className="m-0 text-s">Email: {val?.email}</p>
                            </div>

                            <div className="col">
                              <button
                                onClick={() => getUserData(ind)}
                                className="btn btn-sm rounded badge-muted-primary"
                              >
                                <i className="fa-solid fa-circle-info text-primary"></i>
                              </button>
                              :
                            </div>
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Payroll;
