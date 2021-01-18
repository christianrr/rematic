import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import { store } from '@/store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Dashboard
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue')
  },
  {
    path: '/rooms',
    name: 'rooms',
    component: () => import(/* webpackChunkName: "rooms" */ '../views/Rooms.vue')
  },
  {
    path: '/rooms/:title',
    name: 'room',
    component: () => import(/* webpackChunkName: "room" */ '../views/Room.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import(/* webpackChunkName: "categories" */ '../views/Categories.vue')
  },
  {
    path: '/categories/:title',
    name: 'category',
    component: () => import(/* webpackChunkName: "room" */ '../views/Category.vue')
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  store.dispatch('setMsg', { msg: 'navigation to ' + to.path });
  return next();
});

export default router
