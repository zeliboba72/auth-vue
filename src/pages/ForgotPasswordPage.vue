<template>
  <div class="forgot-password-page">
    <app-form
        title="Восстановление пароля"
        submit-text="Восстановить пароль"
        @submit="onSubmit"
    >
      <div class="forgot-password-page__header-wrapper">
        <app-input
            v-model="phone"
            :error-message="errorMessagePhone"
            :mask="phoneMask.mask"
            :placeholder="phoneMask.placeholder"
            @blur="v$.phone.$touch"
        >
          Телефон
        </app-input>
        <p class="forgot-password-page__resend-text" v-if="timer">Отправить повторно через {{ timer }} секунд</p>
        <app-button
            :disabled="disabledSendButton"
            @click="send"
        >
          Отправить код
        </app-button>
      </div>
      <app-input
          v-model="code"
          :error-message="errorMessageCode"
          :mask="codeMask.mask"
          :placeholder="codeMask.placeholder"
          @blur="v$.code.$touch"
      >
        Код из СМС
      </app-input>
      <app-input-password
          v-model="password"
          :error-message="errorMessagePassword"
          @blur="v$.password.$touch"
      >
        Новый пароль
      </app-input-password>
      <app-input-password
          v-model="confirmPassword"
          :error-message="errorMessageConfirmPassword"
          @blur="v$.confirmPassword.$touch"
      >
        Новый пароль еще раз
      </app-input-password>
      <template v-slot:footer>
        <div class="forgot-password-page__footer-links-wrapper">
          <app-link
              class="forgot-password-page__footer-link"
              :to="{ name: routes.login }"
          >
            Вспомнил пароль!
          </app-link>
          <app-link
              class="forgot-password-page__footer-link"
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
import AppForm from "../components/AppForm";
import AppInput from "../components/AppInput";
import AppInputPassword from "../components/AppInputPassword";
import AppLink from "../components/AppLink";
import AppButton from "../components/AppButton";
import useVuelidate from '@vuelidate/core';
import { phoneRules, passwordRulesFull, passwordRulesConfirm, codeRules } from "../custom/vuelidate/validationRules";
import validationMessages from "../custom/vuelidate/validationMessages";
import { sendSms, resetPassword } from "../custom/methodsApi";
import { normalizeString } from "../custom/utils";
import { getErrorMessageForField } from "../custom/vuelidate/validationUtils";
import { phoneMask, codeMask } from "../custom/masks";
import { Routes } from "../router/routes";

export default {
  name: 'ForgotPasswordPage',
  components: {
    AppButton,
    AppLink,
    AppInput,
    AppInputPassword,
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
      submitting: false,
      phoneMask: phoneMask,
      codeMask: codeMask,
      routes: Routes,
    }
  },
  validations() {
    return {
      phone: phoneRules,
      code: codeRules,
      password: passwordRulesFull,
      confirmPassword: passwordRulesConfirm(this.password),
    }
  },
  computed: {
    disabledSendButton() {
      return !!this.timer;
    },
    errorMessagePhone() {
      return getErrorMessageForField(this.v$, 'phone') ?? this.serverErrorMessages.phone;
    },
    errorMessageCode() {
      return getErrorMessageForField(this.v$, 'code') ?? this.serverErrorMessages.code;
    },
    errorMessagePassword() {
      return getErrorMessageForField(this.v$, 'password');
    },
    errorMessageConfirmPassword() {
      return getErrorMessageForField(this.v$, 'confirmPassword');
    },
  },
  watch: {
    timer(newValue) {
      if (newValue < 1) {
        this.stopTimer();
      }
    },
    phone(newValue) {
      localStorage.setItem('forgot-password_phone', newValue);
      this.serverErrorMessages.phone = null;
    },
    code() {
      this.serverErrorMessages.code = null;
    },
  },
  created() {
    this.phone = localStorage.getItem('forgot-password_phone');
  },
  methods: {
    async send() {
      if (this.v$.phone.$invalid || this.timer || this.serverErrorMessages.phone || this.submitting) {
        this.v$.phone.$touch();
        return;
      }

      this.submitting = true;
      const result = await sendSms(normalizeString(this.phone));
      this.submitting = false;

      if (result.success) {
        this.startTimer();
        this.sentCode = true;
      } else {
        this.serverErrorMessages.phone = result.message;
      }
    },
    async onSubmit() {
      if (this.submitting) {
        return;
      }

      if (!this.sentCode) {
        this.serverErrorMessages.phone = validationMessages.codeNotSent;
        return;
      }

      this.v$.$validate();
      if (this.v$.$error || this.serverErrorMessages.phone || this.serverErrorMessages.code) {
        return;
      }

      this.submitting = true;
      const result = await resetPassword(normalizeString(this.phone), normalizeString(this.code), this.password);
      this.submitting = false;

      if (result.success) {
        await this.$router.push({ name: this.routes.profile });
      } else {
        this.serverErrorMessages.code = result.message;
      }
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
  &__header-wrapper {
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