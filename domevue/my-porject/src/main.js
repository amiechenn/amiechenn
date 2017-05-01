// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Loadmore } from 'mint-ui';
import VueResource from 'vue-resource'
Vue.config.productionTip = false
Vue.component(Loadmore.name, Loadmore)
/* 或写为
 * Vue.use(Loadmore)
 */
Vue.use(VueResource)
/* eslint-disable no-new */
//渲染时间{
Vue.filter('time', function (value) {
    return new Date(parseInt(value) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");

})
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})

