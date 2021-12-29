<template>
  <router-link class="app-link" :to="to"><slot/></router-link>
</template>

<script>
export default {
  name: 'AppLink',
  props: {
    to: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.app-link {
  text-decoration: none;
  color: $secondary-color;
  transition: color 0.2s linear;
  font-weight: 700;
  &:hover {
    color: $main-color;
  }
}
</style>