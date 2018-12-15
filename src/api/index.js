// 导入axios模块
import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// axios.create({
//   baseURL: 'http://127.0.0.1:3000',
//   headers: {'Content-Type': 'application/json;charset=utf-8'},
//   withCredentials: true
// })
// 允许axios传递cookie数据，因为默认情况下，axios并不会传递cookie
axios.defaults.withCredentials = true

// 判断用户是否登录
export const isLogin = () => {
  return axios.get(`/employee/checkRootLogin`)
    .then(results => {
      return results.data
    })
}
// 用户登录接口
export const login = (params) => {
  return axios.post(`/employee/employeeLogin`, params)
    .then(results => {
      return results.data
    })
}

// 退出登录接口
export const logout = () => {
  return axios.get(`/employee/employeeLogout`)
    .then(results => {
      return results.data
    })
}

// 用户管理接口
export const userListData = (params) => {
  return axios.get(`/user/queryUser`, {params})
    .then(results => {
      return results.data
    })
}

// 更改用户状态
export const changeUserStatus = (params) => {
  return axios.post(`/user/updateUser`, params)
    .then(results => {
      return results.data
    })
}

// 获取一级分类数据
export const getFirstCateData = (params) => {
  return axios.get(`/category/queryTopCategoryPaging`, {params})
    .then(results => {
      return results.data
    })
}

// 添加一级分类
export const addFirstCate = (params) => {
  return axios.post(`/category/addTopCategory`, params)
    .then(results => {
      return results.data
    })
}

// 编辑更新一级分类
export const editFirstCate = (params) => {
  return axios.post(`/category/updateTopCategory`, params)
    .then(results => {
      return results.data
    })
}

// 获取二级分类数据
export const getSecondCateData = (params) => {
  return axios.get(`/category/querySecondCategoryPaging`, {params})
    .then(results => {
      return results.data
    })
}

// 添加二级分类 -- 添加品牌
export const addSecondBrandCate = (params) => {
  return axios.post(`/category/addSecondCategory`, params)
    .then(results => {
      return results.data
    })
}

// 获取商品列表数据
export const getProductData = (params) => {
  return axios.get(`/product/queryProductDetailList`, {params})
    .then(results => {
      return results.data
    })
}
