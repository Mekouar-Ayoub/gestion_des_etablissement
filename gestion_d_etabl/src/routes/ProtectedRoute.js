import Cookies from 'js-cookie';
import React from 'react'

import {Navigate, Outlet, useLocation} from "react-router-dom"

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({user,children}) => {

    let location = useLocation();
    if(user === 'admin') {
        if(Cookies.get('token') && Cookies.get('headers') === '0') {
            return children ? children : <Outlet />;
        }
    } 
    else if(user === 'prof'){
        if(Cookies.get('token') && Cookies.get('headers') === '1') {
            return children ? children : <Outlet />;
        }
    } else if(user === 'eleve'){

        if(Cookies.get('token') && Cookies.get('headers') === '2') {
            return children ? children : <Outlet />;
        }
    }
    else if(user === 'all') {
        if(Cookies.get('token') &&
         (Cookies.get('headers') === '2' || Cookies.get('headers') === '1') ||  Cookies.get('headers') === '0')
          {
            return children ? children : <Outlet />;
          }}
    
    
    return <Navigate to="/" state={{ from: location}} replace />;

};

export default ProtectedRoute;