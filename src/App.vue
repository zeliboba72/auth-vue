<template>
  <app-wrapper>
    <router-view/>
  </app-wrapper>
</template>

<script>
import AppWrapper from "./components/AppWrapper";

export default {
  name: 'App',
  components: {
    AppWrapper,
  },
}
</script>

<style lang="scss">
h1,h2,h3,h4,h5 {
  color: $main-color;
}

body {
  height: 100vh;
  background-color: $main-color;
}

#app {
  height: 100%;
}
</style>
