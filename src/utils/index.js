/**
 * 兼容微信设置页面的title
 */
const setDocumentTitle = title => {
  document.title = title;
  let ua = navigator.userAgent;
  if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    let i = document.createElement("iframe");
    i.src = "/favicon.ico";
    i.style.display = "none";
    i.onload = function () {
      setTimeout(function () {
        i.remove();
      }, 9);
    };
    document.body.appendChild(i);
  }
};

export {
  setDocumentTitle
};
