const nameValidation = (data) => {
  const namePattern = /^[A-Za-z0-9\s]+$/;
  if (data.trim() !== "") {
    if (namePattern.test(data)) {
      return "";
    } else {
      return "El nombre solo puede contener letras y números";
    }
  } else {
    return "El nombre no puede estar vacío";
  }
};

const imageValidation = (url) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  if (url.trim() !== "" && pattern.test(url)) {
    return "";
  } else {
    return "La URL de la imagen no es válida";
  }
};

const validateCreateForm = (data) => {
  const newErrors = {};

  newErrors.name = nameValidation(data.name);
  newErrors.image = imageValidation(data.image);

  return newErrors;
};

export default validateCreateForm;
