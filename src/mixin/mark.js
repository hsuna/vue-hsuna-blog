/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-04-04 01:36:11
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-20 14:11:34
 */

import marked from "marked";
import hljs from "@/plugins/hljs";
import "../assets/styles/markdown-body.scss";

export default {
  data() {
    return {};
  },
  mounted() {
    this.markdown();
  },
  computed: {
    /* markdownToHtml(value) {
      debugger;
      if (value) {
        //let lexed = marked.lexer(value);
        //return marked.parser(lexed);
        return marked(value);
      } else {
        return "";
      }
    } */
  },
  methods: {
    markdown() {
      marked.setOptions({
        sanitize: false,
        renderer: new marked.Renderer(),
        highlight(code, lang) {
          if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(lang, code, true).value;
          } else {
            return hljs.highlightAuto(code).value;
          }
        }
      });
    },
    markdownToHtml(value) {
      if (value) {
        //let lexed = marked.lexer(value);
        //return marked.parser(lexed);
        return marked(value);
      } else {
        return "";
      }
    }
  }
};
