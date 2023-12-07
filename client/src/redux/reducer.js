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
  EMPTY_SELECTED_GAME,
} = TYPES;

const initialState = {
  games: [],
  allApiGames: [],
  allDbGames: [],
  genres: [],
  selectedGame: [],
  selectedOrigin: "",
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload.gamesFromAPI.concat(action.payload.gamesFromDB),
        allApiGames: action.payload.gamesFromAPI,
        allDbGames: action.payload.gamesFromDB,
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
      };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case FILTER_API_DB:
      if (action.payload === "api") {
        return {
          ...state,
          games: state.allApiGames,
          selectedOrigin: "API",
        };
      } else if (action.payload === "db") {
        return {
          ...state,
          games: state.allDbGames,
          selectedOrigin: "DB",
        };
      } else {
        return {
          ...state,
          games: state.allApiGames.concat(state.allDbGames),
        };
      }

    case FILTER_GENRES:
      const selectedGenre = action.payload;
      let filteredByGenre = [];
      if (state.selectedOrigin === "API") {
        filteredByGenre = state.allApiGames;
      } else if (state.selectedOrigin === "DB") {
        filteredByGenre = state.allDbGames;
      } else {
        filteredByGenre = state.allApiGames.concat(state.allDbGames);
      }

      if (selectedGenre !== "default") {
        filteredByGenre = filteredByGenre.filter((game) =>
          game.genres.some((element) => element === selectedGenre)
        );
      }

      return {
        ...state,
        games: filteredByGenre,
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
      return {
        ...state,
        selectedGame: action.payload,
      };

    default:
      return { ...state };
  }
};

export default gamesReducer;
