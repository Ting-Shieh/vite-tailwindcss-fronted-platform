import request from '@/utils/request'

/**
 * 獲取圖片數據列表
 */
export const getPexelsList = (data) => {
  return request({
    url: '/pexels/list',
    params: data
  })
}
