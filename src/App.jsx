import { Navigate, Route, Routes } from "react-router-dom";
// import './App.css';
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DocumentationLayout from "./components/Documentation/DocumentationLayout";
import AboutPage from "./components/Home/AboutPage/AboutPage";
import ContactPage from "./components/Home/ContactPage/ContactPage";
import HomeLayout from "./components/Home/HomeLayout";
import BuyPlan from "./components/Organization/BuyPlan";
import CreateOrganization from "./components/Organization/CreateOrganization";
import GiveReview from "./components/Organization/GiveReview";
import OrgAssetsContainer from "./components/Organization/OrgAssetsContainer";
import OrgInviteAccept from "./components/Organization/OrgInviteAccept";
import OrgJoinWithCode from "./components/Organization/OrgJoinWithCode";
import OrgSettings from "./components/Organization/OrgSettings";
import OrganizationEmailVerify from "./components/Organization/OrganizationEmailVerify";
import OrganizationLayout from "./components/Organization/OrganizationLayout";
import RenameOrg from "./components/Organization/RenameOrg";
import AddMemberToOrg from "./components/Protected/AddMemberToOrg";
import CreateLibrary from "./components/Protected/CreateLibrary";
import DashboardLayout from "./components/Protected/DashboardLayout";
import AddFile from "./components/Protected/Library/AddFile";
import AssetDetails from "./components/Protected/Library/AssetDetails";
import LibraryAssetContainer from "./components/Protected/Library/LibraryAssetContainer";
import LibraryLayout from "./components/Protected/Library/LibraryLayout";
import RenameLibrary from "./components/Protected/Library/RenameLibrary";
import SearchResultContainer from "./components/Protected/Library/SearchResultContainer ";
import ProfileDetail from "./components/Protected/ProfileDetail";
import PaymentFailed from "./components/container/PaymentFailed";
import PaymentSuccess from "./components/container/PaymentSuccess";
import PrivateOutlet from "./components/container/PrivateOutlet";
import TopNavAndFooterOutlet from "./components/container/TopNavAndFooterOutlet";
import WelcomePage from "./components/container/WellcomePage";
import ChangePass from "./components/user/ChangePass/ChangePass";
import ForgotPass from "./components/user/ForgotPass/ForgotPass";
import ForgotResetPass from "./components/user/ForgotResetPass/ForgotResetPass";
import UserLogin from "./components/user/login/login";
import UserRegister from "./components/user/register/UserRegister";
import { getToken } from "./services/localStorageService";

function App() {
  
const {access_token} = getToken();
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;
// axios.defaults.baseURL="https://asset.pythonanywhere.com/";
if(access_token !== null){
   axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`
}

  return (
    <>
      <Routes>

        <Route path="/*" element={<TopNavAndFooterOutlet />}>
          <Route path="" element={<Navigate to="/home" />} />
          <Route path="home" element={<HomeLayout />}/>
          <Route path="about" element={<AboutPage />}/>
          <Route path="contact" element={<ContactPage />}/>
          <Route path="documentation" element={<DocumentationLayout/> }/>
          <Route path="user/login" element={<UserLogin />}/>
          <Route path="user/register" element={<UserRegister/>}/>
          <Route path="user/forgot-pass" element={<ForgotPass/>}/>
          <Route path="api/user/reset/:uid/:user_matching_query" element={<ForgotResetPass/>}/>
          <Route path="api/organization/register/:uid/:user_matching_query/:hash" element={<OrganizationEmailVerify/>}/>
          <Route path="api/organization/add-user/:uid/:user_matching_query/:hash" element={<OrgInviteAccept/>}/>
        </Route>

        
        

        <Route path="/*" element={<PrivateOutlet />}>
          <Route path="app" element={<DashboardLayout title="Dashboard" />}>
            <Route path="" element={<WelcomePage/> }/>
            <Route path="review" element={<GiveReview/> }/>
            <Route path="join-with-code" element={<OrgJoinWithCode/> }/>
            <Route path="profile" element={<ProfileDetail/> }/>
            <Route path="profile/change-pass" element={<ChangePass/> }/>
            <Route path="create-org" element={<CreateOrganization/> }/>
            <Route path="payment-success" element={<PaymentSuccess />}/>
            <Route path="payment-failed" element={<PaymentFailed />}/>

            <Route path="org/:org_id" element={<OrganizationLayout/> }>
              <Route path="" element={<OrgAssetsContainer/> }/>
              <Route path=":org_name/add-member" element={<AddMemberToOrg/> }/>
              <Route path="create-library" element={<CreateLibrary/> }/>
              <Route path="rename-org" element={<RenameOrg/> }/>
              <Route path="buy-plan" element={<BuyPlan/> }/>
              <Route path="org-settings" element={<OrgSettings/> }/>
                
              

              <Route path="library/:library_id" element={<LibraryLayout/> }>
                <Route path="" element={<LibraryAssetContainer/> }/>
                <Route path="search/:search_query" element={<SearchResultContainer/> }/>
                <Route path="add-file" element={<AddFile/> }/>
                <Route path="rename-lib" element={<RenameLibrary/> }/>
                <Route path="asset-details/:assetId" element={<AssetDetails/> }/>
                <Route path="search/:search_query/asset-details/:assetId" element={<AssetDetails/> }/>
              </Route>

            </Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
