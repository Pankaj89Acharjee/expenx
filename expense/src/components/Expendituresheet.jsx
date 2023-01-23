import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import Spinner from './Spinner'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import { category } from '../data/categorydata'
import logo from '../assets/logoexp.jpeg'
import { Modal} from 'antd';




const Expendituresheet = () => {

    var defaultDate = new Date().toISOString().slice(0, 10);
    const [exppurpose, setExppurpose] = useState(null);
    const [amount, setAmount] = useState(null);
    const [dateofexp, setDateofexp] = useState(null);
    const [dateDefault, setDateDefault] = useState(defaultDate);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState(null);

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





    //const randomImage = 'https://source.unsplash.com/850x250/?nature,photography,technology,cars,personality'

    if (loading) {
        return <Spinner message="Loading!" />
    }

    return (
        <div>

            {/* This is the new section. Now implement this one*/}
            <section className="h-full rounded gradient-form bg-gradient-to-br from-blue-400 via-green-500 to-blue-500 md:h-full md:w-auto">
                <div className="container py-12 px-6 h-full md:h-auto">
                    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                        <div className="xl:w-11/12 md:w-8/12">
                            <div className="block bg-gray-400 shadow-lg rounded-lg">
                                <div className="lg:flex lg:flex-wrap g-0">
                                    <div className="lg:w-6/12 px-4 md:px-0 sm:w-auto">
                                        <div className="md:p-12 md:mx-6">
                                            <div className="text-center">
                                                <img
                                                    className="mx-auto w-20 h-20 rounded-full md:w-15 md:h-10"
                                                    src={logo}
                                                    alt="logo"
                                                />
                                                <h4 className="text-xl text-yellow-700 font-semibold mt-1 mb-12 pb-1">NEW EXPENX REGISTRATION</h4>
                                            </div>
                                            <form onSubmit={registerExpenditure} >

                                                <div className="mb-4">
                                                    <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Purpose of expenditure</label>
                                                    <input
                                                        name="exppurpose"
                                                        type="text"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        placeholder="Expense made for"
                                                        value={exppurpose}
                                                        onChange={(e) => setExppurpose(e.target.value)}

                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Amount</label>
                                                    <input
                                                        name="amount"
                                                        type="text"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        placeholder="Amount in Rs"
                                                        value={amount}
                                                        onChange={(e) => setAmount(e.target.value)}
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Category of expenditure</label>
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
                                                        className="border border-solid border-gray-300 form-control px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    />

                                                </div>

                                                <div className="text-center pt-1 mb-12 pb-1">
                                                    <button

                                                        className="bg-gradient-to-br from-orange-600 via-yellow-700 to-blue-600 inline-block bg-gray-400 px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                        type="submit"
                                                        data-mdb-ripple="true"
                                                        data-mdb-ripple-color="dark"
                                                    >
                                                        Register Expense
                                                    </button>

                                                </div>
                                                <div className="flex items-center justify-between pb-6">
                                                    <p className="mb-0 mr-2">Enthusiast about expenditure ?</p>
                                                    <button
                                                        type="button"
                                                        className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-red-800 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                                        data-mdb-ripple="true"
                                                        data-mdb-ripple-color="light"
                                                    >
                                                        View Your Expense Details
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-gradient-to-br from-yellow-400 via-green-200 to-purple-600">
                                        <div className="text-gray-900 px-4 py-6 md:p-12 md:mx-6">
                                            <h4 className="text-2xl text-center font-normal font-bold mb-6">Get best out of EXPENX</h4>
                                            <p className="text-sm">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                consequat.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

}
export default Expendituresheet