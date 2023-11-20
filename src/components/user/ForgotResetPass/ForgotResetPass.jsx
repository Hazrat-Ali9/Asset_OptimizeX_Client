
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const UserRegister = () => {

const [userData, setUserData] = useState({});
const [serverError, setServerError] = useState({})
const [serverMsg, setServerMsg] = useState({})
const [badRequestError, setBadRequestError] = useState("")
const navigate = useNavigate();
const { uid, user_matching_query} = useParams();

const handleData = (e)=>{
    setUserData({...userData, [e.target.name]:e.target.value})
}

const handleSubmit = (e)=> {
    e.preventDefault();
    
    axios.post(`/api/user/reset-password/${uid}/${user_matching_query}/`, userData)
    .then((res)=> {
        // console.log(res)
          if(res.data){
            setServerMsg(res.data)
            console.log(serverMsg)
            // storeToken(res.data.token)
            setTimeout(() => {
                // navigate('/user/login')
            }, 3000);
            navigate('/user/login')
          }
    })
    .catch((err)=> { console.log(err)
        if(err.code == "ERR_BAD_RESPONSE"){
            setBadRequestError("Failed to reset your password")
            setServerError({})
          }
        else{
            setServerError(err.response.data.errors)
        }
        })
}

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden mt-5
    ">
        <div className="w-full p-6 bg-white border-t-4 border-blue-600 rounded-md shadow-lg border-top lg:max-w-lg">
            <h1 className="text-3xl font-semibold text-center text-gray-700">Asset OptimizeX</h1>
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
                    <button onClick={handleSubmit} className="btn btn-block btn-primary">Reset Password</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UserRegister