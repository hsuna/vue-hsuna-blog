/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-04-04 01:36:11
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-04 01:39:49
 */

import marked from "marked";
import hljs from "highlight.js";
import "../assets/styles/markdown-body.scss";

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code, true).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  }
});

export default {
  data() {
    return {
      article: {
        content: ""
      }
    };
  },
  computed: {
    markdownToHtml() {
      if (this.article) {
        return marked(this.article.content || "", { sanitize: true });
      } else {
        return "";
      }
    }
  },
  methods: {}
};
