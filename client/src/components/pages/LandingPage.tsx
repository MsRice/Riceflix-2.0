import Navbar from '../layout/Navbar';
import landing_banner from '../../assets/images/Netflix_assets/landingimage_large.jpg'

const LandingPage = () => {
    return (
        <>
        <div className='container'>
            <div className='landing__banner--wrapper'>
                <div className='banner__image--wrapper'>
                <Navbar />
                    <img src={landing_banner} className='banner__image--img' alt="" />
                </div>
            </div>
            Landing Page
        </div>
        <footer></footer>
        </>
    );
}

export default LandingPage;
