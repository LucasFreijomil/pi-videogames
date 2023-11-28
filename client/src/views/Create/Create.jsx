import Styles from "../Create/Create.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres } from "../../redux/actions";
import { useEffect } from "react";

const Create = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getAllGenres());
  }, []);

  return (
    <div className={Styles.form}>
      <form>
        <h2>Name</h2>
        <input type="text" name="forename" />
        <br />

        <h2>Genres</h2>
        <select name="" id="">
          <option value="">Select</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
        <br />

        <h2>Platforms</h2>
        <input type="text" name="nationality" />
        <br />

        <h2>Description</h2>
        <input type="text" name="description" />
        <br />

        <h2>Image</h2>
        <input type="text" name="image" />
        <br />

        <h2>Release</h2>
        <input type="text" name="dob" />
        <br />

        <h2>Rating</h2>
        <select>
          <option value="">5 (Exceptional)</option>
          <option value="">4 (Recommended)</option>
          <option value="">3 (Meh)</option>
          <option value="">2</option>
          <option value="">1 (Skip)</option>
        </select>
        <br />
        <br />
        <br />
        <button>Create</button>
      </form>
    </div>
  );
};

export default Create;

// Posibilidad de seleccionar/agregar varios géneros en simultáneo.
