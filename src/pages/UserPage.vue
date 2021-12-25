<template>
  <app-wrapper>
    <div class="profile">
      <h1 v-if="username" class="title">Здравствуйте, {{ this.username }} !</h1>
      <app-button text="Выйти" @click="onLogout"/>
    </div>
  </app-wrapper>
</template>

<script>
import AppWrapper from "../components/AppWrapper";
import AppButton from "../components/AppButton";
import { getUser, logout } from "../custom/methodsApi";

export default {
  name: 'UserPage',
  components: {
    AppButton,
    AppWrapper,
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

.profile {
  width: 100%;
  max-width: 500px;
  border: 4px solid $secondary-color;
  background-color: $light-color;
  padding: 30px;
}

.title {
  margin-bottom: 20px;
}
</style>