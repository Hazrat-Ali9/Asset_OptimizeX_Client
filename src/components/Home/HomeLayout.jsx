import Feature from "./Feature"
import Hero from "./Hero"
import { Team } from "./Team"
import Testimonials from "./Testimonials"




const HomeLayout = () => {
  return (
    <>
      <Hero/>
      <Feature/>
          {/* <HeroSection/> */}
          {/* <FeatureSection/> */}
          {/* <EmbraceSection/> */}
      <div className="bg-gradient-to-r from-gray-300 w-full overflow-hidden">
        <div className={`container mx-auto`}>
          <div className={`xl:max-w-[1280px] w-full`}>
            <Testimonials />
          </div>
        </div>
      </div>
      <Team/>
    </>
  )
}

export default HomeLayout