import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'

import logo from '../assets/logoexp.jpeg'

const isNotActiveStyle = 'flex items-center px-5 text-gray-500 hover:text-white transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize';

const categories = [
    { name: 'income' },
    { name: 'expenditure' },
    { name: 'allexpense' },
    { name: 'charts' },
    { name: 'allusers' },
    { name: 'Others' },
]
const Sidebar = ({ allusers, closeToggle }) => {
//console.log(allusers);
    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false);
    }

    return (
        <div className='flex flex-col text-white bg-black justify-between h-full overflow-y-scroll min-w-210 hide-scrollbar'>
            <div className='flex flex-col'>
                <Link to="/home"
                    className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
                    onClick={handleCloseSidebar}
                >
                    <img src={logo} alt="logo" className='w-full h-36' />
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

                    {categories.slice(0, categories.length - 1).map((category) => {
                        return (
                            <NavLink
                                to={`/category/${category.name}`}
                                className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                                onClick={handleCloseSidebar}
                                key={category.name}
                            >
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