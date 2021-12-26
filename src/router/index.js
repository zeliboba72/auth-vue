import { createRouter, createWebHistory } from 'vue-router';
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import { getUser } from "../custom/methodsApi";

const routes = [
  {
    path: '/',
    name: 'user-page',
    component: UserPage,
    meta: {
      needAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login-page',
    component: LoginPage,
    meta: {
      notForAuth: true,
    },
  },
  {
    path: '/register',
    name: 'register-page',
    component: RegisterPage,
    meta: {
      notForAuth: true,
    },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password-page',
    component: ForgotPasswordPage,
    meta: {
      notForAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  getUser(true).then((result) => {
    if (to.meta.needAuth && !result) {
      return next({ name: 'login-page' });
    } else if (to.meta.notForAuth && result) {
      return next({ name: 'user-page' });
    } else {
      return next();
    }
  });
})

export default router
