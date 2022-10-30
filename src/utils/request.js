import axios from 'axios'

const service = axios.create({
  baseURL: 'https://api.imooc-front.lgdsunday.club/api',
  timeout: 50000
})

export default service
