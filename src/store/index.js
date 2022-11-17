import { createStore } from 'vuex'
import getters from './getters.js'
import category from './modules/category.js'
import createPersistedState from 'vuex-persistedstate'
const store = createStore({
  getters,
  modules: {
    category
  },
  plugins:[
    createPersistedState({
      // 保存到 localStorage 中的 key
      key: 'imooc-front',
      // 需要保存的模塊
      paths: ['category']
    })
  ]
})

export default store