import Dashboard from "../container/Dashboard"
import DashNavBar from "./DashNavBar"
// Dashboard
const DashboardLayout = () => {
  return (
    <div className="">
    <div >
      <DashNavBar />
      <Dashboard/>
    </div>
  </div>
  )
}

export default DashboardLayout