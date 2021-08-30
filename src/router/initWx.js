import wxInvoke from '@/utils/wxInvoke';
import wxConfig from '@/utils/wxConfig';
import store from '@/store';

export default (to, from, next) => {
  wxConfig().then(() => wxInvoke('getContext')).then(res => {
    store.commit('setEntry', res.entry);
    next();
  }).catch(err => {
    console.error(err);
    next(false);
  });
};
