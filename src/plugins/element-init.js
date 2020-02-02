import Vue from 'vue'

import 'src/assets/styles/element-variables.scss'

/* 引用-element-ui */
import { 
    Loading 
} from 'element-ui'

Vue.use(Loading)


Vue.prototype.$ELEMENT = { size: 'small' };

export default Vue