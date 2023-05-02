import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode';
import { AiOutlineUser, AiOutlineBuild, AiFillBuild, AiFillContacts } from 'react-icons/ai';
import { FaSchool } from 'react-icons/fa'
import { FcWorkflow } from 'react-icons/fc'
import { FiBook, FiDollarSign, FiPhone } from 'react-icons/fi'
import { DatePicker, Space, Popconfirm, message } from 'antd';
import expPhoto from '../assets/rsLogo.png'
import logo2 from '../assets/logo34.png'
import logo3 from '../assets/Calculate.png'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, registerables } from 'chart.js';
import { Bar, Doughnut, Pie, Scatter, Line} from 'react-chartjs-2';
import axios from 'axios';
import Spinner from './Spinner';
ChartJS.register(...registerables);

const DashboardScreen = () => {

    const [annualIncome, setAnnualIncome] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [sortamt, setSortamt] = useState();


    const getIncomeData = async () => {
        const token = localStorage.getItem('token');
        const decodeToken = jwtDecode(token);
        const userId = decodeToken.id;
        const fetchIncomeData = await axios.post("http://localhost:5050/api/getincome", { userid: userId, frequency: 365 })
        if (fetchIncomeData?.status === 200) {
            setAnnualIncome(fetchIncomeData.data.annualSalary)
            let annualSal = fetchIncomeData.data.highestSalary
            console.log("Annual salary is ", annualSal)
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

                        borderWidth: 1,
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
    }, [])

    useEffect(() => {
        const loadData = async () => {
            const token = localStorage.getItem('token');
            const decodetoken = jwtDecode(token);
            const userId = decodetoken.id;
            const fetchData = await axios.post('http://localhost:5050/api/getTotalAmount', { userid: userId, frequency: 365 });
            if (fetchData.status === 200) {
                let sortedAmounts = fetchData.data.sortAmount
                setSortamt({
                    labels: "Spending Trends",
                    datasets: [
                        {
                            label: "Expenditure Trend",
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 5,
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


    return (
        <div className='m-2 max-w-fit container bg-gradient-to-tr from-red-300 to-yellow-200 rounded-lg'>
            <div className="flex flex-row justify-start items-center">
                <div className='flex flex-col items-center flex-wrap'>
                    <div className='flex flex-col flex-wrap items-center justify-between '>
                        {/* This is card section */}
                        <div className="flex flex-row w-full justify-center items-center py-4">
                            <div className="sm:px-2 sm:ml-2 lg:grid-cols-2 gap-5 space-y-4 md:space-y-0 grid md:w-full md:m-3 md:grid-cols-1">
                                <div className="max-w-xl min-w-400 flex flex-col bg-white px-6 pt-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-500">
                                    <h3 className="mb-3 text-xm justify-center items-center text-center font-poppins text-indigo-600">Personal Profile Summary</h3>
                                    <hr class="h-px mb-1 border-0 dark:bg-green-300"></hr>
                                    <div className="flex relative justify-center items-center text-center">
                                        <img className="w-24 h-24 rounded-full mt-2" src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Colors" />
                                        {/* <p className="absolute top-0 bg-green-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">Active</p> */}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="my-2 flex flex-col max-w-lg min-w-400">
                                            <div>
                                                <div className="flex space-x-1 items-center">
                                                    <span className='items-center' />
                                                    <AiOutlineUser className="rotate-0" color="red" fontSize={30} />
                                                    <p className='justify-center mr-5 px-2 items-center font-normal text-xs text-gray-800'>Name</p>
                                                    <h3 className='justify-start items-center text-xs text-gray-500'>Pankaj Kr Acharjee</h3>
                                                </div>
                                            </div>
                                            <hr class="h-px mb-1 border-0 dark:bg-green-300"></hr>
                                            <div>
                                                <div className="flex space-x-1 items-center">
                                                    <span className='items-center' />
                                                    <FcWorkflow className="rotate-0" color="red" fontSize={30} />
                                                    <p className='justify-center mr-5 px-2 items-center font-normal text-xs text-gray-800'>Profession</p>
                                                    <h3 className='justify-center items-center font-normal text-xs text-gray-500'>Web Developer</h3>
                                                </div>
                                            </div>
                                            <hr class="h-px mb-1 border-0 dark:bg-green-300"></hr>
                                            <div>
                                                <div className="flex space-x-1 items-center">
                                                    <span className='items-center' />
                                                    <FaSchool className="rotate-0" color="red" fontSize={30} />
                                                    <p className='justify-center mr-5 px-2 items-center font-normal text-xs text-gray-800'>Organisation name</p>
                                                    <h3 className='justify-center items-center font-normal text-xs text-gray-500'>ABC Pvt Ltd</h3>
                                                </div>
                                            </div>
                                            <hr class="h-px mb-1 border-0 dark:bg-green-300"></hr>
                                            <div>
                                                <div className="flex space-x-1 items-center">
                                                    <span className='items-center' />
                                                    <FiBook className="rotate-0" color="red" fontSize={30} />
                                                    <p className='justify-center mr-5 px-2 items-center font-normal text-xs text-gray-800'>Qualification</p>
                                                    <h3 className='justify-center items-center font-normal text-xs text-gray-500'>MCA</h3>
                                                </div>
                                            </div>
                                            <hr class="h-px mb-1 border-0 dark:bg-green-300"></hr>
                                            <div>
                                                <div className="flex space-x-1 items-center">
                                                    <span className='items-center' />
                                                    <FiDollarSign className="rotate-0" color="red" fontSize={30} />
                                                    <p className='justify-center mr-5 px-2 items-center font-normal text-xs text-gray-800'>Monthly Salary</p>
                                                    <h3 className='justify-center items-center font-normal text-xs text-gray-500'>1 Lakh</h3>
                                                </div>
                                            </div>
                                            <hr class="h-px mb-1 border-0 dark:bg-green-300"></hr>
                                            <div>
                                                <div className="flex space-x-1 items-center">
                                                    <span className='items-center' />
                                                    <FiPhone className="rotate-0" color="red" fontSize={30} />
                                                    <p className='justify-center mr-5 px-2 items-center font-serif text-xs text-gray-800'>Contact No</p>
                                                    <h3 className='justify-end items-center font-normal text-xs text-gray-500'>xxxx89</h3>
                                                </div>
                                            </div>
                                            <hr class="h-px mb-1 border-0 dark:bg-green-300"></hr>
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
                                                        <thead className="border-b border-neutral-700 text-gray-800 dark:border-neutral-600 bg-white">
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
                                                        <thead className="border-b border-neutral-700 text-gray-800 dark:border-neutral-600 bg-white">
                                                            <tr>
                                                                <th scope="col" className="px-8 py-4 ">User Name</th>
                                                                <th scope="col" className="px-6 py-4">Income Source</th>
                                                                <th scope="col" className="px-6 py-4">Incoming Date</th>
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
                                                                <div className="flex space-x-1 flex-row">
                                                                    <img className='w-6 h-6 rounded-lg mt-4 ml-3' src={logo3} alt="logo" />
                                                                    <td className="whitespace-nowrap px-2 py-4 items-center justify-center"> Pankaj</td>
                                                                </div>

                                                                <td className="whitespace-nowrap px-6 py-4">Ticket Booking</td>
                                                                <td className="whitespace-nowrap px-6 py-4">12-03-2023</td>
                                                                <td className="whitespace-nowrap px-6 py-4">250</td>
                                                            </tr>
                                                            <tr className="border-b dark:border-neutral-500 bg-white">
                                                                <td className="whitespace-nowrap px-6 py-4">Pankaj</td>
                                                                <td className="whitespace-nowrap px-6 py-4">Ticket Booking</td>
                                                                <td className="whitespace-nowrap px-6 py-4">12-03-2023</td>
                                                                <td className="whitespace-nowrap px-6 py-4">250</td>
                                                            </tr>
                                                            <tr className="border-b dark:border-neutral-500 bg-white">
                                                                <td className="whitespace-nowrap px-6 py-4">Pankaj</td>
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
                                <div className='bg-white max-w-sm rounded-br-2xl rounded-tl-2xl shadow-lg'>
                                    <Line
                                        data={sortamt}
                                    />
                                </div>
                            )}
                        </div>
                        <div className='transform hover:scale-105 transition duration-500 md:m-2 sm:m-2 xm:m-2 m-2'>
                            {/* This is Chart section for Income  */}
                            {chartData?.length === 0 || !chartData ? '' : (
                                <div className='bg-white max-w-sm rounded-br-2xl rounded-tl-2xl shadow-lg text-center border-orange-400'>
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
                    </div>





                </div>
            </div>



        </div>
    )
}

export default DashboardScreen