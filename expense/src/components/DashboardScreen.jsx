import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode';
import { AiOutlineUser } from 'react-icons/ai';
import { FaSchool } from 'react-icons/fa'
import { FcWorkflow } from 'react-icons/fc'
import { FiBook, FiDollarSign, FiPhone, FiArrowDown } from 'react-icons/fi'
import { DatePicker, message } from 'antd';
import expPhoto from '../assets/rsLogo.png'
import logo2 from '../assets/logo34.png'
import logo3 from '../assets/Calculate.png'
import cardImgA from '../assets/cardbg1.jpg'
import { Chart as ChartJS, registerables, Filler } from 'chart.js';
import { Bar, Doughnut, Pie, Scatter, Line } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(...registerables, Filler);

const DashboardScreen = () => {

    const [annualIncome, setAnnualIncome] = useState([]);
    const [annualExpense, setAnnualExpense] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [sortamt, setSortamt] = useState();
    const [incexpdata, setIncexpdata] = useState();
    const [doughnutdata, setDoughnutdata] = useState();
    const [getuser, setGetuser] = useState({});
    const [image, setImage] = useState('');
    const [sortedData, setSortedData] = useState([]);
    const [exprecurring, setExprecurring] = useState([]);
    const [exprecchart, setExprecchart] = useState([]);
    const [numrows, setNumrows] = useState(5);

    const getIncomeData = async () => {
        const token = localStorage.getItem('token');
        const decodeToken = jwtDecode(token);
        const userId = decodeToken.id;
        const fetchIncomeData = await axios.post("http://localhost:5050/api/getincome", { userid: userId, frequency: 365 });
        const response = await axios.post(`http://localhost:5050/api/singleuser/${userId}`);
        if (fetchIncomeData?.status === 200 && response?.status === 200) {
            setGetuser(response.data.data);
            console.log("User data are", fetchIncomeData.data.sortedData)
            setImage(response.data.data.profileimage);
            setAnnualIncome(fetchIncomeData.data.annualSalary);
            setSortedData(fetchIncomeData.data.sortedData);

            let annualSal = fetchIncomeData.data.highestSalary
            //console.log("Annual salary is ", fetchIncomeData.data.annualSalary)
            setChartData({
                labels: "Salary/Month",
                datasets: [
                    {
                        label: '3 Highest Salary',
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(201, 203, 207, 0.2)'],

                        borderColor: [
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(201, 203, 207)'
                        ],

                        borderWidth: 2,
                        data: annualSal,
                    }
                ]
            })

        } else {
            message.error(fetchIncomeData.data.message);
            console.log("Could not load income data")
        }

    }

    useEffect(() => {
        getIncomeData();
    }, 2000, [])

    useEffect(() => {
        const loadData = async () => {
            const token = localStorage.getItem('token');
            const decodetoken = jwtDecode(token);
            const userId = decodetoken.id;
            const fetchData = await axios.post('http://localhost:5050/api/getTotalAmount', { userid: userId, frequency: 365 });
            if (fetchData.status === 200) {
                setAnnualExpense(fetchData.data.data)
                //console.log("Annual Expense", fetchData.data.fiveSortAmount)
                let sortedAmounts = fetchData.data.fiveSortAmount
                let sortedItems = fetchData.data.fiveSortItems
                setSortamt({
                    labels: sortedItems,
                    datasets: [
                        {
                            label: "Expenditure Trend",
                            tension: 1,
                            fill: true,
                            //showLine: false, FOR HIDING LINE
                            backgroundColor: '#ffff00',
                            borderColor: '#36A2EB',
                            data: sortedAmounts
                        }
                    ]
                });



            } else {
                message.error(fetchData.data.message);
            }
            //console.log("TfetchData", fetchData.data.totalData)
        }
        loadData();

    }, [])

    useEffect(() => {
        setTimeout(() => {
            setIncexpdata({
                labels: ["Income", "Expenditure"],
                datasets: [
                    {
                        label: 'Income Vs Expenditure',
                        backgroundColor: [
                            'rgba(154, 362, 635, 2.2)', 'rgba(10, 125, 217, 0.9)'],

                        borderColor: [
                            'rgb(75, 192, 192)', 'rgb(255, 99, 132)',
                        ],
                        borderWidth: 0,
                        data: [annualIncome, annualExpense]
                    }
                ]
            })

            setDoughnutdata({
                labels: ["Income", "Expenditure"],
                datasets: [
                    {
                        label: 'Income Vs Expenditure',
                        backgroundColor: [
                            '#31CE4D', '#C70039'],

                        borderColor: [
                            'rgb(75, 192, 192)', 'rgb(255, 99, 132)',
                        ],
                        borderWidth: 0,
                        data: [annualIncome, annualExpense]
                    }
                ]
            })

            // setExprecchart({
            //     labels: 
            // })
        }, 2000)
    })


    const fetchRrecurringExp = async () => {
        const token = localStorage.getItem('token');
        const decodetoken = jwtDecode(token);
        const userId = decodetoken.id;
        const fetchData = await axios.post("http://localhost:5050/api/findExpenseRecurrence", { userid: userId })
        if (fetchData.status === 200) {
            console.log("recurring exp data", fetchData.data.data);
            setExprecurring(fetchData.data.data);

        } else {
            message.error(fetchData.data.message);
        }
    }


    //For recurring expenditure
    useEffect(() => {
        setTimeout(() => {
            fetchRrecurringExp();
        }, 1500)
    }, [])


    //bg-gradient-to-tr from-red-300 to-yellow-200 rounded-lg

    return (
        <>
            <div className='m-2 max-w-fit container'>
                <div className="flex flex-row justify-start items-center">
                    <div className='flex flex-col items-center flex-wrap'>
                        <div className='flex flex-col flex-wrap items-center justify-between '>
                            {/* This is card section */}
                            <div className="flex flex-row w-full justify-center items-center py-4">
                                <div className="sm:px-2 sm:ml-2 lg:grid-cols-2 gap-5 space-y-4 md:space-y-0 grid md:w-full md:m-3 md:grid-cols-1">
                                    <div className="max-w-xl min-w-400 flex flex-col bg-white px-6 pt-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-500">
                                        <h3 className="mb-3 text-xm justify-center items-center text-center font-poppins rounded-2xl text-white bg-indigo-600">Personal Profile Summary</h3>
                                        <hr className="h-px mb-1 border-0 dark:bg-green-300"></hr>
                                        <div className="flex relative justify-center items-center text-center">
                                            <img className="w-24 h-24 rounded-full mt-2" src={`http://localhost:5050/${image}`} alt="profileImg" />
                                            {/* <p className="absolute top-0 bg-green-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">Active</p> */}
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="my-2 flex flex-col max-w-lg min-w-400">
                                                <div>
                                                    <div className="flex space-x-1 items-center">
                                                        <span className='items-center' />
                                                        <AiOutlineUser className="rotate-0" color="red" fontSize={30} />
                                                        <p className='justify-center mr-5 px-2 items-center font-normal text-xs text-gray-800'>Name</p>
                                                        <h3 className='justify-start items-center text-xs text-gray-500'>{getuser.name ? getuser.name : 'Pankaj Kr Acharjee'}</h3>
                                                    </div>
                                                </div>
                                                <hr className="h-px mb-1 border-0 dark:bg-green-300"></hr>
                                                <div>
                                                    <div className="flex space-x-1 items-center">
                                                        <span className='items-center' />
                                                        <FcWorkflow className="rotate-0" color="red" fontSize={30} />
                                                        <p className='justify-center mr-5 px-2 items-center font-normal text-xs text-gray-800'>Profession</p>
                                                        <h3 className='justify-center items-center font-normal text-xs text-gray-500'>{getuser.designation ? getuser.designation : 'Social Worker'}</h3>
                                                    </div>
                                                </div>
                                                <hr className="h-px mb-1 border-0 dark:bg-green-300"></hr>
                                                <div>
                                                    <div className="flex space-x-1 items-center">
                                                        <span className='items-center' />
                                                        <FaSchool className="rotate-0" color="red" fontSize={30} />
                                                        <p className='justify-center mr-5 px-2 items-center font-normal text-xs text-gray-800'>Organisation name</p>
                                                        <h3 className='justify-center items-center font-normal text-xs text-gray-500'>ABC Pvt Ltd</h3>
                                                    </div>
                                                </div>
                                                <hr className="h-px mb-1 border-0 dark:bg-green-300"></hr>
                                                <div>
                                                    <div className="flex space-x-1 items-center">
                                                        <span className='items-center' />
                                                        <FiBook className="rotate-0" color="red" fontSize={30} />
                                                        <p className='justify-center mr-5 px-2 items-center font-normal text-xs text-gray-800'>Qualification</p>
                                                        <h3 className='justify-center items-center font-normal text-xs text-gray-500'>{getuser.graduation ? getuser.graduation : 'MCA'}</h3>
                                                    </div>
                                                </div>
                                                <hr className="h-px mb-1 border-0 dark:bg-green-300"></hr>
                                                <div>
                                                    <div className="flex space-x-1 items-center">
                                                        <span className='items-center' />
                                                        <FiDollarSign className="rotate-0" color="red" fontSize={30} />
                                                        <p className='justify-center mr-5 px-2 items-center font-normal text-xs text-gray-800'>Annual Salary</p>
                                                        <h3 className='justify-center items-center font-normal text-xs text-gray-500'>{annualIncome ? annualIncome : '1 Lakh'}</h3>
                                                    </div>
                                                </div>
                                                <hr className="h-px mb-1 border-0 dark:bg-green-300"></hr>
                                                <div>
                                                    <div className="flex space-x-1 items-center">
                                                        <span className='items-center' />
                                                        <FiPhone className="rotate-0" color="red" fontSize={30} />
                                                        <p className='justify-center mr-5 px-2 items-center font-serif text-xs text-gray-800'>Contact No</p>
                                                        <h3 className='justify-end items-center font-normal text-xs text-gray-500'>{getuser.mobile ? getuser.mobile : 'xxxx89'}</h3>
                                                    </div>
                                                </div>
                                                <hr className="h-px mb-1 border-0 dark:bg-green-300"></hr>
                                            </div>
                                        </div>
                                        <div className='items-center justify-center flex'>
                                            <button className="mt-4 text-sm w-1/5 text-white bgcustomcolor3 hover:translate-x-2 hover:decoration-sky-400 hover:duration-500 items-center text-center justify-center py-2 rounded-br-xl rounded-tl-xl shadow-lg">View More</button>
                                        </div>
                                    </div> {/* End of profile card section */}



                                    {/* This section is for table */}
                                    <div className="flex flex-col md:flex md:flex-col">
                                        <div className="flex flex-row items-center justify-center rounded-2xl transform hover:scale-105 transition duration-500">
                                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                <div className="inline-block sm:px-6 lg:px-8 min-w-672 max-w-2xl">
                                                    <div className="overflow-hidden rounded-lg">
                                                        <table className="min-w-full text-center text-sm font-light rounded-4xl">
                                                            <thead className="border-b border-neutral-700 text-gray-800 dark:border-neutral-600 bg-sky-400">
                                                                <tr>
                                                                    <th scope="col" className="px-12 py-4 "><img className='w-8 h-8 rounded-full' src={expPhoto} alt="logo" /></th>
                                                                    <th scope="col" className="px-6 py-4">Purchased Item</th>
                                                                    <th scope="col" className="px-6 py-4">Spending Date</th>
                                                                    <th scope="col" className="px-6 py-4">Amount</th>
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                <tr className="border-b dark:border-neutral-500 bg-white">
                                                                    {/* {!totalexp ? '' : (
                                                                <td className="whitespace-nowrap px-6 py-4 text-red-500 font-extrabold text-lg">
                                                                    {totalexp}
                                                                </td>
                                                            )} */}

                                                                    {/* {!sortamt ? '' : (
                                                                <>
                                                                    <td className="whitespace-nowrap px-6 py-4">{[0]}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{[0]}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{[0]}</td>
                                                                </>
                                                            )} */}

                                                                    <td className="whitespace-nowrap px-10 py-4"><img className='w-6 h-6 rounded-lg' src={logo2} alt="logo" /></td>
                                                                    <td className="whitespace-nowrap px-6 py-4">Ticket Booking</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">12-03-2023</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">250</td>
                                                                </tr>
                                                                <tr className="border-b dark:border-neutral-500 bg-white">
                                                                    <td className="whitespace-nowrap px-12 py-4"><img className='w-6 h-6 rounded-lg' src={expPhoto} alt="logo" /></td>
                                                                    <td className="whitespace-nowrap px-6 py-4">Ticket Booking</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">12-03-2023</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">250</td>
                                                                </tr>
                                                                <tr className="border-b dark:border-neutral-500 bg-white">
                                                                    <td className="whitespace-nowrap px-12 py-4"><img className='w-6 h-6 rounded-lg' src={logo3} alt="logo" /></td>
                                                                    <td className="whitespace-nowrap px-6 py-4">Ticket Booking</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">12-03-2023</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">250</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 2nd table for Income */}
                                        <div className="flex flex-row items-center justify-center rounded-2xl mt-5 transform hover:scale-105 transition duration-500">
                                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                <div className="inline-block min-w-672 max-w-2xl py-6 sm:px-6 lg:px-8">
                                                    <div className="overflow-hidden rounded-lg">
                                                        <table className="min-w-full text-center text-sm font-light rounded-4xl">
                                                            <thead className="border-b border-neutral-700 text-gray-800 dark:border-neutral-600 bg-pink-500">
                                                                <tr>
                                                                    <th scope="col" className="px-8 py-4 ">User Name</th>
                                                                    <th scope="col" className="px-6 py-4">Income Source</th>
                                                                    <th scope="col" className="px-6 py-4">Incoming Date</th>
                                                                    <th scope="col" className="px-6 py-4">Amount</th>
                                                                </tr>
                                                            </thead>

                                                            {sortedData.map((value, index) => {
                                                                return (
                                                                    <tbody>
                                                                        <tr key={index} className="border-b dark:border-neutral-500 bg-white">
                                                                            <div className="flex space-x-1 flex-row">
                                                                                <img className='w-6 h-6 rounded-lg mt-4 ml-3' src={`http://localhost:5050/${image}`} alt="profileImg" />
                                                                                <td className="whitespace-nowrap px-2 py-4 items-center justify-center">{getuser.name ? getuser.name : ''}</td>
                                                                            </div>

                                                                            <td className="whitespace-nowrap uppercase items-center justify-center px-6 py-4">{value.incomefrom}</td>
                                                                            <td className="whitespace-nowrap px-6 py-4">{`${(value.dateselect).substring(0, 10)}`}</td>
                                                                            <td className="whitespace-nowrap px-6 py-4">{value.amount}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                )
                                                            })}
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    </div>    {/* This is end of all tables container */}
                                </div>
                            </div>
                            {/* End of card section */}
                        </div>


                        {/* This is Chart section for Income  */}
                        <div className='lg:flex lg:flex-row lg:flex-wrap md:flex md:flex-col justify-between mb-5 mt-3 rounded-lg md:ml-5 md:mb-3 md:justify-center'>
                            <div className='mr-3 transform hover:scale-105 transition duration-500 md:m-2 sm:m-2 xm:m-2 m-2'>
                                {chartData?.length === 0 || !chartData ? '' : (
                                    <div className='bg-white max-w-sm rounded-br-2xl rounded-tl-2xl shadow-lg'>
                                        <Bar
                                            data={chartData}
                                            options={{
                                                title: {
                                                    display: true,
                                                    text: 'Salary',
                                                    fontSize: 2
                                                },
                                                legend: {
                                                    display: true,
                                                    position: 'left',
                                                    responsive: true,
                                                    maintainAspectRatio: true,
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className='mr-3 transform hover:scale-105 transition duration-500 md:m-2 sm:m-2 xm:m-2 m-2'>
                                {/* This is Chart section for Income  */}
                                {sortamt?.length === 0 || !sortamt ? '' : (
                                    <div className='max-w-sm rounded-br-2xl rounded-tl-2xl shadow-lg' style={{ backgroundColor: '#40ff00' }}>
                                        <Line
                                            data={sortamt}
                                            options={{
                                                resposive: true,
                                                maintainAspectRatio: true,
                                                scales: {
                                                    y: {
                                                        grid: {
                                                            color: '#ffffff'
                                                        },
                                                        ticks: {
                                                            beginAtZero: true,
                                                            color: '#000000'
                                                        }
                                                    },
                                                    x: {
                                                        grid: {
                                                            color: '#ffffff'
                                                        },
                                                        ticks: {
                                                            beginAtZero: true,
                                                            color: '#000000'
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className='transform hover:scale-105 transition duration-500 md:m-2 sm:m-2 xm:m-2 m-2'>
                                {/* This is Chart section for Income  */}
                                {incexpdata?.length === 0 || !incexpdata ? '' : (
                                    <div className='bg-white max-w-sm rounded-br-2xl rounded-tl-2xl shadow-lg text-center border-orange-400'>
                                        <Bar
                                            data={incexpdata}
                                            options={{
                                                title: {
                                                    display: true,
                                                    text: 'Income Vs Expense',
                                                    fontSize: 2
                                                },
                                                legend: {
                                                    display: true,
                                                    position: 'left',
                                                    responsive: true,
                                                    maintainAspectRatio: true,
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>


                        {/* This is cards section  */}
                        <div className='md:flex md:flex-col justify-between mb-5 mt-3 rounded-xl md:ml-5 md:mb-3 md:justify-center'>
                            <div className='mr-3 lg:flex lg:flex-row lg:flex-wrap md:flex md:flex-col md:m-2 sm:m-2 xm:m-2 m-2'>
                                <div className='max-w-sm min-w-sm transform hover:scale-105 transition duration-500'>
                                    <div className='w-lg mx-4 my-4 rounded-lg shadow-md overflow-hidden'>
                                        <div className="group relative block bg-black h-22">
                                            <img
                                                alt="firstcard"
                                                src={cardImgA}
                                                className="absolute inset-0 h-10 w-10 mt-5 ml-2 mr-3 rounded-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                            />
                                            <div className="relative p-4 sm:p-6 lg:p-8 opacity-95 transition-opacity group-hover:opacity-70">
                                                <p className="text-sm text-right justify-end items-center ml-6 md:ml-6 sm:ml-6 xm:ml-6 font-medium uppercase tracking-widest text-pink-500">
                                                    Total Spending
                                                </p>
                                                <p className="text-xl text-center font-bold text-white sm:text-2xl">2500</p>
                                                <div className='absolute mr-2 pb-2 bottom-0 right-0'>
                                                    <FiArrowDown className="rotate-180 absolute bottom-8 right-0 text-right" color="red" fontSize={14} />
                                                    <p className='relative text-white text-right mr-3 pr-1'><span className='bgcustomcolor6 text-sm inline-block rounded-sm'>30%</span></p>
                                                    <h5 className='text-sm text-right text-gray-400'>Since last month</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='max-w-sm min-w-sm transform hover:scale-105 transition duration-500'>
                                    <div className='w-lg mx-4 my-4 rounded-lg shadow-md overflow-hidden'>
                                        <div className="group relative block bg-black h-22">
                                            <img
                                                alt="firstcard"
                                                src={cardImgA}
                                                className="absolute inset-0 h-10 w-10 mt-5 ml-2 mr-3 rounded-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                            />
                                            <div className="relative p-4 sm:p-6 lg:p-8 opacity-95 transition-opacity group-hover:opacity-70">
                                                <p className="text-sm text-right justify-end items-center ml-6 md:ml-6 sm:ml-6 xm:ml-6 font-medium uppercase tracking-widest text-pink-500">
                                                    Total Income
                                                </p>
                                                <p className="text-xl text-center font-bold text-white sm:text-2xl">2500</p>
                                                <div className='absolute mr-2 pb-2 bottom-0 right-0'>
                                                    <FiArrowDown className="rotate-180 absolute bottom-8 right-0 text-right" color="red" fontSize={14} />
                                                    <p className='relative text-white text-right mr-3 pr-1'><span className='bgcustomcolor6 text-sm inline-block rounded-sm'>30%</span></p>
                                                    <h5 className='text-sm text-right text-gray-400'>Since last month</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className='max-w-sm min-w-sm transform hover:scale-105 transition duration-500'>
                                    <div className='w-lg mx-4 my-4 rounded-lg shadow-md overflow-hidden'>
                                        <div className="group relative block bg-black h-22">
                                            <img
                                                alt="firstcard"
                                                src={cardImgA}
                                                className="absolute inset-0 h-10 w-10 mt-5 ml-2 mr-3 rounded-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                            />
                                            <div className="relative p-4 sm:p-6 lg:p-8 opacity-95 transition-opacity group-hover:opacity-70">
                                                <p className="text-sm text-right justify-end items-center ml-6 md:ml-6 sm:ml-6 xm:ml-6 font-medium uppercase tracking-widest text-pink-500">
                                                    Last Income
                                                </p>
                                                <p className="text-xl text-center font-bold text-white sm:text-2xl">2500</p>
                                                <div className='absolute mr-2 pb-2 bottom-0 right-0'>
                                                    <FiArrowDown className="rotate-180 absolute bottom-8 right-0 text-right" color="red" fontSize={14} />
                                                    <p className='relative text-white text-right mr-3 pr-1'><span className='bgcustomcolor6 text-sm inline-block rounded-sm'>30%</span></p>
                                                    <h5 className='text-sm text-right text-gray-400'>Since last month</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='max-w-sm min-w-sm transform hover:scale-105 transition duration-500'>
                                    <div className='w-lg mx-4 my-4 rounded-lg shadow-md overflow-hidden'>
                                        <div className="group relative block bg-black h-22">
                                            <img
                                                alt="firstcard"
                                                src={cardImgA}
                                                className="absolute inset-0 h-10 w-10 mt-5 ml-2 mr-3 rounded-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                            />
                                            <div className="relative p-4 sm:p-6 lg:p-8 opacity-95 transition-opacity group-hover:opacity-70">
                                                <p className="text-sm text-right justify-end items-center ml-6 md:ml-6 sm:ml-6 xm:ml-6 font-medium uppercase tracking-widest text-pink-500">
                                                    Last Spending
                                                </p>
                                                <p className="text-xl text-center font-bold text-white sm:text-2xl">2500</p>
                                                <div className='absolute mr-2 pb-2 bottom-0 right-0'>
                                                    <FiArrowDown className="rotate-180 absolute bottom-8 right-0 text-right" color="red" fontSize={14} />
                                                    <p className='relative text-white text-right mr-3 pr-1'><span className='bgcustomcolor6 text-sm inline-block rounded-sm'>30%</span></p>
                                                    <h5 className='text-sm text-right text-gray-400'>Since last month</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* This is enlarged charts section */}
                <div className='container mx-auto flex flex-wrap'>
                    <div className='chart-column w-full lg:w-3/4 px-2'>
                        <div className='chart-container p-4'>
                            {sortamt?.length === 0 || !sortamt ? '' : (
                                <div className='chartBackground rounded-2xl shadow-lg'>
                                    <Line
                                        data={sortamt}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: true,
                                            scales: {
                                                y: {
                                                    grid: {
                                                        drawBorder: true,
                                                        color: '#ffffff'
                                                    },
                                                    ticks: {
                                                        beginAtZero: true,
                                                        color: '#ffffff',
                                                        fontSize: 12
                                                    }
                                                },
                                                x: {
                                                    grid: {
                                                        drawBorder: true,
                                                        color: '#ffffff'
                                                    },
                                                    ticks: {
                                                        beginAtZero: true,
                                                        color: '#ffffff',
                                                        fontSize: 12
                                                    }
                                                },
                                            }
                                        }}
                                    // width = {20}
                                    // height={200}
                                    />
                                    <span><p className='p-1 mb-2 text-center capitalize text-white font-bold'>Your expenditure trends since starting</p></span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="rounded-md chart-column items-center w-full lg:w-1/4 px-2">
                        <h1 className='text-center items-center justify-center font-bold p-2 text-gray-700'>Income vs Expenditure</h1>
                        {doughnutdata?.length === 0 || !doughnutdata ? '' : (
                            <div className='chart-container bg-gray-700 p-4 rounded-lg shadow-md'>
                                <Doughnut
                                    data={doughnutdata}
                                    options={
                                        {
                                            responsive: true,
                                            maintainAspectRatio: true,
                                        }
                                    }
                                />
                            </div>
                        )}
                        <h1 className='text-center text-xs items-center justify-center p-2 text-gray-700'>Compare your income and expenditure.</h1>
                        <div className='inline-flex justify-center'>
                            <h1 className='text-center text-xs items-center justify-center mr-1  text-white inline-block bg-green-400 rounded-sm'>Your Income: {annualIncome}</h1>
                            <h1 className='text-center text-xs items-center justify-center  text-white inline-block bg-red-600 rounded-sm'>Your Expense:  {annualExpense}</h1>
                        </div>

                    </div>
                </div>

                {/* For table section of recurrence data */}
                <div className='container flex justify-center mx-auto'>
                    <div className='flex flex-col bg-gray-200'>
                        <div className='w-full hidden lg:block'>
                            <div className='p-12 border border-gray-300 shadow-gray-300 shadow-lg'>
                                <h1 className='pb-3 text-lg font-bold text-gray-600'>Frequently bought items</h1>
                                <table className="table-auto text-center divide-y divide-gray-300">
                                    <thead className="border-b border-neutral-700 text-gray-800 dark:border-neutral-600 rounded-xl bg-gray-100">
                                        <tr>
                                            <th scope="col" className="px-8 py-2 capitalize text-xs">Sl No</th>
                                            <th scope="col" className="px-8 py-2 capitalize text-xs">User Name</th>
                                            <th scope="col" className="px-6 py-2 capitalize text-xs">Purchased Item</th>
                                            <th scope="col" className="px-6 py-2 capitalize text-xs"> No of times Bought</th>
                                            <th scope="col" className="px-6 py-2 capitalize text-xs">Total amount invlolved</th>
                                        </tr>
                                    </thead>
                                    {exprecurring?.slice(0, numrows).map((value, index) => {
                                        return (
                                            <tbody>
                                                <tr key={index} className="border-b dark:border-neutral-500 bg-white">
                                                    <td className="whitespace-nowrap px-6 py-4 text-xs text-gray-600 justify-center items-center">{index + 1}</td>
                                                    <div className="flex space-x-1 flex-row">
                                                        <img className='w-6 h-6 rounded-full mt-4 ml-3' src={`http://localhost:5050/${image}`} alt="profileImg" />
                                                        <td className="whitespace-nowrap px-2 py-4 flex text-xs text-gray-600 items-center justify-center">{getuser.name ? getuser.name : ''}</td>
                                                    </div>

                                                    <td className="whitespace-nowrap  text-xs text-gray-600 items-center justify-center px-6 py-4">{value._id}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-xs text-gray-600 justify-center">{value.timesBought} times</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-xs text-gray-600 justify-center items-center">₹ {value.totalAmount}</td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                </table>
                                {numrows < exprecurring.length ? (
                                    <div className='flex flex-row-reverse pt-3'>
                                        <button className="mt-4 text-sm w-1/5 text-white bgcustomcolor3 hover:translate-x-2 hover:decoration-sky-400 hover:duration-500 items-center text-center justify-center py-2 rounded-br-xl rounded-tl-xl shadow-lg"
                                            onClick={() => setNumrows(exprecurring.length)}
                                        >View More</button>
                                    </div>
                                ) : (
                                    <div className='flex flex-row-reverse pt-3'>
                                        <button className="mt-4 text-sm w-1/5 text-white bg-amber-400 hover:translate-x-2 hover:decoration-sky-400 hover:duration-500 items-center text-center justify-center py-2 rounded-br-xl rounded-tl-xl shadow-lg"
                                            onClick={() => setNumrows(5)}
                                        >Hide</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <div class="container mx-auto flex flex-wrap mt-6">
                <div class="chart-column w-full sm:w-1/2 lg:w-1/3 px-2">
                    <div class="chart-container bg-white shadow-md rounded-lg p-4">
                        {/* <!-- Chart 1 goes here --> */}
                        {doughnutdata?.length === 0 || !doughnutdata ? '' : (
                            <Pie
                                data={doughnutdata}
                                options={
                                    {
                                        responsive: false,
                                        maintainAspectRatio: true,
                                    }
                                }
                            />
                        )}
                    </div>
                </div>
                <div class="chart-column w-full sm:w-1/2 lg:w-1/3 px-2">
                    <div class="chart-container bg-white shadow-md rounded-lg p-4">
                        {/* <!-- Chart 2 goes here --> */}
                        {doughnutdata?.length === 0 || !doughnutdata ? '' : (
                            <Pie
                                data={doughnutdata}
                                options={
                                    {
                                        responsive: false,
                                        maintainAspectRatio: true,
                                    }
                                }
                            />
                        )}
                    </div>
                </div>
                <div class="chart-column w-full sm:w-1/2 lg:w-1/3 px-2">
                    <div class="chart-container bg-white shadow-md rounded-lg p-4">
                        {/* <!-- Chart 3 goes here --> */}
                        {doughnutdata?.length === 0 || !doughnutdata ? '' : (
                            <Pie
                                data={doughnutdata}
                                options={
                                    {
                                        responsive: false,
                                        maintainAspectRatio: true,
                                    }
                                }
                            />
                        )}
                    </div>
                </div>
            </div>


            <div className="container flex justify-center mx-auto">
                <div className="flex flex-col">
                    <div className="w-full">
                        <div className="p-12 border-b border-gray-200 shadow">
                            <table className="divide-y divide-gray-300" id="dataTable">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-2 text-xs text-gray-500">
                                            ID
                                        </th>
                                        <th className="px-6 py-2 text-xs text-gray-500">
                                            Name
                                        </th>
                                        <th className="px-6 py-2 text-xs text-gray-500">
                                            Email
                                        </th>
                                        <th className="px-6 py-2 text-xs text-gray-500">
                                            Created_at
                                        </th>
                                        <th className="px-6 py-2 text-xs text-gray-500">
                                            Edit
                                        </th>
                                        <th className="px-6 py-2 text-xs text-gray-500">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-500">
                                    <tr className="whitespace-nowrap">
                                        <td className="px-6 py-4 text-sm text-center text-gray-500">
                                            1
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="text-sm text-gray-900">
                                                Jon doe
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="text-sm text-gray-500">[email protected]</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-center text-gray-500">
                                            2021-1-12
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <a href="#"
                                                className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">Edit</a>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <a href="#"
                                                className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">Delete</a>
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-50 whitespace-nowrap">
                                        <td className="px-6 py-4 text-sm text-center text-gray-500">
                                            2
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="text-sm text-gray-900">
                                                Jon doe 2
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="text-sm text-gray-500">[email protected]</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-center text-gray-500">
                                            2021-1-12
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <a href="#"
                                                className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">Edit</a>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <a href="#" className="px-4 py-1 text-sm text-red-400 rounded-full">Delete</a>
                                        </td>
                                    </tr>
                                    <tr className="whitespace-nowrap">
                                        <td className="px-6 py-4 text-sm text-center text-gray-500">
                                            3
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="text-sm text-gray-900">
                                                Jon doe 3
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="text-sm text-gray-500">[email protected]</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-center text-gray-500">
                                            2021-1-12
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <a href="#"
                                                className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">Edit</a>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <a href="#"
                                                className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">Delete</a>
                                        </td>
                                    </tr>


                                    <tr className="bg-gray-50 whitespace-nowrap">
                                        <td className="px-6 py-4 text-sm text-center text-gray-500">
                                            4
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="text-sm text-gray-900">
                                                Jon doe 4
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="text-sm text-gray-500">[email protected]</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-center text-gray-500">
                                            2021-1-12
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <a href="#"
                                                className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">Edit</a>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <a href="#" className="px-4 py-1 text-sm text-red-400 rounded-full">Delete</a>
                                        </td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardScreen