import sha1 from 'crypto-js/sha1';
import { v4 as uuid } from 'uuid';
import request from './request';

const WECHATID = 'ww851e9d2540b5ed3c';
const AGENTID = '1000004';
const SECRET = '5mqhNGn0Fa4gtDXticaiKMhT04lU0ez9j8vfrHYtuK8';
const APILIST = [
  'getContext',
  'getCurExternalContact',
];

let configed = false;
const wx = window.wx;

const getUrl = () => {
  return window.location.origin + window.location.pathname + window.location.search;
};

const getTokenFromCache = () => {
  if (window.localStorage && window.localStorage.token) {
    try {
      const tokenObj = JSON.parse(window.localStorage.token);
      if (tokenObj.access_token && tokenObj.expires_at > Date.now()) {
        return tokenObj.access_token;
      }
    } catch(e) {
      return;
    }
  }
};

const getTicketFromCache = () => {
  if (window.localStorage && window.localStorage.ticket) {
    try {
      const ticketObj = JSON.parse(window.localStorage.ticket);
      if (ticketObj.ticket && ticketObj.expires_at > Date.now()) {
        return ticketObj.ticket;
      }
    } catch(e) {
      return;
    }
  }
};

const getAppTicketFromCache = () => {
  if (window.localStorage && window.localStorage.appTicket) {
    try {
      const ticketObj = JSON.parse(window.localStorage.appTicket);
      if (ticketObj.ticket && ticketObj.expires_at > Date.now()) {
        return ticketObj.ticket;
      }
    } catch(e) {
      return;
    }
  }
};

const getToken = async () => {
  const cacheToken = getTokenFromCache();
  if (cacheToken) {
    return cacheToken;
  }
  const res = await request({
    url: '/cgi-bin/gettoken',
    params: {
      corpid: WECHATID,
      corpsecret: SECRET,
    },
  });
  if (res.errcode === 0) {
    if (window.localStorage) {
      window.localStorage.token = JSON.stringify({
        access_token: res.access_token,
        expires_at: Date.now() + res.expires_in * 1000,
      });
    }
    return res.access_token;
  } else {
    throw new Error(res.errmsg);
  }
};

const getTicket = async () => {
  const cacheTicket = getTicketFromCache();
  if (cacheTicket) {
    return cacheTicket;
  }
  const token = await getToken();
  const res = await request({
    url: '/cgi-bin/get_jsapi_ticket',
    params: {
      access_token: token,
    },
  });
  if (res.errcode === 0) {
    if (window.localStorage) {
      window.localStorage.ticket = JSON.stringify({
        ticket: res.ticket,
        expires_at: Date.now() + res.expires_in * 1000,
      });
    }
    return res.ticket;
  } else {
    throw new Error(res.errmsg);
  }
};

const getAppTicket = async () => {
  const cacheTicket = getAppTicketFromCache();
  if (cacheTicket) {
    return cacheTicket;
  }
  const token = await getToken();
  const res = await request({
    url: '/cgi-bin/ticket/get',
    params: {
      access_token: token,
      type: 'agent_config',
    },
  });
  if (res.errcode === 0) {
    if (window.localStorage) {
      window.localStorage.appTicket = JSON.stringify({
        ticket: res.ticket,
        expires_at: Date.now() + res.expires_in * 1000,
      });
    }
    return res.ticket;
  } else {
    throw new Error(res.errmsg);
  }
};

const wxConfig = () => new Promise((resolve, reject) => {
  getTicket().then(ticket => {
    const options = {
      beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: WECHATID, // 必填，企业微信的corpID
      timestamp: Math.round(Date.now() / 1000), // 必填，生成签名的时间戳
      nonceStr: uuid(), // 必填，生成签名的随机串
      signature: '',// 必填，签名，见 附录-JS-SDK使用权限签名算法
      jsApiList: APILIST // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
    };
    const signatureSourceStr = `jsapi_ticket=${ticket}&noncestr=${options.nonceStr}&timestamp=${options.timestamp}&url=${getUrl()}`;
    options.signature = sha1(signatureSourceStr).toString();
    wx.config(options);
    wx.ready(resolve);
    wx.error(reject);
  }).catch(reject);
});

const agentConfig = () => new Promise((resolve, reject) => {
  if (configed) {
    return resolve();
  }
  wxConfig().then(getAppTicket).then(ticket => {
    const options = {
      corpid: WECHATID, // 必填，企业微信的corpid，必须与当前登录的企业一致
      agentid: AGENTID, // 必填，企业微信的应用id （e.g. 1000247）
      timestamp: Math.round(Date.now() / 1000), // 必填，生成签名的时间戳
      nonceStr: uuid(), // 必填，生成签名的随机串
      signature: '',// 必填，签名，见附录-JS-SDK使用权限签名算法
      jsApiList: APILIST, //必填，传入需要使用的接口名称
    };
    const signatureSourceStr = `jsapi_ticket=${ticket}&noncestr=${options.nonceStr}&timestamp=${options.timestamp}&url=${getUrl()}`;
    options.signature = sha1(signatureSourceStr).toString();
    wx.agentConfig({
      ...options,
      success() {
        configed = true;
        resolve();
      },
      fail(err) {
        reject(err);
        if (err.errMsg.indexOf('function not exist') > -1) {
          alert('版本过低请升级')
        } else {
          alert(err.errMsg);
        }
      },
    });
  }).catch(reject);
});

export default agentConfig;
