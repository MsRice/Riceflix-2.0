
import { useEffect, useState } from 'react';
import type { AuthenticationProviderProps, CreateCredentials, Credentials, Profile, ProfileCredentials, User } from '../../utils/types';
import { AuthenticationContext } from './AuthenticationContext';


const AuthenticationProvider = ({children}: AuthenticationProviderProps) => {
    const [user , setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
     const [activeProfile, setActiveProfile] = useState<Profile | null>(null)
     const [authLoading, setAuthLoading] = useState(true)

    
    
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
        console.log('ntlb')
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profiles`, {
            method: "POST",
            headers: { "Content-Type": "application/json" ,  Authorization: `Bearer ${token}`},
            body: JSON.stringify(data),
        });
        console.log('ntlbs')
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
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/user/profile?id=${profileId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" ,  Authorization: `Bearer ${token}`},
     
            });
            
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }
    
            const { profile } = await res.json()
            setActiveProfile(profile)
            
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



    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            setToken(storedToken)
        }
    }, [])



    return (
        <AuthenticationContext.Provider value={{user,  token, authLoading ,activeProfile , activeProfileId ,setActiveProfileId ,login, register, logout ,createProfile, getProfile,updateProfile, deleteProfile }}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export default AuthenticationProvider;
