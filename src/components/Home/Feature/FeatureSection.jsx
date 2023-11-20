
import "./Enhance.css";
import { EnhanceItem } from "./enhance";

const FeatureSection = () => {
  return (
    <section className="py-16 relative enhance-section">
      <div className="z-10 relative">
        <h1 className="text-3xl mb-4 text-center font-semibold text-white">
        Unlocking the Full Power of Your Digital Assets 
        </h1>
        <div className="grid grid-cols-3 gap-10 container mx-auto mt-20">
          {EnhanceItem.map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg flex-col flex items-baseline gap-y-4 shadow-2xl"
            >
              <img src={item.icon} width={40} height={40} />
              <h3 className="text-xl text-[#000e4b] font-medium">
                {item.title}{" "}
              </h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
