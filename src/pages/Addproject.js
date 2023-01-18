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

const AddProject = () => {
  const [user, setUser] = useContext(UserContext);

  const data = useLocation()?.state?.data;
  const [formdata, setFormdata] = useState({
    projectTitle: data?.projectTitle ? data?.projectTitle : "",
    endAt: data?.endAt ? data?.endAt : "",
  });
  const [date, setDate] = useState(
    data?.dueDate ? new Date(data?.dueDate) : null
  );
  const onInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const postVacancy = async (e) => {
    e.preventDefault();
    try {
      if (data === undefined) {
        var res = await axios.post("/api/post-project", {
          projectTitle: formdata.projectTitle,
          endAt: date.toDateString(),
          postBy: user?._id,
          taskComplete: 0,
          totalTask: 0,
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
        <SideNavHR tab={"jobs"} />
        <div className="bg-light w-100">
          <div className="mb-4 bg-primary z-n1 px-4 py-5">
            <h4 className="text-light">
              {!data ? "Add Projects" : "Update Projects"}
            </h4>
            <small className="text-sm text-light">
              {!data
                ? " Add position for your new jobProvide information decent information about your job to attract best candidates."
                : " Update position for jobProvide information decent information about your job to attract best candidates."}
            </small>
          </div>
          <div className="bg-light container-fluid px-5">
            <div className="col-8 py-4">
              <h6>
                {!data
                  ? "Add position for your new job"
                  : " Update position for your new job"}
              </h6>
              <div className="my-3 col-md-12">
                <small>Title</small>
                <input
                  name="projectTitle"
                  onChange={(e) => onInputChange(e)}
                  value={formdata?.projectTitle}
                  className="form-control rounded text-sm text-secondary"
                  type="text"
                />
              </div>
              <div className="my-3 col-md-12">
                <small>Expires in</small>
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

              <div className="">
                <button
                  onClick={postVacancy}
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

export default AddProject;
