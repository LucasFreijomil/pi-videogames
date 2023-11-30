import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const usePagination = () => {
  const gamesState = useSelector((state) => state.games);
  const [prev, setPrev] = useState(0);
  const [next, setNext] = useState(15);
  const [count, setCount] = useState(1);
  let gamesArray = gamesState.slice(prev, next);
  const totalPages = Math.ceil(gamesState.length / 15);

  useEffect(() => {
    setPrev(0);
    setNext(15);
    setCount(1);
  }, [gamesState.length]);

  const prevHandler = () => {
    if (count > 1) {
      if (prev - 15 < 0) {
        setPrev(0);
        setNext(15);
      } else if (prev - 15 >= 0) {
        setPrev(prev - 15);
        setNext(next - 15);
      }
      setCount(count - 1);
    }
  };

  const nextHandler = () => {
    if (count < totalPages) {
      setNext(next + 15);
      setPrev(prev + 15);
      setCount(count + 1);
    }
  };

  return { prevHandler, nextHandler, gamesArray, count };
};

export default usePagination;
