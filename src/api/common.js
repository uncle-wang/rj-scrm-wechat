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

// 更新任务跟进状态
export function updateTaskStatus(taskId, userId) {
  return request({
    method: 'POST',
    url: `/api/task/info/${taskId}/${userId}`,
  });
}

// 获取话术组tree
export function getWordsTree(bizType) {
  return request({
    url: '/verbal/trick/group/tree',
    params: { bizType },
  });
}

// 根据话术组查话术
export function getWordsByGroup(bizType, groupId) {
  return request({
    url: '/verbal/trick/team/list',
    params: { bizType, groupId, page: 1, size: 100 },
  });
}

// 查询话术组
export function getWordsGroups(bizType) {
  return request({
    url: '/verbal/trick/group/list',
    params: { bizType },
  });
}

// 创建话术分组
export function createWordsGroup(bizType, groupName) {
  return request({
    method: 'POST',
    url: '/verbal/trick/group/add',
    data: {
      bizType,
      groupName,
      pid: 0,
    },
  });
}

// 创建话术集
export function createWords(data) {
  return request({
    method: 'POST',
    url: '/verbal/trick/team/add',
    data,
  });
}

// 获取欢迎语列表
export function getWelcomeList() {
  return request({
    url: '/api/welcome/list',
  });
}

// 创建欢迎语
export function addWelcome(data) {
  return request({
    method: 'POST',
    url: '/api/welcome/add',
    data,
  });
}

// 编辑欢迎语
export function editWelcome(data) {
  return request({
    method: 'POST',
    url: '/api/welcome/edit',
    data,
  });
}

// 查询目标客户的推送任务
export function getTasksByUser(userId) {
  return request({
    method: 'POST',
    url: `/api/task/details/${userId}`,
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
