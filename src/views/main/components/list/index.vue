<template>
  <!-- <m-waterfall
    :data=""
    :nodeKey=""
    :picturePreReading="true"
  > -->
  <div>
    <item-vue v-for="item in pexelsList" :key="item.id" :data="item"></item-vue>
  </div>
  <!-- </m-waterfall> -->
</template>
<script setup>
import { getPexelsList } from '@/api/pexel.js'
import ItemVue from './item.vue'
import { ref } from 'vue'
// 建立數據請求
let query = {
  page: 1,
  size: 20
}
//
const pexelsList = ref([])
//
const getPexelsData = async () => {
  const res = await getPexelsList(query)
  pexelsList.value = res.list
}
getPexelsData()
</script>
<style lang="scss" scoped>
</style>