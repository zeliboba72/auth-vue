<template>
  <app-wrapper>
    <div class="profile">
      <h1 v-if="username" class="title">Здравствуйте, {{ this.username }} !</h1>
      <app-button text="Выйти" @click="logout"/>
    </div>
  </app-wrapper>
</template>

<script>
import AppWrapper from "../components/AppWrapper";
import AppButton from "../components/AppButton";
import axios from "axios";
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
    const token = localStorage.getItem('token');

    axios({
      method: 'get',
      url: 'https://backend-front-test.dev.echo-company.ru/api/user',
      headers: {
        'Authorization': token,
      },
    }).then((response) => {
      this.username = response.data.first_name;
    });
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
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