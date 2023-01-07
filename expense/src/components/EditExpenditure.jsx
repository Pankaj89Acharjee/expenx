import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import logo from '../assets/logoexp.jpeg';
import bgsticker from '../assets/bgedit.jpg';
import bgsticker2 from '../assets/bgexp.jpg';
import { DatePicker, Space } from 'antd';
import { category } from '../data/categorydata'

const EditExpenditure = () => {

  const { id } = useParams();
  const [expdata, setExpdata] = useState({ //This line makes input box editable for any data in it
    exppurpose: " ",
    amount: " "
  });
  const [categories, setCategories] = useState(null);
  const [showinput, setShowinput] = useState(false);
  const [editable, setEditable] = useState()

  const editHandler = (e) => {
    setExpdata({ ...expdata, [e.target.name]: e.target.value }) //This line makes input box editable for any data in it
  }

  const makeEditable = () => {
    setShowinput(true);
  }

  const updateDetailsHandler = () => {
    setShowinput(false);
  }

  useEffect(() => {
    const editFunc = async () => {
      const expUrl = await axios.get(`http://localhost:5050/api/editexpenditure/${id}`);
      setExpdata(await expUrl.data);
      console.log("Expense data received", expUrl.data);
    }
    editFunc();
    setShowinput(false);
  }, [])

  return (
    <div className='relative'>
      {/* <div className='bg-gradient-to-br from-green-500 via-amber-400 to-red-200 rounded'></div> */}
      <img className='h-full' src={bgsticker} alt="background" />
      {expdata?.length === 0 ? "Nothing to show" : (
        <div>
          {/* <div >
            <img className='x-auto w-10 h-10 rounded-full md:w-15 md:h-10' src={logo} alt="logo" />
          </div> */}
          <div className="absolute sm:-translate-y-2/5 -translate-x-1/5 -translate-y-1/2 flex items-center h-screen w-full bg-teal-lighter sm:h-8 md:h-16 lg:h-24 xl:h-48">
            <div className="w-full bg-gradient-to-br from-green-500 via-amber-400 to-red-200 rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
              <h1 className="block w-full text-center text-grey-darkest mb-6">Expense Details</h1>
              <form className="opacity-60 hover:opacity-100 mb-4 md:flex md:flex-wrap md:justify-between md:max-w-sm md:mx-auto" onSubmit={updateDetailsHandler}>
                <div className="flex flex-col mb-4 md:w-1/2">
                  <label className="mb-2 uppercase tracking-wide font-semibold text-md text-amber-700" for="first_name">Expense For</label>
                  <input className="form-control border py-2 px-3 text-green-500 md:mr-2 font-semibold"
                    type="text"
                    name="exppurpose"
                    id="exppur"
                    value={expdata?.exppurpose}
                    onChange={(e) => editHandler(e)}
                  />
                </div>
                <div className="flex flex-col mb-4 md:w-1/2">
                  <label className="mb-2 uppercase font-semibold text-md text-amber-700 md:ml-2" for="last_name">Amount</label>
                  <input className="form-control border py-2 px-3 text-green-500 md:ml-2 font-semibold"
                    type="text"
                    name="amount"
                    id="expamt"
                    value={expdata?.amount}
                    onChange={(e) => editHandler(e)}
                  />
                </div>
                <div className="flex flex-col justify-between mb-4 md:w-1/2">
                  <label className="mb-2 uppercase font-semibold text-md text-amber-700 md:ml-2" for="last_name">Category</label>
                  <h1 className="border py-2 px-3 text-gray-900 font-semibold md:mr-2">{expdata?.categories}</h1>
                </div>

                {showinput &&
                  <div className="flex flex-col mb-4 md:w-full">
                    <label className="mb-2 uppercase font-semibold text-md text-amber-700" for="email">Choose Category</label>
                    <select className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                }

                <div className="flex flex-col mb-6 md:w-full">
                  <label className="mb-2 uppercase font-semibold text-md text-amber-700" for="password">Date of expenditure</label>
                  <h1 className="border py-2 px-3 text-gray-900 font-semibold md:mr-2 mb-3">{expdata?.dateofexp?.substring(0, 10)}</h1>
                  {showinput &&
                    <Space direction='vertical' size={12}>
                      <DatePicker
                        name='datepick'
                      />
                    </Space>
                  }
                </div>
                <button className="font-semibold bg-amber-700 block bg-teal hover:bg-teal-dark text-white uppercase text-lg mx-auto p-4 rounded"
                  type="button"
                  onClick={makeEditable}
                >Click to edit</button>

                <button className="font-semibold bg-green-700 block bg-teal hover:bg-teal-dark text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Update</button>
              </form>
            </div>
          </div>
          <img className='h-full' src={bgsticker} alt="background" />
        </div>
      )}

    </div>
  )
}

export default EditExpenditure