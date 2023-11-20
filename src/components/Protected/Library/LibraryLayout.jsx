
import { useState } from 'react'
import { MdAddCard } from 'react-icons/md'
import { Link, NavLink, Outlet, useParams } from 'react-router-dom'

const LibraryLayout = () => {
    const {org_id, library_id} = useParams()
    const [searchQuery, setSearchQuery] = useState();

    const handleData = (e)=>{
        setSearchQuery(e.target.value)
    }


  return (
    <>
        <div className='flex mb-5'>
            <NavLink className="flex-auto text-slate-100 btn btn-wide mr-10 bg-gradient-to-r border from-slate-700 to-slate-600" to={`/app/org/${org_id}/library/${library_id}/add-file`}> <MdAddCard/>Add Assets</NavLink>
            <div className=" flex-1 join">
                <div>
                    <div>
                    <input className="input input-bordered join-item" value={searchQuery} onChange={handleData} placeholder="Search"/>
                    </div>
                </div>
                <div className="indicator ">
                    <Link className="btn text-slate-100 join-item bg-gradient-to-r border from-slate-700 to-slate-600" to={`/app/org/${org_id}/library/${library_id}/search/${searchQuery ||undefined}`} >Search</Link>
                </div>
            </div>
        </div>

        {/* here goes all content of library */}
        <Outlet/>
    </>
  )
}

export default LibraryLayout