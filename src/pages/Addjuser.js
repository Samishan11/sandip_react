import React, { useState } from "react";
import SideNavHR from "../components/SideNavHR";
import "react-nice-dates/build/style.css";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import { toast } from "react-toastify";

import { useLocation } from "react-router-dom";
const Adduser = () => {
  const data = useLocation()?.state?.data;

  const [formdata, setFormdata] = useState({
    username: data?.username ? data.username : "",
    firstName: data?.firstName ? data.firstName : "",
    lastName: data?.lastName ? data?.lastName : "",
    password: data?.password ? data?.password : "",
    email: data?.email ? data?.email : "",
    checkpassword: data?.password ? data?.password : "",
    isHR: data?.isHR ? data?.isHR : false,
    isManager: data?.isManager ? data?.isManager : false,
    isEmployee: data?.isEmployee ? data?.isEmployee : false,
    salary: data?.salary ? data?.salary : "",
  });

  const [isVerify, setVerify] = useState(
    data?.isVerify ? data?.isVerify : false
  );
  const [isHR, setHr] = useState(data?.isHR ? data?.isHR : false);
  const [isEmployee, setEmployerr] = useState(
    data?.isEmployee ? data?.isEmployee : false
  );
  const [isManager, setManager] = useState(
    data?.isManager ? data?.isManager : false
  );
  console.log(isHR, isEmployee, isManager);
  const onInputChange = (e) => {
    console.log(e.target.value);
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const [img, setImg] = useState();

  const postUser = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("profile_pic", img);
    fd.append("username", formdata.username);
    fd.append("firstName", formdata.firstName);
    fd.append("lastName", formdata.lastName);
    fd.append("email", formdata.email);
    fd.append("password", formdata.password);
    fd.append("isHR", isHR);
    fd.append("isEmployee", isEmployee);
    fd.append("isManager", isManager);
    fd.append("isVerify", isVerify);
    fd.append("salary", formdata.salary);

    try {
      if (!data) {
        // if (formdata.password !== formdata.checkpassword) {
        //   toast.warning("Password not match")
        // } else {

        var res = await axios.post("/api/register", {
          username: formdata.username,
          firstName: formdata.firstName,
          lastName: formdata.lastName,
          email: formdata.email,
          password: formdata.password,
          isHR: isHR,
          isManager: isManager,
          isEmployee: isEmployee,
          isVerify: isVerify,
          profile_pic: img,
        });
        toast.success("User Created");
        console.log(res);
      } else {
        var res = await axios.put("/api/update-user/" + data?._id, fd);
        toast.success("User Update");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="d-flex">
        <SideNavHR tab={"manage-user"} />
        <div className="bg-light w-100">
          <div className="mb-4 bg-primary z-n1 px-4 py-5">
            <h4 className="text-light">{!data ? "Add User" : "Update User"}</h4>
            <small className="text-sm text-light">
              {data
                ? " Add user for your new jobProvide information decent information about your job to attract best candidates."
                : " Update user for your new jobProvide information decent information about your job to attract best candidates."}
            </small>
          </div>
          <div className="bg-light container-fluid">
            <div className="col-8 py-4">
              <h6>{!data ? "Add new User" : "Update User"}</h6>
              <div className="row my-3">
                <div className="col-md-6">
                  <small>Firstname</small>
                  <input
                    name="firstName"
                    value={formdata?.firstName}
                    onChange={(e) => onInputChange(e)}
                    className="form-control rounded text-sm text-secondary"
                    type="text"
                  />
                </div>
                <div className="col-md-6">
                  <small>Lastname</small>
                  <input
                    name="lastName"
                    value={formdata?.lastName}
                    onChange={(e) => onInputChange(e)}
                    className="form-control rounded text-sm text-secondary"
                    type="text"
                  />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-md-6">
                  <small>Username</small>
                  <input
                    name="username"
                    value={formdata?.username}
                    onChange={(e) => onInputChange(e)}
                    className="form-control rounded text-sm text-secondary"
                    type="text"
                  />
                </div>
                <div className="col-md-6">
                  <small>Email</small>
                  <input
                    name="email"
                    value={formdata?.email}
                    onChange={(e) => onInputChange(e)}
                    className="form-control rounded text-sm text-secondary"
                    type="email"
                  />
                </div>
              </div>
              <div className="row my-3">
                {data ? (
                  <div className="col-md-6 align-items-center">
                    <small>User Role</small>
                    <div className="d-flex">
                      <div class="form-check me-2">
                        <input
                          onChange={(e) => {
                            setHr(e.target.value);
                            setManager(false);
                            setEmployerr(false);
                          }}
                          value={true}
                          defaultChecked={formdata.isHR ? true : false}
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          HR
                        </label>
                      </div>
                      <div class="form-check me-2">
                        <input
                          onChange={(e) => {
                            setEmployerr(e.target.value);
                            setHr(false);
                            setManager(false);
                          }}
                          value={true}
                          defaultChecked={formdata.isEmployee ? true : false}
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Employee
                        </label>
                      </div>
                      <div class="form-check me-2">
                        <input
                          onChange={(e) => {
                            setManager(e.target.value);
                            setHr(false);
                            setEmployerr(false);
                          }}
                          value={true}
                          defaultChecked={formdata.isManager ? true : false}
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Manager
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="col-md-6 align-items-center">
                    <small>User Role</small>
                    <div className="d-flex">
                      <div class="form-check me-2">
                        <input
                          onChange={(e) => {
                            setHr(e.target.value);
                            setManager(false);
                            setEmployerr(false);
                          }}
                          value={true}
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          HR
                        </label>
                      </div>
                      <div class="form-check me-2">
                        <input
                          onChange={(e) => {
                            setEmployerr(e.target.value);
                            setHr(false);
                            setManager(false);
                          }}
                          value={true}
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Employee
                        </label>
                      </div>
                      <div class="form-check me-2">
                        <input
                          onChange={(e) => {
                            setManager(e.target.value);
                            setHr(false);
                            setEmployerr(false);
                          }}
                          value={true}
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Manager
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                <div className="col">
                  <p className="m-0 text-xs">Verify User</p>
                  {/* <p className={`m-0 badge ${data?.isApproved === true ? ' badge-muted-warning' : ' badge-muted-danger'} fw-light`}>
                             {data?.isApproved ? 'Approved' : 'Not Approved'}
                           </p> */}
                  <select
                    onChange={(e) => setVerify(e.target.value)}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value={data?.isVerify} selected>
                      {data?.isVerify ? "Verified" : "Pending"}
                    </option>
                    <option value={true}>Verify</option>
                    <option value={false}>Pending</option>
                  </select>
                </div>
                <div className="row my-2">
                  <div className="col-md-6">
                    <small>Profile Picture</small>
                    <input
                      name="profile_pic"
                      onChange={(e) => e.target.files[0]}
                      className="form-control rounded text-sm text-secondary"
                      type="file"
                    />
                  </div>
                  <div className="col-md-6">
                    <small>Salary</small>
                    <input
                      name="salary"
                      value={formdata.salary}
                      onChange={(e) => onInputChange(e)}
                      className="form-control rounded text-sm text-secondary"
                      type="number"
                    />
                  </div>
                </div>
              </div>
              {!data && (
                <div className="row my-3">
                  <div className="col-md-6">
                    <small>Password</small>
                    <input
                      name="password"
                      onChange={(e) => onInputChange(e)}
                      className="form-control rounded text-sm text-secondary"
                      type="password"
                    />
                  </div>
                  <div className="col-md-6">
                    <small>Confirmpassword</small>
                    <input
                      name="confirmpassword"
                      onChange={(e) => onInputChange(e)}
                      className="form-control rounded text-sm text-secondary"
                      type="password"
                    />
                  </div>
                </div>
              )}
              <div className="">
                <button
                  onClick={postUser}
                  className="btn btn-primary rounded d-block ms-auto"
                  type="button"
                >
                  {!data ? " + Create" : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adduser;
