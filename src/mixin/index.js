/*
 * @Description vue混合
 * @Author: Hsuan
 * @Date: 2018-03-17 10:17:40
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-30 01:03:51
 */

export default {
  data() {
    return {};
  },
  directives: {
    focus: {
      inserted(el, { value }) {
        value = Object.assign(
          {
            cls: "el-input",
            tag: "input",
            focus: value || false
          },
          "boolean" == typeof value ? {} : value
        );
      },
      update(el, { value }) {
        if (el.classList.contains(value.cls) && value.focus) {
          el.getElementsByTagName(value.tag)[0].focus();
          value.focus = false;
        }
      }
    }
  },
  methods: {}
};
