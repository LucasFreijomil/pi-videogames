import Styles from "./Home.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames, getAllGenres, getGameId } from "../../redux/actions";
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
  const { handleApiDb, handleGender, handleAlfabeticOrder, handleRatingOrder } =
    useFilterHandlers();

  useEffect(() => {
    dispatch(getGameId(""));
    gamesArray.length === 0 && genres.length === 0 && dispatch(getAllGames());
    dispatch(getAllGenres());
  }, []);

  return (
    <div >
      {gamesArray.length ? (
        <>
          <div className={Styles.filters}>
            <select name="" id="" onChange={handleAlfabeticOrder}>
              <option value="default">Sort By Name (default)</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>

            <select name="" id="" onChange={handleApiDb}>
              <option value="default">Show All (API/DB)</option>
              <option value="api">API</option>
              <option value="db">DB</option>
            </select>
          </div>

          <div className={Styles.filters}>
            <select name="" id="" onChange={handleRatingOrder}>
              <option value="default">Order Rating (default)</option>
              <option value="asc">Highest First</option>
              <option value="desc">Lowest First</option>
            </select>

            <select name="" id="" onChange={handleGender}>
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
        </>
      ) : (
        <div className={Styles.loading}>
                <h1>Loading...</h1>
            </div>
      )}
    </div>
  );
};

export default Home;
