import { Link } from "react-router-dom";
import { getToken, removeToken } from "../../../services/localStorageService";
import { navbarMenu } from "./navbarItems";

const Navbar = () => {
const {access_token} =getToken();

const logout=()=> {
  removeToken();
}

  return (
    <div className="navbar text-base-100 py-3 bg-gray-900">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul tabIndex={0} className="bg-gray-600 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navbarMenu.map((item, index) => {
              const { name, path} = item;
              return (
                <li key={index} className="">
                  <Link to={`${path}`}>{name}</Link>
                </li>
              );
            })}
            {
              access_token ? <a className="btn btn-outline text-slate-100 rounded-full text-base-100" href="/app">Your Assets</a>
              : <a className="btn btn-outline text-slate-100 rounded-full text-base-100" href="/user/login">Log In</a>
            }
            {
              access_token ? <a onClick={logout} className="btn btn-primary rounded-full  text-base-100" href="/home">Log Out</a>
              : <a  className="btn btn-primary rounded-full text-base-100" href="/user/register">Get Started</a>
            }
          </ul>
          
        </div>
        <Link className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent font-extrabold btn btn-ghost normal-case text-3xl ms-5" to='/home'> 
        {/* <span className="font-bold font-roboto text-xl bg-slate-100 p-1 border rounded-xl text-slate-500">AO<span className="text-purple-700">X</span></span> */}
        Asset OptimizeX</Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 z-10">
          {navbarMenu.map((item, index) => {
            const { name, path, children } = item;
            // console.log(children);
            return (
              <li className=" mt-1" key={index} tabIndex={0}>
                {!children && <Link to={`${path}`}>{name}</Link>}
              </li>
            );
          })}
          <div className="ml-5 mr-10">
            {
              access_token ? <a className="mr-5 btn btn-outline text-slate-100 rounded-full text-base-100" href="/app">Your Assets</a>
              : <a className="mr-5 btn btn-outline text-slate-100 rounded-full text-base-100" href="/user/login">Log In</a>
            }
            {
              access_token ? <a onClick={logout} className="btn btn-primary rounded-full  text-base-100" href="/home">Log Out</a>
              : <a  className="btn btn-primary rounded-full text-base-100" href="/user/register">Get Started</a>
            }
          </div>
        </ul>
        
        
      </div>
      {/* <div className="navbar-end gap-x-3 pr-5">
        {
          access_token ? <a className="btn btn-outline text-slate-100 rounded-full text-base-100" href="/app">Your Assets</a>
          : <a className="btn btn-outline text-slate-100 rounded-full text-base-100" href="/user/login">Log In</a>
        }
        {
          access_token ? <a onClick={logout} className="btn btn-primary rounded-full  text-base-100" href="/home">Log Out</a>
          : <a  className="btn btn-primary rounded-full text-base-100" href="/user/register">Get Started</a>
        }
        
      </div> */}
    </div>
  );
};

export default Navbar;
