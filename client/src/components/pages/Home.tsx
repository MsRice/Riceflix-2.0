import BrowserBanner from "../layout/BrowserBanner";
import BrowserNavbar from "../layout/BrowserNavbar";
import Footer from "../layout/Footer";


const Home = () => {
    return (
        <>
        <div className="container">
            <div className='browser__banner--wrapper'>
                <BrowserNavbar />
                <BrowserBanner />
            </div>
            
            <Footer />
        </div>
        <div className="space">space</div>
        </>
    );
}

export default Home;
