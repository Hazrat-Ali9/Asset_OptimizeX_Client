
import axios from "axios";
import { useState } from "react";

const ForgotPass = () => {

const [userData, setUserData] = useState({});
const [serverError, setServerError] = useState({})
const [serverMsg, setServerMsg] = useState("")
const [badRequestError, setBadRequestError] = useState("")

const handleData = (e)=>{
    setUserData({...userData, [e.target.name]:e.target.value})
}

const handleSubmit = (e)=> {
    e.preventDefault();
    
    axios.post(`/api/user/send-reset-password-email/`, userData)
    .then((res)=> {
        console.log(res)
          if(res.data){
            setServerMsg(res.data.msg)
            setBadRequestError("")
          }
    })
    .catch((err)=> { 
      console.log(err)
      if(err.code == "ERR_BAD_RESPONSE"){
        setServerMsg("")
        setBadRequestError("This email don't have an account")
      }
      else{
        setServerError(err.response.data.errors)}
      }
      )
}

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden mt-5
    ">
        <div className="w-full p-6 bg-white border-t-4 border-blue-600 rounded-md shadow-lg border-top lg:max-w-lg">
            <h1 className="text-3xl font-semibold text-center text-gray-700">Asset OptimizeX</h1>
            <form className="space-y-4">
                <div>
                      <label className="label"><span className="text-base label-text">Email</span></label>
                      <input name="email" type="text" onChange={handleData} placeholder="Email Address" className="w-full input input-bordered" />
                      { serverError.email ? <small className="text-red-600">{serverError.email[0]}</small>:"" }
                      { serverError.non_field_errors ? <small className="text-red-600">{serverError.non_field_errors[0]}</small>:"" }
                      { badRequestError ? <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{badRequestError}.</span>
                      </div>:"" }

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
                    <button onClick={handleSubmit} className="btn btn-block btn-primary">Forgot Pass</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ForgotPass;