import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import User from '@/views/user/user.vue'
import FirstCate from '@/views/cate/firstcate.vue'
import Secondcate from '@/views/cate/secondcate.vue'
import Productlist from '@/views/product/productlist.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: {
        path: '/home'
      }
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
        },
        {
          path: '/secondcate',
          name: 'Secondcate',
          component: Secondcate
        },
        {
          path: '/productlist',
          name: 'Productlist',
          component: Productlist
        }
      ]
    }
  ]
})
