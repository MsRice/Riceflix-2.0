import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/pages/Home";
import LandingPage from "./components/pages/LandingPage";
import Login from "./components/pages/Login";
import Registration from "./components/pages/Registration";
import { useAuthentication } from "./contexts/auth/AuthenticationContext";
import Profiles from "./components/pages/Profiles";
import type { ReactNode } from "react";
import Watch from "./components/pages/Watch";
import BrowserDetails from "./components/pages/BrowserDetails";

const App = () => {

  
  const location = useLocation()
  const state = location.state as { backgroundLocation?: Location}
  const isDetailsOopen = !!state?.backgroundLocation
  
  const ProtectedRoute = ({children}: {children :ReactNode}) => {
    const { user , authLoading } = useAuthentication()

    
    if (authLoading) return null
    if (!user){
      return <Navigate to="/login" replace/>
    }
    return children
  }
  return (<>
    <Routes location={state?.backgroundLocation || location}>
     
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
        <Home isDetailsOopen={isDetailsOopen}/>
        </ProtectedRoute>
        }/>

      <Route path="/browse/:contentId" element={
        <ProtectedRoute>
        <BrowserDetails />
        </ProtectedRoute>
        }/>

     <Route path="/watch/:contentId/:type" element={
        <ProtectedRoute>
        <Watch />
        </ProtectedRoute>
        
        }/>
    
    </Routes>
    {state?.backgroundLocation && (
      <Routes>
        <Route path="/browse/:contentId" element={<BrowserDetails />} />
      </Routes>
    )}</>
  );
}

export default App;
