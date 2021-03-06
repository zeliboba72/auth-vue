<template>
  <div class="login-page">
    <app-form
        title="Аутентификация"
        submit-text="Войти"
        @submit="onSubmit"
    >
      <app-input
          v-model="phone"
          :error-message="errorMessagePhone"
          :mask="phoneMask.mask"
          :placeholder="phoneMask.placeholder"
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
          <app-link
              class="login-page__footer-link"
              :to="{ name: routes.forgotPassword }"
          >
            Забыли пароль?
          </app-link>
          <app-link
              class="login-page__footer-link"
              :to="{ name: routes.registration }"
          >
            Еще не имеете аккаунта?
          </app-link>
        </div>
      </template>
    </app-form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { phoneRules, passwordRulesDefault } from "../custom/vuelidate/validationRules";
import AppForm from "../components/AppForm";
import AppLink from "../components/AppLink";
import AppInput from "../components/AppInput";
import AppInputPassword from "../components/AppInputPassword";
import AppCheckbox from "../components/AppCheckbox";
import { login } from "../custom/methodsApi";
import { normalizeString } from "../custom/utils";
import { getErrorMessageForField } from "../custom/vuelidate/validationUtils";
import { phoneMask } from "../custom/masks";
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
      phoneMask: phoneMask,
      routes: Routes,
    }
  },
  validations () {
    return {
      phone: phoneRules,
      password: passwordRulesDefault,
    }
  },
  computed: {
    errorMessagePhone() {
      return getErrorMessageForField(this.v$, 'phone') ?? this.serverErrorMessage;
    },
    errorMessagePassword() {
      return getErrorMessageForField(this.v$, 'password') ?? this.serverErrorMessage;
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
    },
    remember(newValue) {
      if (newValue) {
        localStorage.setItem('login_remember', 'Y');
      } else {
        localStorage.setItem('login_remember', '');
      }
    }
  },
  created() {
    this.phone = localStorage.getItem('login_phone');
    this.remember = Boolean(localStorage.getItem('login_remember'));
  },
  methods: {
    async onSubmit() {
      if (this.serverErrorMessage || this.submitting) {
        return;
      }

      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }

      this.submitting = true;
      const result = await login(normalizeString(this.phone), this.password, this.remember);
      this.submitting = false;

      if (result.success) {
        await this.$router.push({ name: this.routes.profile });
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