<template>
  <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
$main-color: #1f1f1f;
$secondary-color: #fcc23c;
$danger-color: #ff5722;
$light-color: #fff;
$font: 'Roboto', sans-serif;

* {
  margin: 0;
  box-sizing: border-box;
  font-family: $font;
}

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
