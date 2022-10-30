import axios from 'axios'
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 50000
})
// 請求攔截
service.interceptors.request.use(
  config => {
    // add icode
    config.headers.icode = 'DF5E456E00B3D145'
    return config
  }
)

export default service
