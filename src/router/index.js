import Vue from "vue";
import VueRouter from "vue-router";
import StartingPage from '@/views/StartingPage'


Vue.use(VueRouter);

const routes = [
{
  path: '/',
  name: 'StartingPage',
  component: StartingPage
}
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
