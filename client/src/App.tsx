import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import LandingPage from "./components/pages/LandingPage";
import Login from "./components/pages/Login";
import Registration from "./components/pages/Registration";
import { useAuthentication } from "./contexts/auth/AuthenticationContext";
import Profiles from "./components/pages/Profiles";

const App = () => {
  const { user } = useAuthentication()
  console.log("NT", user)

  return (
    <Routes>
     {!user && <>
     
     
      <Route path="/" element={<LandingPage />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
     </>} 
      
      <Route path="/" element={<Profiles />}></Route>
      <Route path="/browse" element={<Home />}></Route>
    
    
    </Routes>
  );
}

export default App;
