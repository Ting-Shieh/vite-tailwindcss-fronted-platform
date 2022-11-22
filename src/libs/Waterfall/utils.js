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
 * 監聽圖片數組加載完成 （通過 promise 完成）
 * @param {*} imgs 
 */
export const onComplateImgs = (imgs) => {
  // promise 集合
  const promiseAll = []
  //循環建構 promiseAll
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      const imgObj = new Image()
      imgObj.src = img
      imgObj.onload = () => {
        resolve({
          img, index
        })
      }
    })
  })
  return Promise.all(promiseAll)
}
