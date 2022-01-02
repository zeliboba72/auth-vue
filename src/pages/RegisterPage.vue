<template>
  <div class="register-page">
    <app-form
        title="Регистрация"
        submit-text="Зарегистрироваться"
        @submit="submitForm"
    >
      <app-input
          v-model="firstName"
          :error-message="errorMessageFirstName"
          @blur="v$.firstName.$touch"
      >
        Имя
      </app-input>
      <app-input
          v-model="lastName"
          :error-message="errorMessageLastName"
          @blur="v$.lastName.$touch"
      >
        Фамилия
      </app-input>
      <app-input
          v-model="phone"
          :error-message="errorMessagePhone"
          :mask="$store.state.phoneMask.mask"
          :placeholder="$store.state.phoneMask.placeholder"
          @blur="v$.phone.$touch"
      >
        Телефон
      </app-input>
      <app-input-password
          v-model="password"
          :error-message="errorMessagePassword"
          @blur="v$.password.$touch"
      >
        Пароль
      </app-input-password>
      <app-input-password
          v-model="confirmPassword"
          :error-message="errorMessageConfirmPassword"
          @blur="v$.confirmPassword.$touch"
      >
        Пароль еще раз
      </app-input-password>
      <template v-slot:footer>
        <app-link :to="{ name: $store.state.routes.login }">Уже зарегистрированы?</app-link>
      </template>
    </app-form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { nameRules, phoneRules, passwordRulesFull, passwordRulesConfirm } from "../custom/vuelidate/validationRules";
import AppForm from "../components/AppForm";
import AppInput from "../components/AppInput";
import AppInputPassword from "../components/AppInputPassword";
import AppLink from "../components/AppLink";
import { registration } from "../custom/methodsApi";
import { normalizeString } from "../custom/utils";
import {getErrorMessageForField} from "../custom/vuelidate/validationUtils";

export default {
  name: 'RegisterPage',
  components: {
    AppForm,
    AppLink,
    AppInput,
    AppInputPassword,
  },
  data() {
    return {
      v$: useVuelidate(),
      firstName: null,
      lastName: null,
      phone: null,
      password: null,
      confirmPassword: null,
      serverErrorMessage: null,
      submitting: false,
    }
  },
  validations () {
    return {
      firstName: nameRules,
      lastName: nameRules,
      phone: phoneRules,
      password: passwordRulesFull,
      confirmPassword: passwordRulesConfirm(this.password),
    }
  },
  computed: {
    errorMessageFirstName() {
      return getErrorMessageForField(this.v$, 'firstName');
    },
    errorMessageLastName() {
      return getErrorMessageForField(this.v$, 'lastName');
    },
    errorMessagePhone() {
      return getErrorMessageForField(this.v$, 'phone') ?? this.serverErrorMessage;
    },
    errorMessagePassword() {
      return getErrorMessageForField(this.v$, 'password');
    },
    errorMessageConfirmPassword() {
      return getErrorMessageForField(this.v$, 'confirmPassword');
    },
  },
  watch: {
    firstName(newValue) {
      localStorage.setItem('register_firstName', newValue);
    },
    lastName(newValue) {
      localStorage.setItem('register_lastName', newValue);
    },
    phone(newValue) {
      this.serverErrorMessage = null;
      localStorage.setItem('register_phone', newValue);
    }
  },
  created() {
    const oldFirstNameInput = localStorage.getItem('register_firstName');
    const oldLastNameInput = localStorage.getItem('register_lastName');
    const oldPhoneInput = localStorage.getItem('register_phone');
    if (oldFirstNameInput) {
      this.firstName = oldFirstNameInput;
    }
    if (oldLastNameInput) {
      this.lastName = oldLastNameInput;
    }
    if (oldPhoneInput) {
      this.phone = oldPhoneInput;
    }
  },
  methods: {
    async submitForm() {
      if (this.serverErrorMessage || this.submitting) {
        return;
      }

      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }

      this.submitting = true;
      const result = await registration(this.firstName, this.lastName, normalizeString(this.phone), this.password);
      this.submitting = false;

      if (result.success) {
        this.$router.push({ name: this.$store.state.routes.profile });
      } else {
        this.serverErrorMessage = result.message;
        this.password = null;
        this.confirmPassword = null;
        this.v$.$reset();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register-page {
  flex-grow: 1;
  margin: 0 auto;
  max-width: 500px;
}
</style>