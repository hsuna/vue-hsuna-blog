/* jshint esversion: 6 */
/*
 * @Description 过滤器
 * @Author: Hsuan
 * @Date: 2018-03-17 10:17:16
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-31 21:29:06
 */

const WEEKDAY = {
  zh: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  en: ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"]
};

/**
 * 时间格式化
 * @param {date} date 时间
 * @param {string} fmt 默认: yyyy-MM-dd hh:mm:ss"
 * @return {string}
 */
const dateFormat = (date, fmt = "yyyy-MM-dd hh:mm:ss") => {
  if (!date) return "";
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    W: WEEKDAY["zh"][date.getDay()],
    w: WEEKDAY["en"][date.getDay()]
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
      );
    }
  }
  return fmt;
};

/**
 * 时间戳格式化
 * @param {number} timeStamp 时间戳
 * @param {string} fmt 格式 默认: yyyy-MM-dd hh:mm:ss"
 * @return {string}
 */
const timeStampFormat = (timeStamp, fmt) => {
  if (!timeStamp) return "";
  let date = new Date(timeStamp);
  return dateFormat(date, fmt);
};

const agoStamp = [
  { text: "刚刚", time: 10 * 1000 },
  { text: "{time}秒前", time: 60 * 1000 },
  { text: "{time}分钟前", time: 60 * 60 * 1000 },
  { text: "{time}小时前", time: 24 * 60 * 60 * 1000 },
  { text: "昨天", time: 2 * 24 * 60 * 60 * 1000 },
  { text: "前天", time: 3 * 24 * 60 * 60 * 1000 },
  { text: "{time}天前", time: 7 * 24 * 60 * 60 * 1000 },
  { text: "{time}周前", time: 30 * 24 * 60 * 60 * 1000 },
  { text: "{time}月前", time: 365 * 24 * 60 * 60 * 1000 },
  { text: "{time}年前" }
];
const timeAgoFormat = (timeStamp, fmt=agoStamp) => {
  if (!timeStamp) return "";
  let difftime = Date.now() - timeStamp;
  let divisor = 1;
  for (let i = 0; i < agoStamp.length; i++) {
    let { text, time } = agoStamp[i];
    if (difftime < time) {
      return text.replace("{time}", Math.floor(difftime / divisor));
    } else {
      divisor = time;
    }
  }
};

export { dateFormat, timeStampFormat, timeAgoFormat };
