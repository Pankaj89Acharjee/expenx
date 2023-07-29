import React, { useEffect, useState } from 'react'
import { DatePicker, Space } from 'antd';
import Spinner from './Spinner'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { incomeCategory } from '../data/incomecategory'
import { Modal, message } from 'antd';
import addition from '../assets/addition.png'


const Incomesheet = () => {

    const [amount, setAmount] = useState('')
    const [totalIncome, setTotalIncome] = useState('')
    const [incomefrom, setIncomefrom] = useState('')
    const [month, setMonth] = useState('')
    const [dateselect, setDateselect] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [sortamount, setSortAmount] = useState('')


    var responseMessage;

    const handleAddNewClick = () => {
        setShowForm(true);
    };

    const handleCancelClick = () => {
        setShowForm(false);
    };


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

    useEffect(() => {
        const loadData = async () => {
            const token = localStorage.getItem('token');
            const decodetoken = jwtDecode(token);
            const userId = decodetoken.id;
            const getIncomeData = await axios.post("http://localhost:5050/api/getLastMonthIncome", { frequency: 90, freqSixty: 60, freqThirty: 30 })
            if (getIncomeData.status === 200) {
                let ninetyDaysData = getIncomeData.data.lastNinety
                let sixtyDaysData = getIncomeData.data.lastSixty
                let thirtyDaysData = getIncomeData.data.lastThirty
                
                console.log("Income data in income sheet", getIncomeData)
                setSortAmount({
                    labels: []
                })


            } else {
                message.error(getIncomeData.data.message);
            }
        }

        loadData()
    }, [])
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


    if (loading) {
        return <Spinner message="Loading!" />
    }



    return (
        <div>
            {/* This is the new section. Now implement this one*/}
            <div className='flex mt-10 mr-10 relative items-center justify-end'>

                <button
                    onClick={handleAddNewClick}
                    className="bg-gray-900 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded relative focus:outline-none focus:shadow-outline flex items-center"
                > <span><img className='w-10 h-auto mr-2 object-cover' src={addition} /></span> Add New
                </button>
            </div>

            {!showForm ? '' : (
                <section>
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
                        <div className="bg-white p-12 rounded-md shadow-lg min-w-md max-w-lg mx-auto transition-all transform translate-y-10 translate-x-10">
                            {/* Your form content goes here */}
                            <form onSubmit={registerIncome}>
                                <div className="mb-4">
                                    <label for="purpose" className="block text-gray-700 font-bold mb-2">Income Amount</label>
                                    <input
                                        type="text"
                                        id="amount"
                                        name="amount"
                                        placeholder="Item spent on"
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                </div>


                                <div className="mb-4">
                                    <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Date of credit</label>
                                    <DatePicker
                                        id='dateofincome'
                                        type="date"
                                        selected={dateselect}
                                        onChange={date => setDateselect(date)}
                                        dateFormat='yyyy-mm-dd'
                                        formatStyle="large"
                                        //minDate={new Date()}
                                        maxDate={new Date()}
                                        showYearDropdown
                                        scrollableMonthYearDropdown
                                        yearDropdownItemNumber={25}
                                        value={dateselect}
                                        className="border border-solid form-control px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    />
                                </div>



                                <div className="mb-4">
                                    <label htmlFor="frequency" className="block text-gray-700 font-bold mb-2">Category</label>
                                    <select className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        name="frequency"
                                        value={incomefrom}
                                        onChange={(e) => setIncomefrom(e.target.value)}
                                        required
                                    >
                                        <option>Select...</option>
                                        {
                                            incomeCategory.map((data, index) => {
                                                return <option key={index} value={data.cat}>{data.cat}</option>
                                            })
                                        }
                                    </select>
                                </div>


                                {/* Add more form fields as needed */}

                                <div className='flex justify-end'>
                                    <button
                                        type='submit'
                                        className="bg-green-500 hover:bg-green-600 rounded-lg p-2 text-white font-bold py-px-rounded focus:outline-none focus:shadow-outline mr-2"
                                    >
                                        Save
                                    </button>

                                    <button
                                        onClick={handleCancelClick}
                                        className="bg-red-500 hover:bg-red-600 rounded-lg p-2 text-white font-bold py-px-rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}

export default Incomesheet