import { Link, useLocation } from "react-router-dom";
import Styles from "../NavBar/NavBar.module.css";
import gamepad2_logo from "../../assets/gamepad2_logo.png";
import { useState } from "react";
import { getGameByName } from "../../redux/actions";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch()

  const [searchedGame, setSearchedGame] = useState("");

  const handleInputChange = (event) => {
    setSearchedGame(event.target.value);
  }

  const handleSearchClick = () => {
    dispatch(getGameByName(searchedGame))
  }

  return (
    <div className={Styles.navBar}>
      <Link to={"/home"}>
        <img
          src={gamepad2_logo}
          alt="gamepad"
          className={Styles.gamepad2_logo}
        />
      </Link>

      {location.pathname === "/home" && (
        <div>
          <input
            className={Styles.searchBar}
            type="text"
            placeholder="Search by name..."
            value={searchedGame}
            onChange={handleInputChange}
          />
          <button className={Styles.navButton} onClick={handleSearchClick}>
            BUSCAR
          </button>
        </div>
      )}

      <Link to={"/create"}>
        <button className={Styles.navButton}>ADD GAME</button>
      </Link>
    </div>
  );
};

export default NavBar;
