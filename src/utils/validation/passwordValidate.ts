const fieldPass = (password: string, lenght: number) => {
  if (password.length < lenght) {
    return {
      value: false,
      error:
        password.length === 0
          ? 'Campo Obrigatório'
          : 'A senha precisa ter no mínimo 6 caracteres',
    };
  }
  return {value: true, error: ''};
};

const equalsPassword = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) {
    return {
      value: false,
      error: 'Senha Incorreta',
    };
  }
  return {value: true, error: ''};
};

export {equalsPassword, fieldPass};
