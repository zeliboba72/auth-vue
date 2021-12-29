<template>
  <div class="app-input" :class="{error:errorMessage}">
    <label class="app-input__label">
      <span class="app-input__label-text"><slot/></span>
      <span class="app-input__control-wrapper">
        <input class="app-input__control"
               :type="inputType"
               :value="modelValue"
               @input="$emit('update:modelValue', $event.target.value)"
               @blur="$emit('blur')"
        />
        <button type="button" class="app-input__toggle-button" @click="toggleInputType">
          <svg-icon class="app-input__icon" :class="{active:isHide}" name="icon-pass-hide"/>
          <svg-icon class="app-input__icon" :class="{active:!isHide}" name="icon-pass-show"/>
        </button>
      </span>
    </label>
    <small v-if="errorMessage" class="app-input__error-text">{{ errorMessage }}</small>
  </div>
</template>

<script>
import SvgIcon from "./SvgIcon";
export default {
  name: "AppInput",
  components: {SvgIcon},
  props: {
    modelValue: {
      type: String,
    },
    errorMessage: {
      type: String,
    }
  },
  emits: ['update:modelValue', 'blur'],
  data() {
    return {
      inputType: "password",
    }
  },
  computed: {
    isHide() {
      return this.inputType === "password";
    }
  },
  methods: {
    toggleInputType() {
      if (this.inputType === "password") {
        this.inputType = "text";
      } else {
        this.inputType = "password";
      }
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
  &__control-wrapper {
    position: relative;
  }
  &__toggle-button {
    border: none;
    padding: 0;
    background-color: inherit;
    top:50%;
    right: 10px;
    transform:translate(0, -50%);
    position: absolute;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__icon {
    display: none;
    &.active {
      display: inline;
    }
  }
  &__control {
    width: 100%;
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