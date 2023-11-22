import './App.css'
import Landing from "./views/Landing/Landing";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {

  return (
    <Routes>
        <Route exact path="/" element={<Landing />} />
      </Routes>
  )
}

export default App
