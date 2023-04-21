import React, { useState, useEffect } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import Spinner from './Spinner'
import { MdEditNote } from 'react-icons/md';
import { message } from 'antd';

const Userprofile = (props) => {

    const { id } = useParams();

    const [loading, setLoading] = useState(false)
    const [profileimage, setProfileimage] = useState();
    const [image, setImage] = useState('');
    const [getdata, setGetdata] = useState({})

    const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology,cars,personality'

    useEffect(() => {
        setLoading(true)  //later implement try-catch block
        const fetchDataToEdit = async () => {
            try {
                const response = await axios.post(`http://localhost:5050/api/singleuser/${id}`, getdata);
                setGetdata(await response.data.data);
                //console.log("Profile data fetched as: - ", response.data.data);
                message.success('Profile Data Fetched Successfully!');
                setImage(response.data.data.profileimage)
            } catch (err) {
                message.error(err.message);
                console.log("Error in Data fetching in useEffect", err)
            }
        }
        fetchDataToEdit();
        setLoading(false);
    }, [id])

    if (loading) {
        return <Spinner message="Loading!" />
    }

    return (
        <>
            {getdata &&
                <div className='relative pb-2 h-full justify-center items-center'>
                    <div className='flex flex-col pb-5'>
                        <div className='relative flex flex-col mb-7'>
                            <div className='flex flex-col justify-center items-center'>
                                <img
                                    src={randomImage}
                                    className='w-full h-70 shadow-lg object-cover'
                                    alt="banner"
                                />
                                {!image ? '' : (
                                    <img
                                        src={`http://localhost:5050/${image}`}
                                        className="rounded-full w-24 h-24 mb-4 -mt-10 shadow-lg object-cover"
                                        alt="userpic"
                                    />
                                )}


                                <div className="flex justify-center items-center">
                                    <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
                                        <img className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg" alt="userdetails" />
                                        <div className="p-6 flex flex-col justify-start">
                                            <h4 className="text-green-400 text-2xl font-medium mb-2">{getdata?.name}</h4>
                                            <h5 className="text-gray-700 text-sm font-medium mb-2">E-mail: {getdata?.email}</h5>
                                            <h5 className="text-gray-700 text-sm font-medium mb-2">Designation: {getdata?.designation}</h5>
                                            <h5 className="text-gray-700 text-sm font-medium mb-2">City: {getdata?.city}</h5>
                                            <h5 className="text-gray-700 text-sm font-medium mb-2">Mobile: {getdata?.mobile}</h5>
                                            <br />
                                            <br />

                                            <div className='text-center justify-center items-center'>
                                                <Link to={`/api/edituserprofile/${id}`}>
                                                    <button
                                                        className="w-3/5 px-6
                                                                py-2.5
                                                                mb-3
                                                                bg-green-600
                                                                text-white
                                                                font-medium
                                                                text-3xl
                                                                text-center
                                                                justify-center
                                                                items-center
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
                                                    ><span><MdEditNote /></span></button>
                                                </Link>
                                            </div>
                                            <p className="text-center justify-center text-gray-600 text-xs">Web Designed by Acharya Labs</p>
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

