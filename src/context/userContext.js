import axios from 'axios';
import { useState, createContext, useEffect } from 'react';
import { userAuthToken } from '../utils/parseToken';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState();

    useEffect(() => {
        axios.get(`/api/get-user/` + userAuthToken?.userId).then(data => {
            setUser(data.data.data)
            console.log(data.data.data)
        })
    }, [])

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}