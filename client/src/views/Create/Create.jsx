import Styles from "../Create/Create.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres } from "../../redux/actions";
import { useEffect } from "react";
import useCreateHandlers from "../../customHooks/useCreateHandlers";
import { MdAdd } from "react-icons/md";

const Create = () => {
  const dispatch = useDispatch();

  const genres = useSelector((state) =>
    state.genres.sort((a, b) => a.name.localeCompare(b.name))
  );

  const {
    rating,
    handleInputChange,
    selectedGenres,
    handleGenreSelect,
    handleRemoveGenre,
    releaseDate,
    handleReleaseDateChange,
    platformInput,
    platforms,
    handleAddPlatform,
    handleRemovePlatform,
    handleRatingChange,
    setPlatformInput,
    handleFormSubmit,
    errors,
  } = useCreateHandlers();

  useEffect(() => {
    dispatch(getAllGenres());
  }, []);

  return (
    <div className={Styles.form}>
      <form onSubmit={handleFormSubmit}>
        <h2>Name</h2>
        <input
          type="text"
          name="name"
          placeholder="Type the game name..."
          onChange={handleInputChange}
          autoComplete="off"
        />
        <p>{errors.name && <span>{errors.name}</span>}</p>

        <h2>Genres</h2>
        <select name="genres" onChange={handleGenreSelect}>
          <option value="">Select</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
        <br />
        <br />

        <div>
          {selectedGenres.genres.map((selectedGenre, index) => (
            <div key={index} className={Styles.selectedGenre}>
              {selectedGenre}
              <button
                type="button"
                onClick={() => handleRemoveGenre(selectedGenre)}
              >
                X
              </button>
            </div>
          ))}
        </div>

        <h2>Platforms</h2>
        <div>
          <input
            type="text"
            name="platforms"
            autoComplete="off"
            value={platformInput}
            placeholder="Add one or more..."
            onChange={(e) => setPlatformInput(e.target.value)}
          />
          <button
            type="button"
            className={Styles.addPlatformButton}
            onClick={handleAddPlatform}
          >
            <MdAdd />
          </button>
        </div>
        <br />
        <div>
          {platforms.map((platform, index) => (
            <div key={index} className={Styles.selectedGenre}>
              {platform}
              <button
                type="button"
                onClick={() => handleRemovePlatform(platform)}
              >
                X
              </button>
            </div>
          ))}
        </div>

        <h2>Description</h2>
        <input
          type="text"
          name="description"
          placeholder="Type a description..."
          onChange={handleInputChange}
          autoComplete="off"
        />
        <br />

        <h2>Image</h2>
        <input
          type="text"
          name="image"
          placeholder="Insert URL..."
          onChange={handleInputChange}
          autoComplete="off"
        />
        <p>{errors.image && <span>{errors.image}</span>}</p>

        <h2>Released</h2>
        <input
          className={Styles.dateSelector}
          type="date"
          name="released"
          value={releaseDate}
          onChange={handleReleaseDateChange}
          autoComplete="off"
        />
        <br />

        <h2>Rating</h2>
        <select name="released" value={rating} onChange={handleRatingChange}>
          <option value="">Rate</option>
          <option value="5">5 (Exceptional)</option>
          <option value="4">4 (Recommended)</option>
          <option value="3">3 (Meh)</option>
          <option value="2">2 (Bad)</option>
          <option value="1">1 (Skip)</option>
        </select>
        <br />
        <button className={Styles.createButton}>Create Game</button>
      </form>
    </div>
  );
};

export default Create;
