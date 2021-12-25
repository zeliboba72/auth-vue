<template>
  <div class="wrapper">
    <label class="checkbox-label">
      <input class="checkbox" type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)">
      <span class="label-text">{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "AppCheckbox",
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue']
}
</script>

<style lang="scss" scoped>
.label-text {
  font-weight: 700;
  color: $main-color;
}
.checkbox {
  margin-right: 5px;
}
</style>