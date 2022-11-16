import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Allusers = () => {

    const [completeuser, setCompleteuser] = useState(null)

    useEffect(() => {
        const fetchAllUsers = async () => {
            const { data } = await axios.get("http://localhost:5050/api/getuser")
            setCompleteuser(data)
        }

        fetchAllUsers();
    }, [])


    return (
        <>
            <p class="font-mono text-center text-2xl font-bold text-green-400 uppercase antialiased hover:text-green-600 hover:ease-out">
                List of Users
            </p>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="flex justify-between py-3 pl-2">
                        <div className="relative max-w-xs">
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

                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <button className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1">
                                    <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-3 h-3"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                                />
                                            </svg>
                                        </div>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-1.5 w-full inline-block align-middle bg-blue-900">
                        <div className="overflow-hidden border rounded-lg bg-gray-200">
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
                                            User_Id
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            User Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            E-Mail
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            City
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Designtion
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


                                {completeuser?.slice(0, completeuser.length - 1).map((x, index) => {
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
                                                    {x._id}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                    {x.name}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                    {x.email}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                    {x.city}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                    {x.designation}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                    <a
                                                        className="text-green-500 hover:text-green-700"
                                                        href="#"
                                                    >
                                                        Edit
                                                    </a>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                    <a
                                                        className="text-red-500 hover:text-red-700"
                                                        href="#"
                                                    >
                                                        Delete
                                                    </a>
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


    )
}




export default Allusers