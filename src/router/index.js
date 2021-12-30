import { createRouter, createWebHistory } from 'vue-router';
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import {checkAuth} from "../custom/methodsApi";
import { Routes } from "@/router/routes";

const routes = [
  {
    path: '/',
    name: Routes.profile,
    component: UserPage,
    meta: {
      needAuth: true,
    },
  },
  {
    path: '/login',
    name: Routes.login,
    component: LoginPage,
    meta: {
      notForAuth: true,
    },
  },
  {
    path: '/register',
    name: Routes.registration,
    component: RegisterPage,
    meta: {
      notForAuth: true,
    },
  },
  {
    path: '/forgot-password',
    name: Routes.forgotPassword,
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
      next({ name: Routes.login})
    }
  } else if (to.meta.notForAuth) {
    if (!isAuth) {
      next();
    } else {
      next({ name: Routes.profile });
    }
  }
})

export default router
