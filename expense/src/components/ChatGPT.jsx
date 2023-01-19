import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const ChatGPT = () => {

    const [msg, setMessage] = useState([]);
    const [resmsg, setResmsg] = useState([]);


    const useChatGPT = async () => {       
        const responseChat = await axios.post("http://localhost:5050/askqs", {msg});
        setResmsg(responseChat.data.message);       
    }

    return (
        <div>
            <div className="mb-4">
                <label for="amount" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray">Write Your Message</label>
                <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Enter your message"
                    value={msg}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <div>
                <button className="font-semibold bg-green-700 block bg-teal hover:bg-teal-dark text-white uppercase text-lg mx-auto p-4 rounded"
                    onClick={useChatGPT}
                >Click</button>
            </div>

            <div>
                <h1>{resmsg}</h1>
            </div>




        </div>
    )
}

export default ChatGPT