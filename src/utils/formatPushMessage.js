import { MSGTYPE } from '@/constants';

export default (taskInfo) =>  {
  const contents = [];
  // 文本
  if (taskInfo.textContent) {
    contents.push({ extType: MSGTYPE.TEXT, textContent: taskInfo.textContent });
  }
  // 图片
  if (taskInfo.imageMediaId) {
    contents.push({ extType: MSGTYPE.IMAGE, imageMediaId: taskInfo.imageMediaId });
  }
  // 链接
  if (taskInfo.linkUrl && taskInfo.linkTitle) {
    contents.push({
      extType: MSGTYPE.LINK,
      linkUrl: taskInfo.linkUrl,
      linkTitle: taskInfo.linkTitle,
      linkDesc: taskInfo.linkDesc,
      linkPicurl: taskInfo.linkPicurl,
    });
  }
  // 文件
  if (taskInfo.fileMediaId) {
    contents.push({ extType: MSGTYPE.FILE, fileMediaId: taskInfo.fileMediaId });
  }
  // 小程序
  if (taskInfo.miniAppid && taskInfo.miniTitle && taskInfo.miniPage && taskInfo.miniPicMediaId) {
    contents.push({
      extType: MSGTYPE.MINIPROGRAM,
      miniAppid: taskInfo.miniAppid,
      miniTitle: taskInfo.miniTitle,
      miniPage: taskInfo.miniPage,
      miniPicMediaId: taskInfo.miniPicMediaId,
    });
  }
  return contents;
};
