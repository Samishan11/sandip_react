import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
const Alert = ({ api, active }) => {
    const [close, setclose] = useState(false)
    const [save, setsave] = useState(false)
    const [load, setLoad] = useState(false)
    const deleteApi = async () => {
        try {
            var res = await axios.delete(`/api/${api}/`);
            toast.success("User Has Been Deleted")
            if (!load) {
                setLoad(true)
            } else {
                setLoad(false)
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    return (
        <div style={{ position: 'absolute', top: '50%', left: "50%" }} className={`alert alert-primary ${active ? 'd-block' : 'd-none'}`} role="alert">
            <button className='btn-outline-danger' onClick={() => {
                close ? setclose(false) : setclose(true)
            }}>Close</button>
            <button className='btn-outline-primary' onClick={() => {
                save ? setsave(false) : setsave(true)
                deleteApi()
            }}>Confirm</button>
        </div>
    )
};
export default Alert;