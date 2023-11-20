import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ContactPage = () => {
    const Navigate = useNavigate();
    const [serverError, setServerError] = useState({});
    const [message, setMessage] = useState();
    const formRef = useRef(null);

    const handleData = (e)=>{
        setMessage({...message, [e.target.name]:e.target.value});
    }
    const handleReset = () => {
      formRef.current.reset();
    };
    const handleSubmit = (e)=> {
        e.preventDefault();
        
        
        axios.post(`/api/contact/`, message)
        .then((res)=> {
              if(res.data){
                toast.success(res.data.message)
                handleReset();
              }
        })
        .catch((err)=> {setServerError(err.response.data.errors)})
    }
    


  return (
    <div className='bg-gray-900 min-h-screen flex items-center'  style={{height:'85vh', paddingTop:"30px"}}>
    <div className="">


    <section className="container bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent mx-auto md:px-6" style={{justifyContent:"center"}}>
      <div className="flex flex-wrap " >
        <div className="mb-10 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6">
          <h2 className="mb-6 text-3xl font-bold">Contact assetOptimizeX</h2>
          <p className="mb-6 text-neutral-500 dark:text-neutral-300">
          Interested in chatting with the assetOptimizeX team?


Fill out the form and one of our experts will reach out to answer your questions and show you how assetOptimizeX can change the way your organization manages digital assets.
          </p>
          <p className="mb-2 text-neutral-500 dark:text-neutral-300">
            Dhaka, Bangaldesh
          </p>
          <p className="mb-2 text-neutral-500 dark:text-neutral-300">
            +88017111111
          </p>
          <p className="mb-2 text-neutral-500 dark:text-neutral-300">
            assetoptimizex@gmail.com
          </p>
        </div>
        <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6">
        <form className="space-y-4" ref={formRef}>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-semibold text-gray-600">Name</label>
            <input
                name="name"
                type="text"
                id="name"
                onChange={handleData}
                className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold text-gray-600">Email</label>
            <input
                name="email"
                type="email"
                id="email"
                onChange={handleData}
                className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="message" className="text-sm font-semibold text-gray-600">Message</label>
            <textarea
                name="message"
                id="message"
                rows="4"
                onChange={handleData}
                className="w-full p-2 text-gray-900 border rounded focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 p-5 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:ring focus:ring-blue-200"
          >
            Send
          </button>
        </form>
        </div>
      </div>
    </section>
    </div>
    </div>

  )
}

export default ContactPage