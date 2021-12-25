<template>
  <app-wrapper>
    <app-form
        title="Регистрация"
        submit-text="Зарегистрироваться"
        @submit="submitForm"
        :error-text="serverErrorMessage"
        :has-error="isServerError"
    >
      <app-input
          label="Имя"
          v-model="firstName"
          :validate="v$.firstName"
      />
      <app-input
          label="Фамилия"
          v-model="lastName"
          :validate="v$.lastName"
      />
      <app-input
          label="Телефон"
          v-model="phone"
          :validate="v$.phone"
      />
      <app-input
          label="Пароль"
          type="password"
          v-model="password.password"
          :validate="v$.password.password"
      />
      <app-input
          label="Пароль еще раз"
          type="password"
          v-model="password.confirm"
          :validate="v$.password.confirm"
      />
      <template v-slot:footer>
        <app-link text="Аутентификация" to="/login"/>
      </template>
    </app-form>
  </app-wrapper>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, maxLength, minLength, numeric, sameAs, helpers } from '@vuelidate/validators';
import AppWrapper from "../components/AppWrapper";
import AppForm from "../components/AppForm";
import AppInput from "../components/AppInput";
import AppLink from "../components/AppLink";
import axios from "axios";
export default {
  name: 'RegisterPage',
  components: {
    AppForm,
    AppWrapper,
    AppLink,
    AppInput,
  },
  data() {
    return {
      v$: useVuelidate(),
      firstName: null,
      lastName: null,
      phone: null,
      password: {
        password: null,
        confirm: null,
      },
      serverErrorMessage: null,
      isServerError: false,
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
        maxLength: helpers.withMessage('Поле не должно превышать 255 символов', maxLength(255)),
        numeric: helpers.withMessage('Поле должно содержать только цифры', numeric),
      },
      password: {
        password: {
          required: helpers.withMessage('Поле обязательно для заполнения', required),
          maxLength: helpers.withMessage('Поле не должно превышать 255 символов', maxLength(255)),
          minLength: helpers.withMessage('Пароль должен состоять не менее чем из 8 символов', minLength(8)),
          sameAs: helpers.withMessage('Пароли не совпадают', sameAs(this.password.confirm)),
        },
        confirm: {
          required: helpers.withMessage('Поле обязательно для заполнения', required),
          sameAs: helpers.withMessage('Пароли не совпадают', sameAs(this.password.password)),
        }
      },
    }
  },
  methods: {
    submitForm() {
      if (this.isServerError) {
        this.isServerError = false;
        this.serverErrorMessage = null;
      }
      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }
      this.v$.$reset();
      axios({
        method: 'post',
        url: 'https://backend-front-test.dev.echo-company.ru/api/user/registration',
        data: {
          phone: this.phone,
          first_name: this.firstName,
          last_name: this.lastName,
          password: this.password.password,
        }
      }).then((response) => {
        localStorage.setItem('token', response.data.token);
        this.$router.push('/');
      }).catch((error) => {
        this.isServerError = true;
        this.serverErrorMessage = error.response.data.message;
      });
    }
  }
}
</script>