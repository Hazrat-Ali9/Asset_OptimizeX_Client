import axios from "axios";
import { useContext, useEffect } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { FiLogOut } from 'react-icons/fi';
import { GrUserSettings } from 'react-icons/gr';
import { PiPasswordFill } from 'react-icons/pi';
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { removeToken } from "../../services/localStorageService";

const DashNavBar = () => {
    const [user,setUser] = useContext(UserContext);
    const BaseUrl = import.meta.env.VITE_BASE_URL;
    const base_url = BaseUrl.slice(0, -1);

    useEffect(()=>{
      axios.get("/api/user/profile/")
      .then((res) => {
          setUser(res.data);
      })
    },[])
    
    const logout=()=> {
        removeToken();
        
    }

  return (
    <div className="navbar text-base-100 bg-gray-900">
      <div className="flex-1">
      <label htmlFor="my-drawer-2" className="btn btn-primary  drawer-button lg:hidden"><FaGreaterThan/></label>
        <a className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent font-extrabold btn btn-ghost normal-case text-2xl lg:ms-8" href="/home">
        {/* <span className="font-bold font-roboto text-xl bg-slate-100 p-1 border rounded-xl text-slate-500">AO<span className="text-purple-700">X</span></span> */}
          Asset OptimizeX</a>
      </div>
      <div className="flex-none gap-2">
        <button className="btn btn-ghost">
          <Link className="border border-slate-100 bg-violet-800 px-4 py-3 rounded-full" to={"/app/profile"}>{user.name}</Link>
        </button>
        
        <div className="dropdown dropdown-end dropdown-hover">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src= {`${base_url + user.image}`} />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 text-gray-800 font-semibold shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li><Link to={"/app/profile"}><GrUserSettings/>{user.name}</Link></li>
            <li><Link to={"/app/profile/change-pass"}><PiPasswordFill/>Change Your Password</Link></li>
            <li><Link onClick={logout} className="text-red-500" to="/home"><FiLogOut/>Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DashNavBar