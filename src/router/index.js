import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Places from '@/views/Places'
import Login from '@/views/Login'
import Register from '@/views/Register'
import ForgotPassword from '@/views/ForgotPassword'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/places',
    name: 'Places',
    component: Places,
    meta: {
      title: 'Places',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Register,
    meta: {
      title: 'Signup',
    },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password',
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | UkrainianPortal`
  next()
})

export default router
