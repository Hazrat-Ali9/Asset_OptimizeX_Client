
import axios from "axios";
import { useState } from "react";

const ChangePass = () => {

const [userData, setUserData] = useState({});
const [serverError, setServerError] = useState({})
const [serverMsg, setServerMsg] = useState()
const [badRequestError, setBadRequestError] = useState("")

const handleData = (e)=>{
    setUserData({...userData, [e.target.name]:e.target.value})
}

const handleSubmit = (e)=> {
    e.preventDefault();
    
    axios.post(`/api/user/changepassword/`, userData)
    .then((res)=> {
          if(res.data){
            setServerMsg(res.data.msg)
          }
    })
    .catch((err)=> { console.log(err)
        if(err.code == "ERR_BAD_RESPONSE"){
            setBadRequestError("Failed to Change your password")
            setServerError({})
          }
        else{
            setServerError(err.response.data.errors)
        }
        })
}

  return (
    <div className="relative flex flex-col items-center justify-center mt-5">
        <div className="w-full p-6 bg-white rounded-md shadow-lg border-top ">
            <h1 className="text-3xl font-semibold text-center text-gray-700">Change Password</h1>
            <form className="space-y-4">
                <div>
                    <label className="label">
                        <span className="text-base label-text">Set New Password</span>
                    </label>
                    <input name="password" onChange={handleData} type="password" placeholder="Enter New Password"
                        className="w-full input input-bordered" />
                    { serverError.password ? <small className="text-red-600">{serverError.password[0]}</small>:"" }
                </div>
                <div>
                    <input name="password2" onChange={handleData} type="password" placeholder="Conform Password"
                        className="w-full input input-bordered" />
                    { serverError.password2 ? <small className="text-red-600">{serverError.password2[0]}</small>:"" }
                    { serverError.non_field_errors ? <small className="text-red-600">{serverError.non_field_errors[0]}</small>:"" }
                    { badRequestError ? <small className="text-red-600">{badRequestError}</small>:"" }
                </div>
                <div>
                    { serverMsg && 
                    <div className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{serverMsg}.</span>
                    </div>}
                </div>
                <div>
                    <button onClick={handleSubmit} className="btn btn-block btn-primary">Reset Password</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ChangePass