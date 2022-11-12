import './App.css';
import React, {useEffect, useState} from 'react';

import Register from './components/Register';
import Login from './components/Login';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './container/Home';
import Dashborad from './container/Dashboard'
import Userprofile from './components/Userprofile';
import jwtDecode from 'jwt-decode'
import Landing from './components/Landing';

function App() {
  const navigate = useNavigate();
  const [alluser, setAlluser] = useState(null)
  // useEffect(() => {
  //   const User = localStorage.getItem('token') !== 'undefined' ? JSON.parse(localStorage.getItem('token')) : localStorage.clear();

  //   if (!User) navigate('/login');
  // }, []);

  async function populateHome() {
    const data = await fetch('http://localhost:5050/api/login' , {
        headers: {
            'x-access-token' : localStorage.getItem('token'),
        },
    });
    const res = await data.json()
    console.log(res);
    
}

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const user = jwtDecode(token);   
        console.log("user in app.js is", user)       
        setAlluser(user);
        if (!user) {
            localStorage.removeItem('token');
            navigate('/login');
        }else {
            populateHome()
        }
    }
}, [navigate])



  return (
    <Routes>      
      <Route path = "/login" element={<Login alluser = {alluser && alluser}/>}/>
      <Route path = "/" element={<Landing/>}/>
      <Route path = "/*" element={<Home alluser = {alluser && alluser}/>}/>
      <Route path = "/register" element={<Register />}/>
    </Routes>
  );
}

export default App;
