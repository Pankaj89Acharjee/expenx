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

    var userName = userdata?.name
    console.log("Username in My profile", userName);
    return (
        <div >
            <div className='relative'>
                <img className='w-full rounded-lg' src={bgstickerexp} alt="bckgrnd" />
                <div className='absolute text-white font-mono xl:text-6xl lg:text-6xl sm:text-md md:text-4xl bottom-4 left-1/2 -translate-y-2/3 -translate-x-1/2'>
                    <Typewriter
                        words={[`Welcome!${userName}`, 'Welcome']}
                        loop
                        cursor
                        cursorStyle='|'
                        typeSpeed={60}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </div>

                {/* <h1 className='absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2'>{userdata?.name}</h1> */}
            </div>
            <img className='w-full rounded-top-lg' src={bgTxt} alt="bckgrnd" />
            <div className='relative flex flex-wrap'>
                <img className='relative w-full rounded-lg opacity-30' src={bgImg} alt="bckgrnd" />
                <div className="xl:w-11/12 md:w-8/12">
                    <div className="block shadow-lg rounded-lg">
                        <div className="lg:flex lg:flex-wrap g-0">
                            <div className='absolute top-5 left-5 items-center justify-center align-center'>
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                                    className="ml-5 justify-center rounded-full w-12 h-12 lg:w-48 lg:h-48 sm:w-16 sm:h-16 md:w-24 md:h-24 xl:w-48 xl:h-48  shadow-lg object-cover"
                                    alt="userpic"
                                />
                                <h1 className='font-sans-serif text-center text-xl sm:text-4xl font-bold mt-5 leading-normal'>{userdata?.name}</h1>

                                <div>
                                    <h3 className='font-sans text-md text-center sm:text-3xl font-semibold mt-3 leading-normal'>{userdata?.designation}</h3>
                                </div>
                            </div>

                            <div className='absolute top-5 right-5 items-center justify-center align-center'>
                                <div className='px-4 py-6 md:p-12 md:mx-6'>
                                    <h1 className='font-bold font-sans text-4xl'>CONTACT DETAILS</h1>
                                    <h2>{userdata?.city}</h2>
                                    <h2>{userdata?.mobile}</h2>
                                    <h2>{userdata?.email}</h2>
                                    <h2>{userdata?.city}</h2>
                                    <h2>{userdata?.mobile}</h2>
                                    <h2>{userdata?.email}</h2>
                                    <h2>{userdata?.city}</h2>
                                    <h2>{userdata?.mobile}</h2>
                                    <h2>{userdata?.email}</h2>
                                    <h2>{userdata?.city}</h2>
                                    <h2>{userdata?.mobile}</h2>
                                    <h2>{userdata?.email}</h2>
                                    <h2>{userdata?.city}</h2>
                                    <h2>{userdata?.mobile}</h2>
                                    <h2>{userdata?.email}</h2>
                                </div>
                            </div>

                            <div className='absolute bottom-5 right-5 items-center justify-center align-center'>
                                <div className='px-4 py-6 md:p-12 md:mx-6'>
                                    <h1 className='font-bold font-sans text-4xl'>CONTACT DETAILS</h1>
                                    <h2>{userdata?.city}</h2>
                                    <h2>{userdata?.mobile}</h2>
                                    <h2>{userdata?.email}</h2>
                                    <h2>{userdata?.city}</h2>
                                    <h2>{userdata?.mobile}</h2>
                                    <h2>{userdata?.email}</h2>
                                    <h2>{userdata?.city}</h2>
                                    <h2>{userdata?.mobile}</h2>
                                    <h2>{userdata?.email}</h2>
                                    <h2>{userdata?.city}</h2>
                                    <h2>{userdata?.mobile}</h2>
                                    <h2>{userdata?.email}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MyProfile