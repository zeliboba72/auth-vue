export const getErrorMessageForField = function (vuelidate, key) {
    if (vuelidate[key]?.$error) {
        return vuelidate[key].$errors[0].$message;
    }
    return null;
}