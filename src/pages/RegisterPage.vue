<template>
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
        @blur="v$.phone.$touch"
    >
      Телефон
    </app-input>
    <app-input
        type="password"
        v-model="password"
        :error-message="errorMessagePassword"
        @blur="v$.password.$touch"
    >
      Пароль
    </app-input>
    <app-input
        type="password"
        v-model="confirmPassword"
        :error-message="errorMessageConfirmPassword"
        @blur="v$.confirmPassword.$touch"
    >
      Пароль еще раз
    </app-input>
    <template v-slot:footer>
      <app-link :to="{ name: 'login-page' }">Уже зарегистрированы?</app-link>
    </template>
  </app-form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, maxLength, minLength, numeric, sameAs, helpers } from '@vuelidate/validators';
import AppForm from "../components/AppForm";
import AppInput from "../components/AppInput";
import AppLink from "../components/AppLink";
import { registration } from "../custom/methodsApi";

export default {
  name: 'RegisterPage',
  components: {
    AppForm,
    AppLink,
    AppInput,
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
        maxLength: helpers.withMessage('Поле обязательно для заполнения', maxLength(11)),
        minLength: helpers.withMessage('Поле обязательно для заполнения', minLength(11)),
        numeric: helpers.withMessage('Поле должно содержать только цифры', numeric),
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
  },
  watch: {
    phone() {
      this.serverErrorMessage = null;
    }
  },
  methods: {
    submitForm() {
      if (this.serverErrorMessage) {
        return;
      }

      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }

      registration(this.firstName, this.lastName, this.phone, this.password)
          .then((result) => {
            if (result.success) {
              this.$router.push({ name: 'user-page' });
            } else {
              this.serverErrorMessage = result.message;
              this.password = null;
              this.confirmPassword = null;
              this.v$.$reset();
            }
      });
    }
  }
}
</script>