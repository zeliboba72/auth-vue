<template>
  <div class="app-checkbox">
    <label class="app-checkbox__label">
      <input
          class="app-checkbox__control"
          type="checkbox"
          :checked="modelValue"
          @change="$emit('update:modelValue', $event.target.checked)"
      >
      <span class="app-checkbox__box">
        <svg-icon class="app-checkbox__icon" name="check"/>
      </span>
      <span class="app-checkbox__label-text"><slot/></span>
    </label>
  </div>
</template>

<script>
import SvgIcon from "./SvgIcon";
export default {
  name: "AppCheckbox",
  components: {
    SvgIcon,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue']
}
</script>

<style lang="scss" scoped>
.app-checkbox {
  padding-left: 20px;
  &__label-text {
    font-weight: 700;
    color: $main-color;
  }
  &__control {
    position: absolute;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  &__control:checked + &__box &__icon {
    opacity: 1;
  }
  &__control:focus + &__box {
    box-shadow: 0 0 0 2px $secondary-color;
  }
  &__box {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    margin-top: 1px;
    margin-left: -20px;
    padding: 1px;
    border: 2px solid $main-color;
    border-radius: 2px;
    background-color: $light-color;
    cursor: pointer;
  }
  &__icon {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
}
</style>