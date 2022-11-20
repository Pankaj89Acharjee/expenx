import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner'
import jwtDecode from 'jwt-decode';
import { Link } from "react-router-dom"


const AllExpenditure = () => {

    const [userexp, setUserexp] = useState([]);
    const [loading, setLoading] = useState(false);
    const [oneusername, setOneusername] = useState(null);

    const gotoExpScreen = () => {
        window.location.href = '/dashboard'
    }
   

    useEffect(() => {
        setLoading(true)
        const loadingTimer = setTimeout(async () => {
            clearTimeout(loadingTimer);
            const token = localStorage.getItem('token');
            const decodetoken = jwtDecode(token);
            const userId = decodetoken.id;
            const userName = decodetoken.name
            setOneusername(userName);
            //console.log("Value of user in All Expenditure", userId);
            const response = await axios.post("http://localhost:5050/api/getexpense", { userid: userId });
            setUserexp(response.data);
            console.log("expense data", response.data)
            setLoading(false);
        }, 1000);
    }, [])

    //array.reduce is used to calculate sum or total shorten collective result
    console.log((userexp.reduce((a, v) => a = a + v.amount, 0)))
    var totalExpenseAmount = userexp.reduce((a, v) => a = a + v.amount, 0);

    if (loading) {
        return <Spinner message="Loading!" />
    }

    return (
        <div>
            <div className="lg:w-full flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-gradient-to-br from-yellow-400 via-green-200 to-purple-600">
                <div className="text-gray-900 px-4 py-6 md:p-12 md:mx-6">
                    <h1 className='text-xl'>Total Amount Spent: {totalExpenseAmount}</h1>
                    <h4 className="text-2xl text-center font-normal font-bold mb-6">Hi! {oneusername}</h4>
                    <h2 className='items-center uppercase text-gray-700 text-center text-4xl font-bold'>Details of your expenses</h2>
                    <p className="text-sm mt-5">
                    Knowledge opens the door to Opportunity, Success and Achievements. A little water in the Sun will evaporate, but the ocean never
                    dries up. Limited responsibility tires you, but unlimited responsibility empowers you.
                    </p>
                </div>
            </div>
            
            <>
                <div className='items-center text-2xl text-center font-bold text-red-700'>

                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="flex justify-between py-3 pl-2 ">
                            <div className="relative w-full">
                                <label htmlFor="hs-table-search" className="sr-only">
                                    Search
                                </label>
                                <input
                                    type="text"
                                    name="hs-table-search"
                                    id="hs-table-search"
                                    className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                    placeholder="Search..."
                                />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <svg
                                        className="h-3.5 w-3.5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="p-1.5 w-full inline-block align-middle">
                            <div className="overflow-hidden border rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3 pl-4">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        id="checkbox-all"
                                                        type="checkbox"
                                                        className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                                                    />
                                                    <label
                                                        htmlFor="checkbox"
                                                        className="sr-only"
                                                    >
                                                        Checkbox
                                                    </label>
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                            >
                                                Expenditure Date
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                            >
                                                Purpose
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                            >
                                                Amount
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                            >
                                                Edit
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                            >
                                                Delete
                                            </th>
                                        </tr>
                                    </thead>


                                    {userexp?.slice(0, userexp.length).map((x, index) => {
                                        return (
                                            <tbody key={index} className="divide-y divide-gray-200">
                                                <tr>
                                                    <td className="py-3 pl-4">
                                                        <div className="flex items-center h-5">
                                                            <input
                                                                type="checkbox"
                                                                className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                                                            />
                                                            <label
                                                                htmlFor="checkbox"
                                                                className="sr-only"
                                                            >
                                                                Checkbox
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                        {x.dateofexp.substring(0, 10)}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                        {x.exppurpose}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                        {x.amount}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                        <Link to=""
                                                            className="text-green-500 hover:text-green-700"

                                                        >
                                                            Edit
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                        <Link to=""
                                                            className="text-red-500 hover:text-red-700"

                                                        >
                                                            Delete
                                                        </Link>
                                                    </td>
                                                </tr>
                                            </tbody>

                                        )
                                    })}

                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </>

            <div className='flex flex-inline box position-relative w-full items-center justify-center'>
                <button type="submit" onClick={gotoExpScreen} className="w-2/5 justify-center text-center align-center px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out">Go Dashboard</button>
            </div>
        </div>
    )
}

export default AllExpenditure