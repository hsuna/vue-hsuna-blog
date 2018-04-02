/*
 * @Description: 日期处理器
 * @Author: Hsuna
 * @Date: 2018-04-03 00:01:18
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-03 00:25:15
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

export { dateFormat, timeStampFormat };
