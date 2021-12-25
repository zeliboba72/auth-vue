<template>
  <button class="button" :type="type" @click="$emit('click')">{{ text }}</button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "button",
    }
  },
  emits: ['click'],
}
</script>

<style lang="scss" scoped>
.button {
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
}
</style>