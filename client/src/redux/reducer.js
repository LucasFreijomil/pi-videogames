import { TYPES } from "./action-types";
const { GET_GAMES } = TYPES;

const initialState = {
  games: [],
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
      };

    default:
      return { ...state };
  }
};

export default gamesReducer;
