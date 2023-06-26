export const validateRequiredField = (value, label = 'Field') => {
    let error;
    if (!value) {
      error = `The ${label} is required.`;
    }
    return error;
  };
  
  export const validateEmail = (value, label = 'Email') => {
    let error;
    if (value && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      error = `The ${label} is invalid.`;
    }
    return error;
  };