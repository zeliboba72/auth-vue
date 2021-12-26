<template>
  <form class="app-form" @submit.prevent="$emit('submit')">
    <h2 class="app-form__title">{{ title }}</h2>
    <p v-if="errorText" class="app-form__error">{{ errorText }}</p>
    <slot/>
    <div class="app-form__button-wrapper">
      <app-button
          class="app-form__button"
          type="submit"
      >
        {{ submitText }}
      </app-button>
    </div>
    <div class="app-form__footer">
      <slot name="footer"/>
    </div>
  </form>
</template>

<script>
import AppButton from "./AppButton";
export default {
  name: 'AppForm',
  components: {
    AppButton,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    submitText: {
      type: String,
      required: true,
    },
    errorText: {
      type: String,
    },
  },
  emits: ['submit'],
}
</script>

<style lang="scss" scoped>
.app-form {
  width: 100%;
  max-width: 500px;
  padding: 30px;
  border: 4px solid $secondary-color;
  background-color: $light-color;
  &__title {
    font-size: 28px;
    margin-bottom: 20px;
  }
  &__error {
    color: $danger-color;
    margin-bottom: 20px;
  }
  &__footer {
    margin-top: 20px;
  }
}
</style>