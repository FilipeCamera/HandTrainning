const cnpjValidate = (cnpj: string) => {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj === undefined || cnpj.length === 0) {
    return {
      value: true,
      error: 'Campo Obrigatório',
    };
  }

  if (cnpj.length !== 14) {
    return {
      value: true,
      error: 'CNPJ inválido',
    };
  }

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999'
  ) {
    return {
      value: true,
      error: 'Insira um cnpj válido',
    };
  }
  return {
    value: false,
    error: '',
  };
};

export default cnpjValidate;
