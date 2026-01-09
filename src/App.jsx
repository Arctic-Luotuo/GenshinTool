import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegionPage from "./pages/RegionPage";
import CharacterPage from "./pages/Character";
import PreLogo from "./pages/PreLogo";
import PreAnimation from "./pages/PreAnimation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PreLogo />} />
        <Route path="/pre-ani" element={<PreAnimation />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/region" element={<RegionPage />} />
        <Route path="/character/:regionId" element={<CharacterPage />} />      
        </Routes>
    </Router>
  );
}

export default App;
