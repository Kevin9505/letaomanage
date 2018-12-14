// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入 elementui 框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引用字体图标
import 'font-awesome-sass/assets/stylesheets/_font-awesome.scss'
import '@/assets/index.scss'

import { isLogin } from '@/api'
// 设置导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  isLogin().then(res => {
    console.log(res)
    if (res.success || to.path === '/login') {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  })
  // next()
})
Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
