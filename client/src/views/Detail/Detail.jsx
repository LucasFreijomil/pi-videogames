import Styles from "../Detail/Detail.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGameId } from "../../redux/actions";

const Detail = () => {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.selectedGame)
  const { id } = useParams();

  useEffect(() => {
    dispatch(getGameId(id));
  }, []);

  return (
    <div className={Styles.detail}>
    {game ? (
      <>
        <h1>
          {game.name}
        </h1>
        <img
          className={Styles.detailImage}
          src={game.background_image}
          alt="img"
        />

        <h2>ID: {game.id}</h2>
        <h2>Platforms: {game.platforms?.map((platform) => platform.platform.name)}</h2>
        <h2>Released: {game.released}</h2>
        <h2>Genres: {game.genres?.map((genre) => genre.name)}</h2>

        <p>{game.description_raw}</p>
      </>
    ) : (
      <h3>Loading...</h3>
    )}
  </div>
  )
};

export default Detail;

// ID.
// Nombre.
// Imagen.
// Plataformas.
// Descripción.
// Fecha de lanzamiento.
// Rating.
// Géneros.
