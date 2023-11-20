
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BiFolderPlus } from 'react-icons/bi'
import { BsPersonFillAdd } from 'react-icons/bs'
import { FaCrown } from 'react-icons/fa'
import { FcSettings } from 'react-icons/fc'
import { IoMdOptions } from 'react-icons/io'
import { Link, NavLink } from 'react-router-dom'
import LibraryBtn from './LibraryBtn'

const OrganizationBtn = ({org}) => {
    const [libraries, setLibraries] = useState([]);
    useEffect(()=>{
    axios.get(`/api/library/list/${org.id}/`)
    .then((res) => {
        setLibraries(res.data);
    })
    },[])

  return (
    <>
        <li >
            <NavLink className='flex flex-row place-content-between py-0'  to={`/app/org/${org.id}`}>
                <div className='flex items-center font-bold'>
                    {/* {
                        org.organization_logo ? <img src={`${org.organization_logo}`}/> : <FaInstalod className='mr-3'/>
                    } */}
                    {org.organization_name}
                </div>
                <span className="badge border border-purple-700 text-purple-800">{!org.role ? "Owner" : org.role }</span>
                {
                    org.premiumUser && <span className="relative badge border border-purple-700 text-purple-800"><FaCrown/></span>
                }
               
                    <div className="dropdown dropdown-end dropdown-hover h-12 pt-0">
                        <label tabIndex={0} className="btn btn-ghost">
                            <Link><IoMdOptions/></Link>
                        </label>
                        {
                        (!org.role || org.role=="Admin") ? 
                        <ul tabIndex={0} className="mt-3 z-[1] text-gray-800 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-md w-52 border border-gray-300">
                            
                            <li><Link to={`/app/org/${org.id}/${org.organization_name}/add-member`}><BsPersonFillAdd/>Add Member</Link></li>
                            <li><Link to={`/app/org/${org.id}/buy-plan`} className='text-yellow-500 text-center border rounded-full bg-gradient-to-r from-purple-700 to-indigo-500'>UPGRADE TO PRO</Link></li>
                        </ul>
                            : "" 
                        }
                    </div>
                
            </NavLink>
        </li>
        <li className='ml-4 font-semibold'>
            <Link to={`/app/org/${org.id}/create-library`}><BiFolderPlus/>Create Library</Link>
        </li>
        {
            libraries.map((library,index)=>(
                <LibraryBtn key={index} role={org.role} library={library}/>
            ))
        }
        {
            (!org.role || org.role=="Admin") ? 
            <li className='ml-4 mb-3 font-semibold'><Link to={`/app/org/${org.id}/org-settings`}><FcSettings/>Organization Settings</Link></li>
            : null
        }
    </>
  )
}

export default OrganizationBtn