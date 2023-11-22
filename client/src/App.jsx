import "./App.css";
import Landing from "./views/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname !== "/" && <NavBar />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
