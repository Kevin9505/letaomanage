// 导入axios模块
import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'

export const login = (params) => {
  return axios.post(`/employee/employeeLogin`, params)
    .then(results => {
      return results.data
    })
}
