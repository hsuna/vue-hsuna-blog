<template>
  <div class="blog-simplemde">
    <textarea
      class="blog-simplemde-textarea"
      :name="name"
      :value="modelValue"
      @input="handleInput($event.target.value)"
    />
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, nextTick, onDeactivated, onMounted, onUnmounted, ref, watch } from 'vue';

import SimpleMDE from 'simplemde';
import marked from 'marked';

export default {
  name: 'blog-simplemde',
  props: {
    modelValue: String,
    name: String,
    previewClass: String,
    autoinit: {
      type: Boolean,
      default() {
        return true;
      },
    },
    highlight: {
      type: Boolean,
      default() {
        return false;
      },
    },
    sanitize: {
      type: Boolean,
      default() {
        return false;
      },
    },
    configs: {
      type: Object,
      default() {
        return {};
      },
    },
    previewRender: {
      type: Function,
    },
  },
  setup(props, ctx) {
    const instance = getCurrentInstance()
    const simplemde = ref(null);
    const isValueUpdateFromInner = ref(false);

    const handleInput = (val) => {
      isValueUpdateFromInner.value = true;
      ctx.emit('update:modelValue', val);
    }

    const handleBlur = (val) => {
      isValueUpdateFromInner.value = true;
      ctx.emit('blur', val);
    }

    const bindingEvents = () => {
      simplemde.value.codemirror.on('change', (instance, changeObj) => {
        if (changeObj.origin === 'setValue') return;
        handleInput(simplemde.value.value());
      });

      simplemde.value.codemirror.on('blur', () => {
        handleBlur(simplemde.value.value());
      });
    }

    const addPreviewClass = (className) => {
      const wrapper = simplemde.value.codemirror.getWrapperElement();
      const preview = document.createElement('div');
      wrapper.nextSibling.className += ` ${className}`;
      preview.className = `editor-preview ${className}`;
      wrapper.appendChild(preview);
    }

    const initialize = () => {
      const configs = Object.assign({
        element: instance.vnode.el.firstElementChild,
        initialValue: props.modelValue,
        previewRender: props.previewRender,
        renderingConfig: {},
      }, props.configs);

      // 同步 value 和 initialValue 的值
      if (configs.initialValue) {
        ctx.emit('update:modelValue', configs.initialValue);
      }

      // 判断是否开启代码高亮
      if (props.highlight) {
        configs.renderingConfig.codeSyntaxHighlighting = true;
      }

      // 设置是否渲染输入的html
      marked.setOptions({ sanitize: props.sanitize });

      // 实例化编辑器
      simplemde.value = new SimpleMDE(configs);

      // 添加自定义 previewClass
      const className = props.previewClass || '';
      addPreviewClass(className);

      // 绑定事件
      bindingEvents();

      // 初始化完成
      nextTick(() => {
        ctx.emit('initialized', simplemde.value);
      })
    }

    watch(() => props.modelValue, val => {
      if (isValueUpdateFromInner.value) {
        isValueUpdateFromInner.value = false;
      } else {
        simplemde.value.value(val);
      }
    })

    onMounted(() => {
      if(props.autoinit) initialize();
    })

    onUnmounted(() => {
      if(simplemde.value) {
        simplemde.value = null;
      }
    })

    onDeactivated(() => {
      if(!simplemde) return;
      const isFullScreen = simplemde.codemirror.getOption('fullScreen');
      if (isFullScreen) simplemde.toggleFullScreen();
    })

    return {
      handleInput,
      handleBlur,
    }
  }
};
</script>

<style lang="scss">
.blog-simplemde {
  .CodeMirror, .CodeMirror-scroll{
    max-height: 800px;
  }

  .markdown-body {
    padding: 0.5em;
  }

  .editor-toolbar a {
    outline: none;
  }

  .editor-preview-active, 
  .editor-preview-active-side {
    display: block;
  }
}

</style>
