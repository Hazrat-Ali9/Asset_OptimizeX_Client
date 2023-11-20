import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";


const AddMemberToOrg = () => {
    const [serverError, setServerError] = useState({});
    const [serverMsg, setServerMsg] = useState('');
    const [serverErrMsg, setServerErrMsg] = useState('');
    const {org_name} = useParams();


    const [userData, setUserData] = useState({organization:org_name});

    const handleData = (e)=>{
        setUserData({...userData, [e.target.name]:e.target.value})
    }
    
    const handleSubmit = (e)=> {
        e.preventDefault();
        
        axios.post("/api/organization/add-user/", userData)
        .then((res)=> {
            if(res.data.message){ 
                setServerMsg(res.data.message)
             }
             else if(res.data.msg){ 
                setServerErrMsg(res.data.msg)
             }else{
                setServerErrMsg(res.data)
             }
        })
        .catch((err)=> {setServerError(err.response.data.errors)})
    }
    return (
        <div className="w-full relative flex flex-col items-center justify-center">
            <div className="w-full p-6 bg-white rounded-md shadow-lg border-top min-h-screen">
                <div><h1 className="text-3xl font-semibold text-gray-700 mb-5">
                    Add Member In {org_name}</h1></div>
                <form className="space-y-4">
                
                    <div>
                        <label className="label">
                            <span className="text-base label-text">User email</span>
                        </label>
                        <input name="email" onChange={handleData} type="email" placeholder="Enter Email" className="w-full input input-bordered" />
                        { serverError.email ? <small className="text-red-600">{serverError.email[0]}</small>:"" }
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Select User Authorization Permission</span>
                        </label>
                        <select name="role" className="select select-bordered" onChange={handleData}>
                            <option disabled selected>Select User Role</option>
                            <option>Admin</option>
                            <option>Contributor</option>
                            <option>Consumer</option>
                        </select>
                        { serverError.role ? <small className="text-red-600">{serverError.role[0]}</small>:"" }
                    </div>
                    <div>
                        { serverError.non_field_errors && 
                        <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{serverError.non_field_errors[0]}.</span>
                        </div>}
                    </div>
                    <div>
                        { serverMsg && 
                        <div className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{serverMsg}.</span>
                        </div>}
                    </div>
                    <div>
                        { serverErrMsg && 
                        <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{serverErrMsg}.</span>
                        </div>}
                    </div>
                    <div>
                        <button onClick={handleSubmit} className="btn btn-block btn-primary">Add Member</button>
                    </div>
                </form>
            </div>
        </div>
    )
  }
  
  export default AddMemberToOrg