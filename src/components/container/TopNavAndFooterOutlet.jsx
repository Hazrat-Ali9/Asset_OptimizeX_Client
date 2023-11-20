import { Outlet } from "react-router-dom";
import Footer from "../Home/Footer/Footer";
import Navbar from "../Home/Navbar/Navbar";


const TopNavAndFooterOutlet = () => {
  return (
    <div className="">
    <div >
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  </div>
  )
}

export default TopNavAndFooterOutlet