<template>
  <mobile-navigation v-if="isMobileTerminal"></mobile-navigation>
</template>
<script setup>
import { isMobileTerminal } from '@/utils/flexible.js'
import mobileNavigation from './mobile/index.vue'
import { getCategory }from '@/api/category.js'

// methods
const getCategoryData = async () => {
  const res = await getCategory()
  console.log(res)
}
getCategoryData()
</script>