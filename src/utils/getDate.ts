function getDate(date: string): string {
  let lastReplyDate = new Date(date);
  let time = new Date().getTime() - lastReplyDate.getTime();

  if (time < 0) {
    return '';
  } else if (time / 1000 < 60) {
    return '刚刚';
  } else if ((time / 60000) < 60) {
    return Math.round(time / 60000) + '分钟前';
  } else if ((time / 3600000) < 24) {
    return Math.round(time / 3600000) + '小时前';
  } else if ((time / 86400000) < 31) {
    return Math.round(time / 86400000) + '天前';
  } else if ((time / 2592000000) < 12) {
    return Math.round(time / 2592000000) + '月前';
  } else {
    return Math.round(time / 31536000000) + '年前';
  }
}

export default getDate;