import React from 'react';
import {jwtDecode} from "jwt-decode"; 
import ServiceTable from '../components/ServiceTable';
import Login from '../components/Login';

function Admin() {
  const token = localStorage.getItem("token");
  let user = null;

  if (token) {
    try {
      user = jwtDecode(token); 
    } catch (error) {
      console.error("Invalid JWT Token:", error);
      localStorage.removeItem("token");
    }
  }

  return (
    <div className='h-screen'>
       {user && user.role === "Admin" ? <ServiceTable /> : <Login />}
    </div>
  );
}

export default Admin;
