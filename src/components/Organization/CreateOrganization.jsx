import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const CreateOrganization = () => {
    const [userData, setUserData] = useState({});
    const [serverError, setServerError] = useState({})
    const [serverMsg, setServerMsg] = useState("")


    const handleData = (e)=>{
        setUserData({...userData, [e.target.name]:e.target.value})
    }
    
    const handleSubmit = (e)=> {
        e.preventDefault();
        
        axios.post("/api/organization/register/", userData)
        .then((res)=> {
              if(res.data){
                setServerMsg(res.data.message)
              }
        })
        .catch((err)=> { setServerError(err.response.data.errors)})
    }
    return (
        <div className="w-full relative flex flex-col items-center justify-center">
            <div className="w-full p-6 bg-white rounded-md shadow-lg border-top ">
                <div><h1 className="text-3xl font-semibold text-gray-700 mb-5">Create Organization</h1></div>
                <form className="space-y-4">
                
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Organization Name</span>
                        </label>
                        <input name="organization_name" onChange={handleData} type="text" placeholder="Enter Organization name" className="w-full input input-bordered" />
                        { serverError.organization_name ? <small className="text-red-600">{serverError.organization_name[0]}</small>:"" }
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Organization Description</span>
                        </label>
                        <input name="description" onChange={handleData} type="text" placeholder="Organization Description" className="w-full input input-bordered" />
                        { serverError.description ? <small className="text-red-600">{serverError.description[0]}</small>:"" }
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Your Country</span>
                        </label>
                        <input name="country" onChange={handleData} type="text" placeholder="Bangladesh" className="w-full input input-bordered" />
                        { serverError.country ? <small className="text-red-600">{serverError.country[0]}</small>:"" }
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Zip Code</span>
                        </label>
                        <input name="zip_code" onChange={handleData} type="text" placeholder="Enter Zip Code" className="w-full input input-bordered" />
                        { serverError.zip_code ? <small className="text-red-600">{serverError.zip_code[0]}</small>:"" }
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Phone Number</span>
                        </label>
                        <input name="company_phone_number" onChange={handleData} type="text" placeholder="Phone Number" className="w-full input input-bordered" />
                        { serverError.company_phone_number ? <small className="text-red-600">{serverError.company_phone_number[0]}</small>:"" }
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Accept <Link className="text-blue-800"> Terms & Conditions</Link>.</span>
                        </label>
                        <input type="radio" onChange={handleData} name="tc" value="True" className="radio" />
                        { serverError.tc ? <small className="text-red-600">{serverError.tc[0]}</small>:"" }
                    </div>
                    <div>
                        { serverMsg ? 
                        <div className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{serverMsg}.</span>
                        </div>
                        :"" }
                    </div>
                    <div>
                        <button onClick={handleSubmit} className="btn btn-block btn-primary">Create Organization</button>
                    </div>
                </form>
            </div>
        </div>
    )
  }
  
  export default CreateOrganization