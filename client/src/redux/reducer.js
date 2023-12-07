import { TYPES } from "./action-types";
const {
  GET_GAMES,
  GET_GAME_ID,
  GET_GAME_NAME,
  GET_GENRES,
  FILTER_API_DB,
  FILTER_GENRES,
  ORDER_ALFABETIC,
  ORDER_RATING,
  EMPTY_SELECTED_GAME
} = TYPES;

const initialState = {
  games: [],
  gamesBackup: [], //
  genres: [],
  selectedGame: [],
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
        gamesBackup: action.payload,
      };

    case GET_GAME_ID:
      return {
        ...state,
        selectedGame: action.payload,
      };

    case GET_GAME_NAME:
      return {
        ...state,
        games: action.payload,
        gamesBackup: action.payload,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case FILTER_API_DB:
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (action.payload === "api") {
        const apiGames = state.gamesBackup.filter((element) => !uuidRegex.test(element.id));
        return {
          ...state,
          games: apiGames,
        };
      } else if (action.payload === "db") {
        const dbGames = state.gamesBackup.filter((element) => uuidRegex.test(element.id));
        return {
          ...state,
          games: dbGames,
        };
      } else {
        return {
          ...state,
          games: state.gamesBackup
        }
      }

    case FILTER_GENRES:
      const selectedGenre = action.payload;
      const backupCopy = state.gamesBackup;
      if (selectedGenre !== "default") {
        const filteredByGenre = backupCopy.filter((game) =>
          game.genres.some((element) => element === selectedGenre)
        );
        return {
          ...state,
          gamesBackup: state.gamesBackup,
          games: filteredByGenre
        };
      } else
        return {
          ...state,
          games: backupCopy,
        };

    case ORDER_ALFABETIC:
      const gamesCopy = [...state.games];
      return {
        ...state,
        games:
          action.payload === "AZ"
            ? gamesCopy.sort((a, b) => a.name.localeCompare(b.name))
            : action.payload === "ZA"
            ? gamesCopy.sort((a, b) => b.name.localeCompare(a.name))
            : gamesCopy,
      };

    case ORDER_RATING:
      const gamesCopy2 = [...state.games];
      return {
        ...state,
        games:
          action.payload === "asc"
            ? gamesCopy2.sort((a, b) => b.rating - a.rating)
            : action.payload === "desc"
            ? gamesCopy2.sort((a, b) => a.rating - b.rating)
            : gamesCopy2,
      };

    case EMPTY_SELECTED_GAME:  
      return{
        ...state,
        selectedGame: action.payload
      }
    
    default:
      return { ...state };
  }
};

export default gamesReducer;
