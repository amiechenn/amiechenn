import Vue from 'vue'
import Router from 'vue-router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { Loadmore } from 'mint-ui';
import home from '@/components/home'
import list from '@/components/list'
import shoping from '@/components/shoping'
import me from '@/components/me'
import lottery from '@/components/lottery'
import detail from '@/components/detail'
Vue.use(Router)
Vue.use(VueAwesomeSwiper)
Vue.component(Loadmore.name, Loadmore);
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/index',
      name: 'home',
      component: home
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/shoping',
      name: 'shoping',
      component: shoping
    },
    {
      path: '/me',
      name: 'me',
      component: me
    },
    {
      path: '/lottery',
      name: 'lottery',
      component: lottery
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    }
  ]
})
