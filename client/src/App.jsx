import "./App.css";
import Landing from "./views/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail"
import Create from "./views/Create/Create";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname !== "/" && <NavBar />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route exact path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;