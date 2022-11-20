import React from 'react'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import logo from '../assets/logoexp.jpeg'
import { Link, Route, Routes } from 'react-router-dom'
import { useRef } from 'react'
import Dashboard from './Dashboard'

import Userprofile from '../components/Userprofile'


const Home = ({alluser}) => {

    const [sidebarToggler, setsidebarToggler] = useState(false)    
    const scrollRef = useRef(null);
    
    const allusers = alluser;
    console.log("Users all data in Home component is", allusers)
    

    return (
        <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
            <div className='hidden md:flex h-screen flex-initial' /*side bar only for mobile*/>
                <Sidebar allusers={allusers && allusers} /*Implement later*/ />               
            </div>

            <div className='flex md:hidden flex-row' /*HiMenu icon for mobile device*/>
                <div className='p-2 w-full flex flex-row justify-between items-center shadow-lg'>
                    <HiMenu fontSize={60} className='cursor-pointer' onClick={() => setsidebarToggler(true)} />
                    <Link to="/home">
                        <img src={logo} alt="logo" className='w-16 h-16' />
                    </Link>
                </div>
                {sidebarToggler && (
                    <div className='fixed w-3/5 bg-gray-300 h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
                        <div className='absolute w-full flex justify-end items-center p-2'>
                            <AiFillCloseCircle fontSize={30} className='cursor-pointer text-red-200' onClick={() => setsidebarToggler(false)} />
                        </div>
                        <Sidebar allusers={allusers && allusers} closeToggle={setsidebarToggler}/*for desktop*/ />
                    </div>
                )}
            </div>


            <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
                <Routes>
                    <Route path="/api/singleuser/:id" element={<Userprofile  />} />
                    <Route path="/*" element={<Dashboard allusers = {allusers && allusers } />} />
                </Routes>
            </div>
           
        </div>
    )
}

export default Home