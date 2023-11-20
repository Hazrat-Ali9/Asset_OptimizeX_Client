import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaImages } from 'react-icons/fa';
import { MdOutlineAudiotrack } from 'react-icons/md';
import { PiVideoFill } from 'react-icons/pi';
import { Link, useParams } from 'react-router-dom';

const OrgAssetsContainer = () => {
  const {org_id} = useParams()
  const [assets, setAssets] = useState()
  const [allAsset, setAllAsset] = useState()
  const [totalAsset, setTotalAsset] = useState()

  useEffect(()=>{
    
    axios.get(`/api/library/asset/${org_id}/`)
    .then((res) => {
      setAssets(res.data);
      setAllAsset(res.data);
      setTotalAsset(res.data.length);
    })
  },[org_id]);


    //Search on org
    const [searchQuery, setSearchQuery] = useState();
    const handleData = (e)=>{
        setSearchQuery(e.target.value)
    }
    const search  = () => {
      axios.get(`/api/library/asset/${org_id}/?search=${searchQuery}`)
      .then((res)=> {
        setAllAsset(res.data);
        setTotalAsset(res.data.length);
        return setAssets(res.data)
        })
      return null;
    }

  //Get file extension
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

   //filter on org
   const filterImg  = () => {
    const imgExt = ["png", "jpg", "webp", "jpeg", "gif", "png", "apng", "svg", "bmp", "bmp", "ico"];
    const filtered = allAsset.filter(assetItem =>{
       const ext = getFileExtension(assetItem.asset).toLowerCase() 
       if (imgExt.indexOf(ext) != -1){
        return assetItem
       }
      })
      setTotalAsset(filtered.length);
      return setAssets(filtered);
  }
   const filterVideo  = () => {
    const videoExt = ["mp4", "webm","ogg"];
    const filtered = allAsset.filter(assetItem =>{
       const ext = getFileExtension(assetItem.asset).toLowerCase() 
       if (videoExt.indexOf(ext) != -1){
        return assetItem
       }
      })
      setTotalAsset(filtered.length);
      return setAssets(filtered);
  }
   const filterAudio  = () => {
    const audioExt = ["mp3", "wav"];
    const filtered = allAsset.filter(assetItem =>{
       const ext = getFileExtension(assetItem.asset).toLowerCase() 
       if (audioExt.indexOf(ext) != -1){
        return assetItem
       }
      })
      setTotalAsset(filtered.length);
      return setAssets(filtered);
  }
  

  return (
    <>
    <div className='flex'>
        <h1 className="mb-4 flex-auto w-1/5 mr-5 text-center bg-base-100 p-3 ps-5 text-slate-500 font-semibold border rounded-full">Total Assets <span className='bg-slate-300 p-1 border rounded-full'>{totalAsset}</span></h1>


    <div className="">
      <div className="indicator px-1 m-0">
          <Link onClick={()=>{filterImg()}} className="btn text-slate-100 text-2xl join-item bg-gradient-to-r border from-slate-700 to-slate-600" ><FaImages/></Link>
      </div>
      <div className="indicator px-1">
          <Link onClick={()=>{filterVideo()}} className="btn text-slate-100 text-2xl join-item bg-gradient-to-r border from-slate-700 to-slate-600" ><PiVideoFill/></Link>
      </div>
      <div className="indicator px-1">
          <Link onClick={()=>{filterAudio()}} className="btn text-slate-100 text-2xl join-item bg-gradient-to-r border from-slate-700 to-slate-600" ><MdOutlineAudiotrack/></Link>
      </div>
    </div>
    <div className=" flex-1 join">
        <div>
            <div>
            <input className="input input-bordered join-item" value={searchQuery} onChange={handleData} placeholder="Search"/>
            </div>
        </div>
        <div className="indicator ">
            <Link onClick={()=>{search()}} className="btn text-slate-100 join-item bg-gradient-to-r border from-slate-700 to-slate-600" >Search</Link>
        </div>
    </div>
    </div>

    <div className='flex flex-wrap'>
      {
        assets?.map((asset)=>(
          <Link className="m-2 overflow-hidden card card-compact w-1/6 bg-base-100 shadow-xl h-48" key={asset.id} to={`library/${asset.library}/asset-details/${asset.id}`}>
              <div className="overflow-hidden card card-compact bg-base-100 ">
                <div className='h-36 flex items-center justify-center'>
                  {
                    isSupportedExtension(getFileExtension(asset.asset)) == "img" ?
                    <figure><img src={`${asset.asset}`} alt="" /></figure>
                    : isSupportedExtension(getFileExtension(asset.asset)) == "video" ?
                    <figure><video controls><source src={`${asset.asset}`} alt="" /></video></figure>
                    : isSupportedExtension(getFileExtension(asset.asset)) == "audio" ? 
                    <figure><audio controls><source src={`${asset.asset}`} alt="" /></audio></figure>
                    : <p className='text-center items-center text-4xl text-purple-400'>.{getFileExtension(asset.asset)}</p>
                  }
                </div>
                <div className="card-body bg-base-100">
                  <p className='font-semibold'>{asset.title}</p>
                </div>
              </div>
          </Link>
        ))
      }
    </div>
    </>
  )
}

export default OrgAssetsContainer