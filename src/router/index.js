import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Places from '@/views/Places'

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
      title:' Places',
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
