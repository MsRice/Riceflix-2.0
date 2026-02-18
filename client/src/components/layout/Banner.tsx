import Navbar from './Navbar';
import landing_banner from '../../assets/images/Netflix_assets/landingimage_large.jpg'
import popcorn from '../../assets/images/Netflix_assets/popcorn.png'
import ButtonMain from '../ui/ButtonMain';
import { MdKeyboardArrowRight } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const { t } = useTranslation()
    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState<boolean>(false);

    const navigate = useNavigate();

    function validateEmail(value: string):boolean {
        const trimmed = value.trim();
        
        if (!trimmed) return false
        
        const input = document.createElement("input");
        input.type = "email";
        input.value = trimmed;

        return input.checkValidity()
    }
    
    
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        if (!email) return;
        const valid = validateEmail(email);

        setIsValid(valid)

        if(!valid) return

        navigate("/registration", {
            state: { email },
        });
    };

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

                <form className='hero__header--form' onSubmit={handleSubmit}>
                  
                    <input id='email' type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder='Email address' />
                    
                    <ButtonMain type="submit" className={'primary-btn get-started'}>{t('get_started')}<MdKeyboardArrowRight /></ButtonMain>
                </form>
             
                {!isValid && email.length > 0 && (
                    <p style={{ color: "red", fontWeight: 800}}><RxCrossCircled />Please enter a valid email</p>
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
