import React, { useState } from 'react'
import { DatePicker, Space } from 'antd';
import Spinner from './Spinner'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { incomeCategory } from '../data/incomecategory'
import { Modal } from 'antd';


const Incomesheet = () => {

    const [amount, setAmount] = useState('')
    const [totalIncome, setTotalIncome] = useState('')
    const [incomefrom, setIncomefrom] = useState('')
    const [month, setMonth] = useState('')
    const [dateselect, setDateselect] = useState(null);
    const [loading, setLoading] = useState(false);

    var responseMessage;

    const registerIncome = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const decodetoken = jwtDecode(token);
            const userId = decodetoken.id;
            const responseData = await axios.post("http://localhost:5050/api/newincome", {
                userid: userId,
                amount,
                dateselect,
                incomefrom,

            })
            if (responseData.status === 200) {
                responseMessage = responseData.data.Message;
                setLoading(false);
                success();
                //console.log("ResonseData in Income is", responseData);
            }
        } catch (err) {
            error();
            console.log("Data saving error", err.message);
            setLoading(false);
        }
    }

    //For Showing Successfull message after saving
    const success = () => {
        Modal.success({
            content: responseMessage,
            onOk() {
                window.location.reload();
            },
        });
    };

    //For Showing Error notification
    const error = () => {
        Modal.error({
            title: 'ERROR!',
            content: 'Error in saving data',
            onOk() {
            },
        });
    };


    const gotoCharts = () => {
        window.location.href = '/category/charts'
    }

    if (loading) {
        return <Spinner message="Loading!" />
    }

    return (
        <div className='mt-10 justify-center flex flex-col'>
            <h1 className='lg:w-full md:w-auto text-white text-normal text-center justify-center text-xl bg-gradient-to-br from-purple-600 via-gray-900 to-blue-900 font-bold  rounded'>Income Registration Page</h1>
            <div>
                <section className="h-full rounded gradient-form bgcustomcolor1 md:h-full md:w-auto">
                    <div className="px-6 h-full text-blue-300">
                        <div className="flex xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full g-6">
                            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                                <form onSubmit={registerIncome}>
                                    <div
                                        className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                        <p className="text-center font-semibold mx-4 mb-0">All fields are mandatory</p>
                                    </div>


                                    <div className="mb-6">
                                        <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Income Amount </label>
                                        <input
                                            type="text"
                                            className="form-control block w-full px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            id="amount"
                                            placeholder="Amount in INR"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Date of credit</label>

                                        <DatePicker
                                            value={dateselect}
                                            onChange={setDateselect}
                                            required
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label for="frequency" className="block mt-4 mb-2 text-md font-medium text-gray-900 dark:text-white">Income Source</label>
                                        <select className="form-control block lg:w-full md:w-full sm:w-3/5 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-900 focus:text-sans-serif focus:bg-purple-200 focus:border-red-600 focus:outline-none"
                                            value={incomefrom}
                                            onChange={(e) => setIncomefrom(e.target.value)}
                                            required
                                        >
                                            <option>Click to select...</option>
                                            {
                                                incomeCategory.length === 0 ? "Nothing to show" : (
                                                    incomeCategory.map((data, index) => {
                                                        return (
                                                            <option key={index} value={data.cat}>{data.cat}</option>
                                                        )
                                                    })
                                                )
                                            }
                                        </select>
                                    </div>

                                    <div className=" flex flex-row inline-block text-center lg:text-left mb-4">
                                        <button
                                            id="btn"
                                            type="submit"
                                            className="inline-block bg-gradient-to-br from-purple-600 via-gray-900 to-blue-900 mr-4 px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md md:w-auto sm:w-auto hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                        >
                                            Save
                                        </button>

                                        <button
                                            type="submit"
                                            className="inline-block bg-gradient-to-br from-purple-600 via-gray-900 to-blue-900 ml-4 px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md md:w-auto sm:w-auto hover:bg-gray-900 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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