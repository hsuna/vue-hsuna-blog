/*
 * @Description vue混合
 * @Author: Hsuan 
 * @Date: 2018-03-17 10:17:40 
 * @Last Modified by: Hsuan
 * @Last Modified time: 2018-03-29 14:28:44
 */

export default {
  data() {
    return {

    };
  },
  directives: {
    "focus": function (el, option) {
      let value = Object.assign({
        cls: 'el-input',
        tag: 'input',
        focus: option.value || true
      }, ('boolean' == typeof value ? {} : option.value));
      
      if (el.classList.contains(value.cls) && value.focus) {
        el.getElementsByTagName(value.tag)[0].focus();
      }
    },
    methods: {

    }
  }
};
