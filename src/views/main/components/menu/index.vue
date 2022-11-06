<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-xl text-zinc-900 font-bold mb-2 px-1">所有分類</h2>
    <ui class="overflow-y-scroll">
      <li
        v-for="(item, index) in category"
        :key="item.id"
        @click="$emit('onItemClick', index)"
        class="text-lg text-zinc-900 px-1 py-1.5 duration-100 active:bg-zinc-100"
      >{{item.name}}</li>
    </ui>
  </div>
</template>
<script setup>
defineProps({
  category: {
    type: Array,
    required: true
  }
})
// 事件都進行手動註冊
defineEmits(['onIyemClick'])
</script>
<style lang="scss" scoped>
</style>