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
import EditNote from '@/views/EditNote'
import PhotoGallery from '@/views/Gallery'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      requiresAuth: false,
    },
  },

  {
    path: '/places',
    name: 'Places',
    component: Places,
    meta: {
      title: 'Places',
      requiresAuth: false,
    },
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
      requiresAuth: false,
    },
  },

  {
    path: '/signup',
    name: 'Signup',
    component: Register,
    meta: {
      title: 'Signup',
      requiresAuth: false,
    },
  },

  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password',
      requiresAuth: false,
    },
  },

  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Profile',
      requiresAuth: true,
    },
  },

  {
    path: '/create-note',
    name: 'CreateNote',
    component: CreateNote,
    meta: {
      title: 'Create A Note',
      requiresAuth: true,
    },
  },

  {
    path: '/note-preview',
    name: 'NotePreview',
    component: NotePreview,
    meta: {
      title: 'Note Preview',
      requiresAuth: true,
    },
  },

  {
    path: '/view-note/:noteid',
    name: 'ViewNote',
    component: ViewNote,
    meta: {
      title: 'View Note',
      requiresAuth: false,
    },
  },

  {
    path: '/edit-note/:noteid',
    name: 'EditNote',
    component: EditNote,
    meta: {
      title: 'Edit A Note',
      requiresAuth: true,
    },
  },

  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      title: 'Admin',
      requiresAuth: true,
      requiresAdmin: true,
    },
  },

  {
    path: '/photo-gallery',
    name: 'PhotoGallery',
    component: PhotoGallery,
    meta: {
      title: 'Photo Gallery',
      requiresAuth: true,
      requiresAdmin: true,
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

router.beforeEach(async (to, from, next) => {
  let user = firebase.auth().currentUser
  let admin = null
  if (user) {
    let token = await user.getIdTokenResult()
    admin = token.claims.admin
  }
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      if (to.matched.some((res) => res.meta.requiresAdmin)) {
        if (admin) {
          return next()
        }
        return next({ name: 'Home' })
      }
      return next()
    }
    return next({ name: 'Home' })
  }
  return next()
})

export default router
