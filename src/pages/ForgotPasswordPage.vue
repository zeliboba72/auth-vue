<template>
  <div class="forgot-password-page">
    <app-form
        title="Восстановление пароля"
        submit-text="Восстановить пароль"
        @submit="onSubmit"
    >
      <div class="forgot-password-page__sms-wrapper">
        <app-input
            v-model="phone"
            :error-message="errorMessagePhone"
            @blur="v$.phone.$touch"
        >
          Телефон
        </app-input>
        <p class="forgot-password-page__resend-text" v-if="timer">Отправить повторно через {{ timer }} секунд</p>
        <app-button
            :disabled="disabledSendButton"
            @click="sendSms"
        >
          Отправить код
        </app-button>
      </div>
      <app-input
          v-model="code"
          :error-message="errorMessageCode"
          @blur="v$.code.$touch"
      >
        Код из СМС
      </app-input>
      <app-input
          type="password"
          v-model="password"
          :error-message="errorMessagePassword"
          @blur="v$.password.$touch"
      >
        Новый пароль
      </app-input>
      <app-input
          type="password"
          v-model="confirmPassword"
          :error-message="errorMessageConfirmPassword"
          @blur="v$.confirmPassword.$touch"
      >
        Новый пароль еще раз
      </app-input>
      <template v-slot:footer>
        <div class="forgot-password-page__footer-links-wrapper">
          <app-link class="forgot-password-page__footer-link" :to="{ name: 'login-page' }">Вспомнил пароль!</app-link>
          <app-link class="forgot-password-page__footer-link" :to="{ name: 'register-page' }">Еще не имеете аккаунта?</app-link>
        </div>
      </template>
    </app-form>
  </div>
</template>
<script>
import AppForm from "../components/AppForm";
import AppInput from "../components/AppInput";
import AppLink from "../components/AppLink";
import AppButton from "../components/AppButton";
import useVuelidate from '@vuelidate/core';
import {required, maxLength, minLength, numeric, helpers, sameAs} from '@vuelidate/validators';
import { sendSms, resetPassword } from "../custom/methodsApi";

export default {
  name: 'ForgotPasswordPage',
  components: {
    AppButton,
    AppLink,
    AppInput,
    AppForm,
  },
  data() {
    return {
      v$: useVuelidate(),
      timer: null,
      timerId: null,
      phone: null,
      code: null,
      password: null,
      confirmPassword: null,
      serverErrorMessages: {
          phone: null,
          code: null,
      },
      sentCode: false,
    }
  },
  validations() {
    return {
      phone: {
        required: helpers.withMessage('Поле обязательно для заполнения', required),
        maxLength: helpers.withMessage('Поле обязательно для заполнения', maxLength(11)),
        minLength: helpers.withMessage('Поле обязательно для заполнения', minLength(11)),
        numeric: helpers.withMessage('Поле должно содержать только цифры', numeric),
      },
      code: {
        required: helpers.withMessage('Поле обязательно для заполнения', required),
        maxLength: helpers.withMessage('Поле обязательно для заполнения', maxLength(4)),
        minLength: helpers.withMessage('Поле обязательно для заполнения', minLength(4)),
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
    disabledSendButton() {
      return !!this.timer;
    },
    errorMessagePhone() {
      if (this.v$.phone.$error) {
        return this.v$.phone.$errors[0].$message;
      } else if (this.serverErrorMessages.phone) {
        return this.serverErrorMessages.phone;
      } else {
        return null;
      }
    },
    errorMessageCode() {
      if (this.v$.code.$error) {
        return this.v$.code.$errors[0].$message;
      } else if (this.serverErrorMessages.code) {
        return this.serverErrorMessages.code;
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
    }
  },
  watch: {
    timer(newValue) {
      if (newValue < 1) {
        this.stopTimer(this.timerId);
        this.timer = null;
        this.timerId = null;
      }
    },
    phone() {
      this.serverErrorMessages.phone = null;
    },
    code() {
      this.serverErrorMessages.code = null;
    },
  },
  methods: {
    sendSms() {
      if (this.v$.phone.$invalid || this.timer || this.serverErrorMessages.phone) {
        this.v$.phone.$touch();
        return;
      }
      sendSms(this.phone).then((result) => {
        if (!result.success) {
          this.serverErrorMessages.phone = result.message;
        } else {
          this.startTimer();
          this.sentCode = true;
        }
      });
    },
    onSubmit() {
      if (!this.sentCode) {
        this.serverErrorMessages.phone = 'Не отправлен код подтверждения'
        return;
      }
      this.v$.$validate();
      if (this.v$.$error || this.serverErrorMessages.phone || this.serverErrorMessages.code) {
        return;
      }
      resetPassword(this.phone, this.code, this.password)
          .then((result) => {
            if (result.success) {
              this.$router.push({ name: 'user-page' });
            } else {
              this.serverErrorMessages.code = result.message;
            }
      })
    },
    startTimer() {
      this.timer = 20;
      this.timerId = setInterval(() => {
        this.timer -= 1;
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timerId);
      this.timer = null;
      this.timerId = null;
    },
  }
}
</script>

<style lang="scss" scoped>
.forgot-password-page {
  flex-grow: 1;
  max-width: 500px;
  margin: 0 auto;
  &__sms-wrapper {
    margin-bottom: 30px;
  }
  &__resend-text {
    color: $main-color;
    font-weight: 700;
    margin-bottom: 10px;
    @media screen and (max-width: $mobile) {
      font-size: 13px;
    }
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