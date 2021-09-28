import { getSign } from '@/api/common';

const wx = window.wx;
const WECHATID = process.env.VUE_APP_WECHATID;
const AGENTID = process.env.VUE_APP_AGENTID
const APILIST = [
  'getContext',
  'sendChatMessage',
];

export default () => new Promise((resolve, reject) => {
  getSign().then((data) => {
    const {
      noncestr,
      // jsapi_ticket,
      // jsapi_ticket_crop,
      timestamp,
      // url,
      signature,
      signatureCrop,
    } = data;
    wx.config({
      beta: true,
      debug: false,
      appId: WECHATID,
      timestamp,
      nonceStr: noncestr,
      signature: signatureCrop,
      jsApiList: APILIST,
    });
    wx.error(() => {
      console.log('config1 failed');
      reject();
    });
    wx.ready(() => {
      wx.agentConfig({
        corpid: WECHATID,
        agentid: AGENTID,
        timestamp,
        nonceStr: noncestr,
        signature,
        jsApiList: APILIST,
        success: resolve,
        fail(err) {
          console.log('config2 failed');
          reject(err);
          if (err.errMsg.indexOf('function not exist') > -1) {
            alert('版本过低请升级')
          } else {
            alert(err.errMsg);
          }
        },
      });
    });
  }).catch(reject);
});
