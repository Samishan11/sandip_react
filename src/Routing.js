import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Applicantemp from './components/employee/Applicantemp'
import DashboardEmp from './components/employee/DashboardEmp'
import Jobemp from './components/employee/Jobemp'
import Leaveemployee from './components/employee/Leaveemployee'
import ProjectDetails from './components/employee/ProjectDetails'
import Projects from './components/employee/Projects'
import Tasks from './components/employee/Tasks'
import Applicant from './components/HR/Applicant'
import Dashboard from './components/HR/Dashboard'
import Leave from './components/HR/Leave'
import Manageuser from './components/HR/Manageuser'
import Vacancy from './components/HR/Vacancy'
import DashboardManager from './components/manager/DashboardMg'
import { UserContext } from './context/userContext'
import AddJob from './pages/AddJob'
import Adduser from './pages/Addjuser'
import Addleave from './pages/Addleave'
import AddProject from './pages/Addproject'
import Attendance from './pages/Attendance'
import Forgotpss from './pages/Forgotpss'
import Login from './pages/Login'
import Register from './pages/Register'
import Resetpass from './pages/Resetpass'
import Settings from './pages/Settings'
import Pagenotfor from './pages/pagenotfound'
import { ProtectedAdmin, ProtectedRoutes } from './pages/Protected.route';
import Cv from './components/Cv';
import Payroll from './pages/Payroll'
import Payrolldetail from './pages/Payrolldetail'
const Routing = () => {
  const [user, setUser] = useContext(UserContext)

  return (
    <Router>
      <Routes>

        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/forgotpassword" element={<Forgotpss />}></Route>
        <Route exact path="/reset-password/:token" element={<Resetpass />}></Route>
        {/* </Route> */}
        <Route path='*' element={<Pagenotfor></Pagenotfor>}></Route>
        {/* HR Routes */}
        <Route element={<ProtectedRoutes />}>
        <Route exact path="/" element={<Dashboard />}></Route>
          <Route exact path="/add-job" element={<AddJob />}></Route>
          <Route exact path="/jobs" element={<Vacancy />}></Route>
          <Route exact path="/leave" element={<Leave />}></Route>
          <Route exact path="/manage-user" element={<Manageuser />}></Route>
          <Route exact path="/add-user" element={<Adduser />}></Route>
          <Route exact path="/applicant" element={<Applicant />}></Route>
          <Route exact path="/cv" element={<Cv />}></Route>
          <Route exact path="/payroll" element={<Payroll />}></Route>
          <Route exact path="/payroll-detail" element={<Payrolldetail />}></Route>
          {/* Employee Routes */}
          <Route exact path='/employee' element={<DashboardEmp />} />
          {/* <Route exact path='/employee/projects' element={<Projects />} />
        <Route exact path='/employee/project/:id' element={<ProjectDetails />} />
        <Route exact path='/employee/tasks' element={<Tasks />} />
        <Route exact path='/employee/add-project' element={<AddProject />} /> */}
          <Route exact path='/employee/jobs' element={<Jobemp />} />
          <Route exact path='/employee/tasks' element={<Tasks />} />
          <Route exact path='/employee/applicants' element={<Applicantemp />} />
          <Route exact path='/employee/add-leave' element={<Addleave />} />
          <Route exact path='/employee/leave' element={<Leaveemployee />} />
          <Route exact path='/employee/attendance' element={<Attendance />} />
          {/* manager routes */}
          <Route exact path='/manager' element={<DashboardManager />} />
          <Route exact path='/manager/add-leave' element={<Addleave />} />
          <Route exact path='/manager/projects' element={<Projects />} />
          <Route exact path='/manager/project/:id' element={<ProjectDetails />} />
          <Route exact path='/manager/tasks' element={<Tasks />} />
          <Route exact path='/manager/add-project' element={<AddProject />} />
          <Route exact path='/manager/attendance' element={<Attendance />} />

          <Route exact path='/settings' element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default Routing