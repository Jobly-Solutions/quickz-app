const constraints = {
  email: {
    presence: {
      message: '^Por favor ingresa un correo electrónico',
    },
    email: {
      message: '^Por favor ingresa un correo electrónico valido',
    },
  },

  password: {
    presence: {
      message: '^Por favor ingresa un password',
    },
    length: {
      minimum: 6,
      message: '^Tu password debe tener a lo menos 6 caracteres',
    },
  },
};

export default constraints;
