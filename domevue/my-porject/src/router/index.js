import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import search from '@/components/search'
import inbox from '@/components/inbox'
import user from '@/components/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/inbox',
      name: 'inbox',
      component: inbox
    },
    {
      path: '/user',
      name: 'user',
      component: user
    }

  ]
})
