const releaseValidation = (data) => {
    const pattern = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
    if (pattern.test(data)) {
      return "";
    } else {
      return "Debe tener el formato (YYYY-MM-DD)";
    }
  };