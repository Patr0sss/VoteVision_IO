import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/landingPage/landingPage";
import Navbar from "./components/navbar/navbar";
import AuthPage from "./pages/authPage/authPage";

function App() {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/auth" ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
