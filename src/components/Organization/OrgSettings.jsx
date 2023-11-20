import axios from "axios";
import { useEffect, useState } from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaCrown } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const OrgSettings = () => {
    const navigate = useNavigate();
    const {org_id} = useParams();

    const [members, setMembers] = useState();
    const [orgDetail, setOrgDetail] = useState();

    // Get Organization details
    useEffect(() => {
        axios.get(`/api/organization/detail/${org_id}/`)
        .then(res=> {
            setOrgDetail(res.data)
        })
    },[org_id])

   
     //Date parser
    const ShowDateTime = (date) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          };
        const dateObject = new Date(date);
        const formattedDate = dateObject.toLocaleString('en-US', options);
        return formattedDate;
    }

    //Update Organization info
    const [serverError, setServerError] = useState({});
    const [orgLogo, setOrgLogo] = useState();

    const handleData = (e)=>{
        setOrgDetail({...orgDetail, [e.target.name]:e.target.value})
    };
    const handleOrgLogo = (e)=>{
        setOrgLogo(e.target.files[0])
    };
    const handleSubmit = (e)=> {
        e.preventDefault();
        const formData = new FormData();
        orgDetail && formData.append('organization_name', orgDetail.organization_name);
        orgDetail && formData.append('description', orgDetail.description);
        orgDetail.company_phone_number && formData.append('company_phone_number', orgDetail.company_phone_number);
        orgDetail && formData.append('country', orgDetail.country);
        orgDetail && formData.append('zip_code', orgDetail.zip_code);
        orgLogo && formData.append('organization_logo', orgLogo);
        
        axios.patch(`/api/organization/update/${org_id}/`, formData)
        .then((res)=> {
              if(res.data){
                toast.success("Organization Info Updated Successfully", {autoClose:1000});
                setTimeout(() => {
                    window.location.reload(true);
                    
                }, 2000);
                
              }
        })
        .catch((err)=> {console.log(err); setServerError(err.response.data.errors)})
    };


    // get all member 
    useEffect(() => {
        axios.get(`/api/organization/member/${org_id}/`)
        .then(res=> {
            setMembers(res.data);
            console.log(res.data, "members")
        })
    },[org_id]);

    //Remove members
    const removeMember = (member_id) => {
        axios.delete(`/api/organization/member-remove/${member_id}/`)
        .then(res=> {
            toast("1 Member Removed")
            const updated_members = members.filter(member => member.id !== member_id);
            setMembers(updated_members)
        })
    };


    //Update members
    const [userRole, setUserRole] = useState();
    const handleUserRole = (e)=>{
        setUserRole({...userRole, [e.target.name]:e.target.value});
    };
    const updateUserRole = (member_id) => {
        axios.patch(`/api/organization/permission-edit/${member_id}/`, userRole)
        .then(res=> {
            console.log(res, "<<<<<<")
            toast.success("User Role Updated Successfully.", {autoClose: 1500})
        })
    };

    // get payment history 
    const [paymentsHistory, setPaymentsHistory] = useState([]);
    useEffect(() => {
        axios.get(`/api/organization/payment-history/${org_id}/`)
        .then(res=> {
            console.log(res.data, "paymentsHistory")
            setPaymentsHistory(res.data)
        })
    },[org_id]);


    const deleteOrg = () => {
        console.log('hello')
        axios.delete(`/api/organization/delete/${org_id}/`)
        .then(res=> {
            navigate("/app")
            window.location.reload(true);
        })
    };

    const [activeItem, setActiveItem] = useState('Detail');
    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
      };
    
  return (
    <>
        <div className="tabs font-bold text-red-700">
            <a className={activeItem == 'Detail'? "tab tab-lifted tab-active": "tab tab-lifted"} onClick={() => handleItemClick('Detail')}>Organization Detail</a> 
            <a className={activeItem == 'Members'? "tab tab-lifted tab-active": "tab tab-lifted"} onClick={() => handleItemClick('Members')}>Members</a> 
            <a className={activeItem == 'Payments'? "tab tab-lifted tab-active": "tab tab-lifted"} onClick={() => handleItemClick('Payments')}>Payments History</a>
            <a className={activeItem == 'Organization Invite'? "tab tab-lifted tab-active": "tab tab-lifted"} onClick={() => handleItemClick('Organization Invite')}>Organization Invite</a>
            <a className={activeItem == 'Delete Organization'? "tab tab-lifted tab-active": "tab tab-lifted"} onClick={() => handleItemClick('Delete Organization')}>Delete Organization</a>
        </div>

        {
            activeItem == 'Detail'?
            <div className="w-full mb-5 relative flex flex-col items-center justify-center">
                <div className="w-full p-6 bg-white rounded-md shadow-lg border-top min-h-screen">
                <h1 className="text-2xl font-bold mb-5">Organization Details</h1><hr /><br />
                <form className="space-y-4">
                    <div className="flex">
                        <label className="label font-semibold">
                            <span className="text-base label-text">Organization Name: </span>
                        </label>
                        <input name="organization_name" disabled value={orgDetail?.organization_name} onChange={handleData} type="text" placeholder="Enter Organization name" className="w-auto input input-bordered" />
                        { serverError.organization_name ? <small className="text-red-600">{serverError.organization_name[0]}</small>:"" }
                    </div>
                    <div>
                        <span className="text-base label-text">
                            Created Date: {ShowDateTime(orgDetail?.created_date)}</span>
                    </div>
                    <div>
                        <label className="label font-semibold">
                            <span className="text-base label-text">Organization Description:</span>
                        </label>
                        <input name="description" value={orgDetail?.description} onChange={handleData} type="text" className="w-full input input-bordered" />
                    </div>
                    <div className="flex">
                        <label className="label font-semibold"><span className="text-base label-text">Upload Organization Logo: </span></label>
                        <input name="image" onChange={handleOrgLogo} type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs input-md" />
                    </div>
                    <div className="flex">
                        <div className="flex w-full">
                            <label className="label font-semibold">
                                <span className="text-base label-text">Country: </span>
                            </label>
                            <input name="country" value={orgDetail?.country} onChange={handleData} type="text" className=" input input-bordered" />
                        </div>
                        <div className="flex w-full">
                            <label className="label font-semibold">
                                <span className="text-base label-text">Zip Code: </span>
                            </label>
                            <input name="zip_code" value={orgDetail?.zip_code} onChange={handleData} type="text" className=" input input-bordered" />
                        </div>
                    </div>
                    <div className="flex">
                        <label className="label font-semibold">
                            <span className="text-base label-text">Phone Number: </span>
                        </label>
                        <input name="company_phone_number" value={orgDetail?.company_phone_number || orgDetail?.org_phone_number} onChange={handleData} type="text" className=" input input-bordered" />
                    </div>
                    <div>
                        <button onClick={handleSubmit} className="btn btn-block btn-primary">Save Changes</button>
                    </div>
                </form>
                </div>
            </div>
            :activeItem == 'Members'?
            <div className="w-full relative flex flex-col items-center justify-center">
                <div className="w-full p-6 bg-white rounded-md shadow-lg border-top min-h-screen">
                    <div className="overflow-x-auto">
                        <div className="mb-5">
                            <h1 className="text-2xl font-bold mb-5">Added Members In Organization</h1><hr /><br />
                            
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>No</th>
                                    <th>User Name</th>
                                    <th>User Role</th>
                                    <th>Invite</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    members?.map((member, index)=> (
                                        <tr key ={index} className="hover">
                                            <th>{index+1}</th>
                                            <td>{member.email}</td>
                                            {/* <td>{member.role}</td> */}
                                            <td><select name="role" className="select select-bordered" onChange={handleUserRole}>
                                                <option disabled selected>{member.role}</option>
                                                <option>Admin</option>
                                                <option>Contributor</option>
                                                <option>Consumer</option>
                                            </select></td>
                                            {
                                                member.is_company ? <td>Accepted</td> : <td>Pending</td>
                                            }
                                            <td>
                                                <button onClick={()=> {updateUserRole(member.id)}} className="btn btn-sm btn-success mr-3">Update Changes</button>
                                                <button onClick={()=> {removeMember(member.id)}} className="btn btn-sm btn-error">Remove</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                            {
                            members && !members[0] && <h1 className="text-2xl font-semibold text-gray-500 m-5 text-center">NO MEMBERS ADDED IN YOUR ORGANIZATIONS</h1>
                            }
                            <Link to={`/app/org/${org_id}/${orgDetail?.organization_name}/add-member`} className="btn btn-primary w-full text-base text-slate-100 bg-gradient-to-r from-indigo-700 to-purple-500"><BsPersonFillAdd/>Add Member</Link>
                        </div>
                    </div>
                </div>
            </div>
            : activeItem == 'Payments'?
            <div className="w-full relative flex flex-col items-center justify-center">
                <div className="w-full p-6 bg-white rounded-md shadow-lg border-top min-h-screen">
                    <div className="flex justify-between">
                        <p className='text-slate-500 font-bold text-3xl'>Payment History</p><br /><hr />
                        <Link to={`/app/org/${org_id}/buy-plan`} className='flex items-center text-yellow-500 text-center border rounded-full bg-gradient-to-r from-purple-700 to-indigo-500 text-xl p-1 px-3'>UPGRADE TO PRO <FaCrown className="ms-2"/></Link>
                    </div>
                    
                    {   paymentsHistory[0] ?
                        paymentsHistory.map((payment)=> (
                            <div key={payment.pay} className='flex justify-center items-center'>
                                <div className='w-full p-5 border border-slate-500 rounded-xl mt-5'>
                                    <p className='ms-5 font-bold text-l text-red-400'>Payment ID {payment.payment_id}</p> <br />
                                    <div className='flex'>
                                        <p className='w-full text-slate-800 ms-7 font-semibold'>Amount:  {payment.amount}$</p>
                                        <p className='w-full text-slate-800 ms-7 font-semibold'>Payment Time:  {ShowDateTime(payment?.created_at)}</p>
                                    </div><hr />
                                    <div className=''>
                                        <p className='text-slate-800 ms-7 font-semibold'>Payment Status:  {payment.status}</p>
                                    </div><hr />
                                    <div className=''>
                                        <p className='text-slate-800 ms-7 font-semibold'>Payment Method:  {payment.payment_method}</p>
                                    </div><hr />
                                    <div className=''>
                                        <p className='text-slate-800 ms-7 font-semibold'>Organization Name:  {payment.organization_name}</p>
                                    </div><hr />
                                    <div className=''>
                                        <p className='text-slate-800 ms-7 font-semibold'>Payer:  {payment.user}</p>
                                    </div><hr />
                                </div>
                            </div>
                        )) : <h1 className="text-2xl font-semibold text-gray-500 m-5 text-center">You Don&apos;t Have Any Payment History.</h1>
                    }

                </div>
            </div>
            : activeItem == 'Organization Invite'?
            <div className="w-full relative flex flex-col items-center justify-center">
                <div className="w-full p-6 bg-white rounded-md shadow-lg border-top min-h-screen">
                    <div className="overflow-x-auto">
                        <div className="mt-5">
                            <h1 className="text-2xl font-bold mb-5">Invite Code</h1><hr /><br />
                            <p className="font-bold text-xl text-purple-500">Organization Invite Code:  <span className="text-xl border border-purple-500 rounded-full px-5 bg-slate-200 text-red-500">{orgDetail?.invited_code}</span></p>
                            <p>User will be able to join with this cold as &quot;Viewer&quot;.</p>
                        </div>
                    </div>
                </div>
            </div>
            : activeItem == 'Delete Organization'?
            <div className="w-full relative flex flex-col items-center justify-center">
                <div className="w-full p-6 bg-white rounded-md shadow-lg border-top min-h-screen">
                    <div className="overflow-x-auto">
                        <div className="mt-5">
                            <h1 className="text-2xl font-bold mb-5">Delete Your Organizations</h1><hr /><br />
                            <button className="btn btn-outline btn-error" onClick={()=>document.getElementById('my_modal_1').showModal()}>Delete Your Organization</button>
                            <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Are you sure you want to delete your organization.</h3>
                                <p className="py-4">You will lose all of your data, which can not be retrievable.</p>
                                <div className="modal-action">
                                <button onClick={()=> {deleteOrg()}} className="btn btn-outline btn-error">Yes I want to delete</button>
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn " >Cancel</button>
                                </form>
                                </div>
                            </div>
                            </dialog>
                        </div>
                    </div>
                </div>
            </div>
            : ""
        }
    </>
  )
}

export default OrgSettings