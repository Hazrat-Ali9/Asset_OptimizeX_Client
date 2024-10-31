// Payment success
const PaymentSuccess = () => {
  return (
    <div className="w-full relative flex flex-col items-center justify-center">
        <div className="w-full p-6 bg-slate-100 rounded-md shadow-lg border-top min-h-screen flex items-center justify-center">
            <div className="border border-green-500 px-40 py-20 rounded-xl">
            <p className='text-green-500 font-bold text-3xl mt-10 text-center items-center'>Payment Successful.</p>
            <p className='text-slate-400  text-center items-center'>Now, you have the unlimited power.</p>
            </div>
            
        </div>
    </div>
  )
}

export default PaymentSuccess