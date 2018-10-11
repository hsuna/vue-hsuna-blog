const _url2Obj = (_ =>{
    let _cache = {};//缓存起来，避免每一次都进行解析
    return url => {
        let obj = {};
        url = decodeURIComponent(url);
        if(!_cache[url]){
            if (/\?/.test(url)) {
                url.split("?")[1].split("&").forEach((param, index) => {
                    let [key, value] = param.split("="); //进行分割成数组
                    obj[key] = value; //为对象赋值
                })
            }
            _cache[url] = obj;
        }else{
            obj = _cache[url];
        }
        return obj;
    }
})();

const _obj2Url = obj => Object.keys(obj).map(k => `${k}=${obj[k]}`).join('&');

const to = search => {
    if('object' == typeof search) return _obj2Url(search);
    else return _url2Obj(search || window.location.search);
}


const get = (name, search) => to(search)[name];

export {
    get,
    to
}
