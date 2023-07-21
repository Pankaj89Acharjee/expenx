import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import Spinner from './Spinner'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import { category } from '../data/categorydata'
import logo from '../assets/logoexp.jpeg'
import { Modal } from 'antd';

const Expendituresheet = () => {

    var defaultDate = new Date().toISOString().slice(0, 10);
    const [exppurpose, setExppurpose] = useState(null);
    const [amount, setAmount] = useState(null);
    const [dateofexp, setDateofexp] = useState(null);
    const [dateDefault, setDateDefault] = useState(defaultDate);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState(null);
    const [showForm, setShowForm] = useState(false);

    var responseMessage;

    const registerExpenditure = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const decodetoken = jwtDecode(token);
            const userId = decodetoken.id;
            const result = await axios.post("http://localhost:5050/api/newexpense", {
                userid: userId,
                exppurpose,
                amount,
                categories,
                dateofexp
            })

            if (result.status === 200) {
                responseMessage = result.data.message;
                success();
                setLoading(false);
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

    const handleAddNewClick = () => {
        setShowForm(true);
    };

    const handleCancelClick = () => {
        setShowForm(false);
    };


    if (loading) {
        return <Spinner message="Loading!" />
    }

    return (
        <div>
            {/* This is the new section. Now implement this one*/}
            <div className='flex flex-row-reverse mt-10 mr-10'>
                <button
                    onClick={handleAddNewClick}
                    className="bg-gray-900 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >Add New
                </button>
            </div>

            {!showForm ? '' : (
                <section>
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
                        <div className="bg-white p-12 rounded-md shadow-lg min-w-md max-w-lg mx-auto transition-all transform translate-y-10 translate-x-10">
                            {/* Your form content goes here */}
                            <form onSubmit={registerExpenditure}>
                                <div className="mb-4">
                                    <label for="purpose" className="block text-gray-700 font-bold mb-2">Spent On</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="exppurpose"
                                        placeholder="Item spent on"
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                        value={exppurpose}
                                        onChange={(e) => setExppurpose(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Amount Spent</label>
                                    <input
                                        type="text"
                                        id="amount"
                                        name="amount"
                                        placeholder="Enter amount"
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="categories" className="block text-gray-700 font-bold mb-2">Category</label>
                                    <select className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        name="categories"
                                        onChange={(e) => setCategories(e.target.value)}
                                        required
                                    >
                                        <option>Select...</option>
                                        {
                                            category.map((data, index) => {
                                                return <option key={index} value={data.cat}>{data.cat}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Date of expenditure</label>
                                    <DatePicker
                                        id='dateofexp'
                                        type="text"
                                        selected={dateofexp}
                                        onChange={date => setDateofexp(date)}
                                        dateFormat='yyyy-mm-dd'
                                        formatStyle="large"
                                        //minDate={new Date()}
                                        maxDate={new Date()}
                                        showYearDropdown
                                        scrollableMonthYearDropdown
                                        yearDropdownItemNumber={25}
                                        value={dateDefault}
                                        onChangeRaw={setDateDefault}
                                        className="border border-solid form-control px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    />
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
export default Expendituresheet