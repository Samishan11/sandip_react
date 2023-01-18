import React, { useState, useContext } from "react";
import SideNavHR from "../components/SideNavHR";
import { enGB, id } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";

const Addleave = () => {
  const [user, setUser] = useContext(UserContext);
  const data = useLocation()?.state?.data;
  const [formdata, setFormdata] = useState({
    leaveType: data?.leaveType ? data?.leaveType : "",
    leaveDuration: data?.leaveDuration ? data?.leaveDuration : "",
    leaveReason: data?.leaveReason ? data?.leaveReason : "",
    user: data?.user ? data?.user : "",
  });
  const [date, setDate] = useState(
    data?.dueDate ? new Date(data?.dueDate) : null
  );
  const onInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const postLeave = async (e) => {
    e.preventDefault();
    try {
      if (data === undefined) {
        var res = await axios.post("/api/post-leave", {
          leaveType: formdata.leaveType,
          user: user?._id,
          leaveDuration: formdata.leaveDuration,
          leaveReason: formdata.leaveReason,
          leaveDate: new Date(date).toDateString(),
        });
        toast.success("Vacancy Posted");
        // console.log(res);
      } else {
        var res = await axios.put("/api/update-project/" + data?._id, {
          projectTitle: formdata.projectTitle,
          endAt: date.toDateString(),
        });
        console.log(res);
        toast.success("update");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="d-flex">
        <SideNavHR tab={"leaves"} />
        <div className="bg-light w-100">
          <div className="mb-4 bg-primary z-n1 px-4 py-5">
            <h4 className="text-light">
              {!data ? "Request For Leave" : "Update Projects"}
            </h4>
          </div>
          <div className="bg-light container-fluid">
            <div className="col-8 py-4">
              <h6>
                {!data
                  ? "Add position for your new job"
                  : " Update position for your new job"}
              </h6>
              <div className="row">
                <div className=" col-md-6">
                  <small>Leve Type</small>
                  <select
                    name="leaveType"
                    onChange={(e) => onInputChange(e)}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="normal">Normal</option>
                  </select>
                </div>
                <div className=" col-md-6">
                  <small>Duration</small>
                  <input
                    name="leaveDuration"
                    onChange={(e) => onInputChange(e)}
                    value={formdata?.leaveDuration}
                    className="form-control rounded text-sm text-secondary"
                    type="number"
                    disabled={formdata?.leaveDuration < 5 ? false : true}
                  />
                </div>
              </div>
              <div className="my-3 col-md-12">
                <small>Leave Date</small>
                <div className="pb-4">
                  <DatePicker date={date} onDateChange={setDate} locale={enGB}>
                    {({ inputProps, focused }) => (
                      <input
                        className={
                          "form-control rounded text-sm text-secondary" +
                          (focused ? " -focused" : "")
                        }
                        {...inputProps}
                        placeholder="Job Expiry date"
                      />
                    )}
                  </DatePicker>
                </div>
              </div>
              <div className=" col-md-12">
                <small>Reason</small>
                <textarea
                  name="leaveReason"
                  onChange={(e) => onInputChange(e)}
                  value={formdata?.leaveReason}
                  className="form-control rounded text-sm text-secondary"
                  type="text"
                />
              </div>
              <div className="mt-3">
                <button
                  onClick={postLeave}
                  className="btn btn-primary rounded d-block ms-auto"
                  type="button"
                >
                  {!data ? "+ Create" : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addleave;
