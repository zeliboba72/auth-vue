<template>
  <app-wrapper>
    <app-form
        title="Аутентификация"
        submit-text="Войти"
        @submit="formSubmit"
        error-text="Неверные данные для входа"
        :has-error="serverError"
    >
      <app-input
          label="Номер телефона"
          v-model="phone"
          :validate="v$.phone"
      />
      <app-input
          label="Пароль"
          type="password"
          v-model="password"
          :validate="v$.password"
      />
      <div class="checkbox-wrapper">
        <app-checkbox label="Запомнить меня" v-model="remember"/>
        <app-link text="Забыли пароль?" to="/forgot-password"/>
      </div>
      <template v-slot:footer>
        <span class="text">Еще не имеете аккаунта? </span>
        <app-link text="Зарегестрироваться" to="/register"/>
      </template>
    </app-form>
  </app-wrapper>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, maxLength, numeric, helpers } from '@vuelidate/validators';
import AppWrapper from "../components/AppWrapper";
import AppForm from "../components/AppForm";
import AppLink from "../components/AppLink";
import AppInput from "../components/AppInput";
import AppCheckbox from "../components/AppCheckbox";
import { login } from "../custom/methodsApi";
export default {
  name: "LoginPage",
  components: {
    AppWrapper,
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