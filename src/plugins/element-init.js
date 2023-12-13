import 'src/assets/styles/element-variables.scss'

// 设置语言
import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'
import 'dayjs/locale/zh-cn'

/* 引用-element-plus */
import { ElLoading } from 'element-plus'

export default {
    install (app) {
        locale.use(lang);
        app.config.globalProperties.$ELEMENT = { size: 'small' };
        app.use(ElLoading);
    }
}