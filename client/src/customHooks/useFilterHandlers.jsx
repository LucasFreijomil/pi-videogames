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

  const handleAlfabeticOrder = (event) => {
    dispatch(orderAlfabetic(event.target.value));
  };

  const handleRatingOrder = (event) => {
    dispatch(orderRating(event.target.value));
  };
  return { handleApiDb, handleGender, handleAlfabeticOrder, handleRatingOrder };
};

export default useFilterHandlers;