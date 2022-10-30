import request from '@/utils/request.js'
/**
 * 獲取分類類表
 * @returns 
 */
export const getCategory = () => {
  return request({
    url: '/category'
  })
}