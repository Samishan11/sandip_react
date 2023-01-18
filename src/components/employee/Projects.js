import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideNavHR from "../SideNavHR";
import { userAuthToken } from '../../utils/parseToken';
import { toast } from "react-toastify";

const Projects = () => {
    const postBy = userAuthToken?.userId
    const [getProject, setGetProject] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        axios.get("/api/get-project").then(data => {
            console.log(data.data.data)
            setGetProject(data.data.data)
        }).catch(e => {
            console.log(e)
        })
    }, [load]);

    const deleteproject = async (id) => {
        try {
            await axios.delete('/api/delete-project/' + id);
            if (!load) {
                setLoad(true)
            } else {
                setLoad(false)
            }
            toast.success("Project Deleted")
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="d-flex">
            <SideNavHR tab="projects" />
            <div className="content w-100">
                <div className="">
                    <div className="my-4 px-4">
                        <h4 className="text-light">Projects</h4>
                        <small className="text-sm text-light">
                            See projects you are involved in
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
                                        <h6 className="m-0">PROJECTS</h6>
                                        <Link className="ms-auto" to="/manager/add-project">
                                            <button className="btn no-img-avatar-sm bg-primary text-light shadow me-3">
                                                +
                                            </button>
                                        </Link>
                                    </div>
                                    {
                                        getProject?.length > 0 ?
                                            getProject?.map((data, ind) => {
                                                return (
                                                    <Link to={`/manager/project/${data._id}`}
                                                        className="border rounded shadow-sm row align-items-center my-2 mx-0 py-2 job-row" >
                                                        <div className="col-3 d-flex align-items-center">
                                                            <div className="no-img-avatar-sm">
                                                                P
                                                            </div>
                                                            <div className="mx-2">
                                                                <p className="m-0 text-s">{data?.projectTitle}</p>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <p className="m-0 text-xs">Total Tasks</p>
                                                            <p className="m-0 text-sm fw-bold">{data.totalTask ? data?.totalTask : 0}</p>
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
                                                                {data?.endAt}
                                                            </p>
                                                        </div>
                                                        <div className="col">
                                                            <button
                                                                to="/add-job"
                                                                className="btn btn-sm rounded badge-muted-primary"
                                                            >
                                                                <i className="fa-solid fa-edit text-primary"></i>
                                                            </button>
                                                            <button onClick={() => deleteproject(data?._id)} className="btn btn-sm rounded badge-muted-danger mx-2">
                                                                <i className="fa-solid fa-trash text-danger"></i>
                                                            </button>
                                                        </div>
                                                    </Link>
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

export default Projects;
