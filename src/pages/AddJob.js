import React, { useState, useEffect } from "react";
import SideNavHR from "../components/SideNavHR";
import { enGB, id } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'draft-js/dist/Draft.css';
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AddJob = () => {
  const data = useLocation()?.state?.data;
  const [formdata, setFormdata] = useState(
    {
      vacancyTitle: data?.vacancyTitle ? data?.vacancyTitle : "",
      position: data?.position ? data?.position : "",
      jobType: data?.jobType ? data?.jobType : "",
      jobSalary: data?.jobSalar ? data?.jobSalar : "",
      location: data?.location ? data?.location : ""
    }
  );
  const [date, setDate] = useState(data?.dueDate ? new Date(data?.dueDate) : null);
  const [desc, setDesc] = useState();
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );

  const onInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
    console.log(e.target.value)
  };

  const postVacancy = async (e) => {
    e.preventDefault();
    try {
      if (data === undefined) {
        var res = await axios.post("/api/post-vacancy", {
          vacancyTitle: formdata.vacancyTitle,
          position: formdata.position,
          dueDate: date.toDateString(),
          jobType: formdata.jobType,
          jobSalar: formdata.jobSalary,
          location: formdata.location,
          vacancyDescription: desc,
        });
        toast.success("Vacancy Posted")
        // console.log(res);
      } else {
        var res = await axios.put('/api/update-vacancy/' + data?._id, {
          vacancyTitle: formdata.vacancyTitle,
          position: formdata.position,
          dueDate: date.toDateString(),
          jobType: formdata.jobType,
          jobSalar: formdata.jobSalary,
          location: formdata.location,
          vacancyDescription: desc,
        })
        console.log(res)
        toast.success("update")
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
            <h4 className="text-light">{!data ? "Add Vacancies" : "Update Vacancies"}</h4>
            <small className="text-sm text-light">
              {
                !data ?
                  " Add position for your new jobProvide information decent information about your job to attract best candidates." :
                  " Update position for jobProvide information decent information about your job to attract best candidates."
              }
            </small>
          </div>
          <div className="bg-light container-fluid">
            <div className="col-8 py-4">
              <h6>{!data ? "Add position for your new job" : " Update position for your new job"}</h6>
              <div className="my-3">
                <small>Title</small>
                <input
                  name="vacancyTitle"
                  onChange={e => onInputChange(e)}
                  value={formdata?.vacancyTitle}
                  className="form-control rounded text-sm text-secondary"
                  type="text"
                />
              </div>
              <div className="row my-3">
                <div className="col-md-6">
                  <small>Position</small>
                  <select
                    onChange={e => onInputChange(e)}
                    value={formdata.position}
                    className="form-control rounded form-select py-0 text-secondary text-sm"
                    name="position"
                    id=""
                  >
                    <option className="text-sm" disabled value="" selected>
                      None Selected
                    </option>
                    <option className="text-sm" value="Intern">
                      Intern
                    </option>
                    <option className="text-sm" value="Junior">
                      Junior
                    </option>
                    <option className="text-sm" value="Mid Level">
                      Mid Level
                    </option>
                    <option className="text-sm" value="Senior">
                      Senior
                    </option>
                  </select>
                </div>
                <div className="col-md-6">
                  <small>Job Type</small>
                  <select
                    onChange={e => onInputChange(e)}
                    className="form-control rounded form-select py-0 text-secondary text-sm"
                    name="jobType"
                    value={formdata?.jobType}
                    id=""
                  >
                    <option className="text-sm" disabled value="" selected>
                      None Selected
                    </option>
                    <option className="text-sm" value="Full Time">
                      Full Time
                    </option>
                    <option className="text-sm" value="   Part Time">
                      Part Time
                    </option>
                  </select>
                </div>
                <div className="my-3 col-md-6">
                  <small>Expires in</small>
                  <div className="pb-4">
                    <DatePicker
                      date={date}
                      onDateChange={setDate}
                      locale={enGB}
                    >
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
              </div>
              <div className="my-3">
                <small>Job Description</small>
                <div>
                  <div
                    className="border rounded p-2 text-sm"
                    style={{ minHeight: "400px" }}
                  >
                    <Editor
                      onChange={e => {
                        setDesc(e.blocks[0].text)
                      }}
                      editorState={editorState}
                      onEditorStateChange={setEditorState}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <button
                  onClick={postVacancy}
                  className="btn btn-primary rounded d-block ms-auto"
                  type="button"
                >
                  {
                    !data ? "+ Create" : "Update"
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
