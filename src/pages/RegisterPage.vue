<template>
  <app-form
      title="Регистрация"
      submit-text="Зарегистрироваться"
      error-text="Вы ввели неккоректные данные"
      :has-error="isServerError"
      @submit="submitForm"
  >
    <app-input
        v-model="firstName"
        :validate="v$.firstName"
    >
      Имя
    </app-input>
    <app-input
        v-model="lastName"
        :validate="v$.lastName"
    >
      Фамилия
    </app-input>
    <app-input
        v-model="phone"
        :validate="v$.phone"
    >
      Телефон
    </app-input>
    <app-input
        type="password"
        v-model="password.password"
        :validate="v$.password.password"
    >
      Пароль
    </app-input>
    <app-input
        type="password"
        v-model="password.confirm"
        :validate="v$.password.confirm"
    >
      Пароль еще раз
    </app-input>
    <template v-slot:footer>
      <app-link to="/login">Уже зарегистрированы?</app-link>
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
      password: {
        password: null,
        confirm: null,
      },
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
      this.isServerError = false;
      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }

      registration(this.firstName, this.lastName, this.phone, this.password)
          .then((result) => {
            if (result) {
              this.$router.push('/');
            } else {
              this.v$.$reset();
              this.isServerError = true;
            }
      });
    }
  }
}
</script>