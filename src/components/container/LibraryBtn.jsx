
import axios from 'axios'
import { BsFillFolderFill } from 'react-icons/bs'
import { CgRename } from 'react-icons/cg'
import { FaAngleRight } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { SlOptionsVertical } from 'react-icons/sl'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const LibraryBtn = ({library, role}) => {
  const deleteLibrary = (lib_id)=> {
    axios.delete(`/api/library/delete/${lib_id}/`)
    .then((res)=> {
          toast.success("Library Deleted Successfully", {autoClose:2000});
          setTimeout(() => {
            window.location.assign(`/app/org/${library.org_id}`)
          }, 1500);
    })
    .catch((err)=> {toast.error(err.response.data.non_field_errors[0], {autoClose: 1000})})
}


  return (
    <>
        <li className='ml-5'>
          <Link className='flex flex-row place-content-between py-0'  to={`/app/org/${library.org_id}/library/${library.id}`}>
            <div className='flex items-center'>
              <FaAngleRight className='mr-3'/>
              <BsFillFolderFill className='mr-3'/>
              {library.library_name}
            </div>
            <div className="dropdown dropdown-end dropdown-hover h-12 pt-0">
              <label tabIndex={0} className="btn btn-ghost">
                <Link><SlOptionsVertical/></Link>
              </label>
              {
              (!role || role=="Admin") ?
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-md w-52 border border-gray-300">
                <li><Link to={`/app/org/${library.org_id}/library/${library.id}/rename-lib`}><CgRename/>Rename</Link></li>
                <li><Link  onClick={()=>{deleteLibrary(library.id)}} className='text-red-500'><MdDelete/>Delete</Link></li>
              </ul>:""
              }
            </div>
          </Link>
        </li>
    </>
  )
}

export default LibraryBtn