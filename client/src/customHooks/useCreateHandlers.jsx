import { useState } from "react";
import axios from "axios";
import validateCreateForm from "../validateCreateForm";

const useCreateHandlers = () => {
  const [rating, setRating] = useState("");

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    const newErrors = validateCreateForm({ ...form, [name]: value });
    setErrors({ ...errors, ...newErrors });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (
      !form.name ||
      selectedGenres.genres.length === 0 ||
      platforms.length === 0 ||
      !form.description ||
      !form.image ||
      !releaseDate ||
      !rating
    ) {
      alert("Please complete all fields in this form.");
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

  const [releaseDate, setReleaseDate] = useState("");

  const handleReleaseDateChange = (event) => {
    setReleaseDate(event.target.value);
  };

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

  return {
    rating,
    handleInputChange,
    form,
    handleFormSubmit,
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
    errors,
  };
};

export default useCreateHandlers;
