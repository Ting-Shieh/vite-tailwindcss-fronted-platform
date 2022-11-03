<template>
  <mobile-navigation v-if="isMobileTerminal" :data="categoryData"></mobile-navigation>
</template>
<script setup>
import { isMobileTerminal } from '@/utils/flexible.js'
import mobileNavigation from './mobile/index.vue'
import { getCategory }from '@/api/category.js'
import { ALL_CATEGORY_ITEM }from '@/constants/index.js'
import { ref } from 'vue'
// data
const categoryData = ref([])
// methods
const getCategoryData = async () => {
  const { categorys } = await getCategory()
  // console.log(category)
  categoryData.value = categorys
  // 數據補全
  categoryData.value.unshift(ALL_CATEGORY_ITEM)
}
// run
getCategoryData()
</script>