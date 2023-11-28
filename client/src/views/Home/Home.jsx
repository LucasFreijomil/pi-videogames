import Styles from "./Home.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames, getAllGenres, apiDbFilter, genresFilter } from "../../redux/actions";
import GameCard from "../../components/GameCard/GameCard";

const Home = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getAllGenres());
  }, []);

  const handleApiDb = (event) => {
    dispatch(apiDbFilter(event.target.value));
  };

  const handleGender = (event) => {
    dispatch(genresFilter(event.target.value))
  }

  return (
    <div>
      <div className={Styles.filters}>
        <select name="" id="">
          <option value="">Sort By Name (default)</option>
        </select>

        <select name="" id="" onChange={handleApiDb}>
          <option value="default" >Show All (API/DB)</option>
          <option value="api">API</option>
          <option value="db">DB</option>
        </select>
      </div>

      <div className={Styles.filters}>
        <select name="" id="">
          <option value="">Release</option>
        </select>

        <select name="" id="" onChange={handleGender}>
          <option value="default">Genres</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className={Styles.CardList}>
        {games.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            name={game.name}
            background_image={game.background_image}
            genres={game.genres.map((genre) => genre.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
