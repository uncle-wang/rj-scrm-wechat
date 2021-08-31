import Vue from 'vue';
import {
  Button,
  Input,
  Select,
  Option,
  Card,
  Link,
  Form,
  FormItem,
  Table,
  TableColumn,
  Dialog,
} from 'element-ui';

Vue.prototype.$ELEMENT = { size: 'mini' };
Vue.use(Button);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Card);
Vue.use(Link);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
