import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link } from 'react-router-dom'
import img from "../images/ht1.jpg"
const Register = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        console.log(password.length)
        if (firstName === "" || lastName === "" || email === "" || username === "" || password === "" || confirmPassword === "") {
            toast.error("Please enter required fields!")
        }
        else if (password.length < 6) {
            toast.error("Password must be more than 6 character")
        }
        else if (password !== confirmPassword) {
            toast.error("Password does not match!")
        }
        else {
            const res = await axios.post('/api/register', { firstName, lastName, address, contact, email, username, password })
            if (res.data.success) {
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        }
    }

    return (
        <div>
            <div id="layoutAuthentication" style={{ backgroundImage: `url(${img})`, opacity: '.95', backgroundPosition: "center", backgroundRepeat: 'no-repeat' }}>
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-7">
                                    {/* <!-- Basic registration form--> */}
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header justify-content-center"><h3 className="font-weight-light my-4">Create Account</h3></div>
                                        <div className="card-body">
                                            {/* <!-- Registration form--> */}
                                            <form>
                                                {/* <!-- Form Row--> */}
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        {/* <!-- Form Group (first name)--> */}
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputFirstName">First Name</label>
                                                            <input onChange={(e) => setFirstName(e.target.value)} className="form-control" id="inputFirstName" type="text" placeholder="Enter first name" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        {/* <!-- Form Group (last name)--> */}
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputLastName">Last Name</label>
                                                            <input onChange={(e) => setLastName(e.target.value)} className="form-control" id="inputLastName" type="text" placeholder="Enter last name" />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- Form Group (email address)--> */}
                                                <div className="form-group">
                                                    <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                                                    <input onChange={(e) => setEmail(e.target.value)} className="form-control" id="inputEmailAddress" type="email" aria-describedby="emailHelp" placeholder="Enter email address" />
                                                </div>
                                                {/* <!-- Form Group (username)--> */}
                                                <div className="form-group">
                                                    <label className="small mb-1" htmlFor="inputEmailAddress">Username</label>
                                                    <input onChange={(e) => setUsername(e.target.value)} className="form-control" id="inputUsername" type="text" aria-describedby="usernameHelp" placeholder="Enter username" />
                                                </div>
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        {/* <!-- Form Group (first name)--> */}
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputaddress">Address</label>
                                                            <input onChange={(e) => setAddress(e.target.value)} className="form-control" id="inputaddress" type="text" placeholder="Enter address" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        {/* <!-- Form Group (last name)--> */}
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputPhone">Phone</label>
                                                            <input onChange={(e) => setContact(e.target.value)} className="form-control" id="inputPhone" type="text" placeholder="Enter mobile no." />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- Form Row--> */}
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        {/* <!-- Form Group (password)--> */}
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputPassword">Password</label>
                                                            <input onChange={(e) => setPassword(e.target.value)} className="form-control" id="inputPassword" type="password" placeholder="Enter password" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        {/* <!-- Form Group (confirm password)--> */}
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputConfirmPassword">Confirm Password</label>
                                                            <input onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" id="inputConfirmPassword" type="password" placeholder="Confirm password" />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- Form Group (create account submit)--> */}
                                                <div className="form-group mt-4 mb-0"><button onClick={handleSubmit} className="btn btn-primary btn-block" type='button'>Create Account</button></div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center">
                                            <div className="small"><Link to="/login">Have an account? Go to login</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div id="layoutAuthentication_footer">
                    <footer className="footer mt-auto footer-dark">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 small">Copyright &copy; Your Website 2021</div>
                                <div className="col-md-6 text-md-right small">
                                    <a href="#!">Privacy Policy</a>
                                    &middot;
                                    <a href="#!">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}


export default Register