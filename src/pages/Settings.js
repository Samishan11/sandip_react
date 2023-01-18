import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import SideNavHR from '../components/SideNavHR'
import { UserContext } from '../context/userContext'

const Settings = () => {

    const [user, setUser] = useContext(UserContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        user ? setLoading(false) : setLoading(true)
    }, [user])


    const [formData, setFormData] = useState({
        username: user?.username ? user?.username : '',
        firstName: user?.firstName ? user?.firstName : '',
        lastName: user?.lastName ? user?.lastName : '',
        email: user?.email ? user?.email : '',
        contact: user?.contact ? user?.contact : '',
        address: user?.address ? user?.address : '',
        gender: user?.gender ? user?.gender : '',
        password: '',
        confirmpassword: '',
        oldpass: '',
    })

    const updateUser = async () => {
        try {
            await axios.put(`/api/update-user/` + user?._id, formData)
            toast.success("Profile Updated")
        } catch (error) {
            toast.error(error.message)
        }
    }

    const [img, setImg] = useState('');
    const changePP = async (img) => {
        setImg(img)
        const fd = new FormData();
        fd.append('profile_pic', img)
        try {
            await axios.put(`/api/update-user/` + user?._id, fd)
            toast.success("Profile Updated")
        } catch (error) {
            toast.error(error.message)
        }
    }
    const changePassword = async () => {
        try {
            if (formData.password !== formData.confirmpassword) {
                return toast.warn("Password not match")
            }
            var res = await axios.put(`/api/change-password/` + user?._id, {
                password: formData.password,
                oldpass: formData.oldpass
            })
            if (res.data.success) {
                return toast.success(res.data.message)
            }
            return toast.warn(res.data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const onInputChange = (e) => {
        console.log(formData)
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='d-flex'>
            <SideNavHR tab="settings" />
            <div className='content w-100'>
                {
                    loading ?
                        <>Loading...</>
                        :
                        <div className=''>
                            <div className='my-4 px-4'>
                                <h4 className="text-light">Settings</h4>
                                <small className='text-sm text-light'>Your account personalizations</small>
                            </div>

                            <div className='container-fluid bg-light'>
                                <div className='py-5 px-3'>
                                    <div className='row'>
                                        <div className='col-md-4'>
                                            <div className='rounded border py-4 px-4'>
                                                <div className='d-flex'>
                                                    <div className='profile-pic-edit'>
                                                        {
                                                            img ? <img className='avatar-sm' src={URL.createObjectURL(img)} alst="" /> :
                                                                user.profile_pic ?
                                                                    <img className='avatar-sm' src={user?.profile_pic} alst="" />
                                                                    :
                                                                    <div className='no-img-avatar bg-muted rounded-circle'>
                                                                        <span className='text-secondary'>MB</span>
                                                                    </div>
                                                        }
                                                        <span onClick={() => document.querySelector('#file-field').click()} className='profile-edit-btn'><i className='fa-solid fa-camera'></i></span>
                                                        <input onChange={(e) => {
                                                            changePP(e.target.files[0])
                                                        }} id="file-field" type="file" accept='image/*' hidden />
                                                    </div>
                                                    <div className='mx-2'>
                                                        <h5 className='m-0 text-secondary'>{user.firstName} {user.lastName}</h5>
                                                        <p>{user.isHR ? "Human Resource" : user.isManager ? "Manager" : user.isEmployee && "Employee"}</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div>
                                                        <small className='text-s fw-lighter'>Position</small>
                                                        <p>Manager</p>
                                                        <hr />
                                                    </div>
                                                    <div>
                                                        <small className='text-s fw-lighter'>Email</small>
                                                        <p>{user.email}</p>
                                                        <hr />
                                                    </div>
                                                    <div>
                                                        <small className='fw-lighter'>Username</small>
                                                        <p>{user.username}</p>
                                                        <hr />
                                                    </div>
                                                    <div>
                                                        <small className='fw-lighter'>Contact</small>
                                                        <p>{user.contact ? user.contact : "##"}</p>
                                                        <hr />
                                                    </div>
                                                    <div>
                                                        <small className='fw-lighter'>Address</small>
                                                        <p>{user.address ? user.address : "##"}</p>
                                                        <hr />
                                                    </div>
                                                    <div>
                                                        <small className='fw-lighter'>Joined Date</small>
                                                        <p>8 Jan, 2023</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='col-md-8'>
                                            <div className='rounded border p-4'>
                                                <h5 className='text-secondary'>General Settings</h5>
                                                <div className='my-3'>
                                                    <div className='row my-3'>
                                                        <div className='col'>
                                                            <label className='text-s' htmlFor="">First Name</label>
                                                            <input name='firstName' value={formData.firstName} onChange={e => onInputChange(e)} className='form-control rounded text-secondary' type="text" placeholder='Enter first name' />
                                                        </div>
                                                        <div className='col'>
                                                            <label className='text-s' htmlFor="">Last Name</label>
                                                            <input onChange={e => onInputChange(e)} value={formData.lastName} name='lastName' className='form-control rounded text-secondary' type="text" placeholder='Enter last name' />
                                                        </div>
                                                    </div>
                                                    <div className='row my-3'>
                                                        <div className='col'>
                                                            <label className='text-s' htmlFor="">Email</label>
                                                            <input onChange={e => onInputChange(e)} value={formData.email} name='email' className='form-control rounded text-secondary' type="text" placeholder='Enter your email' />
                                                        </div>
                                                        <div className='col'>
                                                            <label className='text-s' htmlFor="">Username</label>
                                                            <input onChange={e => onInputChange(e)} value={formData.username} name='username' className='form-control rounded text-secondary' type="text" placeholder='Enter your phone number' />
                                                        </div>
                                                    </div>
                                                    <div className='row my-3'>
                                                        <div className='col'>
                                                            <div className='col'>
                                                                <label className='text-s' htmlFor="">Phone</label>
                                                                <input onChange={e => onInputChange(e)} value={formData.contact} name='contact' className='form-control rounded text-secondary' type="text" placeholder='Enter your phone number' />
                                                            </div>
                                                        </div>
                                                        <div className='col'>
                                                            <label className='text-s' htmlFor="">Address</label>
                                                            <input onChange={e => onInputChange(e)} value={formData.address} name='address' className='form-control rounded text-secondary' type="text" placeholder='Enter your address' />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => updateUser()} className='btn btn-primary btn-sm rounded py-2 px-3'>Update</button>
                                                        <button className='btn btn-sm border-secondary rounded py-2 px-3 mx-3 text-secondary'>Cancel</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='my-3 rounded border p-4'>
                                                <h5 className='text-secondary'>Account Data</h5>
                                                <div className='row'>
                                                    <div className='col-6'>
                                                        <label className='text-s' htmlFor="">Username</label>
                                                        <input onChange={e => onInputChange(e)} name='username' className='form-control rounded text-secondary' disabled type="text" defaultValue={user.username} placeholder='Enter your address' />
                                                    </div>

                                                </div>
                                                <hr />
                                                <div>
                                                    <h6>Change Password</h6>
                                                    <div>
                                                        <input onChange={e => onInputChange(e)} name='oldpass' className='my-3 form-control rounded text-secondary' type="text" placeholder='Current Password' />
                                                        <input onChange={e => onInputChange(e)} name='password' className='my-3 form-control rounded text-secondary' type="text" placeholder='New Password' />
                                                        <input onChange={e => onInputChange(e)} name='confirmpassword' className='my-3 form-control rounded text-secondary' type="text" placeholder='Confirm New Password' />
                                                    </div>
                                                    <div>
                                                        <button onClick={() => changePassword()} className='btn btn-primary btn-sm rounded py-2 px-3'>Update</button>
                                                        <button className='btn btn-sm border-secondary rounded py-2 px-3 mx-3 text-secondary'>Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default Settings