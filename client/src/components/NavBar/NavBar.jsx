import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Styles from "../NavBar/NavBar.module.css";
import gamepad2_logo from "../../assets/gamepad2_logo.png";
import { useState } from "react";
import { getGameByName } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { IoSearch } from "react-icons/io5";

const NavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [searchedGame, setSearchedGame] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    setSearchedGame(event.target.value);
    setShowAlert(false);
  };

  const handleSearchClick = async () => {
    setSearchedGame("");
    try {
      const { data } = await axios(
        `http://localhost:3001/videogames/name/${searchedGame}`
      );

      if (!data.length) {
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 100);
      } else {
        setShowAlert(false);
        dispatch(getGameByName(searchedGame));
      }
    } catch (error) {
      console.error("Error searching game:", error);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 100);
    }
  };

  return (
    <div className={Styles.navBar}>
      <Link to={"/home"} onClick={() => dispatch(getAllGames())}>
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
          {searchedGame && (
            <button
              className={Styles.navSearchButton}
              onClick={handleSearchClick}
            >
              <IoSearch />
            </button>
          )}
        </div>
      )}

      {showAlert && alert("Game not Found!")}

      <Link to={"/create"}>
        <button className={Styles.navButton}>ADD GAME</button>
      </Link>
    </div>
  );
};

export default NavBar;
