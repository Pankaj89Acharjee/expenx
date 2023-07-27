import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Expsuccessscreen = () => {

    const gotoExpScreen = () => {
        window.location.href = 'category/expenditure'
    }

    
    return (
        <div>
            <div className="bg-green-300 rounded-lg py-5 px-6 text-center font-bold text-green-700 mb-3">
                <h2>Expenditure Data Saved Successful!</h2>
            </div>
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
      ease-in-out">Register More Expense</button>
            </div>


        </div>
   
    )
}

export default Expsuccessscreen