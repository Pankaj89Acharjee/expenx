import './App.css';
import React, { useEffect, useState } from 'react';

import Register from './components/Register';
import Login from './components/Login';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './container/Home';
import jwtDecode from 'jwt-decode'
import Landing from './components/Landing';

function App() {
  const navigate = useNavigate();
  const [alluser, setAlluser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      console.log("user in app.js is", user)
      setAlluser(user);
      if (!user) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  }, [navigate])



  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Landing />} />
      <Route path="/*" element={<Home alluser={alluser && alluser} />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
