import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
export const ProtectedRoutes = () => {
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    const token = localStorage.getItem('token')
    const user = parseJwt(token);
    console.log(user)
    return (
        user?.user?._id ?
            <Outlet></Outlet>
            :
            <Navigate to='*'></Navigate>

    )
}

export const ProtectedAdmin = () => {
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    const token = localStorage.getItem('token')
    const user = parseJwt(token);
    return (
        user?.user?.isHR ?
            <Outlet></Outlet>
            :
            <Navigate to='*'></Navigate>
    )
}