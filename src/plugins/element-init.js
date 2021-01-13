import 'src/assets/styles/element-variables.scss'

/* 引用-element-plus */
import { ElLoading } from 'element-plus'

export default {
    install (app) {
        app.use(ElLoading, { size: 'small' })
    }
}