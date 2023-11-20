import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const GiveReview = () => {
    const [serverError, setServerError] = useState({});
    const Navigate = useNavigate();


    const [review, setReview] = useState({});

    const handleData = (e)=>{
        setReview({...review, [e.target.name]:e.target.value})
    }
    const handleSubmit = (e)=> {
        e.preventDefault();
        
        axios.post(`/api/feedback/`, review)
        .then((res)=> {
              if(res.data){
                console.log(res.data,"reviews")
                setServerError(res.data.message);
                toast(res.data.message,{autoClose:3000})
              }
              setTimeout(() => { 
                window.location.reload(true);
              }, 3000);
        })
        .catch((err)=> {setServerError(err.response.data.errors)})
    }
    return (
        <div className="w-full relative flex flex-col items-center justify-center">
            <div className="w-full p-6 bg-white rounded-md shadow-lg border-top min-h-screen">
                <div><h1 className="text-3xl font-semibold text-gray-700 mb-5">Share Your Experience</h1></div> <hr />
                <form className="space-y-4 mt-10">
                
                    <div className="flex" >
                        <level className="label w-80">
                            <span className="text-base label-text">Organization Name:</span>
                        </level>
                        <input name="organization_name" onChange={handleData} type="text" placeholder="Enter Organization name" className="w-full input input-bordered" />
                    </div>
                    <div className="flex">
                        <label className="label w-80">
                            <span className="text-base label-text">Your Company Designation:</span>
                        </label>
                        <input name="org_position" onChange={handleData} type="text" placeholder="Enter Designation" className="w-full input input-bordered" />
                    </div>
                    <div className="flex items-start">
                        <label className="label w-80">
                            <span className="text-base label-text">Experience(review):</span>
                        </label>
                        <textarea  name="message" onChange={handleData} type="text-area" placeholder="Enter Designation" className="w-full input input-bordered h-32" />
                    </div>
                    <div>
                        <button onClick={handleSubmit} className="btn btn-block btn-primary bg-gradient-to-r from-purple-700 to-indigo-500">Submit Review</button>
                    </div>
                </form>
            </div>
        </div>
    )
  }
  
  export default GiveReview