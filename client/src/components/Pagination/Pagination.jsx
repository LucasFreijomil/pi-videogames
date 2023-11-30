import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import React from "react";
import Styles from "../../views/Home/Home.module.css";

const Pagination = ({ nextHandler, prevHandler, count }) => {
  return (
    <div className={Styles.pagination}>
      {count > 1 && (
        <button
          onClick={prevHandler}
          className={Styles.paginButtons}
          disabled={count < 2}
        >
          <MdKeyboardDoubleArrowLeft /> Prev
        </button>
      )}
      <h1>{count}</h1>
      {count < 3 && (
        <button onClick={nextHandler} className={Styles.paginButtons}>
          Next <MdKeyboardDoubleArrowRight />
        </button>
      )}
    </div>
  );
};

export default Pagination;
