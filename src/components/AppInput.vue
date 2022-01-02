<template>
  <div class="app-input" :class="{error:hasError}">
    <label class="app-input__label">
      <span class="app-input__label-text"><slot/></span>
      <input class="app-input__control"
             v-if="hasMask"
             type="text"
             v-mask="mask"
             :placeholder="placeholder"
             :value="modelValue"
             @input="$emit('update:modelValue', $event.target.value)"
             @blur="$emit('blur')"
      />
      <input class="app-input__control"
             v-else
             type="text"
             :value="modelValue"
             @input="$emit('update:modelValue', $event.target.value)"
             @blur="$emit('blur')"
      />
    </label>
    <small v-if="hasError" class="app-input__error-text">{{ errorMessage }}</small>
  </div>
</template>

<script>
import {mask} from 'vue-the-mask'
export default {
  name: "AppInput",
  directives: {mask},
  props: {
    modelValue: {
      type: String,
    },
    errorMessage: {
      type: String,
    },
    mask: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
  emits: ['update:modelValue', 'blur'],
  computed: {
    hasMask() {
      return Boolean(this.mask) && Boolean(this.placeholder);
    },
    hasError() {
      return Boolean(this.errorMessage);
    }
  }
}
</script>

<style lang="scss" scoped>
.app-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  @media screen and (max-width: $mobile) {
    margin-bottom: 10px;
  }
  &.error &__control {
    border: 2px solid $danger-color;
  }
  &__label {
    display: flex;
    flex-direction: column;
  }
  &__label-text {
    color: $main-color;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 5px;
    @media screen and (max-width: $mobile) {
      font-size: 15px;
      margin-bottom: 2px;
    }
  }
  &__control {
    font-size: 16px;
    padding: 10px;
    border: 2px solid $main-color;
    &:focus {
      outline-color: $secondary-color;
      outline-style: solid;
      border: 2px solid $secondary-color;
    }
  }
  &__error-text {
    color: $danger-color;
  }
}
</style>