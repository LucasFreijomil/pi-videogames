import { useNavigate } from "react-router-dom";
import Styles from "../GameCard/GameCard.module.css";

const GameCard = ({ id, name, background_image, genres }) => {
  const navigate = useNavigate();
  return (
    <div className={Styles.link} onClick={() => navigate(`/detail/${id}`)}>
      <div className={Styles.card}>
        <h1>{name}</h1>
        <img className={Styles.cardImage} src={background_image} alt={name} />
        <br />
        <h3>{genres}</h3>
      </div>
    </div>
  );
};

export default GameCard;
