import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import AuthApi from '../../api/authApi';

const ProtectedCustomerRoute = ({ children }) => {
    const userToken = localStorage.getItem("userToken")
    // const [isAuthenticated, setIsAuthenticated] = useState(false)
    // useEffect( () => {
    //  async () => {
    //   try {
    //     await AuthApi.apiMe(userToken)
    //     console.log("success")
    //     setIsAuthenticated(true)
    //   } catch (err){
    //     console.log("fail")
    //     setIsAuthenticated(false)
    //   }
    //  }
    // }, [isAuthenticated])
    
    if(!userToken) {
      return <Navigate to="/login" replace />;
    }
    else {
      return children;
    }
  };


export default ProtectedCustomerRoute