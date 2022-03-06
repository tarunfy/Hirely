import { NavigationData } from "./NavigationData";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const NavigationBar = () => {
  return (
    <>
      <div className="navigation-container flex justify-evenly items-center  space-x-6 h-auto py-4 px-6  rounded-xl z-50  fixed bottom-1 left-2/4 -translate-x-2/4">
        {NavigationData.map((value, index) => (
          <div key={index}>
            <Link
              className={`${
                window.location.pathname == value.link
                  ? "text-secondary-500"
                  : "text-slate-600 hover:text-black "
              }  flex justify-center items-center flex-col`}
              to={value.link}
              id={value.title}
            >
              <Tippy
                content={value.title}
                interactive={true}
                disabled={window.location.pathname == value.link}
                animation="scale"
                inertia
              >
                <div>{value.icon}</div>
              </Tippy>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default NavigationBar;
