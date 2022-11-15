import { ALL_CATEGORY_ITEM }from '@/constants/index.js'
import { getCategory }from '@/api/category.js'

/** 處理 navigationBar 中的數據 categorys */
export default {
  // 獨立作用域
  namespaced: true,
  state: () => ({
    categorys: [ALL_CATEGORY_ITEM]
  }),
  // state: () => {
  //   return {}
  // },
  mutations: {
    // 為 categorys 賦職
    setCategorys(state, newCategorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...newCategorys]
    }
  },
  actions: {
    // 獲取 categorys 數據，並自動保存到 vuex 中．
    async useCategoryData(context){
      const { categorys } = await getCategory()
      context.commit('setCategorys', categorys)
    }
  }
}