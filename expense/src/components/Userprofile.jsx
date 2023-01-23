import React, { useState, useEffect } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import Spinner from './Spinner'


const Userprofile = ({ allusers }) => {
    const { id, name } = useParams();

    const [loading, setLoading] = useState(false);
    const [singleuser, setSingleuser] = useState(null);
    

    // const navigate = useNavigate()
    const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology,cars,personality'

    useEffect(() => {
        setLoading(true)
        const loadingTimer = setTimeout(() => {
            clearTimeout(loadingTimer);            
            const url = `http://localhost:5050/api/singleuser/${id}`;

            axios.get(url)
                .then((response) => {
                    setSingleuser(response.data);
                    setLoading(false);
                });
        }, 1500)
    }, [])

    if(loading) {
        return <Spinner message="Loading!"/>
    }
    
    return (
        <>
            {singleuser && 
                <div className='relative pb-2 h-full justify-center items-center'>
                    <div className='flex flex-col pb-5'>
                        <div className='relative flex flex-col mb-7'>
                            <div className='flex flex-col justify-center items-center'>
                                <img
                                    src={randomImage}
                                    className='w-full h-70 shadow-lg object-cover'
                                    alt="banner"
                                />
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                                    className="rounded-full w-24 h-24 mb-4 -mt-10 shadow-lg object-cover"
                                    alt="userpic"
                                />

                                <div className="flex justify-center items-center">
                                    <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
                                        <img className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg" alt="userdetails" />
                                        <div className="p-6 flex flex-col justify-start">
                                            <h4 className="text-green-400 text-2xl font-medium mb-2">{singleuser.name}</h4>
                                            <h5 className="text-gray-700 text-sm font-medium mb-2">E-mail: {singleuser.email}</h5>
                                            <h5 className="text-gray-700 text-sm font-medium mb-2">Designation: {singleuser.designation}</h5>
                                            <h5 className="text-gray-700 text-sm font-medium mb-2">City: {singleuser.city}</h5>
                                            <h5 className="text-gray-700 text-sm font-medium mb-2">Mobile: {singleuser.mobile}</h5>
                                            <br />
                                            <br />
                                            <p className="text-gray-600 text-xs">Web Designed by Acharya Labs</p>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Userprofile

