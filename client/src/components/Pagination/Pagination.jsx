import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import React from "react";
import Styles from "../../views/Home/Home.module.css";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Pagination = ({ nextHandler, prevHandler, count }) => {
  const gamesState = useSelector((state) => state.games);
  const totalPages = Math.ceil(gamesState.length / 15);

  return (
    <div className={Styles.pagination}>
      {count > 1 && (
        <button onClick={prevHandler} className={Styles.paginButtons}>
          <MdKeyboardDoubleArrowLeft /> Prev
        </button>
      )}
      {totalPages > 0 && (
        <h1>
          {count} / {totalPages}
        </h1>
      )}
      {count < totalPages && (
        <button onClick={nextHandler} className={Styles.paginButtons}>
          Next <MdKeyboardDoubleArrowRight />
        </button>
      )}
    </div>
  );
};

export default Pagination;
