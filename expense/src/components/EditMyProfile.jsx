import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import { AiOutlineUpload } from 'react-icons/ai';
import { MdDelete, MdEditNote } from 'react-icons/md';
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
import 'animate.css';

const EditMyProfile = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [getdata, setGetdata] = useState()
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState(true);
  const [wrongImageType, setWrongImageType] = useState(false);
  const [policestation, setPolicestation] = useState();
  const [district, setDistrict] = useState();
  const [postoffice, setPostoffice] = useState();
  const [village, setVillage] = useState();
  const [skill, setSkill] = useState();
  const [computer, setComputer] = useState();
  const [experience, setExperience] = useState();
  const [highestqualification, setHighestqualification] = useState();
  const [college, setCollege] = useState();
  const [university, setUniversity] = useState();
  const [passingyear, setPassingyear] = useState();
  const [mobile, setMobile] = useState();
  const [city, setCity] = useState();
  const [designation, setDesignation] = useState();


  useEffect(() => {
    setLoading(true)
    const loadingTimer = setTimeout(() => {
      clearTimeout(loadingTimer);
      const url = `http://localhost:5050/api/singleuser/${id}`;

      axios.post(url)
        .then((response) => {
          setGetdata(response.data);
          setLoading(false);
        });
    }, 1500)
  }, [])

  console.log("Data from backend", getdata);

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
      setWrongImageType(false);
      setLoading(true);
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };





  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      EDIT AND UPDATE YOUR OWN PROFILE

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
            {imageAsset ? (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
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
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img /*When there is an image uploaded, then the imageAsset hook contains the value and its value is true. So we render codes for when imageAsset is true*/
                  src={imageAsset?.url} /*When an image was uploaded, we need to show preview*/
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"

                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div /*form*/ className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full animate__animated animate__fadeInUp">
          <label className="outline-none uppercase text-gray-600 text-2xl sm:text-2xl font-bold border-b-2 border-gray-200 animate__animated animate__zoomIn p-2">NAME: {getdata?.name}</label>
          <label className="outline-none text-gray-600 text-xl sm:text-xl font-bold border-b-2 border-gray-200 p-2">E-Mail: {getdata?.email}</label>
          {getdata && ( /*Showing authenticated getdata*/
            <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
              <img
                className="w-15 h-15 rounded-full"
                alt="profilepic"
              />
              <p className="font-bold">{getdata.getdataName}</p>
            </div>
          )}

          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile Number"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <input
            type="text"
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            placeholder="Village"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />

          <input
            type="text"
            value={postoffice}
            onChange={(e) => setPostoffice(e.target.value)}
            placeholder="Post Office"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />

          <input
            type="text"
            value={policestation}
            onChange={(e) => setPolicestation(e.target.value)}
            placeholder="Police Station"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />

          <div /*for dropdown*/ className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text:lg sm:text-xl">Select your district</p>
              <select
                onChange={(e) => {
                  setDistrict(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option /*default option*/ value="others" className="sm:text-bg bg-white">Select District</option>

                {/*Now we need to map all the categories form the categories*/}
                {districts.map((data) => {
                  return (
                    <option>{data.dist}</option>
                  )
                })}
              </select>
            </div>

            <div>
              <p className="mb-2 font-semibold text:lg sm:text-xl">Select your city</p>
              <select
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option /*default option*/ value="others" className="sm:text-bg bg-white">Select Cities</option>

                {/*Now we need to map all the categories form the categories*/}
                {cities.map((data) => {
                  return (
                    <option>{data.cityName}</option>
                  )
                })}
              </select>
            </div>

            <div>
              <p className="mb-2 font-semibold text:lg sm:text-xl">Select your designation</p>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option /*default option*/ value="others" className="sm:text-bg bg-white">Select Designation</option>

                {/*Now we need to map all the categories form the categories*/}
                {designationList.map((data) => {
                  return (
                    <option>{data.desig}</option>
                  )
                })}
              </select>
              <p className="mb-2 mt-6 uppercase text-center underline font-bold text:lg sm:text-xl">Educational Background</p>

              <p className="mb-2 font-semibold text:lg sm:text-xl">Your Highest Qualification</p>
              <select
                onChange={(e) => {
                  setHighestqualification(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option /*default option*/ value="others" className="sm:text-bg bg-white">Select Qualification</option>

                {/*Now we need to map all the categories form the categories*/}

                {highestQualification.map((data) => {
                  return (
                    <option>{data.qualification}</option>
                  )
                })}
              </select>

              <p className="mb-2 font-semibold text:lg sm:text-xl">Name of your College</p>
              <select
                onChange={(e) => {
                  setCollege(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option /*default option*/ value="others" className="sm:text-bg bg-white">Select College</option>

                {/*Now we need to map all the categories form the categories*/}

                {colleges.map((data) => {
                  return (
                    <option>{data.college}</option>
                  )
                })}
              </select>

              <p className="mb-2 font-semibold text:lg sm:text-xl">Name of your University</p>
              <select
                onChange={(e) => {
                  setUniversity(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option /*default option*/ value="others" className="sm:text-bg bg-white">Select University</option>

                {/*Now we need to map all the categories form the categories*/}

                {universities.map((data) => {
                  return (
                    <option>{data.university}</option>
                  )
                })}
              </select>

              <p className="mb-2 font-semibold text:lg sm:text-xl">Passing Year</p>
              <select
                onChange={(e) => {
                  setPassingyear(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option /*default option*/ value="others" className="sm:text-bg bg-white">Choose Year</option>

                {/*Now we need to map all the categories form the categories*/}
                {passingYears.map((data) => {
                  return (
                    <option>{data.passingyear}</option>
                  )
                })}
                
              </select>
              <p className="mb-2 mt-6 uppercase text-center underline font-bold text:lg sm:text-xl">Professional Skills</p>

              <p className="mb-2 font-semibold text:lg sm:text-xl">Expertise</p>
              <select
                onChange={(e) => {
                  setSkill(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option /*default option*/ value="others" className="sm:text-bg bg-white">Choose Your expertise</option>

                {/*Now we need to map all the categories form the categories*/}
                {expertiseList.map((data) => {
                  return (
                    <option>{data.expert}</option>
                  )
                })}
              </select>

              <p className="mb-2 font-semibold text:lg sm:text-xl">Computer Knowledge</p>
              <select
                onChange={(e) => {
                  setComputer(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option /*default option*/ value="others" className="sm:text-bg bg-white">Choose</option>

                {/*Now we need to map all the categories form the categories*/}
                {computerKnowledge.map((data) => {
                  return (
                    <option>{data.knowledge}</option>
                  )
                })}
              </select>

              <p className="mb-2 font-semibold text:lg sm:text-xl">Working Experience</p>
              <select
                onChange={(e) => {
                  setExperience(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option /*default option*/ value="others" className="sm:text-bg bg-white">Choose Experience(in yeras)</option>

                {/*Now we need to map all the categories form the categories*/}
                
                {yearsOfExperience.map((data) => {
                  return (
                    <option>{data.experience}</option>
                  )
                })}
              </select>
            </div>


            <div /*for save button*/ className="flex justify-end items-end mt-5">
              <button
                type="button"

                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Save Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default EditMyProfile