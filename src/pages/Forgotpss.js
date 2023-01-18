import axios from 'axios';
import { Link } from 'feather-icons-react/build/IconComponents';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import img from "../images/hr.jpg"

const Forgotpss = () => {
    const [email, setEmail] = useState('');
    const forgotpassword = async (e) => {
        e.preventDefault();
        try {
            var res = await axios.post('http://localhost:5000/api/forgot-password', {
                email
            }).then(d => {
                toast.success(d.data.message)
                // setmsg(d.data)
                console.log(d);
            }).catch(e => {
                toast.error(e.data.message)
                console.log(e);
            })
        } catch (error) {
            console.log(error);
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
                                                <label className="small mb-1" htmlFor="inputEmailAddress">Enter Email</label>
                                                <input onChange={(e) => setEmail(e.target.value)} className="form-control" id="inputEmailAddress" type="email" placeholder="Enter email address" />
                                            </div>
                                            {/* <!-- Form Group (login box)--> */}
                                            <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <button className="btn btn-primary" onClick={forgotpassword} type="button">Login</button>
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

export default Forgotpss