import React, { useState, useEffect } from 'react'
import Spinner from './Spinner'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { Bar as Bar2 } from 'react-chartjs-2';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Chartexp = () => {

    const [userchart, setUserchart] = useState([]);
    const [doughnut, setDoughnut] = useState([]);
    const [usersname, setUsersname] = useState([]);
    const [loading, setLoading] = useState(false);
    const [indexdata, setIndexdata] = useState([]);
    const [customdate, setCustomdate] = useState([]);
    const [incustomdate, setIncustomdate] = useState([]);
    const [frequency, setFrequency] = useState('365');
    const [infrequency, setInfrequency] = useState('365');
    const [expamount, setExpamount] = useState([]);
    const [incomeamount, setIncomeamount] = useState([]);
    const [incomeexpdata, setIncomeexpdata] = useState([]);


    const loadingTimer = (async () => {
        const token = localStorage.getItem('token');
        const decodeToken = jwtDecode(token);
        const userId = decodeToken.id;
        const userName = decodeToken.name;
        setUsersname(userName);
        axios.post("http://localhost:5050/api/getincome", { userid: userId, frequency: infrequency, selectedDate: incustomdate })
            .then((res) => {
                const response = res.data;
                let incMonth = [];
                let incAmount = [];
                response?.forEach((element) => {
                    incMonth.push(element.dateselect.substring(0, 10));
                    incAmount.push(element?.amount);
                })
                setIncomeamount(incAmount);
                setUserchart({
                    labels: incMonth,
                    datasets: [
                        {
                            label: 'All Total Income',
                            backgroundColor: [
                                'hsla(189, 83%, 10%, 9.3)'
                            ],
                            borderWidth: 0,
                            data: incAmount
                        }
                    ]
                });
            })
    });


    useEffect(() => {
        loadingTimer();
    }, [])

    const sideIndexdata = (e) => {
        const token = localStorage.getItem('token');
        const decodeToken = jwtDecode(token);
        const userId = decodeToken.id;
        axios.post("http://localhost:5050/api/viewchart", { userid: userId, frequency: frequency, customdate: customdate })
            .then((res) => {
                const expenseData = res.data;
                let expMonth = [];
                let expAmount = [];
                expenseData?.forEach((element) => {
                    expMonth.push(element?.dateofexp.substring(0, 10));
                    expAmount.push(element?.amount);
                });
                setExpamount(expAmount);
                setIndexdata({
                    labels: expMonth,
                    datasets: [
                        {
                            label: 'All Total Expense',
                            backgroundColor: [
                                'hsla(159, 83%, 10%, 9.3)'
                            ],
                            borderWidth: 0,
                            data: expAmount
                        }
                    ]
                });

                setDoughnut({
                    labels: expAmount,
                    datasets: [
                        {
                            label: 'Expense Total',
                            backgroundColor: ['hsla(169, 73%, 10%, 9.3)', 'rgba(10, 125, 217, 0.9)', 'hsla(189, 83%, 10%, 9.3)'],
                            borderWidth: 0,
                            data: expAmount
                        }
                    ]
                })
            });
    }

    useEffect(() => {
        sideIndexdata();
    }, []);


    const totalExp = expamount.reduce((a, v) => a = a + v, 0);
    const totalInc = incomeamount.reduce((c, d) => c = c + d, 0);

    const dataForChart = () => {
        setIncomeexpdata({
            labels: ["Expenditure", "Income"],
            datasets: [
                {
                    label: 'Income Vs Expenditure',
                    backgroundColor: ['hsla(169, 73%, 10%, 9.3)', 'rgba(10, 125, 217, 0.9)'],
                    borderWidth: 0,
                    data: [totalExp, totalInc]
                }
            ]
        })
    }



    if (loading) {
        return <Spinner message="Loading!" />
    }

    console.log("Chart 1st fetch", userchart);

    return (
        <div className='items-center justify-center w-auto m-2'>
            <div className="mb-4 w-full">
                <h1 className='lg:w-full md:w-auto text-white h-8 text-normal text-center justify-center text-xl bg-gradient-to-br from-purple-600 via-gray-900 to-blue-900 font-bold  rounded'>View Your Expensiture Chart</h1>
                <label for="frequency" className="block mt-2 mb-2 text-md font-medium text-gray-900 dark:text-gray">Select Custom Date Range</label>
                <select className="form-control block w-1/3 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                >
                    <option>Click to select...</option>
                    <option value={7}>Last One Week</option>
                    <option value={30}>Last One Month</option>
                    <option value="365">Last One Year</option>
                    <option value="custom">Select Range</option>
                </select>
                {frequency === 'custom' &&
                    <Space direction='vertical' size={12}>
                        <RangePicker allowClear={false} bordered={true} placement={'topRight'} value={customdate} onChange={(e) => setCustomdate(e)} />
                    </Space>
                }
                <div className='mt-5 flex flex-row'>
                    <button
                        className="w-1/5  text-center align-center px-6
            py-2.5
            bg-amber-500
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-green-900 hover:shadow-lg
            focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-green-800 active:shadow-lg
            transition
            delay-150
            duration-200
            ease-in-out"
                        onClick={sideIndexdata}>View Custom Data</button>
                </div>
            </div>

            <h1 className='text-center font-bold text-xl'>Total Expense Incurred: Rs. {totalExp} /-</h1>


            {indexdata.length === 0 ? "Nothing to Display" : (
                <>
                    <Bar data={indexdata}
                        options={{
                            title: {
                                display: true,
                                text: 'Expense Tracking Monthly',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'left'
                            }
                        }}
                    />
                </>
            )}
            <div className='justify-center items-center align-center flex flex-row'>
                <button
                    className="w-1/5 justify-center items-center text-center align-center px-6
            py-2.5
            bg-fuchsia-700
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-green-900 hover:shadow-lg
            focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-green-800 active:shadow-lg
            transition
            delay-150
            duration-200
            ease-in-out"
                    onClick={() => window.location.reload()}>Refresh</button>
            </div>



            {/* For Income Chart */}
            <h1 className='lg:w-full md:w-auto mt-5 text-white text-normal text-center justify-center h-8 text-xl bg-gradient-to-br from-purple-600 via-gray-900 to-blue-900 font-bold  rounded'>View Your Income Chart</h1>

            <div className="mb-4 w-full">
                <label for="frequency" className="block mt-2 mb-2 text-md font-medium text-gray-900 dark:text-gray">Select Custom Date Range</label>
                <select className="form-control block w-1/3 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    value={infrequency}
                    onChange={(e) => setInfrequency(e.target.value)}
                >
                    <option>Click to select...</option>
                    <option value={7}>Last One Week</option>
                    <option value={30}>Last One Month</option>
                    <option value={60}>Last Six Month</option>
                    <option value="365">Last One Year</option>
                    <option value="custom">Select Range</option>
                </select>
                {infrequency === 'custom' &&
                    <Space direction='vertical' size={12}>
                        <RangePicker id='income' allowClear={false} bordered={true} placement={'topRight'} value={incustomdate} onChange={(e) => setIncustomdate(e)} />
                    </Space>
                }

                <div className='mt-5 flex flex-row'>
                    <button
                        className="w-1/5  text-center align-center px-6
            py-2.5
            bg-amber-500
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-green-900 hover:shadow-lg
            focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-green-800 active:shadow-lg
            transition
            delay-150
            duration-300
            ease-in-out"
                        onClick={loadingTimer}>View Custom Data</button>
                </div>
            </div>

            <h1 className='text-center font-bold text-xl'>Total Income: Rs. {totalInc} /-</h1>

            {userchart.length === 0 ? "Nothing to Display" : (
                <>
                    <Bar2 data={userchart}
                        options={{
                            title: {
                                display: true,
                                text: 'Monthly Income',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'left'
                            }
                        }}
                    />
                </>
            )}

            <div className='justify-center items-center align-center flex flex-row'>
                <button
                    className="w-1/5 justify-center items-center text-center align-center px-6
            py-2.5
            bg-fuchsia-700
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-green-900 hover:shadow-lg
            focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-green-800 active:shadow-lg
            transition
            delay-150
            duration-200
            ease-in-out"
                    onClick={() => window.location.reload()}>Refresh</button>
            </div>

            <h1 className='lg:w-full mt-5 md:w-auto text-white h-8 text-normal text-center justify-center text-xl bg-gradient-to-br from-purple-600 via-gray-900 to-blue-900 font-bold  rounded'>View Your Expensiture Chart</h1>
            <div className='justify-center items-center flex lg:w-full md:w-full sm:w-full sm:justify-center'>
                <div className='justify-center items-center'>
                    {userchart.length === 0 ? "Nothing to display" : (
                        <div>
                            <>
                                <Doughnut
                                    data={userchart}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                    }}
                                />
                            </>
                        </div>
                    )}
                </div>
                <div className='justify-center items-center'>
                    {doughnut.length === 0 ? "Nothing to display" : (
                        <>
                            <Doughnut
                                data={doughnut}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                }}
                            />
                        </>
                    )}
                </div>
            </div>

            <h1 className='lg:w-full mt-5 md:w-auto text-white text-normal text-center justify-center text-xl h-8 bg-gradient-to-r from-purple-500 to-pink-900 font-bold  rounded'>View Total Income and Expense Chart</h1>
            <div className='justify-center items-center align-center flex flex-col'>
                <button
                    className="w-2/5 mt-5 justify-center items-center text-center align-center px-6
            py-2.5
            bg-rose-600
            text-white
            font-2xl
            font-semibold
            text-xs
            leading-tight
            uppercase
            rounded
           
            hover:bg-green-900 hover:shadow-lg
            focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-green-800 active:shadow-lg
            transition
            delay-150
            duration-200
            ease-in-out
            shadow-lg shadow-green-900"

                    onClick={dataForChart}>View Income Vs Expenditure
                </button>

                <div className='flex flex-row mt-6 bg-gradient-to-br from-yellow-600 via-green-400 to-blue-400 rounded shadow shadow-2xl shadow-gray-900 hover:shadow-blue-800'>
                    {incomeexpdata?.length === 0 ? "" : (
                        <div className='py-2 px-2 m-2'>

                            <Pie
                                data={incomeexpdata}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                }}
                            />
                        </div>
                    )}


                    {incomeexpdata?.length === 0 ? "" : (
                        <div className='py-2 px-2 m-2'>

                            <Doughnut
                                data={incomeexpdata}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default Chartexp