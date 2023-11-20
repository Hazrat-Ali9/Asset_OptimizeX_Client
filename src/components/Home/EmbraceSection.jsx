import { Link } from "react-router-dom";
import { getToken } from "../../services/localStorageService";


const EmbraceSection = () => {

  const {access_token} = getToken();

  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl mb-6">
        Discover Asset OptimizeX.<span className="font-bold"> Embrace Asset OptimizeX.</span>
        </h1>
        <p className="mx-auto w-[55%]">
        Asset OptimizeX - Maximizing your digital potential. Unleash the power of streamlined digital asset management for peak performance and unparalleled efficiency.
        </p>
        {
          access_token ?
          <button className="bg-primary text-white px-8 py-4 rounded-full mt-10">
          <Link to={"/app"}>Explore Asset</Link>
        </button>
        : <button className="bg-primary text-white px-8 py-4 rounded-full mt-10">
        <Link to={"/user/register"}>Get started</Link>
      </button>
        }
      </div>
    </section>
  );
};

export default EmbraceSection;
