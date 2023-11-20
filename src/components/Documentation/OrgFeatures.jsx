
const OrgFeatures = () => {
  return (
    <section id='organization-feature' className={` flex-row flex-wrap sm:mb-20 mb-6`}>
        <div className={`flex-1  flex-col  xl:px-0 sm:px-16 px-6`}>
            <div className='flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2'>
                <p className={`font-poppins font-semibold xs:text-[34px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full ml-2`}>
                    <span className='text-slate-400'>Organization </span>
                    <span className='text-white'>Features</span>
                </p>
            </div>
            <p className={`font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]  mt-5`}>
                The system will be designed to be cost-effective and user-friendly for small businesses. This suggests that the organization&apos;s features will be tailored to the specific needs of small businesses, such as providing simple tools for managing digital assets.<br/><br/>
                <span className='text-gradient'>Here are some specific examples of organizational features</span>
                <br/>
            
                <span className='text-rose-200'>1. Add members to an organization: </span>Users can add members to an organization by providing their email addresses and member permissions role specific.<br/>
                    <span className='text-rose-200'>2. Assign permissions to members: </span> Users can assign permissions to members, such as Admin, Contributor, or Viewer. <br/>
                    <span className='text-rose-200'>3. Create an asset library: </span>Users can create an asset library by providing a name and description.<br/>
                    <span className='text-rose-200'>4. Add assets to an asset library: </span>Users can add assets to an asset library by uploading files or linking to external resources.
                <br/>
                    <span className='text-rose-200'>5. Manage asset permissions: </span>Users can manage asset permissions for individual users and members by specifying who can view, edit, or delete assets.
                    <br/>
                - Organization Owner: All Permissions access <br/>
                - Organization Admin: Add member, asset edit, asset delete, library create, upload asset, library edit, library delete and not permissions organization delete.<br/>
                - Organization Contributor:  Upload asset, library create, asset edit that&apos;s contributor permissions.<br/>
                - Organization Viewer: Only permissions view all asset and download asset
                <br/>
                
                <span className='text-rose-200'>6. Upgrade to pro: </span>Upgrading to the Pro plan gives you access to a number of additional features and benefits, including:
                <br/>
                - Increased storage space  <br/>
                - More member users add <br/>
                - Advanced reporting features <br />
                - Priority support <br />
                STEPS <br/>
                - Go to the billing page. <br />
                - Click on the &quot;Upgrade Plan&quot; button. <br />
                - Select the Pro plan. <br />
                - Click on the &quot;Upgrade&quot; button. <br />
                RESULT <br />
                Your account will be upgraded to the Pro plan immediately. You will be able to start using the additional features and benefits of the Pro plan right away. <br />
                Additional Information <br />
                - If you are on a monthly billing cycle, your upgrade will take effect immediately. <br />
                Contact Us <br />
                - If you have any questions about upgrading to the Pro plan, please contact us.<br/>
            </p>
        </div>
    </section>
  
);
}

export default OrgFeatures