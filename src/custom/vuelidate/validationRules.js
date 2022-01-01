import { required, minLength, maxLength, sameAs, helpers } from "@vuelidate/validators";
import validationMessages from "./validationMessages";
import { phoneMask, codeMask } from "../masks";

const MAX_LENGTH = 255;
const MIN_LENGTH_PASSWORD = 8;
const MIN_LENGTH_NAME = 3;
const MIN_LENGTH_PHONE = phoneMask.mask.length;
const MIN_LENGTH_CODE = codeMask.mask.length;

export const passwordRulesDefault = Object.freeze({
    required: helpers.withMessage(validationMessages.required, required),
    maxLength: helpers.withMessage(validationMessages.maxLength(MAX_LENGTH), maxLength(MAX_LENGTH)),
});

export const passwordRulesFull = Object.freeze({
    ...passwordRulesDefault,
    minLength: helpers.withMessage(validationMessages.minLength(MIN_LENGTH_PASSWORD), minLength(MIN_LENGTH_PASSWORD)),
});

export const passwordRulesConfirm = function (password) {
    return Object.freeze({
        ...passwordRulesFull,
        sameAs: helpers.withMessage(validationMessages.notSamePasswords, sameAs(password)),
    });
}

export const nameRules = Object.freeze({
    required: helpers.withMessage(validationMessages.required, required),
    maxLength: helpers.withMessage(validationMessages.maxLength(MAX_LENGTH), maxLength(MAX_LENGTH)),
    minLength: helpers.withMessage(validationMessages.minLength(MIN_LENGTH_NAME), minLength(MIN_LENGTH_NAME)),
});

export const phoneRules = Object.freeze({
    required: helpers.withMessage(validationMessages.required, required),
    minLength: helpers.withMessage(validationMessages.required, minLength(MIN_LENGTH_PHONE)),
});

export const codeRules = Object.freeze({
    required: helpers.withMessage(validationMessages.required, required),
    minLength: helpers.withMessage(validationMessages.required, minLength(MIN_LENGTH_CODE)),
});
