import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '@/views/home.vue';
import push from '@/views/push.vue';
import notification from '@/views/notification.vue';
import words from '@/views/words.vue';
import words_edit from '@/views/words_edit.vue';
import welcome from '@/views/welcome.vue';
import welcome_edit from '@/views/welcome_edit.vue';
import data from '@/views/data.vue';
import { WORDSTYPE } from '@/constants';
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
    redirect: `/words_${WORDSTYPE.BUSINESS}`,
  },
  {
    path: `/words_${WORDSTYPE.BUSINESS}`,
    component: words,
    props: { type: WORDSTYPE.BUSINESS },
  },
  {
    path: `/words_${WORDSTYPE.PERSONAL}`,
    component: words,
    props: { type: WORDSTYPE.PERSONAL },
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
    path: '/welcome_edit',
    component: welcome_edit,
  },
  {
    path: '/data',
    component: data,
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

// router.beforeEach(initWx);

export default router;
