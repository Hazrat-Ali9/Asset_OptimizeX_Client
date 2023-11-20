import { Link } from 'react-router-dom';

const AssetDispCard = ({props}) => {
    console.log(props)
    const {id, asset, title} = props;

//Get file extension
  const getFileExtension = (url) =>{
    const extension = url.split(".").pop();
    return extension;
  }

  const isImgExtension =(extension)=>{
    const imgExt = ["png", "jpg", "webp", "jpeg", "gif", "png", "apng", "svg", "bmp", "bmp", "ico"];
    if (imgExt.indexOf(extension) != -1){
      return true;
    }
    return false;
  }
  return (
    <Link className="m-2 overflow-hidden card card-compact w-1/6 bg-base-100 shadow-xl h-48" to={`asset-details/${id}`}>
              <div className="overflow-hidden card card-compact bg-base-100 ">
                <div className='h-36 flex items-center justify-center'>
                  {
                    isImgExtension(getFileExtension(asset)) ?
                    <figure><img src={`${asset}`} alt="" /></figure>
                    : <p className='text-center items-center text-4xl text-purple-400'>.{getFileExtension(asset)}</p>
                  }
                </div>
                <div className="card-body bg-base-100">
                  <p className='font-semibold'>{title}</p>
                </div>
              </div>
          </Link>
  )
}

export default AssetDispCard