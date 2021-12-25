<template>
  <form class="form" @submit.prevent="$emit('submit')">
    <h1 class="title">{{ title }}</h1>
    <p class="error" v-if="hasError">{{ errorText }}</p>
    <slot/>
    <div>
      <app-button :text="submitText" type="submit"/>
    </div>
    <div class="footer">
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
    hasError: {
      type: Boolean,
    },
  },
  emits: ['submit'],
}
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  max-width: 500px;
  padding: 30px;
  border: 4px solid $secondary-color;
  background-color: $light-color;
}

.title {
  margin-bottom: 20px;
}

.error {
  color: $danger-color;
  margin-bottom: 20px;
}

.footer {
  margin-top: 20px;
}
</style>