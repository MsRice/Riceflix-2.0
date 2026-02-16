import React, { useState } from 'react';
import ButtonMain from '../ui/ButtonMain';
import { RxCrossCircled } from 'react-icons/rx';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const Landing2ndRegistration = () => {
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
        <div className='secondary__registration--wrapper'>
            <h6 className='secondary__registration--subtitle'>{t("hero_subtitle_info")}</h6>
             <div className='header__form--wrapper'>

                <form className='hero__header--form'>
                  
                    <input id='email' type="text" value={email} onChange={handleChange} placeholder='Email address' />
                    
                    <ButtonMain to='/registration' className={'primary-btn secondary-started'}>{t('get_started')}<MdKeyboardArrowRight /></ButtonMain>
                </form>
                {!isValid && email.length > 0 && (
                    <p style={{ color: "red" }}><RxCrossCircled />Please enter a valid email</p>
                )}
                </div>
        </div>
    );
}

export default Landing2ndRegistration;
