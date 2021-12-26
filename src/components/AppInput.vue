<template>
  <div class="app-input" :class="{error:errorMessage}">
    <label class="app-input__label">
      <span class="app-input__label-text"><slot/>:</span>
      <input class="app-input__control"
             :type="type"
             :value="modelValue"
             @input="$emit('update:modelValue', $event.target.value)"
             @blur="$emit('blur')"
      />
    </label>
    <small v-if="errorMessage" class="app-input__error-text">{{ errorMessage }}</small>
  </div>
</template>

<script>
export default {
  name: "AppInput",
  props: {
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: String,
    },
    errorMessage: {
      type: String,
    }
  },
  emits: ['update:modelValue', 'blur'],
}
</script>

<style lang="scss" scoped>
.app-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
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