<template>
  <div>
    <!-- old -->
    <!-- <item-vue v-for="item in pexelsList" :key="item.id" :data="item"></item-vue> -->
    <!-- 
      picturePreReading: true 預加載 | false 非預加載
     -->
    <m-infinite-list v-model="isLoading" :isFinished="isFinished" @onLoad="getPexelsData">
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
    </m-infinite-list>
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
// 數據源
const pexelsList = ref([])
// 數據是否加載中
const isLoading = ref(false)
// 數據是否全部加載完成
const isFinished = ref(false)
//
const getPexelsData = async () => {
  // 數據全部加載完成，則 return
  if (isFinished.value) { return }
  // 完成第一次請求後，後續的請求讓 page 自增
  if (pexelsList.value.length) {
    query.page += 1
  }
  // 觸發接口
  const res = await getPexelsList(query)
  // 初始請求清空數據源
  if (query.page === 1) {
    pexelsList.value = res.list
  } else {
    pexelsList.value.push(...res.list)
  }
  // 判斷數據是分全部加載完成
  if (pexelsList.value.length === res.total) {
    isFinished.value = true
  }
  // 修改 isLoading 標記
  isLoading.value = false
}
</script>
<style lang="scss" scoped>
</style>