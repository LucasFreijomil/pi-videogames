import { TYPES } from "./action-types";
const { GET_GAMES, GET_GAME_ID, GET_GENRES, FILTER_API_DB, FILTER_GENRES } = TYPES;

const initialState = {
  games: [],
  gamesBackup: [],
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

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case FILTER_API_DB:
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      const copy = [...state.gamesBackup]
      if (action.payload === "api") {
        const apiGames = copy.filter(
          (element) => !uuidRegex.test(element.id)
        );
        return {
          ...state,
          games: apiGames,
        };
      } else if (action.payload === "db") {
        const dbGames = copy.filter((element) =>
          uuidRegex.test(element.id)
        );
        return {
          ...state,
          games: dbGames,
        };
      }
      else return {
        ...state,
        games: copy
      }

    case FILTER_GENRES:
      const selectedGenre = action.payload;
      const backupCopy = [...state.gamesBackup]
      if(selectedGenre !== "default"){
        const filteredByGenre = backupCopy.filter((game) => game.genres.some(element => element.name === selectedGenre));
        return {
          ...state,
          games: filteredByGenre
        };
      } else return {
        ...state,
        games: backupCopy
      };

    default:
      return { ...state };
  }
};

export default gamesReducer;