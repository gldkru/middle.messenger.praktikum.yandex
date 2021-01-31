export type ValidatorError = {
  code: string;
  message: string;
};

export const enum validators {
  REQUIRED = "required",
  EMAIL = "email",
  PHONE = "phone",
  PASSWORD_REPEAT = "password_repeat",
  ALPHABET = "alphabet"
}

export const validate = (value: string, keys: validators[]): ValidatorError | undefined => {
  for (const key of keys) {
    switch (key) {
      case validators.ALPHABET:
        if (!value) break;
        const alp_test = /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/i.test(value);
        if (!alp_test) {
          return {
            code: validators.ALPHABET,
            message: "Допустимы только буквы"
          };
        }
        break;
      case validators.EMAIL:
        if (!value) break;
        const email_test: boolean = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
          value
        );
        if (!email_test) {
          return {
            code: validators.EMAIL,
            message: "E-mail указан с ошибкой"
          };
        }
        break;
      case validators.REQUIRED:
        if (!value)
          return {
            code: validators.REQUIRED,
            message: "Поле обязательно для заполнения"
          };
        break;
      case validators.PHONE:
        // todo
        break;
      case validators.PASSWORD_REPEAT:
        // todo
        break;
    }
  }
  return;
};
