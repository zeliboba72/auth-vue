import { createRouter, createWebHistory } from 'vue-router';
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
const routes = [
  {
    path: '/',
    name: 'UserPage',
    component: UserPage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPasswordPage',
    component: ForgotPasswordPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
