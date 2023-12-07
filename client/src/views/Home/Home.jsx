import Styles from "./Home.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGames,
  getAllGenres,
  emptySelectedGame,
} from "../../redux/actions";
import GameCard from "../../components/GameCard/GameCard";
import Pagination from "../../components/Pagination/Pagination";
import usePagination from "../../customHooks/usePagination";
import useFilterHandlers from "../../customHooks/useFilterHandlers";

const Home = () => {
  const dispatch = useDispatch();

  const genres = useSelector((state) =>
    state.genres.sort((a, b) => a.name.localeCompare(b.name))
  );

  const { gamesArray, nextHandler, prevHandler, count } = usePagination();

  const { handleApiDb, handleGender, handleAlfabeticAndRating } =
    useFilterHandlers();

  useEffect(() => {
    dispatch(getAllGames());

    dispatch(getAllGenres());

    dispatch(emptySelectedGame());
  }, []);

  return (
    <div>
      <div className={Styles.filters}>
        <select onChange={handleAlfabeticAndRating}>
          <option value="default">Sort By...</option>
          <option value="AZ">A-Z</option>
          <option value="ZA">Z-A</option>
          <option value="asc">Highest Rating First</option>
          <option value="desc">Lowest Rating First</option>
        </select>

        <select onChange={handleApiDb}>
          <option value="default">Show All (API/DB)</option>
          <option value="api">API</option>
          <option value="db">DB</option>
        </select>

        <select onChange={handleGender}>
          <option value="default">All Genres</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className={Styles.CardList}>
        {gamesArray.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            name={game.name}
            background_image={game.image}
            genres={game.genres.map((genre) => genre)}
          />
        ))}
      </div>
      <Pagination
        nextHandler={nextHandler}
        prevHandler={prevHandler}
        count={count}
      />
    </div>
  );
};

export default Home;
