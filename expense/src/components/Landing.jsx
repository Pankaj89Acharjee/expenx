import React from 'react'
import { useNavigate, Link } from 'react-router-dom'


const Landing = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div>

                <section className="h-screen">
                    <div className="px-6 h-full text-blue-300 bg-black">
                        <div
                            className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
                        >
                            <div
                                className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
                            >
                                <img
                                    src="https://media.istockphoto.com/photos/cut-expenses-picture-id483037318?k=20&m=483037318&s=612x612&w=0&h=EsEee32b67tu__RkrOGwETT89ktQSxZsjs4jI2tilZ0="
                                    className="w-25 rounded-2xl  h-25 -mt-10 shadow-xl object-cover"
                                    alt="Sample image"
                                />
                            </div>
                            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                                <form>
                                    <div className="flex flex-row items-center justify-center lg:justify-start">
                                        <p className="text-lg mb-0 mr-4">Register with us to serve you</p>
                                    </div>

                                    <div className="text-center lg:text-left">
                                        <Link
                                            to='/register'
                                            className="flex my-5 mb-3 gap-2 p-2 text-bold text-center item-center bg-blue-600 rounded-lg shadow-lg mx-3"
                                        >
                                            <p className='items-center text-center ml-2 capitalize font-bold'>Register</p>
                                        </Link>
                                        <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                            Already have an account?
                                            <Link
                                            to='/login'
                                            classNameName="flex my-5 mb-3 gap-2 p-2 text-bold text-center item-center bg-blue-600 rounded-lg shadow-lg mx-3"
                                        >
                                            <p classNameName='items-center text-center ml-2 capitalize font-bold'>Login</p>
                                        </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default Landing