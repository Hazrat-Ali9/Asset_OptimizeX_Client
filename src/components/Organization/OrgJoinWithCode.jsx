import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const OrgJoinWithCode = () => {
    const [serverError, setServerError] = useState({});
    const Navigate = useNavigate();


    const [orgData, setOrgData] = useState();

    const handleData = (e)=>{
        setOrgData({...orgData, [e.target.name]:e.target.value})
    }
    const handleSubmit = (e)=> {
        e.preventDefault();
        
        
        axios.post(`/api/organization/code/`, orgData)
        .then((res)=> {
              if(res.data){
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
                <div><h1 className="text-3xl font-semibold text-gray-700 mb-5">Join Organization With Invite Code</h1></div> <hr />
                <form className="space-y-4">
                
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Organization Name:</span>
                        </label>
                        <input name="organization_name" onChange={handleData} type="text" placeholder="Enter Organization name" className="w-full input input-bordered" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Invite Code:</span>
                        </label>
                        <input name="invited_code" onChange={handleData} type="text" placeholder="Enter Organization Invite Code" className="w-full input input-bordered" />
                    </div>
                    <div>
                        <button onClick={handleSubmit} className="btn btn-block btn-primary bg-gradient-to-r from-purple-700 to-indigo-500">Join Organization As Viewer</button>
                    </div>
                </form>
            </div>
        </div>
    )
  }
  
  export default OrgJoinWithCode