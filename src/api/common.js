import request from '@/utils/request';

// 获取token
export function login(code) {
  return request({
    url: '/auth/h5/login/oauth/userinfo',
    params: { code },
  });
}

// 获取签名信息
export function getSign() {
  return request({
    url: '/auth/h5/wechat/config/sign',
    params: { url: window.location.origin + window.location.pathname + window.location.search },
  });
}

// 获取客户数据
export function getStatistics() {
  return request({
    url: '/api/coustomer/statistics/today/statistics',
  });
}

// 获取推送任务详情
export function getTaskDetail(taskId) {
  return request({
    method: 'POST',
    url: `/api/task/info/${taskId}`
  });
}

// 获取推送任务规则
export function getTaskRule(taskId) {
  return request({
    url: `/api/task/rule/${taskId}`
  });
}

// 上传文件
export function uploadFile(fileType, file) {
  const fd = new FormData();
  fd.append('multipartFile', file);
  return request({
    url: '/api/upload/oss/file/upload',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    params: { fileType },
    data: fd,
  });
}

// 上传素材
export function uploadMedia(fileType, file) {
  const fd = new FormData();
  fd.append('multipartFile', file);
  return request({
    url: '/api/upload/wechat/file/upload',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    params: { fileType },
    data: fd,
  });
}

// 获取素材
export function getMediaUrl(mediaId) {
  return `${process.env.VUE_APP_BASE_URL}/api/wechat/material/media/detail?mediaId=${mediaId}`;
}
