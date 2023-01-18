import React from 'react'
import Applicant from '../components/HR/Applicant'
import Dashboard from '../components/HR/Dashboard'
import Leave from '../components/HR/Leave'
import Manageuser from '../components/HR/Manageuser'
import Vacancy from '../components/HR/Vacancy'
import SideNavHR from '../components/SideNavHR'
const Layout = () => {
  return (
    <div className="d-flex">
      <SideNavHR />
      <div className='content w-100'>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <Dashboard />
          </div>
          <div class="tab-pane fade" id="nav-vacancy" role="tabpanel" aria-labelledby="nav-profile-tab">
            <Vacancy />
          </div>
          <div class="tab-pane fade" id="nav-applicant" role="tabpanel" aria-labelledby="nav-contact-tab">
            <Applicant />
          </div>
          <div class="tab-pane fade" id="nav-leave" role="tabpanel" aria-labelledby="nav-contact-tab">
            <Leave />
          </div>
          <div class="tab-pane fade" id="nav-manage-user" role="tabpanel" aria-labelledby="nav-contact-tab">
            <Manageuser />
          </div>
        </div>
      </div>
    </div>

  )
}

export default Layout