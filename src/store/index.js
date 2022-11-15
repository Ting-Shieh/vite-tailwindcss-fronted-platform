import { createStore } from 'vuex'
import getters from './getters.js'
import category from './modules/category.js'

const store = createStore({
  getters,
  modules: {
    category
  }
})

export default store