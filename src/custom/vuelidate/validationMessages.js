export default Object.freeze({
    required: "Поле обязательно для заполнения",
    notSamePasswords: "Пароли не совпадают",
    codeNotSent: "Код подтверждения не отправлен",
    maxLength (max) {
        return `Поле не должно превышать ${max} символов`;
    },
    minLength (min) {
        return `Поле должно состоять не менее, чем из ${min} символов`;
    },
});