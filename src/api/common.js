import request from '@/utils/request';

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
