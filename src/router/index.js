import { createRouter, createWebHistory } from 'vue-router';
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import {checkAuth} from "../custom/methodsApi";

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

router.beforeEach(async (to, from, next) => {
  const isAuth = await checkAuth();
  if (to.meta.needAuth) {
    if (isAuth) {
      next();
    } else {
      next({ name: "login-page"})
    }
  } else if (to.meta.notForAuth) {
    if (!isAuth) {
      next();
    } else {
      next({ name: "user-page" });
    }
  }
})

export default router
