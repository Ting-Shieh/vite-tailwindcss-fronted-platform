<template>
  <mobile-navigation v-if="isMobileTerminal"></mobile-navigation>
  <pc-navigation v-else></pc-navigation>
</template>
<script setup>
import { isMobileTerminal } from '@/utils/flexible.js'
import mobileNavigation from './mobile/index.vue'
import pcNavigation from './pc/index.vue'
import { useStore } from 'vuex'
const store = useStore()
// TODO: 數據為公有數據，移動到 vuex 中進行抽離處理。
// 觸發 categorys 獲取數據
store.dispatch('category/useCategoryData')

// import { getCategory }from '@/api/category.js'
// import { ALL_CATEGORY_ITEM }from '@/constants/index.js'
// import { ref } from 'vue'
// // data
// const categoryData = ref([])
// // methods
// const getCategoryData = async () => {
//   const { categorys } = await getCategory()
//   // console.log(category)
//   categoryData.value = categorys
//   // 數據補全
//   categoryData.value.unshift(ALL_CATEGORY_ITEM)
// }
// // run
// getCategoryData()
</script>