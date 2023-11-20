import React from 'react'

const OrganizationDoc = () => {
  return (
    <section id='organization' className={` flex-row flex-wrap sm:mb-20 mb-6`}>


       
<div
        className={`flex-1  flex-col  xl:px-0 sm:px-16 px-6`}
      >
       
        <div className='flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2'>
         
          <p className={`font-poppins font-semibold xs:text-[34px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full ml-2`}>
            <span className='text-slate-400'>Organization</span> Register and{' '}
            <span className='text-slate-400'>Access Organization</span> Account
          </p>
        </div>




        <p className={`font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]  mt-5`}>
        Describes the process by which a user can create an organization and verify their email address. Once the user&apos;s email address has been verified, they will be able to access their organization account.


        <br/>
        <br/>
        <span className='text-gradient'>Create Organization</span>
        <br/>
        To create an organization, a user must provide the following information:  
        <br />
        <span className='text-rose-200'>1. </span>
             Organization name <br/>
            <span className='text-rose-200'>2. </span> Description <br/>
            <span className='text-rose-200'>3. </span> Organization phone number<br/>
            <span className='text-rose-200'>4. </span>Address
        <br/>
        Email Verification:  
        <br />
        The verification link in the email will direct the user to a page where they can confirm their email address. Once the user has confirmed their email address, they will be able to access their organization account




        </p>
      </div>
  </section>

  )
}

export default OrganizationDoc