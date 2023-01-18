import axios from 'axios';
import React, { useState, useEffect } from 'react'
import SideNavHR from '../SideNavHR'
import { useRef } from 'react';
import { toast } from 'react-toastify';

const Tasks = () => {
    const [tasks, getTasks] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        axios.get('/api/get-task').then(data => {
            getTasks(data.data.data)
        });

    }, [load])

    // 
    const ref = useRef(null);
    const [isComplet, setComplete] = useState(false)
    const handleCheck = () => {
        if (ref.current.checked) {
            console.log('check')
        } else {
            console.log('uncheck')
        }
        setComplete(current => !current)
    };
    const completeTask = async (data) => {
        try {
            var res = await axios.put('/api/update-task/' + data._id, {
                isComplet: isComplet,
                project: data.project
            });
            if (!load) {
                setLoad(true)
            } else {
                setLoad(false)
            }
            toast.success("Task Completed")
        } catch (error) {
            toast.warn(error.message)
        }
    }
    const deleteTask = async (id) => {
        try {
            var res = await axios.delete('/api/delete-task/' + id);
            if (!load) {
                setLoad(true)
            } else {
                setLoad(false)
            }
            toast.success("Task Deleted")
        } catch (error) {
            toast.warn(error.message)
        }
    }

    return (
        <div>
            <div className='d-flex'>
                <SideNavHR tab="tasks" />
                <div className='w-100 bg-light p-5'>
                    <div>
                        <h5>Your Tasks</h5>
                        <hr />
                    </div>
                    {
                        tasks.length > 0 ?
                            tasks?.map((data, ind) => {
                                return (
                                    <div
                                        className="border rounded shadow-sm row align-items-center my-2 mx-0 py-2 job-row"
                                    >
                                        <div className="col-3 d-flex align-items-center">
                                            <div className="no-img-avatar-sm">
                                                {
                                                    data?.taskTitle?.slice(0, 1)
                                                }
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
                                                    {data?.assignedTo?.firstName?.slice(0, 1) + data?.assignedTo?.lastName?.slice(0, 1)}
                                                </div>
                                                <div className='mx-2'>
                                                    <p className='m-0 text-sm'>{data?.assignedTo?.firstName + data?.assignedTo?.lastName}</p>
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
                                            {
                                                data?.isComplet ? <><i class="fa-solid text-success px-3 d-block fa-check"></i></> :
                                                    <input ref={ref} onChange={handleCheck} value={data?.isComplet} className='d-block' type="checkbox" />
                                            }
                                        </div>
                                        <div className='col'>
                                            {
                                                !data?.isComplet && <button onClick={() => completeTask(data)} className='btn btn-sm rounded badge-muted-success'><i class="fa-solid fa-check"></i></button>
                                            }
                                            <button onClick={() => deleteTask(data._id)} className="btn btn-sm rounded badge-muted-danger mx-2"><i className="fa-solid fa-trash text-danger"></i></button>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <>loading...</>
                    }
                </div>
            </div>
        </div>
    )
}

export default Tasks