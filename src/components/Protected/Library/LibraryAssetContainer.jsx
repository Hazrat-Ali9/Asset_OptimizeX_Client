import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const LibraryAssetContainer = () => {
  const {library_id} = useParams();
  const [assets, setAssets] = useState([]);

  const [fileType, setFileType]=useState();

  useEffect(()=>{
    axios.get(`/api/libraries/${library_id}/assets/`)
    .then((res) => {
      setAssets(res.data);
    })
  },[library_id])

  
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

  return (
    <div className='flex flex-wrap'>
      {
        assets.map((asset)=>(
          <Link className="m-2 overflow-hidden card card-compact w-1/6 bg-base-100 shadow-xl h-48" key={asset.id} to={`asset-details/${asset.id}`}>
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
  )
}

export default LibraryAssetContainer