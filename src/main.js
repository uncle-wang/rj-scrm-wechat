import Vue from 'vue';
import wxInvoke from '@/utils/wxInvoke';
import auth from '@/utils/auth';
import router from '@/router';
import store from './store';
import App from '@/App.vue';
import '@/element';
import '@/components';
import '@/main.less';

Vue.config.productionTip = false;
Vue.prototype.$wxInvoke = wxInvoke;
Vue.prototype.$wx = window.wx;

auth(() => {
  new Vue({
    store,
    router,
    render: h => h(App),
  }).$mount('#app')
});
