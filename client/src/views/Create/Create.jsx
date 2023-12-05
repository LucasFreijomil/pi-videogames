import Styles from "../Create/Create.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres } from "../../redux/actions";
import { useEffect, useState } from "react";
import axios from "axios";

const Create = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) =>
    state.genres.sort((a, b) => a.name.localeCompare(b.name))
  );
 //IMPORTAR: rating, handleInputChange, form, selectedGenres, handleGenreSelect, handleRemoveGenre, releaseDate, handleReleaseDateChange
 //platformInput, platforms, handleAddPlatform, handleRemovePlatform
  useEffect(() => {
    dispatch(getAllGenres());
  }, []);
  //RATING HANDLER
  const [rating, setRating] = useState("");
  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };
 //FORM HANDLER
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };
  //GENRE HANDLER
  const [selectedGenres, setSelectedGenres] = useState({
    genres: [],
  });
  const handleGenreSelect = (event) => {
    const selectedGenre = event.target.value;
    if (selectedGenre && !selectedGenres.genres.includes(selectedGenre)) {
      setSelectedGenres({
        genres: [...selectedGenres.genres, selectedGenre],
      });
    }
  };
  const handleRemoveGenre = (genreToRemove) => {
    const updatedGenres = selectedGenres.genres.filter(
      (genre) => genre !== genreToRemove
    );
    setSelectedGenres({
      genres: updatedGenres,
    });
  };
  //RELEASED HANDLER
  const [releaseDate, setReleaseDate] = useState("");
  const handleReleaseDateChange = (event) => {
    setReleaseDate(event.target.value);
  };
  //PLATFORM HANDLER
  const [platformInput, setPlatformInput] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const handleAddPlatform = () => {
    if (platformInput.trim() !== "" && !platforms.includes(platformInput)) {
      setPlatforms([...platforms, platformInput]);
      setPlatformInput("");
    }
  };
  const handleRemovePlatform = (platformToRemove) => {
    const updatedPlatforms = platforms.filter(
      (platform) => platform !== platformToRemove
    );
    setPlatforms(updatedPlatforms);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Estado actual del formulario:", form);
    if (
      !form.name ||
      selectedGenres.genres.length === 0 ||
      platforms.length === 0 ||
      !form.description ||
      !form.image ||
      !releaseDate ||
      !rating
    ) {
      alert("Por favor, completa todos los campos del formulario");
      return;
    } else {
      const completeForm = {
        name: form.name,
        image: form.image,
        description: form.description,
        platforms: platforms,
        released: releaseDate,
        rating: rating,
        genres: selectedGenres.genres,
      };
      try {
        const { data } = await axios.post(
          "http://localhost:3001/create",
          completeForm
        );
        alert("New game created!", data);
        return;
      } catch (error) {
        console.error("Error creating new game: ", error);
      }
    }
  };

  return (
    <div className={Styles.form}>
      <form onSubmit={handleFormSubmit}>
        <h2>Name</h2>
        <input type="text" name="name" onChange={handleInputChange} />
        <br />

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
            value={platformInput}
            onChange={(e) => setPlatformInput(e.target.value)}
          />
          <br />
          <br />
          <button type="button" onClick={handleAddPlatform}>
            Add Platform
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
        <br />

        <h2>Description</h2>
        <input type="text" name="description" onChange={handleInputChange} />
        <br />

        <h2>Image</h2>
        <input type="text" name="image" onChange={handleInputChange} />
        <br />

        <h2>Released</h2>
        <input
          className={Styles.dateSelector}
          type="date"
          name="released"
          value={releaseDate}
          onChange={handleReleaseDateChange}
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
        <br />
        <br />
        <button className={Styles.createButton}>Create</button>
      </form>
    </div>
  );
};

export default Create;