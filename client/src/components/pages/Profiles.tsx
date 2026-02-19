import ButtonMain from "../ui/ButtonMain";
import user_smile from '../../assets/images/Netflix_assets/user_smile.png'
import { FaCheckSquare, FaPlusCircle } from "react-icons/fa";
import { useAuthentication } from "../../contexts/auth/AuthenticationContext";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { HiMinusCircle } from "react-icons/hi";
import { IoMdCheckmarkCircle } from "react-icons/io";
import type { CreateCredentials, ProfileCredentials } from "../../utils/types";
import { FaPencilAlt } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";

const Profiles = () => {
    const { user , createProfile , deleteProfile , updateProfile} = useAuthentication()
    const [isModalOpen ,setIsModalOpen] = useState(false)
    const [isEditing ,setIsEditing] = useState(false)
    const [isKid, setIsKid] = useState(false);
    const [name, setName] = useState('');
    const [editingProfile , setEditingProfile ] = useState<ProfileCredentials | null>(null)

     const [error, setError] = useState<string | null>(null)

    console.log(user)

    const getNextAvailableAvatar = (profiles: CreateCredentials[]) => {
        const usedNumbers = profiles.map(profile => {
            const match = profile.avatar_img?.match(/card-(\d+)/);
            return match ? Number(match[1]) : null;
        });

        for (let i = 1; i <= 5; i++) {
            if (!usedNumbers.includes(i)) {
            return `card-${i}`;
            }
        }

        return null; 
        };

    async function createProfileForm(e : React.FormEvent){
        e.preventDefault()

        const avatar = getNextAvailableAvatar(user?.profiles ?? [])
       
        try{
            await createProfile({
                name,
                avatar_img: avatar,
                isKid
            })
            clearForm(e)
            setIsModalOpen(prev => !prev)

        }catch (error) {
        setError((error as Error).message)
    }
    }
    function clearForm (e : React.FormEvent){
        e.preventDefault()
        setName('')
        setIsKid(false)
    }
    async function handleDeleteProfile(profileId :string){
        try{
            deleteProfile(profileId)
        }catch(error){
            console.error(error);
        }
        
    }
    
    function handleEdit(currProfile : ProfileCredentials){
        setEditingProfile(currProfile);
    }
    async function handleEditStart(e: React.FormEvent){
        
        e.preventDefault()
        if (!editingProfile) return;

        try {
            await updateProfile(editingProfile)
            setEditingProfile(null);
        } catch (error) {
            
            console.error(error);
        }

    }
    return (
        <div className='container profile-container modal-container'>
        {!isModalOpen ?
            <div className="profile-row">
                        <h1 className="profile__title">Who's watching?</h1>
                        <div className="profile_cards--wrapper">
                        {user?.profiles.map((profile) => (
                            editingProfile?._id === profile._id ? (

                                
                                <div className="profile_card--wrapper ">
                                <div className={`profile_image--wrapper ${profile.avatar_img} ${isEditing ? 'edit' : ''}`}>
                                <img src={`${user_smile}`} className="profile_image--img" />
                                </div>
                                <form onSubmit={handleEditStart} className='input-profile_card--name'><input type="text" value={editingProfile.name}  onChange={(e) => setEditingProfile({ ...editingProfile , name: e.target.value })}/> <button type="submit"><FaCheckSquare className="check-svg"/></button></form>
                                </div>
                            ) : (

                                
                                <div className="profile_card--wrapper ">
                                <div className={`profile_image--wrapper ${profile.avatar_img} ${isEditing ? 'edit' : ''}`}>
                                <img src={`${user_smile}`} className="profile_image--img" />
                                {isEditing && 
                                <div className="profile__edit--wrapper">
                                <FaPencilAlt onClick={() => handleEdit(profile)} className="pencil-svg"/><span className="dividor"></span><IoTrashSharp onClick={() => handleDeleteProfile(profile._id)} className="trash-svg"/>

                                </div>
                                }
                                </div>
                                <h3 className="profile_card--name">{`${profile.name}`}</h3>
                                </div>
                            )
                                
                            
                        ))}
                        
                        {(user?.profiles.length ?? 0) < 5  && !isEditing &&
                            
                            <div className="profile_card--wrapper" onClick={() => setIsModalOpen(prev => !prev)}>
                            <div className="profile_image--wrapper card-add">
                            <FaPlusCircle className="profile_image--add" />
                            </div>
                            <h3 className="profile_card--name">Add Profile</h3>
                            </div>
                        }
                        

                </div>
                <div className="profile__btn--row">
{
    
}

                <ButtonMain onClick={() => setIsEditing(prev => !prev)} className="profile-btn">Manage Profiles</ButtonMain>
                <ButtonMain onClick={() => setIsEditing(prev => !prev)} className="secondary-btn">Done</ButtonMain>
                </div>
            </div>
            : <>
            <div className="modal-row">
                <RxCross2 className='exit-btn' onClick={() => setIsModalOpen(!isModalOpen)}/>
                <div className="addProfile__form--wrapper">
                    <form className="addProfile__form" onSubmit={createProfileForm}>
                        <div className="addProfile__input--wrapper">
                            <div className="addProfile__title--wrapper">
                                <h2 className="addProfile__title">Add a profile</h2>
                                <h3 className="addProfile__subtitle">Add a profile for another person watching Netflix</h3>
                            </div>
                            <div className="addProfile__subtitle--wrapper">
                                <div className={`addProfile_image--wrapper card-${user?.profiles.length || 0 + 1}`}>
                                    <img src={`${user_smile} `}className="profile_image--img" />
                                </div>
                                <div className="addProfile__name--wrapper">
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name"/>
                                    {error && <p>{error}</p>}
                                </div>
                            </div> 
                        </div>    
                        <div className="addProfile__buttons--wrapper">
                            <div className="kid__container--wrapper">
                                <div className="addProfile__kid--wrapper">
                                    <h4>Kids Profile</h4>
                                    <h6>Only see kid-friendly TV Show and movies</h6>
                                </div>
                                <div className={`selected--wrapper ${isKid ? "active" : ""}`}
                                    onClick={()=> setIsKid(prev => !prev)}
                                >
                                    {
                                        isKid ?
                                        <IoMdCheckmarkCircle /> :
                                        <HiMinusCircle />
                                    }
                                </div>
                            </div>

                            <div className="submit__btns--wrapper">
                                <ButtonMain className="save-btn" type="submit">Save</ButtonMain>    
                                <ButtonMain className="cancel-btn" onClick={clearForm}>Cancel</ButtonMain>    
                            </div>  
                        </div>  
                    </form>
                </div>
            </div>
            
            </>
    }
        </div>
    );
}

export default Profiles;
