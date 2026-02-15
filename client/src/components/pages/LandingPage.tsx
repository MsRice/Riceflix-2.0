import { useMovie } from "../../contexts/movie/MovieContext";
import Banner from "../layout/Banner";
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

            Frequently Asked Questions
            sencondary_Registration
            <div className="space"></div>
        </div>
        <footer></footer>
        </>
    );
}

export default LandingPage;
