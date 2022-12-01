import axios from 'axios'
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 50000
})
// 請求攔截
service.interceptors.request.use(
  config => {
    // add icode
    config.headers.icode = '1CF074811DEB52E6'
    return config
  }
)

/**
 * 響應攔截
 * 服務端返回數據後，前端 .then 之前被調用
 */
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  // 根據success成功與否決定下面操作
  if (success) {
    return data
  } else {
    // TODO : 業務邏輯錯誤
    return Promise.reject(new Error(message))
  }
})

export default service
