import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import bgstickerexp from '../assets/figma1.png'

const MyProfile = () => {
      
    const [loading, setLoading] = useState(false);
    const [userdata, setUserdata] = useState();

    useEffect(() => {
        setLoading(true)
        const loadingTimer = setTimeout(async () => {
            clearTimeout(loadingTimer);
            const token = localStorage.getItem('token');
            const decodetoken = jwtDecode(token);
            const userId = decodetoken.id;                                 
            const response = await axios.post("http://localhost:5050/category/myprofile", { userid: userId});
            setUserdata(response.data);
            console.log("User Profile data", response.data)
            setLoading(false);
        }, 1000);
    },[])

    return (
        <div className='h-50 opacity-60'>
            <img src={bgstickerexp} alt="bckgrnd" />
            <h1>{userdata?.name}</h1>
        </div>
    )
}

export default MyProfile