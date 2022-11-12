import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Incomesheet = () => {

    const [amount, setAmount] = useState('')
    const [totalIncome, setTotalIncome] = useState('')
    const [incomefrom, setIncomefrom] = useState('')
    const [month, setMonth] = useState('')

    const navigate = useNavigate();

    const registerIncome = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5050/api/newincome", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                amount,
                totalIncome,
                incomefrom,
                month
            }),
        })

        const data = await response.json();
        console.log(data);
        if (data.status === 'ok') {
            alert("Saving Successful")

        

        const btn = document.getElementById('btn');
        btn.addEventListener('click')
        const inputs = document.querySelectorAll('#amount, #month, #incomeSource, #totalamount');
        inputs.forEach(input => {
            input.value = '';
        });
        
    }

    }

const gotoCharts = () => {
    window.location.href = '/category/charts'
}
const monthDropDown = [
    {
        id: 1,
        months: 'January'
    },
    {
        id: 2,
        months: 'February'
    }, {
        id: 3,
        months: 'March'
    }, {
        id: 4,
        months: 'April'
    }, {
        id: 5,
        months: 'May'
    },
    {
        id: 6,
        months: 'June'
    },
    {
        id: 7,
        months: 'July'
    },
    {
        id: 8,
        months: 'August'
    },
    {
        id: 9,
        months: 'September'
    },
    {
        id: 10,
        months: 'October'
    },
    {
        id: 11,
        months: 'November'
    },
    {
        id: 12,
        months: 'December'
    },
]

return (
    <div>
        <h1 className='text-center justify-center text-2xl bg-blue-500 font-bold ml-3 mr-3 rounded'>Income Registration Page</h1>
        <div>

            <section className="h-screen ml-3 mr-3">
                <div className="px-6 h-full text-blue-300 bg-black">
                    <div className="flex xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full g-6">
                        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                            <form onSubmit={registerIncome}>
                                <div
                                    className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                    <p className="text-center font-semibold mx-4 mb-0">All fields are mandatory</p>
                                </div>


                                <div className="mb-6">
                                    <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Amount Received </label>
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="amount"
                                        placeholder="Amount in INR"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>

                                <label for="month" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Select month you got the amount </label>

                                <select className="form-control block w-full px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="month"
                                    onChange={(e) => setMonth(e.target.value)}
                                    required>
                                    <option>Select Month...</option>
                                    {
                                        monthDropDown.map((data, index) => {
                                            return <option key={index} value={data.months}>
                                                {data.months}</option>
                                        })
                                    }
                                </select>

                                <div className="mb-6">
                                    <label for="incomesource" className="block mt-4 mb-2 text-md font-medium text-gray-900 dark:text-white">Your source of income connected with amount </label>
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="incomeSource"
                                        placeholder="Income Source"
                                        value={incomefrom}
                                        onChange={(e) => setIncomefrom(e.target.value)}
                                    />
                                </div>

                                <div className="mb-6">
                                    <label for="totalamount" className="block mt-4 mb-2 text-md font-medium text-gray-900 dark:text-white">Total Income..Need to modify by new mongoose model</label>
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="totalamount"
                                        placeholder="Total Income"
                                        value={totalIncome}
                                        onChange={(e) => setTotalIncome(e.target.value)}
                                    />
                                </div>

                                <div className=" flex flex-row inline-block text-center lg:text-left">
                                    <button
                                        id="btn"
                                        type="submit"
                                        className="inline-block mr-4 px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    >
                                        Save
                                    </button>

                                    <button
                                        type="submit"
                                        className="inline-block ml-4 px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                        onClick={gotoCharts}
                                    >
                                        Show Total Income
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    </div>

)
}

export default Incomesheet