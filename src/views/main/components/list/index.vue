<template>
  <div>
    <!-- old -->
    <!-- <item-vue v-for="item in pexelsList" :key="item.id" :data="item"></item-vue> -->
    <!-- 
      picturePreReading: true 預加載 | false 非預加載
     -->
    <m-waterfall
      class="px-1 w-full"
      :data="pexelsList"
      nodeKey="id"
      :column="isMobileTerminal ? 2 : 5"
      :picturePreReading="false"
    >
      <!-- 作用域插槽，item 傳出來 -->
      <template v-slot="{ item, width }">
        <item-vue :data="item" :width="width"></item-vue>
      </template>
    </m-waterfall>
  </div>
</template>
<script setup>
import { getPexelsList } from '@/api/pexel.js'
import ItemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible.js'
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