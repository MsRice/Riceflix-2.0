import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import LandingPage from "./components/pages/LandingPage";
import Login from "./components/pages/Login";
import Registration from "./components/pages/Registration";
import { useAuthentication } from "./contexts/auth/AuthenticationContext";
import Profiles from "./components/pages/Profiles";
import type { ReactNode } from "react";

const App = () => {

  
  
  const ProtectedRoute = ({children}: {children :ReactNode}) => {
    const { user ,authLoading} = useAuthentication()
    if (authLoading) return null
    if (!user){
      return <Navigate to="/login" replace/>
    }
    return children
  }
  return (
    <Routes>
     
      <Route path="/" element={<LandingPage />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />


      <Route path="/profiles" element={
        <ProtectedRoute>
        <Profiles />
        </ProtectedRoute>
       }/>
      
      <Route path="/browse" element={
        <ProtectedRoute>
        <Home />
        </ProtectedRoute>
        
        }/>
    
    
    </Routes>
  );
}

export default App;
