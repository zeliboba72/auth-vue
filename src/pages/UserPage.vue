<template>
  <div class="user-page">
    <h1 v-if="username" class="user-page__title">Здравствуйте, {{ this.username }} !</h1>
    <app-button @click="onLogout">Выйти</app-button>
  </div>
</template>

<script>
import AppButton from "../components/AppButton";
import { getUser, logout } from "../custom/methodsApi";

export default {
  name: 'UserPage',
  components: {
    AppButton,
  },
  data() {
    return {
      username: null,
    }
  },
  created() {
    getUser().then((result) => {
      this.username = result.first_name;
    });
  },
  methods: {
    onLogout() {
      logout();
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss" scoped>

.user-page {
  width: 100%;
  max-width: 500px;
  border: 4px solid $secondary-color;
  background-color: $light-color;
  padding: 30px;
  &__title {
    margin-bottom: 20px;
  }
}
</style>