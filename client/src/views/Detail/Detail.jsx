import Styles from "../Detail/Detail.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGameId, emptySelectedGame } from "../../redux/actions";

const Detail = () => {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.selectedGame)
  const { id } = useParams();

  useEffect(() => {
    dispatch(getGameId(id));
  }, []);

  return (
    <div className={Styles.detail}>
    {game.name ? (
      <>
      <h1>
      {game.name}
    </h1>
    <img
      className={Styles.detailImage}
      src={game.image}
      alt="img"
    />

      <div className={Styles.gameData}>
        
        <h3>ID</h3>
        <h2>{game.id}</h2>
        <h3>Platforms</h3>
        <h2>{game.platforms?.map((platform) => platform).join(", ")}</h2>
        <h3>Released</h3>
        <h2>{game.released}</h2>
        <h3>Genres</h3>
        <h2>{game.genres?.map((genre) => genre).join(", ")}</h2>
        <h3>Rated </h3>
        <h2>{game.rating}</h2>
        <p>{game.description}</p>
      </div>
      </>
    ) : (
      <h1>Loading...</h1>
    )}
  </div>
  )
};

export default Detail;
// Rating.