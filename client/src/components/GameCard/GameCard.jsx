import { useNavigate } from "react-router-dom";
import Styles from "../GameCard/GameCard.module.css"

const GameCard = ({ id, name, background_image, genres }) => {
    const navigate = useNavigate();
    return (
      <div className={Styles.link} onClick={() => navigate(`/detail/${id}`)}>
        <div className={Styles.card}>
          <h3>{name}</h3>
          <img className={Styles.cardImage} src={background_image} alt={name} />
          <br />
          <h4>{genres}</h4>
        </div>
      </div>
    );
  };

  export default GameCard;