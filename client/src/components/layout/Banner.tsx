import Navbar from './Navbar';
import landing_banner from '../../assets/images/Netflix_assets/landingimage_large.jpg'
import popcorn from '../../assets/images/Netflix_assets/popcorn.png'
import ButtonMain from '../ui/ButtonMain';
import { MdKeyboardArrowRight } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { RxCrossCircled } from "react-icons/rx";

const Banner = () => {
    const { t } = useTranslation()
    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState<boolean>(false);

    function validateEmail(value: string) {
    const trimmed = value.trim();
    if (!trimmed) {
      setIsValid(false);
      return;
    }

    const input = document.createElement("input");
    input.type = "email";
    input.value = trimmed;

    setIsValid(input.checkValidity());
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  }

    return (
        <>
         <div className='landing__banner--wrapper'>
            <div className='banner__image--wrapper'>
                <Navbar />
                <img src={landing_banner} className='banner__image--img' alt="" />
            </div>
            <div className='hero__header--wrapper'>
                <h1>{t("hero_title")}</h1>
                <h3>{t("hero_subtitle")}</h3>
                <h6>{t("hero_subtitle_info")}</h6>
                <div className='header__form--wrapper'>

                <form className='hero__header--form'>
                  
                    <input id='email' type="text" value={email} onChange={handleChange} placeholder='Email address' />
                    
                    <ButtonMain to='/registration' className={'primary-btn get-started'}>{t('get_started')}<MdKeyboardArrowRight /></ButtonMain>
                </form>
                {!isValid && email.length > 0 && (
                    <p style={{ color: "red" }}><RxCrossCircled />Please enter a valid email</p>
                )}
                </div>

            </div>
        </div>
        <div className='hero__subheader--container'>
            <div className='connect__container--wrapper'>
                <div className='connect__image--wrapper'>
                    <img src={popcorn} className='connect__image--img' alt="" />
                </div>
                <div className='connect__header--container'>

                <div className='connect__header--wrapper'>
                    <h3>{t("connect_header")}</h3>
                    <h4>{t("connect_subheader")}</h4>
                </div>
                <ButtonMain to='login' className='secondary-btn'>{t("learn_more")}</ButtonMain>
                </div>
            </div>
        </div>
        </>
    );
}

export default Banner;
