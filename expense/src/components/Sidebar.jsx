import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'
import {sidebarCategory} from '../data/sidebarcategories'
import bgstickerexp from '../assets/LogoMain.png'

import logo from '../assets/logoexp.jpeg'

const isNotActiveStyle = 'flex items-center font-normal px-5 text-gray-900 hover:text-white transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center underline px-5 gap-3 text-black font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ allusers, closeToggle }) => {
//console.log(allusers);
    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false);
    }

    return (
        <div className='flex flex-col tracking-tight text-black font-bold md:overflow-hidden overflow-auto md:hover:overflow-auto h-screen font-subpixel-antialiased bgcustomcolor4 justify-between overflow-y-auto'>
            <div className='flex flex-col'>
                <Link to="/home"
                    className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
                    onClick={handleCloseSidebar}
                >
                    <img src={bgstickerexp} alt="logo" className='w-12 h-12 rounded-full items-center justify-center text-center' /> <span className='text-xl'>Expenx</span>
                </Link>

                <div className='flex flex-col gap-5'>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                        onClick={handleCloseSidebar}
                    >
                        <RiHomeFill /> Dashboard
                    </NavLink>
                    <h3 className='mt-2 px-5 text-base 2xl:text-xl underline text-semibold'>
                        Explore Expenditures
                    </h3>

                    {sidebarCategory.slice(0, sidebarCategory.length - 1).map((category) => {
                        return (
                            <NavLink
                                to={`/category/${category.name}`}
                                className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                                onClick={handleCloseSidebar}
                                key={category.name}
                            >
                                <img src={category.image} alt="ctgry" className='w-14 h-14 p-0.5 mr-2 rounded-full bg-black shadow-xl'/>
                                {category.name}
                            </NavLink>
                        )

                    })}
                </div>
            </div>
            {allusers && (
                <Link
                    to={`/api/singleuser/${allusers.id}`}
                    className="flex my-5 mb-3 gap-2 p-2 text-bold text-center item-center bg-blue-400 rounded-lg shadow-lg mx-3"
                >
                    <p className='items-center text-center ml-2 capitalize font-bold'>Welcome! {allusers.name}</p>
                </Link>
            )}
        </div>
    )
}

export default Sidebar