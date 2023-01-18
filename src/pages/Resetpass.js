import axios from 'axios';
import { Link } from 'feather-icons-react/build/IconComponents';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import img from "../images/hr.jpg"
import { useParams , useNavigate } from 'react-router-dom';

const Resetpass = () => {
    const tokenn = useParams().token
    const navigate = useNavigate()
    const [newpassword, setPassowrd] = useState('');
    const [confirmpassword, setCpassowrd] = useState('');
    const resetpassword = async (e) => {
        e.preventDefault();
        try {
            if (newpassword !== confirmpassword) {
                return toast.warn("Password not match")
            } else if (newpassword.length < 6) {
                return toast.warn("Password must be more than 6 character")
            }
            else {
                return await axios.put(`http://localhost:5000/api/reset-password/${tokenn}`, {
                    newpassword,
                    confirmpassword
                }).then(d => {
                    toast.success(d.data.data)
                    navigate('/login')
                }).catch(e => {
                    toast.error(e.message)
                })

            }
        } catch (error) {
            return toast.error(error.message)
        }
    }

    return (
        <div id="layoutAuthentication" style={{ backgroundImage: `url(${img})`, opacity: '.95', backgroundPosition: "center", backgroundRepeat: 'no-repeat' }}>
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                {/* <!-- Basic login form--> */}
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header justify-content-center"><h3 className="font-weight-light my-4">Forgot Your Password?</h3></div>
                                    <div className="card-body">
                                        {/* <!-- Login form--> */}
                                        <form>
                                            {/* <!-- Form Group (email address)--> */}
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputEmailAddress">Enter Password</label>
                                                <input onChange={(e) => setPassowrd(e.target.value)} className="form-control" id="inputEmailAddress" type="email" placeholder="Enter password" />
                                            </div>
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputEmailAddress">Enter Confirm Password</label>
                                                <input onChange={(e) => setCpassowrd(e.target.value)} className="form-control" id="inputEmailAddress" type="email" placeholder="Enter confirm password" />
                                            </div>
                                            {/* <!-- Form Group (login box)--> */}
                                            <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <button className="btn btn-primary" onClick={resetpassword} type="button">Reset Password</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center">
                                        <div className="small"><Link to="/register">Need an account? Sign up!</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Resetpass