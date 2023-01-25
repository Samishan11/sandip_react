import axios from 'axios';
import { useState, createContext, useEffect } from 'react';

export const ApplicantContext = createContext();

export const ApplicantProvider = (props) => {
    const [applicant, setApplicant] = useState();

    useEffect(() => {
        axios.get(`/api/get-applicant/`).then(data => {
            setApplicant(data.data.data)
        })
    }, [])

    return (
        <ApplicantContext.Provider value={[applicant, setApplicant]}>
            {props.children}
        </ApplicantContext.Provider>
    )
}