import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-center items-center flex-row w-auto h-auto px-5'>
      {/* For Menu */}
      <div className="items-center p-2 justify-center hidden md:block w-full">
        <ul className="flex flex-col font-medium p-4 md:p-2 mt-4 border border-gray-100 rounded-lg bg-gray-600 md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:border-gray-700 shadow-gray-300 shadow-md">
          <li>
            <NavLink
              to={`/home`}
              className="block font-normal py-2 pl-3 pr-4 bg-gray-900 rounded md:bg-transparent md:p-0 dark:text-white text-gray-700" aria-current="page"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboardscreen`}
              className="block font-normal py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-gray-200 hover:translate-x-1 hover:transition-all hover:duration-500"
            >Dashboard</NavLink>
          </li>
          <li>
            <NavLink
              to={`/category/income`}
              className="block font-normal py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-gray-200 hover:translate-x-1 hover:transition-all hover:duration-500"
            >Income</NavLink>
          </li>
          <li>
            <NavLink
              to={`/category/expenditure`}
              className="block font-normal py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-gray-200 hover:translate-x-1 hover:transition-all hover:duration-500"
            >Expenditure</NavLink>
          </li>
          <li>
            <NavLink
              to={`/category/charts`}
              className="block font-normal py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-gray-200 hover:translate-x-1 hover:transition-all hover:duration-500"
            >Charts</NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar