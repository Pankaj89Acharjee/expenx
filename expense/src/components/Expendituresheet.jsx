import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import Spinner from './Spinner'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import { category } from '../data/categorydata'
import addition from '../assets/addition.png'
import { Modal, message } from 'antd';
import { Chart as ChartJS, registerables, Filler } from 'chart.js';
import { Bar, Doughnut, Pie, Scatter, Line } from 'react-chartjs-2';
ChartJS.register(...registerables, Filler);

const Expendituresheet = () => {

    var defaultDate = new Date().toISOString().slice(0, 10);
    const [exppurpose, setExppurpose] = useState(null);
    const [amount, setAmount] = useState(null);
    const [dateofexp, setDateofexp] = useState(null);
    const [dateDefault, setDateDefault] = useState(defaultDate);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [exprecuurence, setExpreccurence] = useState();
    const [halfYearItem, setHalfYearItem] = useState();
    const [sortAmount, setSortamt] = useState();



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


    useEffect(() => {
        const loadData = async () => {
            const token = localStorage.getItem('token');
            const decodetoken = jwtDecode(token);
            const userId = decodetoken.id;
            const fetchData = await axios.post('http://localhost:5050/api/getLastMonthExp', { userid: userId, frequency: 90, freqSixty: 60, freqThirty: 30 });
            if (fetchData.status === 200) {
                console.log("FETC DATA", fetchData.data.reccurExp)
                let ninetyDays = fetchData.data.totalExp;
                let sixtyDays = fetchData.data.sixtyExp;
                let thirtyDays = fetchData.data.thirtyExp;
                let ninetyMonth = fetchData.data.ninetyMonth;
                let sixtyMonth = fetchData.data.sixtyMonth;
                let thirtyMonth = fetchData.data.thirtyMonth;
                let itemName = fetchData.data.reccurExp._id;
                let price = fetchData.data.reccurExp.totalAmount;
                let timesBought = fetchData.data.reccurExp.timesBought;


                setSortamt({
                    labels: [ninetyMonth, sixtyMonth, thirtyMonth],
                    datasets: [
                        {
                            label: "Last three months expense",
                            backgroundColor: [
                                'rgba(1, 254, 237, 0.94)', 'rgba(252, 113, 74, 0.97)', 'rgba(53, 253, 126, 0.97)'],
                            borderColor: [
                                'rgb(75, 192, 192)', 'rgb(255, 99, 132)',
                            ],
                            borderWidth: 0,
                            data: [ninetyDays, sixtyDays, thirtyDays]
                        }
                    ]
                });


                setExpreccurence({
                    labels: [itemName],
                    datasets: [
                        {
                            label: "Last Month Frequently Bought",
                            backgroundColor: [
                                'rgba(1, 254, 237, 0.94)', 'rgba(252, 113, 74, 0.97)', 'rgba(53, 253, 126, 0.97)'],
                            borderColor: [
                                'rgb(75, 192, 192)', 'rgb(255, 99, 132)',
                            ],
                            borderWidth: 0,
                            data: [price, timesBought]
                        }
                    ]
                })



            } else {
                message.error(fetchData.data.message);
            }
            //console.log("TfetchData", fetchData.data.totalData)
        }
        loadData();

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

            <div className='container mx-auto flex flex-wrap mt-6'>
                {/* 1st Chart */}
                <div className='chart-column w-full lg:w-1/2 sm:w-1/2 px-2 items-center justify-center'>
                    <div className='chart-container p-4 items-center justify-center pl-8 pr-1 ml-2 mr-4 mt-4 bg-gray-800 rounded-2xl'>
                        {sortAmount?.length === 0 || !sortAmount ? '' : (
                            <div className='rounded-2xl shadow-lg justify-center items-cente'>
                                <Bar
                                    data={sortAmount}
                                    options={{
                                        title: {
                                            display: true,
                                            fontSize: 3
                                        },
                                        plugins: {
                                            legend: {
                                                display: false,
                                            }
                                        },
                                        scales: {
                                            y: {
                                                grid: {
                                                    drawBorder: true,
                                                    color: '#11D9F8'
                                                },
                                                ticks: {
                                                    beginAtZero: true,
                                                    color: 'rgba(38, 206, 253, 0.97)',
                                                    fontSize: 12
                                                }
                                            },
                                            x: {
                                                grid: {
                                                    drawBorder: true,
                                                    color: '#8ED9F9'
                                                },
                                                ticks: {
                                                    beginAtZero: true,
                                                    color: 'rgba(38, 206, 253, 0.97)',
                                                    fontSize: 12
                                                }
                                            },
                                        }
                                    }}
                                />
                                <span><p className='p-1 mb-2 text-center capitalize text-white font-bold'>Expenditure trends since last 3 months</p></span>
                            </div>
                        )}
                    </div>
                </div>


                {/* 2nd Chart */}
                <div className='chart-column w-full lg:w-1/2 sm:w-1/2 px-2 items-center justify-center'>
                    <div className='chart-container p-4 items-center justify-center pl-8 pr-1 ml-2 mr-4 mt-4 bg-gray-800 rounded-2xl'>
                        {exprecuurence?.length === 0 || !exprecuurence ? '' : (
                            <div className='rounded-2xl shadow-lg justify-center items-cente'>
                                <Bar
                                    data={exprecuurence}
                                    options={{
                                        title: {
                                            display: true,
                                            fontSize: 3
                                        },
                                        plugins: {
                                            legend: {
                                                display: false,
                                            }
                                        },
                                        scales: {
                                            y: {
                                                grid: {
                                                    drawBorder: true,
                                                    color: '#11D9F8'
                                                },
                                                ticks: {
                                                    beginAtZero: true,
                                                    color: 'rgba(38, 206, 253, 0.97)',
                                                    fontSize: 12
                                                }
                                            },
                                            x: {
                                                grid: {
                                                    drawBorder: true,
                                                    color: '#8ED9F9'
                                                },
                                                ticks: {
                                                    beginAtZero: true,
                                                    color: 'rgba(38, 206, 253, 0.97)',
                                                    fontSize: 12
                                                }
                                            },
                                        }
                                    }}
                                />
                                <span><p className='p-1 mb-2 text-center capitalize text-white font-bold'>Last Month Spent Most</p></span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )

}
export default Expendituresheet