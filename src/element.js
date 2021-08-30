import Vue from 'vue';
import {
  Button,
  Input,
  Card,
} from 'element-ui';

Vue.prototype.$ELEMENT = { size: 'mini' };
Vue.use(Button);
Vue.use(Input);
Vue.use(Card);
