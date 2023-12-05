import { TYPES } from "./action-types";
import axios from "axios";

const {
  GET_GAMES,
  GET_GAME_ID,
  GET_GAME_NAME,
  GET_GENRES,
  FILTER_API_DB,
  FILTER_GENRES,
  ORDER_ALFABETIC,
  ORDER_RATING,
} = TYPES;

export const getAllGames = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`http://localhost:3001/videogames`);
      return dispatch({
        type: GET_GAMES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getGameByName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `http://localhost:3001/name/${name}`
      );
      return dispatch({
        type: GET_GAME_NAME,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getGameId = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `http://localhost:3001/videogames/${id}`
      );
      return dispatch({
        type: GET_GAME_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllGenres = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `http://localhost:3001/genres`
      );
      return dispatch({
        type: GET_GENRES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const apiDbFilter = (filter) => {
  return {
    type: FILTER_API_DB,
    payload: filter,
  };
};

export const genresFilter = (filter) => {
  return {
    type: FILTER_GENRES,
    payload: filter,
  };
};

export const orderAlfabetic = (order) => {
  return {
    type: ORDER_ALFABETIC,
    payload: order,
  };
};

export const orderRating = (order) => {
  return {
    type: ORDER_RATING,
    payload: order,
  };
};
