import ButtonMain from "../ui/ButtonMain";
import user_smile from '../../assets/images/Netflix_assets/user_smile.png'
import { FaPlusCircle } from "react-icons/fa";
import { useAuthentication } from "../../contexts/auth/AuthenticationContext";
import { useState } from "react";

const Profiles = () => {
    const { user } = useAuthentication()
    const [isModalOpen ,setIsModalOpen] = useState(false)
    console.log(user?.profiles)
    return (
        <div className='container profile-container modal-container'>
        {!isModalOpen ?
            <div className="profile-row">
                        <h1 className="profile__title">Who's watching?</h1>
                        <div className="profile_cards--wrapper">
                        {user?.profiles.map((index , profile) => {
                            
                            return(
                                `<div className="profile_card--wrapper ">
                                <div className="profile_image--wrapper card-${Number(index) + 1}">
                                <img src=${user_smile} className="profile_image--img" />
                                </div>
                                <h3 className="profile_card--name">${profile}</h3>
                                </div>`
                                
                            )
                        })}
                        
                        {(user?.profiles.length ?? 0) < 5  && 
                            
                            <div className="profile_card--wrapper" onClick={() => setIsModalOpen(prev => !prev)}>
                            <div className="profile_image--wrapper card-add">
                            <FaPlusCircle className="profile_image--add" />
                            </div>
                            <h3 className="profile_card--name">Add Profile</h3>
                            </div>
                        }
                        

                </div>
                <div className="profile__btn--row">

                <ButtonMain type="submit" className="profile-btn">Manage Profiles</ButtonMain>
                </div>
            </div>
            : <>
            <div className="modal-row">
                modal open
            </div>
            
            </>
    }
        </div>
    );
}

export default Profiles;
