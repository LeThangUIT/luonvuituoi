import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import AuthApi from '../../api/authApi';

const ProtectedRoute = ({ children }) => {
    const adminToken = localStorage.getItem("adminToken")
    // const [isAuthenticated, setIsAuthenticated] = useState(false)
    // useEffect( () => {
    //  async () => {
    //   try {
    //     await AuthApi.apiMe(adminToken)
    //     console.log("success")
    //     setIsAuthenticated(true)
    //   } catch (err){
    //     console.log("fail")
    //     setIsAuthenticated(false)
    //   }
    //  }
    // }, [isAuthenticated])
    
    if(!adminToken) {
      return <Navigate to="/adminLogin" replace />;
    }
    else {
      return children;
    }
  };


export default ProtectedRoute