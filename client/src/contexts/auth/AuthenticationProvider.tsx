
import { useCallback, useEffect, useState } from 'react';
import type { AuthenticationProviderProps, CreateCredentials, Credentials, Profile, ProfileCredentials, ProfileListData, User, UsersList } from '../../utils/types';
import { AuthenticationContext } from './AuthenticationContext';


const AuthenticationProvider = ({children}: AuthenticationProviderProps) => {
    const [user , setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
    const [activeProfile, setActiveProfile] = useState<Profile | null>(null)
    const [authLoading, setAuthLoading] = useState(true)
    const [userList , setUserList] = useState<UsersList>({favorites: [], watchlist: [], history: []})

 
    
  useEffect(() => {
  const storedToken = localStorage.getItem('token')

  if (storedToken) {
    setToken(storedToken)
  }

  setAuthLoading(false)
}, [])
    
    useEffect(() =>{
        
      
        
        if(!token) return
        
        const refreshLogger = async () => {
            try{
                
                const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/users/user`,{
                    
                    method:'GET',
                    headers: { Authorization: `Bearer ${token}`},
                    
                })
                if (!res.ok) {
                    const error = await res.json()
                    throw new Error(error.message || 'Invalid or Expired Log in')
                }
                const user = await res.json()
            setUser(user)
        } catch {
            localStorage.removeItem('token')
            setUser(null)
        }
    }
    refreshLogger()
    },[token])

    
    const login = async (userData:Credentials) => {
        const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`,{
            
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        })
        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message || 'Login failed')
        }
        
        const {user , accessToken}  = await res.json()
        setUser(user)
        setToken(accessToken)
        localStorage.setItem('token' , accessToken)
    }
    
    const register = async (userData:Credentials) => {
        const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/users/registration`,{
            
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        })
        if (!res.ok) {
            const error = await res.json()
            console.error(error.message)
            throw new Error(error.message || 'Registration failed')
        }

        const {cred , token} = await res.json()
        setUser(cred)
        setToken(token)  
        localStorage.setItem('token' , token)

    }
    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        setToken(null)
    }

    const createProfile = async (data: CreateCredentials) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profiles`, {
            method: "POST",
            headers: { "Content-Type": "application/json" ,  Authorization: `Bearer ${token}`},
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

       
        const { profile } = await res.json();

        setActiveProfileId(profile._id);

        setUser(prev => ({
            ...prev!,
            profiles: [...prev!.profiles, profile]
        }));
    };

    
    const getProfile = async (profileId: string):Promise<void> => {
        setActiveProfileId(profileId);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/user/profile?id=${profileId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" ,  Authorization: `Bearer ${token}`},
     
            });
            
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }
            const data = await res.json()
            setActiveProfile(data)
            
      }

    const updateProfile = async (updateData: ProfileCredentials) => {
        if(!user || !token) return
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" , Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                profileId: updateData._id,
                name: updateData.name,
                isKid: updateData.isKid,
            })
        });
         if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
            }

       const { profile: updatedProfile } = await res.json();

        setUser((prev) => {
            if (!prev) return prev;

            return {
            ...prev,
            profiles: prev.profiles.map((profile) =>
                profile._id === updatedProfile._id
                ? updatedProfile
                : profile
            ),

            }
        })}

    const deleteProfile = async (profileId: string) => {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/users/profiles/${profileId}`,
            {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            }
        );

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Failed to delete profile");
        }

        const { profiles } = await res.json();

        setUser(prev =>
            prev
            ? { ...prev, profiles }
            : prev
        );

        if (activeProfileId === profileId) {
            setActiveProfileId(null);
        }
    };



       const updateProfileList = async ({profileId , contentId , listName ,type}: ProfileListData) => {

        console.log("updateProfileList payload:", {
            profileId,
            contentId,
            listName,
            type
            });

        if(!user || !token) return
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profiles/${profileId}/${listName}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" , Authorization: `Bearer ${token}` },
            body: JSON.stringify({contentId , type})
        });
         if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
            }

       const updatedProfile = await res.json();
       if (!updatedProfile?._id) return;

        setUser((prev) => {
            if (!prev) return prev;

            const updatedProfiles = prev.profiles.map((profile) =>
                profile._id === updatedProfile._id ? updatedProfile : profile
            );

            return {
            ...prev,
            profiles: updatedProfiles

            }
        })
        setActiveProfile((prev) =>
            prev && prev._id === updatedProfile._id ? updatedProfile : prev
        );
        getUsersList()
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            setToken(storedToken)
        }
    }, [])


        const getUsersList = useCallback(async () => {
                if (!activeProfileId) return;
                try {
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profiles/${activeProfileId}/list`,{
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    
                    
                    if(!res.ok){
                        const error = await res.json()
                        throw new Error(error.message)
                    }
    
                    const data = await res.json()

                    console.log('lkT', data)
                    setUserList(data)
    
                } catch (error) {
                    console.error(error)
                }
         },[activeProfileId ,  token])

    useEffect(() => {

        getUsersList()

    }, [activeProfileId ,token])
    

    return (
        <AuthenticationContext.Provider value={{user,  token, authLoading ,activeProfile , activeProfileId ,setActiveProfileId ,login, register, logout ,createProfile, getProfile,updateProfile, deleteProfile ,updateProfileList ,userList , getUsersList}}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export default AuthenticationProvider;
