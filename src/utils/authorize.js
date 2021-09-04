export default () => {
	window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww851e9d2540b5ed3c&redirect_uri=${window.encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_base#wechat_redirect`;
};
