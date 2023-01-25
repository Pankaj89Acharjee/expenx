import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import bgstickerexp from '../assets/profilehead.png'
import bgImg from '../assets/ProfileBackground.jpg'
import bgTxt from '../assets/ProfileText.png'
import { Typewriter } from 'react-simple-typewriter'

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
            const response = await axios.post("http://localhost:5050/category/myprofile", { userid: userId });
            setUserdata(response.data);
            console.log("User Profile data", response.data)
            setLoading(false);
        }, 1000);
    }, [])

    return (
        <div >
            <div className='relative'>
                <img className='w-full rounded-lg' src={bgstickerexp} alt="bckgrnd" />
                <div className='absolute text-white text-6xl top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2'>
                    <Typewriter
                        words={[' Programmer ', ' Professional Coder ', ' Full Stack Developer ', ' Data Manager ']}
                        loop
                        cursor
                        cursorStyle='|'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}

                    />
                </div>

                {/* <h1 className='absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2'>{userdata?.name}</h1> */}
            </div>
            <div>
                <img className='w-full rounded-top-lg' src={bgTxt} alt="bckgrnd" />
                <img className='w-full rounded-lg opacity-40' src={bgImg} alt="bckgrnd" />
            </div>

        </div>
    )
}

export default MyProfile