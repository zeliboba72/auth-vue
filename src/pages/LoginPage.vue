<template>
  <app-form
      title="Аутентификация"
      submit-text="Войти"
      error-text="Неверные данные для входа"
      :has-error="serverError"
      @submit="formSubmit"
  >
    <app-input
        v-model="phone"
        :validate="v$.phone"
    >
      Номер телефона
    </app-input>
    <app-input
        type="password"
        v-model="password"
        :validate="v$.password"
    >
      Пароль
    </app-input>
    <div class="checkbox-wrapper">
      <app-checkbox v-model="remember">Запомнить меня</app-checkbox>
      <app-link to="/forgot-password">Забыли пароль?</app-link>
    </div>
    <template v-slot:footer>
      <span class="text">Еще не имеете аккаунта? </span>
      <app-link to="/register">Зарегистрироваться</app-link>
    </template>
  </app-form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, maxLength, numeric, helpers } from '@vuelidate/validators';
import AppForm from "../components/AppForm";
import AppLink from "../components/AppLink";
import AppInput from "../components/AppInput";
import AppCheckbox from "../components/AppCheckbox";
import { login } from "../custom/methodsApi";
export default {
  name: "LoginPage",
  components: {
    AppForm,
    AppLink,
    AppInput,
    AppCheckbox
  },
  data() {
    return {
      v$: useVuelidate(),
      phone: null,
      password: null,
      remember: false,
      serverError: false,
    }
  },
  validations () {
    return {
      phone: {
        required: helpers.withMessage('Поле обязательно для заполнения', required),
        maxLength: helpers.withMessage('Поле не должно превышать 255 символов', maxLength(255)),
        numeric: helpers.withMessage('Поле должно содержать только цифры', numeric),
      },
      password: {
        required: helpers.withMessage('Поле обязательно для заполнения', required),
        maxLength: helpers.withMessage('Поле не должно превышать 255 символов', maxLength(255)),
      },
    }
  },
  methods: {
    formSubmit() {
      this.v$.$validate();
      if (this.v$.$error) {
        this.serverError = false;
        return;
      }

      login(this.phone, this.password, this.remember)
          .then((result) => {
            if (result) {
              this.$router.push('/');
            } else {
              this.v$.$reset();
              this.serverError = true;
              this.password = "";
            }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>