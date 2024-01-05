<template>
  <div class="blog-footer">
    <div class="footer-inner">
      <div class="footer-content">
        {{ curYear }} © <a title="电子邮件" href="mailto:me@husna.com">我的邮件</a>
        | <a title="简历" target="_blank" href="http://resume.hsuna.com">简历</a>
        | <a title="GitHub" target="_blank" href="https://github.com/hsuna">GitHub</a>
      </div>
    </div>
  </div>
</template>


<script>
import { timeStampFormat } from 'src/utils/date.js'

export default {
  name: 'blog-footer',
  data() {
    return {};
  },
  computed: {
    curYear() {
      return timeStampFormat(Date.now(), 'yyyy')
    }
  },
  created() { },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.blog-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: 10px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);

  .footer-inner {
    max-width: 1024px;
    width: 100%;
    height: 40px;
    margin: 0 auto;
  }

  .footer-content {
    float: right;
    margin-right: 10px;
    line-height: 40px;
    font-size: 16px;
  }
}
</style>
