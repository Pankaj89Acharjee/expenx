import React, { useState } from 'react'
import logo from '../assets/logoexp.jpeg'
import Spinner from './Spinner'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [loading, setLoading] = useState(false);


    const loginUser = async (e) => {
        e.preventDefault();
        setLoading(true)
        const response = await fetch("http://localhost:5050/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                email,
                password,
                
            }),
        })

        const data = await response.json();
        if (data.user) {
            localStorage.setItem('token', data.user);
            setIsLoggedin(true);
            setLoading(false);
            alert("Login Successful");            
            window.location.href = '/home';
        } else {
            alert("Email and/or password is wrong!");
            
        }
        console.log(data);
    };

    const logoutUser = () => {
        localStorage.removeItem('token');
        setIsLoggedin(false);
        alert("Logged Out");
        window.location.href = '/login';
    }

    return (
        <>        
            <div>        
                <section className="bg-gray-50 dark:bg-gray-600">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                            EXPENX
                        </a>
                        {!isLoggedin ? (
                            <>
                                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                            Sign in to use expenx!
                                        </h1>
                                        <form onSubmit={loginUser} className="space-y-4 md:space-y-6" action="#">
                                            <div>
                                            {loading && <Spinner />}
                                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="name@company.com"
                                                    required=""
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    placeholder="••••••••"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    required=""
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-start">
                                                    <div className="flex items-center h-5">
                                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                                    </div>
                                                    <div className="ml-3 text-sm">
                                                        <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                                    </div>
                                                </div>
                                                <a href="/register" className="text-sm font-medium text-primary-600 hover:underline text-gray-200">Forgot password?</a>
                                            </div>
                                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                                Don’t have an account? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </>

                        ) : (
                            <>
                                <h1>Hi User! You are logged in</h1>
                                <button onClickCapture={logoutUser}>Logout</button>
                            </>
                        )}

                    </div>
                </section>
            </div>
        </>

    )
}

export default Login