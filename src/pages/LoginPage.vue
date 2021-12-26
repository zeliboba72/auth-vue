<template>
  <app-form
      title="Аутентификация"
      submit-text="Войти"
      @submit="formSubmit"
  >
    <app-input
        v-model="phone"
        :error-message="errorMessagePhone"
        @blur="v$.phone.$touch"
    >
      Номер телефона
    </app-input>
    <app-input
        type="password"
        v-model="password"
        :error-message="errorMessagePassword"
        @blur="v$.password.$touch"
    >
      Пароль
    </app-input>
    <div class="checkbox-wrapper">
      <app-checkbox v-model="remember">Запомнить меня</app-checkbox>
      <app-link :to="{ name: 'forgot-password-page' }">Забыли пароль?</app-link>
    </div>
    <template v-slot:footer>
      <span class="text">Еще не имеете аккаунта? </span>
      <app-link :to="{ name: 'register-page' }">Зарегистрироваться</app-link>
    </template>
  </app-form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import {required, maxLength, minLength, numeric, helpers} from '@vuelidate/validators';
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
      serverErrorMessage: null,
    }
  },
  validations () {
    return {
      phone: {
        required: helpers.withMessage('Поле обязательно для заполнения', required),
        maxLength: helpers.withMessage('Поле обязательно для заполнения', maxLength(11)),
        minLength: helpers.withMessage('Поле обязательно для заполнения', minLength(11)),
        numeric: helpers.withMessage('Поле должно содержать только цифры', numeric),
      },
      password: {
        required: helpers.withMessage('Поле обязательно для заполнения', required),
        maxLength: helpers.withMessage('Поле не должно превышать 255 символов', maxLength(255)),
      },
    }
  },
  computed: {
    errorMessagePhone() {
      if (this.v$.phone.$error) {
        return this.v$.phone.$errors[0].$message;
      } else if (this.serverErrorMessage) {
        return this.serverErrorMessage;
      } else {
        return null;
      }
    },
    errorMessagePassword() {
      if (this.v$.password.$error) {
        return this.v$.password.$errors[0].$message;
      } else if (this.serverErrorMessage) {
        return this.serverErrorMessage;
      } else {
        return null;
      }
    }
  },
  watch: {
    password(newValue) {
      if (newValue) {
        this.serverErrorMessage = null;
      }
    }
  },
  methods: {
    formSubmit() {
      if (this.serverErrorMessage) {
        return;
      }

      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }

      login(this.phone, this.password, this.remember)
          .then((result) => {
            if (result.success) {
              this.$router.push({ name: 'user-page' });
            } else {
              this.v$.$reset();
              this.password = null;
              this.serverErrorMessage = result.message;
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