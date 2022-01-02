<template>
  <div class="user-page">
    <h1 class="user-page__title">Здравствуйте, {{ username }} !</h1>
    <app-button @click="logout">Выйти</app-button>
  </div>
</template>

<script>
import AppButton from "../components/AppButton";
import { logout } from "../custom/methodsApi";
import { Routes } from "../router/routes";

export default {
  name: 'UserPage',
  components: {
    AppButton,
  },
  data() {
    return {
      routes: Routes,
    }
  },
  computed: {
    username() {
      return this.$store.state.username;
    }
  },
  methods: {
    async logout() {
      logout();
      await this.$router.push({ name: this.routes.login });
    }
  }
}
</script>

<style lang="scss" scoped>

.user-page {
  flex-grow: 1;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  border: 4px solid $secondary-color;
  background-color: $light-color;
  padding: 30px;
  &__title {
    margin-bottom: 20px;
  }
}
</style>