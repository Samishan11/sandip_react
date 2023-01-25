import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import img from "../images/hr.jpg"
const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async () => {
        const res = await axios.post("/api/login", { email, password })
        console.log(res.data)
        if (res.data.success) {
            if (res.data.isVerify) {
                if (res.data.isHr) {
                    localStorage.setItem("token", res.data.token)
                    window.location = "/"
                } else if (res.data.isManager) {
                    localStorage.setItem("token", res.data.token)
                    window.location = "/manager"
                } else if (res.data.isEmployee) {
                    localStorage.setItem("token", res.data.token)
                    window.location = "/employee"
                }
            } else {
                toast.error('User not verify!!')
            }
        }
        else {
            toast.error(res.data.message)
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
                                    <div className="card-header justify-content-center"><h3 className="font-weight-light my-4">Login</h3></div>
                                    <div className="card-body">
                                        {/* <!-- Login form--> */}
                                        <form>
                                            {/* <!-- Form Group (email address)--> */}
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                                                <input onChange={(e) => setEmail(e.target.value)} className="form-control" id="inputEmailAddress" type="email" placeholder="Enter email address" />
                                            </div>
                                            {/* <!-- Form Group (password)--> */}
                                            <div className="form-group " style={{ position: 'relative' }}>
                                                <label className="small mb-1" htmlFor="inputPassword">Password</label>
                                                <input style={{ position: 'relative' }} onChange={(e) => setPassword(e.target.value)} className="form-control" id="inputPassword" type={showPass ? "text" : "password"} placeholder="Enter password" />
                                                {
                                                     !showPass ?
                                                    <i style={{ position: 'absolute', top: '60%', right: "10px" }} onClick={() => {
                                                        showPass ?
                                                            setShowPass(false) :
                                                            setShowPass(true)
                                                    }} class="fa-solid fa-eye"></i> :
                                                    <i style={{ position: 'absolute', top: '60%', right: "10px" }} onClick={() => {
                                                        showPass ?
                                                            setShowPass(false) :
                                                            setShowPass(true)
                                                    }} class="fa-solid fa-eye-slash"></i>
                                                }
                                            </div>
                                            {/* <!-- Form Group (remember password checkbox)--> */}
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox">
                                                    <input className="custom-control-input" id="rememberPasswordCheck" type="checkbox" />
                                                    <label className="custom-control-label" htmlFor="rememberPasswordCheck">Remember password</label>
                                                </div>
                                            </div>
                                            {/* <!-- Form Group (login box)--> */}
                                            <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <Link className="small" to="/forgotpassword">Forgot Password?</Link>
                                                <button className="btn btn-primary" onClick={handleSubmit} type="button">Login</button>
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
    )
}

export default Login