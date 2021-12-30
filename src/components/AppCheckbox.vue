<template>
  <div class="app-checkbox">
    <label class="app-checkbox__label">
      <input
          class="app-checkbox__control"
          type="checkbox"
          :checked="modelValue"
          @change="$emit('update:modelValue', $event.target.checked)"
      >
      <span class="app-checkbox__label-text"><slot/></span>
    </label>
  </div>
</template>

<script>
export default {
  name: "AppCheckbox",
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
  &__label-text {
    font-weight: 700;
    color: $main-color;
  }
  &__control {
    margin-right: 5px;
  }
}
</style>