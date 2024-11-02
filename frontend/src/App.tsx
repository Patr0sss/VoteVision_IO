import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/landingPage/landingPage";
import Navbar from "./components/navbar/navbar";
import AuthPage from "./pages/authPage/authPage";
import { useEffect, useState } from "react";
import CreateVotingPage from "./pages/createVoingPage/createVotingPage";

function App() {
  const location = useLocation();

  const [user, setUser] = useState("");
  useEffect(() => {
    if (localStorage.getItem("username")) {
      setUser(localStorage.getItem("username") as string);
    }
  }, []);
  return (
    <div>
      {location.pathname !== "/auth" ? <Navbar user={user} /> : null}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/createVoting" element={<CreateVotingPage />} />
      </Routes>
    </div>
  );
}

export default App;
