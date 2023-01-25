import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideNavHR from "../SideNavHR";
import { userAuthToken } from '../../utils/parseToken';

const Leaveemployee = () => {
    const postBy = userAuthToken?.userId;

    const [getLeave, setGetLeave] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        axios.get("/api/get-leaves").then(data => {
            setGetLeave(data.data.data)
            console.log(data.data.data)

        }).catch(e => {
            console.log(e)
        })
    }, [load])
    return (
        <div className="d-flex">
            <SideNavHR tab="leave" />
            <div className="content w-100">
                <div className="">
                    <div className="my-4 px-4">
                        <h4 className="text-light">Projects</h4>
                        <small className="text-sm text-light">
                            See Leave you are involved in
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
                                    type="text"
                                    className="form-control form-control-sm form-control-solid"
                                    placeholder="Search..."
                                />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="">Status</label>
                                <select
                                    className="form-control-sm form-select py-0 text-secondary text-sm"
                                    name=""
                                    id=""
                                >
                                    <option className="text-sm" disabled value="" selected>
                                        None Selected
                                    </option>
                                    <option className="text-sm" value="Intern">
                                        Completed
                                    </option>
                                    <option className="text-sm" value="Junior">
                                        Incomplete
                                    </option>
                                </select>
                            </div>
                            <div className="col d-flex align-items-end">
                                <button className="btn btn-sm btn-primary px-4">Filter</button>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid middle-section">
                        <div className="middle-content pb-5">
                            <div className="col">
                                {/* Recent Jobs */}
                                <div className="mb-4">
                                    <div className="d-flex align-items-center my-3">
                                        <h6 className="m-0">LEAVES</h6>
                                        <Link className="ms-auto" to="/employee/add-leave">
                                            <button className="btn no-img-avatar-sm bg-primary text-light shadow me-3">
                                                +
                                            </button>
                                        </Link>
                                    </div>
                                    {
                                        getLeave?.length >= 0 ?
                                            getLeave?.map((data, ind) => {
                                                return (
                                                    <div className="border rounded shadow-sm row align-items-center my-2 mx-0 py-2 job-row" >
                                                        <div className="col  d-flex align-items-center">
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
                                                            <p className={`m-0 badge ${data?.isApproved === true ? ' badge-muted-success' : ' badge-muted-danger'} fw-light`}>
                                                                {data?.isApproved ? 'Approved' : 'Not Approved'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            :
                                            <>loadding...</>
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

export default Leaveemployee;
