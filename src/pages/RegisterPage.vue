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
      <app-input-mask
          v-model="phone"
          :error-message="errorMessagePhone"
          mask="+7 (###) ###-##-##"
          placeholder="+7 (___) ___-__-__"
          @blur="v$.phone.$touch"
      >
        Телефон
      </app-input-mask>
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
        <app-link :to="{ name: 'login-page' }">Уже зарегистрированы?</app-link>
      </template>
    </app-form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, maxLength, minLength, sameAs, helpers } from '@vuelidate/validators';
import AppForm from "../components/AppForm";
import AppInput from "../components/AppInput";
import AppInputMask from "../components/AppInputMask";
import AppInputPassword from "../components/AppInputPassword";
import AppLink from "../components/AppLink";
import { registration } from "../custom/methodsApi";

export default {
  name: 'RegisterPage',
  components: {
    AppForm,
    AppLink,
    AppInput,
    AppInputMask,
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
      firstName: {
        required: helpers.withMessage('Поле обязательно для заполнения', required),
        maxLength: helpers.withMessage('Поле не должно превышать 255 символов', maxLength(255)),
        minLength: helpers.withMessage('Не менее 3 символов', minLength(3)),
      },
      lastName: {
        required: helpers.withMessage('Поле обязательно для заполнения', required),
        maxLength: helpers.withMessage('Поле не должно превышать 255 символов', maxLength(255)),
        minLength: helpers.withMessage('Не менее 3 символов', minLength(3)),
      },
      phone: {
        required: helpers.withMessage('Поле обязательно для заполнения', required),
        minLength: helpers.withMessage('Поле обязательно для заполнения', minLength(18)),
      },
      password: {
        required: helpers.withMessage('Поле обязательно для заполнения', required),
        maxLength: helpers.withMessage('Поле не должно превышать 255 символов', maxLength(255)),
        minLength: helpers.withMessage('Пароль должен состоять не менее чем из 8 символов', minLength(8)),
        sameAs: helpers.withMessage('Пароли не совпадают', sameAs(this.confirmPassword)),
      },
      confirmPassword: {
        required: helpers.withMessage('Поле обязательно для заполнения', required),
        sameAs: helpers.withMessage('Пароли не совпадают', sameAs(this.password)),
      },
    }
  },
  computed: {
    errorMessageFirstName() {
      if (this.v$.firstName.$error) {
        return this.v$.firstName.$errors[0].$message;
      } else {
        return null;
      }
    },
    errorMessageLastName() {
      if (this.v$.lastName.$error) {
        return this.v$.lastName.$errors[0].$message;
      } else {
        return null;
      }
    },
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
      } else {
        return null;
      }
    },
    errorMessageConfirmPassword() {
      if (this.v$.confirmPassword.$error) {
        return this.v$.confirmPassword.$errors[0].$message;
      } else {
        return null;
      }
    },
    normalizePhone() {
      if (this.phone) {
        return this.phone.replace(/[^\d]/g, '');
      }
      return null;
    }
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
      const result = await registration(this.firstName, this.lastName, this.normalizePhone, this.password);
      this.submitting = false;

      if (result.success) {
        this.$router.push({ name: 'user-page' });
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