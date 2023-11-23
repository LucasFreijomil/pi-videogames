import { TYPES } from "./action-types";
const { GET_GAMES, GET_GAME_ID } = TYPES;

const initialState = {
  games: [],
  selectedGame: null,
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
      };

    case GET_GAME_ID:
      return {
        ...state,
        selectedGame: action.payload,
      }  

    default:
      return { ...state };
  }
};

export default gamesReducer;
