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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>