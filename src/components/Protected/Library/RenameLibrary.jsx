import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


const RenameLibrary = () => {
    const [serverError, setServerError] = useState()
    const {org_id, library_id} = useParams();
    const Navigate = useNavigate();


    const [libData, setLibData] = useState({'organization': org_id});

    const handleData = (e)=>{
        setLibData({...libData, [e.target.name]:e.target.value})
    }
    const handleSubmit = (e)=> {
        e.preventDefault();

        axios.patch(`/api/library/update/${library_id}/`, libData)
        .then((res)=> {
              if(res.data){
                console.log(res.data, "rename")
                toast.success(res.data.message, {autoClose:2000});
              setTimeout(() => {
                Navigate(`/app/org/${org_id}/library/${library_id}`)
                window.location.reload(true);
              }, 2000);
            }
        })
        .catch((err)=> {toast.error(err.response.data.non_field_errors[0], {autoClose: 1000})})
    }
    return (
        <div className="w-full relative flex flex-col items-center justify-center">
            <div className="w-full p-6 bg-white rounded-md shadow-lg border-top min-h-screen">
                <div><h1 className="text-3xl font-semibold text-gray-700 mb-5">Rename Library</h1></div><hr />
                <form className="space-y-4">
                
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Library Name:</span>
                        </label>
                        <input name="library_name" onChange={handleData} type="text" placeholder="Enter Desired Library name" className="w-full input input-bordered" />
                        { serverError?.library_name ? <small className="text-red-600">{serverError.library_name[0]}</small>:"" }
                    </div>
                    <div>
                        <button onClick={handleSubmit} className="btn btn-block btn-primary bg-gradient-to-r from-purple-700 to-indigo-500">Rename Library</button>
                    </div>
                </form>
            </div>
        </div>
    )
  }
  
  export default RenameLibrary