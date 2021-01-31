export const validate = (value, keys) => {
    for (const key of keys) {
        switch (key) {
            case "alphabet" /* ALPHABET */:
                if (!value)
                    break;
                const alp_test = /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/i.test(value);
                if (!alp_test) {
                    return {
                        code: "alphabet" /* ALPHABET */,
                        message: "Допустимы только буквы"
                    };
                }
                break;
            case "email" /* EMAIL */:
                if (!value)
                    break;
                const email_test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value);
                if (!email_test) {
                    return {
                        code: "email" /* EMAIL */,
                        message: "E-mail указан с ошибкой"
                    };
                }
                break;
            case "required" /* REQUIRED */:
                if (!value)
                    return {
                        code: "required" /* REQUIRED */,
                        message: "Поле обязательно для заполнения"
                    };
                break;
            case "phone" /* PHONE */:
                // todo
                break;
            case "password_repeat" /* PASSWORD_REPEAT */:
                // todo
                break;
        }
    }
    return;
};
//# sourceMappingURL=validators.js.map