import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { incomeCategory } from '../data/incomecategory'
import { DatePicker, Space, message } from 'antd';

const EditIncome = () => {

  const { id } = useParams();
  const [incomedata, setIncomedata] = useState({
    amount: "",
    incomefrom: "",
  });
  const [showinput, setShowinput] = useState(false);
  const [success, setSuccess] = useState()


  useEffect(() => {
    const editFunc = async () => {
      const incomeUrl = await axios.get(`http://localhost:5050/api/editincome/${id}`);
      setIncomedata(await incomeUrl.data);
      console.log("Expense data received", incomeUrl.data);
      message.success('Data Fetched Successfully!');
    }
    editFunc();
    setShowinput(false);
  }, [id])

  const editHandler = (e) => {
    setIncomedata({ ...incomedata, [e.target.name]: e.target.value })
  }

  const makeEditable = () => {
    setShowinput(true);
  }

  const updateDetailsHandler = async (e) => {
    e.preventDefault();
    setShowinput(false);
    const updateExp = await axios.patch(`http://localhost:5050/api/updateincome/${id}`, incomedata);
    setSuccess(updateExp.data.success);
    const result = updateExp;
    if (result.status === 422) {
      console.log("Not Updated");
      message.error('There was some issue to update your data!');
    } else {
      console.log("Data Updated");
      message.success('Data Updated Successfully!');
    }
  }


  return (
    <div>
      {incomedata?.length === 0 ? "Nothing to show" : (
        <div className="relative flex items-center sm:w-1/2 md:w-full lg:w-full xl:w-full bg-teal-lighter sm:h-full md:h-full lg:h-full xl:h-full">
          <div className="w-full bg-gradient-to-br from-green-500 via-amber-400 to-red-200 rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
            <h1 className="block w-full text-center text-grey-darkest mb-6">Income Details</h1>
            <p className='text-red-500 font-bold text-xl'>{success}</p>
            <form className="opacity-60 hover:opacity-100 mb-4 md:flex md:flex-wrap md:justify-between md:max-w-sm md:mx-auto" onSubmit={updateDetailsHandler}>
              <div className="flex flex-col mb-4 md:w-1/2">
                <label className="mb-2 uppercase tracking-wide font-semibold text-md text-amber-700" for="first_name">Income Amount</label>
                <input className="form-control border py-2 px-3 text-green-500 md:mr-2 font-semibold"
                  type="text"
                  name="amount"
                  id="exppur"
                  value={incomedata?.amount}
                  onChange={(e) => editHandler(e)}
                />
              </div>

              <div className="flex flex-col justify-between mb-4 md:w-1/2">
                <label className="mb-2 uppercase font-semibold text-md text-amber-700 md:ml-2" for="last_name">Source of Income</label>
                <h1 className="border py-2 px-3 text-gray-900 font-semibold md:mr-2">{incomedata?.incomefrom}</h1>
              </div>


              {showinput &&
                <div className="flex flex-col mb-4 md:w-full">
                  <label className="mb-2 uppercase font-semibold text-md text-amber-700" for="email">Choose Income Category</label>
                  <select className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    onChange={(e) => editHandler(e)}
                    name="incomefrom"
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
              }

              <div className="flex flex-col mb-6 md:w-full">
                <label className="mb-2 uppercase font-semibold text-md text-amber-700" for="password">Date of credit</label>
                <h1 className="border py-2 px-3 text-gray-900 font-semibold md:mr-2 mb-3">{incomedata?.dateselect?.substring(0, 10)}</h1>
                {showinput &&
                    <Space direction='vertical' size={12}>
                      <DatePicker
                        id='dateofexp'
                        onChange={(e) => editHandler(e)}
                      />
                    </Space>
                  }
              </div>
              <button className="font-semibold bg-amber-700 block bg-teal hover:bg-teal-dark text-white uppercase text-lg mx-auto p-4 rounded"
                type="button"
                onClick={makeEditable}
              >Click to edit</button>
              {showinput &&
                <button className="font-semibold bg-green-700 block bg-teal hover:bg-teal-dark text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Update</button>
              }
            </form>
          </div>
        </div>

      )}

    </div>
  )
}

export default EditIncome