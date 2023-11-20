import React from 'react';



const Authentication = () => {
  return (
    <section
      id='home'
      className={`flex md:flex-row flex-col `}
    >
       {/* <Navbar/> */}
       
      <div
        className={`flex-1  flex-col xl:px-0 sm:px-16 px-6`}
      >
       
        <div className='flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2'>
         
          <p className={`font-poppins font-semibold xs:text-[34px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full ml-2`}>
            <span className='text-slate-400'>User</span> Authentication and{' '}
            <span className='text-slate-400'>Access Control</span> Account
          </p>
        </div>


        <div className='flex flex-row justify-between items-center w-full'>
          <h1 className='flex-1 font-poppins font-semibold ss:text-[30px] text-[16px] text-white ss:leading-[100.8px] leading-[75px]'>
            <span className='text-gradient'>With Django Rest Framework JWT Token</span>{' '}
          </h1>
         
        </div>


        <p className={` font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]  mt-5`}>
        JSON Web Tokens (JWTs) are a popular and secure way to implement authentication in REST APIs. They are self-contained tokens that can be used to verify the identity of a user without the need for a database lookup.
        In this document, we will discuss how to implement a secure user registration and login system using Django REST framework and JWT tokens.


        <br/>
        <br/>
        <span className='text-gradient'> User Registration</span>
        <br/>
        The user registration process is designed to prevent malicious users from creating accounts. This can be done by implementing the following measures:
        <br />
        <span className='text-rose-200'>1. </span>
            Require name, email, phone number and  strong passwords. Passwords should be at least 8 characters long. <br/>
            <span className='text-rose-200'>2. </span> Prevent duplicate usernames and email addresses. The system should prevent users from creating accounts with usernames or email addresses that are already in use. <br/>
            <span className='text-rose-200'>3. </span> Once a user has successfully register in, the system should generate a JWT token for the user. This token can then be used to authenticate the user on subsequent requests.


        <br/>
        <br/>
        <span className='text-gradient'> User Login</span>
        <br/>
        The user login process is designed to prevent unauthorized access to accounts. This can be done by implementing the following measures:
        <br />
        <span className='text-rose-200'>1. </span>
        Require Email and Password. <br/>      
        <span className='text-rose-200'>2. </span>
        The system uses a secure password hashing algorithm. This will prevent attackers from being able to steal passwords in plain text. <br/>      
            <span className='text-rose-200'>3. </span> User has successfully logged in, the system should generate a JWT token for the user. This token can then be used to authenticate the user on subsequent requests.


        <br/>
        <br/>
        <span className='text-gradient'>Forgot Password</span>
        <br/>
        The forgot password system allows users to reset their passwords if they have forgotten them. The system works by sending a verification email to the user&apos;s registered email address. The email contains a link that the user can click to reset their password.:
        <br />
        <span className='text-rose-200'>1. </span>
        The user enters their email address into the forgot password form. <br/>      
        <span className='text-rose-200'>2. </span>
        The system checks if a user with the given email address exists. <br/>      
        <span className='text-rose-200'>3. </span> If a user exists, the system generates a password reset token. <br/>
        <span className='text-rose-200'>4. </span> The system sends an email to the user&apos;s registered email address containing the password reset token. <br/>
        <span className='text-rose-200'>5. </span> The password reset token has a limited lifespan. <br/>
        <span className='text-rose-200'>6. </span> The user clicks on the link in the email to reset their password. <br/>
        <span className='text-rose-200'>7. </span> The system prompts the user to enter a new password. <br/>
        <span className='text-rose-200'>8. </span> The system updates the user&apos;s password. <br/>
        <br />
        </p>
      </div>
    </section>

  )
}

export default Authentication