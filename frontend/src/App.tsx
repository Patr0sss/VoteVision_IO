import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/landingPage/landingPage";
import Navbar from "./components/navbar/navbar";
import AuthPage from "./pages/authPage/authPage";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();

  const [user, setUser] = useState("");
  useEffect(() => {
    if (localStorage.getItem("username")) {
      setUser(localStorage.getItem("username") as string);
      console.log("USER : " + localStorage.getItem("username"));
    }
  }, []);
  return (
    <div>
      {location.pathname !== "/auth" ? <Navbar user={user} /> : null}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
