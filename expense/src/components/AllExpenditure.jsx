import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner'
import Chartexp from './Chartexp';
import jwtDecode from 'jwt-decode';
import { Link, useParams } from "react-router-dom"
import { DatePicker, Space, Popconfirm, message } from 'antd';
import { MdDelete, MdEditNote } from 'react-icons/md';
import cardImgA from '../assets/cardbg1.jpg'
import cardImgB from '../assets/cardbg2.jpg'
import cardImgC from '../assets/cardbg3.jpg'
const { RangePicker } = DatePicker;


const AllExpenditure = () => {
    const { id } = useParams();

    const [userexp, setUserexp] = useState([]);
    const [loading, setLoading] = useState(false);
    const [oneusername, setOneusername] = useState(null);
    const [frequency, setFrequency] = useState('30');
    const [selectedDate, setSelectedDate] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [numberofpages, setNumberofpages] = useState(0);
    const [totalexp, setTotalexp] = useState(0);
    const [sortamt, setSortamt] = useState();
    const [sortitem, setSortitem] = useState();
    const [lastmonthexp, setLastmonthexp] = useState();
    const [lastmonthtiem, setLastmonthitem] = useState();

    //For Opting Cancellation
    function cancel(e) {
        console.log(e);
        message.error('Oh O! You were accidentally deleting data');
    }


    const gotoExpScreen = () => {
        window.location.href = '/category/charts'
    }

    //For reloading refrehed data after deletion of an expenditure
    const reloadData = async () => {
        setLoading(true)
        const token = localStorage.getItem('token');
        const decodetoken = jwtDecode(token);
        const userId = decodetoken.id;
        //console.log("Value of user in All Expenditure", userId);
        const response = await axios.post("http://localhost:5050/api/getexpense", { userid: userId, frequency: frequency, selectedDate: selectedDate });
        setUserexp(response.data.data);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true)
        const loadingTimer = setTimeout(async () => {
            clearTimeout(loadingTimer);
            const token = localStorage.getItem('token');
            const decodetoken = jwtDecode(token);
            const userId = decodetoken.id;
            const userName = decodetoken.name
            setOneusername(userName);
            //console.log("Value of user in All Expenditure", userId);
            const response = await axios.post(`http://localhost:5050/api/getexpense?pageNumber=${pageNumber + 1}`, { userid: userId, frequency: frequency, selectedDate: selectedDate });
            setUserexp(response.data.data);
            //console.log("Data of exp is", response.data.data)
            //console.log("Total Pages are", response.data.totalPages)
            setNumberofpages(response.data.totalPages)
            setLoading(false);
        }, 1000);
    }, [frequency, selectedDate, pageNumber])


    useEffect(() => {
        const loadData = async () => {
            const token = localStorage.getItem('token');
            const decodetoken = jwtDecode(token);
            const userId = decodetoken.id;
            const fetchData = await axios.post('http://localhost:5050/api/getTotalAmount', { userid: userId, frequency: frequency, selectedDate: selectedDate });
            if (fetchData.status === 200) {
                setTotalexp(fetchData.data.data);
                setSortamt(fetchData.data.sortAmount);
                setSortitem(fetchData.data.sortItems);
            } else {
                message.error(fetchData.data.message);
                setTotalexp(null);
            }
            //console.log("TfetchData", fetchData.data.totalData)
        }
        loadData();
    }, [frequency, selectedDate, pageNumber])


    useEffect(() => {
        const loadPrevData = async () => {
            const token = localStorage.getItem('token');
            const decodetoken = jwtDecode(token);
            const userId = decodetoken.id;
            const fetchData = await axios.post('http://localhost:5050/api/getLastMonthExp', { userid: userId, frequency: 30 });
            if (fetchData.status === 200) {
                setLastmonthexp(fetchData.data.sortAmount);
                setLastmonthitem(fetchData.data.sortItems);
            } else {
                message.error(fetchData.data.message);
            }
            console.log("TfetchData", fetchData.data)
        }
        loadPrevData();
    }, [frequency, selectedDate, pageNumber])


    //For showing buttons as page numbers in the bottom of the page
    const noOfPages = new Array(numberofpages).fill(null).map((value, index) => index);
    //console.log("Number of pages for all records", noOfPages);

    //For Previous Button
    const prevButtonAction = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
    }

    const nextButtonAction = () => {
        setPageNumber(Math.min(numberofpages - 1, pageNumber + 1));
        // setHighlighted(!hightlighted);
    }
    if (loading) {
        return <Spinner message="Loading!" />
    }


    const triggerDelete = async (id) => {
        const res = await axios.delete(`http://localhost:5050/api/deleteexp/${id}`);
        if (res.status === 422) {
            console.log("Not deleted");
            message.error('There was some issue to delete your data!');
        } else {
            reloadData();
            console.log("Expenditure Deleted")
            message.success('Selected Expense Successfully Deleted!');

        }
    }

    return (
        <div>
            {/* This is card section */}
            <div className='flex flex-auto justify-center'>
                <div className='w-lg mx-4 my-4 rounded-lg shadow-md overflow-hidden'>
                    <a href="#" className="group relative block bg-black h-44">
                        <img
                            alt="firstcard"
                            src={cardImgA}
                            className="absolute mr-2 inset-0 h-24 w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                        />
                        <div className="relative p-4 sm:p-6 lg:p-8">
                            <p className="text-sm text-center font-medium uppercase tracking-widest text-pink-500">
                                Total Spending
                            </p>
                            <p className="text-xl text-center font-bold text-white sm:text-2xl">{totalexp}</p>
                            <div className="mt-32 sm:mt-48 lg:mt-64">
                                <div
                                    className="-translate-y-8 transform opacity-0 transition-all group-hover:-translate-y-56 group-hover:opacity-100"
                                >
                                    <p className="text-sm text-white text-center">
                                        Expensed Amount Rs. {totalexp}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div className='w-lg mx-4 my-4 rounded-lg shadow-md overflow-hidden'>
                    <a href="#" className="group relative block bg-black h-44">
                        <img
                            alt="2ndcard"
                            src={cardImgB}
                            className="absolute inset-0 h-24 w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                        />
                        <div className="relative p-4 sm:p-6 lg:p-8">
                            <p className="text-sm text-center font-medium uppercase tracking-widest text-pink-500">
                                Last month total
                            </p>
                            <p className="text-xl text-center font-bold text-white sm:text-2xl">{lastmonthexp}</p>
                            <div className="mt-32 sm:mt-48 lg:mt-64">
                                <div
                                    className="-translate-y-8 transform opacity-0 transition-all group-hover:-translate-y-56 group-hover:opacity-100"
                                >
                                    <p className="text-sm text-white text-center">
                                        Expensed Amount Rs. {lastmonthexp}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div className='w-lg mx-4 my-4 rounded-lg shadow-md overflow-hidden'>
                    <a href="#" className="group relative block bg-black h-44">
                        <img
                            alt="3rdcard"
                            src={cardImgC}
                            className="absolute inset-0 h-24 w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                        />
                        <div className="relative p-4 sm:p-6 lg:p-8">
                            <p className="text-sm text-center font-medium uppercase tracking-widest text-pink-500">
                                Items name
                            </p>
                            <p className="text-base text-center font-bold text-white sm:text-2xl">{lastmonthtiem}</p>
                            <div className="mt-32 sm:mt-48 lg:mt-64">
                                <div
                                    className="-translate-y-8 transform opacity-0 transition-all group-hover:-translate-y-56 group-hover:opacity-100"
                                >
                                    <p className="text-sm text-white text-center">
                                        Item expense in. {lastmonthtiem}                                    </p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            {/* This is table section for showing total expense */}
            <div className="flex flex-row items-center justify-center rounded-2xl">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden rounded-lg">
                            <table className="min-w-full text-center text-sm font-light rounded-4xl">
                                <thead className="border-b border-neutral-700 text-gray-800 dark:border-neutral-600 bgcustomcolor4">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Total Expense Incurred</th>
                                        <th scope="col" className="px-6 py-4">Highest Spent</th>
                                        <th scope="col" className="px-6 py-4">Second Highest Spent</th>
                                        <th scope="col" className="px-6 py-4">Third Highest Spent</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className="border-b dark:border-neutral-500">
                                        {!totalexp ? '' : (
                                            <td className="whitespace-nowrap px-6 py-4 text-red-500 font-extrabold text-lg">
                                                {totalexp}
                                            </td>
                                        )}

                                        {!sortamt ? '' : (
                                            <>
                                                <td className="whitespace-nowrap px-6 py-4">{sortamt[0]}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{sortamt[1]}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{sortamt[2]}</td>
                                            </>
                                        )}
                                    </tr>

                                    <tr className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-bold border-b border-neutral-700 bg-neutral-800 text-gray-800 dark:border-neutral-600 bgcustomcolor4">
                                            Items Involved
                                        </td>
                                        {!sortitem ? '' : (
                                            <>
                                                <td className="whitespace-nowrap px-6 py-4">{sortitem[0]}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{sortitem[1]}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{sortitem[2]}</td>
                                            </>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>




            <>
                <div className='items-center text-2xl text-center font-bold text-red-700'>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="flex justify-between py-3 pl-2 ">
                            <div className="relative w-full">
                                <div className="mb-4 w-full">
                                    <label for="frequency" className="block mt-2 mb-2 text-md font-medium text-gray-900 dark:text-gray">Select Frequency</label>
                                    <select className="form-control block w-1/3 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        value={frequency}
                                        onChange={(e) => setFrequency(e.target.value)}
                                    >
                                        <option>Click to select...</option>
                                        <option value={7}>Last One Week</option>
                                        <option value={30}>Last One Month</option>
                                        <option value="365">Last One Year</option>
                                        <option value="custom">Custom</option>
                                    </select>
                                    {frequency === 'custom' &&

                                        <Space direction='vertical' size={12}>
                                            <RangePicker allowClear={false} bordered={true} placement={'topRight'} value={selectedDate} onChange={(e) => setSelectedDate(e)} />
                                        </Space>}
                                </div>
                            </div>
                        </div>

                        <div className="p-1.5 w-full inline-block align-middle">
                            <div className="overflow-hidden border rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-amber-500">
                                        <tr>
                                            <th scope="col" className="py-3 pl-4">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        id="checkbox-all"
                                                        type="checkbox"
                                                        className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                                                    />
                                                    <label
                                                        htmlFor="checkbox"
                                                        className="sr-only"
                                                    >
                                                        Checkbox
                                                    </label>
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-center text-gray-900 uppercase "
                                            >
                                                Expenditure Date
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-center text-gray-900 uppercase "
                                            >
                                                Purpose
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-center text-gray-900 uppercase "
                                            >
                                                Amount
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-center text-gray-900 uppercase "
                                            >
                                                Edit
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-center text-gray-900 uppercase "
                                            >
                                                Delete
                                            </th>
                                        </tr>
                                    </thead>


                                    {userexp?.slice(0, userexp.length).map((x, index) => {
                                        return (
                                            <tbody key={index} className="divide-y divide-gray-200">
                                                <tr>
                                                    <td className="py-3 pl-4">
                                                        <div className="flex items-center h-5">
                                                            <input
                                                                type="checkbox"
                                                                className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                                                            />
                                                            <label
                                                                htmlFor="checkbox"
                                                                className="sr-only"
                                                            >
                                                                Checkbox
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium  text-center text-gray-800 whitespace-nowrap">
                                                        {x.dateofexp.substring(0, 10)}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-800 text-center whitespace-nowrap">
                                                        {x.exppurpose}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-800 text-center whitespace-nowrap">
                                                        {x.amount}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                        <Link to={`/api/editexpenditure/${x._id}`}>
                                                            <button
                                                                className="w-3/5  text-center align-center px-6
                                                                py-2.5
                                                                bg-green-600
                                                                text-white
                                                                font-medium
                                                                text-xl
                                                                cursor-pointer
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
                                                            ><MdEditNote /></button>
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                        <button className="w-3/5  text-center align-center px-6
                                                            py-2.5
                                                            bg-red-600
                                                            text-white
                                                            font-medium
                                                            text-xl
                                                            cursor-pointer
                                                            leading-tight
                                                            uppercase
                                                            rounded
                                                            shadow-md
                                                            hover:bg-amber-900 hover:shadow-lg
                                                            focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0
                                                            active:bg-amber-800 active:shadow-lg
                                                            transition
                                                            delay-150
                                                            duration-300
                                                            ease-in-out">
                                                            <Popconfirm title="Are you sure to delete this data?" onConfirm={() => triggerDelete(x._id)} onCancel={cancel} okText="Sure" cancelText="Cancel">
                                                                <a href="#"><MdDelete /></a>
                                                            </Popconfirm>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>

                                        )
                                    })}

                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </>

            <div className='flex flex-col box position-relative w-full items-center justify-center'>

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
      ease-in-out">View Charts</button>

                <div>
                    <h4>Page No: {pageNumber + 1}</h4>
                </div>
            </div>

            <div className='text-center justify-end align-baseline'>
                <button
                    className="text-center align-center px-6
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
                mr-2
                duration-200
                ease-in-out"

                    onClick={prevButtonAction}
                >Prev</button>
                {noOfPages.map((pageIndex) => (
                    <button
                        key={pageIndex}
                        className="text-center align-center px-6
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
            mr-2
            duration-200
            ease-in-out"
                        onClick={() => setPageNumber(pageIndex)}>{pageIndex + 1}</button>
                ))
                }
                <button
                    className="text-center align-center px-6
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
                mr-2
                duration-200
                highlight
                ease-in-out"


                    onClick={nextButtonAction}
                >Next</button>
            </div>
        </div>
    )
}

export default AllExpenditure