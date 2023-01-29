import React, { useEffect, useState, useContext } from "react";
import SideNavHR from "../components/SideNavHR";
import { useLocation } from "react-router-dom";
import axios from "axios";
const Payrolldetail = () => {
  const [loading, setLoading] = useState(true);
  const data = useLocation()?.state?.data;

  const [user, setUser] = useState();

  useEffect(() => {
    axios.get(`/api/get-user/` + data?._id).then((data) => {
      setUser(data.data.data);
    });
  }, []);

  useEffect(() => {
    user ? setLoading(false) : setLoading(true);
  }, [user]);

  var taxableamount =
    user?.salary <= 5000
      ? (1 / 100) * user?.salary
      : user?.salary > 5000 && user?.salary <= 20000
      ? (10 / 100) * user?.salary
      : user?.salary > 20000 && user?.salary <= 60000
      ? (20 / 100) * user?.salary
      : user?.salary > 60000 && (30 / 100) * user?.salary;
  var pf =
    user?.salary <= 5000
      ? 1 / 100
      : user?.salary > 5000 && user?.salary <= 20000
      ? 5 / 100
      : user?.salary > 20000 && user?.salary <= 60000
      ? 10 / 100
      : user?.salary > 60000 && 15 / 100;

  return (
    <div className="d-flex">
      <SideNavHR tab="payroll" />
      <div className="content w-100">
        <div className="my-4 px-4">
          <h4 className="text-light">Pay Roll Detail</h4>
          <small className="text-sm text-light">
            User pay role information
          </small>
        </div>
        <div className="container py-3 bg-light">
          <div className="row">
            <div className="col-md-10 d-block mx-auto">
              <div className="rounded border py-4 px-4">
                <div className="d-flex">
                  <div className="profile-pic-edit">
                    {user?.profile_pic ? (
                      <img
                        className="avatar-sm"
                        src={user?.profile_pic}
                        alst=""
                      />
                    ) : (
                      <div className="no-img-avatar bg-muted rounded-circle">
                        <span className="text-secondary">MB</span>
                      </div>
                    )}
                  </div>
                  <div className="mx-2">
                    <h5 className="m-0 text-secondary">
                      {user?.firstName} {user?.lastName}
                    </h5>
                    <p>
                      {user?.isHR
                        ? "Human Resource"
                        : user?.isManager
                        ? "Manager"
                        : user?.isEmployee && "Employee"}
                    </p>
                  </div>
                </div>

                <div>
                  <div>
                    <small className="text-s fw-lighter">Position</small>
                    <p className="">
                      {user?.isHR
                        ? "HR"
                        : user?.isManager
                        ? "Manager"
                        : user?.isEmployee && "Employee"}
                    </p>
                    <hr />
                  </div>
                  <div>
                    <small className="text-s fw-lighter">Salary</small>
                    <p className="text-success">
                      {user?.salary ? `Rs.${parseInt(user?.salary)}` : 0}
                    </p>
                    <hr />
                  </div>
                  <div>
                    <small className="text-s fw-lighter">Provident Fund</small>
                    <p className="">{user?.salary ? `${pf * 100}%` : 0}</p>
                    <hr />
                  </div>
                  <div>
                    <small className="text-s fw-lighter">Tax</small>
                    <p>
                      {user?.salary <= 5000
                        ? "1%"
                        : user?.salary > 5000 && user?.salary <= 20000
                        ? "10%"
                        : user?.salary > 20000 && user?.salary <= 60000
                        ? "20%"
                        : user?.salary > 60000
                        ? "30%"
                        : "0"}
                    </p>
                    <hr />
                  </div>
                  <div>
                    <small className="fw-lighter">Final Amount</small>
                    <p>
                      Rs.
                      {parseInt(
                        user?.salary -
                          (
                            taxableamount +
                            user?.salary * pf )
                      )}
                    </p>
                    <hr />
                  </div>
                </div>
                <button className='fa-solid fa-print text-lg text-primary mt-4 d-block ml-auto' onClick={()=>window.print()}></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payrolldetail;
