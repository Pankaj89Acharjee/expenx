import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner'

const AllExpenditure = () => {

    const [userexp, setUserexp] = useState(null);
    const [loading, setLoading] = useState(false);

    const gotoExpScreen = () => {
        window.location.href = '/dashboard'
    }


    useEffect(() => {
        setLoading(true)

        const loadingTimer = setTimeout(() => {
            clearTimeout(loadingTimer);
         
                const url = "http://localhost:5050/api/getexpense";
                axios.get(url)
                    .then((response) => {
                        setUserexp(response.data);
                        setLoading(false);
                    });
           

        }, 1000);
    }, [])


    return (
        <div>
            <h2>All Expenditure</h2>

            {userexp &&
                <div>
                    <h2>Purpose:{userexp.exppurpose}</h2>
                    <h2>Amount:{userexp.amount}</h2>
                    <h2>Date of Expense{userexp.dateofexp}</h2>
                </div>
            }

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
      ease-in-out">Go Expense Page</button>
            </div>
        </div>
    )
}

export default AllExpenditure