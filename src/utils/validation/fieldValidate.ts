const fieldValidate = (e: string) => {
  if (e.length === 0) {
    return {
      value: true,
      error: 'Campo Obrigatório',
    };
  }
  return {
    value: false,
    error: '',
  };
};

export default fieldValidate;
