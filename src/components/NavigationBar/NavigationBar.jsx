import { NavigationData } from "./NavigationData";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <>
      <div className="navigation-container flex justify-evenly items-center w-96 h-auto p-3 rounded-xl  fixed bottom-1 left-2/4 -translate-x-2/4">
        {NavigationData.map((value, index) => (
          <div key={index}>
            <Link
              className={`${
                window.location.pathname == value.link
                  ? "text-secondary-500"
                  : "text-slate-600 hover:text-black hover:scale-110 hover:-translate-y-1 transition-all duration-300 ease-in-out"
              }  flex justify-center items-center flex-col `}
              to={value.link}
              id={value.title}
            >
              {value.icon}
              <span className="text-xs cursor-pointer">{value.title}</span>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default NavigationBar;
