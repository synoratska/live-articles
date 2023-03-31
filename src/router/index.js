import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Places from '@/views/Places'
import Login from '@/views/Login'
import Register from '@/views/Register'
import ForgotPassword from '@/views/ForgotPassword'
import Profile from '@/views/Profile'
import Admin from '@/views/Admin'
import CreateNote from '@/views/CreateNote'
import NotePreview from '@/views/NotePreview'
import ViewNote from '@/views/ViewNote'

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

  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Profile',
    },
  },

  {
    path: '/create-note',
    name: 'CreateNote',
    component: CreateNote,
    meta: {
      title: 'Create A Note',
    },
  },

  {
    path: '/note-preview',
    name: 'NotePreview',
    component: NotePreview,
    meta: {
      title: 'Note Preview',
    },
  },

  {
    path: '/view-note',
    name: 'ViewNote',
    component: ViewNote,
    meta: {
      title: 'View Note',
    },
  },

  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      title: 'Admin',
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
