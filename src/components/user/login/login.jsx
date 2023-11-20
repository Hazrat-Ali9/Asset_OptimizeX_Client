import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storeToken } from "../../../services/localStorageService";

const UserLogin = () => {
    const [userData, setUserData] = useState({});
    const [serverError, setServerError] = useState({})
    const navigate = useNavigate();

    const handleData = (e)=>{
        setUserData({...userData, [e.target.name]:e.target.value})
    }
    
    const handleSubmit = (e)=> {
        e.preventDefault();
        axios.post("/api/user/login/", userData)
        .then((res)=> {
              if(res.data){
                storeToken(res.data.token)
                navigate('/app')
                window.location.reload(true);
              }
        })
        .catch((err)=> { setServerError(err.response.data.errors)})
    }
    return (
      <div className="relative flex flex-col items-center justify-center my-8">
          <div className="w-full p-6 bg-white rounded-md shadow-lg border-top lg:max-w-lg h-screen">
              <h1 className="text-3xl font-semibold text-center text-gray-700">Asset OptimizeX</h1>
              
              <form className="space-y-4">
                  <div>
                      <label className="label"><span className="text-base label-text">Email</span></label>
                      <input name="email" type="text" onChange={handleData} placeholder="Email Address" className="w-full input input-bordered" />
                      { serverError.email ? <small className="text-red-600">{serverError.email[0]}</small>:"" }
                  </div>
                  <div>
                      <label className="label"><span className="text-base label-text">Password</span></label>
                      <input name="password"type="password" onChange={handleData} placeholder="Enter Password"
                          className="w-full input input-bordered" />
                  </div>
                  
                  { serverError.password ? <small className="text-red-600">{serverError.password[0]}</small>:"" }
                    { serverError.non_field_errors ? <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{serverError.non_field_errors[0]}.</span>
                    </div>:"" }
                    <br/>
                    <a href="/user/forgot-pass" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a>
                  <div>
                      <button onClick={handleSubmit} className="btn btn-block btn-primary">Login</button>
                  </div>
              </form><br />
              <span>Don&apos;t have an account <Link className="text-blue-800" to={"/user/register"}>Register.</Link></span>
          </div>
      </div>
    )
  }
  
  export default UserLogin