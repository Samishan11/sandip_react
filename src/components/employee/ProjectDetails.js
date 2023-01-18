import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import SideNavHR from '../SideNavHR'
const ProjectDetails = () => {
    const { id } = useParams();
    const [title, setTitle] = useState()
    const [due, setDue] = useState()
    const [assigneeTo, setAssignee] = useState()
    const [condition, setCondition] = useState()
    const [load, setLoad] = useState(false)
    const postTask = async (e) => {
        e.preventDefault();
        try {
            var res = await axios.post("/api/post/task", {
                taskTitle: title,
                endAt: due,
                condition: condition,
                assignedTo: assigneeTo,
                project: id
            });
            if (!load) {
                setLoad(true)
            } else {
                setLoad(false)
            }
            toast.success("Task Posted");
        } catch (error) {
            console.log(error);
        }
    };

    const [users, getUsers] = useState([]);
    const [tasks, getTasks] = useState([]);
    useEffect(() => {
        axios.get('/api/get-user').then(data => {
            getUsers(data.data.data)
        });

        axios.get('/api/get-task/' + id).then(data => {
            getTasks(data.data.data)
        });

    }, [load])

    return (
        <div className='bg-light'>
            <div className='d-flex'>
                <SideNavHR tab="projects" />
                <div className='w-100 p-5'>
                    <h5>Project 1 <span><i className='fa-solid fa-cube'></i></span></h5>
                    <hr />

                    {
                        tasks.length > 0 ?
                            tasks?.map((data, ind) => {
                                return (
                                    <div
                                        className="border rounded shadow-sm row align-items-center my-2 mx-0 py-2 job-row"
                                    >
                                        <div className="col-3 d-flex align-items-center">
                                            <div className="no-img-avatar-sm">
                                                T
                                            </div>
                                            <div className="mx-2">
                                                <p className="m-0 text-s">{data?.taskTitle}</p>
                                                <p className="m-0 text-xs">Project 1</p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <p className={`m-0 badge ${data?.condition === 'critical' ? 'badge-muted-danger' : data?.condition === 'Normal' ? 'badge-muted-primary' : 'badge-muted-success'} fw-light`}>
                                                {data?.condition}
                                            </p>
                                        </div>
                                        <div className="col">
                                            <div className='d-flex align-items-center'>
                                                <div className="no-img-avatar-sm">
                                                    {data?.assignedTo?.firstName.slice(0, 1) + data?.assignedTo?.lastName.slice(0, 1)}
                                                </div>
                                                <div className='mx-2'>
                                                    <p className='m-0 text-sm'>{data?.assignedTo?.firstName +  data?.assignedTo?.lastName}</p>
                                                    {/* <p className='m-0 text-xs'>Frontend Developer</p> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <p className="m-0 badge badge-muted-warning fw-light">
                                                {new Date(data?.endAt)?.toDateString()} To Expire
                                            </p>
                                        </div>
                                        <div className='col'>
                                            <p className='text-xs m-0'>Completed</p>
                                            <input className='d-block' type="checkbox" />
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <>loading...</>
                    }
                    <div>
                        <button type="button" className="btn btn-secondary btn-sm my-2 rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            + Create Task
                        </button>

                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h6 className="modal-title" id="exampleModalLabel">Create Task</h6>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form action="">
                                            <div className='my-2'>
                                                <small>Title</small>
                                                <input onChange={(e) => setTitle(e.target.value)} type="text" className='form-control form-control-sm' placeholder='Enter title' />
                                            </div>
                                            <div className='my-2'>
                                                <small>Condition</small>
                                                <select onChange={e => setCondition(e.target.value)} className="form-select " aria-label="Default select example">
                                                    <option selected>Open this select menu</option>
                                                    <option value="critical">Critical</option>
                                                    <option value="Normal">Noraml</option>
                                                    <option value="Chill">Chill</option>
                                                </select>
                                            </div>
                                            <div className='my-2'>
                                                <small>Deadline</small>
                                                <input onChange={(e) => setDue(e.target.value)} type="date" className='form-control form-control-sm' />
                                            </div>
                                            <div className='my-2'>
                                                <small>Condition</small>
                                                <select onChange={e => setAssignee(e.target.value)} className="form-select " aria-label="Default select example">
                                                    <option selected>Open this select menu</option>
                                                    {
                                                        users?.map((data, ind) => {
                                                            return (
                                                                <option value={data?._id}>{data?.email}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>

                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button onClick={postTask} type="button" className="btn btn-sm btn-primary">Create Task</button>
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

export default ProjectDetails