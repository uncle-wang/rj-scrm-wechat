import Vue from 'vue';
import wxConfig from '@/utils/wxConfig';
import App from './App.vue';

wxConfig().then(() => {
  console.log('ok');
  window.wx.invoke('getContext', {}, res => {
    console.log(res);
  });
}).catch(err => {
  console.error(err);
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
