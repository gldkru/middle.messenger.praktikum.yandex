export type ValidatorError = {
  code: string;
  message: string;
};

export type ValidatorTest = (str: string) => boolean;

export const enum Validators {
  REQUIRED = 'required',
  EMAIL = 'email',
  PHONE = 'phone',
  PASSWORD_REPEAT = 'password_repeat',
  ALPHABET = 'alphabet',
}

const ValidatorRules: Record<Validators, ValidatorTest> = {
  alphabet: (value) => (value ? /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/i.test(value) : true),
  required: (value) => !!value,
  email: (value) => (value
    ? /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
      value,
    )
    : true),
  password_repeat: (value) => !!value, // todo
  phone: (value) => !!value,
};

const ValidationErrors: Record<Validators, ValidatorError> = {
  alphabet: {
    code: Validators.ALPHABET,
    message: 'Допустимы только буквы',
  },
  required: {
    code: Validators.REQUIRED,
    message: 'Поле обязательно для заполнения',
  },
  email: {
    code: Validators.EMAIL,
    message: 'E-mail указан с ошибкой',
  },
  password_repeat: {
    code: Validators.PASSWORD_REPEAT,
    message: 'Пароли не совпадают',
  },
  phone: {
    code: Validators.PHONE,
    message: 'Телефон введен не верно',
  },
};

export const validate = (value: string, keys: Validators[]): ValidatorError | undefined => {
  keys.forEach((key) => (!ValidatorRules[key](value) ? ValidationErrors[key] : undefined));
};
