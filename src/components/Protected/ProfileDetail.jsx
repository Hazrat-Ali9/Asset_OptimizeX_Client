import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileDetail = () => {
    const [userData, setUserData] = useState({});
    const [serverError, setServerError] = useState({})
    const [assetFile, setAssetFile] = useState();
    const [successMsg, setSuccessMsg] = useState();
    
    const navigate = useNavigate();
    
    useEffect(()=>{
        axios.get("/api/user/profile/")
        .then((res) => {
            setUserData(res.data);
        })
    },[])

    const handleData = (e)=>{
        setUserData({...userData, [e.target.name]:e.target.value})
    }
    const handleAsset = (e)=>{
        setAssetFile(e.target.files[0])
    }
    const handleSubmit = (e)=> {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('bio', userData.bio);
        formData.append('email', userData.email);
        formData.append('phone_number', userData.phone_number);
        formData.append('country', userData.country);
        formData.append('zip_code', userData.zip_code);
        assetFile && formData.append('image', assetFile);
    
        axios.put(`/api/user/profile-update/${userData.id}/`, formData)
        .then((res)=> {
              if(res.data){
                navigate('/app/profile')
                setSuccessMsg("Profile Updated Successfully.")
              }
        })
        .catch((err)=> { setServerError(err.response.data.errors)})
    }
    return (
        <div className="w-full relative flex flex-col items-center justify-center">
            <div className="w-full h-full  p-6 bg-white rounded-md shadow-lg border-top ">
                <h1 className="text-3xl font-semibold text-gray-700 mb-5 ">Profile Edit</h1>
                <form className="space-y-4">
                
                    <div>
                        <label className="label"><span className="text-base label-text">Name</span></label>
                        <input name="name" value={userData.name} onChange={handleData} type="text" placeholder="Enter Your Name" className="w-full input input-bordered" />
                        { serverError.name ? <small className="text-red-600">{serverError.name[0]}</small>:"" }
                    </div>
                    <div>
                        <label className="label"><span className="text-base label-text">Bio</span></label>
                        <input name="bio" value={userData.bio} onChange={handleData} type="text" placeholder="Enter Your Bio" className="w-full input input-bordered" />
                        { serverError.bio ? <small className="text-red-600">{serverError.bio[0]}</small>:"" }
                    </div>
                    <div>
                        <label className="label"><span className="text-base label-text">Email</span></label>
                        <input name="email" disabled value={userData.email} onChange={handleData} type="email" placeholder="Email Address" className="w-full input input-bordered" />
                    </div>
                    <div>
                        <label className="label"><span className="text-base label-text">Phone Number</span></label>
                        <input name="phone_number" value={userData.phone_number} onChange={handleData} type="text" placeholder="Phone" className="w-full input input-bordered" />
                        { serverError.phone_number ? <small className="text-red-600">{serverError.phone_number[0]}</small>:"" }
                    </div>
                    <div>
                        <label className="label"><span className="text-base label-text">Upload Profile Photo</span></label>
                        <input name="image" onChange={handleAsset} type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs input-md" />
                    </div>
                    <div>
                        <label className="label"><span className="text-base label-text">Country</span></label>
                        <input name="country" value={userData.country} onChange={handleData} type="text" placeholder="Country" className="w-full input input-bordered" />
                        { serverError.country ? <small className="text-red-600">{serverError.country[0]}</small>:"" }
                    </div>
                    <div>
                        <label className="label"><span className="text-base label-text">Zip Code</span></label>
                        <input name="zip_code" value={userData.zip_code} onChange={handleData} type="text" placeholder="zip_code" className="w-full input input-bordered" />
                        { serverError.country ? <small className="text-red-600">{serverError.country[0]}</small>:"" }
                    </div>

                    <div>
                        { successMsg && 
                        <div className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{successMsg}</span>
                        </div>}
                    </div>
                    <div>
                        <button onClick={handleSubmit} className="align-left w-auto btn btn-block btn-primary">Save Your Change</button>
                    </div>
                </form>
            </div>
        </div>
    )
  }
  
  export default ProfileDetail