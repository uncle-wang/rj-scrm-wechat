import store from '@/store';
import request from './request';
import getParam from './getParam';

/*
认证流程：
1.判断sessionStorage中是否存在token及userInfo，存在执行6，不存在执行2
2.判断页面url中是否有code参数，没有执行3，有执行4
3.跳转sso登录页登录(sso登录后会重定向回当前项目页面，并携带code参数，当前页面重新加载，因此会重新从步骤1执行，但由于已经有了code，所以会跳过3执行4)
4.调用登录接口，用code获取token及userInfo，成功执行5，失败中断
5.将token及userInfo存入sessionStorage中，通过replaceState移除url中的code(sso登录后固定返回本项目根路径，因此此处也replace至/即可)，执行6
6.执行callback(当前callback中的操作为初始化App实例)
*/

const wechatAuth = () => {
  window.sessionStorage.removeItem('token');
  // 自己的
  // window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww851e9d2540b5ed3c&redirect_uri=${window.encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_base#wechat_redirect`);
  // 如家的
  window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6a1abf70a2b1f203&redirect_uri=${window.encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_base#wechat_redirect`);
};

const doCallback = (callback) => {
  try {
    store.commit('setToken', window.sessionStorage.token);
    callback();
  } catch (e) {
    window.sessionStorage.removeItem('token');
    wechatAuth();
  }
};

export default (callback) => {
  // 未登录
  if (!window.sessionStorage.token) {
    // 判断url search中是否有code参数，如果有code，则获取token及userInfo，如果没有，则跳转sso登录(sso登录后会重定向回来并且带上code)
    const code = getParam('code');
    if (code) {
      // 获取token
      request({
        url: '/auth/h5/login/oauth/userinfo',
        params: { code },
      }).then((res) => {
        window.sessionStorage.token = res.token;
        doCallback(callback);
      }).catch((err) => {
        console.error(err);
      });
    } else {
      // sso登录获取code
      wechatAuth();
    }
  } else {
    doCallback(callback);
  }
};
