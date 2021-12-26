<template>
  <div class="app-wrapper">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "AppWrapper"
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  align-items: center;
  min-height: 100vh;
  padding: 5px;
}
</style>