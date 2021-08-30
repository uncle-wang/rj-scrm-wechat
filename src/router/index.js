import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '@/views/home.vue';
import push from '@/views/push.vue';
import words from '@/views/words.vue';
import welcome from '@/views/welcome.vue';
// import initWx from './initWx';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: home,
  },
  {
    path: '/push',
    component: push,
  },
  {
    path: '/words',
    component: words,
  },
  {
    path: '/welcome',
    component: welcome,
  },
];

const router = new VueRouter({
  routes,
});

// router.beforeEach(initWx);

export default router;
