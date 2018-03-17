/* jshint esversion: 6 */
/*
 * @Description 过滤器
 * @Author: Hsuan 
 * @Date: 2018-03-17 10:17:16 
 * @Last Modified by: Hsuan
 * @Last Modified time: 2018-03-17 10:26:17
 */

/**
 * 时间格式化
 * @param {date} date 时间
 * @param {string} fmt 格式
 * @return {string} yy-mm-dd
 */
const dateFormat = (date, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  if (!date) return "";
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
    }
  }
  return fmt;
};

/**
 * 时间戳格式化
 * @param {number} timeStamp 时间戳
 * @param {string} fmt 格式
 * @return {string} yy-mm-dd
 */
const timeStampFormat = (timeStamp, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  if (!timeStamp) return "";
  let date = new Date(timeStamp);
  return dateFormat(date);
};

export {
  dateFormat,
  timeStampFormat
};
