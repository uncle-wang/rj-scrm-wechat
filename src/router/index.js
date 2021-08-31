import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '@/views/home.vue';
import push from '@/views/push.vue';
import notification from '@/views/notification.vue';
import words from '@/views/words.vue';
import words_edit from '@/views/words_edit.vue';
import welcome from '@/views/welcome.vue';
import data from '@/views/data.vue';
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
    path: '/notification',
    component: notification,
  },
  {
    path: '/words',
    component: words,
  },
  {
    path: '/words_edit',
    component: words_edit,
  },
  {
    path: '/welcome',
    component: welcome,
  },
  {
    path: '/data',
    component: data,
  },
];

const router = new VueRouter({
  routes,
});

// router.beforeEach(initWx);

export default router;
