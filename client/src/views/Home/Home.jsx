import Styles from "./Home.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../redux/actions";
import GameCard from "../../components/GameCard/GameCard";

const Home = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(getAllGames());
  }, []);

  return (
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
  );
};

export default Home;
