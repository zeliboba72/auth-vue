<template>
  <app-wrapper>
    <app-form
        title="Регистрация"
        submit-text="Зарегистрироваться"
        @submit="submitForm"
        error-text="Вы ввели неккоректные данные"
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
import { registration } from "../custom/methodsApi";

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