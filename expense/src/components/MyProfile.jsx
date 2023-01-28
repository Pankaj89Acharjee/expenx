import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import bgstickerexp from '../assets/profilehead.png'
import bgImg from '../assets/ProfileBackground.jpg'
import bgTxt from '../assets/ProfileText.png'
import { Typewriter } from 'react-simple-typewriter'
import { IoIosListBox } from 'react-icons/io'


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
            <div className='relative scroll-smooth'>
                <img className='w-full rounded-lg' src={bgstickerexp} alt="bckgrnd" />
                <div className='absolute text-white font-mono xl:text-4xl lg:text-4xl sm:text-md md:text-2xl bottom-4 left-1/2 -translate-y-2/3 -translate-x-1/2'>
                    <Typewriter
                        words={[`Hi!${userName}`, 'Welcome']}
                        loop
                        cursor
                        cursorStyle='|'
                        typeSpeed={60}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </div>
            </div>

            <img className='w-full rounded-top-lg' src={bgTxt} alt="bckgrnd" />
            <div className='bg-fixed' style={{
                backgroundImage: `url(${bgImg})`,
                backgroundSize: "cover",
                height: "100vh"
            }}>

            </div>

            <div className='h-screen justify-center items-center flex flex-col lg:flex lg:flex-row xl:flex xl:flex-row'>
                <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                    className="justify-center rounded-full w-16 h-16 lg:w-48 lg:h-48 md:w-24 md:h-24 xl:w-48 xl:h-48  shadow-lg object-cover"
                    alt="userpic"
                />
                <div className='justify-center items-center flex flex-col items-center flex-inline'>
                    <h1 className='font-sans-serif text-center text-2xl md:text-3xl font-bold mt-5 leading-normal'>{userdata?.name}</h1>
                    <h3 className='font-sans text-md text-center md:text-3xl font-semibold mt-3 leading-normal'>{userdata?.designation}</h3>
                </div>
            </div>

            <section className="h-full rounded md:h-full md:w-auto">
                <div className="container py-12 px-6 h-full md:h-auto">
                    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                        <div className="xl:w-11/12 md:w-8/12">
                            <div className="block bg-gray-400 shadow-lg rounded-lg">
                                <div className="lg:flex lg:flex-wrap g-0">
                                    <div className="lg:w-6/12 px-4 md:px-0 sm:w-auto">
                                        <div className="md:p-12 md:mx-6">
                                            <div className="text-center">
                                                <img
                                                    className="justify-center mx-auto w-16 h-16 rounded-full lg:w-24 lg:h-24 md:w-24 md:h-24 xl:w-48 xl:h-48"
                                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                                                    alt="logo"
                                                />
                                                <h4 className="text-xl text-yellow-700 font-semibold mt-1 mb-12 pb-1">NEW EXPENX REGISTRATION</h4>
                                            </div>
                                            <div className="mb-4">
                                                <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Amount</label>
                                            </div>

                                            <div className="mb-4">
                                                <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Category of expenditure</label>
                                            </div>


                                            <div className="mb-4">
                                                <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Date of expenditure</label>
                                            </div>

                                            <div className="text-center pt-1 mb-12 pb-1">
                                            </div>
                                            <div className="flex items-center justify-between pb-6">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-gradient-to-br from-yellow-400 via-green-200 to-purple-600">
                                        <div className="text-gray-900 px-4 py-6 md:p-12 md:mx-6">
                                            <h4 className="text-2xl text-center font-normal font-bold mb-6">Get best out of EXPENX</h4>
                                            <p className="text-sm">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                consequat.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>


    )
}

export default MyProfile