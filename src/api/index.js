// 导入axios模块
import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'

// 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   console.log(config)
//   if (config.url) {}
//   return config
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })

export const login = (params) => {
  return axios.post(`/employee/employeeLogin`, params)
    .then(results => {
      return results.data
    })
}
