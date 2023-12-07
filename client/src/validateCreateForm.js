const nameValidation = (data) => {
  const namePattern = /^[A-Za-z0-9\s]+$/;
  if (data.trim() !== "") {
    if (namePattern.test(data)) {
      return "";
    } else {
      return "The name can only contain letters and numbers";
    }
  } else {
    return "Name cannot be empty";
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
    return "Invalid URL format";
  }
};

const validateCreateForm = (data) => {
  const newErrors = {};

  newErrors.name = nameValidation(data.name);
  newErrors.image = imageValidation(data.image);

  return newErrors;
};

export default validateCreateForm;
