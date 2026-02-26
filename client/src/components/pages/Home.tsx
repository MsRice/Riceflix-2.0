import BrowserBanner from "../layout/BrowserBanner";
import BrowserCategories from "../layout/BrowserCategories";
import BrowserNavbar from "../layout/BrowserNavbar";
import Footer from "../layout/Footer";


const Home = () => {

   
    return (
        <>
        <div className="container">
            <div className='browser__banner--wrapper'>
                <BrowserNavbar />
                <BrowserBanner />
                <BrowserCategories />

            </div>
            
            <Footer />
        </div>
        </>
    );
}

export default Home;
