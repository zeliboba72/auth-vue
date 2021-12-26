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
body {
  background-color: $main-color;
}
h1,h2 {
  color: $main-color;
  font-size: 30px;
  text-align: center;
  @media screen and (max-width: $mobile) {
    font-size: 24px;
  }
}

</style>
