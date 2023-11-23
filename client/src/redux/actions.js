import { TYPES } from "./action-types";
import axios from "axios";

const { GET_GAMES } = TYPES;

export const getAllGames = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `https://api.rawg.io/api/games?key=61678cf233004c44998e60ade3390be6`
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
