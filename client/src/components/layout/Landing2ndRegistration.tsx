import React, { useState } from 'react';
import ButtonMain from '../ui/ButtonMain';
import { RxCrossCircled } from 'react-icons/rx';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Landing2ndRegistration = () => {
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
        <div className='secondary__registration--wrapper'>
            <h6 className='secondary__registration--subtitle'>{t("hero_subtitle_info")}</h6>
             <div className='header__form--wrapper'>

                <form className='hero__header--form' onSubmit={handleSubmit}>
                  
                    <input id='email' type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder='Email address' />
                    
                    <ButtonMain type='submit' className={'primary-btn secondary-started'}>{t('get_started')}<MdKeyboardArrowRight /></ButtonMain>
                </form>
                {!isValid && email.length > 0 && (
                    <p style={{ color: "red" , fontWeight: 800 }}><RxCrossCircled />Please enter a valid email</p>
                )}
                </div>
        </div>
    );
}

export default Landing2ndRegistration;
