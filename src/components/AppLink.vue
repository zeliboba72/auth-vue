<template>
  <router-link class="link" :to="to">{{ text }}</router-link>
</template>

<script>
export default {
  name: 'AppLink',
  props: {
    to: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: $secondary-color;
  transition: color 0.2s linear;
  font-weight: 700;
  &:hover {
    color: $main-color;
  }
}
</style>