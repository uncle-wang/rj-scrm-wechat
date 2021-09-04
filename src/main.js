import Vue from 'vue';
import wxInvoke from '@/utils/wxInvoke';
import request from '@/utils/request';
import router from '@/router';
import store from './store';
import App from '@/App.vue';
import '@/element';
import '@/components';
import '@/main.less';

Vue.config.productionTip = false;
Vue.prototype.$wxInvoke = wxInvoke;
Vue.prototype.$request = request;
Vue.prototype.$wx = window.wx;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
