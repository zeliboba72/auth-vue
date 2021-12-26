<template>
  <button
      class="app-button"
      :class="{disabled:disabled}"
      :type="type"
      :disabled="disabled"
      @click="$emit('click')"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    type: {
      type: String,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['click'],
}
</script>

<style lang="scss" scoped>
.app-button {
  background-color: $secondary-color;
  color: $main-color;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.1s linear, color 0.1s linear;
  &:hover {
    background-color: $main-color;
    color: $light-color;
  }

  &.disabled {
    pointer-events: none;
    background-color: $main-color;
    color: $light-color;
    opacity: 0.7;
  }
}
</style>