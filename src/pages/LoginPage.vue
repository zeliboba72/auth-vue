<template>
  <div class="login-page">
    <app-form
        title="Аутентификация"
        submit-text="Войти"
        @submit="formSubmit"
    >
      <app-input
          v-model="phone"
          :error-message="errorMessagePhone"
          mask="+7 (###) ###-##-##"
          placeholder="+7 (___) ___-__-__"
          @blur="v$.phone.$touch"
      >
        Номер телефона
      </app-input>
      <app-input-password
          v-model="password"
          :error-message="errorMessagePassword"
          @blur="v$.password.$touch"
      >
        Пароль
      </app-input-password>
      <app-checkbox class="login-page__checkbox" v-model="remember">Запомнить меня</app-checkbox>
      <template v-slot:footer>
        <div class="login-page__footer-links-wrapper">
          <app-link class="login-page__footer-link" :to="{ name: forgotPasswordUrlName }">Забыли пароль?</app-link>
          <app-link class="login-page__footer-link" :to="{ name: registrationUrlName }">Еще не имеете аккаунта?</app-link>
        </div>
      </template>
    </app-form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import {required, minLength, maxLength, helpers} from '@vuelidate/validators';
import AppForm from "../components/AppForm";
import AppLink from "../components/AppLink";
import AppInput from "../components/AppInput";
import AppInputPassword from "../components/AppInputPassword";
import AppCheckbox from "../components/AppCheckbox";
import { login } from "../custom/methodsApi";
import { Routes } from "../router/routes";
export default {
  name: "LoginPage",
  components: {
    AppForm,
    AppLink,
    AppInput,
    AppInputPassword,
    AppCheckbox
  },
  data() {
    return {
      v$: useVuelidate(),
      phone: null,
      password: null,
      remember: false,
      serverErrorMessage: null,
      submitting: false,
    }
  },
  validations () {
    return {
      phone: {
        required: helpers.withMessage('Поле обязательно для заполнения', required),
        minLength: helpers.withMessage('Поле обязательно для заполнения', minLength(18)),
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
    },
    normalizePhone() {
      if (this.phone) {
        return this.phone.replace(/[^\d]/g, '');
      }
      return null;
    },
    registrationUrlName() {
      return Routes.registration;
    },
    forgotPasswordUrlName() {
      return Routes.forgotPassword;
    },
  },
  watch: {
    password(newValue) {
      if (newValue) {
        this.serverErrorMessage = null;
      }
    },
    phone(newValue) {
      localStorage.setItem('login_phone', newValue);
    }
  },
  created() {
    const oldPhoneInput = localStorage.getItem('login_phone');
    if (oldPhoneInput) {
      this.phone = oldPhoneInput;
    }
  },
  methods: {
    async formSubmit() {
      if (this.serverErrorMessage || this.submitting) {
        return;
      }

      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }

      this.submitting = true;
      const result = await login(this.normalizePhone, this.password, this.remember);
      this.submitting = false;

      if (result.success) {
        this.$router.push({ name: Routes.profile });
      } else {
        this.v$.$reset();
        this.password = null;
        this.serverErrorMessage = result.message;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  flex-grow: 1;
  max-width: 500px;
  margin: 0 auto;
  &__checkbox {
    margin: 20px 0;

  }
  &__footer-links-wrapper {
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: $mobile) {
      flex-direction: column;
    }
  }
  &__footer-link {
    @media screen and (max-width: $mobile) {
      margin: 5px 0;
    }
  }
}
</style>