<template>
  <mobile-navigation v-if="isMobileTerminal" :data="categoryData"></mobile-navigation>
</template>
<script setup>
import { isMobileTerminal } from '@/utils/flexible.js'
import mobileNavigation from './mobile/index.vue'
import { getCategory }from '@/api/category.js'
import { ref } from 'vue'
// data
const categoryData = ref([])
// methods
const getCategoryData = async () => {
  const { categorys } = await getCategory()
  // console.log(category)
  categoryData.value = categorys
}
// run
getCategoryData()
</script>