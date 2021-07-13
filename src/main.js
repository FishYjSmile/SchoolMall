import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'

import store from './store/index'

import Vuelazyload from 'vue-lazyload'
// 图片懒加载
/**************************fontawesome************************************** */
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);
import { 
  faUser,
  faAlignJustify,
  faSearch,
  faShoppingCart,
  faEnvelopeOpen,
  faChevronLeft,
  faChevronRight,
  faAngleLeft,
  faAngleRight,
  faCogs,
  faAirFreshener,
  faCat,
  faCommentDots,
  faCrow,
  faDiagnoses,
  faExclamationCircle,
  faAngleDown,
  faWindowClose,
  faExclamation,
  faPlusCircle,
  faTimes,
  faTrashAlt,
  faEdit
  
  
} from '@fortawesome/free-solid-svg-icons';
library.add(
  faUser,
  faAlignJustify,
  faSearch,
  faShoppingCart,
  faEnvelopeOpen,
  faChevronLeft,
  faChevronRight,
  faAngleLeft,
  faAngleRight,
  faCogs,
  faAirFreshener,
  faCat,
  faCommentDots,
  faCrow,
  faDiagnoses,
  faExclamationCircle,
  faAngleDown,
  faWindowClose,
  faExclamation,
  faPlusCircle,
  faTimes,
  faTrashAlt,
  faEdit
);
Vue.component('font-awesome-icon', FontAwesomeIcon);
/*************************************************************************** */


// 添加时间总线
Vue.prototype.$bus = new Vue()



Vue.config.productionTip = false

// 图片懒加载
Vue.use(Vuelazyload)
//element-ui
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
