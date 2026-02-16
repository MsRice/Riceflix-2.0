import { useMovie } from "../../contexts/movie/MovieContext";
import Banner from "../layout/Banner";
import Footer from "../layout/Footer";
import Landing2ndRegistration from "../layout/Landing2ndRegistration";
import LandingFAQ from "../layout/LandingFAQ";
import LandingMoreReasons from "../layout/LandingMoreReasons";
import LandingTrending from "../layout/LandingTrending";

const LandingPage = () => {
    const { loading } = useMovie()
    return (
        <>
        <div className='container'>
           <Banner />
            {!loading && <LandingTrending />}
            <LandingMoreReasons />
            <LandingFAQ />
            <Landing2ndRegistration />
            <Footer />
 
        </div>
        </>
    );
}

export default LandingPage;
