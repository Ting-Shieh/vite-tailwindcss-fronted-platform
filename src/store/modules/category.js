import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA }from '@/constants/index.js'
import { getCategory }from '@/api/category.js'

/** 處理 navigationBar 中的數據 categorys */
export default {
  // 獨立作用域
  namespaced: true,
  state: () => ({
    /**
     * 1.讓 categorys 具備一個初始化數據
     * 2.從服務器獲取數據，替換初始化數據
     * 3.為了防止初始化數據太老，把每一次獲取到的新數據，都作為下一次的初始化數據
     */
    categorys: CATEGORY_NOMAR_DATA
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