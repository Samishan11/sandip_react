import React, { useEffect, useState } from 'react'
import { DatePicker } from 'react-nice-dates'
import SideNavHR from '../components/SideNavHR'
import { enGB, id } from "date-fns/locale";
import { useRef } from 'react';
import axios from 'axios';
import { userAuthToken } from '../utils/parseToken';
import { toast } from 'react-toastify';
const Attendance = () => {

    const [date, setDate] = useState(new Date(Date.now()))

    useEffect(() => {
    }, [date])

    const [getAttandance, setgetAttandance] = useState([]);
    const [getuserAttandance, setgetuserAttandance] = useState();

    const [load, setLoad] = useState(false)
    useEffect(() => {
        axios.get('/api/get-attandance').then(data => {
            setgetuserAttandance(data.data.data)
            console.log(data.data.data)
            setgetAttandance(data.data.data)
        });
    }, [load])


    const ref = useRef(null);
    const [isPresent, setPresent] = useState(false)
    const handleClick = () => {
        if (ref.current.checked) {
        } else {
        }
        setPresent(current => !current)
    };

    const AttandancePost = async (e) => {
        e.preventDefault();
        try {
            var res = await axios.post('/api/post-attandance', {
                isPresent: isPresent,
                attandance: 1,
                user: userAuthToken?.userId
            });
            toast.success(res.data.message)
            if (!load) {
                setLoad(true)
            } else {
                setLoad(false)
            }

        } catch (error) {

        }
    };

    return (
        <>
            <div>
                <div className='d-flex'>
                    <SideNavHR tab="attendance" />
                    <div className="content w-100">
                        <div className="">
                            <div className="my-4 px-4">
                                <h4 className="text-light">Employee Attendance</h4>
                                <small className="text-sm text-light">
                                    Keep track of the employee presence in the workplace.
                                </small>
                            </div>
                            <div className="container-fluid">
                                <div
                                    className="container mx-auto row border rounded position-relative bg-light shadow-sm py-4"
                                    style={{ zIndex: "1" }}
                                >
                                    <div className="col-md-2">
                                        <label htmlFor="">Select Date</label>
                                        <DatePicker
                                            date={date}
                                            onDateChange={setDate}
                                            locale={enGB}
                                        >
                                            {({ inputProps, focused }) => (
                                                <input
                                                    className={
                                                        "form-control text-sm text-secondary" +
                                                        (focused ? " -focused" : "")
                                                    }
                                                    {...inputProps}
                                                    placeholder="Select Date"
                                                />
                                            )}
                                        </DatePicker>
                                    </div>
                                </div>
                            </div>
                            <div className='container-fluid middle-section'>

                                <div className='container px-0 mx-auto middle-content pb-5'>
                                    <div className='d-flex justify-content-end'>
                                        <button type="button" className="btn btn-primary btn-sm my-2 rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            + New Attandance
                                        </button>

                                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h6 className="modal-title" id="exampleModalLabel">New Attandance</h6>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form action="">
                                                            <div class="form-check">
                                                                <input onChange={handleClick} ref={ref} className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                                                <label class="form-check-label" for="flexCheckChecked">
                                                                    Present
                                                                </label>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button onClick={AttandancePost} type="button" className="btn btn-sm btn-primary">Presence</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <h6 className='my-2'>EMPLOYEE ATTENDACE | {date?.toDateString()}</h6>

                                    {
                                        getAttandance?.map((data, ind) => {
                                            return (
                                                <table className='table'>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">{ind+1}</th>
                                                            <th scope="col">Username</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Present</th>
                                                        </tr>
                                                    </thead>
                                                    {data.attandance.map(data1 => {
                                                        return (
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row">1</th>
                                                                    <td>{data?.user?.username}</td>
                                                                    <td>{data1.date}</td>
                                                                    <td>         <input className='d-block' disabled checked={data1?.isPresent ? true : false} type="checkbox" />  {/* disabled because only manager handles the attendance */}</td>
                                                                </tr>
                                                            </tbody>
                                                        )
                                                    })}
                                                    <p>Total Attandance: {data.totalAttandance}</p>
                                                </table>
                                                // <div
                                                //     className="border rounded shadow-sm row align-items-center my-2 mx-0 py-2 job-row"
                                                // >
                                                //     <div className="col-10 d-flex align-items-center">
                                                //         <div className="no-img-avatar-sm bg-info text-light">
                                                //             {data?.user?.firstName?.slice(0, 1) + data?.user?.lastName.slice(0, 1)}
                                                //         </div>
                                                //         <div className="mx-2">
                                                //             <p className="m-0 text-s">{data?.user?.firstName + data?.user?.lastName}</p>
                                                //         </div>
                                                //         <table className='mx-4'>
                                                //             <tr>Date</tr>
                                                //             {
                                                //                 data.attandance.map(data1 => {
                                                //                     return (
                                                //                         <tr>{data1.date}</tr>
                                                //                     )
                                                //                 })
                                                //             }
                                                //         </table>
                                                //     </div>
                                                //     <div className='col'>
                                                //         <p className='text-s fw-bold m-0'>Presence</p>
                                                //         <input className='d-block' disabled checked={data?.isPresent ? true : false} type="checkbox" />  {/* disabled because only manager handles the attendance */}
                                                //     </div>
                                                // </div>
                                            )
                                        })

                                    }

                                    <button className='fa-solid fa-print text-lg text-primary mt-4 d-block ml-auto' onClick={() => window.print()}></button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Attendance