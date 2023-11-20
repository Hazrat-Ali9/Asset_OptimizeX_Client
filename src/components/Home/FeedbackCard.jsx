
const FeedbackCard = ({ user, organization_name, org_position, image, message }) =>{
  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const base_url = BaseUrl.slice(0, -1);

   return (
    <div className="flex justify-between  flex-col  px-10 py-12 rounded-[20px]  max-w-[450px] text-dimWhite bg-gradient-to-r from-gray-500 to-gray-200  mx-auto my-0 feedback-card">
      <img
        src={"https://i.imgur.com/rx3eOUo.png"}
        alt="double_quotes"
        className="w-[42.6px] h-[27.6px] object-contain"
      />
      <p className="font-poppins font-normal text-[18px] leading-[32.4px]  my-10">
        {message}
      </p>
  
      <div className="flex flex-row">
        <img src={base_url+image} alt={user} className="max-h-20 rounded-full" />
        <div className="flex flex-col ml-4">
          <h4 className="font-poppins font-semibold text-[20px] leading-[32px] ">
            {user}
          </h4>
          <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite">
            {org_position} - {organization_name}
          </p>
        </div>
      </div>
    </div>
  )};
  
  export default FeedbackCard;