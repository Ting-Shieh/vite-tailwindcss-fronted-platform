/**
 * 從itemElement 中抽離所有的 imgElements
 * @param {*} itemElements 
 * @returns 
 */
export const getImgElements = (itemElements) => {
  const imgElements = []
  itemElements.forEach(el => {
    imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}

/**
 * 生成所有圖片連結數組
 * @param {*} imgElements 
 */
export const getAllImg = (imgElements) => {
  return imgElements.map(imgEle => {
    return imgEle.src
  })
}
/**
 * 異步 ＝> 用 promise 處理
 * 監聽圖片數組加載完成 （通過 promise 完成）
 * @param {*} imgs 
 */
export const onComplateImgs = (imgs) => {
  // promise 集合
  const promiseAll = []
  // 循環建構 promiseAll
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      // 處理 img 加載情況
      const imgObj = new Image()
      imgObj.src = img
      imgObj.onload = () => {
        // 圖片加載完成
        resolve({
          img, index
        })
      }
    })
  })
  // 執行 promiseAll 裡的所有 promise  
  return Promise.all(promiseAll)
}

/**
 * 返回列高對象中的最小高度所在列
 * @param {*} columnHeightObj 
 */
export const getMinHeightColumn = (columnHeightObj) => {
  const minHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find(key => {
    return columnHeightObj[key] === minHeight
  })
}

/**
 * 返回列高對象中的最小高度
 * @param {*} columnHeightObj 
 */
export const getMinHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.min(...columnHeightArr)
}

/**
 * 返回列高對象中的最大高度
 * @param {*} columnHeightObj 
 */
export const getMaxHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.max(...columnHeightArr)
}