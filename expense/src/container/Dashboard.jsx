import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Userprofile from '../components/Userprofile'
import Allusers from '../components/Allusers'
import Chartexp from '../components/Chartexp'
import Expendituresheet from '../components/Expendituresheet'
import Incomesheet from '../components/Incomesheet'
import Expsuccessscreen from '../components/Expsuccessscreen'
import AllExpenditure from '../components/AllExpenditure'
import AllIncome from '../components/AllIncome'
import EditIncome from '../components/EditIncome'
import EditExpenditure from '../components/EditExpenditure'
import { AiOutlineLogout, AiFillProfile } from 'react-icons/ai';
import { MdHome, MdBugReport, MdKeyboardArrowDown } from 'react-icons/md';
import ChatGPT from '../components/ChatGPT'
import MyProfile from '../components/MyProfile'
import EditMyProfile from '../components/EditMyProfile'
import { message, Popconfirm } from 'antd';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Navbar from './Navbar'
import bgstickerexp from '../assets/logoimg.png'
import logo3 from '../assets/Logo Stocks.png'
import DashboardScreen from '../components/DashboardScreen'

const Dashboard = ({ allusers }) => {

    const [image, setImage] = useState('');
    const [username, setUsername] = useState('');
    const [useremail, setUseremail] = useState(false);
    const [dropdowns, setDropdowns] = useState(false);

    //console.log("Users data in dash borad is",allusers);
    const token = localStorage.getItem('token');
    const decodetoken = jwtDecode(token);
    const userId = decodetoken.id

    //For Opting Cancellation
    function cancel(e) {
        console.log(e);
        message.error('Ok! Continue your session');
    }


    useEffect(() => {
        const fetchDataToEdit = async () => {
            try {
                const response = await axios.post(`http://localhost:5050/api/singleuser/${userId}`);
                //console.log("Profile data fetched as: - ", response.data.data);               
                setImage(response.data.data.profileimage)
                setUsername(response.data.data.name)
                setUseremail(response.data.data.email)
            } catch (err) {
                message.error(err.message);
                console.log("Error in Data fetching in useEffect", err)
            }
        }
        fetchDataToEdit();
    }, [userId])



    const logoutUser = () => {
        localStorage.removeItem('token');
        message.success("You have been logged out");
        window.location.href = '/';
    }

    const gotologin = () => {
        window.location.href = '/login'
    }

    return (
        <div className='mr-1'>
            <nav className="border-gray-700">
                <div /*For top header */ className="flex flex-wrap items-center justify-between mx-auto p-1">
                    <img src={bgstickerexp} className="h-28 ml-2 mt-2 rounded-lg" alt="Expenx Logo" />
                    <img src={logo3} className="mr-1 h-28 rounded-full" alt="Expenx Logo" />
                    <div className='flex flex-wrap items-center justify-evenly space-x-4 mr-3'>
                        <div className='relative'>
                            <button type='button' className='bg-white hidden md:block p-1 rounded-full cursor-pointer outline-none shadow-lg' onClickCapture={() => setDropdowns(!dropdowns)}>
                                <img className="w-8 h-8 rounded-full" src={`http://localhost:5050/${image}`} alt="profilephoto" />
                            </button>
                            <h1 className='font-normal md:hidden items-center justify-center block text-center text-xl mt-3'>
                                {username ? username : ''}
                            </h1>
                            {!dropdowns ? '' : (
                                < div className="flex flex-wrap items-center absolute right-0">
                                    {/* <!-- Dropdown menu --> */}
                                    <div className="z-50 hidden md:block text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <div className="px-4 py-3">
                                            <span className="block text-sm text-gray-900 dark:text-white">{username ? username : username}</span>
                                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{useremail ? useremail : useremail}</span>
                                        </div>
                                        <ul className="py-2" aria-labelledby="user-menu-button">
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My Profile</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Expenditure</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                        </div>


                        <div className='ml-2'>
                            {!username ? <div className="bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full" role="alert">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
                                </svg>
                                You need to login to view this component
                                <button
                                    type="submit"
                                    href="/login"
                                    onClick={gotologin}
                                    className="flex flex-col items-center mt-10 justify-center text-center px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                    Login Here
                                </button>
                            </div> : (
                                <button
                                    type="button"
                                    className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'
                                >
                                    <Popconfirm title="Are you sure to logout?" onConfirm={logoutUser} onCancel={cancel} okText="Yes" cancelText="No">
                                        <AiOutlineLogout className="rotate-90" color="red" fontSize={25} />
                                    </Popconfirm>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav >
            <div className="container min-w-fit h-12">
                <Navbar />
            </div>

            <div>
                <Routes>
                    <Route path="/api/singleuser/:id" element={<Userprofile allusers={allusers && allusers} />} />
                    <Route path="category/allusers" element={<Allusers allusers={allusers && allusers} />} />
                    <Route path="/category/charts" element={<Chartexp allusers={allusers && allusers} />} />
                    <Route path="category/expenditure" element={<Expendituresheet allusers={allusers && allusers} />} />
                    <Route path="category/income" element={<Incomesheet allusers={allusers && allusers} />} />
                    <Route path="/expensesuccess" element={<Expsuccessscreen />} />
                    <Route path="/api/editexpenditure/:id" element={<EditExpenditure />} />
                    <Route path="/api/editincome/:id" element={<EditIncome />} />
                    <Route path="/category/allexpense" element={<AllExpenditure allusers={allusers && allusers} />} />
                    <Route path="/category/allincome" element={<AllIncome allusers={allusers && allusers} />} />
                    <Route path="/category/chatgpt" element={<ChatGPT allusers={allusers && allusers} />} />
                    <Route path="/category/myprofile" element={<MyProfile allusers={allusers && allusers} />} />
                    <Route path="/api/edituserprofile/:id" element={<EditMyProfile allusers={allusers && allusers} />} />
                    <Route path="/dashboardscreen" element={<DashboardScreen />} />
                </Routes>
            </div>
        </div >
    )
}

export default Dashboard