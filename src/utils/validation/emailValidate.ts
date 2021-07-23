const emailValidate = (email: string) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let test = regex.test(String(email));

  return {
    value: test,
    error: test
      ? ''
      : email.length === 0
      ? 'Campo Obrigatório'
      : 'Insira um e-mail válido',
  };
};

export default emailValidate;
