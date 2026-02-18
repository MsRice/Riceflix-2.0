
import { useEffect, useState } from 'react';
import type { AuthenticationProviderProps, Credentials, User } from '../../utils/types';
import { AuthenticationContext } from './AuthenticationContext';

const AuthenticationProvider = ({children}: AuthenticationProviderProps) => {
    const [user , setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    
    
    useEffect(() => {
    setToken(localStorage.getItem('token'))
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

        const {user , token}  = await res.json()
        setUser(user)
        setToken(token)
        localStorage.setItem('token' , token)
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


    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            setToken(storedToken)
        }
    }, [])

    useEffect(() => {
        
        if (!token) {
            setUser(null)
            return
        }

        const hydrateUser = async () => {
            try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/user`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Invalid token");

            const user = await res.json();
            setUser(user);
            } catch {
            localStorage.removeItem("token");
            setUser(null);
            setToken(null)
            }
        };

        hydrateUser();
    }, [token]);

    return (
        <AuthenticationContext.Provider value={{user, token, login, register, logout }}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export default AuthenticationProvider;
