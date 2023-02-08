import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import bgstickerexp from '../assets/TopHead.png'
import bgImg from '../assets/ProfileBackground.jpg'
import bgTxt from '../assets/ProfileText.png'
import { Typewriter } from 'react-simple-typewriter'
import { IoIosListBox } from 'react-icons/io'
import svgIcon from '../assets/svg/profilesvg.png'

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
            //console.log("User Profile data", response.data)
            setLoading(false);
        }, 1000);
    }, [])

    var userName = userdata?.name
    //console.log("Username in My profile", userName);
    return (
        <div>

            <div className='relative scroll-smooth'>
                <div className='w-full mt-4 rounded-t-lg  '>
                    <img className='w-full rounded-lg' src={bgstickerexp} alt="bckgrnd" />
                </div>

            </div>

            {/* <div className='bg-fixed' style={{
                backgroundImage: `url(${bgImg})`,
                backgroundSize: "cover",
                height: "100vh"
            }}>
            </div> */}

            <div className='text-center justify-center items-center text-gray-400 mt-5 font-mono xl:text-4xl lg:text-4xl sm:text-md md:text-2xl'>
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
            <section className="h-full rounded-2xl md:h-full md:w-auto">
                <div className="container py-12 px-6 h-full md:h-auto">
                    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                        <div className="xl:w-11/12 md:w-8/12">
                            <div className="block shadow-gray-600 hover:shadow-cyan-500/40 bgcustomcolor3 shadow-lg rounded-lg">
                                <div className="lg:flex lg:flex-wrap g-0">
                                    <div className="lg:w-6/12 px-4 md:px-0 sm:w-auto">
                                        <div className="md:p-12 md:mx-6">
                                            <div className="text-center">
                                                <img
                                                    className="justify-center mx-auto w-16 h-16 rounded-full lg:w-24 lg:h-24 md:w-24 md:h-24 xl:w-48 xl:h-48"
                                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                                                    alt="logo"
                                                />
                                                <h4 className="text-2xl underline text-white uppercase font-semibold mt-1 mb-3 pb-1">{userdata?.name}</h4>
                                                <h4 className="text-xl text-white uppercase font-semibold  mb-5 pb-1">{userdata?.designation}</h4>
                                            </div>
                                            <div className="mb-4 flex">
                                                <IoIosListBox className='text-3xl' /> <span><h2 for="amount" className="block ml-3 underline uppercase mb-2 text-center font-bold text-2xl text-gray-900 dark:text-gray">Basic Details</h2></span>
                                            </div>

                                            <div className="mb-4">
                                                <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Village: {userdata?.city}</label>
                                            </div>

                                            <div className="mb-4">
                                                <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Post Office: {userdata?.city}</label>
                                            </div>

                                            <div className="mb-4">
                                                <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Police Station: {userdata?.city}</label>
                                            </div>

                                            <div className="mb-4">
                                                <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">City: {userdata?.city}</label>
                                            </div>

                                            <div className="mb-4">
                                                <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">District: {userdata?.city}</label>
                                            </div>

                                            <div className="mb-4">
                                                <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">E-mail: {userdata?.email}</label>
                                            </div>

                                            <div className="mb-4">
                                                <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Mobile: {userdata?.mobile}</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bgcustomcolor3">
                                        <div className="text-gray-900 px-4 py-6 md:p-6 md:mx-6">
                                            <div className="mb-4 flex">
                                                <IoIosListBox className='text-3xl' /> <span><h2 for="amount" className="block ml-3 uppercase underline mb-2 text-center font-bold text-2xl text-gray-900 dark:text-gray">educational details</h2></span>
                                            </div>

                                            <div className="mb-4">
                                                <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Graduation: {userdata?.city}</label>
                                            </div>

                                            <div className="mb-4">
                                                <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">College: {userdata?.city}</label>
                                            </div>

                                            <div className="mb-4">
                                                <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">University: {userdata?.city}</label>
                                            </div>

                                            <div className="mb-4">
                                                <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Passing Year: {userdata?.city}</label>
                                            </div>


                                            <div className="mb-4 flex mt-10">
                                                <IoIosListBox className='text-3xl' /> <span><h2 for="amount" className="block ml-3 uppercase underline mb-2 text-center text-2xl font-normal text-gray-900 dark:text-gray">professional skills</h2></span>
                                            </div>

                                            <div className="mb-4">
                                                <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Major Skill: {userdata?.city}</label>
                                            </div>

                                            <div className="mb-4">
                                                <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Computer Skill: {userdata?.city}</label>
                                            </div>

                                            <div className="mb-4">
                                                <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Experience: {userdata?.city}</label>
                                            </div>
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