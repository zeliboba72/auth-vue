<template>
  <div class="wrapper" :class="{empty:hasError}">
    <label class="input-label">
      <span class="label-text">{{ label }}:</span>
      <input class="input"
             :type="type"
             :value="modelValue"
             @input="$emit('update:modelValue', $event.target.value)"
      />
    </label>
    <small v-if="hasError" class="error-text">{{ firstErrorMessage }}</small>
  </div>
</template>

<script>
export default {
  name: "AppInput",
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    modelValue: String,
    validate: Object,
  },
  emits: ['update:modelValue'],
  computed: {
    firstErrorMessage() {
      if (!this.validate.$error) {
        return;
      }
      let errorMessages = [];
      for (const error of this.validate.$errors) {
        errorMessages.push(error.$message);
      }
      return errorMessages[0];
    },
    hasError() {
      if (!this.validate) {
        return;
      }
      return this.validate.$error;
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.wrapper.empty {
  & .input {
    border: 2px solid $danger-color;
  }
}
.input-label {
  display: flex;
  flex-direction: column;
}
.label-text {
  color: $main-color;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 5px;
}
.input {
  font-size: 16px;
  padding: 10px;
  border: 2px solid $main-color;
  &:focus {
    outline-color: $secondary-color;
    outline-style: solid;
    border: 2px solid $secondary-color;
  }
}
.error-text {
  color: $danger-color;
}
</style>