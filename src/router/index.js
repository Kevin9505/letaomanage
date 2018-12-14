import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import User from '@/views/user/user.vue'
import FirstCate from '@/views/cate/firstcate.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/user',
          name: 'User',
          component: User
        },
        {
          path: '/firstcate',
          name: 'FirstCate',
          component: FirstCate
        }
      ]
    }
  ]
})
