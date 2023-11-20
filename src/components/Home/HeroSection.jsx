import { Link } from "react-router-dom";
import { getToken } from "../../services/localStorageService";

const HeroSection = () => {

  const {access_token} = getToken();
  
  return (
    <>
    <div className="relative" id="home">
    <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
    </div>
    <section>
        <div className="relative pt-36 ml-auto bg-gradient-to-b from-slate-400 to-slate-200">
            <div className="lg:w-2/3 text-center mx-auto">
                <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Frictionless Digital Asset <span className="text-primary dark:text-white">Management.</span></h1>
                <p className="mt-8 text-gray-700 dark:text-gray-300">Digital asset management (DAM) streamlines the organization, storage, and retrieval of digital resources. It enhances collaboration, ensures version control, and optimizes resource utilization, offering a holistic solution for efficient digital asset handling!</p>
                <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                    <a
                      href="#"
                      className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                    >
                      {
                        access_token ? 
                        <Link to={"/app"} className="relative text-base font-semibold text-white"
                        >Explore Asset</Link>
                        : <Link to={"/user/register"} className="relative text-base font-semibold text-white"
                        >Get started</Link>
                      }
                    </a>
                    <a
                      href="#"
                      className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
                    >
                      <Link to={"/about"}
                        className="relative text-base font-semibold text-primary dark:text-white"
                        >Learn more</Link
                      >
                    </a>
                </div>
                <div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
                    <div className="text-left">
                        <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The lowest price</h6>
                        <p className="mt-2 text-gray-400">Competitive Pricing</p>
                    </div>
                    <div className="text-left">
                        <h6 className="text-lg font-semibold text-gray-700 dark:text-white">Empowering Your Growth</h6>
                        <p className="mt-2 text-gray-400">Help You to Grow</p>
                    </div>
                    <div className="text-left">
                        <h6 className="text-lg font-semibold text-gray-700 dark:text-white">Easy To Use</h6>
                        <p className="mt-2 text-gray-400">Effortless Asset Management.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
    </>
  )
}

export default HeroSection