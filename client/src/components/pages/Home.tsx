import { useEffect } from "react";
import BrowserBanner from "../layout/BrowserBanner";
import BrowserCategories from "../layout/BrowserCategories";
import BrowserNavbar from "../layout/BrowserNavbar";
import Footer from "../layout/Footer";
import type { HomeProps } from "../../utils/types";


const Home = ({isDetailsOopen}: HomeProps) => {
useEffect(() => {
  if (isDetailsOopen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [isDetailsOopen]);

    return (
        <>
        <div className={`container ${isDetailsOopen ? "opened-details" : ""}`}>
            <div className='browser__banner--wrapper'>
                <BrowserNavbar />
                <BrowserBanner isDetailsOopen={isDetailsOopen}/>
                <BrowserCategories />

            </div>
            
            <Footer className="browser-footer"/>
        </div>
        </>
    );
}

export default Home;
