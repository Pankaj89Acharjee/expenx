import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Routes, Route } from 'react-router-dom'
import Spinner from './Spinner'
import { AiOutlineUpload, AiOutlineLogout } from 'react-icons/ai';
import { MdDelete, MdEditNote, MdKeyboardArrowDown } from 'react-icons/md';
import { cities } from '../data/cityList';
import { colleges } from '../data/collegeList';
import { computerKnowledge } from '../data/computerKnowledge';
import { designationList } from '../data/designationList';
import { districts } from '../data/districtList';
import { yearsOfExperience } from '../data/experienceYearList';
import { expertiseList } from '../data/expertiseList';
import { highestQualification } from '../data/highestQualification';
import { passingYears } from '../data/passingYearList';
import { universities } from '../data/universityList';
import { message } from 'antd';
//import '../../../backend/assets/uploads'
//import 'animate.css';




const EditMyProfile = ({ imageName }) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [getdata, setGetdata] = useState({

    mobile: "",
    village: "",
    postoffice: "",
    ps: "",
    district: "",
    city: "",
    designation: "",
    graduation: "",
    collegename: "",
    university: "",
    passingyear: "",
    skilled: "",
    programsknown: "",
    yearofexperience: "",
  }) //Hook for saving new data
  const [loading, setLoading] = useState(false)
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const [profileimage, setProfileimage] = useState();
  const [showinput, setShowinput] = useState(false);
  const [success, setSuccess] = useState();
  const [image, setImage] = useState('');


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
    setShowinput(false);
  }, [id])





  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    console.log("SelectedFile variable is", selectedFile)
    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
      setProfileimage(selectedFile);
      setWrongImageType(false);
      setLoading(true);
      try {
        let formData = new FormData();
        formData.append("user", selectedFile)
        axios.post(`http://localhost:5050/api/uploadprofilepic/${id}`, formData)
          .then((result) => {
            setImageAsset(result);
            console.log("Photo Uploaded");
            message.success("Profile photo uploaded successfully");
            setLoading(false);
          })
      } catch (err) {
        console.log("Error", err)
        message.error("Error in Uploading photo")
      }
    } else {
      setLoading(false);
      setWrongImageType(true);
      message.error("Please select png, svg, jpeg, gif, tff files only")
    }
  };


  //For Uploading Image into the Database
  const uploadImageIntoDB = async () => {
    try {
      let formData = new FormData();
      formData.append("user", profileimage);
      const uploadInDB = await axios.post(`http://localhost:5050/api/uploadphotoindb/${id}`, formData);
      if (uploadInDB.status === 200) {
        message.success(uploadInDB.data.message);
        setTimeout(() => {
          reloadPage()
        }, 2000)
      } else if (uploadInDB.statusCode === 0) {
        message.error(uploadInDB.data.error)
      }
    } catch (err) {
      message.error(err.message);
    }
  }

  function reloadPage() {    
    navigate(-1)
    //navigate(`/api/edituserprofile/${id}`)
  }
  
  //Edit Data Handler
  const editDataHandler = (e) => {
    setGetdata({ ...getdata, [e.target.name]: e.target.value })
  }

  const makeEditable = () => {
    setShowinput(true);
  }


  const updateData = async (e) => {
    e.preventDefault();
    setShowinput(false);
    const updateUser = await axios.patch(`http://localhost:5050/api/updateuserdata/${id}`);
    setSuccess(updateUser.data.success)
    const result = updateUser;
    if (result.status === 422) {
      console.log("Not Updated");
      message.error('There was some issue to update your data!');
    } else {
      console.log("Data Updated");
      message.success('Data Updated Successfully!');
    }
  }


  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      EDIT AND UPDATE YOUR OWN PROFILE
      {getdata?.length === 0 ? "Nothing to show" : (
        <div className=" flex flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
          <div className="bgcustomcolor3 p-3 flex flex-0.7 w-full rounded-lg animate__animated animate__flipInY">
            <div className=" flex rounded-lg justify-center items-center flex-col border-2 border-dotted border-white p-3 w-full h-420">
              {loading && (
                <Spinner />
              )}
              {
                wrongImageType && (
                  <p className='text-red-500'>It&apos;s incorrect file type.</p>
                )
              }
              {!imageAsset ? (
                <>
                  <label className='text-white'>
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col justify-center items-center">
                        <p className="text-lg">Upload Your Profile Picture</p>
                        <br />
                        <p className="font-bold text-2xl">
                          <AiOutlineUpload />
                        </p>
                      </div>


                      <p className="mt-32 text-black-300">
                        Supported formats - JPG, JPEG, SVG, PNG, GIF and TIFF within 20 MB
                      </p>
                    </div>
                    <input
                      type="file"
                      name="avatar"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <div className="relative h-full">
                  <img //for previewing uploaded image, we need URL.createObjectURL(HOOK)
                    src={profileimage === `` ? `` : URL.createObjectURL(profileimage)}
                    alt="uploaded-pic"
                    className="h-full w-full"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                    onClick={() => setImageAsset(null)}
                  >
                    <MdDelete />
                  </button>

                  <div className="flex flex-row justify-center items-center">
                    <button /*for uploading in Database*/
                      type="button"
                      className="absolute bottom-3 left-3 p-3 rounded-full bg-amber-500 text-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                      onClick={uploadImageIntoDB}
                    >
                      UPLOAD
                    </button>
                  </div>
                </div>


              )}
            </div>
          </div>


          {image &&
            < img
              src={`http://localhost:5050/${image}`}
              className="w-12 h-12 rounded-full"
              alt="profilepic"
            />
          }
          <form /*form*/ onSubmit={updateData} encType="multipart/form-data" className="flex flex-1 flex-col gap-6 lg:p-5 p-3 lg:w-4/5 w-full animate__animated animate__fadeInUp shadow-stone-400 shadow-2xl">
            <label className="outline-none uppercase text-gray-600 text-2xl sm:text-2xl font-bold border-b-2 border-gray-200 animate__animated animate__zoomIn p-2">NAME: {getdata?.name}</label>
            <label className="outline-none text-gray-600 text-xl sm:text-xl font-bold border-b-2 border-gray-200 p-2">E-Mail: {getdata?.email}</label>

            {getdata && (
              <div className="flex gap-2 mt-2 mb-2 items-center rounded-lg ">

                <p className="font-bold">{getdata?.getdataName}</p>
              </div>
            )}
            <div className='flex flex-col rounded-2xl justify-center items-center content-center bgcustomcolor5 gap-5 mt-5 mb-5 w-full'>
              <div className='flex flex-col items-center w-1/5'>
                <label className="mb-2 font-semibold text:xl sm:text-sm text-dark text-center md:ml-2" for="last_name">Mobile No </label>
                {showinput ?
                  <input
                    type="text"
                    id="mobid"
                    name="mobile"
                    value={getdata?.mobile || ''}
                    onChange={(e) => editDataHandler(e)}
                    placeholder="Mobile Number"
                    className="form-control outline-none border-none rounded-2xl opacity-80 text-base text-center text:xl sm:text-sm border-b-2 border-gray-200 p-2"
                  />
                  : <input
                    type="text"
                    id="mobid"
                    name="mobile"
                    disabled
                    value={getdata?.mobile || ''}
                    onChange={(e) => editDataHandler(e)}
                    placeholder="Mobile Number"
                    className="form-control outline-none border-none rounded-2xl opacity-80 text-base text-center text:xl sm:text-sm border-b-2 border-gray-200 p-2"
                  />}
                <label className="mb-2 font-semibold text:xl sm:text-sm text-dark text-center md:ml-2" for="last_name">Village</label>
                {showinput ?
                  <input
                    type="text"
                    id="villid"
                    name="village"
                    value={getdata?.village}
                    onChange={(e) => editDataHandler(e)}
                    placeholder="Village"
                    className="form-control outline-none border-none rounded-2xl opacity-80 text-base text-center text:xl sm:text-sm border-b-2 border-gray-200 p-2"
                  />
                  :
                  <input
                    type="text"
                    id="villid"
                    name="village"
                    disabled
                    value={getdata?.village}
                    onChange={(e) => editDataHandler(e)}
                    placeholder="Village"
                    className="form-control outline-none border-none rounded-2xl opacity-80 text-base text-center text:xl sm:text-sm border-b-2 border-gray-200 p-2"
                  />
                }


                <label className="mb-2 font-semibold text:xl sm:text-sm text-dark text-center md:ml-2" for="last_name">Post Office </label>
                {showinput ?
                  <input
                    type="text"
                    id="postid"
                    name="postoffice"
                    value={getdata?.postoffice}
                    onChange={(e) => editDataHandler(e)}
                    placeholder="Post Office"
                    className="form-control outline-none border-none rounded-2xl opacity-80 text-base text-center text:xl sm:text-sm border-b-2 border-gray-200 p-2"
                  />
                  :
                  <input
                    type="text"
                    id="postid"
                    name="postoffice"
                    disabled
                    value={getdata?.postoffice}
                    onChange={(e) => editDataHandler(e)}
                    placeholder="Post Office"
                    className="form-control outline-none border-none rounded-2xl opacity-80 text-base text-center text:xl sm:text-sm border-b-2 border-gray-200 p-2"
                  />
                }

                <label className="font-semibold text:xl sm:text-sm text-dark text-center mb-4 md:ml-2" for="last_name">Police Station </label>
                {showinput ?
                  <input
                    type="text"
                    id="psid"
                    name="ps"
                    value={getdata?.ps}
                    onChange={(e) => editDataHandler(e)}
                    placeholder="Police Station"
                    className="form-control outline-none border-none rounded-2xl opacity-80 text-base text-center text:xl sm:text-sm border-b-2 border-gray-200 p-2"
                  />
                  :
                  <input
                    type="text"
                    id="psid"
                    name="ps"
                    disabled
                    value={getdata?.ps}
                    onChange={(e) => editDataHandler(e)}
                    placeholder="Police Station"
                    className="form-control outline-none border-none rounded-2xl opacity-80 text-base text-center text:xl sm:text-sm border-b-2 border-gray-200 p-2"
                  />
                }
              </div>
            </div>

            {/* End of Div for Showing Text boxes */}


            <div className="flex flex-col ">
              <div>
                <p className="mb-2 font-semibold text:lg sm:text-xl">Select your district</p>
                {showinput ?
                  <select
                    name="district"
                    value={getdata?.district}
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Select District</option>

                    {/*Now we need to map all the categories form the categories*/}
                    {districts.map((data) => {
                      return (
                        <option>{data.dist}</option>
                      )
                    })}
                  </select>
                  :
                  <select
                    name="district"
                    value={getdata?.district}
                    disabled
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Select District</option>

                    {/*Now we need to map all the categories form the categories*/}
                    {districts.map((data) => {
                      return (
                        <option>{data.dist}</option>
                      )
                    })}
                  </select>
                }
              </div>

              <div>
                <p className="mb-2 font-semibold text:lg sm:text-xl">Select your city</p>
                {showinput ?
                  <select
                    name="city"
                    value={getdata?.city}
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Select Cities</option>

                    {/*Now we need to map all the categories form the categories*/}
                    {cities.map((data) => {
                      return (
                        <option>{data.cityName}</option>
                      )
                    })}
                  </select>
                  :

                  <select
                    name="city"
                    value={getdata?.city}
                    disabled
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Select Cities</option>

                    {/*Now we need to map all the categories form the categories*/}
                    {cities.map((data) => {
                      return (
                        <option>{data.cityName}</option>
                      )
                    })}
                  </select>
                }
              </div>

              <div>
                <p className="mb-2 font-semibold text:lg sm:text-xl">Select your designation</p>
                {showinput ?
                  <select
                    name="designation"
                    value={getdata?.designation}
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Select Designation</option>

                    {/*Now we need to map all the categories form the categories*/}
                    {designationList.map((data) => {
                      return (
                        <option>{data.desig}</option>
                      )
                    })}
                  </select>
                  :
                  <select
                    name="designation"
                    value={getdata?.designation}
                    disabled
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Select Designation</option>
                    {/*Now we need to map all the categories form the categories*/}
                    {designationList.map((data) => {
                      return (
                        <option>{data.desig}</option>
                      )
                    })}
                  </select>
                }

                <p className="mb-2 mt-6 uppercase text-center underline font-bold text:lg sm:text-xl">Educational Background</p>

                <p className="mb-2 font-semibold text:lg sm:text-xl">Your Highest Qualification</p>
                {showinput ?
                  <select
                    name="graduation"
                    value={getdata?.graduation}
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Select Qualification</option>

                    {/*Now we need to map all the categories form the categories*/}

                    {highestQualification.map((data) => {
                      return (
                        <option>{data.qualification}</option>
                      )
                    })}
                  </select>
                  :
                  <select
                    name="graduation"
                    value={getdata?.graduation}
                    disabled
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Select Qualification</option>

                    {/*Now we need to map all the categories form the categories*/}

                    {highestQualification.map((data) => {
                      return (
                        <option>{data.qualification}</option>
                      )
                    })}
                  </select>
                }


                <p className="mb-2 font-semibold text:lg sm:text-xl">Name of your College</p>
                {showinput ?
                  <select
                    name="collegename"
                    value={getdata?.collegename}
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Select College</option>

                    {/*Now we need to map all the categories form the categories*/}

                    {colleges.map((data) => {
                      return (
                        <option>{data.college}</option>
                      )
                    })}
                  </select>
                  :
                  <select
                    name="collegename"
                    value={getdata?.collegename}
                    disabled
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Select College</option>

                    {/*Now we need to map all the categories form the categories*/}

                    {colleges.map((data) => {
                      return (
                        <option>{data.college}</option>
                      )
                    })}
                  </select>
                }

                <p className="mb-2 font-semibold text:lg sm:text-xl">Name of your University</p>
                {showinput ?
                  <select
                    name="university"
                    value={getdata?.university}
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Select University</option>

                    {/*Now we need to map all the categories form the categories*/}

                    {universities.map((data) => {
                      return (
                        <option>{data.university}</option>
                      )
                    })}
                  </select>
                  :
                  <select
                    name="university"
                    value={getdata?.university}
                    disabled
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Select University</option>

                    {/*Now we need to map all the categories form the categories*/}

                    {universities.map((data) => {
                      return (
                        <option>{data.university}</option>
                      )
                    })}
                  </select>
                }


                <p className="mb-2 font-semibold text:lg sm:text-xl">Passing Year</p>
                {showinput ?
                  <select
                    name="passingyear"
                    value={getdata?.passingyear}
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Choose Year</option>

                    {/*Now we need to map all the categories form the categories*/}
                    {passingYears.map((data) => {
                      return (
                        <option>{data.passingyear}</option>
                      )
                    })}
                  </select>
                  :
                  <select
                    name="passingyear"
                    value={getdata?.passingyear}
                    disabled
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Choose Year</option>

                    {/*Now we need to map all the categories form the categories*/}
                    {passingYears.map((data) => {
                      return (
                        <option>{data.passingyear}</option>
                      )
                    })}
                  </select>
                }


                <p className="mb-2 mt-6 uppercase text-center underline font-bold text:lg sm:text-xl">Professional Skills</p>

                <p className="mb-2 font-semibold text:lg sm:text-xl">Expertise</p>
                {showinput ?
                  <select
                    name="skilled"
                    value={getdata?.skilled}
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Choose Your expertise</option>

                    {/*Now we need to map all the categories form the categories*/}
                    {expertiseList.map((data) => {
                      return (
                        <option>{data.expert}</option>
                      )
                    })}
                  </select>
                  :
                  <select
                    name="skilled"
                    value={getdata?.skilled}
                    disabled
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Choose Your expertise</option>

                    {/*Now we need to map all the categories form the categories*/}
                    {expertiseList.map((data) => {
                      return (
                        <option>{data.expert}</option>
                      )
                    })}
                  </select>
                }


                <p className="mb-2 font-semibold text:lg sm:text-xl">Computer Knowledge</p>
                {showinput ?
                  <select
                    name='programsknown'
                    value={getdata?.programsknown}
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Choose</option>

                    {/*Now we need to map all the categories form the categories*/}
                    {computerKnowledge.map((data) => {
                      return (
                        <option>{data.knowledge}</option>
                      )
                    })}
                  </select>
                  :
                  <select
                    name='programsknown'
                    value={getdata?.programsknown}
                    disabled
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Choose</option>

                    {/*Now we need to map all the categories form the categories*/}
                    {computerKnowledge.map((data) => {
                      return (
                        <option>{data.knowledge}</option>
                      )
                    })}
                  </select>
                }


                <p className="mb-2 font-semibold text:lg sm:text-xl">Working Experience</p>
                {showinput ?
                  <select
                    name="yearofexperience"
                    value={getdata?.yearsofexperience}
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Choose Experience(in yeras)</option>

                    {/*Now we need to map all the categories form the categories*/}

                    {yearsOfExperience.map((data) => {
                      return (
                        <option>{data.experience}</option>
                      )
                    })}
                  </select>
                  :
                  <select
                    name="yearofexperience"
                    value={getdata?.yearsofexperience}
                    disabled
                    onChange={(e) => editDataHandler(e)}
                    className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <option /*default option*/ className="sm:text-bg bg-white">Choose Experience(in yeras)</option>

                    {/*Now we need to map all the categories form the categories*/}

                    {yearsOfExperience.map((data) => {
                      return (
                        <option>{data.experience}</option>
                      )
                    })}
                  </select>
                }
              </div>


              <div className='flex flex-row items-center justify-center space-x-4'>
                {showinput && (
                  <div /*for save button*/ className="flex justify-end items-end mt-5">
                    <button
                      type="submit"
                      className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
                    >
                      Update
                    </button>
                  </div>
                )}

                <div /*for save button*/ className="flex justify-end items-end mt-5">
                  <button
                    type="button"
                    onClick={makeEditable}
                    className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div >
  );
};


export default EditMyProfile