import Vue from 'vue'
import Router from 'vue-router'
import Survey from '@/components/survey'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/survey/:referrer',
      name: 'Survey',
      component: Survey
    }
  ]
})
