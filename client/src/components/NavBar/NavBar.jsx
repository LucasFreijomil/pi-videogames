import { Link, useLocation } from "react-router-dom";
import Styles from "../NavBar/NavBar.module.css";
import gamepad2_logo from "../../assets/gamepad2_logo.png";

const NavBar = () => {
  const location = useLocation();

  return (
    <div className={Styles.navBar}>
      <Link to={"/home"}>
        <img src={gamepad2_logo} alt="F1" className={Styles.gamepad2_logo} />
      </Link>

      {location.pathname === "/home" && (
        <input
          className={Styles.searchBar}
          type="text"
          placeholder="Search by name..."
        />
      )}

      <Link to={"/create"}>
        <button className={Styles.navButton}>ADD GAME</button>
      </Link>
    </div>
  );
};

export default NavBar;
