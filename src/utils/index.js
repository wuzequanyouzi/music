// 获取歌词数组
export const getLrcArray = (lrc) => {
  const parts = lrc.split('\n');
  return parts.map(part => {
    const twoParts = part.split(']');
    const timeStr = twoParts[0].substr(1);
    const timeStrArr = timeStr.split(':');
    const minute = +timeStrArr[0];
    const seconds = +timeStrArr[1];
    const time = minute * 60 + seconds;
    const words = twoParts[1];
    return {
      time,
      words
    }
  })
}