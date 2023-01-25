import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { userAuthToken } from '../utils/parseToken'
const SideNavHR = (props) => {

    const [user, setUser] = useContext(UserContext)

    useEffect(() => {
        document.querySelector(".tab-btn")?.classList?.remove('active')
        document.querySelector(`#${props.tab}`)?.classList?.add('active')
    }, [props.tab]);

    const [navChange, setNavChange] = useState(true);
    const onNavResposive = () => {
        if (!navChange) {
            setNavChange(true);
        } else {
            setNavChange(false);
        }
        if (navChange) {
            document.querySelector("#sideNav").style.width = "100px";
        } else {
            document.querySelector("#sideNav").style.width = "30ch";
        }
    };
    return (
        <div id='sideNav' className='side-nav bg-light shadow'>
            <div className='px-3 py-3 d-flex justify-content-between'>
                <h5 id='title'> <i className='fa-solid fa-pie-chart'></i> Epic {user?.isHR ? 'HR' : user?.isEmployee ? 'Employee' : 'Manager'}</h5>
                <i onClick={() => onNavResposive()} id='bars' className='fa-solid fa-chart-simple fs-5 me-1'></i>
            </div>
            <div>
                <div className='nav nav-tabs' id='nav-tab' role="tablist" style={{ border: "none" }}>
                    {user?.isHR ?
                        <>
                            <Link id="dashboard" to="/" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                                <div className='px-3 py-3 text-secondary'>
                                    <span className=''><i className='fa-solid fa-chart-simple fs-5 me-1'></i> <span className='text-s'>Dashboard</span></span>
                                </div>
                            </Link>
                            <Link id="jobs" to="/jobs" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                                <div className='px-3 py-3 text-secondary'>
                                    <span className=''><i className='fa-solid fa-briefcase fs-5 me-1'></i> <span className='text-s'>Jobs</span></span>
                                </div>
                            </Link>
                            <Link id="applicant" to="/applicant" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                                <div className='px-3 py-3 text-secondary'>
                                    <span className=''><i className='fa-solid fa-user-group fs-5 me-1'></i> <span className='text-s'>Applicants</span></span>
                                </div>
                            </Link>
                            <Link id="leaves" to="/leave" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                                <div className='px-3 py-3 text-secondary'>
                                    <span className=''><i className='fa-solid fa-briefcase fs-5 me-1'></i> <span className='text-s'>Leave</span></span>
                                </div>
                            </Link>
                            <Link id="payroll" to="/payroll" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                                <div className='px-3 py-3 text-secondary'>
                                    <span className=''> <i class="fa-solid fa-dollar-sign fs-5 me-1"></i><span className='text-s'>Pay Roll</span></span>
                                </div>
                            </Link>
                            <Link id="manage-user" to="/manage-user" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                                <div className='px-3 py-3 text-secondary'>
                                    <span className=''><i className='fa-sharp fa-solid fa-user fs-5 me-1'></i> <span className='text-s'>Manage User</span></span>
                                </div>
                            </Link>
                        </>
                        :
                        user?.isManager ?
                            <>
                                <Link id="dashboard" to="/manager" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                                    <div className='px-3 py-3 text-secondary'>
                                        <span className=''><i className='fa-solid fa-chart-simple fs-5 me-1'></i> <span className='text-s'>Dashboard</span></span>
                                    </div>
                                </Link>
                                <Link id="projects" to="/manager/projects" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                                    <div className='px-3 py-3 text-secondary'>
                                        <span className=''><i className='fa-solid fa-cube fs-5 me-1'></i> <span className='text-s'>Projects</span></span>
                                    </div>
                                </Link>
                                <Link id="tasks" to="/manager/tasks" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                                    <div className='px-3 py-3 text-secondary'>
                                        <span className=''><i className='fa-solid fa-clipboard-list fs-5 me-1'></i> <span className='text-s'>Tasks</span></span>
                                    </div>
                                </Link>
                                <Link id="leaves" to="/leave" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                                    <div className='px-3 py-3 text-secondary'>
                                        <span className=''><i className='fa-solid fa-briefcase fs-5 me-1'></i> <span className='text-s'>Leave</span></span>
                                    </div>
                                </Link>
                                <Link id="attendance" to="/manager/attendance" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                                    <div className='px-3 py-3 text-secondary'>
                                        <span className=''><i className='fa-solid fa-check-to-slot fs-5 me-1'></i> <span className='text-s'>Attendance</span></span>
                                    </div>
                                </Link>

                            </> :
                            user?.isEmployee ?
                                <>
                                    <Link id="dashboard" to="/employee" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                                        <div className='px-3 py-3 text-secondary'>
                                            <span className=''><i className='fa-solid fa-chart-simple fs-5 me-1'></i> <span className='text-s'>Dashboard</span></span>
                                        </div>
                                    </Link>
                                    <Link id="jobs" to="/employee/jobs" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                                        <div className='px-3 py-3 text-secondary'>
                                            <span className=''><i className='fa-solid fa-briefcase fs-5 me-1'></i> <span className='text-s'>Jobs</span></span>
                                        </div>
                                    </Link>
                                    <Link id="tasks" to="/employee/tasks" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                                        <div className='px-3 py-3 text-secondary'>
                                            <span className=''><i className='fa-solid fa-briefcase fs-5 me-1'></i> <span className='text-s'>My Task</span></span>
                                        </div>
                                    </Link>
                                    <Link id="applicant" to="/employee/applicants" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                                        <div className='px-3 py-3 text-secondary'>
                                            <span className=''><i className='fa-solid fa-briefcase fs-5 me-1'></i> <span className='text-s'>My Applied Job</span></span>
                                        </div>
                                    </Link>
                                    {/* <Link id="projects" to="/employee/projects" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                                        <div className='px-3 py-3 text-secondary'>
                                            <span className=''><i className='fa-solid fa-cube fs-5 me-1'></i> <span className='text-s'>Projects</span></span>
                                        </div>
                                    </Link>
                                    <Link id="tasks" to="/employee/tasks" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                                        <div className='px-3 py-3 text-secondary'>
                                            <span className=''><i className='fa-solid fa-clipboard-list fs-5 me-1'></i> <span className='text-s'>Tasks</span></span>
                                        </div>
                                    </Link> */}
                                    <Link id="leave" to="/employee/leave" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                                        <div className='px-3 py-3 text-secondary'>
                                            <span className=''><i className='fa-solid fa-note-sticky fs-5 me-1'></i> <span className='text-s'>Leave</span></span>
                                        </div>
                                    </Link>
                                    <Link id="attendance" to="/employee/attendance" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                                        <div className='px-3 py-3 text-secondary'>
                                            <span className=''><i className='fa-solid fa-check-to-slot fs-5 me-1'></i> <span className='text-s'>Attendance</span></span>
                                        </div>
                                    </Link>
                                </> :
                                <></>
                    }
                    <Link id="settings" to="/settings" className='tab-btn px-0 mx-2 my-1 rounded' type='button'>
                        <div className='px-3 py-3 text-secondary'>
                            <span className=''><i className='fa-solid fa-cog fs-5 me-1'></i> <span className='text-s'>Settings</span></span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='nav-footer d-flex align-items-center w-100 pb-4 pt-2'>
                <div className='mx-3 w-100 mt-2'>
                    <div className="dropdown w-100">
                        <div className="d-flex w-100" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                            <div className='no-img-avatar-sm rounded-circle d-flex align-items-center justify-content-center'>
                                <span className='text-light'>{userAuthToken?.username?.slice(0, 1)}</span>
                            </div>
                            <div className='my-auto mx-2 text-sm'>
                                <span>{userAuthToken?.username}</span>
                                <span className='text-secondary d-block text-xs'>{userAuthToken?.user?.isHR ? 'HR Manager' : userAuthToken?.user?.isEmployee ? 'Employee' : userAuthToken?.user?.isManager ? 'Manager' : "Unauthorized User"}</span>
                            </div>
                            <div className='ms-auto'>
                                <span><i className='fa-solid fa-chevron-right text-xs text-secondary'></i></span>
                            </div>
                        </div>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button className="dropdown-item" onClick={() => {
                                localStorage.removeItem("token")
                                window.location = '/login'
                            }}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideNavHR;