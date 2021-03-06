export default (apiName, options = {}) => new Promise((resolve, reject) => {
  window.wx.invoke(apiName, options, res => {
    if (res.err_msg === `${apiName}:ok` || res.errMsg === `${apiName}:ok`) {
      resolve(res);
    } else {
      reject(res.err_msg || res.errMsg);
    }
  });
});
