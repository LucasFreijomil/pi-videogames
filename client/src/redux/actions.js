import { TYPES } from "./action-types";
import axios from "axios";

const { GET_GAMES, GET_GAME_ID, GET_GAME_NAME, GET_GENRES, FILTER_API_DB, FILTER_GENRES, ORDER_ALFABETIC, ORDER_RATING } = TYPES;

export const getAllGames = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `https://api.rawg.io/api/games?key=61678cf233004c44998e60ade3390be6&page_size=15`
      );
      return dispatch({
        type: GET_GAMES,
        payload: data.results,
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
        `https://api.rawg.io/api/games?search=${name}&key=61678cf233004c44998e60ade3390be6&page_size=15`
      );
      return dispatch({
        type: GET_GAME_NAME,
        payload: data.results,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getGameId = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `https://api.rawg.io/api/games/${id}?key=61678cf233004c44998e60ade3390be6`
      );
      return dispatch({
        type: GET_GAME_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getAllGenres = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `https://api.rawg.io/api/genres?key=61678cf233004c44998e60ade3390be6`
      );
      return dispatch({
        type: GET_GENRES,
        payload: data.results,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const apiDbFilter = (filter) => {
  return {
    type: FILTER_API_DB,
    payload: filter
  }
}

export const genresFilter = (filter) => {
  return {
    type: FILTER_GENRES,
    payload: filter
  }
}

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