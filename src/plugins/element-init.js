import 'src/assets/styles/element-variables.scss'

// 设置语言
import 'dayjs/locale/zh-cn'
import { use } from 'element-plus/lib/locale'
import lang from 'element-plus/lib/locale/lang/zh-cn'

/* 引用-element-plus */
import { ElLoading } from 'element-plus'

export default {
    install (app) {
        use(lang);
        app.config.globalProperties.$ELEMENT = { size: 'small' };
        app.use(ElLoading);
    }
}