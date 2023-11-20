
import axios from "axios";
import Carousel from "nuka-carousel";
import { useEffect, useState } from "react";
import FeedbackCard from "./FeedbackCard";

const feedback = [
  {
    id: "feedback-1",
    content:
      "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.",
    name: "Herman Jensen",
    title: "Founder & Leader",
    img: "https://i.imgur.com/Dn0qoCG.png",
  }
];


const Testimonials = () => {
  const [reviews, setReviews]= useState([]);

  useEffect(() => {
    axios.get("/api/feedback-show/")
    .then(res=> {
      setReviews(res.data);
      console.log(res.data)
    })
  
    
  }, [])
  

 return ( 
 <section
    id="clients"
    className={`sm:py-16 py-6 flex justify-center items-center flex-col relative `}
  >
    <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

    <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
      <h2
        className={`font-poppins font-semibold xs:text-[48px] text-[40px] text-black xs:leading-[76.8px] leading-[66.8px] w-full`}
      >
        What People are <br className="sm:block hidden" /> saying about us
      </h2>
      <div className="w-full md:mt-0 mt-6">
        <p
          className={`font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px] text-left max-w-[450px]`}
        >
          
        </p>
      </div>
    </div>
    <Carousel autoplay autoplayInterval={3000} wrapAround={true}>
      {reviews.map((card, index) => (
        <FeedbackCard key={index} {...card} />
      ))}
    </Carousel>
  </section>
)};

export default Testimonials;