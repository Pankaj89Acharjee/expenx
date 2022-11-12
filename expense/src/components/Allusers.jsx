import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Allusers = () => {

    const [completeuser, setCompleteuser] = useState(null)

    useEffect(() => {
        const fetchAllUsers = async () => {
            const { data } = await axios.get("http://localhost:5050/api/getuser")
            setCompleteuser(data)
        }

        fetchAllUsers();
    }, [])


    return (
        <div className="flex flex-col my-5 mb-3 gap-2 p-2 text-bold text-center items-center bg-blue-400 rounded-lg shadow-lg mx-3" >
            <p className='items-center text-center ml-2 capitalize font-bold'></p>
            {completeuser?.map((usersall) => {
                return (
                    <div key={usersall._id}>
                        <h2>Id:{usersall._id}</h2>
                        <h2>User:{usersall.name}</h2>
                        <h2>Email:{usersall.email}</h2>
                        <h2>City:{usersall.city}</h2>
                        <h2>Designation:{usersall.designation}</h2>
                    </div>
                )
            })}
        </div>
    )
}




export default Allusers