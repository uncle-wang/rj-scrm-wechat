import { MSGTYPE } from '@/constants';
import wxInvoke from './wxInvoke';

export default (list) => {
  list.forEach((data) => {
    let body;
    if (data.extType === MSGTYPE.TEXT) {
      body = { msgtype: 'text', text: { content: data.textContent } };
    } else if (data.extType === MSGTYPE.IMAGE) {
      body = { msgtype: 'image', image: { mediaid: data.imageMediaId } };
    } else if (data.extType === MSGTYPE.LINK) {
      body = {
        msgtype: 'news',
        news: {
          link: data.linkUrl,
          title: data.linkTitle,
          desc: data.linkDesc || '',
          imgUrl: data.linkPicurl || '',
        },
      };
    } else if (data.extType === MSGTYPE.MINIPROGRAM) {
      body = {
        msgtype: 'miniprogram',
        miniprogram: {
          appid: data.miniAppid,
          title: data.miniTitle,
          imgUrl: data.miniPicOssUrl,
          page: data.miniPage,
        },
      };
    } else if (data.extType === MSGTYPE.FILE) {
      body = { msgtype: 'file', file: { mediaid: data.fileMediaId } };
    }
    if (body) {
      wxInvoke('sendChatMessage', { ...body, enterChat: true }).catch((err) => {
        console.error(err);
      });
      wxInvoke('sendChatMessage', {
        enterChat: true,
        msgtype: 'text',
        text: {
          content: '\n',
        },
      }).catch((err) => {
        console.error(err);
      });
    }
  });
};
