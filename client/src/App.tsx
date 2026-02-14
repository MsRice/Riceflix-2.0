import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import LandingPage from "./components/pages/LandingPage";
import Login from "./components/pages/Login";

const App = () => {
  return (
    <Routes>
      
      <Route path="/" element={<LandingPage />}/>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={<Home />}></Route>
    
    
    </Routes>
  );
}

export default App;
