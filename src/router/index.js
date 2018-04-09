import Vue from 'vue'
import Router from 'vue-router'
import Survey from '@/components/survey'
import DefaultPage from '@/components/default-page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DefaultPage',
      component: DefaultPage
    },
    {
      path: '/survey/:referrer',
      name: 'Survey',
      component: Survey
    }
  ]
})
