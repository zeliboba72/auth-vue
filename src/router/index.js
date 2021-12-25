import { createRouter, createWebHistory } from 'vue-router';
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import {isAuthorized} from "../custom/methodsApi";

const routes = [
  {
    path: '/',
    name: 'UserPage',
    component: UserPage,
    beforeEnter: (to, from, next) => {
      if (!isAuthorized()) {
        next('/login');
      } else {
        next();
      }
    }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      if (isAuthorized()) {
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
    beforeEnter: (to, from, next) => {
      if (isAuthorized()) {
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPasswordPage',
    component: ForgotPasswordPage,
    beforeEnter: (to, from, next) => {
      if (isAuthorized()) {
        next('/');
      } else {
        next();
      }
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
