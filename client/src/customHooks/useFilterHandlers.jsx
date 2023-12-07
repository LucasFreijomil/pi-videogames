import { useDispatch } from "react-redux";
import { apiDbFilter, genresFilter, orderAlfabetic, orderRating } from "../redux/actions";

const useFilterHandlers = () => {
  const dispatch = useDispatch();

  const handleApiDb = (event) => {
    dispatch(apiDbFilter(event.target.value));
  };

  const handleGender = (event) => {
    dispatch(genresFilter(event.target.value));
  };

  const handleAlfabeticAndRating = (event) => {
    if (event.target.value === "AZ" || event.target.value === "ZA"){
      dispatch(orderAlfabetic(event.target.value))
    } else {
      dispatch(orderRating(event.target.value));
    }
  }
  return { handleApiDb, handleGender, handleAlfabeticAndRating };
};

export default useFilterHandlers;