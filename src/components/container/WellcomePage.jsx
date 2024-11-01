import { FcCheckmark } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const WelcomePage = () => {
  return (
    <div className="w-full relative flex flex-col items-center justify-center">
        <div className="w-full p-6 bg-slate-100 rounded-md shadow-lg border-top min-h-screen">
            <p className='text-slate-500 font-bold text-3xl mt-10  text-center items-center'>ORGANIZE YOUR DIGITAL ASSETS</p>
            <p className='text-slate-400  text-center items-center'>Keep all of your assets in one place</p>
            
            <div className='flex justify-center items-center'>
              <div className='w-1/3 p-5 border border-slate-500 rounded-xl mt-10'>
                  <p className='font-bold text-xl text-slate-500 mb-3  text-center'>Basic (Free*)</p> <br />
                  <div className='flex text-center items-center'><FcCheckmark/><p className='text-slate-800 ms-7'>Add upto 3 members.</p></div><hr />
                  <div className='flex text-center items-center'><FcCheckmark/><p className='text-slate-800 ms-7'>Limited Library Creation.</p></div><hr />
                  <div className='flex text-center items-center'><FcCheckmark/><p className='text-slate-800 ms-7'>Limited Asset Upload.</p></div><hr />
                  <div className='flex text-center items-center'><FcCheckmark/><p className='text-slate-800 ms-7'>Limited Storage.</p></div><hr />
                  <div className='flex text-center items-center'><FcCheckmark/><p className='text-slate-800 ms-7'>Unlimited Download.</p></div><hr />

                  <button className='w-full font-semibold btn btn-outline btn  btn-primary mt-5'><Link to={"/app/create-org"}>Create Organization</Link></button>
              </div>
            </div>


    <div className="p-6 max-w-screen-xl mx-auto text-slate-500">
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Organization Creation</h2>
        <p>Our Digital Asset Service is designed to help you manage digital assets within organizations. Here's how to create an organization:</p>
        <ol className="list-decimal ml-6">
          <li>Click on the &quot;Create New Organization&quot; button.</li>
          <li>Provide the organization name and a brief description.</li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Library Creation</h2>
        <p>Within each organization, you can create multiple libraries to categorize and store your digital assets. Follow these steps to create a library:</p>
        <ol className="list-decimal ml-6">
          <li>Select the organization for which you want to create a library.</li>
          <li>Click on &quot;Create Library&quot;.</li>
          <li>Give the library a name, descriptions.</li>
          <li>Click &quot;Create Library&quot;.</li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Joining an Organization</h2>
        <p>If you have received an invitation to join an organization from another user, you can follow these steps to accept the invitation and join the organization:</p>
        <ol className="list-decimal ml-6">
          <li>Ask organization Admin or owner to give you a invitation on this email.</li>
          <li>Check your email for the organization invitation.</li>
          <li>Click on the invitation link provided.</li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Managing Digital Assets</h2>
        <p>Once you&apos;ve created an organization and libraries or joined an existing organization, you can start managing your digital assets:</p>
        <ol className="list-decimal ml-6">
          <li>Navigate to the library where you want to upload digital assets.</li>
          <li>Click on &quot;Add Asset&quot; Button.</li>
          <li>Upload your digital asset files.</li>
          <li>Add metadata and descriptions to make assets easily searchable.</li>
          <li>Save the asset to the library.</li>
        </ol>
      </section>
    </div>

            
        </div>
    </div>
  )
}
// Welcome page
export default WelcomePage