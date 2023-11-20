
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { HiDownload } from "react-icons/hi";
import { MdDelete } from 'react-icons/md';
import { RiShareFill } from "react-icons/ri";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AssetDetails = () => {
    const {org_id, library_id, assetId} = useParams()
    const [asset, setAsset] = useState({})
    const [assetFile, setAssetFile] = useState();
    const [serverError, setServerError] = useState({})
    const [serverMsg, setServerMsg] = useState()
    const navigate = useNavigate();

    // get asset
    
    useEffect(()=>{
        axios.get(`/api/assets/${assetId}/`)
        .then((res) => {
            setAsset(res.data);
        })
    },[assetId])


    // update asset
    const handleData = (e)=>{
        setAsset({...asset, [e.target.name]:e.target.value})
    }
    const handleAsset = (e)=>{
        setAssetFile(e.target.files[0])
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', asset.title);
        formData.append('library', asset.library);
        assetFile && formData.append('asset', assetFile);
        formData.append('description', asset.description);
        formData.append('location', asset.location);

        axios.patch(`/api/assets/${assetId}/update/`, formData)
        .then((res)=> {
            if(res.data){
                navigate(-1);
            }
        })
        .catch((err)=> {console.log(err); setServerError(err.response.data)})
    }

    //Get old assets /asset versions
    const [assetVersions, setAssetVersions] = useState([]);

    useEffect(() => {
      axios.get(`api/assets/prev/${assetId}/`)
      .then(res => {
        setAssetVersions(res.data.reverse());
      }).catch(err=> {});
    }, [])
    

    //Delete asset
    const deleteAsset = ()=> {
        axios.delete(`/api/assets/${assetId}/delete/`)
        .then((res)=> {
            if(res.status){
                console.log(res.data.message)
                toast(res.data.message, {
                    autoClose: 2000
                });
                setServerMsg(res.data);
                navigate(`/app/org/${org_id}/library/${library_id}/`)
            }
        })
        .catch((err)=> { setServerError(err.response.data)})
    }

    //Date parser
    const ShowDateTime = (date) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          };
        const dateObject = new Date(date);
        const formattedDate = dateObject.toLocaleString('en-US', options);
        return formattedDate;
    }


    // Download Assets function
    const downloadFileUrl=(url)=>{
        fetch(url).then(res => res.blob()).then(blob=> {
            const blobURL = window.URL.createObjectURL(new Blob([blob]));
            const fileName = url.split("/").pop();
            const aTag = document.createElement("a");
            aTag.href = blobURL;
            aTag.setAttribute("download", fileName);
            document.body.appendChild(aTag);
            aTag.click();
            aTag.remove();
            console.log("I am here in download")
        })
    }
    const getFileExtension = (url) =>{
        const extension = url.split(".").pop();
        return extension;
      }
    
    const isSupportedExtension =(extension)=>{
    const ext = extension.toLowerCase();
    const imgExt = ["png", "jpg", "webp", "jpeg", "gif", "png", "apng", "svg", "bmp", "bmp", "ico"];
    const videoExt = ["mp4", "webm","ogg"];
    const audioExt = ["mp3", "wav"];
    const pdfExt = ["pdf"];
    let res = null;
    if (imgExt.indexOf(ext) != -1){
        res = "img";
    }
    if (videoExt.indexOf(ext) != -1){
        res = "video";
    }
    if (audioExt.indexOf(ext) != -1){
        res = "audio";
    }
    if (pdfExt.indexOf(ext) != -1){
        res = "pdf";
    }
    return res;
    }

  return (
    <div className="relative w-full flex flex-col items-center justify-center mt-5">
        <div className="w-full p-6 bg-white rounded-md shadow-lg border-top flex ">

            {/*asset details right side start*/}
            <div className="w-3/5 ">
                <div className="relative">
                    {
                        asset?.asset &&
                        (
                            isSupportedExtension(getFileExtension(asset.asset)) == "img" ?
                            <figure><img className="w-full" src={`${asset.asset}`} alt="" /></figure>
                            : isSupportedExtension(getFileExtension(asset.asset)) == "video" ?
                            <figure><video controls><source src={`${asset.asset}`} alt="" /></video></figure>
                            : isSupportedExtension(getFileExtension(asset.asset)) == "audio" ? 
                            <figure><br /> <br /> <br /><br /><audio className="w-full" controls><source src={`${asset.asset}`} alt="" /></audio></figure>
                            : isSupportedExtension(getFileExtension(asset.asset)) == "pdf" ? 
                            <embed 
                                src={`${asset.asset}`}
                                height="600px"
                                width="100%"
                                type="application/pdf"
                            ></embed> 
                            : <p className='text-center items-center text-4xl text-purple-400'>.{getFileExtension(asset.asset)}</p>
                        )
                    }
                    <div className="bg-gray-900 p-3 rounded-3xl bg-opacity-60 absolute text-2xl text-gray-100 top-5 right-5 flex">

                        {/* <RiShareFill className="mx-3"/> */}
                            
                        <button className="hover:text-gray-400" onClick={()=>document.getElementById('my_modal_3').showModal()}><RiShareFill className="mx-3"/></button>
                        <dialog id="my_modal_3" className="modal text-gray-600">
                            <div className="modal-box">
                                <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-lg">Share Links</h3>
                                <div className="form-control">
                                    <div className="input-group">
                                        <select className="select select-bordered">
                                        <option disabled selected>Pick category</option>
                                        <option >1 Day</option>
                                        <option>3 Day</option>
                                        <option>1 Week</option>
                                        <option>1 Month</option>
                                        </select>
                                        <button className="btn">Create Link</button>
                                    </div>
                                </div>
                            </div>
                        </dialog>

                        <button onClick={()=> {downloadFileUrl(asset.asset)}} className="btn-xs hover:text-gray-400"><HiDownload className="text-2xl"/></button>
                        
                        <button onClick={()=>document.getElementById('my_modal_1').showModal()} className="btn-xs hover:text-red-400"><MdDelete className="text-2xl"/></button>

                        {/* <button className="btn btn-outline btn-error" onClick={()=>document.getElementById('my_modal_1').showModal()}>Delete Your Organization</button> */}
                        <dialog id="my_modal_1" className="modal text-slate-800">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Are you sure you want to delete this asset</h3>
                            <div className="modal-action">
                            <button onClick={()=> {deleteAsset()}} className="btn btn-outline btn-error">Delete</button>
                            <form method="dialog">
                                <button className="btn " >Cancel</button>
                            </form>
                            </div>
                        </div>
                        </dialog>
                    </div>
                </div>
            </div>


            {/*asset details left side start*/}
            <div className="w-2/5 rounded-md shadow-xl">
                <div className="w-full p-6 bg-white rounded-md shadow-lg border-top h-screen">
                    <form className="space-y-4">
                        <div>
                            <label className="label"><span className="text-base label-text">Title</span></label>
                            <input name="title" value={asset.title} onChange={handleData}  type="text" placeholder="Enter Title Here" className="w-full input input-bordered input-sm" />
                            { serverError.title ? <small className="text-red-600">{serverError.title[0]}</small>:"" }
                        </div>
                        <div>
                            {/* TODO: change the get api to get created_at and updated_at to show it on here */}
                            {/* <p className="text-gray-500">Created: {asset.created_at}</p>
                            <p className="text-gray-500">Last Updated: {asset.updated_at}</p> */}
                        </div>
                        <div>
                            <label className="label"><span className="text-base label-text">Upload Updated file</span></label>
                            <input name="asset" onChange={handleAsset} type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs input-md" />
            
                            { serverError.asset ? <small className="text-red-600">{serverError.asset[0]}</small>:"" }
                        </div>
                        
                        {/* Assets old versions displaying */}
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-sm m-1 border-blue-600">Assets Old Versions <AiOutlineCaretDown/></label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80 border border-blue-600">
                                {
                                    assetVersions[0] ?
                                    assetVersions.map((oldAsset) => (
                                        <li key={oldAsset.id}>
                                            <div className="flex items-center">
                                            <p>{ShowDateTime(oldAsset?.created_at)}</p>
                                            <a download href={oldAsset.asset}className="btn-xs hover:text-gray-400"><HiDownload className="text-xl"/></a>
                                            </div>
                                        </li>
                                    )) : <li>Don&apos;t have any old versions.</li>
                                }
                            </ul>
                        </div>


                        <div>
                            <label className="label"><span className="text-base label-text">Description</span></label>
                            <input name="description" onChange={handleData} value={asset.description}type="text" placeholder="Enter Description Here" className="w-full input input-bordered input-sm" />
                            { serverError.description ? <small className="text-red-600">{serverError.description[0]}</small>:"" }
                        </div>
                        <div>
                            <label className="label"><span className="text-base label-text">Location</span></label>
                            <input name="location" onChange={handleData} value={asset.location}type="text" placeholder="Enter Location Here" className="w-full input input-bordered input-sm" />
                            { serverError.location ? <small className="text-red-600">{serverError.location[0]}</small>:"" }
                        </div>
                        <div>
                            <label className="label"><span className="text-base label-text">Tags</span></label>
                            <input name="location" onChange={handleData} value={asset.tags} type="text" placeholder="Enter Tag Here" className="w-full input input-bordered input-sm" />
                            { serverError.tags ? <small className="text-red-600">{serverError.tags[0]}</small>:"" }
                        </div>
                        <div>
                            { serverError.non_field_errors ? <div className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{serverError.non_field_errors[0]}.</span>
                            </div>:"" }
                        </div>
                        {
                            serverMsg?.message && 
                            <div className="toast toast-top toast-end">
                            <div className="alert alert-info">
                                <span>New mail arrived.</span>
                            </div>
                            <div className="alert alert-success">
                                <span>Message sent successfully.</span>
                            </div>
                            </div>
                        }
                        <div>
                            <button onClick={handleSubmit}  className="btn btn-block btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AssetDetails