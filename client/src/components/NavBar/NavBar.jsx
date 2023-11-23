import { Link } from "react-router-dom";
import Styles from "../NavBar/NavBar.module.css";
import gamepad2_logo from "../../assets/gamepad2_logo.png";

const NavBar = () => {
  return (
    <div className={Styles.navBar}>
      <Link to={"/home"}>
        <img src={gamepad2_logo} alt="F1" className={Styles.gamepad2_logo} />
      </Link>

      <Link to={"/create"}>
        <button className={Styles.navButton}>ADD GAME</button>
      </Link>
    </div>
  );
};

export default NavBar;
