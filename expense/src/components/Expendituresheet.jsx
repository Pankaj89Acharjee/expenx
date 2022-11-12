import React, { useState, useRef, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const Expendituresheet = ({ allusers }) => {

    var defaultDate = new Date().toISOString().slice(0, 10);

    const [exppurpose, setExppurpose] = useState(null);
    const [amount, setAmount] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [dateofexp, setDateofexp] = useState(null);
    const [savesuccess, setSavesuccess] = useState(false);
    const [dateDefault, setDateDefault] = useState(defaultDate);
    
    let formRef = useRef();
    let expenseRef = useRef(null);


    useEffect(() => {
        if (savesuccess) {
            formRef.current.value = '';
            expenseRef.current.focus();
            window.location.href = '/expensesuccess';
            setSavesuccess(false);
            <div>
                <h1>Your data saved</h1>
            </div>
        }
    }, [savesuccess])

    const onOpen = async () => {
        window.location.href = '/api/getuserexpenditure'           
    }    

    const registerExpenditure = async (e) => {
        e.preventDefault();
        setSavesuccess(true);
        const response = await fetch("http://localhost:5050/api/newexpense", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                exppurpose,
                amount,
                dateofexp

            }),
        })
        const data = await response.json();
        console.log(data);
        if (data.status === 'ok') {
            alert("Saving Successful")
            console.log(dateofexp);
            setSavesuccess(true);

        } else {
            window.confirm("Data not saved")
            setSavesuccess(false);
        }
    }

    const randomImage = 'https://source.unsplash.com/500x300/?nature,photography,technology,cars,personality'

    return (
        <div>
            <img
                src={randomImage}
                className='w-full rounded-md h-370 2xl:h-510 shadow-2xl object-cover'
                alt="banner"
            />


            {allusers &&
                <div className="text-center">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                        className="rounded-full w-20 h-20 mb-4 mx-auto -mt-10 shadow-lg object-cover"
                        alt="pankaj"
                    />
                    <h5 className="text-xl text-red-600 font-medium leading-tight mb-2">{allusers.name}</h5>
                    <p className="text-gray-500">{allusers.designation}</p>
                </div>
            }



            <div className="bg-green-300 rounded-lg py-5 px-6 mb-4 text-center font-bold text-green-700 mb-3" role="alert">
                Register your expenses below. Make sure, all fileds are mandatory
            </div>

            { }
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-full">
                <form onSubmit={registerExpenditure} ref={formRef} id="my_form">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group mb-6">
                            <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Purpose for spending money </label>
                            <input type="text" className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          required
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="purpose"
                                aria-describedby="emailHelp124" placeholder="Purpose for spending"
                                value={exppurpose}
                                ref={expenseRef}
                                onChange={(e) => setExppurpose(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-6">
                            <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Amount Spent </label>
                            <input type="text" className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="purposespent"
                                aria-describedby="emailHelp124" placeholder="Amount spent"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-6">
                            <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Select Date of expenditure</label>
                            {/* <ReactDatePicker className="border-blue-500" selected={dateSelected} onChange={date => setDateSelected(date)} /> */}

                            <DatePicker
                                id="datepicker"
                                type="text"
                                selected={dateofexp}
                                onChange={date => setDateofexp(date)}
                                dateFormat='yyyy-MM-dd'
                                formatStyle="large"
                                //minDate={new Date()}
                                maxDate={new Date()}
                                isClearable
                                showYearDropdown
                                scrollableMonthYearDropdown
                                yearDropdownItemNumber={25}
                                value={dateDefault}
                                onChangeRaw={setDateDefault}
                                className="border border-solid border-gray-300"
                            />
                            { /*Date picker */}
                        </div>
                    </div>

                    <div className="flex flex-row justify-space-between">
                        <div className='flex flex-inline box position-relative w-full items-center justify-center'>
                            <button type="submit" className="
      w-2/5
      justify-center
      text-center
      align-center
      px-6
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
      ease-in-out">Save Data</button>
                        </div>



                        
                    </div>
                    {savesuccess &&
                        <div className="bg-green-200 mt-5 rounded-lg py-5 px-6 mb-4 text-center font-normal text-green-700 mb-3">
                            <h1>Your expenditure saved successfully</h1>
                        </div>
                    }
                </form>

                <div className='flex flex-inline box position-relative w-full items-center justify-center'>
                            <button onClick={onOpen} className="
      w-2/5
      justify-center
      text-center
      align-center
      px-6
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
      ease-in-out">View Expenses</button>
                        </div>
            </div>
        </div>
    )

}
export default Expendituresheet